"use client";
import { deleteUserThunk, fetchSingleUserThunk } from "@/app/features/userSlices";
import { useAppDispatch, useAppSelector } from "@/app/hooks/reduxHooks";
import { IUser } from "@/app/types/userTypes";
import DeleteModel from "@/components/delete-model";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { toast } from "sonner";
import UserForm from "./userForm";
import { useSession } from "next-auth/react";

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
    accessorKey: "role",
    header: "Roles",
  },
  {
    accessorKey: "company",
    header: "Company",
  },
  {
    header: "Actions",
    cell: ({ row }) => {
      const { id } = row.original;

      // REDUX SECTION
      const dispatch = useAppDispatch();
      const { user } = useAppSelector(state => state.users)

      // STATES SECTION
      const [updateModelOpen, setUpdateModelOpen] = useState(false)
      const [open, setOpen] = useState(false);

      const fetchUpdatingUser = (id: string) => {
        try {
          dispatch(fetchSingleUserThunk({ id })).unwrap()
          setUpdateModelOpen(true)
        } catch (error) {
          console.log(error)
        }
      }

      const handleDelete = async () => {
        try {
          if (id) {
            await dispatch(deleteUserThunk({ userId: id })).unwrap();
            toast.success("User Deleted Successfully...👍");
          }
        } catch (error) {
          toast.error("Something went wrong...❌");
        }
      };
      console.log(updateModelOpen)
      return (
        <div className="space-x-2">

          <Button
            type="button"
            variant={"outline"}
            onClick={() => fetchUpdatingUser(id!)}>
            Edit
          </Button>

          <Button
            type="button"
            variant={"destructive"}
            onClick={() => setOpen(true)}>
            Delete
          </Button>

          {/* USER UPDATE MODEL */}
          <UserForm
            open={updateModelOpen}
            setOpen={setUpdateModelOpen}
            existingUser={user!}
            mode="Update"
          />

          {/* USER DELETE MODEL */}
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
