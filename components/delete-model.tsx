"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";

interface IProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  confirmDelete: (id: string) => void;
  deleteId: string;
  title: string,
  description: string
}

const DeleteModel = ({ open, setOpen, confirmDelete, deleteId, description, title }: IProps) => {

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogTitle>{title ?? "Unknown"}</DialogTitle>
        <DialogDescription>{description ?? "N/A"}</DialogDescription>
        <DialogFooter>
          <Button className="cursor-pointer" variant={'outline'} type="button" onClick={() => setOpen(false)}>Close</Button>
          <Button className="cursor-pointer" variant={'destructive'} type="button" onClick={() => confirmDelete(deleteId)}>
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteModel;
