"use client";
import { deleteUserThunk } from "@/app/features/userSlices";
import { useAppDispatch } from "@/app/hooks/reduxHooks";
import { IUser } from "@/app/types/userTypes";
import DeleteModel from "@/components/delete-model";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { toast } from "sonner";

export const UserColumns: ColumnDef<IUser>[] = [
  {
    accessorKey: "name",
    header: "Full Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "mobile",
    header: "Phone No",
  },
  {
    accessorKey: "company",
    header: "Company",
  },
  {
    header: "Actions",
    cell: ({ row }) => {
      const [open, setOpen] = useState(false);
      const { id } = row.original;
      const dispatch = useAppDispatch()

      const handleDelete = async () => {
        try {
          await dispatch(deleteUserThunk(id)).unwrap();
          toast.success("User Deleted Successfully...👍")
        } catch (error) {
          toast.error("Something went wrong...❌")
        }
      };

      return (
        <div className="space-x-2">
          <Button type="button" variant={"outline"}>
            Edit
          </Button>
          <Button type="button" variant={"destructive"} onClick={() => setOpen(true)}>
            Delete
          </Button>
          <DeleteModel
            open={open}
            setOpen={setOpen}
            deleteId={id ?? ""}
            confirmDelete={handleDelete}
            description="Are you sure you want to the user?"
            title="Delete User"
          />
        </div>
      );
    },
  },
];
