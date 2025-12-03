import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

interface IProps {
  setOpen: (open: boolean) => void;
  setFilterOpen: (open: boolean) => void;
  setAiModelOpen: (open: boolean) => void;
  setInputs: (search: string) => void
  search: string
}

const ProjectHeader = ({ search, setOpen, setFilterOpen, setAiModelOpen, setInputs }: IProps) => {

  return (
    <div className="flex items-center justify-between py-2">
      <h1>Project List</h1>
      <Input
        type="search"
        placeholder="Search Project"
        className="w-sm"
        value={search}
        onChange={(e) => setInputs(e.target.value)}
      />
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          className="cursor-pointer"
          onClick={() => setAiModelOpen(true)}
        >
          <Image src={'/ai.png'} width={25} height={25} alt="ai.png" />
        </Button>
        <Button
          variant="secondary"
          className="cursor-pointer"
          onClick={() => setFilterOpen(true)}
        >
          Advance Filter
        </Button>
        <Button
          variant="default"
          className="cursor-pointer"
          onClick={() => setOpen(true)}
        >
          Add Project
        </Button>
      </div>
    </div>
  );
};

export default ProjectHeader;
