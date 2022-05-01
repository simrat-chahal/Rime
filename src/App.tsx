import React from "react";
import Main from "./components/Main";

const App: React.FC = (): JSX.Element => {
  return (
    <div className="App">
      <Main />
    </div>
  );
};

export default App;

// import React, {useEffect, useREf}

// const App = () => {
//     const counter1 = React.useRef(0);
//     // const counter2 = React.useRef(0);

//     // const[count1, setCount1] = React.useState(0)
//     // const[count2, setCount2] = React.useState(0)

//     React.useEffect(() => {
//       console.log("useEffect Rendered");
//     }, [counter1]);

//   // React.useEffect(()=>{
//   //   console.log("useEffect is rendered",count1)
//   // },[count1])

//     return (
//       // <button
//       //   onClick={() => {
//       //     counter1.current += 1;
//       //     counter2.current += 1;
//       //     console.log(counter1, counter2);
//       //   }}
//       // >
//       //   click
//       // </button>
//       <button onClick={()=>{counter1.current+=1}}>click</button>
//     );
// }

// export default App
