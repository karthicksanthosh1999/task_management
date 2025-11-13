import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface IProps {
  setOpen: (open: boolean) => void;
}

const WorkHeader = ({ setOpen }: IProps) => {
  return (
    <div className="flex items-center justify-between py-2">
      <h1>Work List</h1>
      <Input type="search" placeholder="Search work" className="w-sm" />
      <Button variant={"default"} onClick={() => setOpen(true)}>
        Add Work
      </Button>
    </div>
  );
};

export default WorkHeader;
