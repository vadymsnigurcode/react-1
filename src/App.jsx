import { useEffect, useState } from "react"
import "./styles.css"
import { NewTodoForm } from "./NewTodoForm"
import { TodoList } from "./TodoList"

export default function App() {
  // const [newItem, setNewItem] = useState("")
  const [todos,setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS")
    console.log("localValue: "+ localValue)
    if (localValue == null) return []
    return JSON.parse(localValue)

  })
  // setNewItem ("asdfasdf")

  useEffect(()=> {
    localStorage.setItem("ITEM", JSON.stringify(todos))

  }, [todos])

  function addTodo(title) {
        setTodos(currentTodos => {
          return [
          ...currentTodos,
          {id: crypto.randomUUID(), title, completed: false},
          ]
        })
  }

  function handleSubmit(e) {
    e.preventDefault()

    setTodos(currentTodos => {
      return [
      ...currentTodos,
      {id: crypto.randomUUID(), title: newItem, completed: false},
      ]
    })

    setNewItem("")

    // ------------------------
    // set second item example
    // ------------------------
    // setTodos(currentTodos => {
    //   return [
    //   ...currentTodos,
    //   {id: crypto.randomUUID(), title: newItem, completed: false},
    //   ]
    // })
  }

  function toggleTodo(id,completed) {
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        if (todo.id === id) {
          return { ...todo, completed}
        }
        return todo
      })
    })
  }

  function deleteTodo(id) {
    setTodos(currentTodos => {
      return currentTodos.filter(todo => todo.id !== id)
    })
  }
  

  console.log(todos)

  return (
  <>
  <NewTodoForm onSubmit={addTodo}/>
  <h1 className="header"> Todo List</h1>
  <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo}/>
  </>
  )
}
