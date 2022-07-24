import React from "react";
import Main from "./components/Main";
import Users from "./components/Users";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFoundPage from "./components/NotFoundPage";
import FlashMessage from "./components/FlashMessage";
import FormFiller from "./components/Form/FormFiller";
import UserDetails from "./components/UserDetails";

const App: React.FC = (): JSX.Element => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="users" element={<Users />}>
            {/* <Route path=":userId" element={<UserDetails />} /> */}
          </Route>
          <Route path="users/:userId" element={<UserDetails />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
      <FlashMessage />
      <FormFiller />
    </div>
  );
};

export default App;
