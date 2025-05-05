import { Cancel } from "../svgfiles/svgs";
import "./todoItem.css"

export default function TodoItem({ todoShow, todoList, setTodoShow }) {
  console.log(todoList);

  let findedTodo = todoList?.find(x => x.id === todoShow);
  console.log(findedTodo);

  return (<>
    {findedTodo ? <div className="todoDetayItem">
      <div className="detayHead">
      <h1 className="todoTitle">{findedTodo?.title}</h1>
      <button onClick={() => setTodoShow(null)}> <Cancel />  </button>
      </div>
      <p className="todoDesc">Görev : {findedTodo?.description}</p>
      <div className="todoDetayBtn">
        <div className="detayGarbage">
          <p>Hedef Tarih: {findedTodo.targetdate}</p>
          <p>Oluşturulma Tarihi: {findedTodo.createdAt}</p>
        </div>
      </div>
    </div> : ""}
  </>
  )
}