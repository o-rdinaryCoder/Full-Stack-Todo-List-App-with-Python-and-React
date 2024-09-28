import {useState} from 'react';

const TodoListForm = ({existingTodoList = {}, updateCallback }) => {
    const [heading, setHeading] = useState(existingTodoList.heading || "");
    const [items, setItems] = useState(existingTodoList.items || "");

    const updating = Object.entries(existingTodoList).length !== 0

    const onSubmit = async (e) => {
        e.preventDefault();

        const data = {
            heading,
            items
        }

        const url = "http://localhost:5000/" + (updating ? `updateList/${existingTodoList.id}` : "createList")
        const options = {
            method: updating ? "PATCH" : "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }

        const response = await fetch(url, options)
        if(response.status !== 201 && response.status !== 200) {
            const data = await response.json()
            alert(data.message)

        } else {
            updateCallback()
        }
    }

    const handleKeyDown = (e, setter) => {
      if ( e.shiftKey) {
        e.preventDefault(); // Prevents form submission
        setter((prev) => prev + "\n");// Adds a newline
      }
    };

    return (
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="heading">Title</label>
          <br />
          <input
            type="text"
            id="heading"
            placeholder={heading}
            onChange={(e) => setHeading(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, setHeading)}
          />
        </div>
        <br />
        <div>
          <label htmlFor="items">Description</label>
          <br />
          <textarea
            type="text"
            id="items"
            placeholder={items}
            onChange={(e) => setItems(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, setItems)}
          />
        </div>
        <button type="submit">{updating ? "Update" : "Create"}</button>
      </form>
    );

}

export default TodoListForm;