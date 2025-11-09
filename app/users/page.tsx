"use client";
import { useEffect, useState } from "react";
import UserForm from "./_components/userForm";
import UserHeader from "./_components/UserHeader";
import { DataTable } from "./_components/UserDataTable";
import { UserColumns } from "./_components/userColumns";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { fetchUsersThunk } from "../features/userSlices";

const page = () => {
  const [userFormOpen, setUserFormOpen] = useState(false);
  const { users, loading } = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchUsersThunk())
  }, [dispatch])
  return (
    <>
      <UserHeader setOpen={setUserFormOpen} />
      <UserForm open={userFormOpen} setOpen={setUserFormOpen} />
      <DataTable columns={UserColumns} data={users} loading={loading} />
    </>
  );
};

export default page;
