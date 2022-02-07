import React, { useState } from 'react'
import { TextField, Button, Container } from '@mui/material'
import { collection, addDoc, Timestamp } from 'firebase/firestore'
import { db } from '../firebase'

const Form = () => {

    const [title, setTitle] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await addDoc(collection(db, 'todoList'), {
                title: title,
                completed: false,
                created: Timestamp.now()
            })
            setTitle('')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
            <form onSubmit={handleSubmit} >
                <TextField 
                    onChange={(e) => setTitle(e.target.value)}
                    style={{ margin: '15px', fontWeight: 'bold', fontSize: '18px' }}
                    variant='standard' 
                    label="Title"
                />
                <Button
                    style={{ margin: '15px' }}
                    type='submit'
                    variant="contained"
                >
                    Add
                </Button>
            </form>
        </Container>
    )
}

export default Form
