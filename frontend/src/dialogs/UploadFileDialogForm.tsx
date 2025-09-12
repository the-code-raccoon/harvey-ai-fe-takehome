import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogPortal,
  DialogTitle,
} from '../components/ui/dialog'
import { Button } from '../components/ui/button'
import { useState } from 'react'

import { Dropzone, DropzoneContent, DropzoneEmptyState } from '@/components/ui/shadcn-io/dropzone'
import { useFetcher } from 'react-router'
import type { Folder } from '@/types'

type UploadFileDialogFormProps = {
  open: boolean
  setOpen: (state: boolean) => void
  folder: Folder
}

const UploadFileDialogForm = ({ open, setOpen, folder }: UploadFileDialogFormProps) => {
  const [files, setFiles] = useState<File[] | undefined>()
  const [dialogError, setDialogError] = useState<string | undefined>()
  const fetcher = useFetcher()

  const handleDrop = (files: File[]) => {
    setFiles(files)
  }

  const handleUpload = () => {
    if (!files) return

    console.log(files)

    const formData = new FormData()
    formData.append('action', 'uploadFile')
    formData.append('parentFolder', folder.id)
    files.forEach((file) => formData.append('file', file))
    fetcher.submit(formData, { method: 'post', encType: 'multipart/form-data' })

    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogPortal>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload File</DialogTitle>
          </DialogHeader>

          <DialogDescription>
            Your files will be uploaded into <b>{folder.name}</b>.
          </DialogDescription>

          <Dropzone
            accept={{ 'application/pdf': [] }}
            maxFiles={10}
            maxSize={1024 * 1024 * 20}
            onDrop={handleDrop}
            onError={(error) => setDialogError(String(error))}
            src={files}
          >
            <DropzoneEmptyState />
            <DropzoneContent />
          </Dropzone>
          <p className="text-sm text-red-400">{dialogError}</p>
          {files && files.length > 0 ? (
            <ul className="list-disc pl-5 text-muted-foreground text-sm">
              {files.map((file, index) => (
                <li key={file.name + index}>{file.name}</li>
              ))}
            </ul>
          ) : null}
          <div className="flex gap-4 justify-end">
            <Button variant="outline">Cancel</Button>
            <Button variant="default" disabled={!files} onClick={handleUpload}>
              Upload
            </Button>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}

export default UploadFileDialogForm
