import { useEffect, useState } from "react";
import {randomColor} from 'randomcolor';
import {v4 as uuidv4} from 'uuid';
import Draggable from 'react-draggable';
import './App.css';

function App() {
  const [todoList, setTodoList] = useState(
    JSON.parse(localStorage.getItem('items')) || []
  )
  const [listItem, setListItem] = useState('')

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(todoList))
  }, [todoList])

  const addItem = () => {
    if(!listItem) return
    const newItem = {
      id: uuidv4(),
      item: listItem,
      color: randomColor({
        luminosity: 'light'
      }),
      defaultPosition: {
        x: -50,
        y: -120,
      }
    }
    setTodoList([...todoList, newItem])
    setListItem('')
  }
const updatePosition = (data, id) => {
  let newTodoList = [...todoList]
  newTodoList[id].defaultPosition = {x: data.x, y: data.y}
  setTodoList(newTodoList)
}

  const removeItem = (id) => {
    setTodoList(todoList.filter(el => el.id !== id))
  }

  const onKeyPress = (e) => {
    const key = e.which || e.keyCode
    if(key === 13) {
      addItem()
    }
  }

  return (
    <div className="App">
      <div className="wrapper">
        <input
          onKeyDown={(e) => onKeyPress(e)}
          type='text'
          className="input"
          value={listItem}
          onChange={(e) => setListItem(e.target.value)}
          />
          <button 
            className="btn"
            onClick={addItem}
            type="button">
            Add todo
          </button>
        <div className="todo-list">
          {todoList.map((el, index) => {
            return (<Draggable 
                    onStop={(_, data) => updatePosition(data, index)}
                    defaultPosition={el.defaultPosition} 
                    key={el.id}>
                      <div className="todo-item" style={{backgroundColor: el.color}}>
                        <p>{el.item}</p>
                        <button 
                          className="btn-delete"  
                          onClick={() => removeItem(el.id)}
                        >
                            X
                        </button>
                      </div>
                  </Draggable>
                  )
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
