import {
  Container,
  Box,
  Typography,
  Divider,
  ToggleButtonGroup,
  ToggleButton,
  TextField,
  Button,
} from "@mui/material";

import "./Mahamy.css";
import { grey } from "@mui/material/colors";
import { useState, useContext, useEffect } from "react";
import Task from "./Task/Task";
import { TasksContext } from "./Contexts/TasksContext";
import { SnackbarContext } from "./Contexts/SnackbarContext";

export default function Mahamy() {
  const [tasksState, setTasksState] = useState({
    tasksType: "all",
    allTasks: [],
    newTaskTitle: "",
    newTaskDetails: "",
  });

  const { allTasks, handleAddTask } = useContext(TasksContext);
  const { snackbarState, setSnackbarState } = useContext(SnackbarContext);

  function updateAllTasks() {
    setTasksState({
      ...tasksState,
      allTasks: JSON.parse(window.localStorage.getItem("allTasks")),
      newTaskTitle: "",
      newTaskDetails: "",
    });
  }

  useEffect(() => {
    setTasksState({ ...tasksState, allTasks: allTasks });
    updateAllTasks();
  }, []);

  const allTasksJsx = tasksState.allTasks.map((taskObj) => {
    switch (tasksState.tasksType) {
      case "all":
        return (
          <Task
            key={taskObj.taskId}
            taskId={taskObj.taskId}
            taskTitle={taskObj.taskTitle}
            taskDetails={taskObj.taskDetails}
            isDone={taskObj.isDone}
            updateAllTasks={updateAllTasks}
          />
        );
      case "done":
        if (taskObj.isDone) {
          return (
            <Task
              key={taskObj.taskId}
              taskId={taskObj.taskId}
              taskTitle={taskObj.taskTitle}
              taskDetails={taskObj.taskDetails}
              isDone={taskObj.isDone}
              updateAllTasks={updateAllTasks}
            />
          );
        }
        break;
      case "undone":
        if (!taskObj.isDone) {
          return (
            <Task
              key={taskObj.taskId}
              taskId={taskObj.taskId}
              taskTitle={taskObj.taskTitle}
              taskDetails={taskObj.taskDetails}
              isDone={taskObj.isDone}
              updateAllTasks={updateAllTasks}
            />
          );
        }
        break;
      default:
        return null;
    }
  });

  return (
    <Container maxWidth="lg" className="main-container">
      <Box className="main-card">
        <Box className="main-header">
          <Typography
            variant="h1"
            align="center"
            gutterBottom
            sx={{
              color: grey[900],
              fontWeight: 700,
            }}
          >
            مهامي
            <Divider />
          </Typography>
        </Box>

        <Box className="tasks-type-toggle-buttons">
          <ToggleButtonGroup
            color="primary"
            exclusive
            value={tasksState.tasksType}
            onChange={(event) => {
              setTasksState({ ...tasksState, tasksType: event.target.value });
            }}
            size="large"
            dir="rtl"
          >
            <ToggleButton className="right-button" value={"all"}>
              الكل
            </ToggleButton>
            <ToggleButton className="center-button" value={"done"}>
              منجز
            </ToggleButton>
            <ToggleButton className="left-button" value={"undone"}>
              غير منجز
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <Box className="tasks-container">{allTasksJsx}</Box>

        <Box className="add-task">
          <Box sx={{ flexBasis: "70%" }}>
            <TextField
              id="outlined-basic"
              label="عنوان المهمة"
              variant="outlined"
              dir="ltr"
              value={tasksState.newTaskTitle}
              onChange={(event) => {
                setTasksState({
                  ...tasksState,
                  newTaskTitle: event.target.value,
                });
              }}
              sx={{
                width: "100%",
                marginBottom: "10px",
              }}
            />
            <TextField
              id="outlined-basic"
              label="تفاصيل المهمة"
              variant="outlined"
              dir="ltr"
              value={tasksState.newTaskDetails}
              onChange={(event) => {
                setTasksState({
                  ...tasksState,
                  newTaskDetails: event.target.value,
                });
              }}
              sx={{
                width: "100%",
              }}
            />
          </Box>

          <Button
            variant="contained"
            sx={{ flexBasis: "30%" }}
            onClick={() => {
              if (
                tasksState.newTaskTitle !== "" &&
                tasksState.newTaskTitle !== " "
              ) {
                handleAddTask(
                  tasksState.newTaskTitle,
                  tasksState.newTaskDetails
                );
                updateAllTasks();
                setSnackbarState({
                  ...snackbarState,
                  isOpen: true,
                  isError: false,
                  snackbarMessage: "تم إنشاء مهمة جديدة بنجاح",
                });
              } else {
                setSnackbarState({
                  ...snackbarState,
                  isOpen: true,
                  isError: true,
                  snackbarMessage: "أدخل عنوان للمهمة أولاً",
                });
              }
            }}
          >
            إضافة
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
