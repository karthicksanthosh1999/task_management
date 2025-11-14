'use client'

import { Button } from "@/components/ui/button";
import WorkExport from "./work_exprot";
import { useState } from "react";

interface IProps {
  setOpen: (open: boolean) => void;
}

const WorkHeader = ({ setOpen }: IProps) => {

  const [exportOpen, setExportOpen] = useState(false)

  return (
    <div className="flex items-center justify-between py-2">
      <h1>Work List</h1>
      <div className="flex items-center justify-center gap-5">
        <Button className="cursor-pointer" variant={"default"} onClick={() => setOpen(true)}>
          Add Work
        </Button>
        <Button className="cursor-pointer" variant={"outline"} onClick={() => setExportOpen(true)}>
          Export
        </Button>
      </div>
      <WorkExport open={exportOpen} setOpen={setExportOpen} mode="Export" />
    </div>
  );
};

export default WorkHeader;
