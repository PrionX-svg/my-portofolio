// app/TodoList.tsx
// import { format } from 'date-fns';
import { FC } from "react"
import { List, Pagination } from "../../types"
import { DataTable } from "./data-table";
import { columns } from "./columns";

// Defining TodoListProps from List and Pagination in types/index.ts  
interface TodoListProps {
    lists: List[],
    pagination: Pagination,
    // Properties for support pagination
    onNextPage: () => void;
    onPreviousPage: () => void;
}

const TodoList: FC<TodoListProps> = ({ lists, pagination, onNextPage, onPreviousPage }) => {
    return (
        <div className="overflow-x-auto mt-6">
            {/* <table className="min-w-full table-auto border-collapse border border-gray-300">
                <thead>
                    <tr>
                        <th className="border-b px-4 py-2 text-left">ID</th>
                        <th className="border-b px-4 py-2 text-left">Name</th>
                        <th className="border-b px-4 py-2 text-left">Status</th>
                        <th className="border-b px-4 py-2 text-left">Created At</th>
                        <th className="border-b px-4 py-2 text-left">Updated At</th>
                    </tr>
                </thead>
                <tbody>
                    {lists.length > 0 ? (
                        lists.map((list) => (
                            <tr key={list.ID}>
                                <td className="border-b px-4 py-2">{list.ID}</td>
                                <td className="border-b px-4 py-2">{list.name}</td>
                                <td className="border-b px-4 py-2">{list.flag ? "Completed" : "Incomplete"}</td>
                                <td className="border-b px-4 py-2">{format(new Date(list.Create_at), 'yyyy-MM-dd')}</td>
                                <td className="border-b px-4 py-2">{format(new Date(list.Update_at), 'yyyy-MM-dd')}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={5} className="text-center py-2">No lists found</td>
                        </tr>
                    )}
                </tbody>
            </table> */}
            {/* Data Table
            - Menggunakan DataTable dari data-table.tsx
            - columns adalah header dari table
            - data adalah data yang akan ditampilkan dari Lists
            - pagination adalah data pagination dari Pagination
            */}
            <DataTable columns={columns} data={lists} pagination={{
                total: pagination.total,
                page: pagination.page,
                limit: pagination.limit
            }} onNextPage={onNextPage} onPreviousPage={onPreviousPage} />
            {/* ^ parsing and parsing */}

        </div>
    )
}

export default TodoList
