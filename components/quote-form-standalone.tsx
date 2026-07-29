'use client'

import type { ChangeEvent, FormEvent, ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'
import {
  AlertCircle,
  Camera,
  Check,
  CheckCircle2,
  FileImage,
  LoaderCircle,
  Phone,
  Upload,
  X,
} from 'lucide-react'
import { settings } from '@/lib/cms-content'
import { trackQuoteEvent } from '@/lib/quoteTracking'

const MAX_PHOTOS = 8
const MAX_UPLOAD_BYTES = 3_500_000
const ACCEPTED_PHOTO_TYPES = new Set(['image/jpeg', 'image/png', 'image/heic', 'image/heif'])
const ACCEPTED_PHOTO_EXTENSIONS = /\.(jpe?g|png|heic|heif)$/i

const inputClass =
  'border-border bg-background text-foreground placeholder:text-muted-foreground h-10 w-full rounded-md border px-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15'
const textareaClass =
  'border-border bg-background text-foreground placeholder:text-muted-foreground w-full rounded-md border px-3 py-2 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15'
const labelClass = 'text-foreground mb-1.5 block text-xs font-semibold'

type ServiceValue = 'furniture' | 'shed' | 'appliances' | 'cleanouts' | 'debris' | 'other'
type UrgencyValue = 'today' | 'within-2-3-days' | 'choose-date' | 'flexible'
type PlacementValue = 'indoor' | 'outdoor' | 'both' | 'unsure'
type ContactValue = 'call' | 'text' | 'email'

type FormState = {
  name: string
  phone: string
  email: string
  address: string
  service: ServiceValue | ''
  urgency: UrgencyValue
  preferredDate: string
  quantity: string
  placement: PlacementValue
  access: string[]
  heavyMaterials: boolean
  dismantling: boolean
  heavyDetails: string
  preferredContact: ContactValue
  notes: string
  consent: boolean
  company: string
  furnitureItemType: string
  furnitureQuantity: string
  furnitureStairs: string
  shedDimensions: string
  shedMaterial: string
  shedContents: string
  shedAccess: string
  applianceType: string
  applianceFloor: string
  applianceDisconnected: string
  cleanoutRooms: string
  cleanoutLoad: string
  cleanoutOccupancy: string
  debrisMaterial: string
  debrisVolume: string
}

type PhotoItem = {
  id: string
  file: File
  previewUrl: string
  originalName: string
}

type PhotoUploadStatus = {
  state: 'waiting' | 'uploading' | 'sent' | 'failed'
  progress: number
}

type SubmitResult = {
  reference: string
  confirmationSent: boolean
  photosSent: number
  photosTotal: number
}

type FieldError = {
  id: string
  message: string
}

const serviceOptions: Array<{
  value: ServiceValue
  label: string
  range: string
}> = [
  {
    value: 'furniture',
    label: 'Furniture',
    range: 'Typical single-item pickups start around $75–$150.',
  },
  {
    value: 'appliances',
    label: 'Appliances',
    range: 'Typical single-appliance pickups start around $75–$150.',
  },
  {
    value: 'cleanouts',
    label: 'Cleanouts',
    range: 'Typical volume pricing: ¼ load $200–$300, ½ load $350–$450, full load $500–$650.',
  },
  {
    value: 'shed',
    label: 'Shed removal',
    range: 'Photos are needed to plan shed tear-down and hauling.',
  },
  {
    value: 'debris',
    label: 'Debris',
    range: 'Photos are needed to plan material handling and volume.',
  },
  {
    value: 'other',
    label: 'Something else',
    range: 'Tell us what needs to go; photos usually give us the fastest start.',
  },
]

const serviceLabels = Object.fromEntries(
  serviceOptions.map(option => [option.value, option.label])
) as Record<ServiceValue, string>

const initialState: FormState = {
  name: '',
  phone: '',
  email: '',
  address: '',
  service: '',
  urgency: 'flexible',
  preferredDate: '',
  quantity: '',
  placement: 'unsure',
  access: [],
  heavyMaterials: false,
  dismantling: false,
  heavyDetails: '',
  preferredContact: 'call',
  notes: '',
  consent: false,
  company: '',
  furnitureItemType: '',
  furnitureQuantity: '',
  furnitureStairs: '',
  shedDimensions: '',
  shedMaterial: '',
  shedContents: '',
  shedAccess: '',
  applianceType: '',
  applianceFloor: '',
  applianceDisconnected: '',
  cleanoutRooms: '',
  cleanoutLoad: '',
  cleanoutOccupancy: '',
  debrisMaterial: '',
  debrisVolume: '',
}

function ChoiceButton({
  active,
  children,
  onClick,
}: {
  active: boolean
  children: ReactNode
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`min-h-9 rounded-md border px-3 py-1.5 text-xs font-semibold transition ${
        active
          ? 'border-primary bg-primary text-primary-foreground'
          : 'border-border bg-background text-foreground hover:border-primary/60'
      }`}
    >
      {children}
    </button>
  )
}

