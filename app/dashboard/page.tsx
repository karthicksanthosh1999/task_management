'use client'

import { SectionCards } from "@/components/section-cards";
import ProjectsStatusCard from "./_components/ProjectsStatusCard";
import TodayWorkSuggestionBox from "./_components/TodayWorkSuggestionBox";

export default function Page() {
  return (
    <>
      <div className="p-2">
        <SectionCards />
      </div>
      <div className="p-2">
        <TodayWorkSuggestionBox />
      </div>
      <div className="p-2">
        <ProjectsStatusCard />
      </div>

    </>
  )
}
