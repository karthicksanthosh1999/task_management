"use client";
import { WorkDataTable } from "./_components/work_table";
import { WorkColumns } from "./_components/work_columns";

const page = () => {
  const data = [];
  return (
    <div>
      <WorkDataTable data={data ?? []} columns={WorkColumns} isLoading={true} />
    </div>
  );
};

export default page;
