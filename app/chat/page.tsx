'use client'
import { useEffect, useState } from 'react'
import { useAppSelector } from '../hooks/reduxHooks'
import ChatComponent from './_components/ChatComponent'
import OnlineUsers from './_components/OnlineUsers'
import { IUser } from '../types/userTypes'
import { socket } from "@/lib/server";


const page = () => {

    const { user } = useAppSelector(state => state.auth)

    const [onlineUsers, setOnlineUsers] = useState<IUser[]>([]);
    const [selectedOnlineUser, setSelectedOnlineUser] = useState<IUser | null>(null)

    useEffect(() => {
        socket.on("online-users", (users: IUser[]) => {
            setOnlineUsers(users.filter((item) => item.id !== user?.id))
        })

        return () => {
            socket.off("online-users")
        }

    }, [])

    console.log({ selectedOnlineUser })
    return (
        <div className='flex gap-3'>
            <OnlineUsers onlineUsers={onlineUsers} selectedOnlineUser={selectedOnlineUser} setSelectedOnlineUser={setSelectedOnlineUser} />

            <ChatComponent selectedUser={selectedOnlineUser} />

        </div>
    )
}

export default page
