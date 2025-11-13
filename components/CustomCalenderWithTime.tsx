"use client";

import * as React from "react";
import { ChevronDownIcon, Clock2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormControl } from "@/components/ui/form";
import { cn } from "@/lib/utils";

export function DateTimePicker({
    value,
    onChange,
}: {
    value?: { date?: Date; startTime?: string; endTime?: string };
    onChange: (data: { date?: Date; startTime?: string; endTime?: string }) => void;
}) {
    const [open, setOpen] = React.useState(false);

    const handleDateChange = (date?: Date) => {
        onChange({ ...value, date });
    };

    const handleTimeChange = (field: "startTime" | "endTime", time: string) => {
        onChange({ ...value, [field]: time });
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <FormControl>
                    <Button
                        variant="outline"
                        className={cn(
                            "w-full justify-between font-normal",
                            !value?.date && "text-muted-foreground"
                        )}
                    >
                        {value?.date
                            ? `${value.date.toLocaleDateString()} ${value.startTime ? `(${value.startTime} - ${value.endTime})` : ""
                            }`
                            : "Select date and time"}
                        <ChevronDownIcon className="ml-2 h-4 w-4 opacity-50" />
                    </Button>
                </FormControl>
            </PopoverTrigger>

            <PopoverContent className="w-auto p-0" align="start">
                <Card className="w-fit py-4">
                    <CardContent className="px-4">
                        <Calendar
                            mode="single"
                            selected={value?.date}
                            onSelect={(date) => {
                                handleDateChange(date);
                            }}
                            className="bg-transparent p-0"
                            fromYear={1950}
                            toYear={2030}
                            captionLayout="dropdown"
                        />
                    </CardContent>

                    <CardFooter className="flex flex-col gap-6 border-t px-4 !pt-4">
                        {/* Start Time */}
                        <div className="flex w-full flex-col gap-3">
                            <Label htmlFor="time-from">Start Time</Label>
                            <div className="relative flex w-full items-center gap-2">
                                <Clock2Icon className="text-muted-foreground pointer-events-none absolute left-2.5 size-4 select-none" />
                                <Input
                                    id="time-from"
                                    type="time"
                                    step="1"
                                    value={value?.startTime || ""}
                                    onChange={(e) => handleTimeChange("startTime", e.target.value)}
                                    className="appearance-none pl-8 [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                                />
                            </div>
                        </div>

                        {/* End Time */}
                        {/* <div className="flex w-full flex-col gap-3">
                            <Label htmlFor="time-to">End Time</Label>
                            <div className="relative flex w-full items-center gap-2">
                                <Clock2Icon className="text-muted-foreground pointer-events-none absolute left-2.5 size-4 select-none" />
                                <Input
                                    id="time-to"
                                    type="time"
                                    step="1"
                                    value={value?.endTime || ""}
                                    onChange={(e) => handleTimeChange("endTime", e.target.value)}
                                    className="appearance-none pl-8 [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                                />
                            </div>
                        </div> */}

                        {/* Done Button */}
                        <Button
                            className="mt-2"
                            onClick={() => setOpen(false)}
                            disabled={!value?.date}
                        >
                            Done
                        </Button>
                    </CardFooter>
                </Card>
            </PopoverContent>
        </Popover>
    );
}
