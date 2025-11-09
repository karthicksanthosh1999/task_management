"use client";
import { LoginForm } from "@/components/login-form";
import { useAppDispatch } from "./hooks/reduxHooks";
import { fetchLoginUser } from "./features/authSlices";
import { useEffect } from "react";

export default function Home() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchLoginUser());
  }, [dispatch]);
  return (
    <>
      <LoginForm />
    </>
  );
}
