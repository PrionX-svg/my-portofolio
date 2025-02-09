"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  // Properties for support pagination 
  onNextPage: () => void;
  onPreviousPage: () => void;
  pagination: {
    total: number;
    page: number;
    limit: number;
  }
}

export function DataTable<TData, TValue>({
  columns,
  data,
  pagination,
  onNextPage,
  onPreviousPage
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  // Set variable condition for pagination
  // If page is more than 1, canPreviousPage is true -> we can hit the previous page
  // If page * limit is less than total, canNextPage is true -> we can hit the next page
  const canPreviousPage = pagination.page > 1; 
  const canNextPage = pagination.page * pagination.limit < pagination.total;
  return (

    <div>
      {/* Table Display */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
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
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* Pagination */}
      <div className="flex items-center justify-between">
        {pagination.page} of {Math.ceil(pagination.total / pagination.limit)} Pages
        <div className="flex items-center justify-end space-x-2 py-4">
          {/* Prev and Next Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={onPreviousPage}
            disabled={!canPreviousPage} // If canPreviousPage is false, the button is disabled
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onNextPage}
            disabled={!canNextPage} // If canNextPage is false, the button is disabled
          >
            Next
          </Button>
        </div>
      </div>

    </div>

  )
}
