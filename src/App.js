import { ThemeProvider } from "@emotion/react";
import "./App.css";
import theme from "./Mahamy/Theme";
import Mahamy from "./Mahamy/Mahamy";
import Dialogs from "./Mahamy/Dialogs/Dialogs";
import SnackbarComponent from "./Mahamy/SnackbarComponent/SnackbarComponent";
import { TasksContext } from "./Mahamy/Contexts/TasksContext";
import { useContext } from "react";

// External Fonts
import "./fonts/Cairo-Black.ttf";
import "./fonts/Cairo-Bold.ttf";
import "./fonts/Cairo-ExtraBold.ttf";
import "./fonts/Cairo-ExtraLight.ttf";
import "./fonts/Cairo-Light.ttf";
import "./fonts/Cairo-Medium.ttf";
import "./fonts/Cairo-Regular.ttf";
import "./fonts/Cairo-SemiBold.ttf";

function App() {
  const allTasks = useContext(TasksContext);
  return (
    <div className="App" dir="rtl">
      <ThemeProvider theme={theme}>
        <SnackbarComponent>
          <TasksContext.Provider value={allTasks}>
            <Dialogs>
              <Mahamy />
            </Dialogs>
          </TasksContext.Provider>
        </SnackbarComponent>
      </ThemeProvider>
    </div>
  );
}

export default App;
