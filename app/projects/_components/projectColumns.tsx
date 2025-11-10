"use client";
import { deleteProjectThunk } from "@/app/features/projectSlices";
import { deleteUserThunk } from "@/app/features/userSlices";
import { useAppDispatch } from "@/app/hooks/reduxHooks";
import { IProject } from "@/app/types/projectTypes";
import DeleteModel from "@/components/delete-model";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { toast } from "sonner";

export const ProjectColumns: ColumnDef<IProject>[] = [
  {
    accessorKey: "title",
    header: "Project Title",
  },
  {
    accessorKey: "state",
    header: "Project Status",
  },
  {
    accessorKey: "startDate",
    header: "Start Date",
  },
  {
    accessorKey: "endDate",
    header: "End Date",
  },
  {
    header: "Actions",
    cell: ({ row }) => {
      const [open, setOpen] = useState(false);
      const { id } = row.original;
      const dispatch = useAppDispatch();

      const handleDelete = async () => {
        try {
          if (id) {
            await dispatch(deleteProjectThunk({ userId: id })).unwrap();
            toast.success("Project Deleted Successfully...👍");
          }
        } catch (error) {
          toast.error("Something went wrong...❌");
        }
      };

      return (
        <div className="space-x-2">
          <Button type="button" variant={"outline"}>
            Edit
          </Button>
          <Button
            type="button"
            variant={"destructive"}
            onClick={() => setOpen(true)}>
            Delete
          </Button>
          <DeleteModel
            open={open}
            setOpen={setOpen}
            deleteId={id ?? ""}
            confirmDelete={handleDelete}
            description="Are you sure you want to the Project?"
            title="Delete Project"
          />
        </div>
      );
    },
  },
];
