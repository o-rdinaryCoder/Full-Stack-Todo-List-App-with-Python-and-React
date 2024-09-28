import React from "react";

const TodoList = ({ todoLists, updateTodoList, updateCallback }) => {
  const onDelete = async (id) => {
    try {
      const options = {
        method: "DELETE",
      };
      const response = await fetch(
        `http://localhost:5000/deleteList/${id}`,
        options
      );
      if (response.status === 200) {
        updateCallback();
      } else {
        console.error("Failed to delete");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div>
      <div id="border">
        <h2>Todo Lists</h2>
      </div>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {todoLists.map((todoList) => (
            <tr key={todoList.id}>
              <td>{todoList.heading}</td>
              <td>
                {todoList.items.split("\n").map((item, index) => (
                  <div key={index}>{item}</div>
                ))}
              </td>
              <td>
                <button onClick={() => updateTodoList(todoList)}>Update</button>
                <button onClick={() => onDelete(todoList.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TodoList;
