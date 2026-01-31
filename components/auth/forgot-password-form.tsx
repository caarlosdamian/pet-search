'use client';

import { useActionState } from '@/hooks/use-action-state';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Loader2, ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
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
import { Alert, AlertDescription } from '@/components/ui/alert';
import { forgotPassword } from '@/app/actions/auth';

export default function ForgotPasswordForm() {
  const { t } = useTranslation();
  const { isLoading, isSuccess, error, runAction } = useActionState();

  const forgotPasswordSchema = z.object({
    email: z.string().email({ message: t('forgotPasswordPage.validation.emailInvalid') }),
  });

  type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  async function onSubmit(data: ForgotPasswordFormValues) {
    const formData = new FormData();
    formData.append('email', data.email);

    await runAction(
      () => forgotPassword(formData),
      {
        onError: () => {
          // If we want to handle specific error UI logic here
        }
      }
    );
  }

  if (isSuccess) {
    return (
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            {t('forgotPasswordPage.success.title')}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {t('forgotPasswordPage.success.description')}
          </p>
          <div className="mt-6">
            <Link href="/login">
              <Button variant="outline" className="w-full">
                {t('forgotPasswordPage.backToLogin')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">
          {t('forgotPasswordPage.title')}
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          {t('forgotPasswordPage.subtitle')}
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('forgotPasswordPage.emailLabel')}</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder={t('forgotPasswordPage.emailPlaceholder')}
                    autoComplete="email"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full bg-rose-600 hover:bg-rose-500"
            disabled={isLoading}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? t('forgotPasswordPage.submitting') : t('forgotPasswordPage.submit')}
          </Button>

          <div className="text-center">
            <Link
              href="/login"
              className="flex items-center justify-center text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t('forgotPasswordPage.backToLogin')}
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
}
