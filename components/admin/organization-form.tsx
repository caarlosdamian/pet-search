'use client';

import React, { useMemo } from 'react';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import type { Organization } from '@/lib/types';
import { toast } from 'sonner';

// Define form schema with Zod
const organizationFormSchema = z.object({
  name: z.string().min(2, 'Organization name must be at least 2 characters'),
  slug: z
    .string()
    .min(2, 'Slug must be at least 2 characters')
    .regex(
      /^[a-z0-9-]+$/,
      'Slug can only contain lowercase letters, numbers, and hyphens'
    ),
  description: z.string().optional(),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  website: z
    .string()
    .url('Please enter a valid URL')
    .optional()
    .or(z.literal('')),
  address: z.string().min(5, 'Please enter a complete address'),
  city: z.string().min(2, 'Please enter a city'),
  state: z.string().min(2, 'Please enter a state'),
  zip: z.string().min(5, 'Please enter a valid ZIP code'),
  logo: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  settings: z.object({
    allowPublicApplications: z.boolean().default(true),
    requireApproval: z.boolean().default(true),
    autoEmailResponses: z.boolean().default(true),
  }),
});

type OrganizationFormValues = z.infer<typeof organizationFormSchema>;

interface OrganizationFormProps {
  organization?: Organization;
}

export default function OrganizationForm({
  organization: organizationData,
}: OrganizationFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form with default values or existing organization data
  const organization = useMemo(
    () =>
      organizationData ? JSON.parse(organizationData as unknown as string) : {},
    [organizationData]
  );

  const form = useForm({
    resolver: zodResolver(organizationFormSchema),
    defaultValues: organization
      ? {
          name: organization.name,
          slug: organization.slug,
          description: organization.description || '',
          email: organization.email,
          phone: organization.phone,
          website: organization.website || '',
          address: organization.address,
          city: organization.city,
          state: organization.state,
          zip: organization.zip,
          logo: organization.logo || '',
          settings: {
            allowPublicApplications:
              organization.settings?.allowPublicApplications ?? true,
            requireApproval: organization.settings?.requireApproval ?? true,
            autoEmailResponses:
              organization.settings?.autoEmailResponses ?? true,
          },
        }
      : {
          name: '',
          slug: '',
          description: '',
          email: '',
          phone: '',
          website: '',
          address: '',
          city: '',
          state: '',
          zip: '',
          logo: '',
          settings: {
            allowPublicApplications: true,
            requireApproval: true,
            autoEmailResponses: true,
          },
        },
  });

  // Auto-generate slug from name
  const watchName = form.watch('name');
  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  // Update slug when name changes (only if slug is empty or matches the previous auto-generated slug)
  React.useEffect(() => {
    if (watchName && !organization) {
      const newSlug = generateSlug(watchName);
      const currentSlug = form.getValues('slug');

      console.log('Entrando', currentSlug, newSlug);
      form.setValue('slug', newSlug);
    }
  }, [watchName, form, organization]);

  // Handle form submission
  async function onSubmit(data: OrganizationFormValues) {
    setIsSubmitting(true);

    try {
      // Prepare the organization data
      const organizationData = {
        ...data,
        website: data.website || undefined,
        logo: data.logo || undefined,
        updatedAt: new Date().toISOString(),
        ...(organization ? {} : { createdAt: new Date().toISOString() }),
      };

      // Determine if this is a create or update operation
      const url = organization
        ? `/api/organizations/${organization.id}`
        : '/api/organizations';
      const method = organization ? 'PUT' : 'POST';

      // Submit the form
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(organizationData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save organization');
      }

      toast(organization ? 'Organization updated' : 'Organization created');

      // Redirect to the organizations list
      router.push('/admin/organizations');
      router.refresh();
    } catch (error) {
      console.error('Error saving organization:', error);
      toast('Error');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium">Basic Information</h3>
            <p className="text-sm text-gray-500">
              Basic details about the organization.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Organization Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Happy Paws Rescue" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <Input placeholder="happy-paws-rescue" {...field} />
                  </FormControl>
                  <FormDescription>
                    Used in URLs. Only lowercase letters, numbers, and hyphens.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="md:col-span-2">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="A brief description of your organization and mission"
                        className="min-h-24"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="logo"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Logo URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://example.com/logo.png"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    URL to your organization&apos;s logo image.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium">Contact Information</h3>
            <p className="text-sm text-gray-500">
              How people can reach your organization.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="contact@happypaws.org"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="(555) 123-4567" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Website</FormLabel>
                  <FormControl>
                    <Input placeholder="https://www.happypaws.org" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium">Address</h3>
            <p className="text-sm text-gray-500">
              Physical location of your organization.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Street Address</FormLabel>
                  <FormControl>
                    <Input placeholder="123 Main Street" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <FormField
                control={form.control}
                name="city"
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
                name="state"
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
                name="zip"
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
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium">Settings</h3>
            <p className="text-sm text-gray-500">
              Configure how your organization operates on the platform.
            </p>
          </div>

          <div className="space-y-4">
            <FormField
              control={form.control}
              name="settings.allowPublicApplications"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Allow Public Applications</FormLabel>
                    <FormDescription>
                      Allow anyone to submit adoption applications for your
                      pets.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="settings.requireApproval"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Require Application Approval</FormLabel>
                    <FormDescription>
                      All applications must be manually reviewed and approved.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="settings.autoEmailResponses"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Auto Email Responses</FormLabel>
                    <FormDescription>
                      Automatically send email confirmations for applications.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push('/admin/organizations')}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-rose-600 hover:bg-rose-500"
          >
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {organization ? 'Update Organization' : 'Create Organization'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
