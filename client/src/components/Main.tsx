import { useEffect } from "react";
//other imports
import { useNavigate } from "react-router-dom";

const Main = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("users");
  }, []);

  return <></>;
};

export default Main;
