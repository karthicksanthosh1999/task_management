
import { IWork, IWorkFilter } from "@/app/types/workTypes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { TWorkSchemaType } from "../schema/workSchema";

// FETCH WORKS
export const useFetchWorkHooks = ({
    endDate,
    projectId,
    startDate,
    state,
    title = "",
    role = "",
    userId = ""
}: IWorkFilter) => {
    return useQuery<IWork[]>({
        queryKey: ['fetch_works', endDate, title, role, startDate, projectId, userId],
        queryFn: async () => {
            const params = new URLSearchParams({
                title,
                projectId: projectId ? projectId : "",
                state: state ? state : "",
                role: role ? role : "",
                userId: userId ? userId : "",
                endDate: endDate ? endDate.toISOString() : "",
                startDate: startDate ? startDate.toISOString() : "",
            });
            const { data } = await axios.get(`/api/work/filter?${params.toString()}`);
            return data?.data;
        },
        staleTime: 1000 * 60 * 2,
    })
};

// CREATE THE WORK
export const useCreateWorkHook = () => {
    const queryClient = useQueryClient();
    return useMutation<IWork, AxiosError, TWorkSchemaType>({
        mutationFn: async (work: TWorkSchemaType) => {
            const { data } = await axios.post(`/api/work`, work)
            return data?.data ?? [];
        },
        onSuccess: () => {
            toast.success("Work Created Successfully", { id: 'createWork' })
            queryClient.invalidateQueries({ queryKey: ['fetch_works'] })
        },
        onError: () => {
            toast.error("Work Creation Failed", { id: 'createWork' })
        }
    })
}

// UPDATE THE STATUS OF THE WORK
export const useUpdateStatusOfTheWorkHook = () => {
    const queryClient = useQueryClient();
    return useMutation<IWork, AxiosError, { id: string, status: string }>({
        mutationFn: async ({ id, status }) => {
            const { data } = await axios.put(`/api/work/${id}`, { status });
            return data?.data ?? [];
        },
        onSuccess: () => {
            toast.success("Status Changed Successfully", { id: 'updateWork' })
            queryClient.invalidateQueries({ queryKey: ['fetch_works'] })
        },
        onError: () => {
            toast.error("Status Updated Failed", { id: 'updateWork' })
        }

    })
}

// DELETE WORK QUERY
export const useDeleteWorkHook = () => {
    const queryClient = useQueryClient()
    return useMutation<IWork, AxiosError, { id: string }>({
        mutationFn: async ({ id }) => {
            const { data } = await axios.delete(`/api/work?id=${id}`);
            return data.data;
        },
        onSuccess: () => {
            toast.success("Work Deleted Successfully", { id: 'deleteWork' })
            queryClient.invalidateQueries({ queryKey: ['fetch_works'] })
        },
        onError: () => {
            toast.error("Work Delete Failed", { id: 'deleteWork' })
        }
    })
}

// SINGLE WORK QUERY
export const useSingleWorkHook = () => {
    const queryClient = useQueryClient()
    return useMutation<IWork, AxiosError, { id: string }>({
        mutationFn: async ({ id }) => {
            const { data } = await axios.get(`/api/work?id=${id}`);
            return data.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['fetch_works'] })
        },
        onError: () => {
            toast.error("Work Delete Failed")
        }
    })
}

export const useUpdateWorkHook = () => {
    const queryClient = useQueryClient()
    return useMutation<IWork, AxiosError, { id: string, work: TWorkSchemaType }>({
        mutationFn: async ({ id, work }) => {
            const { data } = await axios.put(`/api/work?id=${id}`, work);
            return data?.data
        },
        onSuccess: () => {
            toast.success("Work Update Successfully", { id: 'updateWork' })
            queryClient.invalidateQueries({ queryKey: ['fetch_works'] })
        },
        onError: () => {
            toast.error("Work Delete Failed", { id: 'updateWork' })
        }
    })
}