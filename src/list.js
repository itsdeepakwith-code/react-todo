import React, { useState } from "react";
import ToDoItem from "./Item";
import {
  Dropdown,
  Button,
  Modal,
  Form,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";

function ToDoList() {
  const [toDoItems, setToDoItems] = useState([
    {
      id: 1,
      task: "Task 1",
      description: "Task 1 description",
      isCompleted: false,
    },
    {
      id: 2,
      task: "Task 2",
      description: "Task 2 description",
      isCompleted: false,
    },
  ]);

  const [statusFilter, setStatusFilter] = useState("all");
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedTask, setEditedTask] = useState({
    id: null,
    task: "",
    description: "",
    isCompleted: false,
  });

  const handleAddTask = () => {
    const newTask = {
      id: toDoItems.length + 1,
      task: editedTask.task || "New Task",
      description: editedTask.description || "New Task Description",
      isCompleted: false,
    };
    setToDoItems([...toDoItems, newTask]);
  };

  const handleStatusChange = (id, newStatus) => {
    const updatedItems = toDoItems.map((item) =>
      item.id === id
        ? { ...item, isCompleted: newStatus === "Completed" }
        : item
    );
    setToDoItems(updatedItems);
  };

  const handleEdit = (id) => {
    const taskToEdit = toDoItems.find((item) => item.id === id);
    setEditedTask(taskToEdit);
    setShowEditModal(true);
  };

  const handleEditSave = () => {
    const updatedItems = toDoItems.map((item) =>
      item.id === editedTask.id ? { ...item, ...editedTask } : item
    );
    setToDoItems(updatedItems);
    setShowEditModal(false);
  };

  const handleDelete = (id) => {
    const updatedItems = toDoItems.filter((item) => item.id !== id);
    setToDoItems(updatedItems);
  };

  const handleEditCancel = () => {
    setShowEditModal(false);
  };

  const filteredItems =
    statusFilter === "all"
      ? toDoItems
      : toDoItems.filter(
          (item) => item.isCompleted === (statusFilter === "completed")
        );

  return (
    <Container className="mt-4">
      <div className="todo-list">
        <h2 className="mb-12 text-center" style={{ padding: "20px" }}>
          To Do
        </h2>
        <Row className="mb-4">
          <Col>
            <Form.Control
              type="text"
              placeholder="Enter task name"
              value={editedTask.task}
              onChange={(e) =>
                setEditedTask({ ...editedTask, task: e.target.value })
              }
            />
          </Col>
          <Col>
            <Form.Control
              type="text"
              placeholder="Enter task description"
              value={editedTask.description}
              onChange={(e) =>
                setEditedTask({ ...editedTask, description: e.target.value })
              }
            />
          </Col>
          <Col>
            <Button variant="success" onClick={handleAddTask}>
              Add Todo
            </Button>
          </Col>
        </Row>

        <Dropdown onSelect={(e) => setStatusFilter(e)} className="mb-3">
          <Dropdown.Toggle variant="secondary" id="dropdown-basic">
            {statusFilter === "all"
              ? "All"
              : statusFilter === "completed"
              ? "Completed"
              : "Not Completed"}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item eventKey="all">All</Dropdown.Item>
            <Dropdown.Item eventKey="completed">Completed</Dropdown.Item>
            <Dropdown.Item eventKey="not completed">
              Not Completed
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Row className="card-container">
          {filteredItems.map((item) => (
            <ToDoItem
              key={item.id}
              {...item}
              onStatusChange={handleStatusChange}
              onDelete={handleDelete}
              onEdit={() => handleEdit(item.id)}
            />
          ))}
        </Row>

        <Modal show={showEditModal} onHide={handleEditCancel}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="editTaskName">
                <Form.Label>Task Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter task name"
                  value={editedTask.task}
                  onChange={(e) =>
                    setEditedTask({ ...editedTask, task: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group controlId="editTaskDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter description"
                  value={editedTask.description}
                  onChange={(e) =>
                    setEditedTask({
                      ...editedTask,
                      description: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Dropdown
                onSelect={(e) =>
                  setEditedTask({ ...editedTask, isCompleted: e })
                }
              >
                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                  {editedTask.isCompleted ? "Completed" : "Not Completed"}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item eventKey="Completed">Completed</Dropdown.Item>
                  <Dropdown.Item eventKey="Not Completed">
                    Not Completed
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleEditCancel}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleEditSave}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </Container>
  );
}

export default ToDoList;
