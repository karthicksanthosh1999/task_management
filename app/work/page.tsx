"use client";
import { WorkDataTable } from "./_components/work_table";
import { WorkColumns } from "./_components/work_columns";
import WorkForm from "./_components/workForm";
import { useCallback, useEffect, useState } from "react";
import WorkHeader from "./_components/WorkHeader";
import { useSession } from "next-auth/react";
import { useFetchWorkHooks } from "./_hooks/worktHooks";
import { IWorkFilter } from "../types/workTypes";
import WorkExport from "./_components/work_export";

const page = () => {
  // STORED USERS
  const { data: session } = useSession();
  const user = session?.user;

  // STATES
  const [workOpenForm, setWorkOpenForm] = useState<boolean>(false);
  const [filteredValues, setFilteredValues] = useState<IWorkFilter>({});
  const [exportOpen, setExportOpen] = useState(false);

  // HOOKS
  const { data: works, isPending: loading } = useFetchWorkHooks(
    filteredValues!
  );
  return (
    <div>
      <WorkHeader setOpen={setWorkOpenForm} setExportOpen={setExportOpen} />
      <WorkForm
        modelOpen={workOpenForm}
        mode="create"
        setModelOpen={setWorkOpenForm}
      />
      <WorkDataTable
        data={works ?? []}
        columns={WorkColumns}
        isLoading={loading}
      />
      <WorkExport
        open={exportOpen}
        setOpen={setExportOpen}
        mode="Export"
        display={setFilteredValues}
      />
    </div>
  );
};

export default page;
