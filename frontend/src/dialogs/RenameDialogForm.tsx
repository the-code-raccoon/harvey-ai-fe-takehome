import { Dialog, DialogContent, DialogHeader, DialogPortal, DialogTitle } from '../components/ui/dialog'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { useState } from 'react'
import type { Row } from '@tanstack/react-table'
import type { DataEntity } from '@/types'
import { Form } from 'react-router'

type RenameDialogFormProps = {
  row: Row<DataEntity>
  open: boolean
  setOpen: (state: boolean) => void
}

const RenameDialogForm = ({ row, open, setOpen }: RenameDialogFormProps) => {
  const name = row.getValue('name') satisfies string
  const [newName, setNewName] = useState<string>(name)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogPortal>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rename</DialogTitle>
          </DialogHeader>

          <Form method="post" className="flex flex-col w-full justify-start gap-3" onSubmit={() => setOpen(false)}>
            <input type="hidden" name="id" value={row.original.id} />
            <input type="hidden" name="action" value={row.original.type === 'file' ? 'renameFile' : 'renameFolder'} />
            <Input
              type="text"
              name="name"
              id="name"
              placeholder="Name"
              maxLength={255}
              defaultValue={name}
              onChange={(e) => setNewName(e.target.value)}
            />
            <p className="place-items-end ml-auto text-xs text-muted-foreground">{newName.length}/255</p>

            <div className="flex justify-end gap-4 mt-4">
              <Button variant="secondary" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </div>
          </Form>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}

export default RenameDialogForm
