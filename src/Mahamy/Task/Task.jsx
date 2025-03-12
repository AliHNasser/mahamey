import { Card, CardContent, CardActions, Typography, Box } from "@mui/material";
import { blue, green, red } from "@mui/material/colors";
import CheckIcon from "@mui/icons-material/Check";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import theme from "../Theme";
import "./Task.css";
import { useContext, useEffect } from "react";
import { DialogsContext } from "../Contexts/DialogsContext";
import { TasksContext } from "../Contexts/TasksContext";
import { SnackbarContext } from "../Contexts/SnackbarContext";

export default function Task({
  taskId,
  taskTitle = "عنوان المهمة",
  taskDetails = "تفاصيل المهمة",
  isDone,
  updateAllTasks,
}) {
  const { dialogsState, setDialogsState } = useContext(DialogsContext);
  const { handleCheckButton } = useContext(TasksContext);
  const { snackbarState, setSnackbarState } = useContext(SnackbarContext);

  useEffect(() => {
    setDialogsState({ ...dialogsState, updateTasks: updateAllTasks });
  }, []);

  return (
    <Card
      className="task-card"
      sx={{
        bgcolor: theme.palette.secondary.main,
        "&:hover": { boxShadow: 3 },
      }}
    >
      <CardContent sx={{ color: "white" }}>
        <Typography
          gutterBottom
          variant="h4"
          sx={{
            textDecoration: isDone ? "line-through" : "none",
          }}
        >
          {taskTitle}
        </Typography>
        <Typography
          variant="h5"
          sx={{
            textDecoration: isDone ? "line-through" : "none",
          }}
        >
          {taskDetails}
        </Typography>
      </CardContent>

      <CardActions sx={{ gap: "15px" }} disableSpacing={true}>
        <Box
          className="button-container"
          sx={{
            border: 3,
            borderColor: green[500],
            backgroundColor: isDone ? green[500] : "white",
          }}
        >
          <CheckIcon
            sx={{
              color: isDone ? "white" : green[500],
              fontSize: "30px",
            }}
            onClick={() => {
              handleCheckButton(taskId);
              updateAllTasks();
              setSnackbarState({
                ...snackbarState,
                snackbarMessage: isDone
                  ? "تم تحديث حالة المهمة الى غير منجزة"
                  : "تم تحديث حالة المهمة الى منجزة",
                isError: false,
                isOpen: true,
              });
            }}
          />
        </Box>

        <Box
          className="button-container"
          sx={{
            border: 3,
            borderColor: blue[500],
          }}
        >
          <EditOutlinedIcon
            sx={{
              color: blue[500],
              fontSize: "30px",
            }}
            onClick={() => {
              setDialogsState({
                ...dialogsState,
                editDialogState: {
                  isOpen: true,
                  currentTaskTitle: taskTitle,
                  currentTaskDetails: taskDetails,
                },
                taskId: taskId,
              });
            }}
          />
        </Box>

        <Box
          className="button-container"
          sx={{
            border: 3,
            borderColor: red[600],
            marginLeft: "0px",
          }}
        >
          <DeleteOutlinedIcon
            sx={{
              color: red[600],
              fontSize: "30px",
            }}
            onClick={() => {
              setDialogsState({
                ...dialogsState,
                deleteDialogState: { isOpen: true },
                taskId: taskId,
              });
            }}
          />
        </Box>
      </CardActions>
    </Card>
  );
}
