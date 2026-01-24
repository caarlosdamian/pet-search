'use client';

import { useState, useMemo } from 'react';
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from 'sonner';

export default function SignupForm() {
  const { t } = useTranslation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Define form schema with Zod
  const signupSchema = useMemo(() => z
    .object({
      name: z.string().min(2, { message: t('signupPage.validation.nameMin') }),
      email: z.string().email({ message: t('signupPage.validation.emailInvalid') }),
      password: z
        .string()
        .min(8, { message: t('signupPage.validation.passwordMin') })
        .regex(/[A-Z]/, {
          message: t('signupPage.validation.passwordUppercase'),
        })
        .regex(/[a-z]/, {
          message: t('signupPage.validation.passwordLowercase'),
        })
        .regex(/[0-9]/, { message: t('signupPage.validation.passwordNumber') }),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t('signupPage.validation.passwordsNoMatch'),
      path: ['confirmPassword'],
    }), [t]);

  type SignupFormValues = z.infer<typeof signupSchema>;

  // Get callback URL from search params
  const callbackUrl =
    searchParams.get('callbackUrl') ||
    searchParams.get('redirect') ||
    '/dashboard';

  // Initialize form
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  // Handle form submission
  async function onSubmit(data: SignupFormValues) {
    setIsLoading(true);
    setError(null);

    const body = JSON.stringify({
      name: data.name,
      email: data.email,
      password: data.password,
    });


    try {
      // Create account using our custom API endpoint
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || ''}/api/singup`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body,
        }
      );

      const result = await response?.json();

      if (!response.ok) {
        setError(result.error || t('signupPage.errors.generic'));
        setIsLoading(false);
        return;
      }

      // Sign in the user after successful registration using NextAuth
      const signInResult = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (signInResult?.error) {
        setError(
          t('signupPage.errors.signIn')
        );
        router.push('/login');
      } else {
        toast(t('signupPage.errors.success'));
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (error) {
      console.error('Error during signup:', error);
      setError(t('signupPage.errors.generic'));
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">
          {t('signupPage.title')}
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          {t('signupPage.subtitle')}{' '}
          <Link
            href="/login"
            className="font-medium text-rose-600 hover:text-rose-500"
          >
            {t('signupPage.login')}
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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('signupPage.nameLabel')}</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder={t('signupPage.namePlaceholder')}
                    autoComplete="name"
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('signupPage.emailLabel')}</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder={t('signupPage.emailPlaceholder')}
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
                <FormLabel>{t('signupPage.passwordLabel')}</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder={t('signupPage.passwordPlaceholder')}
                      autoComplete="new-password"
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
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
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

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('signupPage.confirmPasswordLabel')}</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder={t('signupPage.confirmPasswordPlaceholder')}
                      autoComplete="new-password"
                      disabled={isLoading}
                      {...field}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      tabIndex={-1}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                      <span className="sr-only">
                        {showConfirmPassword ? 'Hide password' : 'Show password'}
                      </span>
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-2">
            <div className="text-xs text-gray-600">
              {t('signupPage.passwordRules.title')}
              <ul className="mt-1 space-y-1 list-disc list-inside">
                <li>{t('signupPage.passwordRules.minChars')}</li>
                <li>{t('signupPage.passwordRules.uppercase')}</li>
                <li>{t('signupPage.passwordRules.lowercase')}</li>
                <li>{t('signupPage.passwordRules.number')}</li>
              </ul>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-rose-600 hover:bg-rose-500"
            disabled={isLoading}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? t('signupPage.submitting') : t('signupPage.submit')}
          </Button>
        </form>
      </Form>

      <p className="text-center text-xs text-gray-500">
        {t('signupPage.terms.prefix')}{' '}
        <Link
          href="/terms"
          className="font-medium text-rose-600 hover:text-rose-500"
        >
          {t('signupPage.terms.tos')}
        </Link>{' '}
        {t('signupPage.terms.and')}{' '}
        <Link
          href="/privacy"
          className="font-medium text-rose-600 hover:text-rose-500"
        >
          {t('signupPage.terms.privacy')}
        </Link>
      </p>
    </div>
  );
}
