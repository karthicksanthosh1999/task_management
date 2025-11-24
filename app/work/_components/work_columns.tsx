"use client";
import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MessageCircle, MoreHorizontal, Users } from "lucide-react";
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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export const WorkColumns: ColumnDef<IWork>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      const [open, setOpen] = useState(false);
      return (
        <>
          <h1 className={`w-[300px] truncate`}>
            {row.original.title}
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => setOpen(true)}>
              ...Read
            </span>
          </h1>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Commits</DialogTitle>
                <DialogDescription>Your Long Commits</DialogDescription>
                <Separator className="my-2" />
                <h1>{row.original?.title}</h1>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </>
      );
    },
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
    accessorKey: "assignedUsersList",
    header: "Assigned Users",
    cell: ({ row }) => {
      const { data: session } = useSession();
      const loggedUser = session?.user;
      const { assignedUsers, user } = row.original;
      return loggedUser?.email === user?.email && assignedUsers.length === 0 ? (
        <></>
      ) : (
        <Dialog>
          <DialogTrigger asChild>
            <Button className="cursor-pointer" variant="outline">
              <Users />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Assigned Users</DialogTitle>
            </DialogHeader>
            <h1>Created By:</h1>
            <Item variant="outline">
              <ItemMedia>
                <Avatar className="size-10">
                  <AvatarImage src={user?.image} />
                  <AvatarFallback>ER</AvatarFallback>
                </Avatar>
              </ItemMedia>
              <ItemContent>
                <ItemTitle>{user?.name}</ItemTitle>
                <ItemDescription>
                  {loggedUser?.id === user?.id ? "You" : user?.email}
                </ItemDescription>
              </ItemContent>
              <ItemActions>
                <Button
                  size="icon-sm"
                  variant="outline"
                  className="rounded-full"
                  aria-label="Invite">
                  <MessageCircle />
                </Button>
              </ItemActions>
            </Item>
            <Separator />
            <h1>Work Assigned Employee List:</h1>
            {assignedUsers &&
              assignedUsers.map((item) => (
                <div className="max-h-[250px] space-y-2 overflow-auto">
                  <Item variant="outline">
                    <ItemMedia>
                      <Avatar className="size-10">
                        <AvatarImage src={item.image} />
                        <AvatarFallback>ER</AvatarFallback>
                      </Avatar>
                    </ItemMedia>
                    <ItemContent>
                      <ItemTitle>{item.name}</ItemTitle>
                      <ItemDescription>
                        {loggedUser?.id === item?.id ? "You" : item.email}
                      </ItemDescription>
                    </ItemContent>
                    <ItemActions>
                      <Button
                        size="icon-sm"
                        variant="outline"
                        className="rounded-full"
                        aria-label="Invite">
                        <MessageCircle />
                      </Button>
                    </ItemActions>
                  </Item>
                </div>
              ))}
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Close</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );
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
          row.original?.state === "Progress" ? "text-orange-400 " : "",
          row.original?.state === "Pending" ? "text-violet-600" : ""
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
