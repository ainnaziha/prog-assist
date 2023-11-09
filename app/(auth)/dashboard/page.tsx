import AssessmentMenu from "@/components/pages/assessment-menu"
import { History } from "@/components/pages/history"
import { UserDetail } from "@/components/user-detail"

export default function Dashboard() {
  return (
    <main>
      <section className="container flex-col gap-4 pb-12 pt-4 text-center lg:items-center lg:gap-8 lg:py-20 lg:px-40 ">
          <div className="grid gap-4 grid-cols-12">
            <div className="col-span-12 md:col-span-6">
              <UserDetail />
            </div>
            <div className="col-span-12 md:col-span-6">
              <AssessmentMenu />
            </div>
          </div>
      </section>
      <div className="container w-full mx-auto lg:px-40">
        <h3 className="text-lg font-light lg:text-2xl">
          Assessment History
        </h3>
        <History />
      </div>
    </main>
  )
}