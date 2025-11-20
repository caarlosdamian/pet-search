'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import {
  Form,
  FormControl,
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
import { CustomSession, User } from '@/lib/types';
import { userFormSchema, UserFormValues } from '@/lib/shemas';
import { useSession } from 'next-auth/react';
import { createUser, updateUser } from '@/services/users';
import { toast } from 'sonner';

interface PetFormProps {
  user?: User;
}

export default function UserForm({ user }: PetFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: session } = useSession() as unknown as { data: CustomSession };
console.log(user)
  const form = useForm({
    resolver: zodResolver(userFormSchema),
    values: user
      ? {
          ...JSON.parse(user as unknown as string),
        }
      : {
          name: '',
          email: '',
          role: '',
        },
  });

  useEffect(() => {
    form.reset({
      ...JSON.parse(user as unknown as string),
    });
  }, [user, form]);

  async function onSubmit(data: UserFormValues) {
    setIsSubmitting(true);
    try {
      const userData = {
        ...data,
        createdAt: user?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      if (user) {
        await updateUser({ ...userData, _id: user._id });
      } else {
        await createUser(userData);
      }

      toast(user ? 'User updated' : 'User created');
      router.push('/admin/users');
      router.refresh();
    } catch (error) {
      console.error('Error saving user:', error);
      toast('Error');
    } finally {
      setIsSubmitting(false);
    }
  }

  // TODO hacer fetch de organizaciones y tomar en cuenta eso si seleccionan el role
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input placeholder="Nombre" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select pet type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {session?.user?.role === 'admin' && (
                    <SelectItem value="admin">Super Admin</SelectItem>
                  )}
                  <SelectItem value="user">Usuario</SelectItem>
                  <SelectItem value="org_admin">
                    Administrador de Organizacion
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push('/admin/users')}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-rose-600 hover:bg-rose-500"
          >
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {user ? 'Update User' : 'Add User'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
