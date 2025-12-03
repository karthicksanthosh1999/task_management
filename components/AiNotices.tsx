import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Skeleton } from "./ui/skeleton"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Separator } from "./ui/separator"


type TProps = {
    suggestions: string | null,
    loading: boolean
}

export function AINotices({ suggestions, loading }: TProps) {
    return (
        <Card className="@container/card">
            <CardContent>
                <CardHeader className="flex items-center justify-start">
                    <Avatar className="size-10">
                        <AvatarImage src="/ai.png" />
                        <AvatarFallback>JK</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                        <CardTitle>AI-Suggestion</CardTitle>
                        <CardDescription>Your daily work suggestion</CardDescription>
                    </div>
                </CardHeader>
                <Separator className="my-2" />
                <div>
                    {
                        loading ? (<Skeleton className="h-10 w-full" />) : (
                            <h1 className="opacity-70">{suggestions}</h1>
                        )
                    }
                </div>
            </CardContent>
        </Card>
    )
}
