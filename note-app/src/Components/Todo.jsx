import { useEffect, useRef, useState } from "react";
import "./CSS/Todo.css";
import Todoitems from "./Todoitems";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const inputRef = useRef(null);

  let count = 0;

  const add = () => {
    setTodos([
      ...todos,
      { no: count++, text: inputRef.current.value, display: "" },
    ]),
      (inputRef.current.value = "");
    localStorage.setItem("todos_count", count);
  };

  useEffect(() => {
    setTodos(JSON.parse(localStorage.getItem("todos")));
  }, []);

  useEffect(() => {
    setTimeout(() => {
      console.log(todos);
      localStorage.setItem("todos", JSON.stringify(todos));
      count = localStorage.getItem("todos_count");
    }, 100);
  }, [todos]);

  return (
    <div className="todo">
      <div className="todo-header">To-Do List</div>
      <div className="todo-add">
        <input
          ref={inputRef}
          type="text"
          placeholder="Add Your Task"
          className="todo-input"
        />
        <div
          onClick={() => {
            add();
          }}
          className="todo-add-btn"
        >
          ADD
        </div>
      </div>
      <div className="todo-list">
        {todos.map((item, index) => {
          return (
            <Todoitems
              key={index}
              no={item.no}
              setTodos={setTodos}
              display={item.display}
              text={item.text}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Todo;
