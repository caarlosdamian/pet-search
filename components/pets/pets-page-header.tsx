'use client';

import { useTranslation } from 'react-i18next';

export default function PetsPageHeader() {
  const { t } = useTranslation();

  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight text-gray-900">
        {t('petsPage.title')}
      </h1>
      <p className="mt-4 max-w-xl text-gray-500">
        {t('petsPage.description')}
      </p>
    </>
  );
}
