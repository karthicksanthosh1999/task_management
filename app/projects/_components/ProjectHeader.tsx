import { fetchProjectsThunk } from "@/app/features/projectSlices";
import { useAppDispatch } from "@/app/hooks/reduxHooks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

interface IProps {
  setOpen: (open: boolean) => void;
  setFilterOpen: (open: boolean) => void;
}

const ProjectHeader = ({ setOpen, setFilterOpen }: IProps) => {

  const [search, setSearch] = useState<string>("");
  const dispatch = useAppDispatch();

  // Debounce search input
  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(
        fetchProjectsThunk({ search })
      );
    }, 500);

    return () => clearTimeout(timeout);
  }, [search, dispatch]);

  return (
    <div className="flex items-center justify-between py-2">
      <h1>Project List</h1>
      <Input
        type="search"
        placeholder="Search Project"
        className="w-sm"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="flex items-center gap-3">
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
