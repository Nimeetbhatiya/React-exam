/* eslint-disable no-unused-vars */
import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Button, Card, Form } from 'react-bootstrap';

function ViewTask() {
    const [viewTask, setViewTask] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(3);
    const [totalPages, setTotalPages] = useState(0);

    const onPrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            getTask(currentPage - 1);
        }
    };

    const onNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
            getTask(currentPage + 1);
        }
    };

    useEffect(() => {
        getTask(1);
    }, [setViewTask]);

    const getTask = async (pageno) => {
        let alldata;
        await Axios.get('http://localhost:3000/task')
            .then((response) => {
                alldata = response.data;
            })
            .catch((err) => {
                console.log(err);
            });

        let totalTask = Math.ceil(alldata.length / perPage);
        setTotalPages(totalTask);

        let lastindex = pageno * perPage;
        let firstindex = lastindex - perPage;
        let currenttask = alldata.slice(firstindex, lastindex);
        setViewTask(currenttask);
    };

    const onDeleteTask = async (e, id) => {
        e.preventDefault();
        await Axios.delete("http://localhost:3000/task/" + id)
            .then((response) => {
                console.log(response.data);
                getTask(currentPage);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const onEnd = async (e, id) => {
        const status = e.target.checked ? 1 : 0;
        await Axios.patch("http://localhost:3000/task/" + id, { status })
            .then((response) => {
                console.log(response.data);
                getTask(currentPage);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <Container className="py-4">
            <Row className="g-4 justify-content-center">
                {viewTask.map((v, i) => (
                    <Col key={i} xs={12} sm={6} md={4} lg={3}>
                        <Card
                            style={{ backgroundColor: v.status ? "#f8f9fa" : v.task_type }}
                            className="shadow-sm position-relative"
                        >
                            <Button
                                variant="danger"
                                size="sm"
                                onClick={(e) => onDeleteTask(e, v.id)}
                                className="position-absolute top-0 end-0 m-2 z-1"
                            >
                                X
                            </Button>

                            <Card.Body>
                                <Card.Title className="mb-2">{v.name}</Card.Title>
                                <Card.Text className="text-muted small mb-2">
                                    {v.task_dsc}
                                </Card.Text>
                                <Card.Text className="text-muted small">{v.task_date}</Card.Text>
                            </Card.Body>

                            <Form.Check
                                type="checkbox"
                                checked={!!v.status}
                                onChange={(e) => onEnd(e, v.id)}
                                className="position-absolute bottom-0 end-0 m-2"
                                title="Mark as Ended"
                            />
                        </Card>
                    </Col>
                ))}
            </Row>

            <Row className="mt-4 justify-content-center">
                <Col xs="auto">
                    <Button
                        variant="primary"
                        onClick={onPrevPage}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </Button>
                </Col>
                <Col xs="auto" className="d-flex align-items-center">
                    Page {currentPage} of {totalPages}
                </Col>
                <Col xs="auto">
                    <Button
                        variant="primary"
                        onClick={onNextPage}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}

export default ViewTask;
