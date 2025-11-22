import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {
    Item,
    ItemContent,
    ItemDescription,
    ItemMedia,
    ItemTitle,
} from "@/components/ui/item";
import { IUser } from "@/app/types/userTypes";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";


type TProps = {
    onlineUsers: IUser[],
    selectedOnlineUser: IUser | null,
    setSelectedOnlineUser: (user: IUser) => void
}


const OnlineUsers = ({ onlineUsers, selectedOnlineUser, setSelectedOnlineUser }: TProps) => {
    return (
        <Card className="flex w-full max-w-lg flex-col gap-6">
            <CardContent>
                <CardHeader>
                    <CardTitle>Contact List</CardTitle>
                    <CardDescription>Online Users only listed here</CardDescription>
                </CardHeader>
                <div className="space-y-3 h-full">

                    <Item variant="outline" className={"cursor-pointer"}>
                        <ItemMedia>
                            <Avatar className="size-10">
                                <AvatarImage src="https://github.com/evilrabbit.png" />
                                <AvatarFallback>JK</AvatarFallback>
                            </Avatar>
                        </ItemMedia>
                        <ItemContent>
                            <ItemTitle>JK's AI</ItemTitle>
                            <ItemDescription>Am ai from JK-Tech</ItemDescription>
                        </ItemContent>
                    </Item>
                    {
                        onlineUsers && onlineUsers.map((item) => (
                            <Item variant="outline" className={cn(selectedOnlineUser?.id === item.id ? "cursor-pointer" : "cursor-pointer bg-secondary")}>
                                <ItemMedia>
                                    <Avatar className="size-10">
                                        <AvatarImage src="https://github.com/evilrabbit.png" />
                                        <AvatarFallback>JK</AvatarFallback>
                                    </Avatar>
                                </ItemMedia>
                                <ItemContent className={cn(selectedOnlineUser?.id === item.id ? "text-white" : "")} onClick={() => setSelectedOnlineUser(item)}>
                                    <ItemTitle>{item?.name}</ItemTitle>
                                    <ItemDescription>{item.email}</ItemDescription>
                                </ItemContent>
                            </Item>
                        ))
                    }
                </div>
            </CardContent>
        </Card >
    )
}

export default OnlineUsers
