'use client';

import { Card, CardContent } from '@/components/ui/card'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Table, TableBody, TableCell, TableHead, TableRow } from '@/components/ui/table'
import axios from 'axios';
import { useEffect, useState } from 'react';

type TProps = {
    open: boolean,
    setOpen: (open: boolean) => void;
    userId: string
}

type TCountOutput = {
    project: string;
    progress: number;
    planning: number;
    completed: number;
    pending: number;
}


const UserActivityModel = ({ open, setOpen, userId }: TProps) => {
    console.log(userId)
    const [count, setCount] = useState<TCountOutput[] | null>();

    useEffect(() => {
        axios.get(`/api/work/user-activity-status?userId=${userId}`)
            .then((res) => setCount(res?.data?.data))
            .catch(err => console.log(err))
    }, [userId])

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>User Activity</DialogTitle>
                    <DialogDescription>Here you can see the user activity and it's status count</DialogDescription>
                </DialogHeader>
                <div>
                    <Card className="h-[450px]">
                        <CardContent>
                            <Table>
                                <TableRow>
                                    <TableHead>Project Title</TableHead>
                                    <TableHead>Completed</TableHead>
                                    <TableHead>Progress</TableHead>
                                    <TableHead>Planned</TableHead>
                                    <TableHead>Pending</TableHead>
                                </TableRow>
                                <TableBody>
                                    {
                                        count && count?.map((item) => (
                                            <TableRow>
                                                <TableCell>{item.project}</TableCell>
                                                <TableCell>{item.completed}</TableCell>
                                                <TableCell>{item.progress}</TableCell>
                                                <TableCell>{item.planning}</TableCell>
                                                <TableCell>{item.pending}</TableCell>
                                            </TableRow>
                                        ))
                                    }
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
                <DialogFooter>
                    <DialogClose>Close</DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default UserActivityModel