function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image()
    const objectUrl = URL.createObjectURL(file)
    image.onload = () => {
      URL.revokeObjectURL(objectUrl)
      resolve(image)
    }
    image.onerror = () => {
      URL.revokeObjectURL(objectUrl)
      reject(new Error('This browser could not prepare that photo.'))
    }
    image.src = objectUrl
  })
}

async function compressPhoto(file: File): Promise<File> {
  try {
    const image = await loadImage(file)
    const scale = Math.min(1, 1600 / Math.max(image.naturalWidth, image.naturalHeight))
    const width = Math.max(1, Math.round(image.naturalWidth * scale))
    const height = Math.max(1, Math.round(image.naturalHeight * scale))
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    const context = canvas.getContext('2d')
    if (!context) throw new Error('Photo preparation is unavailable.')
    context.fillStyle = '#ffffff'
    context.fillRect(0, 0, width, height)
    context.drawImage(image, 0, 0, width, height)

    const blob = await new Promise<Blob | null>(resolve => {
      canvas.toBlob(resolve, 'image/jpeg', 0.76)
    })
    if (!blob) throw new Error('Photo preparation failed.')

    const compressed = new File(
      [blob],
      file.name.replace(/\.(png|heic|heif|jpe?g)$/i, '') + '.jpg',
      {
        type: 'image/jpeg',
        lastModified: file.lastModified,
      }
    )

    if (compressed.size < file.size || file.size > MAX_UPLOAD_BYTES) return compressed
    return file
  } catch {
    if (file.size <= MAX_UPLOAD_BYTES) return file
    throw new Error(`${file.name} is too large to prepare. Choose a photo under 3.5 MB.`)
  }
}

function isAcceptedPhoto(file: File): boolean {
  return (
    ACCEPTED_PHOTO_TYPES.has(file.type.toLowerCase()) || ACCEPTED_PHOTO_EXTENSIONS.test(file.name)
  )
}

