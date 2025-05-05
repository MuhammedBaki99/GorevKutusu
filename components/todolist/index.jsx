"use client";

import { useState } from "react";
import RightArrow from "../svgfiles/svgs";
import TodoItem from "../todoItem/todoitem";
import "./todolist.css";
import TodoDelete from "../tododelete/tododelete";
import Cookies from "js-cookie";

export default function TodoList({ todoList, setTodoList }) {
  const [todoShow, setTodoShow] = useState(null);

  const handleDelete = (id) => {
    const updatedTodoList = todoList.filter((todo) => todo.id !== id);
    setTodoList(updatedTodoList);

    Cookies.set("todoList", JSON.stringify(updatedTodoList));
  };

  return (
    <div className="TodoCont">
      <div className="todoList">
        <h1>Görevlerim</h1>
        {todoList.length > 0 ? (
          todoList.map((x, i) => (
            <div className="todoItem" key={i} onClick={() => setTodoShow(x.id)}>
              <h3 className="todoHead">{x?.title}</h3>
              <div className="tasksBtn">
                <TodoDelete id={x?.id} handleDelete={handleDelete} />
                <RightArrow />
              </div>
            </div>
          ))
        ) : (
          <p>Görev bulunamadı</p>
        )}
      </div>
      <TodoItem
        todoShow={todoShow}
        setTodoShow={setTodoShow}
        todoList={todoList}
      />
    </div>
  );
}
