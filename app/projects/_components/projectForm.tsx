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
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { IProject } from "@/app/types/projectTypes";
import { useAppSelector } from "@/app/hooks/reduxHooks";

interface IProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const ProjectForm = ({ open, setOpen }: IProps) => {
  const { user } = useAppSelector((state) => state.auth);

  const form = useForm({
    resolver: zodResolver(projectValidationSchema),
    defaultValues: {
      userId: user?.id,
    },
  });

  const handleOnSubmit = async (values: IProject) => {
    console.log(values);
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
                      {...field}
                      type="date"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-3">
              <FormLabel>Select State </FormLabel>
              <FormField
                name="state"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <Select>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a fruit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Fruits</SelectLabel>
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
