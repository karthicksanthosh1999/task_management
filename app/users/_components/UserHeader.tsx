"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface IProps {
  setOpen: (open: boolean) => void;
  setInput: (input: string) => void;
  inputs: string
}

const UserHeader = ({ setOpen, setInput, inputs }: IProps) => {
  return (
    <div className="flex items-center justify-between py-2">
      <h1>User List</h1>
      <Input type="search" placeholder="Search user" className="w-sm" value={inputs} onChange={(e) => setInput(e.target.value)} />
      <Button variant={"default"} onClick={() => setOpen(true)}>
        Add Users
      </Button>
    </div>
  );
};

export default UserHeader;
