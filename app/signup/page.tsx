"use client";
import { FormField, FormItem, FormMessage, Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IUser } from "@/app/types/userTypes";
import { useAppDispatch } from "@/app/hooks/reduxHooks";
import { addUserThunk } from "@/app/features/userSlices";
import { toast } from "sonner";
import { userSchema } from "../users/schema/userSchema";

interface IProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const page = ({ open, setOpen }: IProps) => {
  const dispatch = useAppDispatch();

  const form = useForm({
    resolver: zodResolver(userSchema),
  });

  const handleUserSubmit = async (userData: IUser) => {
    try {
      await dispatch(addUserThunk(userData)).unwrap();
      toast.success("User added successfully ✅");
      setOpen(false);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : String(error));
    }
  };

  const handleReset = () => {
    form.reset();
    setOpen(false);
  };

  return (
    <>
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
                <Input placeholder="Enter phone number" {...field} type="tel" />
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
                <Input
                  placeholder="Enter company name"
                  {...field}
                  type="text"
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="cursor-pointer" variant={"default"} type="submit">
            Create
          </Button>
        </form>
      </Form>
    </>
  );
};

export default page;
