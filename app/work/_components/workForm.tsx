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
// import { DateTimePickerField } from "@/components/DateAndTimePickerField";
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
import { createWorkThunk, fetchWorkThunk } from "@/app/features/workSlices";
import { fetchProjectsThunk } from "@/app/features/projectSlices";

type Props = {
  mode?: "create" | "update";
  existingWork?: TWorkSchemaType;
  setModelOpen: (open: boolean) => void;
};

const WorkForm = ({ existingWork, mode = "create", setModelOpen }: Props) => {
  const { user } = useAppSelector((state) => state.auth);
  const { projects: projectList } = useAppSelector((state) => state.projects);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProjectsThunk({}));
  }, [dispatch]);

  const projectExtractFunction = () =>
    projectList?.map((item) => ({
      label: item.title,
      value: item.id,
    }));

  const form = useForm({
    resolver: zodResolver(workSchema),
    defaultValues: {
      userId: user?.id ?? "",
      title: existingWork?.title ?? "",
      projectId: existingWork?.projectId ?? "",
      state: existingWork?.state ?? "",
      startDate: existingWork?.startDate ?? undefined,
      endDate: existingWork?.endDate ?? undefined,
    },
  });

  useEffect(() => {
    form.reset({
      ...form.getValues(),
      userId: user?.id,
    });
  }, [form, user]);

  const onSubmit = (value: TWorkSchemaType) => {
    if (value) {
      dispatch(createWorkThunk(value));
    }
  };

  return (
    <>
      <div className="w-full">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-wrap w-full justify-around gap-2 items-end bg-card p-3 rounded-lg">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Work:</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      className="xl:w-xl w-full"
                      placeholder="Enter the work here..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="projectId"
              render={({ field }) => (
                <FormItem className="xl:w-[180px] max-w-full">
                  <FormLabel>Select Project:</FormLabel>
                  <FormControl className="xl:w-[180px] w-full">
                    <Select onValueChange={field.onChange} {...field}>
                      <SelectTrigger className="">
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
            <div className="md:w-sm w-full space-y-3">
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
            <div className="md:w-sm w-full space-y-3">
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
            <Button
              variant={"default"}
              type="submit"
              className="cursor-pointer">
              {mode === "update" ? "Update" : "Submit"}
            </Button>
            {mode === "create" ? (
              <Button
                variant={"destructive"}
                type="reset"
                className="cursor-pointer"
                onClick={() => form.reset()}>
                Reset
              </Button>
            ) : (
              <></>
            )}
          </form>
        </Form>
      </div>
    </>
  );
};

export default WorkForm;
