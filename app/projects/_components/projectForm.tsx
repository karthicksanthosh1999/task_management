"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  projectValidationSchema,
  TProjectValidationSchema,
} from "../schema/projectSchema";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/app/hooks/reduxHooks";
import { useEffect } from "react";
import {
  createProjectThunk,
  updateProjectThunk,
} from "@/app/features/projectSlices";
import { toast } from "sonner";
import { CustomDatePicker } from "@/components/CustomDatePicker";

interface IProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  mode: "Create" | "Update";
  updateProject?: TProjectValidationSchema;
}

const ProjectForm = ({ open, setOpen, mode, updateProject }: IProps) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const form = useForm({
    resolver: zodResolver(projectValidationSchema),
  });

  useEffect(() => {
    form.reset({
      ...form.getValues(),
      userId: user?.id,
    });
  }, [form, user]);

  useEffect(() => {
    if (updateProject) {
      form.reset({
        title: updateProject.title ?? "",
        state: updateProject.state ?? "Completed",
        startDate: updateProject.startDate
          ? new Date(updateProject.startDate)
          : new Date(),
        endDate: updateProject.endDate
          ? new Date(updateProject.endDate)
          : new Date(),
        userId: user?.id ?? "",
      });
    }
  }, [updateProject, user, form]);

  const handleOnSubmit = async (values: TProjectValidationSchema) => {
    if (mode === "Create") {
      dispatch(createProjectThunk(values));
      toast.success("Project Created Successfully...🎉");
    } else {
      if (updateProject?.id && values) {
        dispatch(
          updateProjectThunk({ project: values, id: updateProject?.id })
        );
        toast.success("Project Updated Successfully...🎉");
      }
    }
    handleReset();
  };

  const handleReset = () => {
    form.reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleReset}>
      <DialogContent>
        <DialogTitle>Add Project</DialogTitle>
        <DialogDescription>Add the project here</DialogDescription>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleOnSubmit)}
            className="space-y-3">
            <div className="space-y-3">
              <FormLabel>Project Title:</FormLabel>
              <FormField
                name="title"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <Input
                      placeholder="Enter the Project title"
                      {...field}
                      type="text"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-3">
              <FormLabel>Select State</FormLabel>
              <FormField
                name="state"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      name={field.name}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select State" />
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
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
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
            <DialogFooter>
              <Button
                className="cursor-pointer"
                variant={"default"}
                type="submit">
                {mode === "Create" ? "Create" : "Update"} Project
              </Button>
              <Button
                className="cursor-pointer"
                variant={"outline"}
                type="reset"
                onClick={handleReset}>
                Cancel
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectForm;
