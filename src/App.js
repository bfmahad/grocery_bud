import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";

const getStorageData = () => {
  let listData = localStorage.getItem("list");
  if (listData) {
    return JSON.parse(localStorage.getItem("list"));
  } else {
    return [];
  }
};
function App() {
  const [text, setText] = useState("");
  const [list, setList] = useState(getStorageData());
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text) {
      showAlert(true, "Please enter grocery item", "danger");
    } else if (text && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editId) {
            return { ...item, title: text };
          }
          return item;
        })
      );
      showAlert(true, "Item edited successfully", "success");
      setText("");
      setIsEditing(false);
      setEditId(null);
    } else {
      const newItem = { id: new Date().getTime().toString(), title: text };
      showAlert(true, "Item added successfully", "success");
      setList([...list, newItem]);
      setText("");
    }
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  const editItem = (id) => {
    const findItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditId(id);
    setText(findItem.title);
  };

  const removeItem = (id) => {
    showAlert(true, "Item Removed Successfully", "danger");
    const updateList = list.filter((item) => item.id !== id);
    setList(updateList);
  };

  const clearList = () => {
    showAlert(true, "List Clear Successfully", "danger");
    setList([]);
  };

  const showAlert = (show = false, message = "", type = "") => {
    setAlert({ show, message, type });
  };

  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
        <h3>Grocery bud</h3>
        {alert.show && <Alert {...alert} removeAlert={showAlert} />}
        <div className="form-control">
          <input
            type="text"
            className="grocery"
            placeholder="e.g. Eggs"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button className="submit-btn">
            {isEditing ? `Edit` : `Submit`}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="grocery-">
          <List items={list} removeItem={removeItem} editItem={editItem} />
          <button className="clear-btn" onClick={clearList}>
            Clear btn
          </button>
        </div>
      )}
    </section>
  );
}

export default App;
