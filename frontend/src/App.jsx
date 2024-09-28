import './App.css';
import React, {useState, useEffect} from 'react';
import TodoListForm from './TodoListForm';
import TodoList from './TodoList';

const App = () => {
  const [todoLists, setTodoLists] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTodoList, setCurrentTodoList] = useState([]);

  useEffect(() => {
        fetchTodoLists()
      }, []);

  const fetchTodoLists = async () => {
    const response = await fetch('http://localhost:5000/todoLists');
    const data = await response.json();
    setTodoLists(data.todoLists);  
  }

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentTodoList({});
  };

  const openCreateModal = () => {
    if (!isModalOpen) setIsModalOpen(true);
  };

  const openEditModal = (todoList) => {
    if (isModalOpen) return;
    setCurrentTodoList(todoList);
    setIsModalOpen(true);
  };

  const onUpdate = () => {
    closeModal();
    fetchTodoLists();
  };


  return (
    <>
      <TodoList todoLists={todoLists} updateTodoList={openEditModal} updateCallback={onUpdate} />
      <button onClick={openCreateModal}>Create New List</button>
      {isModalOpen && <div className = "modal">
        <div className="modal-content">
          <span className="close" onClick={closeModal}>&times;</span>
          <TodoListForm existingTodoList={currentTodoList} updateCallback={onUpdate} />
        </div>
      </div>

      }
    </>
  );
}

export default App;
