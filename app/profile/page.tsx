"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Edit, Upload, X } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "../users/schema/userSchema";
import { useEffect, useState } from "react";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { IUser } from "../types/userTypes";
import { updateUserThunk } from "../features/userSlices";

const page = () => {
  const [isEdit, setIsEdit] = useState(false);

  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const form = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      mobile: "",
    },
  });
  useEffect(() => {
    if (user) {
      form.reset({
        name: user.name || "",
        email: user.email || "",
        company: user.company || "",
        mobile: user.mobile || "",
      });
    }
  }, [user, form]);

  const handleOnSubmit = (value: IUser) => {
    dispatch(updateUserThunk(value));
  };

  return (
    <div>
      <Card>
        <Form {...form}>
          <form
            className="space-y-3"
            onSubmit={form.handleSubmit(handleOnSubmit)}>
            <CardHeader>
              <CardTitle> {isEdit && "Edit "}User Profile</CardTitle>
              <CardDescription>Here edit your profile here...</CardDescription>
            </CardHeader>
            <CardContent>
              <Separator />
              <div className="md:p-5 space-y-5">
                <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
                  <div className="space-y-3">
                    <Label>Your Full Name:</Label>
                    <FormField
                      name="name"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <Input
                            disabled={isEdit ? false : true}
                            placeholder="Enter user name"
                            {...field}
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="space-y-3">
                    <Label>Your Email Address:</Label>
                    <FormField
                      name="email"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <Input
                            disabled={isEdit ? false : true}
                            placeholder="Enter email"
                            {...field}
                            type="email"
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
                  <div className="space-y-3">
                    <Label>Your Mobile Number:</Label>
                    <FormField
                      name="mobile"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <Input
                            disabled={isEdit ? false : true}
                            placeholder="Enter phone number"
                            {...field}
                            type="tel"
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="space-y-3">
                    <Label>Your Company Name:</Label>
                    <FormField
                      name="company"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <Input
                            disabled={isEdit ? false : true}
                            placeholder="Enter company name"
                            {...field}
                            type="text"
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <Separator />
            <CardFooter>
              {/* <CardAction className="space-x-2"> */}
              <Button
                variant={"outline"}
                className="cursor-pointer"
                type="button"
                onClick={() => setIsEdit((pre) => !pre)}>
                {isEdit ? (
                  <>
                    <X /> Cancel
                  </>
                ) : (
                  <>
                    <Edit /> Edit
                  </>
                )}
              </Button>
              {isEdit && (
                <Button
                  variant={"destructive"}
                  className="cursor-pointer"
                  type="submit">
                  <Upload /> Submit
                </Button>
              )}
              {/* </CardAction> */}
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default page;
