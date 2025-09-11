import { Dialog, DialogContent, DialogHeader, DialogPortal, DialogTitle } from '../../components/ui/dialog'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { useState } from 'react'
import type { Row } from '@tanstack/react-table'
import type { DataEntity } from '@/types'
import { useFetcher } from 'react-router'

type RenameDialogFormProps = {
  row: Row<DataEntity>
  open: boolean
  setOpen: (state: boolean) => void
}

const RenameDialogForm = ({ row, open, setOpen }: RenameDialogFormProps) => {
  const name = row.getValue('name') satisfies string
  const type = row.getValue('type') satisfies 'folder' | 'file'
  const [newName, setNewName] = useState<string>(name)

  const fetcher = useFetcher()

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogPortal>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rename</DialogTitle>
          </DialogHeader>

          <fetcher.Form
            method="patch"
            action={type === 'file' ? `/file/${row.original.id}` : `/folder/${row.original.id}`}
            className="flex flex-col w-full justify-start gap-3"
          >
            <input type="hidden" name="id" value={row.original.id} />
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
              <Button type="button" variant="secondary" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" onClick={() => setOpen(false)}>
                Save
              </Button>
            </div>
          </fetcher.Form>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}

export default RenameDialogForm
