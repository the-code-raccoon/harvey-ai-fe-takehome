import { Download, FolderOpen, MoreHorizontal, PencilLine, Trash } from 'lucide-react'
import { Button } from '../ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogPortal, DialogTitle } from '../ui/dialog'
import type { DataEntity } from './columns'
import type { Row } from '@tanstack/react-table'
import { useState } from 'react'
import { Input } from '../ui/input'

const ActionsCell = ({ row }: { row: Row<DataEntity> }) => {
  const type = row.getValue('type') satisfies string
  const name = row.getValue('name') satisfies string

  const [openDelete, setOpenDelete] = useState<boolean>(false)
  const [openRename, setOpenRename] = useState<boolean>(false)
  const [newName, setNewName] = useState<string>(name)

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          {type === 'file' ? (
            <DropdownMenuItem>
              <FolderOpen className="h-4 w-4" />
              Open
            </DropdownMenuItem>
          ) : null}
          <DropdownMenuItem onSelect={() => setOpenRename(true)}>
            <PencilLine className="h-4 w-4" />
            Rename
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Download className="h-4 w-4" />
            Download
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setOpenDelete(true)}>
            <Trash className="h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Delete dialog */}
      <Dialog open={openDelete} onOpenChange={setOpenDelete}>
        <DialogPortal>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete File</DialogTitle>
            </DialogHeader>
            <DialogDescription>
              Are you sure you want to permanently delete <b>{row.getValue('name')}</b>?
            </DialogDescription>
            <div className="flex justify-end gap-4">
              <Button variant="secondary" onClick={() => setOpenDelete(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={() => setOpenDelete(false)}>
                Delete Permanently
              </Button>
            </div>
          </DialogContent>
        </DialogPortal>
      </Dialog>

      {/* Rename dialog */}
      <Dialog open={openRename} onOpenChange={setOpenRename}>
        <DialogPortal>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Rename</DialogTitle>
            </DialogHeader>

            <div className="flex flex-col w-full justify-start gap-3">
              <Input
                type="text"
                id="name"
                placeholder="Name"
                maxLength={255}
                onChange={(e) => setNewName(e.target.value)}
                defaultValue={name}
              />
              <p className="place-items-end ml-auto text-xs text-muted-foreground">{newName.length}/255</p>
            </div>
            <div className="flex justify-end gap-4">
              <Button variant="secondary" onClick={() => setOpenRename(false)}>
                Cancel
              </Button>
              <Button onClick={() => setOpenRename(false)}>Save</Button>
            </div>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    </>
  )
}

export default ActionsCell
