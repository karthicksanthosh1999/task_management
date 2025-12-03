"use client";

import { useEffect, useState } from "react";
import ProjectForm from "./_components/projectForm";
import ProjectHeader from "./_components/ProjectHeader";
import { DataTable } from "./_components/ProjectDataTable";
import { ProjectColumns } from "./_components/projectColumns";
import ProjectFilterForm from "./_components/ProjectFilterForm";
import AiChartModel from "@/components/ai-chat-model";
import { useSession } from "next-auth/react";
import { TProjectFilter } from "../types/projectTypes";
import { Status } from "@/lib/generated/prisma";
import { useFetchProjectHooks } from "../work/_hooks/projectHooks";

const page = () => {

  // COOKIES TOKEN
  const { data: session } = useSession()

  // STATE SECTION
  const [projectFormOpen, setProjectFormOpen] = useState(false);
  const [filterFormOpen, setFilterFormOpen] = useState(false)
  const [aiModelOpen, setAiModelOpen] = useState(false)

  // STATES SECTION
  const [inputs, setInputs] = useState<string>("");
  const [filteredInput, setFilteredInput] = useState<TProjectFilter>({
    endDate: undefined,
    startDate: undefined,
    search: "",
    state: "" as Status,
    userId: session?.user?.id as string,
  });


  // HOOKS
  const { refetch, data: projects, isLoading: loading } = useFetchProjectHooks(filteredInput);
  console.log(filteredInput)
  useEffect(() => {
    const fetch = setTimeout(() => {
      setFilteredInput((preV) => ({ ...preV, search: inputs }))
    }, 500)
    return () => clearTimeout(fetch)
  }, [inputs])


  return (
    <>
      <ProjectHeader
        search={inputs}
        setInputs={setInputs}
        setOpen={setProjectFormOpen}
        setFilterOpen={setFilterFormOpen}
        setAiModelOpen={setAiModelOpen}
      />
      <ProjectFilterForm
        open={filterFormOpen}
        setOpen={setFilterFormOpen}
        setFilteredInput={setFilteredInput}
      />
      <ProjectForm
        open={projectFormOpen}
        setOpen={setProjectFormOpen}
        mode={"Create"}
      />
      <DataTable
        columns={ProjectColumns}
        data={projects ?? []}
        loading={loading}
      />
      <AiChartModel
        aiModelOpen={aiModelOpen}
        description="Explain your task to me"
        setAiModelOpen={setAiModelOpen}
      />
    </>
  );
};

export default page;
