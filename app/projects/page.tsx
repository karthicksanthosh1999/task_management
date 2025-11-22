"use client";
import { useEffect, useState } from "react";
import ProjectForm from "./_components/projectForm";
import ProjectHeader from "./_components/ProjectHeader";
import { DataTable } from "./_components/ProjectDataTable";
import { ProjectColumns } from "./_components/projectColumns";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import ProjectFilterForm from "./_components/ProjectFilterForm";
import AiChartModel from "@/components/ai-chat-model";
import { fetchProjectsThunk } from "../features/projectSlices";
import { useSession } from "next-auth/react";
import { TProjectFilter } from "../types/projectTypes";
import { Status } from "@/lib/generated/prisma/enums";

const page = () => {

  const { data: session } = useSession()

  // STATE SECTION
  const [projectFormOpen, setProjectFormOpen] = useState(false);
  const [filterFormOpen, setFilterFormOpen] = useState(false)
  const [aiModelOpen, setAiModelOpen] = useState(false)

  // REDUX SECTION
  const { projects, loading } = useAppSelector((state) => state.projects);
  const dispatch = useAppDispatch()

  // STATES SECTION
  const [inputs, setInputs] = useState<string>("");
  const [filteredInput, setFilteredInput] = useState<TProjectFilter>({
    endDate: "",
    startDate: "",
    search: "",
    state: "" as Status,
    userId: session?.user?.id as string,
  })


  useEffect(() => {
    const fetch = setTimeout(() => {
      dispatch(fetchProjectsThunk(filteredInput));
    }, 500)
    return () => clearTimeout(fetch)
  }, [inputs])


  return (
    <>
      <ProjectHeader setOpen={setProjectFormOpen} setFilterOpen={setFilterFormOpen} setAiModelOpen={setAiModelOpen} />
      <ProjectFilterForm open={filterFormOpen} setOpen={setFilterFormOpen} setFilteredInput={setFilteredInput} />
      <ProjectForm open={projectFormOpen} setOpen={setProjectFormOpen} mode={"Create"} />
      <DataTable columns={ProjectColumns} data={projects} loading={loading} />
      <AiChartModel aiModelOpen={aiModelOpen} description="Explain your task to me" setAiModelOpen={setAiModelOpen} />
    </>
  );
};

export default page;
