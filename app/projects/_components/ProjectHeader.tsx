import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface IProps {
  setOpen: (open: boolean) => void;
}

const ProjectHeader = ({ setOpen }: IProps) => {
  return (
    <div className="flex items-center justify-between py-2">
      <h1>Project List</h1>
      <Input type="search" placeholder="Search Project" className="w-sm" />
      <Button variant={"default"} onClick={() => setOpen(true)}>
        Add Project
      </Button>
    </div>
  );
};

export default ProjectHeader;
