import { useState } from 'react'

export interface FileWithId {
  id: string
  file: File
}

/**
 * Custom hook for managing file uploads with validation
 * @param maxFiles Maximum number of files allowed (default: 6)
 * @returns Object containing files state and upload/remove handlers
 */
export function useFileUpload(maxFiles = 6) {
  const [files, setFiles] = useState<FileWithId[]>([])

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawFiles = Array.from(e.target.files || [])
    if (files.length + rawFiles.length <= maxFiles) {
      const newFiles = rawFiles.map((file) => ({
        id: Math.random().toString(36).substring(2, 15),
        file,
      }))
      setFiles([...files, ...newFiles])
    }
  }

  const removeFile = (id: string) => {
    setFiles(files.filter((f) => f.id !== id))
  }

  const resetFiles = () => {
    setFiles([])
  }

  return {
    files,
    handleUpload,
    removeFile,
    resetFiles,
    maxFiles,
  }
}
