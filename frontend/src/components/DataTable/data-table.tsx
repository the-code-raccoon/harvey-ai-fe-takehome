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
import RenameDialogForm from '@/forms/RenameDialogForm/RenameDialogForm'
import type { DataEntity } from '@/types'

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
  const [dialogOpen, setDialogOpen] = useState(false)

  const openRenameDialog = (row: Row<DataEntity>) => {
    setSelectedRow(row)
    setDialogOpen(true)
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
                onClick={(e) => {
                  if (e.currentTarget.tagName === 'tr') {
                    console.log('SOLUTION')
                    if (row.original.type === 'folder') {
                      navigate(`/${row.original.id}`)
                    }
                  }
                }}
                className="cursor-pointer"
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

      {selectedRow && <RenameDialogForm row={selectedRow} open={dialogOpen} setOpen={setDialogOpen} />}
    </div>
  )
}
