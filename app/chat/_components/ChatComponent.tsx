'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { ArrowUpIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react';
import { socket } from '@/lib/server'
import { useAppSelector } from '@/app/hooks/reduxHooks'
import { IUser } from '@/app/types/userTypes'
import { IconNote } from '@tabler/icons-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { redirect } from 'next/navigation'

type IProps = {
    selectedUser?: IUser
}

const ChatComponent = ({ selectedUser }: IProps) => {

    const { user } = useAppSelector(state => state.auth)

    interface IMessage {
        text: string;
        senderId: string;
        receiverId: string;
        createdAt: Date;
        role: "User" | "AI"
    }

    const [messages, setMessages] = useState<IMessage[]>([]);
    const [text, setText] = useState("");

    const chatContainerRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom when messages update
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    const sendMessage = () => {
        const msg: IMessage = {
            createdAt: new Date(),
            senderId: user?.id as string,
            receiverId: selectedUser?.id as string,
            text,
            role: "User"
        }

        socket.emit("send-message", msg)
        setText("")
    };
    return (
        <Card className='w-full'>
            <CardContent>
                <CardHeader>
                    <CardTitle>Hi am JK-Bot</CardTitle>
                </CardHeader>
                <Separator />
                <div
                    ref={chatContainerRef}
                    className="h-[700px] overflow-y-auto p-3 m-3 space-y-3 border rounded-md bg-secondary"
                >
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`p-2 my-1 rounded ${msg.senderId === user?.id
                                ? "bg-primary text-black rounded-lg ml-auto max-w-xs"
                                : "bg-accent max-w-xs rounded-lg"
                                }`}
                        >
                            {msg.text}
                        </div>
                    ))}
                </div>

                <CardFooter>
                    <div className="relative mt-3 w-full">
                        <Textarea placeholder='What you thinking...'
                            className="h-[50px] w-full pr-12 resize-none"
                            value={text}
                            onChange={(e) => setText(e.target.value)} />
                        <Button
                            variant="destructive"
                            size="icon"
                            disabled={text.length === 0 ? true : false}
                            className="absolute right-2 bottom-2 cursor-pointer"
                            onClick={sendMessage}
                        >
                            <ArrowUpIcon />
                        </Button>
                    </div>
                </CardFooter>
            </CardContent>
        </Card >
    )
}

export default ChatComponent
