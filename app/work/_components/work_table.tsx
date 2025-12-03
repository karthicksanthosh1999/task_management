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
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Filter } from "lucide-react";
import WorkExport from "./work_export";
import { IconChevronLeft, IconChevronRight, IconChevronsLeft, IconChevronsRight } from "@tabler/icons-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

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
  const [isFilterIsActive, setIsFilterIsActive] = useState(false)
  const [storedColumn, setStoredColumn] = useState("")
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 20,
  });

  useEffect(() => {
    const work = localStorage.getItem('work_status_column');
    setStoredColumn(work ?? "")
  }, [])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    getFilteredRowModel: getFilteredRowModel(),
    onPaginationChange: setPagination,
    state: {
      columnVisibility,
      pagination,
    },
  });

  return (
    <>
      {/* FILTER SECTION */}
      <header className="py-3 flex items-center justify-end gap-2">
        <div className="flex items-center justify-center gap-2">
          {
            isFilterIsActive &&
            <Button onClick={() => setIsFilterIsActive(false)}>Clear Filter</Button>
          }
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
                      className=""
                      checked={column.getIsVisible()}
                      onChange={(value) => console.log(value.target)}
                      onCheckedChange={(value) => column.toggleVisibility(!!value)
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
      </header >
      {/* DATA TABLE SECTION */}
      <div className="overflow-y-auto rounded-md border h-[70vh]" >
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
      </div >
      {/* PAGINATION SECTION */}
      <div className="flex items-center justify-end space-x-2 py-4" >
        <div className="text-muted-foreground flex-1 text-sm space-x-2 py-4">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <div className="flex items-center justify-between px-4">
            <div className="flex w-full items-center gap-8 lg:w-fit">
              <div className="hidden items-center gap-2 lg:flex">
                <Label htmlFor="rows-per-page" className="text-sm font-medium">
                  Rows per page
                </Label>
                <Select
                  value={`${table.getState().pagination.pageSize}`}
                  onValueChange={(value) => {
                    table.setPageSize(Number(value))
                  }}
                >
                  <SelectTrigger size="sm" className="w-20" id="rows-per-page">
                    <SelectValue
                      placeholder={table.getState().pagination.pageSize}
                    />
                  </SelectTrigger>
                  <SelectContent side="top">
                    {[20, 30, 40, 50].map((pageSize) => (
                      <SelectItem key={pageSize} value={`${pageSize}`}>
                        {pageSize}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex w-fit items-center justify-center text-sm font-medium">
                Page {table.getState().pagination.pageIndex + 1} of{" "}
                {table.getPageCount()}
              </div>
              <div className="ml-auto flex items-center gap-2 lg:ml-0">
                <Button
                  variant="outline"
                  className="hidden h-8 w-8 p-0 lg:flex"
                  onClick={() => table.setPageIndex(0)}
                  disabled={!table.getCanPreviousPage()}
                >
                  <span className="sr-only">Go to first page</span>
                  <IconChevronsLeft />
                </Button>
                <Button
                  variant="outline"
                  className="size-8"
                  size="icon"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  <span className="sr-only">Go to previous page</span>
                  <IconChevronLeft />
                </Button>
                <Button
                  variant="outline"
                  className="size-8"
                  size="icon"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  <span className="sr-only">Go to next page</span>
                  <IconChevronRight />
                </Button>
                <Button
                  variant="outline"
                  className="hidden size-8 lg:flex"
                  size="icon"
                  onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                  disabled={!table.getCanNextPage()}
                >
                  <span className="sr-only">Go to last page</span>
                  <IconChevronsRight />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div >
      <WorkExport
        open={filterModelOpen}
        setOpen={setFilterModelOpen}
        mode="Filter"
        setIsFilterIsApply={setIsFilterIsActive}
      />
    </>
  );
}
