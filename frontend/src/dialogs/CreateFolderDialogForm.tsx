import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogPortal,
  DialogTitle,
} from '../components/ui/dialog'
import { Button } from '../components/ui/button'
import { Form } from 'react-router'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import type { Folder } from '@/types'
import { truncateString } from '@/lib/utils'

type CreateFolderDialogFormProps = {
  parentFolder: Folder
  open: boolean
  setOpen: (state: boolean) => void
}

const CreateFolderDialogForm = ({ parentFolder, open, setOpen }: CreateFolderDialogFormProps) => {
  const [newName, setNewName] = useState<string>('')

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogPortal>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Folder</DialogTitle>
          </DialogHeader>

          <DialogDescription>
            This folder will be created inside of <b>{truncateString(parentFolder.name, 70)}</b>.
          </DialogDescription>

          <Form method="post" className="flex flex-col w-full justify-start gap-3" onSubmit={() => setOpen(false)}>
            <input type="hidden" name="action" value="createFolder" />
            <input type="hidden" name="parentFolder" value={parentFolder.id} />
            <Input
              type="text"
              name="name"
              id="name"
              placeholder="Name"
              maxLength={255}
              defaultValue={''}
              onChange={(e) => setNewName(e.target.value)}
            />
            <p className="place-items-end ml-auto text-xs text-muted-foreground">{newName.length}/255</p>

            <div className="flex justify-end gap-4 mt-4">
              <Button type="button" variant="secondary" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Create</Button>
            </div>
          </Form>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}

export default CreateFolderDialogForm
