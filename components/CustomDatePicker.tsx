"use client";

import * as React from "react";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { FormControl } from "@/components/ui/form";
import { cn } from "@/lib/utils"; // optional, for className merging

export function CustomDatePicker({
    value,
    onChange,
}: {
    value?: Date
    onChange: (date?: Date) => void
}) {
    const [open, setOpen] = React.useState(false);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <FormControl>
                    <Button
                        variant="outline"
                        className={cn(
                            "w-full justify-between font-normal",
                            !value && "text-muted-foreground"
                        )}
                    >
                        {value ? value?.toLocaleDateString() : "Select date"}
                        <ChevronDownIcon className="ml-2 h-4 w-4 opacity-50" />
                    </Button>
                </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    selected={value}
                    captionLayout="dropdown"
                    onSelect={(date: Date | undefined) => {
                        if (date) {
                            onChange(date)
                            setOpen(false)
                        }
                    }}
                    fromYear={1950}
                    toYear={2030}
                />

            </PopoverContent>
        </Popover>
    );
}
