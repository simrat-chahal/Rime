import Main from "./components/Main";
import Users from "./components/Users";
import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import NotFoundPage from "./components/NotFoundPage";
import FlashMessage from "./components/FlashMessage";
import FormFiller from "./components/Form/FormFiller";
import UserDetails from "./components/UserDetails";
import { createTheme, ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
import { store } from "./Redux/store";
import "./styles/main.scss";

const App = () => {
  const buttonTheme = createTheme({
    typography: {
      button: {
        textTransform: "none",
      },
    },
  });
  return (
    <Provider store={store}>
      <div className="App">
        <ThemeProvider theme={buttonTheme}>
          <HashRouter>
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/users" element={<Users />}></Route>
              <Route path="/users/:userId" element={<UserDetails />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </HashRouter>
          <FlashMessage />
          <FormFiller />
        </ThemeProvider>
      </div>
    </Provider>
  );
};

export default App;
