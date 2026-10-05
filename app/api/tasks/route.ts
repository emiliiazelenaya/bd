import { db } from "@/db"
import { tasks } from "@/db/schema"
import { eq, desc } from "drizzle-orm"

export async function GET() {

  const data = await db
    .select()
    .from(tasks)
    .orderBy(desc(tasks.createdAt))

  return Response.json(data)
}

export async function POST(req: Request) {

  const { title, description, dueDate, priority } = await req.json()

  await db.insert(tasks).values({
    title,
    description,
    dueDate,
    priority,
    createdAt: new Date().toISOString()
  })

  return Response.json({ success: true })
}

export async function PUT(req: Request) {

  const { id, title, description, dueDate, priority, completed } = await req.json()

  await db
    .update(tasks)
    .set({
      title,
      description,
      dueDate,
      priority,
      completed
    })
    .where(eq(tasks.id, id))

  return Response.json({ success: true })
}

export async function DELETE(req: Request) {

  const { id } = await req.json()

  await db
    .delete(tasks)
    .where(eq(tasks.id, id))

  return Response.json({ success: true })
}