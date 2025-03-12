import { Button, DialogContentText, TextField } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import "./Dialogs.css";
import { useState, useContext } from "react";
import { DialogsContext } from "../Contexts/DialogsContext";
import { TasksContext } from "../Contexts/TasksContext";
import { SnackbarContext } from "../Contexts/SnackbarContext";

export default function Dialogs({ children }) {
  // Hooks
  const [dialogsState, setDialogsState] = useState({
    editDialogState: {
      isOpen: false,
      currentTaskTitle: "",
      currentTaskDetails: "",
    },
    deleteDialogState: {
      isOpen: false,
    },
    taskId: "",
    updateTasks: null,
  });
  const { handleDeleteButton, handleEditTask } = useContext(TasksContext);
  const { snackbarState, setSnackbarState } = useContext(SnackbarContext);

  function handleEditDialogClose() {
    setDialogsState({
      ...dialogsState,
      editDialogState: { isOpen: false },
    });
  }

  function handleDeleteDialogClose() {
    setDialogsState({
      ...dialogsState,
      deleteDialogState: { isOpen: false },
    });
  }

  return (
    <>
      {/* Edit Dialog */}
      <Dialog
        dir="rtl"
        maxWidth="sm"
        fullWidth
        open={dialogsState.editDialogState.isOpen}
        onClose={handleEditDialogClose}
      >
        <DialogTitle sx={{ marginBottom: "10px", fontWeight: 600 }}>
          تعديل المهمة
        </DialogTitle>
        <DialogContent>
          <TextField
            sx={{ marginBottom: "10px" }}
            label="العنوان"
            variant="standard"
            value={dialogsState.editDialogState.currentTaskTitle}
            fullWidth
            onChange={(event) => {
              setDialogsState({
                ...dialogsState,
                editDialogState: {
                  ...dialogsState.editDialogState,
                  isOpen: true,
                  currentTaskTitle: event.target.value,
                },
              });
            }}
          />
          <TextField
            label="التفاصيل"
            variant="standard"
            fullWidth
            value={dialogsState.editDialogState.currentTaskDetails}
            onChange={(event) => {
              setDialogsState({
                ...dialogsState,
                editDialogState: {
                  ...dialogsState.editDialogState,
                  isOpen: true,
                  currentTaskDetails: event.target.value,
                },
              });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              if (
                dialogsState.editDialogState.currentTaskTitle !== "" &&
                dialogsState.editDialogState.currentTaskTitle !== " "
              ) {
                handleEditTask({
                  taskId: dialogsState.taskId,
                  newTaskTitle: dialogsState.editDialogState.currentTaskTitle,
                  newTaskDetails:
                    dialogsState.editDialogState.currentTaskDetails,
                });
                dialogsState.updateTasks();
                handleEditDialogClose();
                setSnackbarState({
                  ...snackbarState,
                  isError: false,
                  isOpen: true,
                  snackbarMessage: "تم تعديل المهمة بنجاح",
                });
              } else {
                setSnackbarState({
                  ...snackbarState,
                  isError: true,
                  isOpen: true,
                  snackbarMessage: "أدخل عنوان للمهمة أولاً",
                });
              }
            }}
          >
            تعديل
          </Button>
          <Button onClick={handleEditDialogClose}>إلغاء</Button>
        </DialogActions>
      </Dialog>
      {/* ===Edit Dialog=== */}

      {/* Delete Dialog */}
      <Dialog
        open={dialogsState.deleteDialogState.isOpen}
        onClose={handleDeleteDialogClose}
        dir="rtl"
      >
        <DialogTitle sx={{ marginBottom: "10px", fontWeight: 600 }}>
          هل أنت متأكد من رغبتك في حذف المهمة؟
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            لا يمكنك التراجع عن الحذف في حال اختيار زر: (حذف)
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose}>إغلاق</Button>
          <Button
            onClick={() => {
              handleDeleteButton(dialogsState.taskId);
              handleDeleteDialogClose();
              dialogsState.updateTasks();
              setSnackbarState({
                ...snackbarState,
                isError: false,
                snackbarMessage: "تم حذف المهمة بنجاح",
                isOpen: true,
              });
            }}
          >
            نعم،قم بالحذف
          </Button>
        </DialogActions>
      </Dialog>
      {/* ===Delete Dialog=== */}

      <DialogsContext.Provider
        value={{
          dialogsState: dialogsState,
          setDialogsState: setDialogsState,
        }}
      >
        {children}
      </DialogsContext.Provider>
    </>
  );
}
