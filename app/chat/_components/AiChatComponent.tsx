'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { ArrowUpIcon } from 'lucide-react';

const AiChatComponent = () => {
    return (
        <Card className='w-full'>
            <CardContent>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>Am JK-AI</CardTitle>
                            <CardDescription>Your personal AI Assistants</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <Separator />
                <CardFooter>
                    <div className="relative mt-3 w-full">
                        <Textarea placeholder='What you thinking...' className="h-[50px] w-full pr-12 resize-none" />
                        <Button
                            variant="destructive"
                            size="icon"
                            className="absolute right-2 bottom-2 cursor-pointer">
                            <ArrowUpIcon />
                        </Button>
                    </div>
                </CardFooter>
            </CardContent>
        </Card >
    )
}

export default AiChatComponent
