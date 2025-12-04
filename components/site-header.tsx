import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { ModeToggle } from "./theme-toggle"
import UserProfile from "./user-profile"
import { usePathname } from "next/navigation"
import AiStatusButton from "./ai-status"

export function SiteHeader() {

  const pathName = usePathname()

  return (
    <header className="bg-card flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">{pathName.slice(1).toUpperCase() ?? "Unknown"}</h1>
        <div className="ml-auto flex items-center gap-2">
          <AiStatusButton />
          <ModeToggle />
          <UserProfile />
        </div>
      </div>
    </header>
  )
}
