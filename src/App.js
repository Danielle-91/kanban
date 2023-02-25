import './App.css';
import { Draggable, Droppable, DragDropContext } from 'react-beautiful-dnd';
import {v4 as uuidv4} from 'uuid';
import { useState } from 'react';

// DUMMY DATA

const cardData = [
  {
    id: uuidv4(),
    content: "Redo Header"
  },

  {
    id: uuidv4(),
    content: "Add animation"
  },

  {
    id: uuidv4(),
    content: "Debug"
  },

  {
    id: uuidv4(),
    content: "Fix horizontal scroll"
  },

  {
    id: uuidv4(),
    content: "Lunch!"
  }
]

const columnData = {
  [uuidv4()]: {
    name: "To Do",
    items: cardData
  },

  [uuidv4]: {
    name: "In Progress",
    items: []
  },

  [uuidv4]: {
    name: "Complete",
    items: []
  }
}
function App() {
  return (
    <div className="App">
      
    </div>
  );
}

export default App;
