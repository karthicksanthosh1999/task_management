"use client";
import { useEffect, useState } from "react";
import ProjectForm from "./_components/projectForm";
import ProjectHeader from "./_components/ProjectHeader";
import { DataTable } from "./_components/ProjectDataTable";
import { ProjectColumns } from "./_components/projectColumns";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { fetchProjectsThunk } from "../features/projectSlices";

const page = () => {
  const [projectFormOpen, setProjectFormOpen] = useState(false);
  const { projects, loading } = useAppSelector((state) => state.projects);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchProjectsThunk());
  }, [dispatch]);

  return (
    <>
      <ProjectHeader setOpen={setProjectFormOpen} />
      <ProjectForm open={projectFormOpen} setOpen={setProjectFormOpen} />
      <DataTable columns={ProjectColumns} data={projects} loading={loading} />
    </>
  );
};

export default page;
