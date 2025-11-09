import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Edit, Upload } from "lucide-react";
import React from "react";

const page = () => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>User Profile</CardTitle>
          <CardDescription>Your edit your profile here...</CardDescription>
        </CardHeader>
        <CardContent>
          <Separator />
          <div className="md:p-5 space-y-5">
            <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
              <div className="space-y-3">
                <Label>Your Full Name:</Label>
                <Input
                  placeholder="Enter your name here"
                  type="text"
                  disabled
                  value={"Joseph Karthick"}
                />
              </div>
              <div className="space-y-3">
                <Label>Your Email Address:</Label>
                <Input
                  placeholder="Enter your email here"
                  type="email"
                  disabled
                  value={"JK@JK.net"}
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
              <div className="space-y-3">
                <Label>Your Mobile Number:</Label>
                <Input
                  placeholder="Enter your mobile here"
                  type="tel"
                  disabled
                  value={"8220942384"}
                />
              </div>
              <div className="space-y-3">
                <Label>Your Company Name:</Label>
                <Input
                  placeholder="Enter your email here"
                  type="text"
                  disabled
                  value={"JK-Tech"}
                />
              </div>
            </div>
          </div>
        </CardContent>
        <Separator />
        <CardFooter>
          <CardAction className="space-x-2">
            <Button
              variant={"outline"}
              className="cursor-pointer"
              type="button">
              <Edit /> Edit
            </Button>
            <Button
              variant={"destructive"}
              className="cursor-pointer"
              type="button">
              <Upload /> Submit
            </Button>
          </CardAction>
        </CardFooter>
      </Card>
    </div>
  );
};

export default page;
