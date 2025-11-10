import React from "react";
import { TWorkSchemaType } from "../schema/workSchema";
import WorkForm from "./workForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface WorkModalProps {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  selectedWork?: TWorkSchemaType;
}

const WorkUpdateModal = ({
  open,
  onOpenChange,
  selectedWork,
}: WorkModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl lg:max-w-full ">
        <DialogHeader>
          <DialogTitle>Update the work</DialogTitle>
          <DialogDescription>
            {selectedWork ? "Update Work" : "Create Work"}
          </DialogDescription>
        </DialogHeader>
        <WorkForm
          mode={selectedWork ? "update" : "create"}
          existingWork={selectedWork}
          setModelOpen={onOpenChange}
        />
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Cancel</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WorkUpdateModal;
