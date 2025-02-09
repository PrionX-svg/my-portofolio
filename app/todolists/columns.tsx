"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { List } from "@/types"
import { ColumnDef } from "@tanstack/react-table"

// Export the columns array based on the List type from the types/index.ts file
export const columns: ColumnDef<List>[] = [
    {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
    {
        accessorKey: "ID",
        header: "ID",
        
    },
    {
        accessorKey: "flag",
        header: "Status",
        cell: ({ getValue }) => (getValue() ? "Complete" : "Incomplete"),
    },
    {
        accessorKey: "name",
        header: "List Name",
    },
    {
        accessorKey: "Create_at",
        header: "Created At",
    },
    {
        accessorKey: "Update_at",
        header: "Updated At",
    },
]
