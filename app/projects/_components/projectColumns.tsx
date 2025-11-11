"use client";
import { deleteProjectThunk, getSingleProjectThunk } from "@/app/features/projectSlices";
import { useAppDispatch, useAppSelector } from "@/app/hooks/reduxHooks";
import { IProject } from "@/app/types/projectTypes";
import DeleteModel from "@/components/delete-model";
import { Button } from "@/components/ui/button";
import { isoDateFormat } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { toast } from "sonner";
import ProjectForm from "./projectForm";

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
    cell: ({ row }) => {
      return (
        <p>{isoDateFormat(row?.original?.startDate)}</p>
      )
    }
  },
  {
    accessorKey: "endDate",
    header: "End Date",
    cell: ({ row }) => {
      return (
        <p>{isoDateFormat(row?.original?.endDate)}</p>
      )
    }
  },
  {
    header: "Actions",
    cell: ({ row }) => {

      const { project } = useAppSelector((state) => state.projects);

      const [open, setOpen] = useState(false);
      const [projectFormOpen, setProjectFormOpen] = useState(false);

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

      const handelFetchData = () => {
        if (id) {
          dispatch(getSingleProjectThunk({ id }))
        }
        setProjectFormOpen(true)
      }
      return (
        <div className="space-x-2">
          <Button type="button" variant={"outline"} onClick={handelFetchData}>
            Edit
          </Button>
          {
            project &&
            <ProjectForm open={projectFormOpen} setOpen={setProjectFormOpen} mode={"Update"} updateProject={project} />
          }
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
