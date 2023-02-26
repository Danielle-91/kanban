import './App.css';
import { Draggable, Droppable, DragDropContext } from 'react-beautiful-dnd';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

// Dummy Data
const itemsData = [
  { id: uuidv4(), content: "Task 1" },
  { id: uuidv4(), content: "Task 2" },
  { id: uuidv4(), content: "Task 3" },
  { id: uuidv4(), content: "Task 4" },
  { id: uuidv4(), content: "Task 5" }
]

const columnsData = {
  // All items stored in 1st column; when moved, they will splice into new column's empty array below:
  [uuidv4()]: {
    name: "To Do",
    items: itemsData
  },
  [uuidv4()]: {
    name: "In Progress",
    items: []
  },
  [uuidv4()]: {
    name: "Complete",
    items: []
  }
};

// Functionality for dropping items in different column
const onDragEnd = (result, columns, setColumns) => {

  // if dragged to area outside columns, go back where it was
  if (!result.destination) return;

  const { source, destination } = result;
  // if dragged to a new column, remove from previous column and splice into new one
  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems
      }
    });
  }

  // if not, state is set wherever it is
  else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems
      }
    });
  }
};


function App() {

  const [columns, setColumns] = useState(columnsData);

  return (
    <div className="App">
      <DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumns)}>
        {Object.entries(columns).map(([columnId, column], index) => {
          return (
            <div className='main'>
              <h2>{column.name}</h2>
              <div className="columnContainer">
                <Droppable droppableId={columnId} key={columnId}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        className='taskColumns'
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          background: snapshot.isDraggingOver ? 'whitesmoke' : 'papayawhip'
                        }}>

                        {column.items.map((item, index) => {
                          return (
                            <Draggable key={item.id} draggableId={item.id} index={index}>
                              {(provided, snapshot) => {
                                return (
                                  <div
                                    className='itemCards'
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      background: snapshot.isDragging ? 'lightblue' : 'white',
                                      ...provided.draggableProps.style
                                    }}>
                                    <p>{item.content}</p>

                                  </div>
                                )
                              }}
                            </Draggable>
                          )
                        })}
                        {provided.placeholder}
                      </div>
                    )
                  }}

                </Droppable>

              </div>
            </div>

          )
        })}
      </DragDropContext>
    </div>
  );
}

export default App;

