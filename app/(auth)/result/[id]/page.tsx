import { ResultTabs } from "@/components/pages/result-component"

export const metadata = {
  title: "Assessment Result",
}

export default function Dashboard() { 
  return (
    <main>
      <section className="container flex-col gap-4 pb-12 pt-4 text-center lg:items-center lg:gap-8 lg:py-4 lg:px-40 ">
        <h3 className="text-lg font-light lg:text-2xl">
          Assessment Summary
        </h3>
      </section>
      <div className="flex justify-center items-center">
        <ResultTabs />
      </div>
    </main>
  )
}