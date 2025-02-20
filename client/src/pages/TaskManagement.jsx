import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import { useAuth } from "../context/auth.jsx";
import {
  Container,
  TextField,
  Button,
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  IconButton,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import Header from "../components/layout/Header";

const TaskManagement = () => {
  const [tasks, setTasks] = useState([]);
  const [auth, setAuth] = useAuth();
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [columns, setColumns] = useState({
    Pending: [],
    Completed: [],
    Done: [],
  });

  // Fetch tasks when the component mounts
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API}/api/v1/auth/getTasks`,
          auth?.user?._id
        );

        if (response.data.success) {
          const fetchedTasks = response.data.tasks;
          const groupedTasks = {
            Pending: [],
            Completed: [],
            Done: [],
          };
          // Group tasks by status
          fetchedTasks.forEach((task) => {
            groupedTasks[task.status].push(task);
          });

          setColumns(groupedTasks);
        } else {
          console.error("Failed to fetch tasks");
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, [auth?.user?.token]);

  const handleAddTask = async () => {
    if (taskName && taskDescription) {
      const newTask = {
        id: Date.now(),
        name: taskName,
        description: taskDescription,
        user_id: auth?.user?._id,
      };

      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API}/api/v1/auth/addTask`,
          newTask
        );
        if (response.data.success) {
          setColumns({ ...columns, Pending: [...columns.Pending, newTask] });
          setTaskName("");
          setTaskDescription("");
        } else {
          console.error("Failed to save task to the database");
        }
      } catch (error) {
        console.error("Error while saving task:", error);
      }
    }
  };

  const handleDeleteTask = async (column, taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        const response = await axios.delete(
          `${process.env.REACT_APP_API}/api/v1/auth/deleteTask/${taskId}`,
          {
            headers: {
              Authorization: `Bearer ${auth?.user?.token}`,
            },
          }
        );

        if (response.data.success) {
          setColumns((prevColumns) => ({
            ...prevColumns,
            [column]: prevColumns[column].filter((task) => task._id !== taskId),
          }));
        } else {
          console.error("Failed to delete task");
        }
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    }
  };

  const handleDragStart = (e, task, sourceColumn) => {
    e.dataTransfer.setData("task", JSON.stringify({ task, sourceColumn }));
  };

  const handleDrop = async (e, targetColumn) => {
    const { task, sourceColumn } = JSON.parse(e.dataTransfer.getData("task"));

    if (sourceColumn !== targetColumn) {
      try {
        const updatedTask = { ...task, status: targetColumn };

        const response = await axios.put(
          `${process.env.REACT_APP_API}/api/v1/auth/updateTask/${task._id}`,
          updatedTask,
          {
            headers: {
              Authorization: `Bearer ${auth?.user?.token}`,
            },
          }
        );

        if (response.data.success) {
          setColumns((prevColumns) => ({
            ...prevColumns,
            [sourceColumn]: prevColumns[sourceColumn].filter(
              (t) => t._id !== task._id
            ),
            [targetColumn]: [...prevColumns[targetColumn], updatedTask],
          }));
        } else {
          console.error("Failed to update task status");
        }
      } catch (error) {
        console.error("Error updating task status:", error);
      }
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ mt: 8 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Task Management
        </Typography>

        {/* Add Task Section */}
        <Paper sx={{ p: 4, mb: 4 }}>
          <Typography variant="h5" gutterBottom align="center">
            Add a New Task
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Task Name"
              variant="outlined"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              fullWidth
              required
            />
            <TextField
              label="Task Description"
              variant="outlined"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              fullWidth
              required
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddTask}
              sx={{ mt: 2 }}
            >
              Add Task
            </Button>
          </Box>
        </Paper>

        {/* Task Columns */}
        <Grid container spacing={4} justifyContent="center">
          {Object.keys(columns).map((column) => (
            <Grid item xs={12} md={3} key={column}>
              <Paper
                sx={{
                  p: 2,
                  minHeight: "400px",
                  backgroundColor:
                    column === "Pending"
                      ? "rgba(255, 193, 7, 0.2)"
                      : column === "Completed"
                      ? "rgba(76, 175, 80, 0.2)"
                      : "rgba(33, 150, 243, 0.2)",
                }}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, column)}
              >
                <Typography variant="h6" align="center" gutterBottom>
                  {column}
                </Typography>
                <Box>
                  {columns[column].map((task) => (
                    <Card
                      key={task._id}
                      sx={{
                        mb: 2,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        boxShadow: 2,
                        borderRadius: 2,
                      }}
                      draggable
                      onDragStart={(e) => handleDragStart(e, task, column)}
                    >
                      <CardContent sx={{ flex: 1 }}>
                        <Typography variant="body1" fontWeight="bold">
                          {task.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {task.description}
                        </Typography>
                      </CardContent>
                      <IconButton
                        onClick={() => handleDeleteTask(column, task._id)}
                        color="error"
                      >
                        <Delete />
                      </IconButton>
                    </Card>
                  ))}
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default TaskManagement;
