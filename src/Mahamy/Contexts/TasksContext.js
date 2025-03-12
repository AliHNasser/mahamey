import { createContext } from "react";

let allTasks = [];

if (window.localStorage.getItem("allTasks")) {
  allTasks = JSON.parse(window.localStorage.getItem("allTasks"));
} else {
  window.localStorage.setItem(
    "allTasks",
    '[{ "taskId": "0", "taskTitle": "المهمة الأولى", "taskDetails": "تفاصيل المهمة الأولى", "isDone": false }]'
  );
}

function handleAddTask(taskTitle, taskDetails) {
  let newAllTasks = [...JSON.parse(window.localStorage.getItem("allTasks"))];
  const newTaskObject = {
    taskId: newAllTasks.length - 1,
    taskTitle: taskTitle,
    taskDetails: taskDetails,
    isDone: false,
  };
  newAllTasks.push(newTaskObject);
  newAllTasks.forEach((taskObject, index) => {
    taskObject.taskId = index;
  });
  window.localStorage.setItem("allTasks", JSON.stringify(newAllTasks));
}

function handleCheckButton(taskId) {
  let newAllTasks = [...JSON.parse(window.localStorage.getItem("allTasks"))];
  newAllTasks.forEach((taskObject) => {
    if (taskObject.taskId === taskId) {
      taskObject.isDone = !taskObject.isDone;
      return taskObject;
    } else {
      return taskObject;
    }
  });
  window.localStorage.setItem("allTasks", JSON.stringify(newAllTasks));
}

function handleEditTask(editDialogObject) {
  let newAllTasks = [...JSON.parse(window.localStorage.getItem("allTasks"))];
  newAllTasks.forEach((taskObject) => {
    if (taskObject.taskId === editDialogObject.taskId) {
      taskObject.taskTitle = editDialogObject.newTaskTitle;
      taskObject.taskDetails = editDialogObject.newTaskDetails;
      return taskObject;
    } else {
      return taskObject;
    }
  });
  window.localStorage.setItem("allTasks", JSON.stringify(newAllTasks));
}

function handleDeleteButton(taskId) {
  let newAllTasks = [
    ...JSON.parse(window.localStorage.getItem("allTasks")),
  ].filter((taskObject) => {
    if (taskObject.taskId !== taskId) {
      return taskObject;
    }
  });

  newAllTasks.forEach((taskObject, index) => {
    taskObject.taskId = index;
    return taskObject;
  });
  window.localStorage.setItem("allTasks", JSON.stringify(newAllTasks));
}

export const TasksContext = createContext({
  allTasks: allTasks,
  handleAddTask: handleAddTask,
  handleCheckButton: handleCheckButton,
  handleDeleteButton: handleDeleteButton,
  handleEditTask: handleEditTask,
});
