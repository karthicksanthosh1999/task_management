import { Skeleton } from "@/components/ui/skeleton";
import React, { ReactNode } from "react";

interface SkeletonWrapperProps {
    children: ReactNode;
    isLoading: boolean;
    height?: string;
    width?: string;
}

const SkeletonWrapper = ({ children, isLoading, height = "20px", width = "100%" }: SkeletonWrapperProps) => {
    if (isLoading) {
        return <Skeleton className={`h-[${height}] w-[${width}]`} />;
    }

    return <>{children}</>;
};

export default SkeletonWrapper;
