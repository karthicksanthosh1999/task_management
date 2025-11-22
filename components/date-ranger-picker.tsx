"use client";

import * as React from "react";
import { DateRange } from "react-day-picker";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

type TProps = {
    initialDateFrom?: Date;
    initialDateTo?: Date;
    onUpdate?: (range: DateRange | undefined) => void;
};

export function DateRangePicker({
    initialDateFrom,
    initialDateTo,
    onUpdate,
}: TProps) {
    const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
        from: initialDateFrom,
        to: initialDateTo,
    });

    const handleSelect = (range: DateRange | undefined) => {
        setDateRange(range);

        if (onUpdate) onUpdate(range); // 🔥 send to parent
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline">
                    {dateRange?.from && dateRange?.to
                        ? `${dateRange.from.toDateString()} - ${dateRange.to.toDateString()}`
                        : "Pick a Date Range"}
                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-80">
                <Calendar
                    mode="range"
                    defaultMonth={dateRange?.from}
                    selected={dateRange}
                    onSelect={handleSelect}
                    numberOfMonths={2}
                    className="rounded-lg border shadow-sm"
                />
            </PopoverContent>
        </Popover>
    );
}
