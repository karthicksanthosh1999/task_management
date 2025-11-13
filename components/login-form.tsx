"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldSeparator,
} from "@/components/ui/field";
import { FormField, FormItem, FormMessage, Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAppDispatch } from "@/app/hooks/reduxHooks";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userValidationSchema } from "@/app/login/schema/loginValidationSchema";
import { loginUser } from "@/app/features/authSlices";
import { TLoginTypes } from "@/app/types/loginTypes";
import { redirect, useRouter } from "next/navigation";
import { toast } from "sonner";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(userValidationSchema),
  });

  const handleLogin = async (values: TLoginTypes) => {
    try {
      await dispatch(loginUser(values));
      toast.success("User login successfully");
      router.push("/dashboard");
    } catch (error) {
      toast.error("Invalid credentials");
    }
  };

  return (
    <div className={cn("flex items-center justify-center", className)} {...props}>
      <Card className="w-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Task Manager</CardTitle>
          <CardDescription>
            Login with your Email and Password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleLogin)}
              className="space-y-5">
              <FieldGroup>
                <FormField
                  name="email"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <Input
                        placeholder="Enter email"
                        {...field}
                        type="email"
                      />
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
                <Field>
                  <Button type="submit" className="cursor-pointer">Login</Button>
                </Field>
              </FieldGroup>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
