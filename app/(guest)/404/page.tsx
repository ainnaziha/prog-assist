export default function ErrorPage() {
    return (
      <div className="flex flex-col justify-center items-center flex-grow">
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-semibold">404</h1>
          <div className="mx-2 inline-block h-[80px] w-0.5 self-stretch bg-neutral-100 opacity-50 dark:opacity-50"></div>
          <p>This category could not be found.</p>
        </div>
      </div>
    )
}  