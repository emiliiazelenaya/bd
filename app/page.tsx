"use client"

import TaskBoard from "@/components/task-board"

export default function Page() {
  return (
    <main className="min-h-screen px-4 py-8 md:px-8 md:py-12">
      <div className="mx-auto max-w-6xl">
        <section className="mb-8 overflow-hidden rounded-[2rem] border border-white/60 bg-white/70 p-8 shadow-[0_30px_80px_rgba(15,23,42,0.08)] backdrop-blur md:p-10">
          <div className="max-w-3xl space-y-4">
            <span className="inline-flex rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-sm font-medium text-violet-700">
              Персональный планировщик
            </span>
            <h1 className="text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl">
              Список задач 
            </h1>
            <p className="text-base leading-7 text-slate-600 md:text-lg">
              Планируйте день, держите фокус на важном и быстро управляйте всеми задачами в одном аккуратном интерфейсе.
            </p>
          </div>
        </section>
        <TaskBoard />
      </div>
    </main>
  )
}