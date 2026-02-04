"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import type { Pet } from "@/lib/types"
import { useTranslation } from "react-i18next"

export default function AdoptionCTA({ pet }: { pet: Pet }) {
  const { t } = useTranslation();
  const [dialogOpen, setDialogOpen] = useState(false)
  console.log('pet', pet)
  return (
    <div className="mt-8 border-t border-gray-200 pt-8">
      <h2 className="text-lg font-medium text-gray-900">{t('adoptionCTA.title',
        { replace: { name: pet.name } }
      )}</h2>
      <p className="mt-2 text-sm text-gray-500">
        {t('adoptionCTA.description')}
      </p>

      {true ? (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="mt-6 w-full bg-rose-600 hover:bg-rose-500">{t('adoptionCTA.applyButton', { name: pet.name })}</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t('adoptionCTA.dialog.title', { name: pet.name })}</DialogTitle>
              <DialogDescription>
                {t('adoptionCTA.dialog.description', { name: pet.name })}
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <p className="text-sm text-gray-500">{t('adoptionCTA.dialog.processTitle')}</p>
              <ul className="mt-2 list-disc pl-5 text-sm text-gray-500">
                <li>{t('adoptionCTA.dialog.step1')}</li>
                <li>{t('adoptionCTA.dialog.step2')}</li>
                <li>{t('adoptionCTA.dialog.step3', { name: pet.name })}</li>
                <li>{t('adoptionCTA.dialog.step4')}</li>
                <li>{t('adoptionCTA.dialog.step5', { fee: `$${pet.adoptionFee}` })}</li>
              </ul>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                {t('common.cancel')}
              </Button>
              <Button asChild className="bg-rose-600 hover:bg-rose-500">
                <Link href={`/adopt/${pet._id}`}>{t('adoptionCTA.dialog.continueButton')}</Link>
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ) : (
        <div className="mt-6 space-y-4">
          <Button asChild className="w-full bg-rose-600 hover:bg-rose-500">
            <Link href={`/login?redirect=/pets/${pet._id}`}>{t('adoptionCTA.auth.loginToApply')}</Link>
          </Button>
          <p className="text-center text-sm text-gray-500">
            {t('adoptionCTA.auth.noAccount')}{" "}
            <Link href={`/signup?redirect=/pets/${pet._id}`} className="font-medium text-rose-600 hover:text-rose-500">
              {t('adoptionCTA.auth.signup')}
            </Link>
          </p>
        </div>
      )}
    </div>
  )
}
