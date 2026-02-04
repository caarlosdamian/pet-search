'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, Share2, MapPin, Calendar, Info } from 'lucide-react';
import AdoptionCTA from '@/components/pets/adoption-cta';
import PetGallery from '@/components/pets/pet-gallery';
import SimilarPets from '@/components/pets/similar-pets';
import type { Pet } from '@/lib/types';
import { useTranslation } from 'react-i18next';

interface PetDetailContentProps {
  pet: Pet;
  similarPets: Pet[];
}

export default function PetDetailContent({ pet, similarPets }: PetDetailContentProps) {
  const { t } = useTranslation();

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <Link href="/" className="text-gray-500 hover:text-gray-700">
                {t('petDetail.breadcrumb.home')}
              </Link>
            </li>
            <li className="flex items-center">
              <span className="mx-2 text-gray-400">/</span>
              <Link href="/pets" className="text-gray-500 hover:text-gray-700">
                {t('petDetail.breadcrumb.pets')}
              </Link>
            </li>
            <li className="flex items-center">
              <span className="mx-2 text-gray-400">/</span>
              <span className="text-gray-900">{pet.name}</span>
            </li>
          </ol>
        </nav>

        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
          {/* Pet gallery */}
          <PetGallery pet={pet} />

          {/* Pet details */}
          <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                {pet.name}
              </h1>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  aria-label={t('petDetail.addToFavorites')}
                >
                  <Heart className="h-5 w-5 text-rose-500" />
                </Button>
                <Button variant="outline" size="icon" aria-label={t('petDetail.share')}>
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <Badge variant="secondary" className="text-sm">
                {t(`pets.attributes.types.${pet.type.toLowerCase()}`)}
              </Badge>
              <Badge variant="secondary" className="text-sm">
                {pet.breed}
              </Badge>
              <Badge variant="secondary" className="text-sm">
                {t(`pets.attributes.genders.${pet.gender.toLowerCase()}`)}
              </Badge>
              <Badge variant="secondary" className="text-sm">
                {t(`pets.attributes.sizes.${pet.size.toLowerCase()}`)}
              </Badge>
            </div>

            <div className="mt-6 flex items-center">
              <MapPin className="h-5 w-5 text-gray-500" />
              <span className="ml-2 text-gray-700">{pet.location}</span>
            </div>

            <div className="mt-2 flex items-center">
              <Calendar className="h-5 w-5 text-gray-500" />
              <span className="ml-2 text-gray-700">
                {pet.age} {pet.age === 1 ? t('petDetail.yearOld') : t('petDetail.yearsOld')}
              </span>
            </div>

            <div className="mt-6">
              <h2 className="sr-only">{t('petDetail.petDescription')}</h2>
              <p className="text-base text-gray-700">{pet.description}</p>
            </div>

            <Tabs defaultValue="details" className="mt-8">
              <TabsList className="w-full">
                <TabsTrigger value="details" className="flex-1">
                  {t('petDetail.tabs.details')}
                </TabsTrigger>
                <TabsTrigger value="health" className="flex-1">
                  {t('petDetail.tabs.health')}
                </TabsTrigger>
                <TabsTrigger value="requirements" className="flex-1">
                  {t('petDetail.tabs.requirements')}
                </TabsTrigger>
              </TabsList>
              <TabsContent value="details" className="mt-4">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <Info className="h-5 w-5 text-gray-500" />
                      <span className="ml-2 text-sm text-gray-700">
                        {t('petDetail.attributes.spayedNeutered')}: {pet.spayedNeutered ? t('petDetail.attributes.yes') : t('petDetail.attributes.no')}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Info className="h-5 w-5 text-gray-500" />
                      <span className="ml-2 text-sm text-gray-700">
                        {t('petDetail.attributes.houseTrained')}: {pet.houseTrained ? t('petDetail.attributes.yes') : t('petDetail.attributes.no')}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Info className="h-5 w-5 text-gray-500" />
                      <span className="ml-2 text-sm text-gray-700">
                        {t('petDetail.attributes.goodWithKids')}: {pet.goodWithKids ? t('petDetail.attributes.yes') : t('petDetail.attributes.no')}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Info className="h-5 w-5 text-gray-500" />
                      <span className="ml-2 text-sm text-gray-700">
                        {t('petDetail.attributes.goodWithPets')}: {pet.goodWithPets ? t('petDetail.attributes.yes') : t('petDetail.attributes.no')}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">{pet.temperament}</p>
                </div>
              </TabsContent>
              <TabsContent value="health" className="mt-4">
                <div className="space-y-4">
                  <p className="text-sm text-gray-700">{pet.healthDetails}</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <Info className="h-5 w-5 text-gray-500" />
                      <span className="ml-2 text-sm text-gray-700">
                        {t('petDetail.attributes.vaccinated')}: {pet.vaccinated ? t('petDetail.attributes.yes') : t('petDetail.attributes.no')}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Info className="h-5 w-5 text-gray-500" />
                      <span className="ml-2 text-sm text-gray-700">
                        {t('petDetail.attributes.microchipped')}: {pet.microchipped ? t('petDetail.attributes.yes') : t('petDetail.attributes.no')}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Info className="h-5 w-5 text-gray-500" />
                      <span className="ml-2 text-sm text-gray-700">
                        {t('petDetail.attributes.specialNeeds')}: {pet.specialNeeds ? t('petDetail.attributes.yes') : t('petDetail.attributes.no')}
                      </span>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="requirements" className="mt-4">
                <div className="space-y-4">
                  <p className="text-sm text-gray-700">
                    {pet.adoptionRequirements}
                  </p>
                  <ul className="list-disc pl-5 text-sm text-gray-700">
                    <li>{t('petDetail.adoptionRequirements.applicationReview')}</li>
                    <li>{t('petDetail.adoptionRequirements.homeVisit')}</li>
                    <li>{t('petDetail.adoptionRequirements.adoptionFee')}: ${pet.adoptionFee}</li>
                    <li>{t('petDetail.adoptionRequirements.referenceCheck')}</li>
                  </ul>
                </div>
              </TabsContent>
            </Tabs>

            <AdoptionCTA pet={pet} />
          </div>
        </div>

        {/* Similar pets section */}
        <SimilarPets pets={similarPets} />
      </div>
    </div>
  );
}
