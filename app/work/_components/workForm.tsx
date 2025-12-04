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
import { CustomDatePicker } from "@/components/CustomDatePicker";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { MultiSelect } from "@/components/multi-select";
import { useSession } from "next-auth/react";
import { IWork } from "@/app/types/workTypes";
import { useUserFilterUseQuery } from "@/app/users/_hooks/userHooks";
import { useCreateWorkHook, useUpdateWorkHook } from "../_hooks/worktHooks";
import { useFetchProjectHooks } from "@/app/projects/_hooks/projectHooks";

type Props = {
  mode?: "create" | "update";
  existingWork?: IWork;
  modelOpen: boolean;
  setModelOpen: (open: boolean) => void;
};

const WorkForm = ({ existingWork, mode, modelOpen, setModelOpen }: Props) => {
  const { data: session } = useSession();
  const user = session?.user;

  //HOOKS
  const { data: usersList } = useUserFilterUseQuery("Employee", "")
  const { mutate: createWorkMutation } = useCreateWorkHook()
  const { mutate: updateWorkMutation } = useUpdateWorkHook()
  const { data: projectList } = useFetchProjectHooks({})

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
  }, [existingWork, user])

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
      createWorkMutation(value)
      toast.loading("Work Creating...", { id: 'createWork' })
      handleClose();
    } else if (existingWork?.id && value) {
      updateWorkMutation({ work: value, id: existingWork?.id })
      handleClose();
      toast.loading("Work Updating...", { id: 'updateWork' })
    }
  };

  const frameworksList = usersList && usersList?.map((item) => ({
    label: item?.name,
    value: item?.id ?? "",
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
              {user?.role === "Admin" && (
                <FormField
                  control={form.control}
                  name="assignedUsers"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select Frameworks</FormLabel>
                      <FormControl>
                        <MultiSelect
                          options={frameworksList!}
                          value={field.value}
                          onValueChange={field.onChange}
                          placeholder="Choose frameworks..."
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
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
