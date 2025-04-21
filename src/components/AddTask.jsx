/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import  Axios  from 'axios';


const AddTask = () => {

    const [Task,setTask] = useState({});

    const onFormChange = (e)=>{
        setTask({...Task,[e.target.name]:e.target.value,status:0})
    }

    const onAddTask = async(e)=>{
        e.preventDefault();
        if(Task.task_dsc.length<=3){
            alert("description should be greater than 3 characters...");
            return
        }
        console.log(Task);
        let insertTask = await Axios.post("http://localhost:3000/task",Task).then((response)=>{
            console.log(response.data);
            setTask({});
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    return (
        <Form className='w-25 mx-auto mt-5' onSubmit={(e)=>onAddTask(e)}>
            <h1 className='text-center'>Add Task</h1>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>UserName</Form.Label>
                <Form.Control type="text" placeholder="Enter Username" value={Task.name ? Task.name : ""} onChange={(e)=>onFormChange(e)} name="name" required/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Date</Form.Label>
                <Form.Control type="date" placeholder="Select Date" name='task_date' value={Task.task_date ? Task.task_date : ""}  onChange={(e)=>onFormChange(e)} required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Task Type</Form.Label>
                <Form.Select aria-label="Default select example" name='task_type' value={Task.task_type ? Task.task_type : ""}  onChange={(e)=>onFormChange(e)} required >
                    <option>Open this select menu</option>
                    <option value="red">Office</option>
                    <option value="yellow">Personal</option>
                    <option value="green">Family</option>
                    <option value="cyan">Friends</option>
                    <option value="gray">Other</option>
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
        <Form.Label>Task Description</Form.Label>
        <Form.Control as="textarea" type="desc" placeholder='Task Description' name='task_dsc' value={Task.task_dsc ? Task.task_dsc : ""} onChange={(e) =>onFormChange(e)} rows={3} required />
      </Form.Group>
            <Button type="submit">Add task</Button>
        </Form>
    )
}

export default AddTask;