import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { updateModalStatus } from "../../Redux/reducers/muiModalsSlice";

const AddNewUserButton = () => {
  const dispatch = useDispatch();
  return (
    <Button
      variant="outlined"
      onClick={() => dispatch(updateModalStatus("userAddModal"))}
    >Add New User</Button>
  );
};

export default AddNewUserButton;
