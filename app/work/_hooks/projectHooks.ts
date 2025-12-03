import { IProject, TProjectFilter } from "@/app/types/projectTypes";
import { useQuery } from "@tanstack/react-query"
import axios from "axios";

// FETCH PROJECTS
export const useFetchProjectHooks = ({ endDate, search, startDate, state, userId }: TProjectFilter) => {
    return useQuery<IProject[]>({
        queryKey: ['fetch_projects', endDate, search, startDate, state, userId],
        queryFn: async () => {
            const params = new URLSearchParams({
                search: search ?? "",
                state: String(state ?? ""),
                startDate: startDate ? startDate.toISOString() : "",
                endDate: endDate ? endDate.toISOString() : "",
            });
            const { data } = await axios.get(`/api/projects/filter?${params.toString()}`);
            return data?.data;
        }
    })
};
