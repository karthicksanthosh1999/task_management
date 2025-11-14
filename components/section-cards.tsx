'use client'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useEffect, useState } from "react"
import axios from "axios"
import Image from "next/image";

export function SectionCards() {

  const [totalCount, setTotalCount] = useState<{ Total: number, Completed: number, Pending: number, Planning: number, Progress: number }>();

  useEffect(() => {
    axios.get(`/api/work/task-counts`)
      .then((res) => setTotalCount(res.data?.data))
      .catch((err) => console.log(err))
  }, [])

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid  lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card ">
        <CardHeader>
          <CardTitle className="">
            Tasks Count
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-between text-5xl font-semibold">
          <div>
            {totalCount?.Total}
          </div>
          <Image src='/total.png' width={80} height={50} alt="total" />
        </CardContent>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardTitle className="">
            Pending Task Count
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-between text-5xl font-semibold">
          <div>
            {totalCount?.Pending}
          </div>
          <Image src='/pending.png' width={70} height={50} alt="pending" />
        </CardContent>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardTitle className="">
            Completed Task Count
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-between text-5xl font-semibold">
          <div>
            {totalCount?.Completed}
          </div>
          <Image src='/completed.png' width={80} height={50} alt="pending" />
        </CardContent>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardTitle className="">
            Progress Tasks Count
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-between text-5xl font-semibold">
          <div>
            {totalCount?.Progress}
          </div>
          <Image src='/progress.png' width={80} height={50} alt="pending" />
        </CardContent>
      </Card>
    </div>
  )
}
