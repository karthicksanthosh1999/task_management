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
    const [typingUser, setTypingUser] = useState<string | null>(null);
    const [onlineUsers, setOnlineUsers] = useState<IUser[]>([]);


    const chatContainerRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
        // JOINING EMIT
        socket.on("connected", () => {
            console.log("Connected", socket.id)
        })

        socket.emit("join", {
            id: user?.id,
            name: user?.name,
            avatar: user?.image,
            email: user?.email
        });

        socket.on("receive-message", (msg: IMessage) => {
            // Only push messages of the selected chat
            if (
                (msg.senderId === selectedUser?.id && msg.receiverId === user?.id) ||
                (msg.senderId === user?.id && msg.receiverId === selectedUser?.id)
            ) {
                setMessages(prev => [...prev, msg]);
            }
        })

        // TYPING 
        socket.on("typing", (data: IMessage) => {
            if (data.senderId === selectedUser?.id && selectedUser) {
                setTypingUser(selectedUser?.name);
            }
        })

        // ONLINE USER
        socket.on("online-users", (users: IUser[]) => {
            setOnlineUsers(users)
        })

        return () => {
            socket.off("receive-message");
            socket.off("typing");
            socket.off("online-users");
        };

    }, [])

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
        console.log(msg)
        setText("")
    };

    const handleTyping = () => {
        socket.emit("typing", {
            senderId: user?.id,
            receiverId: selectedUser?.id
        });
    };
    return (
        <Card className='w-full'>
            <CardContent>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>{selectedUser ? selectedUser?.name : "Select Persons"}</CardTitle>
                            <CardDescription>{selectedUser ? selectedUser?.name : "Chat with your's peoples"}</CardDescription>
                        </div>
                        {
                            selectedUser &&
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant={'outline'} size={'icon'} className='cursor-pointer'>
                                        <IconNote />
                                        <span className='sr-only'>User Details</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align='end'>
                                    <DropdownMenuItem className='cursor-pointer' onClick={() => redirect("/profile")}>
                                        Profile
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className='cursor-pointer' onClick={() => redirect("/settings")}>
                                        Settings
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        }
                    </div>
                </CardHeader>
                <Separator />
                <div
                    ref={chatContainerRef}
                    className="h-[700px] overflow-y-auto p-3 m-3 space-y-3 border rounded-md bg-secondary"
                >
                    {
                        !selectedUser &&
                        <div className='flex items-center justify-center h-full'>
                            {selectedUser ? "" : "Please select the user first..."}
                        </div>
                    }
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

                    {typingUser && (
                        <p className="text-gray-500 text-sm">{typingUser} typing...</p>
                    )}
                </div>

                <CardFooter>
                    <div className="relative mt-3 w-full">
                        <Textarea placeholder='What you thinking...'
                            className="h-[50px] w-full pr-12 resize-none"
                            value={text}
                            disabled={selectedUser ? false : true}
                            onChange={(e) => {
                                setText(e.target.value)
                                handleTyping();
                            }} />
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
