'use client';

import { useActionState } from '@/hooks/use-action-state';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Loader2, ArrowLeft, CheckCircle2 } from 'lucide-react';
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
import { resetPassword } from '@/app/actions/auth';

interface ResetPasswordFormProps {
  token: string;
}

export default function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const { t } = useTranslation();
  const { isLoading, isSuccess, error, runAction } = useActionState();

  const resetPasswordSchema = z
    .object({
      password: z
        .string()
        .min(8, { message: t('resetPasswordPage.validation.passwordMin') })
        .regex(/[A-Z]/, { message: t('resetPasswordPage.validation.passwordUppercase') })
        .regex(/[a-z]/, { message: t('resetPasswordPage.validation.passwordLowercase') })
        .regex(/[0-9]/, { message: t('resetPasswordPage.validation.passwordNumber') }),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t('resetPasswordPage.validation.passwordsNoMatch'),
      path: ['confirmPassword'],
    });

  type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  async function onSubmit(data: ResetPasswordFormValues) {
    const formData = new FormData();
    formData.append('password', data.password);
    formData.append('token', token);

    await runAction(() => resetPassword(formData));
  }

  if (isSuccess) {
    return (
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <CheckCircle2 className="h-12 w-12 text-green-500" />
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900">
            {t('resetPasswordPage.success.title')}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {t('resetPasswordPage.success.description')}
          </p>
          <div className="mt-6">
            <Link href="/login">
              <Button className="w-full bg-rose-600 hover:bg-rose-500">
                {t('resetPasswordPage.backToLogin')}
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
          {t('resetPasswordPage.title')}
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          {t('resetPasswordPage.subtitle')}
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
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('resetPasswordPage.passwordLabel')}</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder={t('resetPasswordPage.passwordPlaceholder')}
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('resetPasswordPage.confirmPasswordLabel')}</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder={t('resetPasswordPage.confirmPasswordPlaceholder')}
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
            {isLoading ? t('resetPasswordPage.submitting') : t('resetPasswordPage.submit')}
          </Button>

          <div className="text-center">
            <Link
              href="/login"
              className="flex items-center justify-center text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t('resetPasswordPage.backToLogin')}
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
}
