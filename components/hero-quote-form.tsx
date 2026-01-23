'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { CheckCircle, Phone } from 'lucide-react'
import { settings } from '@/lib/cms-content'
import { submitQuoteForm } from '@/lib/form-handlers'

/**
 * Compact quote form designed to be embedded in the hero section
 * Minimal fields for quick lead capture, reduced cognitive load
 */
export function HeroQuoteForm() {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        service: 'Junk Removal',
    })
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)

        // Basic validation
        if (!formData.name.trim() || !formData.phone.trim() || !formData.email.trim()) {
            setError('Please fill in all fields')
            return
        }

        setIsSubmitting(true)

        try {
            await submitQuoteForm({
                formData: {
                    name: formData.name,
                    phone: formData.phone,
                    email: formData.email,
                    service: formData.service,
                },
                source: 'hero-quote-form',
                onSuccess: () => setIsSubmitted(true),
                onError: (msg) => setError(msg),
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    if (isSubmitted) {
        return (
            <div className="rounded-lg border border-border bg-card p-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <CheckCircle className="h-6 w-6 text-primary" aria-hidden="true" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">Request Received!</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                    We'll contact you shortly with your free estimate.
                </p>
                <a
                    href={`tel:${settings.phoneE164}`}
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                >
                    <Phone className="h-4 w-4" aria-hidden="true" />
                    Call {settings.phone} for immediate service
                </a>
            </div>
        )
    }

    return (
        <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="mb-4 text-lg font-semibold text-foreground">Get Your Free Quote</h3>
            <form onSubmit={handleSubmit} className="space-y-3">
                <Input
                    type="text"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    required
                    className="bg-background"
                />
                <Input
                    type="tel"
                    placeholder="Phone number"
                    value={formData.phone}
                    onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                    required
                    className="bg-background"
                />
                <Input
                    type="email"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                    required
                    className="bg-background"
                />
                {error && <p className="text-sm text-destructive">{error}</p>}
                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full"
                >
                    {isSubmitting ? 'Submitting...' : 'Get Free Quote'}
                </Button>
                <p className="text-center text-xs text-muted-foreground">
                    Free estimates · Same-day service available
                </p>
            </form>
        </div>
    )
}
