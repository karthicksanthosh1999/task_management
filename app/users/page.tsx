"use client";

import { useEffect, useState } from "react";
import UserForm from "./_components/userForm";
import UserHeader from "./_components/UserHeader";
import { DataTable } from "./_components/UserDataTable";
import { UserColumns } from "./_components/userColumns";
import { useUserFilterUseQuery } from "./_hooks/userHooks";

const page = () => {

  // STATES
  const [userFormOpen, setUserFormOpen] = useState(false);
  const [inputs, setInputs] = useState<string>("");

  // HOOKS
  const { data, isPending } = useUserFilterUseQuery(inputs, "");

  useEffect(() => {
    const timer = setInterval(() => {
    }, 500)

    return () => clearInterval(timer)
  }, [])

  return (
    <>
      <UserHeader setOpen={setUserFormOpen} setInput={setInputs} inputs={inputs} />
      <UserForm open={userFormOpen} setOpen={setUserFormOpen} mode="Create" />
      <DataTable columns={UserColumns} data={data ?? []} loading={isPending} />
    </>
  );
};

export default page;
