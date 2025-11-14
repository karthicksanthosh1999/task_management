
import { SectionCards } from "@/components/section-cards";
import ProjectsStatusCard from "./_components/ProjectsStatusCard";

export default function Page() {
  return (
    <>
      <div>
        <SectionCards />
      </div>
      <div className="p-6">
        <ProjectsStatusCard />
      </div>

    </>
  )
}
