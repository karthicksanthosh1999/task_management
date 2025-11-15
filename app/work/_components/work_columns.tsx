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
import { useAppDispatch } from "@/app/hooks/reduxHooks";
import { deleteWorkThunk } from "@/app/features/workSlices";
import { toast } from "sonner";
import WorkForm from "./workForm";

export const WorkColumns: ColumnDef<IWork>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "WorkStart",
    header: "Start Date",
    cell: ({ row }) => <h1>{isoDateFormat(row.original.startDate)}</h1>,
  },

  {
    accessorKey: "workEnd",
    header: "End Date",
    cell: ({ row }) => <h1>{isoDateFormat(row.original.endDate)}</h1>,
  },
  {
    accessorKey: "projectId",
    header: "ProjectId",
    cell: ({ row }) => {
      const { project } = row.original;
      return <p>{project?.title}</p>;
    },
  },
  {
    accessorKey: "workStatus",
    header: "Status",
    cell: ({ row }) => (
      <p
        className={`${cn(
          row.original?.state === "Planning" ? "text-blue-400 " : "",
          row.original?.state === "Completed" ? "text-green-400 " : "",
          row.original?.state === "Progress" ? "text-orange-400 " : ""
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
      const work = row.original;
      const [open, setOpen] = useState(false);
      const [formOpen, setFormOpen] = useState(false);
      const [selectedWork, setSelectedWork] = useState<
        TWorkSchemaType | undefined
      >(undefined);

      const dispatch = useAppDispatch();
      const handleEdit = (value: TWorkSchemaType) => {
        setSelectedWork(value);
        setFormOpen(true);
      };

      const handleDelete = (id: string) => {
        dispatch(deleteWorkThunk({ workId: id }));
        toast.success("Work deleted successfully...🗑️");
        setOpen(false);
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
              <DropdownMenuItem onClick={() => handleEdit(work)}>
                Update
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DeleteModel
            open={open}
            confirmDelete={handleDelete}
            deleteId={work?.id ?? ""}
            setOpen={setOpen}
            title="Delete Work"
            description="Are you sure, You want to delete the work?"
          />
          <WorkForm
            modelOpen={formOpen}
            setModelOpen={setFormOpen}
            existingWork={selectedWork}
            mode="update"
          />
        </>
      );
    },
  },
];
