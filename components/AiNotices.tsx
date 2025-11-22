import { BadgeCheckIcon, ChevronRightIcon, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Item,
    ItemActions,
    ItemContent,
    ItemDescription,
    ItemMedia,
    ItemTitle,
} from "@/components/ui/item"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Skeleton } from "./ui/skeleton"


type TProps = {
    suggestions: string | null,
    loading: boolean
}

export function AINotices({ suggestions, loading }: TProps) {
    return (
        <Item variant="outline">
            <ItemMedia>
                <Avatar className="size-10">
                    <AvatarImage src="/ai.png" />
                    <AvatarFallback>JK</AvatarFallback>
                </Avatar>
            </ItemMedia>
            <ItemContent>
                <ItemTitle>JK-AI</ItemTitle>
                {
                    loading ? (<Skeleton className="h-10 w-full" />) : (
                        <ItemDescription>{suggestions}</ItemDescription>
                    )
                }
            </ItemContent>
        </Item>
    )
}
