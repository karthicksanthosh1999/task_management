"use client";
import { useState } from "react";
import ProjectForm from "./_components/projectForm";
import ProjectHeader from "./_components/ProjectHeader";
import { DataTable } from "./_components/ProjectDataTable";
import { ProjectColumns } from "./_components/projectColumns";
import { useAppSelector } from "../hooks/reduxHooks";
import ProjectFilterForm from "./_components/ProjectFilterForm";

const page = () => {
  // STATE SECTION
  const [projectFormOpen, setProjectFormOpen] = useState(false);
  const [filterFormOpen, setFilterFormOpen] = useState(false)

  // REDUX SECTION
  const { projects, loading } = useAppSelector((state) => state.projects);

  return (
    <>
      <ProjectHeader setOpen={setProjectFormOpen} setFilterOpen={setFilterFormOpen} />
      <ProjectFilterForm open={filterFormOpen} setOpen={setFilterFormOpen} />
      <ProjectForm open={projectFormOpen} setOpen={setProjectFormOpen} mode={"Create"} />
      <DataTable columns={ProjectColumns} data={projects} loading={loading} />
    </>
  );
};

export default page;
