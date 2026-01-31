'use server';

import { z } from 'zod';
import { randomBytes } from 'crypto';
import bcrypt from 'bcryptjs';
import { connectToDatabase } from '@/lib/mongodb';
import { transporter } from '@/lib/nodemailer';

const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

export async function forgotPassword(formData: FormData) {
  const email = formData.get('email');
  const result = forgotPasswordSchema.safeParse({ email });

  if (!result.success) {
    return {
      error: 'Invalid email address',
    };
  }

  try {
    const { db } = await connectToDatabase();

    // 1. Check if user exists
    const user = await db.collection('users').findOne({ email: result.data.email });

    // We don't want to reveal if a user exists or not for security reasons
    // So we just return success if the user doesn't exist
    if (!user) {
      // Simulate delay to prevent timing attacks
      await new Promise(resolve => setTimeout(resolve, 500));
      return { success: true };
    }

    // 2. Generate reset token
    const token = randomBytes(32).toString('hex');
    const tokenExpires = new Date(Date.now() + 3600000); // 1 hour

    // 3. Save token to user
    await db.collection('users').updateOne(
      { email: result.data.email },
      {
        $set: {
          resetPasswordToken: token,
          resetPasswordExpires: tokenExpires,
        },
      }
    );

    // 4. Send email
    // TODO: add correct url
    const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password/${token}`;

    await transporter.sendMail({
      from: '"PawFinder" <no-reply@PawFinder.com>',
      to: result.data.email,
      subject: 'Reset your PawFinder password',
      text: `Hello,
      
You requested a password reset. Please click the link below to reset your password:

${resetUrl}

If you didn't request this, please ignore this email.

This link will expire in 1 hour.`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Reset your password</h2>
          <p>Hello,</p>
          <p>You requested a password reset. Click the button below to choose a new password:</p>
          <a href="${resetUrl}" style="display: inline-block; background-color: #e11d48; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; margin: 16px 0;">Reset Password</a>
          <p>Or verify using this link: <br><a href="${resetUrl}">${resetUrl}</a></p>
          <p>If you didn't request this, please ignore this email.</p>
          <p>This link will expire in 1 hour.</p>
        </div>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error('Forgot password error:', error);
    return {
      error: 'An unexpected error occurred. Please try again.',
    };
  }
}

const resetPasswordSchema = z.object({
  password: z.string().min(8),
  token: z.string(),
});

export async function resetPassword(formData: FormData) {
  const password = formData.get('password');
  const token = formData.get('token');

  const result = resetPasswordSchema.safeParse({ password, token });

  if (!result.success) {
    return {
      error: 'Invalid password or token',
    };
  }

  try {
    const { db } = await connectToDatabase();

    // 1. Find user with valid token and not expired
    const user = await db.collection('users').findOne({
      resetPasswordToken: result.data.token,
      resetPasswordExpires: { $gt: new Date() },
    });

    if (!user) {
      return {
        error: 'Reset token is invalid or has expired.',
      };
    }

    // 2. Hash new password
    const hashedPassword = await bcrypt.hash(result.data.password, 12);

    // 3. Update user
    await db.collection('users').updateOne(
      { _id: user._id },
      {
        $set: { password: hashedPassword },
        $unset: {
          resetPasswordToken: '',
          resetPasswordExpires: '',
        },
      }
    );

    return { success: true };
  } catch (error) {
    console.error('Reset password error:', error);
    return {
      error: 'An unexpected error occurred. Please try again.',
    };
  }
}
