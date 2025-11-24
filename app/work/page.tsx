"use client";
import { WorkDataTable } from "./_components/work_table";
import { WorkColumns } from "./_components/work_columns";
import WorkForm from "./_components/workForm";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { fetchWorkThunk } from "../features/workSlices";
import WorkHeader from "./_components/WorkHeader";
import { useSession } from "next-auth/react";

const page = () => {

  const { data: session } = useSession();
  const user = session?.user

  const [workOpenForm, setWorkOpenForm] = useState<boolean>(false);
  const { works, loading } = useAppSelector((state) => state.works);
  const dispatch = useAppDispatch();


  useEffect(() => {
    dispatch(fetchWorkThunk({ role: user?.role, userId: user?.id }));
  }, [dispatch]);

  return (
    <div>
      <WorkHeader setOpen={setWorkOpenForm} />
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
    </div>
  );
};

export default page;
