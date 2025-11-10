"use client";
import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IWork } from "@/app/types/workTypes";
import { cn, isoDateFormat } from "@/lib/utils";
import { useState } from "react";
import DeleteModel from "@/components/delete-model";
import { TWorkSchemaType } from "../schema/workSchema";
import WorkUpdateModal from "./workUpdateMode";

export const WorkColumns: ColumnDef<IWork>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "WorkStart",
    header: "Start Date",
    cell: ({ row }) => <h1>{isoDateFormat(row.original.WorkStart)}</h1>,
  },

  {
    accessorKey: "workEnd",
    header: "End Date",
    cell: ({ row }) => <h1>{isoDateFormat(row.original.workEnd)}</h1>,
  },
  {
    accessorKey: "projectId",
    header: "ProjectId",
    cell: ({ row }) => {
      const { project } = row.original;
      return <p>{project?.name}</p>;
    },
  },
  {
    accessorKey: "workStatus",
    header: "Status",
    cell: ({ row }) => (
      <p
        className={`${cn(
          row.original?.state === "Planning" ? "bg-blue-400 text-white" : "",
          row.original?.state === "Completed"
            ? "bg-green-400 text-gray-800 "
            : "",
          row.original?.state === "Progress"
            ? "bg-orange-400 text-gray-800 "
            : ""
        )} p-2 rounded-lg w-fit text-xs font-medium`}>
        {row.original.state.toUpperCase()}
      </p>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      const project = row.original;
      const [open, setOpen] = useState(false);
      const [formOpen, setFormOpen] = useState(false);
      const [selectedWork, setSelectedWork] = useState<
        TWorkSchemaType | undefined
      >(undefined);

      const handleEdit = (value: TWorkSchemaType) => {
        setSelectedWork(value);
        setFormOpen(true);
      };

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setOpen(true)}>
                Delete
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleEdit(project)}>
                Update
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DeleteModel
            open={open}
            selectedId={project?.id ?? ""}
            setOpen={setOpen}
            title="Work"
            mutationId="work"
            toastId="delete-work"
            apiUrl="/api/works"
          />
          <WorkUpdateModal
            open={formOpen}
            onOpenChange={setFormOpen}
            selectedWork={selectedWork}
          />
        </>
      );
    },
  },
];
