import { Resend } from 'resend';

/**
 * Shared Resend client to avoid multiple initializations.
 * Requires RESEND_API_KEY environment variable.
 */
export const resend = process.env.RESEND_API_KEY
    ? new Resend(process.env.RESEND_API_KEY)
    : null;

/**
 * Standard email settings for the application
 */
export const EMAIL_CONFIG = {
    from: 'Contact Form <noreply@unclesamjunkremoval.com>',
    to: 'unclesamjunkremoval@gmail.com',
    customerFrom: 'Uncle Sam Junk Removal <noreply@unclesamjunkremoval.com>',
};
