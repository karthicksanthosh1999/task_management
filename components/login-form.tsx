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
import { Field, FieldDescription, FieldGroup } from "@/components/ui/field";
import { FormField, FormItem, FormMessage, Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAppDispatch } from "@/app/hooks/reduxHooks";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userValidationSchema } from "@/app/login/schema/loginValidationSchema";
import { signIn } from "next-auth/react";
import { TLoginTypes } from "@/app/types/loginTypes";
import { useRouter } from "next/navigation";
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
    const res = await signIn("credentials", {
      redirect: false,
      email: values?.email,
      password: values?.password,
    });
    if (res?.error) {
      toast.error("Invalid email or password");
    } else {
      router.push("/dashboard");
      toast.success("User login successfully...👍");
    }
  };

  return (
    <div
      className={cn("h-[90vh] flex items-center justify-center", className)}
      {...props}>
      <Card className="w-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Task Manager</CardTitle>
          <CardDescription>Login with your Email and Password</CardDescription>
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
                  <Button type="submit" className="cursor-pointer">
                    Login
                  </Button>
                </Field>
              </FieldGroup>
            </form>
          </Form>
        </CardContent>
        <FieldDescription className="text-center">
          You don't have an account Go to the{" "}
          <b onClick={() => router.push("/signup")} className="cursor-pointer">
            Signup
          </b>{" "}
          form
        </FieldDescription>
      </Card>
    </div>
  );
}
