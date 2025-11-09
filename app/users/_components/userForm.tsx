import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { FormField, FormItem, FormMessage, Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "../schema/userSchema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IUser } from "@/app/types/userTypes";
import { useAppDispatch } from "@/app/hooks/reduxHooks";
import { addUserThunk } from "@/app/features/userSlices";
import { toast } from "sonner";

interface IProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const UserForm = ({ open, setOpen }: IProps) => {
  const dispatch = useAppDispatch();

  const form = useForm({
    resolver: zodResolver(userSchema),
  });

  const handleUserSubmit = async (userData: IUser) => {
    try {
      await dispatch(addUserThunk(userData)).unwrap();
      toast.success("User added successfully ✅");
      setOpen(false)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : String(error));
    }
  };

  const handleReset = () => {
    form.reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleReset}>
      <DialogContent>
        <DialogTitle>Add User</DialogTitle>
        <DialogDescription>Add the users here</DialogDescription>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleUserSubmit)}
            className="space-y-5">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <Input placeholder="Enter user name" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <Input
                    placeholder="Enter password"
                    {...field}
                    type="password"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="mobile"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <Input
                    placeholder="Enter phone number"
                    {...field}
                    type="tel"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <Input placeholder="Enter email" {...field} type="email" />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="company"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <Input placeholder="Enter company name" {...field} type="text" />
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                className="cursor-pointer"
                variant={"default"}
                type="submit">
                Create
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

export default UserForm;
