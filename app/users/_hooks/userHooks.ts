import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { IUser } from "@/app/types/userTypes";

// ✅ FETCH USERS
export const useUserFilterUseQuery = (search: string, role: string) => {
    return useQuery<IUser[]>({
        queryKey: ['fetchUsers', search, role],
        queryFn: async () => {
            const { data } = await axios.get(`/api/users?search=${search}&role=${role}`);
            return data?.data;
        },
    });
};

// GET SINGLE USER
export const useSingleUserFetchHook = () => {
    const queryClient = useQueryClient();
    return useMutation<IUser, AxiosError, { id: string }>({
        mutationFn: async ({ id }) => {
            const { data } = await axios.get(`/api/users/${id}`);
            return data?.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['fetchUsers'], exact: false })
        },
        onError: () => {
            toast.error("User creations failed", {
                id: 'create_user'
            })
        }
    })
}

// ✅ ADD USER
export const useUserCreateHook = () => {
    const queryClient = useQueryClient();
    return useMutation<IUser, AxiosError, IUser>({
        mutationFn: async (user: IUser) => {
            const { data } = await axios.post(`/api/users`, user);
            return data?.data;
        },
        onSuccess: () => {
            toast.success('User Created Successfully', {
                id: 'create_user'
            })
            queryClient.invalidateQueries({ queryKey: ['fetchUsers'], exact: false })
        },
        onError: () => {
            toast.error("User creations failed", {
                id: 'create_user'
            })
        }
    })
}

// ✅ DELETE USER
export const useUserDeleteHook = () => {
    const queryClient = useQueryClient();
    return useMutation<IUser, AxiosError, { id: string }>({
        mutationFn: async ({ id }) => {
            const { data } = await axios.delete(`/api/users/?id=${id}`);
            return data?.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['fetchUsers'], exact: false })
            toast.success('User Deleted Successfully', { id: 'delete_user' })
        },
        onError: () => toast.error(`User Delete function error`, { id: 'delete_user' })
    })
}

// UPDATE USER
export const useUserUpdateHook = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (user: IUser) => {
            const { data } = await axios.put(`/api/users/?id=${user?.id}`, user);
            return data?.data;
        },
        onSuccess: () => {
            toast.success('User Updated Successfully', { id: 'update_user' })
            queryClient.invalidateQueries({ queryKey: ['fetchUsers'] })
        },
        onError: (error) => {
            toast.error("User updated failed", { id: 'update_user' })
            console.log(error)
        }
    })
}