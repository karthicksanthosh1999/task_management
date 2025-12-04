import { Button } from "@/components/ui/button";

interface IProps {
  setOpen: (open: boolean) => void;
  setExportOpen: (open: boolean) => void;
}

const WorkHeader = ({ setOpen, setExportOpen }: IProps) => {
  return (
    <div className="flex items-center justify-between py-2">
      <h1>Work List</h1>
      <div className="flex items-center justify-center gap-5">
        <Button
          className="cursor-pointer"
          variant={"default"}
          onClick={() => setOpen(true)}>
          Add Work
        </Button>
        <Button
          className="cursor-pointer"
          variant={"outline"}
          onClick={() => setExportOpen(true)}>
          Export
        </Button>
      </div>
    </div>
  );
};

export default WorkHeader;
