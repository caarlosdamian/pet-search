'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import {
  ArrowLeft,
  User,
  Heart,
  CheckCircle,
  XCircle,
  Clock,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import ApplicationStatusActions from './application-status-actions';

interface ApplicationDetailsProps {
  applicationProp: string;
  currentUser: Record<string, string>;
}

export default function ApplicationDetails({
  applicationProp,
  currentUser,
}: ApplicationDetailsProps) {
  const application = JSON.parse(applicationProp);
  const [status, setStatus] = useState(application.status);
  const [isUpdating, setIsUpdating] = useState(false);

  const isAdmin = 'role' in currentUser ? currentUser?.role === 'admin' : '';
  // const isOwner = applicationProp.userId === currentUser.id;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'rejected':
        return <XCircle className="h-5 w-5 text-red-600" />;
      default:
        return <Clock className="h-5 w-5 text-yellow-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-50 text-green-700 hover:bg-green-50';
      case 'rejected':
        return 'bg-red-50 text-red-700 hover:bg-red-50';
      default:
        return 'bg-yellow-50 text-yellow-700 hover:bg-yellow-50';
    }
  };

  const handleStatusUpdate = async (newStatus: string) => {
    setIsUpdating(true);

    try {
      const response = await fetch(
        `/api/applications/${application.id}/status`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            status: newStatus,
            petId: application.pet._id,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to update status');
      }

      setStatus(newStatus);
      toast('Status updated');
    } catch {
      toast('Error');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost" size="icon">
          <Link href={isAdmin ? '/admin/applications' : '/dashboard'}>
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Application Details
          </h1>
          <p className="text-gray-600">
            Submitted{' '}
            {formatDistanceToNow(new Date(application.createdAt), {
              addSuffix: true,
            })}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {getStatusIcon(status)}
          <Badge variant="outline" className={getStatusColor(status)}>
            {status}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Pet Information */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5" />
                Pet Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              {application.pet ? (
                <div className="space-y-4">
                  <div className="aspect-square overflow-hidden rounded-lg">
                    <Image
                      src={
                        application.pet.imageUrl ||
                        '/placeholder.svg?height=300&width=300'
                      }
                      alt={application.pet.name}
                      width={300}
                      height={300}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">
                      {application.pet.name}
                    </h3>
                    <p className="text-gray-600">
                      {application.pet.breed} • {application.pet.age}{' '}
                      {application.pet.age === 1 ? 'year' : 'years'} old
                    </p>
                    <p className="text-sm text-gray-500 capitalize">
                      {application.pet.type} •{' '}
                      {application.pet.location?.replace(/-/g, ' ')}
                    </p>
                  </div>
                  <Button asChild variant="outline" className="w-full">
                    <Link href={`/pets/${application.pet.id}`}>
                      View Pet Details
                    </Link>
                  </Button>
                </div>
              ) : (
                <p className="text-gray-500">Pet information not available</p>
              )}
            </CardContent>
          </Card>

          {/* Admin Actions */}
          {isAdmin && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Admin Actions</CardTitle>
                <CardDescription>
                  Update the status of this application.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ApplicationStatusActions
                  currentStatus={status}
                  onStatusUpdate={handleStatusUpdate}
                  isUpdating={isUpdating}
                />
              </CardContent>
            </Card>
          )}
        </div>

        {/* Application Details */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Application Details
              </CardTitle>
              {isAdmin && application.user && (
                <CardDescription>
                  Submitted by {application.user.name} ({application.user.email}
                  )
                </CardDescription>
              )}
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="personal" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="personal">Personal</TabsTrigger>
                  <TabsTrigger value="living">Living</TabsTrigger>
                  <TabsTrigger value="experience">Experience</TabsTrigger>
                  <TabsTrigger value="additional">Additional</TabsTrigger>
                </TabsList>

                <TabsContent value="personal" className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-3">
                      Personal Information
                    </h3>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label className="text-sm font-medium text-gray-500">
                          Name
                        </label>
                        <p className="text-gray-900">
                          {application.personalInfo.name}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">
                          Email
                        </label>
                        <p className="text-gray-900">
                          {application.personalInfo.email}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">
                          Phone
                        </label>
                        <p className="text-gray-900">
                          {application.personalInfo.phone}
                        </p>
                      </div>
                      <div className="sm:col-span-2">
                        <label className="text-sm font-medium text-gray-500">
                          Address
                        </label>
                        <p className="text-gray-900">
                          {application.personalInfo.address}
                          <br />
                          {application.personalInfo.city},{' '}
                          {application.personalInfo.state}{' '}
                          {application.personalInfo.zip}
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="living" className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-3">
                      Living Situation
                    </h3>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label className="text-sm font-medium text-gray-500">
                          Home Type
                        </label>
                        <p className="text-gray-900 capitalize">
                          {application.livingInfo.homeType}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">
                          Own or Rent
                        </label>
                        <p className="text-gray-900 capitalize">
                          {application.livingInfo.ownRent}
                        </p>
                      </div>
                      {application.livingInfo.landlordContact && (
                        <div className="sm:col-span-2">
                          <label className="text-sm font-medium text-gray-500">
                            Landlord Contact
                          </label>
                          <p className="text-gray-900">
                            {application.livingInfo.landlordContact}
                          </p>
                        </div>
                      )}
                      <div>
                        <label className="text-sm font-medium text-gray-500">
                          Has Yard
                        </label>
                        <p className="text-gray-900">
                          {application.livingInfo.hasYard ? 'Yes' : 'No'}
                        </p>
                      </div>
                      {application.livingInfo.fenceHeight && (
                        <div>
                          <label className="text-sm font-medium text-gray-500">
                            Fence Height
                          </label>
                          <p className="text-gray-900">
                            {application.livingInfo.fenceHeight}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="experience" className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-3">Pet Experience</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-500">
                          Current Pets
                        </label>
                        <p className="text-gray-900 whitespace-pre-wrap">
                          {application.petExperience.currentPets || 'None'}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">
                          Past Pet Experience
                        </label>
                        <p className="text-gray-900 whitespace-pre-wrap">
                          {application.petExperience.pastPets || 'None'}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">
                          Veterinarian Contact
                        </label>
                        <p className="text-gray-900">
                          {application.petExperience.veterinarianContact ||
                            'None'}
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="additional" className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-3">
                      Additional Information
                    </h3>
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Why do you want to adopt {application.pet?.name}?
                      </label>
                      <p className="text-gray-900 whitespace-pre-wrap">
                        {application.additionalInfo ||
                          'No additional information provided.'}
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
