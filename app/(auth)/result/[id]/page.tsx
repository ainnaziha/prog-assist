"use client"
import { ResultTabs } from "@/components/pages/result-component"
import { useSearchParams } from 'next/navigation'

export default function Dashboard() {
  const searchParams = useSearchParams()
 
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