import "../App.css";
import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  where
} from "firebase/firestore";
import { db } from "../firebase";
import Header from "../components/Header.jsx";
import Composer from "../components/Composer.jsx";
import TaskList from "../components/TaskList.jsx";
import StatsStrip from "../components/StatsStrip.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function TodoPage() {
  const [todayTasks, setTodayTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingValue, setEditingValue] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;
    fetchTodos();
  }, [user]);

  const fetchTodos = async () => {
    if (!user) return;
    try {
      const todosQuery = query(
        collection(db, "todolist"),
        where("userId", "==", user.uid)
      );
      const snapshot = await getDocs(todosQuery);
      const docs = snapshot.docs.map((document) => ({
        id: document.id,
        ...(document.data() ?? {})
      }));
      setTodayTasks(
        docs.map((item) => ({
          id: item.id,
          title: item.title ?? "Untitled task",
          done: Boolean(item.done)
        }))
      );
    } catch (err) {
      console.error("Error fetching todos:", err.message);
    }
  };

  const hadleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAdd = async () => {
    if (inputValue.trim() === "") return;
    if (!user) return;
    try {
      const docRef = await addDoc(collection(db, "todolist"), {
        title: inputValue,
        done: false,
        userId: user.uid
      });
      setTodayTasks((prev) => [
        ...prev,
        {
          id: docRef.id,
          title: inputValue,
          done: false,
          userId: user.uid
        }
      ]);
      setInputValue("");
    } catch (err) {
      console.error("Error adding todo:", err.message);
    }
  };

  const handleDash = async (taskId) => {
    const target = todayTasks.find((task) => task.id === taskId);
    if (!target) return;
    const nextState = !target.done;
    try {
      const taskRef = doc(db, "todolist", taskId);
      await updateDoc(taskRef, { done: nextState });
      setTodayTasks((prev) =>
        prev.map((task) => (task.id === taskId ? { ...task, done: nextState } : task))
      );
    } catch (err) {
      console.error("Error updating todo:", err.message);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await deleteDoc(doc(db, "todolist", taskId));
      setTodayTasks((prev) => prev.filter((task) => task.id !== taskId));
    } catch (err) {
      console.error("Error deleting todo:", err.message);
    }
  };

  const startEditingTask = (taskId) => {
    const target = todayTasks.find((task) => task.id === taskId);
    if (!target || target.done) return;
    setEditingId(taskId);
    setEditingValue(target.title);
  };

  const handleEditingChange = (value) => {
    setEditingValue(value);
  };

  const handleSaveEdit = () => {
    if (editingId === null) return;
    updateTaskTitle(editingId, editingValue);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingValue("");
  };

  const updateTaskTitle = async (taskId, newTitle) => {
    try {
      const taskRef = doc(db, "todolist", taskId);
      await updateDoc(taskRef, { title: newTitle });
      setTodayTasks((prev) =>
        prev.map((task) => (task.id === taskId ? { ...task, title: newTitle } : task))
      );
      setEditingId(null);
      setEditingValue("");
    } catch (err) {
      console.error("Error updating title:", err.message);
    }
  };

  const activeCount = todayTasks.filter((task) => !task.done).length;
  const completedCount = todayTasks.length - activeCount;

  return (
    <div className="app-shell">
      <section className="focus-card merged">
        <Header />

        <div className="todo-panel embedded">
          <Composer value={inputValue} onChange={hadleChange} onAdd={handleAdd} />
          <div className="list-stack">
            <TaskList
              tasks={todayTasks}
              onToggle={handleDash}
              onDelete={handleDelete}
              editingIndex={editingId}
              editingValue={editingValue}
              onStartEdit={startEditingTask}
              onEditChange={handleEditingChange}
              onSaveEdit={handleSaveEdit}
              onCancelEdit={handleCancelEdit}
            />
          </div>
        </div>

        <StatsStrip active={activeCount} completed={completedCount} />
      </section>
    </div>
  );
}
