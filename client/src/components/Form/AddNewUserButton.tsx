//mui imports
import { Button } from "@mui/material";
//redux imports
import { useDispatch } from "react-redux";
import { updateModalStatus } from "../../Redux/reducers/muiModalsSlice";

const AddNewUserButton = () => {
  const dispatch = useDispatch();
  return (
    <Button
      variant="contained"
      onClick={() => dispatch(updateModalStatus("userAddModal"))}
    >
      Add New User
    </Button>
  );
};

export default AddNewUserButton;
