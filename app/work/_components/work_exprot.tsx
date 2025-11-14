'use client'
import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { workExportValidationSchema } from "../schema/workSchema";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useAppDispatch, useAppSelector } from "@/app/hooks/reduxHooks";
import { CustomDatePicker } from "@/components/CustomDatePicker";
import { useEffect } from "react";
import { fetchProjectsThunk } from "@/app/features/projectSlices";
import { IWorkFilter } from "@/app/types/workTypes";
import { fetchWorkThunk } from "@/app/features/workSlices";

type TProps = {
    open: boolean;
    setOpen: (open: boolean) => void,
    mode?: "Export" | "Filter";
}


const WorkExport = ({ open, setOpen, mode }: TProps) => {

    const { projects: projectList } = useAppSelector((state) => state.projects);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchProjectsThunk({}));
    }, [dispatch]);

    const projectExtractFunction = () =>
        projectList?.map((item) => ({
            label: item.title,
            value: item.id,
        }));

    const form = useForm({
        resolver: zodResolver(workExportValidationSchema)
    })


    const download = (values: IWorkFilter) => {

        const fields = [
            "title",
            "state",
            "startDate",
            "endDate",
            "project.title",
            "user.name"
        ];

        const params = new URLSearchParams({
            fields: fields.join(",")
        });

        if (values.state) params.append("status", values.state);
        if (values.projectId) params.append("project", values.projectId);
        if (values.startDate) params.append("startDate", String(values.startDate));
        if (values.endDate) params.append("endDate", String(values.endDate));

        const url = `/api/work/export?${params.toString()}`;
        window.location.href = url;
    };

    const handleFilter = (values: IWorkFilter) => {
        dispatch(fetchWorkThunk(values))
    }

    const handleReset = () => {
        form.reset()
        setOpen(false)
    }



    return (
        <Drawer open={open} onOpenChange={setOpen} direction="right"  >
            <DrawerContent className="h-full">
                <DrawerHeader>
                    <DrawerTitle>{mode === "Export" ? "Export" : "Filter"}:</DrawerTitle>
                    <DrawerDescription>Apply the filter to sort the data.</DrawerDescription>
                </DrawerHeader>
                <Form {...form}>
                    <form className="px-3 flex items-center justify-between flex-col w-full h-full" onSubmit={form.handleSubmit(mode === "Export" ? download : handleFilter)}>
                        <div className="space-y-5 w-full">
                            {/* PROJECT */}
                            <FormField
                                control={form.control}
                                name="projectId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Select Project:</FormLabel>
                                        <FormControl>
                                            <Select onValueChange={field.onChange} {...field}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select a project" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        {projectExtractFunction() &&
                                                            projectExtractFunction()?.map((item, idx) => (
                                                                <SelectItem value={item?.value || ""} key={idx}>
                                                                    {item.label}
                                                                </SelectItem>
                                                            ))}
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/* STATE */}
                            <FormField
                                control={form.control}
                                name="state"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Select Status:</FormLabel>
                                        <FormControl className="w-full">
                                            <Select onValueChange={field.onChange} {...field}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select a status" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectItem value="Pending">Pending</SelectItem>
                                                        <SelectItem value="Completed">Completed</SelectItem>
                                                        <SelectItem value="Progress">Progress</SelectItem>
                                                        <SelectItem value="Planning">Planning</SelectItem>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/* START DATE */}
                            <div className=" space-y-3">
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

                            {/* END DATE */}
                            <div className=" space-y-3">
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
                        </div>
                        <div className="w-full space-y-3">
                            <Button type="submit" className="w-full cursor-pointer" variant={'default'}>
                                {
                                    mode === "Export" ? "Export" : "Filter"
                                }
                            </Button>
                            <Button type="reset" className="w-full cursor-pointer" variant="outline" onClick={handleReset}>Cancel</Button>
                            <Button type="reset" className="w-full cursor-pointer" variant="secondary" onClick={() => form.reset()}>Reset</Button>

                        </div>
                    </form>
                </Form>
            </DrawerContent>
        </Drawer>
    )
}

export default WorkExport
