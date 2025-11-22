"use client";

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
import { addUserThunk, updateUserThunk } from "@/app/features/userSlices";
import { toast } from "sonner";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect } from "react";
import { roles } from "@/lib/generated/prisma/enums";

interface IProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  existingUser?: IUser,
  mode: "Create" | "Update"
}

const UserForm = ({ open, setOpen, mode, existingUser }: IProps) => {

  const dispatch = useAppDispatch();

  const form = useForm({
    resolver: zodResolver(userSchema),
  });

  useEffect(() => {
    if (existingUser) {
      form.reset({
        company: existingUser?.company,
        email: existingUser?.email,
        mobile: existingUser?.mobile,
        name: existingUser?.name,
        role: existingUser?.role as roles,
      })
    }
  }, [form, existingUser])


  const handleUserSubmit = async (userData: IUser) => {
    if (mode === "Create") {
      try {
        await dispatch(addUserThunk(userData)).unwrap();
        toast.success("User added successfully ✅");
        setOpen(false)
      } catch (error) {
        toast.error(error instanceof Error ? error.message : String(error));
      }
    } else {
      try {
        await dispatch(updateUserThunk(userData));
        toast.success("User updated successfully ✅");
      } catch (error) {
        toast.error(error instanceof Error ? error.message : String(error));
      }
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
            {/* NAME INPUT */}
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
            {/* PASSWORD INPUT */}
            {
              mode === "Create" && (
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
              )
            }
            {/* MOBILE INPUT */}
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
            {/* EMAIL INPUT */}
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

            {/* ROLE INPUT */}
            <FormField
              name="role"
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
                        <SelectItem value="Admin">Admin</SelectItem>
                        <SelectItem value="Employee">Employee</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* COMPANY INPUT */}
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
