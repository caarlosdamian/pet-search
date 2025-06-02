'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from 'sonner';
import { adoptionFormSchema, AdoptionFormValues } from '@/lib/shemas';
import { Pet } from '@/lib/types';

// Define form schema with Zod

export default function AdoptionForm({
  pet,
  userId,
}: {
  pet: Pet;
  userId: string;
}) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [error, setError] = useState<string | null>(null);

  // Initialize form with default values
  const form = useForm({
    resolver: zodResolver(adoptionFormSchema),
    values: {
      personalInfo: {
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zip: '',
      },
      livingInfo: {
        homeType: 'house',
        ownRent: 'own',
        landlordContact: '',
        hasYard: false,
        fenceHeight: '',
      },
      petExperience: {
        currentPets: '',
        pastPets: '',
        veterinarianContact: '',
      },
      additionalInfo: '',
      agreeToTerms: false,
    },
  });

  const steps = [
    {
      title: 'Personal Information',
      fields: [
        'personalInfo.name',
        'personalInfo.email',
        'personalInfo.phone',
        'personalInfo.address',
        'personalInfo.city',
        'personalInfo.state',
        'personalInfo.zip',
      ],
    },
    {
      title: 'Living Situation',
      fields: [
        'livingInfo.homeType',
        'livingInfo.ownRent',
        'livingInfo.landlordContact',
        'livingInfo.hasYard',
        'livingInfo.fenceHeight',
      ],
    },
    {
      title: 'Pet Experience',
      fields: [
        'petExperience.currentPets',
        'petExperience.pastPets',
        'petExperience.veterinarianContact',
      ],
    },
    {
      title: 'Additional Information',
      fields: ['additionalInfo', 'agreeToTerms'],
    },
  ];

  // Handle form submission
  async function onSubmit(data: AdoptionFormValues) {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/adoption-applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          petId: pet._id,
          userId: userId,
          ...data,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit application');
      }

      // Show success toast
      toast('Application submitted!');

      // Redirect to success page
      router.push(`/adopt/${pet._id}/success`);
    } catch (error) {
      console.error('Error submitting application:', error);
      setError(
        error instanceof Error
          ? error.message
          : 'Failed to submit application. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  // Navigate to next step
  const nextStep = async () => {
    const fields = steps[currentStep].fields;
    const output = await form.trigger(fields as unknown as []);

    if (!output) return;

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  // Navigate to previous step
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-8">
      {/* Step indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  index <= currentStep
                    ? 'bg-rose-600 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {index + 1}
              </div>
              <span className="mt-2 text-xs text-gray-500">{step.title}</span>
            </div>
          ))}
        </div>
        <div className="mt-2 h-1 w-full bg-gray-200">
          <div
            className="h-1 bg-rose-600 transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Step 1: Personal Information */}
          {currentStep === 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Personal Information</h2>

              <FormField
                control={form.control}
                name="personalInfo.name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="personalInfo.email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="john@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="personalInfo.phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="(123) 456-7890" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="personalInfo.address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Street Address</FormLabel>
                    <FormControl>
                      <Input placeholder="123 Main St" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <FormField
                  control={form.control}
                  name="personalInfo.city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="New York" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="personalInfo.state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State</FormLabel>
                      <FormControl>
                        <Input placeholder="NY" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="personalInfo.zip"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ZIP Code</FormLabel>
                      <FormControl>
                        <Input placeholder="10001" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          )}

          {/* Step 2: Living Situation */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Living Situation</h2>

              <FormField
                control={form.control}
                name="livingInfo.homeType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Home Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your home type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="house">House</SelectItem>
                        <SelectItem value="apartment">Apartment</SelectItem>
                        <SelectItem value="condo">Condo</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="livingInfo.ownRent"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Do you own or rent your home?</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select option" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="own">Own</SelectItem>
                        <SelectItem value="rent">Rent</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {form.watch('livingInfo.ownRent') === 'rent' && (
                <FormField
                  control={form.control}
                  name="livingInfo.landlordContact"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Landlord Contact Information</FormLabel>
                      <FormControl>
                        <Input placeholder="Name and phone number" {...field} />
                      </FormControl>
                      <FormDescription>
                        We may contact your landlord to confirm pet policies.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="livingInfo.hasYard"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Do you have a yard?</FormLabel>
                      <FormDescription>
                        This is important for dogs that need outdoor space.
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />

              {form.watch('livingInfo.hasYard') && (
                <FormField
                  control={form.control}
                  name="livingInfo.fenceHeight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fence Height (if applicable)</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 6 feet" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>
          )}

          {/* Step 3: Pet Experience */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Pet Experience</h2>

              <FormField
                control={form.control}
                name="petExperience.currentPets"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Pets</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Please list any pets you currently have, including species, breed, age, and whether they are spayed/neutered."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="petExperience.pastPets"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Past Pet Experience</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Please describe your past experience with pets."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="petExperience.veterinarianContact"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Veterinarian Contact Information</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Name, clinic, and phone number"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      If you don&apos;t have a current veterinarian, please
                      write &ldquo;None&ldquo;.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          {/* Step 4: Additional Information */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Additional Information</h2>

              <FormField
                control={form.control}
                name="additionalInfo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Why do you want to adopt {pet.name}?</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Please tell us why you're interested in adopting this pet and any other information you'd like to share."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="agreeToTerms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Terms and Conditions</FormLabel>
                      <FormDescription>
                        I agree to the{' '}
                        <a
                          href="/terms"
                          className="text-rose-600 hover:text-rose-500"
                        >
                          terms and conditions
                        </a>{' '}
                        and understand that submitting this application does not
                        guarantee adoption.
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          )}

          {/* Navigation buttons */}
          <div className="flex justify-between pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0}
            >
              Previous
            </Button>

            {currentStep < steps.length - 1 ? (
              <Button type="button" onClick={nextStep}>
                Next
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-rose-600 hover:bg-rose-500"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />{' '}
                    Submitting...
                  </>
                ) : (
                  'Submit Application'
                )}
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}
