import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  type Row,
  type SortingState,
  useReactTable,
} from '@tanstack/react-table'
import { useNavigate } from 'react-router'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useState } from 'react'
import type { DataEntity } from '@/types'
import RenameDialogForm from '@/dialogs/RenameDialogForm'
import DeleteDialogForm from '@/dialogs/DeleteDialogForm'
import PDFViewerDialog from '@/dialogs/PDFViewerDialog'
import { cn } from '@/lib/utils'

type DataWithId = {
  id: string
  type: 'folder' | 'file'
}

type DataTableProps<TData extends DataWithId, TValue> = {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData extends DataWithId, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])

  const [selectedRow, setSelectedRow] = useState<Row<DataEntity> | null>(null)
  const [renameDialogOpen, setRenameDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [pdfViewerDialogOpen, setPdfViewerDialogOpen] = useState(false)

  const openRenameDialog = (row: Row<DataEntity>) => {
    setSelectedRow(row)
    setRenameDialogOpen(true)
  }

  const openDeleteDialog = (row: Row<DataEntity>) => {
    setSelectedRow(row)
    setDeleteDialogOpen(true)
  }

  const openPdfViewerDialog = (row: Row<DataEntity>) => {
    setSelectedRow(row)
    setPdfViewerDialogOpen(true)
  }

  const navigate = useNavigate()

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
    meta: {
      onRename: openRenameDialog,
      onDelete: openDeleteDialog,
      onView: openPdfViewerDialog,
    },
  })

  return (
    <div className="overflow-hidden rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
                onClick={() => {
                  if (row.original.type === 'folder') {
                    navigate(`/${row.original.id}`)
                  }
                }}
                className={cn({ 'cursor-pointer': row.original.type === 'folder' })}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                This folder is empty.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {selectedRow && <RenameDialogForm row={selectedRow} open={renameDialogOpen} setOpen={setRenameDialogOpen} />}
      {selectedRow && <DeleteDialogForm row={selectedRow} open={deleteDialogOpen} setOpen={setDeleteDialogOpen} />}
      {selectedRow && <PDFViewerDialog row={selectedRow} open={pdfViewerDialogOpen} setOpen={setPdfViewerDialogOpen} />}
    </div>
  )
}
