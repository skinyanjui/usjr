import { renderHook, act } from '@testing-library/react'
import { useFileUpload } from '@/lib/hooks/useFileUpload'

describe('useFileUpload', () => {
  it('should initialize with empty files array', () => {
    const { result } = renderHook(() => useFileUpload())
    expect(result.current.files).toEqual([])
    expect(result.current.maxFiles).toBe(6)
  })

  it('should accept custom maxFiles', () => {
    const { result } = renderHook(() => useFileUpload(3))
    expect(result.current.maxFiles).toBe(3)
  })

  it('should handle file upload', () => {
    const { result } = renderHook(() => useFileUpload())

    const mockFile = new File(['content'], 'test.jpg', { type: 'image/jpeg' })
    const mockEvent = {
      target: { files: [mockFile] },
    } as unknown as React.ChangeEvent<HTMLInputElement>

    act(() => {
      result.current.handleUpload(mockEvent)
    })

    expect(result.current.files).toHaveLength(1)
    expect(result.current.files[0]?.name).toBe('test.jpg')
  })

  it('should not exceed max files limit', () => {
    const { result } = renderHook(() => useFileUpload(2))

    const files = [
      new File(['1'], 'file1.jpg', { type: 'image/jpeg' }),
      new File(['2'], 'file2.jpg', { type: 'image/jpeg' }),
      new File(['3'], 'file3.jpg', { type: 'image/jpeg' }),
    ]

    const mockEvent = {
      target: { files },
    } as unknown as React.ChangeEvent<HTMLInputElement>

    act(() => {
      result.current.handleUpload(mockEvent)
    })

    // Should not add files when limit would be exceeded
    expect(result.current.files).toHaveLength(0)
  })

  it('should remove file by index', () => {
    const { result } = renderHook(() => useFileUpload())

    const files = [
      new File(['1'], 'file1.jpg', { type: 'image/jpeg' }),
      new File(['2'], 'file2.jpg', { type: 'image/jpeg' }),
    ]

    const mockEvent = {
      target: { files },
    } as unknown as React.ChangeEvent<HTMLInputElement>

    act(() => {
      result.current.handleUpload(mockEvent)
    })

    expect(result.current.files).toHaveLength(2)

    act(() => {
      result.current.removeFile(0)
    })

    expect(result.current.files).toHaveLength(1)
    expect(result.current.files[0]?.name).toBe('file2.jpg')
  })

  it('should reset files', () => {
    const { result } = renderHook(() => useFileUpload())

    const mockFile = new File(['content'], 'test.jpg', { type: 'image/jpeg' })
    const mockEvent = {
      target: { files: [mockFile] },
    } as unknown as React.ChangeEvent<HTMLInputElement>

    act(() => {
      result.current.handleUpload(mockEvent)
    })

    expect(result.current.files).toHaveLength(1)

    act(() => {
      result.current.resetFiles()
    })

    expect(result.current.files).toHaveLength(0)
  })
})
