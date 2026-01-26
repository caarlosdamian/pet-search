'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Checkbox } from '@/components/ui/checkbox';

export default function LoginForm() {
  const { t } = useTranslation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Define form schema with Zod using memo to access translations
  // Define form schema with Zod using memo to access translations
  const loginSchema = z.object({
    email: z.string().email({ message: t('loginPage.validation.emailInvalid') }),
    password: z.string().min(1, { message: t('loginPage.validation.passwordRequired') }),
    rememberMe: z.boolean().default(false),
  });

  type LoginFormValues = z.infer<typeof loginSchema>;

  // Get callback URL from search params
  const callbackUrl =
    searchParams.get('callbackUrl') ||
    searchParams.get('redirect') ||
    '/dashboard';

  // Initialize form
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  // Handle form submission
  async function onSubmit(data: LoginFormValues) {
    setIsLoading(true);
    setError(null);

    try {
      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        setError(t('loginPage.errors.invalid'));
      } else {
        // Successful login
        router.push(callbackUrl);
        router.refresh();
      }
    } catch {
      setError(t('loginPage.errors.generic'));
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">
          {t('loginPage.title')}
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          {t('loginPage.subtitle')}{' '}
          <Link
            href="/signup"
            className="font-medium text-rose-600 hover:text-rose-500"
          >
            {t('loginPage.signup')}
          </Link>
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
                <FormLabel>{t('loginPage.emailLabel')}</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder={t('loginPage.emailPlaceholder')}
                    autoComplete="email"
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
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('loginPage.passwordLabel')}</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder={t('loginPage.passwordPlaceholder')}
                      autoComplete="current-password"
                      disabled={isLoading}
                      {...field}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      tabIndex={-1}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 cursor-pointer" />
                      ) : (
                        <Eye className="h-4 w-4 cursor-pointer" />
                      )}
                      <span className="sr-only">
                        {showPassword ? 'Hide password' : 'Show password'}
                      </span>
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center justify-between">
            <FormField
              control={form.control}
              name="rememberMe"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <Label
                    htmlFor="rememberMe"
                    className="text-sm font-normal cursor-pointer"
                  >
                    {t('loginPage.rememberMe')}
                  </Label>
                </FormItem>
              )}
            />

            <a
              href="/forgot-password"
              className="text-sm font-medium text-rose-600 hover:text-rose-500"
            >
              {t('loginPage.forgotPassword')}
            </a>
          </div>

          <Button
            type="submit"
            className="w-full bg-rose-600 hover:bg-rose-500"
            disabled={isLoading}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? t('loginPage.submitting') : t('loginPage.submit')}
          </Button>
        </form>
      </Form>
    </div>
  );
}
