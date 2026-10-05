"use client"

import { useState } from "react"
import AddTaskForm from "./add-task-form"
import TaskList from "./task-list"

export default function TaskBoard() {
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("all")

  const filters = [
    { id: "all", label: "Все задачи" },
    { id: "today", label: "На сегодня" },
    { id: "upcoming", label: "Предстоящие" },
    { id: "completed", label: "Готово" },
  ]

  return (
    <div className="grid gap-6 xl:grid-cols-[360px_minmax(0,1fr)]">
      <div className="space-y-6">
        <AddTaskForm />

        <section className="card space-y-4">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold text-slate-900">Быстрый поиск</h2>
            <p className="text-sm text-slate-500">Найдите нужную задачу или переключитесь между категориями.</p>
          </div>

          <input
            placeholder="Поиск по названию..."
            className="input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="flex flex-wrap gap-2">
            {filters.map((item) => (
              <button
                key={item.id}
                onClick={() => setFilter(item.id)}
                className={`button ${filter === item.id ? "button-primary" : "button-secondary"}`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </section>
      </div>

      <TaskList search={search} filter={filter} />
    </div>
  )
}