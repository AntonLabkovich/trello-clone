import { BoardCard } from "./components/board-card.component";

export default function Home() {
  
  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">

        <BoardCard id={'1'} title={'task'}/>
        <BoardCard id={'1'} title={'task1'}/>
        <BoardCard id={'1'} title={'task2'}/>

        
      </div>
    </div>

  )
}
