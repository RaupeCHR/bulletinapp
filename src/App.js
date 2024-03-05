import React, { useState, useEffect } from "react";
import "./App.css";
import Draggable from "react-draggable";
import { v4 as uuidv4 } from "uuid";
var randomColor = require("randomcolor");

function App() {
  const [item, setItem] = useState("");
  const [items, setItems] = useState(JSON.parse(localStorage.getItem("items")) || []);

  const keyPress = (event) => {
    var code = event.keyCode || event.which;
    if (code === 13) {
      newitem();
    }
  };

  const newitem = () => {
    if (item.trim() !== "") {
      const newNote = {
        id: uuidv4(),
        item: item,
        color: randomColor({ luminosity: "light" }),
        defaultPos: { x: 100, y: 0 },
      };
      setItems((prevItems) => [...prevItems, newNote]);
      setItem("");
    } else {
      alert("Geben Sie einen Text ein");
      setItem("");
    }
  };

  const updatePos = (data, index) => {
    let newArr = [...items];
    newArr[index].defaultPos = { x: data.x, y: data.y };
    setItems(newArr);
  };

  const deleteNote = (id) => {
    setItems((prevItems) => prevItems.filter((note) => note.id !== id));
  };

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  return (
    <div className="App">
      <input
        value={item}
        onChange={(e) => setItem(e.target.value)}
        placeholder="Etwas eingeben..."
        onKeyPress={(e) => keyPress(e)}
      />
      <button onClick={newitem}>EINGEBEN</button>
      {items.map((note, index) => (
        <Draggable
          key={note.id}
          defaultPosition={note.defaultPos}
          onStop={(e, data) => {
            updatePos(data, index);
          }}
        >
          <div style={{ backgroundColor: note.color }} className="box">
            {note.item}
            <button id="delete" onClick={() => deleteNote(note.id)}>
              X
            </button>
          </div>
        </Draggable>
      ))}
    </div>
  );
}

export default App;