'use client';
import React from 'react';
import { Button } from '../ui/button';
import { deletePet } from '@/services/pets';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { usePathname } from 'next/navigation';

export const PetDelete = ({ id }: { id: string }) => {
  const pathname = usePathname();

  return (
    <Dialog>
      <DialogTrigger className="text-red-500 hover:text-red-900 cursor-pointer">
        Delete
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="button"
              variant="custom"
              onClick={() => deletePet(id, pathname)}
            >
              Confirm
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
