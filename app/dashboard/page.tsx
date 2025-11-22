'use client'

import { SectionCards } from "@/components/section-cards";
import ProjectsStatusCard from "./_components/ProjectsStatusCard";
import TodayWorkSuggestionBox from "./_components/TodayWorkSuggestionBox";

export default function Page() {
  return (
    <>
      <div>
        <SectionCards />
      </div>
      <div className="py-5 w-full">
        <TodayWorkSuggestionBox />
      </div>
      <div className="p-6">
        <ProjectsStatusCard />
      </div>

    </>
  )
}
