import { Download, FolderOpen, MoreHorizontal, PencilLine, Trash } from 'lucide-react'
import { Button } from '../ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import type { Row } from '@tanstack/react-table'
import type { DataEntity } from '@/types'

type ActionsCellProps = {
  row: Row<DataEntity>
  onRename: (row: Row<DataEntity>) => void
  onDelete: (row: Row<DataEntity>) => void
  onView: (row: Row<DataEntity>) => void
}

const ActionsCell = ({ row, onRename, onDelete, onView }: ActionsCellProps) => {
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
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation()
                onView(row)
              }}
            >
              <FolderOpen className="h-4 w-4" />
              Open
            </DropdownMenuItem>
          ) : null}
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation()
              onRename(row)
            }}
          >
            <PencilLine className="h-4 w-4" />
            Rename
          </DropdownMenuItem>
          <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
            <Download className="h-4 w-4" />
            Download
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation()
              onDelete(row)
            }}
          >
            <Trash className="h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

export default ActionsCell
