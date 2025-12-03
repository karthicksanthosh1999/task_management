"use client";
import { IUser } from "@/app/types/userTypes";
import DeleteModel from "@/components/delete-model";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { toast } from "sonner";
import UserForm from "./userForm";
import { isoDateFormat } from "@/lib/utils";
import UserActivityModel from "./userActivityModel";
import { useSingleUserFetchHook, useUserDeleteHook } from "../_hooks/userHooks";

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
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => (
      <h1>{isoDateFormat(row?.original?.createdAt!)}</h1>
    )
  },
  {
    header: "Actions",
    cell: ({ row }) => {
      const { id } = row.original;

      // STATES SECTION
      const [updateModelOpen, setUpdateModelOpen] = useState(false)
      const [open, setOpen] = useState(false);
      const [openActivity, setOpenActivity] = useState(false)

      // HOOKS
      const { data: fetchSingleUserData, mutate: fetchSingleUserMutation } = useSingleUserFetchHook();
      const { mutate: userDeleteMutation } = useUserDeleteHook();

      const fetchUpdatingUser = (id: string) => {
        try {
          setUpdateModelOpen(true)
          fetchSingleUserMutation({ id })
        } catch (error) {
          console.log(error)
        }
      }

      const handleDelete = async () => {
        try {
          if (id) {
            userDeleteMutation({ id })
            setOpen(false)
          }
        } catch (error) {
          toast.error("Something went wrong...❌");
        }
      };

      return (
        <div className="space-x-2">

          <Button
            type="button"
            variant={"outline"}
            className="cursor-pointer"
            onClick={() => fetchUpdatingUser(id!)}>
            Edit
          </Button>

          <Button
            type="button"
            variant={"destructive"}
            className="cursor-pointer"
            onClick={() => setOpen(true)}>
            Delete
          </Button>

          <Button
            type="button"
            variant={"outline"}
            className="cursor-pointer"
            onClick={() => setOpenActivity(true)}>
            Activity
          </Button>

          {/* USER UPDATE MODEL */}
          <UserForm
            open={updateModelOpen}
            setOpen={setUpdateModelOpen}
            existingUser={fetchSingleUserData!}
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
          {/* USER ACTIVITY MODEL */}

          <UserActivityModel open={openActivity} setOpen={setOpenActivity} userId={fetchSingleUserData?.id!} />
        </div>
      );
    },
  },
];
