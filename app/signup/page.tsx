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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FieldDescription } from "@/components/ui/field";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface IProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const page = ({ open, setOpen }: IProps) => {
  const dispatch = useAppDispatch();
  const navigate = useRouter();

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
    <div className="flex items-center justify-center w-full h-[90vh]">
      <Card>
        <CardContent className="sm:w-lg w-full">
          <CardHeader>
            <CardTitle>Signup Form</CardTitle>
            <CardDescription>Enter your details</CardDescription>
          </CardHeader>
          <Separator className="my-2" />
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
              <Button
                className="cursor-pointer w-full"
                variant={"default"}
                type="submit">
                Create
              </Button>
            </form>
          </Form>
        </CardContent>
        <FieldDescription className="text-center">
          Back to{" "}
          <b onClick={() => navigate.push("/")} className="cursor-pointer">
            login
          </b>{" "}
          form
        </FieldDescription>
      </Card>
    </div>
  );
};

export default page;
