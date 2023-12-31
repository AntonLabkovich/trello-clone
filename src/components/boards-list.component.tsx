'use client'

import { Boards } from "@prisma/client"
import { BoardCard } from "./board-card.component"
import { useBoards } from "@/hooks/use-boards"
import { CreateBoard } from "./create-board.component"

interface IBoardsList {
    initialData: Boards[]
}

export const BoardsList = ({ initialData }: IBoardsList) => {
    const {data: boards} = useBoards({ initialData })

    return (<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {boards.map((board) => (
            <BoardCard key={board.id} id={board.id} title={board.title} />
        ))}
        <CreateBoard/>

    </div>)
}