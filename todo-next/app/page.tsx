"use client";

import { useState, useEffect } from "react";

interface Todo {
  id: number;
  text: string;
  done: boolean;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("todos-next");
    if (saved) setTodos(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("todos-next", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    setTodos([...todos, { id: Date.now(), text, done: false }]);
    setInput("");
  };

  const toggleTodo = (id: number) =>
    setTodos(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));

  const deleteTodo = (id: number) =>
    setTodos(todos.filter((t) => t.id !== id));

  const clearCompleted = () => setTodos(todos.filter((t) => !t.done));

  const remaining = todos.filter((t) => !t.done).length;

  return (
    <main className="min-h-screen bg-gray-100 flex items-start justify-center pt-20 px-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Todo</h1>

        <form onSubmit={addTodo} className="flex gap-2 mb-6">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="할 일을 입력하세요..."
            className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-lg outline-none focus:border-indigo-500 transition-colors text-sm"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg text-sm transition-colors"
          >
            추가
          </button>
        </form>

        <ul className="flex flex-col gap-2">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg border ${
                todo.done
                  ? "opacity-50 bg-gray-50 border-gray-200"
                  : "bg-gray-50 border-gray-200"
              }`}
            >
              <input
                type="checkbox"
                checked={todo.done}
                onChange={() => toggleTodo(todo.id)}
                className="w-4 h-4 accent-indigo-500 cursor-pointer flex-shrink-0"
              />
              <span
                className={`flex-1 text-sm ${
                  todo.done ? "line-through text-gray-400" : "text-gray-700"
                }`}
              >
                {todo.text}
              </span>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="text-gray-300 hover:text-red-400 transition-colors text-sm px-1"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>

        {todos.length > 0 && (
          <div className="flex justify-between items-center mt-5 text-xs text-gray-400">
            <span>{remaining}개 남음</span>
            <button
              onClick={clearCompleted}
              className="hover:text-red-400 transition-colors"
            >
              완료 항목 삭제
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
