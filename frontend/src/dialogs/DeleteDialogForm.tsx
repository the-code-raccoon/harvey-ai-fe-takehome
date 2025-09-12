import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogPortal,
  DialogTitle,
} from '../components/ui/dialog'
import { Button } from '../components/ui/button'
import type { Row } from '@tanstack/react-table'
import type { DataEntity } from '@/types'
import { Form } from 'react-router'

type DeleteDialogFormProps = {
  row: Row<DataEntity>
  open: boolean
  setOpen: (state: boolean) => void
}

const DeleteDialogForm = ({ row, open, setOpen }: DeleteDialogFormProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogPortal>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete File</DialogTitle>
          </DialogHeader>

          <DialogDescription>
            Are you sure you want to permanently delete <b>{row.getValue('name')}</b>?
          </DialogDescription>

          <Form method="post" className="flex flex-col w-full justify-start gap-3" onSubmit={() => setOpen(false)}>
            <input type="hidden" name="id" value={row.original.id} />
            <input type="hidden" name="action" value={row.original.type === 'file' ? 'deleteFile' : 'deleteFolder'} />
            <div className="flex justify-end gap-4 mt-4">
              <Button variant="secondary" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="destructive">
                Delete Permanently
              </Button>
            </div>
          </Form>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}

export default DeleteDialogForm
