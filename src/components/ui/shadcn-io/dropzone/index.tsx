import { UploadIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { createContext, useContext } from 'react'
import type { DropEvent, DropzoneOptions, FileRejection } from 'react-dropzone'
import { useDropzone } from 'react-dropzone'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const mimeMapping: Record<string, string> = {
  'image/png': '.png',
  'image/jpeg': '.jpeg',
  'image/gif': '.gif',
  'image/webp': '.webp',
  'application/pdf': '.pdf',
  'text/plain': '.txt',
  'text/html': '.html',
  'application/json': '.json',
  'audio/mpeg': '.mpeg',
  'audio/wav': '.wav',
  'video/mp4': '.mp4',
  'video/webm': '.webm',
  '*': 'all files types',
}

type DropzoneContextType = {
  src?: File[]
  accept?: DropzoneOptions['accept']
  maxSize?: DropzoneOptions['maxSize']
  minSize?: DropzoneOptions['minSize']
  maxFiles?: DropzoneOptions['maxFiles']
}

const renderBytes = (bytes: number) => {
  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB']
  let size = bytes
  let unitIndex = 0

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024
    unitIndex++
  }

  return `${size}${units[unitIndex]}`
}

const DropzoneContext = createContext<DropzoneContextType | undefined>(undefined)

export type DropzoneProps = Omit<DropzoneOptions, 'onDrop'> & {
  src?: File[]
  className?: string
  onDrop?: (acceptedFiles: File[], fileRejections: FileRejection[], event: DropEvent) => void
  children?: ReactNode
}

export const Dropzone = ({
  accept,
  maxFiles = 1,
  maxSize,
  minSize,
  onDrop,
  onError,
  disabled,
  src,
  className,
  children,
  ...props
}: DropzoneProps) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept,
    maxFiles,
    maxSize,
    minSize,
    onError,
    disabled,
    onDrop: (acceptedFiles, fileRejections, event) => {
      if (fileRejections.length === 0) {
        onDrop?.(acceptedFiles, fileRejections, event)
        return
      }

      let message

      if (fileRejections[0].errors[0].code === 'file-invalid-type') {
        if (!accept) {
          message = 'File is an invalid type'
        } else {
          const acceptedTypes = Object.keys(accept).map((fileType) => mimeMapping[fileType])

          if (acceptedTypes.length === 1) {
            message = `File type must of type ${acceptedTypes[0]}`
          } else {
            message = `File type must be type of one of ${new Intl.ListFormat('en', { type: 'disjunction' }).format(
              acceptedTypes
            )}`
          }
        }
      } else {
        message = fileRejections.at(0)?.errors.at(0)?.message
      }

      onError?.(new Error(message))
    },
    ...props,
  })

  return (
    <DropzoneContext.Provider key={JSON.stringify(src)} value={{ src, accept, maxSize, minSize, maxFiles }}>
      <Button
        className={cn(
          'relative h-auto w-full flex-col overflow-hidden p-8',
          isDragActive && 'outline-none ring-1 ring-ring',
          className
        )}
        disabled={disabled}
        type="button"
        variant="outline"
        {...getRootProps()}
      >
        <input {...getInputProps()} disabled={disabled} />
        {children}
      </Button>
    </DropzoneContext.Provider>
  )
}

const useDropzoneContext = () => {
  const context = useContext(DropzoneContext)

  if (!context) {
    throw new Error('useDropzoneContext must be used within a Dropzone')
  }

  return context
}

export type DropzoneContentProps = {
  children?: ReactNode
  className?: string
}

export const DropzoneContent = ({ children, className }: DropzoneContentProps) => {
  const { src } = useDropzoneContext()

  if (!src) {
    return null
  }

  if (children) {
    return children
  }

  return (
    <div className={cn('flex flex-col items-center justify-center', className)}>
      <div className="flex size-8 items-center justify-center rounded-md bg-muted text-muted-foreground">
        <UploadIcon size={16} />
      </div>
      <p className="my-2 w-full truncate font-medium text-sm">{src.length} files set for upload</p>
      <p className="w-full text-wrap text-muted-foreground text-xs">Drag and drop or click to replace</p>
    </div>
  )
}

export type DropzoneEmptyStateProps = {
  children?: ReactNode
  className?: string
}

export const DropzoneEmptyState = ({ children, className }: DropzoneEmptyStateProps) => {
  const { src, accept, maxSize, minSize, maxFiles } = useDropzoneContext()

  if (src) {
    return null
  }

  if (children) {
    return children
  }

  let caption = ''

  if (accept) {
    caption += 'Supports: '
    caption += new Intl.ListFormat('en').format(Object.keys(accept).map((mime) => mimeMapping[mime]))
  }

  if (minSize && maxSize) {
    caption += ` between ${renderBytes(minSize)} and ${renderBytes(maxSize)}`
  } else if (minSize) {
    caption += ` at least ${renderBytes(minSize)}`
  } else if (maxSize) {
    caption += ` less than ${renderBytes(maxSize)}`
  }

  return (
    <div className={cn('flex flex-col items-center justify-center', className)}>
      <div className="flex size-8 items-center justify-center rounded-md bg-muted text-muted-foreground">
        <UploadIcon size={16} />
      </div>
      <p className="my-2 w-full truncate text-wrap font-medium text-sm">Upload {maxFiles === 1 ? 'a file' : 'files'}</p>
      <p className="w-full truncate text-wrap text-muted-foreground text-xs">
        Drag and drop or click to upload{maxFiles ? ` up to ${maxFiles} files` : ''}.
      </p>
      {caption && <p className="text-wrap text-muted-foreground text-xs">{caption}.</p>}
    </div>
  )
}
