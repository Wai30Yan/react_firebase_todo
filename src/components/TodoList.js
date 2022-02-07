import { collection, query, orderBy, onSnapshot } from 'firebase/firestore'
import React, { useState, useEffect } from 'react'
import { db } from '../firebase'
import Todo from './Todo'

const TodoList = () => {

    const [todos, setTodos] = useState([])

    useEffect(() => {
        const q = query(collection(db, 'todoList'), orderBy('created', 'desc'))
        onSnapshot(q, (querySnapshot) => {
            setTodos(querySnapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        })
    }, [])


    return (
        <div style={{ padding: '14px' }} >
            {
                todos.map((todo) =>                     
                    <Todo 
                        key={todo.id} 
                        id={todo.id} 
                        title={todo.data.title} 
                        created={todo.data.created} 
                        completed={todo.data.completed} 
                    />
                 )
            }
        </div>
    )
}

export default TodoList
