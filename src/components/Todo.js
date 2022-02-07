import { Paper, Button, Checkbox, Container, Typography, Modal, TextField } from '@mui/material'
import React, { useState } from 'react'
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import moment from 'moment';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore'
import { db } from '../firebase'

const useStyle = makeStyles({
    container: {
        display: 'flex',
        backgroundColor: 'white', 
        border: 'solid 2px',
        height: '90px', 
        borderRadius: '13px',
        marginTop: '10px',
        padding: '0',
        '&:hover': {
            border: 'none',
            //backgroundColor: '#1976d2',
            //backgroundColor: `${primary}`,
        }
    },
    title: {
        //marginTop: '10px',
    },
    date: {
        color: 'gray',
        //marginBottom: '10px',
    },
    box: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        width: '80%',
        padding: '5px',      
    },
    deleteIcon: {
        cursor: 'pointer',
    },
})

const modal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'white',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
}

const Todo = ({ id, title, created, completed }) => {
    
    const classes = useStyle()
    const time = moment(created.toDate()).format("llll").toString()

    const todoDocRef = doc(db, 'todoList', id)
    const [checked, setChecked] = useState(completed)
    const [open, setOpen] = useState(false);
    const [edit, setEdit] = useState(title)

    const handleComplete = async (e) => {       
        try {
            setChecked(e.target.checked)
            await updateDoc(todoDocRef, {
                completed: !completed
            })
        } catch (error) {
            alert(error)
        }
    }

    const handleDelete = async () => {
        try {
            await deleteDoc(todoDocRef)
        } catch (error) {
            alert(error)
        }
    }

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            await updateDoc(todoDocRef, {
                title: edit,
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Container className={classes.container}>
            <Checkbox 
                style={{ margin: 'auto' }}
                checked={checked}
                onChange={handleComplete}
            />
            <Box 
                className={classes.box} 
            >
                <Typography 
                    sx={{
                        fontSize: {
                            lg: 30,                           
                            sm: 25,
                            xs: 20,
                        },
                        fontWeight: {
                            xs: 'bold',
                        }
                    }}
                    style={{ textDecoration: completed ? 'line-through' : 'none' }}
                    className={classes.title} 
                    variant="h4" 
                >
                    {title}
                </Typography>
                <Typography 
                    sx={{
                        fontSize: {
                            lg: 20,                           
                            sm: 15,
                            xs: 15,
                        }
                    }}
                    className={classes.date} 
                    variant="body1" 
                >
                    {time}
                </Typography>
            </Box>
            <Button onClick={handleOpen} disabled={completed ? true : false} >
                <EditOutlinedIcon
                    className={classes.deleteIcon} 
                    style={{ height: '50%', margin: 'auto' }} 
                />
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modal}>
                    <form onSubmit={handleUpdate} >
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Edit the title
                        </Typography>
                        <Box style={{ marginTop: '8px', display: 'flex', justifyContent: 'space-between' }} >
                            <TextField 
                                style={{ width: '75%' }} 
                                value={edit}
                                onChange={(e) => setEdit(e.target.value)}
                            />
                            <Button variant='contained' type='submit'>Submit</Button>

                        </Box>
                    </form>
                </Box>
            </Modal>
            <Button onClick={handleDelete} >
                <DeleteOutlinedIcon 
                    className={classes.deleteIcon} 
                    tyle={{ height: '50%', margin: 'auto' }}
                />
            </Button>
        </Container>
    )
}

export default Todo
