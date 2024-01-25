import React from "react";
import { Card, Button, Dropdown, Col } from "react-bootstrap";
import "./App.css";

function ToDoItem(props) {
  const { id, task, description, isCompleted } = props;

  const handleStatusClick = (e) => {
    const newStatus = e === null ? "" : e;
    props.onStatusChange(id, newStatus);
  };

  return (
    <Col md={4} className="mb-3">
      <Card>
        <Card.Body className="supercard">
          <Card.Title className="card-title">{task}</Card.Title>
          <Card.Text className="card-text">{description}</Card.Text>
          <Dropdown onSelect={handleStatusClick}>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
              {isCompleted ? "Completed" : "Not Completed"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item eventKey="Completed">Completed</Dropdown.Item>
              <Dropdown.Item eventKey="Not Completed">
                Not Completed
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Button variant="primary" className="ml-2" onClick={props.onEdit}>
            Edit
          </Button>
          <Button
            variant="danger"
            className="ml-2"
            onClick={() => props.onDelete(id)}
          >
            Delete
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default ToDoItem;
