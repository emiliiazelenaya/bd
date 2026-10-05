"use client"

import { useEffect, useState } from "react"
import TaskItem from "./task-item"

type Task = {
  id: number
  title: string
  description: string | null
  dueDate: string | null
  priority: "low" | "medium" | "high"
  completed: boolean
}

type TaskListProps = {
  search: string
  filter: string
}

export default function TaskList({ search, filter }: TaskListProps) {
  const [tasks, setTasks] = useState<Task[]>([])

  async function load() {
    try {
      const res = await fetch("/api/tasks")
      if (!res.ok) {
        console.error("Ошибка загрузки задач")
        return
      }
      const data = await res.json()
      setTasks(data)
    } catch (e) {
      console.error("Ошибка:", e)
    }
  }

  useEffect(() => {
    const run = async () => {
      await load()
    }

    void run()
  }, [])

  const refresh = () => load()
  const filtered = tasks
    .filter((t) => t.title.toLowerCase().includes(search.toLowerCase()))
    .filter((t) => {
      if (filter === "completed") return t.completed
      if (filter === "today") return t.dueDate && new Date(t.dueDate).toDateString() === new Date().toDateString()
      if (filter === "upcoming") return t.dueDate && new Date(t.dueDate) > new Date()
      return true
    })

  const stats = [
    { label: "Всего", value: tasks.length },
    { label: "В работе", value: tasks.filter((task) => !task.completed).length },
    { label: "Выполнено", value: tasks.filter((task) => task.completed).length },
    { label: "Высокий приоритет", value: tasks.filter((task) => task.priority === "high" && !task.completed).length },
  ]

  return (
    <section className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <div key={item.label} className="card">
            <p className="text-sm text-slate-500">{item.label}</p>
            <p className="mt-2 text-3xl font-semibold text-slate-900">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="card space-y-4">
        <div className="flex flex-col gap-2 border-b border-slate-200/70 pb-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Мои задачи</h2>
            <p className="text-sm text-slate-500">Список обновляется после добавления, редактирования и завершения задач.</p>
          </div>
          <span className="inline-flex w-fit rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
            Найдено: {filtered.length}
          </span>
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-[1.25rem] border border-dashed border-slate-300 bg-slate-50/70 px-6 py-10 text-center">
            <p className="text-lg font-medium text-slate-700">Задачи не найдены</p>
            <p className="mt-2 text-sm text-slate-500">Попробуйте изменить фильтр или добавьте новую задачу слева.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((task) => (
              <TaskItem key={task.id} task={task} refresh={refresh} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}