export function QuoteFormStandalone() {
  const [form, setForm] = useState<FormState>(initialState)
  const [photos, setPhotos] = useState<PhotoItem[]>([])
  const [photoStatuses, setPhotoStatuses] = useState<Record<string, PhotoUploadStatus>>({})
  const [isPreparingPhotos, setIsPreparingPhotos] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formError, setFormError] = useState('')
  const [result, setResult] = useState<SubmitResult | null>(null)
  const startedRef = useRef(false)
  const startedAtRef = useRef(Date.now())
  const photoUrlsRef = useRef<string[]>([])
  const submissionIdRef = useRef(
    typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random()}`
  )

  useEffect(() => {
    photoUrlsRef.current = photos.map(photo => photo.previewUrl).filter(Boolean)
  }, [photos])

  useEffect(() => {
    return () => {
      for (const url of photoUrlsRef.current) URL.revokeObjectURL(url)
    }
  }, [])

  const selectedService = serviceOptions.find(option => option.value === form.service)

  const setField = <Key extends keyof FormState>(key: Key, value: FormState[Key]) => {
    setForm(previous => ({ ...previous, [key]: value }))
    if (formError) setFormError('')
  }

  const markStarted = () => {
    if (startedRef.current) return
    startedRef.current = true
    trackQuoteEvent('quote_form_started', { source: 'quote-page' })
  }

  const handleServiceChange = (value: ServiceValue) => {
    setField('service', value)
    trackQuoteEvent('quote_service_selected', {
      service: value,
      source: 'quote-page',
    })
  }

  const toggleAccess = (value: string) => {
    setForm(previous => ({
      ...previous,
      access: previous.access.includes(value)
        ? previous.access.filter(item => item !== value)
        : [...previous.access, value],
    }))
  }

  const addPhotos = async (event: ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(event.target.files || [])
    event.target.value = ''
    if (selected.length === 0) return

    markStarted()
    setFormError('')

    if (photos.length + selected.length > MAX_PHOTOS) {
      setFormError(`Choose no more than ${MAX_PHOTOS} photos.`)
      return
    }

    const invalid = selected.find(file => !isAcceptedPhoto(file))
    if (invalid) {
      setFormError('Use JPG, PNG, or HEIC photos.')
      return
    }

    setIsPreparingPhotos(true)
    try {
      const prepared: PhotoItem[] = []
      for (const original of selected) {
        const file = await compressPhoto(original)
        if (file.size > MAX_UPLOAD_BYTES) {
          throw new Error(`${original.name} is still larger than 3.5 MB.`)
        }
        const previewable = file.type === 'image/jpeg' || file.type === 'image/png'
        prepared.push({
          id:
            typeof crypto !== 'undefined' && 'randomUUID' in crypto
              ? crypto.randomUUID()
              : `${Date.now()}-${Math.random()}`,
          file,
          previewUrl: previewable ? URL.createObjectURL(file) : '',
          originalName: original.name,
        })
      }

      setPhotos(previous => [...previous, ...prepared])
      setPhotoStatuses(previous => ({
        ...previous,
        ...Object.fromEntries(
          prepared.map(photo => [photo.id, { state: 'waiting' as const, progress: 0 }])
        ),
      }))
      trackQuoteEvent('quote_photos_added', {
        count: prepared.length,
        total: photos.length + prepared.length,
      })
    } catch (error) {
      setFormError(error instanceof Error ? error.message : 'Could not prepare those photos.')
    } finally {
      setIsPreparingPhotos(false)
    }
  }

  const removePhoto = (id: string) => {
    const photo = photos.find(item => item.id === id)
    if (photo?.previewUrl) URL.revokeObjectURL(photo.previewUrl)
    setPhotos(previous => previous.filter(item => item.id !== id))
    setPhotoStatuses(previous => {
      const next = { ...previous }
      delete next[id]
      return next
    })
  }

  const getConditionalDetails = (): Record<string, string> => {
    switch (form.service) {
      case 'furniture':
        return {
          'Item type': form.furnitureItemType,
          'Item quantity': form.furnitureQuantity,
          'Floor / stairs': form.furnitureStairs,
        }
      case 'shed':
        return {
          Dimensions: form.shedDimensions,
          Material: form.shedMaterial,
          Contents: form.shedContents,
          'Shed access': form.shedAccess,
        }
      case 'appliances':
        return {
          'Appliance type': form.applianceType,
          Floor: form.applianceFloor,
          'Disconnected status': form.applianceDisconnected,
        }
      case 'cleanouts':
        return {
          'Rooms / areas': form.cleanoutRooms,
          'Estimated load': form.cleanoutLoad,
          Occupancy: form.cleanoutOccupancy,
        }
      case 'debris':
        return {
          'Debris material': form.debrisMaterial,
          'Estimated volume': form.debrisVolume,
        }
      default:
        return {}
    }
  }

  const validate = (): FieldError[] => {
    const errors: FieldError[] = []
    if (form.name.trim().length < 2) errors.push({ id: 'quote-name', message: 'Enter your name.' })
    if (form.phone.replace(/\D/g, '').length < 10) {
      errors.push({
        id: 'quote-phone',
        message: 'Enter a valid phone number.',
      })
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errors.push({
        id: 'quote-email',
        message: 'Enter a valid email address.',
      })
    }
    if (form.address.trim().length < 2) {
      errors.push({
        id: 'quote-address',
        message: 'Enter the pickup address or area.',
      })
    }
    if (!form.service) errors.push({ id: 'quote-service', message: 'Choose a service.' })
    if (form.quantity.trim().length < 1) {
      errors.push({
        id: 'quote-quantity',
        message: 'Estimate the quantity or load size.',
      })
    }
    if (form.urgency === 'choose-date' && !form.preferredDate) {
      errors.push({ id: 'quote-date', message: 'Choose a preferred date.' })
    }
    if (photos.length > 0 && photos.length < 3) {
      errors.push({
        id: 'quote-photo-upload',
        message: 'Add at least 3 photos, or remove them and submit without photos.',
      })
    }
    if (!form.consent) {
      errors.push({
        id: 'quote-consent',
        message: 'Confirm service-contact consent.',
      })
    }
    return errors
  }

  const uploadPhoto = (
    photo: PhotoItem,
    reference: string,
    index: number,
    total: number
  ): Promise<void> => {
    return new Promise((resolve, reject) => {
      const body = new FormData()
      body.append('reference', reference)
      body.append('name', form.name)
      body.append('email', form.email)
      body.append('index', String(index))
      body.append('total', String(total))
      body.append('photo', photo.file, photo.file.name)

      const request = new XMLHttpRequest()
      request.open('POST', '/api/quote/photo')
      request.upload.onprogress = event => {
        if (!event.lengthComputable) return
        const progress = Math.min(99, Math.round((event.loaded / event.total) * 100))
        setPhotoStatuses(previous => ({
          ...previous,
          [photo.id]: { state: 'uploading', progress },
        }))
      }
      request.onerror = () => {
        setPhotoStatuses(previous => ({
          ...previous,
          [photo.id]: { state: 'failed', progress: 0 },
        }))
        reject(new Error('Photo upload failed.'))
      }
      request.onload = () => {
        let payload: { ok?: boolean; error?: string } = {}
        try {
          payload = JSON.parse(request.responseText) as {
            ok?: boolean
            error?: string
          }
        } catch {
          // A non-JSON response is handled as an upload failure below.
        }

        if (request.status >= 200 && request.status < 300 && payload.ok) {
          setPhotoStatuses(previous => ({
            ...previous,
            [photo.id]: { state: 'sent', progress: 100 },
          }))
          resolve()
          return
        }

        setPhotoStatuses(previous => ({
          ...previous,
          [photo.id]: { state: 'failed', progress: 0 },
        }))
        reject(new Error(payload.error || 'Photo upload failed.'))
      }
      setPhotoStatuses(previous => ({
        ...previous,
        [photo.id]: { state: 'uploading', progress: 1 },
      }))
      request.send(body)
    })
  }

  const sendPhotos = async (
    reference: string,
    selectedPhotos: PhotoItem[]
  ): Promise<{ sent: number; failed: number }> => {
    let sent = 0
    let failed = 0
    for (const photo of selectedPhotos) {
      const index = photos.findIndex(item => item.id === photo.id) + 1
      try {
        await uploadPhoto(photo, reference, index, photos.length)
        sent += 1
      } catch {
        failed += 1
      }
    }
    return { sent, failed }
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    markStarted()
    setFormError('')

    const errors = validate()
    if (errors.length > 0) {
      setFormError(errors[0]?.message || 'Check the form and try again.')
      trackQuoteEvent('quote_validation_error', {
        first_field: errors[0]?.id,
        error_count: errors.length,
      })
      document.getElementById(errors[0]?.id || '')?.focus()
      return
    }

    setIsSubmitting(true)
    trackQuoteEvent('quote_submit_attempt', {
      service: form.service,
      urgency: form.urgency,
      photo_count: photos.length,
      contact_method: form.preferredContact,
    })

    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          submissionId: submissionIdRef.current,
          name: form.name,
          phone: form.phone,
          email: form.email,
          address: form.address,
          service: form.service ? serviceLabels[form.service] : '',
          urgency: form.urgency,
          preferredDate: form.preferredDate,
          quantity: form.quantity,
          placement: form.placement,
          access: form.access,
          heavyMaterials: form.heavyMaterials,
          dismantling: form.dismantling,
          heavyDetails: form.heavyDetails,
          preferredContact: form.preferredContact,
          conditionalDetails: getConditionalDetails(),
          notes: form.notes,
          consent: form.consent,
          company: form.company,
          source: 'quote-form-v2',
          startedAt: startedAtRef.current,
        }),
      })
      const payload = (await response.json()) as {
        ok?: boolean
        error?: string
        reference?: string
        confirmationSent?: boolean
      }

      if (!response.ok || !payload.ok || !payload.reference) {
        throw new Error(payload.error || 'Could not send your request.')
      }

      const photoDelivery =
        photos.length > 0 ? await sendPhotos(payload.reference, photos) : { sent: 0, failed: 0 }

      setResult({
        reference: payload.reference,
        confirmationSent: payload.confirmationSent !== false,
        photosSent: photoDelivery.sent,
        photosTotal: photos.length,
      })
      trackQuoteEvent('quote_submitted', {
        reference: payload.reference,
        service: form.service,
        photo_count: photos.length,
        photos_delivered: photoDelivery.sent,
      })
      if (photoDelivery.failed > 0) {
        trackQuoteEvent('quote_photo_delivery_error', {
          reference: payload.reference,
          failed_count: photoDelivery.failed,
        })
      }
    } catch (error) {
      setFormError(
        error instanceof Error
          ? error.message
          : 'Something went wrong. Please try again or call us.'
      )
      trackQuoteEvent('quote_delivery_error', {
        service: form.service,
        photo_count: photos.length,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const retryFailedPhotos = async () => {
    if (!result) return
    const failed = photos.filter(photo => photoStatuses[photo.id]?.state === 'failed')
    if (failed.length === 0) return

    setIsSubmitting(true)
    const delivery = await sendPhotos(result.reference, failed)
    setResult(previous =>
      previous
        ? {
            ...previous,
            photosSent: previous.photosSent + delivery.sent,
          }
        : previous
    )
    setIsSubmitting(false)
  }

  if (result) {
    const failedCount = result.photosTotal - result.photosSent
    return (
      <section
        className="border-border bg-card mx-auto max-w-3xl rounded-xl border p-5 shadow-sm sm:p-6"
        aria-live="polite"
      >
        <div className="mb-4 flex items-start gap-3">
          <span className="bg-primary/10 text-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
            <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <h2 className="text-foreground text-xl font-bold">
              Request {result.reference} received.
            </h2>
            <p className="text-muted-foreground mt-1 text-sm">
              We normally respond as soon as possible during business hours.
            </p>
          </div>
        </div>

        <dl className="border-border bg-muted/30 mb-4 grid gap-3 rounded-lg border p-4 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-muted-foreground text-xs">Service</dt>
            <dd className="text-foreground font-semibold">
              {form.service ? serviceLabels[form.service] : 'Quote request'}
            </dd>
          </div>
          <div>
            <dt className="text-muted-foreground text-xs">Timing</dt>
            <dd className="text-foreground font-semibold">
              {form.urgency === 'today'
                ? 'Today'
                : form.urgency === 'within-2-3-days'
                  ? 'Within 2–3 days'
                  : form.urgency === 'choose-date'
                    ? form.preferredDate
                    : 'Flexible'}
            </dd>
          </div>
          <div>
            <dt className="text-muted-foreground text-xs">Quantity / load</dt>
            <dd className="text-foreground font-semibold">{form.quantity}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground text-xs">Preferred contact</dt>
            <dd className="text-foreground font-semibold capitalize">{form.preferredContact}</dd>
          </div>
          {result.photosTotal > 0 && (
            <div className="sm:col-span-2">
              <dt className="text-muted-foreground text-xs">Photos delivered</dt>
              <dd className="text-foreground font-semibold">
                {result.photosSent} of {result.photosTotal}
              </dd>
            </div>
          )}
        </dl>

        {!result.confirmationSent && (
          <p className="mb-4 rounded-md bg-amber-50 p-3 text-sm text-amber-900">
            Your request reached us, but your confirmation email may be delayed.
          </p>
        )}

        {failedCount > 0 && (
          <div className="mb-4 flex flex-col gap-3 rounded-md bg-amber-50 p-3 text-sm text-amber-900 sm:flex-row sm:items-center sm:justify-between">
            <span>
              Your request arrived, but {failedCount} photo
              {failedCount === 1 ? '' : 's'} did not.
            </span>
            <button
              type="button"
              onClick={retryFailedPhotos}
              disabled={isSubmitting}
              className="rounded-md border border-amber-700 px-3 py-2 text-xs font-bold disabled:opacity-60"
            >
              {isSubmitting ? 'Retrying…' : 'Retry failed photos'}
            </button>
          </div>
        )}

        <a
          href={`tel:${settings.phoneE164}`}
          className="bg-primary text-primary-foreground inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md px-4 text-sm font-bold sm:w-auto"
        >
          <Phone className="h-4 w-4" aria-hidden="true" />
          Urgent? Call {settings.phone}
        </a>
      </section>
    )
  }

  return (
    <section className="border-border bg-card mx-auto max-w-3xl rounded-xl border shadow-sm">
      <div className="border-border flex flex-wrap items-center justify-between gap-2 border-b px-5 py-4">
        <div>
          <h2 className="text-foreground text-xl font-bold">Request a free quote</h2>
          <p className="text-muted-foreground mt-0.5 text-xs">
            One compact form. No account required.
          </p>
        </div>
        <span className="border-primary/30 text-primary rounded-full border px-3 py-1 text-xs font-bold">
          Free estimate
        </span>
      </div>

      <form
        onSubmit={handleSubmit}
        onFocusCapture={markStarted}
        className="space-y-5 p-5 sm:p-6"
        noValidate
      >
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label htmlFor="quote-name" className={labelClass}>
              Name *
            </label>
            <input
              id="quote-name"
              name="name"
              autoComplete="name"
              value={form.name}
              onChange={event => setField('name', event.target.value)}
              className={inputClass}
              required
            />
          </div>
          <div>
            <label htmlFor="quote-phone" className={labelClass}>
              Phone *
            </label>
            <input
              id="quote-phone"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              value={form.phone}
              onChange={event => setField('phone', event.target.value)}
              className={inputClass}
              required
            />
          </div>
          <div>
            <label htmlFor="quote-email" className={labelClass}>
              Email *
            </label>
            <input
              id="quote-email"
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              value={form.email}
              onChange={event => setField('email', event.target.value)}
              className={inputClass}
              required
            />
          </div>
          <div>
            <label htmlFor="quote-address" className={labelClass}>
              Pickup address or area *
            </label>
            <input
              id="quote-address"
              name="address"
              autoComplete="street-address"
              value={form.address}
              onChange={event => setField('address', event.target.value)}
              className={inputClass}
              placeholder="Street, city, ZIP"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="quote-service" className={labelClass}>
            What needs to go? *
          </label>
          <select
            id="quote-service"
            value={form.service}
            onChange={event => handleServiceChange(event.target.value as ServiceValue)}
            className={inputClass}
            required
          >
            <option value="">Choose a service</option>
            {serviceOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {selectedService && (
            <div className="border-primary/20 bg-primary/5 mt-2 rounded-md border px-3 py-2">
              <p className="text-foreground text-xs font-semibold">{selectedService.range}</p>
              <p className="text-muted-foreground mt-0.5 text-[11px]">
                Final price is confirmed onsite after we see volume, material, and access.
              </p>
            </div>
          )}
        </div>

        {form.service && (
          <div className="border-border bg-muted/20 rounded-lg border p-3">
            <p className="text-foreground mb-3 text-xs font-bold uppercase tracking-wide">
              A few {serviceLabels[form.service].toLowerCase()} details
            </p>
            {form.service === 'furniture' && (
              <div className="grid gap-3 sm:grid-cols-3">
                <div>
                  <label htmlFor="furniture-type" className={labelClass}>
                    Item type
                  </label>
                  <input
                    id="furniture-type"
                    value={form.furnitureItemType}
                    onChange={event => setField('furnitureItemType', event.target.value)}
                    className={inputClass}
                    placeholder="Sofa, mattress…"
                  />
                </div>
                <div>
                  <label htmlFor="furniture-quantity" className={labelClass}>
                    Quantity
                  </label>
                  <input
                    id="furniture-quantity"
                    value={form.furnitureQuantity}
                    onChange={event => setField('furnitureQuantity', event.target.value)}
                    className={inputClass}
                    placeholder="e.g. 3 items"
                  />
                </div>
                <div>
                  <label htmlFor="furniture-stairs" className={labelClass}>
                    Floor / stairs
                  </label>
                  <input
                    id="furniture-stairs"
                    value={form.furnitureStairs}
                    onChange={event => setField('furnitureStairs', event.target.value)}
                    className={inputClass}
                    placeholder="Ground floor"
                  />
                </div>
              </div>
            )}

            {form.service === 'shed' && (
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label htmlFor="shed-dimensions" className={labelClass}>
                    Dimensions
                  </label>
                  <input
                    id="shed-dimensions"
                    value={form.shedDimensions}
                    onChange={event => setField('shedDimensions', event.target.value)}
                    className={inputClass}
                    placeholder="e.g. 10 × 12 ft"
                  />
                </div>
                <div>
                  <label htmlFor="shed-material" className={labelClass}>
                    Material
                  </label>
                  <input
                    id="shed-material"
                    value={form.shedMaterial}
                    onChange={event => setField('shedMaterial', event.target.value)}
                    className={inputClass}
                    placeholder="Wood, metal, resin…"
                  />
                </div>
                <div>
                  <label htmlFor="shed-contents" className={labelClass}>
                    Contents
                  </label>
                  <input
                    id="shed-contents"
                    value={form.shedContents}
                    onChange={event => setField('shedContents', event.target.value)}
                    className={inputClass}
                    placeholder="Empty or items inside"
                  />
                </div>
                <div>
                  <label htmlFor="shed-access" className={labelClass}>
                    Access
                  </label>
                  <input
                    id="shed-access"
                    value={form.shedAccess}
                    onChange={event => setField('shedAccess', event.target.value)}
                    className={inputClass}
                    placeholder="Gate width, yard access…"
                  />
                </div>
              </div>
            )}

            {form.service === 'appliances' && (
              <div className="grid gap-3 sm:grid-cols-3">
                <div>
                  <label htmlFor="appliance-type" className={labelClass}>
                    Appliance
                  </label>
                  <input
                    id="appliance-type"
                    value={form.applianceType}
                    onChange={event => setField('applianceType', event.target.value)}
                    className={inputClass}
                    placeholder="Fridge, washer…"
                  />
                </div>
                <div>
                  <label htmlFor="appliance-floor" className={labelClass}>
                    Floor
                  </label>
                  <input
                    id="appliance-floor"
                    value={form.applianceFloor}
                    onChange={event => setField('applianceFloor', event.target.value)}
                    className={inputClass}
                    placeholder="Basement, first…"
                  />
                </div>
                <div>
                  <label htmlFor="appliance-disconnected" className={labelClass}>
                    Disconnection
                  </label>
                  <select
                    id="appliance-disconnected"
                    value={form.applianceDisconnected}
                    onChange={event => setField('applianceDisconnected', event.target.value)}
                    className={inputClass}
                  >
                    <option value="">Choose</option>
                    <option value="Disconnected">Disconnected</option>
                    <option value="Needs disconnection">Needs disconnection</option>
                    <option value="Not sure">Not sure</option>
                  </select>
                </div>
              </div>
            )}

            {form.service === 'cleanouts' && (
              <div className="grid gap-3 sm:grid-cols-3">
                <div>
                  <label htmlFor="cleanout-rooms" className={labelClass}>
                    Rooms / areas
                  </label>
                  <input
                    id="cleanout-rooms"
                    value={form.cleanoutRooms}
                    onChange={event => setField('cleanoutRooms', event.target.value)}
                    className={inputClass}
                    placeholder="Garage + 2 rooms"
                  />
                </div>
                <div>
                  <label htmlFor="cleanout-load" className={labelClass}>
                    Approx. load
                  </label>
                  <select
                    id="cleanout-load"
                    value={form.cleanoutLoad}
                    onChange={event => setField('cleanoutLoad', event.target.value)}
                    className={inputClass}
                  >
                    <option value="">Choose</option>
                    <option value="Quarter load">¼ load</option>
                    <option value="Half load">½ load</option>
                    <option value="Full load">Full load</option>
                    <option value="Multiple loads">Multiple loads</option>
                    <option value="Not sure">Not sure</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="cleanout-occupancy" className={labelClass}>
                    Property
                  </label>
                  <select
                    id="cleanout-occupancy"
                    value={form.cleanoutOccupancy}
                    onChange={event => setField('cleanoutOccupancy', event.target.value)}
                    className={inputClass}
                  >
                    <option value="">Choose</option>
                    <option value="Occupied">Occupied</option>
                    <option value="Vacant">Vacant</option>
                    <option value="Partly occupied">Partly occupied</option>
                  </select>
                </div>
              </div>
            )}

            {form.service === 'debris' && (
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label htmlFor="debris-material" className={labelClass}>
                    Material type
                  </label>
                  <input
                    id="debris-material"
                    value={form.debrisMaterial}
                    onChange={event => setField('debrisMaterial', event.target.value)}
                    className={inputClass}
                    placeholder="Wood, drywall, concrete…"
                  />
                </div>
                <div>
                  <label htmlFor="debris-volume" className={labelClass}>
                    Estimated volume
                  </label>
                  <input
                    id="debris-volume"
                    value={form.debrisVolume}
                    onChange={event => setField('debrisVolume', event.target.value)}
                    className={inputClass}
                    placeholder="Pickup bed, cubic yards…"
                  />
                </div>
              </div>
            )}

            {form.service === 'other' && (
              <p className="text-muted-foreground text-xs">
                Use the notes field below to describe the job. Photos are especially helpful.
              </p>
            )}
          </div>
        )}

        <fieldset>
          <legend className={labelClass}>Preferred pickup timing *</legend>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {[
              ['today', 'Today'],
              ['within-2-3-days', 'Within 2–3 days'],
              ['choose-date', 'Choose a date'],
              ['flexible', 'Flexible'],
            ].map(([value, text]) => (
              <ChoiceButton
                key={value}
                active={form.urgency === value}
                onClick={() => setField('urgency', value as UrgencyValue)}
              >
                {text}
              </ChoiceButton>
            ))}
          </div>
          {form.urgency === 'choose-date' && (
            <input
              id="quote-date"
              type="date"
              min={new Date().toISOString().slice(0, 10)}
              value={form.preferredDate}
              onChange={event => setField('preferredDate', event.target.value)}
              className={`${inputClass} mt-2 max-w-xs`}
            />
          )}
        </fieldset>

        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label htmlFor="quote-quantity" className={labelClass}>
              Approximate quantity / load size *
            </label>
            <input
              id="quote-quantity"
              value={form.quantity}
              onChange={event => setField('quantity', event.target.value)}
              className={inputClass}
              placeholder="3 items, ½ truck, not sure…"
              required
            />
          </div>
          <fieldset>
            <legend className={labelClass}>Indoor or outdoor *</legend>
            <div className="grid grid-cols-4 gap-1.5">
              {[
                ['indoor', 'Indoor'],
                ['outdoor', 'Outdoor'],
                ['both', 'Both'],
                ['unsure', 'Unsure'],
              ].map(([value, text]) => (
                <ChoiceButton
                  key={value}
                  active={form.placement === value}
                  onClick={() => setField('placement', value as PlacementValue)}
                >
                  {text}
                </ChoiceButton>
              ))}
            </div>
          </fieldset>
        </div>

        <fieldset>
          <legend className={labelClass}>Access details</legend>
          <div className="flex flex-wrap gap-2">
            {['Stairs', 'Elevator', 'Long carry', 'Narrow doorway', 'Difficult parking'].map(
              option => {
                const active = form.access.includes(option)
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => toggleAccess(option)}
                    aria-pressed={active}
                    className={`inline-flex min-h-9 items-center gap-1.5 rounded-md border px-3 text-xs font-semibold transition ${
                      active
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border text-foreground hover:border-primary/60'
                    }`}
                  >
                    {active && <Check className="h-3.5 w-3.5" aria-hidden="true" />}
                    {option}
                  </button>
                )
              }
            )}
          </div>
        </fieldset>

        <div className="grid gap-3 sm:grid-cols-2">
          <label className="border-border flex cursor-pointer items-center gap-3 rounded-md border p-3">
            <input
              type="checkbox"
              checked={form.heavyMaterials}
              onChange={event => setField('heavyMaterials', event.target.checked)}
              className="h-4 w-4 accent-current"
            />
            <span>
              <span className="text-foreground block text-xs font-semibold">Heavy materials</span>
              <span className="text-muted-foreground block text-[11px]">
                Concrete, dirt, safes, cast iron…
              </span>
            </span>
          </label>
          <label className="border-border flex cursor-pointer items-center gap-3 rounded-md border p-3">
            <input
              type="checkbox"
              checked={form.dismantling}
              onChange={event => setField('dismantling', event.target.checked)}
              className="h-4 w-4 accent-current"
            />
            <span>
              <span className="text-foreground block text-xs font-semibold">
                Dismantling required
              </span>
              <span className="text-muted-foreground block text-[11px]">
                Item or structure needs taking apart
              </span>
            </span>
          </label>
        </div>

        {(form.heavyMaterials || form.dismantling) && (
          <div>
            <label htmlFor="quote-heavy-details" className={labelClass}>
              Heavy material / dismantling details
            </label>
            <input
              id="quote-heavy-details"
              value={form.heavyDetails}
              onChange={event => setField('heavyDetails', event.target.value)}
              className={inputClass}
              placeholder="What material, approximate weight, or what needs dismantling?"
            />
          </div>
        )}

        <div id="quote-photo-upload">
          <div className="mb-2 flex flex-wrap items-end justify-between gap-2">
            <div>
              <p className="text-foreground text-xs font-semibold">Photos (optional)</p>
              <p className="text-muted-foreground mt-0.5 text-[11px]">
                Photos usually help us price faster—but you can submit without them. Add 3–8 JPG,
                PNG, or HEIC photos.
              </p>
            </div>
            <div className="flex gap-2">
              <label className="border-border text-foreground hover:border-primary inline-flex min-h-9 cursor-pointer items-center gap-1.5 rounded-md border px-3 text-xs font-bold">
                <Camera className="h-3.5 w-3.5" aria-hidden="true" />
                Camera
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/heic,image/heif,.jpg,.jpeg,.png,.heic,.heif"
                  capture="environment"
                  onChange={addPhotos}
                  className="sr-only"
                  disabled={isPreparingPhotos || isSubmitting}
                />
              </label>
              <label className="border-border text-foreground hover:border-primary inline-flex min-h-9 cursor-pointer items-center gap-1.5 rounded-md border px-3 text-xs font-bold">
                <Upload className="h-3.5 w-3.5" aria-hidden="true" />
                Add photos
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/heic,image/heif,.jpg,.jpeg,.png,.heic,.heif"
                  multiple
                  onChange={addPhotos}
                  className="sr-only"
                  disabled={isPreparingPhotos || isSubmitting}
                />
              </label>
            </div>
          </div>

          {isPreparingPhotos && (
            <p className="text-muted-foreground flex items-center gap-2 text-xs">
              <LoaderCircle className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
              Preparing photos…
            </p>
          )}

          {photos.length > 0 && (
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6">
              {photos.map(photo => {
                const status = photoStatuses[photo.id] || {
                  state: 'waiting',
                  progress: 0,
                }
                return (
                  <div
                    key={photo.id}
                    className="border-border bg-muted/20 relative aspect-square overflow-hidden rounded-md border"
                  >
                    {photo.previewUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={photo.previewUrl}
                        alt={`Preview of ${photo.originalName}`}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="text-muted-foreground flex h-full flex-col items-center justify-center gap-1 p-2 text-center">
                        <FileImage className="h-5 w-5" aria-hidden="true" />
                        <span className="line-clamp-2 text-[9px]">{photo.originalName}</span>
                      </div>
                    )}

                    {!isSubmitting && status.state !== 'sent' && (
                      <button
                        type="button"
                        onClick={() => removePhoto(photo.id)}
                        aria-label={`Remove ${photo.originalName}`}
                        className="bg-background/90 text-foreground absolute right-1 top-1 rounded-full p-1 shadow"
                      >
                        <X className="h-3 w-3" aria-hidden="true" />
                      </button>
                    )}

                    {status.state !== 'waiting' && (
                      <div className="absolute inset-x-0 bottom-0 bg-black/70 px-1.5 py-1 text-[9px] font-bold text-white">
                        {status.state === 'sent' ? (
                          <span className="flex items-center gap-1">
                            <Check className="h-3 w-3" aria-hidden="true" /> Sent
                          </span>
                        ) : status.state === 'failed' ? (
                          'Retry needed'
                        ) : (
                          <div>
                            <span>{status.progress}%</span>
                            <div
                              role="progressbar"
                              aria-valuemin={0}
                              aria-valuemax={100}
                              aria-valuenow={status.progress}
                              className="mt-0.5 h-1 overflow-hidden rounded-full bg-white/30"
                            >
                              <span
                                className="block h-full bg-white"
                                style={{ width: `${status.progress}%` }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>

        <div className="grid gap-3 sm:grid-cols-[1fr_1.5fr]">
          <fieldset>
            <legend className={labelClass}>Preferred contact method *</legend>
            <div className="grid grid-cols-3 gap-1.5">
              {[
                ['call', 'Call'],
                ['text', 'Text'],
                ['email', 'Email'],
              ].map(([value, text]) => (
                <ChoiceButton
                  key={value}
                  active={form.preferredContact === value}
                  onClick={() => setField('preferredContact', value as ContactValue)}
                >
                  {text}
                </ChoiceButton>
              ))}
            </div>
          </fieldset>
          <div>
            <label htmlFor="quote-notes" className={labelClass}>
              Anything else?
            </label>
            <textarea
              id="quote-notes"
              rows={2}
              value={form.notes}
              onChange={event => setField('notes', event.target.value)}
              className={`${textareaClass} min-h-[72px] resize-y`}
              placeholder="Items, access, parking, or questions…"
            />
          </div>
        </div>

        <div className="sr-only" aria-hidden="true">
          <label htmlFor="quote-company">Company</label>
          <input
            id="quote-company"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            value={form.company}
            onChange={event => setField('company', event.target.value)}
          />
        </div>

        <label
          htmlFor="quote-consent"
          className="border-border bg-muted/20 flex cursor-pointer items-start gap-3 rounded-md border p-3"
        >
          <input
            id="quote-consent"
            type="checkbox"
            checked={form.consent}
            onChange={event => setField('consent', event.target.checked)}
            className="mt-0.5 h-4 w-4 shrink-0 accent-current"
          />
          <span className="text-muted-foreground text-[11px] leading-4">
            I agree to receive service-related calls, texts, or emails about this request at the
            contact information provided. Consent is not a condition of purchase. Message and data
            rates may apply; reply STOP to opt out of texts.
          </span>
        </label>

        {formError && (
          <div
            role="alert"
            className="border-destructive/20 bg-destructive/10 text-destructive flex items-start gap-2 rounded-md border p-3 text-xs"
          >
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            <span>{formError}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting || isPreparingPhotos}
          className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md px-4 text-sm font-bold transition disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? (
            <>
              <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />
              {photos.length > 0 ? 'Sending request and photos…' : 'Sending request…'}
            </>
          ) : (
            'Request my free quote'
          )}
        </button>
      </form>
    </section>
  )
}
