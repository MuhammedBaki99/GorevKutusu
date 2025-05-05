"use client";
import { useEffect, useRef, useState } from "react";
import "./todoform.css";
import TodoList from "../todolist";
import Cookies from "js-cookie";

export default function TodoForm() {
  const [show, setShow] = useState(false); 
  const formRef = useRef(null);
  const [todoList, setTodoList] = useState([]);
  const [formattedDateTime, setFormattedDateTime] = useState("");

  useEffect(() => { 
    const date = new Date();
    setFormattedDateTime(
      date.toLocaleString("tr-TR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    );
 
    const Todos = Cookies.get("todoList");
    if (Todos) {
      setTodoList(JSON.parse(Todos));
    }
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    const formObj = Object.fromEntries(new FormData(e.target));

    const dateInput = new Date(formObj.targetdate);
    const months = [
      "Ocak",
      "Şubat",
      "Mart",
      "Nisan",
      "Mayıs",
      "Haziran",
      "Temmuz",
      "Ağustos",
      "Eylül",
      "Ekim",
      "Kasım",
      "Aralık",
    ];
    const day = dateInput.getDate();
    const month = months[dateInput.getMonth()];
    const year = dateInput.getFullYear();
    const formattedDate = `${day} ${month} ${year}`;

    setTodoList((prevList) => [
      ...prevList,
      {
        id: prevList.length + 1,
        title: formObj.title,
        description: formObj.description,
        targetdate: formattedDate,
        isComplete: false,
        createdAt: formattedDateTime,
      },
    ]);
    formRef.current.reset();
    setShow(false);
  }

  useEffect(() => {
    if (todoList.length > 0) {
      Cookies.set("todoList", JSON.stringify(todoList));
    }
  }, [todoList]);

  return (
    <>
      <div className="formCont">
        <button onClick={() => setShow(true)}>Görev Ekle</button>
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          style={{
            opacity: `${show ? "1" : "0"}`,
            transition: "all .3s",
          }}
        >
          <div className="inputCol">
            <input
              style={{
                width: `${show ? "243px" : "0px"}`,
                transition: "all .3s",
              }}
              type="text"
              name="title"
              placeholder="Görev Başlığı Yazınız..."
              required
            />
          </div>
          <div className="inputCol">
            <input
              style={{
                width: `${show ? "350px" : "0px"}`,
                transition: "all .3s",
              }}
              type="text"
              name="description"
              placeholder="Görev Açıklaması Yazınız..."
              required
            />
          </div>
          <div className="inputCol">
            <input
              type="date"
              name="targetdate"
              placeholder="hedef zamanı"
              required
            />
          </div>
          <button>Kaydet</button>
          <button
            onClick={(e) => {
              e.preventDefault();
              setShow(false);
            }}
          >
            Vazgeç
          </button>
        </form>
        <div className="bar"></div>
      </div>

      <TodoList todoList={todoList} setTodoList={setTodoList} />
    </>
  );
}
