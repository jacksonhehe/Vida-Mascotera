export function ShellSkeleton() {
  return (
    <div aria-hidden="true" className="grid gap-6">
      <section className="overflow-hidden rounded-[2.5rem] bg-white p-8 shadow-soft md:p-10">
        <div className="h-3 w-32 rounded-full bg-slate-200" />
        <div className="mt-6 h-12 max-w-2xl rounded-2xl bg-slate-200" />
        <div className="mt-4 h-6 max-w-3xl rounded-2xl bg-slate-100" />
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div className="h-32 rounded-[1.5rem] bg-slate-100" key={index} />
          ))}
        </div>
      </section>
      <div className="grid gap-6 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div className="overflow-hidden rounded-[1.75rem] bg-white shadow-soft" key={index}>
            <div className="h-56 bg-slate-200" />
            <div className="space-y-4 p-6">
              <div className="h-4 w-24 rounded-full bg-slate-100" />
              <div className="h-7 rounded-2xl bg-slate-200" />
              <div className="h-20 rounded-2xl bg-slate-100" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
