import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

function ViewTask() {
    const [viewTask, setViewTask] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(3);
    const [totalPages, setTotalPages] = useState(0)

    const onPrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            getTask(currentPage - 1);
        }
    }

    const onNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
            getTask(currentPage + 1);
        }
    }
    useEffect(() => {
        getTask(1);
    }, [setViewTask])

    const getTask = async (pageno) => {
        let alldata
        // eslint-disable-next-line no-unused-vars
        let task = await Axios.get('http://localhost:3000/task')
            .then((response) => {
                alldata=response.data
            })
            .catch((err) => {
                console.log(err)
            })
        console.log(alldata.length)
        let totalTask = Math.ceil(alldata.length / perPage);
        setTotalPages(totalTask);

        let lastindex = pageno * perPage
        let firstindex = lastindex - perPage
        let currenttask = alldata.slice(firstindex, lastindex)
        setViewTask(currenttask)

    }

    const onDeleteTask = async (e, id) => {
        e.preventDefault()
        // eslint-disable-next-line no-unused-vars
        let deleteTask = await Axios.delete("http://localhost:3000/task/" + id)
            .then((response) => {
                console.log(response.data)
                getTask()
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const onEnd = async (e, id) => {
        console.log(e.target.checked)
        if (e.target.checked) {
            // eslint-disable-next-line no-unused-vars
            let endedTask = await Axios.patch("http://localhost:3000/task/" + id, { status: 1 })
                .then((response) => {
                    console.log(response.data);
                    getTask()
                })
                .catch((err) => {
                    console.log(err)
                })
        } else {
            // eslint-disable-next-line no-unused-vars
            let endedTask = await Axios.patch("http://localhost:3000/task/" + id, { status: 0 })
                .then((response) => {
                    console.log(response.data);
                    getTask(1)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }

    return (
        <div>
            <Container>
                <Row>
                    {viewTask.map((v, i) => (
                        <Col className='col-3 position-relative'>
                            <Card style={{ width: '18rem', backgroundColor: v.status ? "white" : `${v.task_type}` }}>
                                <Card.Body>

                                    <Card.Title>{v.name}</Card.Title>
                                    <Card.Text>{v.task_dsc}</Card.Text>
                                    <p>{v.task_date}</p>
                                    <Button onClick={(e) => onDeleteTask(e, v.id)}>X</Button>

                                </Card.Body>

                            </Card>
                            <Form.Check type="checkbox" checked={v.status ? "checked" : ""} onChange={(e) => onEnd(e, v.id)} className='position-absolute top-0 end-0 check_btn' />
                        </Col>
                    ))}
                </Row>
                <Row>
                    <Col md="auto">
                    <Button onClick={() =>onPrevPage()}>Previous</Button>
                    </Col>

                    <Col md="auto">
                    <Button onClick={() =>onNextPage()}>Next</Button>
                    </Col>

                </Row>
            </Container>
        </div>
    )
}

export default ViewTask
