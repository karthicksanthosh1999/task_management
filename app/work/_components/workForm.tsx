"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { workSchema, TWorkSchemaType } from "../schema/workSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppDispatch, useAppSelector } from "@/app/hooks/reduxHooks";
import { CustomDatePicker } from "@/components/CustomDatePicker";
import { createWorkThunk, updateWorkThunk } from "@/app/features/workSlices";
import { fetchProjectsThunk } from "@/app/features/projectSlices";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { MultiSelect, MultiSelectOption } from "@/components/multi-select";
import { fetchUsersThunk } from "@/app/features/userSlices";
import { useSession } from "next-auth/react";

type Props = {
  mode?: "create" | "update";
  existingWork?: TWorkSchemaType;
  modelOpen: boolean;
  setModelOpen: (open: boolean) => void;
};

const WorkForm = ({ existingWork, mode, modelOpen, setModelOpen }: Props) => {

  const { data: session } = useSession();
  const user = session?.user;

  const { projects: projectList } = useAppSelector((state) => state.projects);
  const { users } = useAppSelector((state) => state.users);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProjectsThunk({}));
    dispatch(fetchUsersThunk({ role: "Employee", search: "" }));
  }, [dispatch]);

  useEffect(() => {
    if (existingWork) {
      form.reset({
        title: existingWork.title ?? "",
        state: existingWork.state ?? "Progress",
        startDate: existingWork.startDate
          ? new Date(existingWork?.startDate)
          : new Date(),
        endDate: existingWork.endDate
          ? new Date(existingWork.endDate)
          : new Date(),
        projectId: existingWork.projectId ?? "",
        userId: user?.id ?? "",
      });
    }
  }, [existingWork, user]);

  const projectExtractFunction = () =>
    projectList?.map((item) => ({
      label: item.title,
      value: item.id,
    }));

  const form = useForm({
    resolver: zodResolver(workSchema),
  });

  useEffect(() => {
    form.reset({
      ...form.getValues(),
      userId: user?.id,
    });
  }, [form, user]);

  const handleClose = () => {
    form.reset();
    setModelOpen(false);
  };

  const onSubmit = (value: TWorkSchemaType) => {
    if (mode === "create") {
      dispatch(createWorkThunk(value));
      handleClose();
      toast.success("Work created successfully...🎉");
    } else if (existingWork?.id && value) {
      dispatch(updateWorkThunk({ work: value, workId: existingWork?.id }));
      handleClose();
      toast.success("Work update successfully...🎉");
    }
  };
  const frameworksList = users.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  return (
    <>
      <Dialog open={modelOpen} onOpenChange={setModelOpen}>
        <DialogContent>
          <DialogTitle>Add Work</DialogTitle>
          <DialogDescription>Add the work here</DialogDescription>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              {/* TITLE */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title:</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        className="w-full"
                        placeholder="Enter the work here..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* PROJECT */}
              <FormField
                control={form.control}
                name="projectId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Project:</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} {...field}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a project" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {projectExtractFunction() &&
                              projectExtractFunction()?.map((item, idx) => (
                                <SelectItem value={item?.value || ""} key={idx}>
                                  {item.label}
                                </SelectItem>
                              ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* STATE */}
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Status:</FormLabel>
                    <FormControl className="w-full">
                      <Select onValueChange={field.onChange} {...field}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="Pending">Pending</SelectItem>
                            <SelectItem value="Completed">Completed</SelectItem>
                            <SelectItem value="Progress">Progress</SelectItem>
                            <SelectItem value="Planning">Planning</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* ASSIGNED USERS */}
              {
                user?.role === "Admin" && (
                  <FormField
                    control={form.control}
                    name="assignedUsers"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Select Frameworks</FormLabel>
                        <FormControl>
                          <MultiSelect
                            options={frameworksList ?? []}
                            value={field.value}
                            onValueChange={field.onChange}
                            placeholder="Choose frameworks..."
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )
              }
              {/* START DATE */}
              <div className=" space-y-3">
                <FormLabel>Start Date</FormLabel>
                <FormField
                  name="startDate"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <CustomDatePicker
                        value={field.value as Date}
                        onChange={field.onChange}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* END DATE */}
              <div className=" space-y-3">
                <FormLabel>End Date</FormLabel>
                <FormField
                  name="endDate"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <CustomDatePicker
                        value={field.value as Date}
                        onChange={field.onChange}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-x-2">
                <Button
                  variant={"default"}
                  type="submit"
                  className="cursor-pointer">
                  {mode === "update" ? "Update" : "Submit"}
                </Button>

                <Button
                  variant={"destructive"}
                  type="reset"
                  className="cursor-pointer"
                  onClick={handleClose}>
                  Close
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default WorkForm;
