"use client"

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"

const priorityStyles = {
  low: {
    dot: "bg-emerald-400",
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
    label: "Низкий",
  },
  medium: {
    dot: "bg-amber-400",
    badge: "bg-amber-50 text-amber-700 border-amber-200",
    label: "Средний",
  },
  high: {
    dot: "bg-rose-500",
    badge: "bg-rose-50 text-rose-700 border-rose-200",
    label: "Высокий",
  },
} as const

type Task = {
  id: number
  title: string
  description: string | null
  dueDate: string | null
  priority: keyof typeof priorityStyles
  completed: boolean
}

type TaskItemProps = {
  task: Task
  refresh: () => void
}

export default function TaskItem({ task, refresh }: TaskItemProps) {
  const [completed, setCompleted] = useState(task.completed)
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(task.title)
  const [description, setDescription] = useState(task.description ?? "")
  const [dueDate, setDueDate] = useState(task.dueDate)
  const [priority, setPriority] = useState(task.priority)

  async function toggleCompleted() {
    const newStatus = !completed
    setCompleted(newStatus)
    await fetch("/api/tasks", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: task.id, title, description, dueDate, priority, completed: newStatus })
    })
    refresh()
  }

  async function deleteTask() {
    await fetch("/api/tasks", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: task.id })
    })
    refresh()
  }

  async function saveEdit() {
    await fetch("/api/tasks", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: task.id, title, description, dueDate, priority, completed })
    })
    setIsEditing(false)
    refresh()
  }

  const priorityMeta = priorityStyles[priority]

  return (
    <div className="card flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
      <div className="flex gap-3 items-start">
        <Checkbox checked={completed} onCheckedChange={toggleCompleted} />
        {isEditing ? (
          <div className="flex w-full flex-col gap-2">
            <input className="input" value={title} onChange={(e) => setTitle(e.target.value)} />
            <textarea className="input" value={description} onChange={(e) => setDescription(e.target.value)} />
            <input
              type="datetime-local"
              className="input"
              value={dueDate ? new Date(dueDate).toISOString().slice(0, 16) : ""}
              onChange={(e) => setDueDate(e.target.value)}
            />
            <select className="input" value={priority} onChange={(e) => setPriority(e.target.value)}>
              <option value="low">Низкий</option>
              <option value="medium">Средний</option>
              <option value="high">Высокий</option>
            </select>
            <div className="mt-2 flex flex-wrap gap-2">
              <button onClick={saveEdit} className="button button-primary text-sm">Сохранить</button>
              <button onClick={() => setIsEditing(false)} className="button button-secondary text-sm">Отмена</button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <div className={`h-3 w-3 rounded-full ${priorityMeta.dot}`} />
              <h3 className={`text-lg font-semibold ${completed ? "text-slate-400 line-through" : "text-slate-900"}`}>{title}</h3>
              <span className={`rounded-full border px-2.5 py-1 text-xs font-medium ${priorityMeta.badge}`}>
                {priorityMeta.label}
              </span>
              {completed && (
                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                  Выполнено
                </span>
              )}
            </div>
            <p className={`${completed ? "line-through text-slate-400" : "text-slate-600"} text-sm leading-6`}>
              {description || "Без описания"}
            </p>
            {dueDate && (
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                Срок: {new Date(dueDate).toLocaleString("ru-RU")}
              </p>
            )}
          </div>
        )}
      </div>
      {!isEditing && (
        <div className="flex flex-wrap gap-2 lg:justify-end">
          <button onClick={() => setIsEditing(true)} className="button button-secondary text-sm">Редактировать</button>
          <button onClick={deleteTask} className="button button-danger text-sm">Удалить</button>
        </div>
      )}
    </div>
  )
}