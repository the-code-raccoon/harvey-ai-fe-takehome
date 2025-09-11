import { Download, FolderOpen, MoreHorizontal, PencilLine, Trash } from 'lucide-react'
import { Button } from '../ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import type { Row } from '@tanstack/react-table'
import type { DataEntity } from '@/types'

type ActionsCellProps = {
  row: Row<DataEntity>
  onRename: (row: Row<DataEntity>) => void
}

const ActionsCell = ({ row, onRename }: ActionsCellProps) => {
  const type = row.getValue('type') satisfies string

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
          <DropdownMenuItem onClick={() => onRename(row)}>
            <PencilLine className="h-4 w-4" />
            Rename
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Download className="h-4 w-4" />
            Download
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Trash className="h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Delete dialog */}
      {/* <Dialog open={openDelete} onOpenChange={setOpenDelete}>
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
      </Dialog> */}
    </>
  )
}

export default ActionsCell
