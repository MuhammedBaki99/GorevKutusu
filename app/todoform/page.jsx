"use client"
import { createContext, useState } from "react"
import "./todoform.css"
import TodoList from "../todolist/page";

export const TodoContext = createContext(null);

export default function TodoForm() {
  const [show, setShow] = useState(false);
  const [todoList, setTodoList] = useState([]);
  const date = new Date();
  const formattedDateTime = date.toLocaleString("tr-TR", {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
  console.log(formattedDateTime);  // Örnek çıktı: 13 Ekim 2024 13:30:00


  function handleSubmit(e) {
    e.preventDefault();
    const formObj = Object.fromEntries(new FormData(e.target));
    setTodoList([...todoList, {
      id: (todoList.length + 1),
      todo: formObj.todo,
      isComplete: false,
      createdAt: formattedDateTime
    }]);
    e.target.reset();
    setShow(false);
  }

  console.log(todoList);

  return (
    <>
      <div className="formCont">
        <button onClick={() => setShow(true)}>Görev Ekle</button>
        <form onSubmit={handleSubmit} style={{
          opacity: `${show ? "1" : "0"}`,
          transition: "all .3s"
        }}>
          <input style={{
            width: `${show ? "243px" : "0px"}`,
            transition: "all .3s"
          }} type="text" name="title" placeholder="Görev Başlığı Yazınız..." />
          <input style={{
            width: `${show ? "350px" : "0px"}`,
            transition: "all .3s"
          }} type="text" name="description" placeholder="Görev Açıklaması Yazınız..." />
          <button>Kaydet</button>
          <button onClick={(e) => { e.preventDefault(); setShow(false) }}>Vazgeç</button>
        </form>
        <div className="bar"></div>
      </div >
      <TodoContext.Provider value={{ todoList }}>
        <TodoList />
      </TodoContext.Provider>
    </>
  )
}