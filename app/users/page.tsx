"use client";

import { useEffect, useState } from "react";
import UserForm from "./_components/userForm";
import UserHeader from "./_components/UserHeader";
import { DataTable } from "./_components/UserDataTable";
import { UserColumns } from "./_components/userColumns";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";

import { fetchUsersThunk } from "../features/userSlices";

const page = () => {

  // REDUX SECTION
  const { users, loading } = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch()

  // STATES
  const [userFormOpen, setUserFormOpen] = useState(false);
  const [inputs, setInputs] = useState<string>("");


  useEffect(() => {
    const fetch = setTimeout(() => {
      dispatch(fetchUsersThunk({ role: "", search: inputs }))
    }, 500)
    return () => clearTimeout(fetch)
  }, [inputs, dispatch])

  return (
    <>
      <UserHeader setOpen={setUserFormOpen} setInput={setInputs} inputs={inputs} />
      <UserForm open={userFormOpen} setOpen={setUserFormOpen} mode="Create" />
      <DataTable columns={UserColumns} data={users} loading={loading} />
    </>
  );
};

export default page;
