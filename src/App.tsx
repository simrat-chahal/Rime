import React from "react";
import FlashMessage from "./components/FlashMessage";
import Main from "./components/Main";

const App: React.FC = (): JSX.Element => {
return (
    <div className="App">
      <Main />
      <FlashMessage />
    </div>
  );
};

export default App;