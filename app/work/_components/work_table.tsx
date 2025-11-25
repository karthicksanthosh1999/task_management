"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  VisibilityState,
  getFilteredRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Filter } from "lucide-react";
import WorkExport from "./work_export";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading: boolean;
}

export function WorkDataTable<TData, TValue>({
  columns,
  data,
  isLoading,
}: DataTableProps<TData, TValue>) {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [filterModelOpen, setFilterModelOpen] = useState<boolean>(false);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnVisibility,
    },
  });

  return (
    <>
      <header className="py-3 flex items-center justify-end gap-2">
        <div className="flex items-center justify-center gap-2">
          {/* STATUS BASED FILTER */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={"outline"} className="ml-auto">
                Filter by Status
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuCheckboxItem
                checked={
                  table.getColumn("state")?.getFilterValue() === undefined
                }
                onCheckedChange={() =>
                  table.getColumn("state")?.setFilterValue(undefined)
                }>
                All
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={
                  table.getColumn("state")?.getFilterValue() === "Completed"
                }
                onCheckedChange={(v) =>
                  table
                    .getColumn("state")
                    ?.setFilterValue(v ? "Completed" : undefined)
                }>
                Completed
              </DropdownMenuCheckboxItem>

              <DropdownMenuCheckboxItem
                checked={
                  table.getColumn("state")?.getFilterValue() === "Planning"
                }
                onCheckedChange={(v) =>
                  table
                    .getColumn("state")
                    ?.setFilterValue(v ? "Planning" : undefined)
                }>
                Planning
              </DropdownMenuCheckboxItem>

              <DropdownMenuCheckboxItem
                checked={
                  table.getColumn("state")?.getFilterValue() === "Pending"
                }
                onCheckedChange={(v) =>
                  table
                    .getColumn("state")
                    ?.setFilterValue(v ? "Pending" : undefined)
                }>
                Pending
              </DropdownMenuCheckboxItem>

              <DropdownMenuCheckboxItem
                checked={
                  table.getColumn("state")?.getFilterValue() === "Progress"
                }
                onCheckedChange={(v) =>
                  table
                    .getColumn("state")
                    ?.setFilterValue(v ? "Progress" : undefined)
                }>
                Progress
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }>
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div>
          <Button
            variant="outline"
            type="button"
            className="ml-auto cursor-pointer"
            onClick={() => setFilterModelOpen(true)}>
            <Filter />
          </Button>
        </div>
      </header>
      <div className="overflow-hidden rounded-md border">
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
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center">
                  <div className="flex justify-center items-center gap-2">
                    <span className="animate-spin h-5 w-5 border-2 border-t-transparent border-gray-500 rounded-full"></span>
                    Loading...
                  </div>
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <WorkExport
        open={filterModelOpen}
        setOpen={setFilterModelOpen}
        mode="Filter"
      />
    </>
  );
}
