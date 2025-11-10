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
import { projectValidationSchema } from "../schema/projectSchema";
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
import { IProject } from "@/app/types/projectTypes";
import { useAppDispatch, useAppSelector } from "@/app/hooks/reduxHooks";
import { useEffect } from "react";
import { createProjectThunk } from "@/app/features/projectSlices";
import { toast } from "sonner";

interface IProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const ProjectForm = ({ open, setOpen }: IProps) => {
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

  const handleOnSubmit = async (values: IProject) => {
    dispatch(createProjectThunk(values));
    handleReset();
    toast.success("Project Created Successfully...🎉");
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
              <FormLabel>Start Date</FormLabel>
              <FormField
                name="startDate"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <Input
                      placeholder="Enter the Start Date"
                      type="date"
                      {...field}
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
                          {["Pending", "Completed", "Planning", "Progress"].map(
                            (item, idx) => (
                              <SelectItem value={item} key={idx}>
                                {item}
                              </SelectItem>
                            )
                          )}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-3">
              <FormLabel>Start Date</FormLabel>
              <FormField
                name="endDate"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <Input
                      placeholder="Enter the End date"
                      {...field}
                      type="date"
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
                Create Project
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
