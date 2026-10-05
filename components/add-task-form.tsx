"use client"

import { useState } from "react"

export default function AddTaskForm() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [dueDate, setDueDate] = useState("")
  const [priority, setPriority] = useState("medium")

  async function addTask() {
    if(!title) return

    await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, dueDate, priority })
    })

    setTitle("")
    setDescription("")
    setDueDate("")
    setPriority("medium")
    location.reload()
  }

  return (
    <section className="card space-y-5">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold text-slate-900">Новая задача</h2>
        <p className="text-sm text-slate-500">Добавьте задачу, срок и приоритет, чтобы она сразу попала в общий список.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="md:col-span-2">
          <input
            placeholder="Например: Подготовить презентацию"
            className="input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="md:col-span-2">
          <textarea
            placeholder="Коротко опишите, что нужно сделать"
            className="input min-h-28 resize-none"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <input
          type="datetime-local"
          className="input"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        <select
          className="input"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="low">Низкий приоритет</option>
          <option value="medium">Средний приоритет</option>
          <option value="high">Высокий приоритет</option>
        </select>
      </div>

      <button onClick={addTask} className="button button-primary w-full md:w-auto">
        Добавить задачу
      </button>
    </section>
  )
}