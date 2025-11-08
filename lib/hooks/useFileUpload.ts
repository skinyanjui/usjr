import { useState } from 'react'

/**
 * Custom hook for managing file uploads with validation
 * @param maxFiles Maximum number of files allowed (default: 6)
 * @returns Object containing files state and upload/remove handlers
 */
export function useFileUpload(maxFiles = 6) {
  const [files, setFiles] = useState<File[]>([])

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files || [])
    if (files.length + newFiles.length <= maxFiles) {
      setFiles([...files, ...newFiles])
    }
  }

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index))
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
