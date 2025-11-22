import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer"
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { projectFilterValidationSchema, TProjectFilterValidation } from "../schema/projectSchema";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CustomDatePicker } from "@/components/CustomDatePicker";
import { useAppDispatch } from "@/app/hooks/reduxHooks";
import { fetchProjectsThunk } from "@/app/features/projectSlices";
import { useCallback } from "react";
import { TProjectFilter } from "@/app/types/projectTypes";


interface IProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    setFilteredInput: (projectFilter: TProjectFilter) => void

}

const ProjectFilterForm = ({ open, setOpen }: IProps) => {

    // REDUX SECTION
    const dispatch = useAppDispatch();

    const form = useForm({
        resolver: zodResolver(projectFilterValidationSchema),
    });

    const handleOnSubmit = useCallback(async (values: TProjectFilterValidation) => {
        setFilteredInput({ ...values, state: values?.state ?? null })
    }, []);

    const handleReset = () => {
        setOpen(false);
    };
    const handleCloseAndReset = () => {
        form.reset()
        setOpen(false);

    };

    return (
        <Drawer open={open} onOpenChange={setOpen} direction="top">
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Advance Project Filter</DrawerTitle>
                    <DrawerDescription>Here filter the date through the given input</DrawerDescription>
                </DrawerHeader>
                <div>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(handleOnSubmit)}
                            className="space-y-3">
                            <div className="flex items-center justify-center flex-wrap gap-5 p-3">
                                <div className="md:w-sm w-full space-y-3">
                                    <FormLabel>Select State</FormLabel>
                                    <FormField
                                        name="state"
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
                                                            {["Pending", "Completed", "Planning", "Progress"].map(
                                                                (item, idx) => (
                                                                    <SelectItem value={item} key={idx}>
                                                                        {item}
                                                                    </SelectItem>
                                                                )
                                                            )}
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="md:w-sm w-full space-y-3">
                                    <FormLabel>Start Date</FormLabel>
                                    <FormField
                                        name="startDate"
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem>
                                                <CustomDatePicker
                                                    value={field.value as Date}
                                                    onChange={field.onChange}
                                                />
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="md:w-sm w-full space-y-3">
                                    <FormLabel>End Date</FormLabel>
                                    <FormField
                                        name="endDate"
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem>
                                                <CustomDatePicker
                                                    value={field.value as Date}
                                                    onChange={field.onChange}
                                                />
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="w-full items-center justify-center flex gap-3">
                                    <Button type="submit" className=" cursor-pointer" variant={'default'}>Apply</Button>
                                    <Button type="reset" className=" cursor-pointer" variant={'destructive'} onClick={() => form.reset()}>Reset</Button>
                                </div>
                                <div>
                                    <Button type="reset" variant={'destructive'} className=" w-auto sm:w-full cursor-pointer" onClick={handleCloseAndReset}>Close</Button>
                                </div>
                            </div>
                        </form>
                    </Form>
                </div>
            </DrawerContent>
        </Drawer >
    )
}

export default ProjectFilterForm
