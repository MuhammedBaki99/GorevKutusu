import { useContext } from "react"
import { TodoContext } from "../todoform/page"

export default function TodoList() {
  const { todoList } = useContext(TodoContext);
  console.log(todoList);

  return (
    <div className="todoListCont">
      {todoList.map((x, i) => (
        <div className="todoItem" key={i}>
          <div className="todoHead"></div>
          {x.todo}
        </div>
      ))}
    </div>
  )
}