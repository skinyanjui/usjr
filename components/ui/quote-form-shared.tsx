'use client'

import * as React from "react"

export interface QuoteFormData {
  fullName: string
  phone: string
  email: string
  message?: string
}

export function useQuoteForm() {
  const [formData, setFormData] = React.useState<QuoteFormData>({ fullName: "", phone: "", email: "", message: "" })
  const [uploadedFiles, setUploadedFiles] = React.useState<File[]>([])
  const [isSubmitted, setIsSubmitted] = React.useState(false)

  function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files ? Array.from(event.target.files) : []
    setUploadedFiles((prev) => [...prev, ...files])
  }

  function removeFile(index: number) {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  function handleSubmit(event?: React.FormEvent<HTMLFormElement>) {
    if (event) event.preventDefault()
    setIsSubmitted(true)
  }

  return { formData, setFormData, uploadedFiles, handleFileUpload, removeFile, handleSubmit, isSubmitted }
}

export function QuoteSuccessMessage({ onClose }: { onClose?: () => void }) {
  return (
    <div className="rounded-md border border-green-200 bg-green-50 p-4 text-green-800">
      <div className="mb-2 text-sm font-semibold">Thanks! Your request was submitted.</div>
      <button type="button" className="text-sm underline" onClick={onClose}>
        Close
      </button>
    </div>
  )
}

export function ContactFields({ formData, setFormData }: { formData: QuoteFormData; setFormData: React.Dispatch<React.SetStateAction<QuoteFormData>> }) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <input
        placeholder="Full name"
        value={formData.fullName}
        onChange={(e) => setFormData((d) => ({ ...d, fullName: e.target.value }))}
        className="h-10 rounded-md border px-3 text-sm"
      />
      <input
        placeholder="Phone"
        value={formData.phone}
        onChange={(e) => setFormData((d) => ({ ...d, phone: e.target.value }))}
        className="h-10 rounded-md border px-3 text-sm"
      />
      <input
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData((d) => ({ ...d, email: e.target.value }))}
        className="h-10 rounded-md border px-3 text-sm sm:col-span-2"
      />
    </div>
  )
}

export function PhotoUpload({ uploadedFiles, handleFileUpload, removeFile }: { uploadedFiles: File[]; handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void; removeFile: (index: number) => void }) {
  return (
    <div className="space-y-2">
      <input type="file" multiple onChange={handleFileUpload} className="block w-full text-sm" />
      <ul className="space-y-1 text-sm text-gray-700">
        {uploadedFiles.map((f, i) => (
          <li key={`${f.name}-${i}`} className="flex items-center justify-between">
            <span>{f.name}</span>
            <button type="button" className="text-red-700 underline" onClick={() => removeFile(i)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}