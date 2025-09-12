import type { Row } from '@tanstack/react-table'
import { Dialog, DialogContent, DialogHeader, DialogPortal, DialogTitle } from '../components/ui/dialog'
import type { DataEntity } from '@/types'
import { useEffect, useState } from 'react'
import { getFile } from '@/lib/db'
import { truncateString } from '@/lib/utils'

type PDFViewerDialogProps = {
  row: Row<DataEntity>

  open: boolean
  setOpen: (state: boolean) => void
}

const PDFViewerDialog = ({ row, open, setOpen }: PDFViewerDialogProps) => {
  const id = row.original.id
  const name = row.original.name

  const [url, setUrl] = useState<string | undefined>()

  useEffect(() => {
    const fetchFile = async () => {
      const file = await getFile(id)

      if (file instanceof File) {
        setUrl(URL.createObjectURL(file))
      }
    }
    fetchFile()
  }, [id])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogPortal>
        <DialogContent className="flex flex-col w-5xl sm:max-w-5xl h-[90vh]">
          <DialogHeader>
            <DialogTitle>{truncateString(name, 50)}</DialogTitle>
          </DialogHeader>
          {url ? <iframe src={url} width="100%" height="100%" style={{ border: 'none' }} /> : null}
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}

export default PDFViewerDialog
