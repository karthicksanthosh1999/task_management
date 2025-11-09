"use client";
import { ReactNode, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { fetchLoginUser } from "../features/authSlices";
import { useRouter } from "next/navigation";

type TProps = {
  children: ReactNode;
};

const UserAuthProvider = ({ children }: TProps) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchLoginUser());
  }, [dispatch]);
  return <div>{children}</div>;
};

export default UserAuthProvider;
