import { prisma } from "@/core/prisma";
import { BoardCard } from "../components/board-card.component";
import { BoardsList } from "@/components/boards-list.components";

export default async function Home() {
  const boards = await prisma.boards.findMany();

  return (
    <div className="container mx-auto">
        <BoardsList initialData={boards}/>
    </div>

  )
}
