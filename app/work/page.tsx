"use client";
import { WorkDataTable } from "./_components/work_table";
import { WorkColumns } from "./_components/work_columns";
import WorkForm from "./_components/workForm";
import { useState } from "react";
import { useAppSelector } from "../hooks/reduxHooks";

const page = () => {
  const [workOpenForm, setWorkOpenForm] = useState<boolean>(false);
  const { works, loading } = useAppSelector((state) => state.works);
  return (
    <div>
      <WorkForm mode="create" setModelOpen={setWorkOpenForm} />
      <WorkDataTable
        data={works ?? []}
        columns={WorkColumns}
        isLoading={loading}
      />
    </div>
  );
};

export default page;
