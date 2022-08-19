import React, { useEffect, useState } from "react";

//material-ui imports
import {
  Typography,
  Snackbar,
  Alert,
  Backdrop,
  Box,
  Modal,
  Fade,
  Button,
} from "@mui/material";
// import { DatePicker, LocalizationProvider } from "@mui/lab";
// import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { formStyling } from "../../styles/customMuiStylingObjects";

//redux-imports
import { useSelector, useDispatch } from "react-redux";
import {
  updateEditMode,
} from "../../Redux/reducers/usersInfoSlice";
import { updateModalStatus } from "../../Redux/reducers/muiModalsSlice";
// import CountrySelect from "./CountrySelection";
import PersonName from "./PersonName";
import PersonAge from "./PersonAge";
import { RootState } from "../../Redux/store";
import { addNewUser, updateUser } from "../../apis/apisList";

type errorStatusTypes = {
  name: string;
  age: string;
};

export default function FormFiller() {
  const dispatch = useDispatch();
  const { userAddModal } = useSelector((state: RootState) => state.muiModals);
  const { selectedUserData, editMode } = useSelector(
    (state: RootState) => state.usersInfo
  );

  const [data, setData] = useState({ name: "", age: "" });
  const [errorStatus, setErrorStatus] = useState({
    name: "",
    age: "",
  } as errorStatusTypes);

  const [SnackbarOpen, setSnackbarOpen] = React.useState(false as boolean);

  useEffect(() => {
    if (!userAddModal) {
      setErrorStatus({
        name: "",
        age: "",
      });
      setData({ name: "", age: "" });
      editMode && dispatch(updateEditMode())
    }
  }, [userAddModal]);

  useEffect(() => {
    if (editMode) {
      setData({
        name: selectedUserData?.name!,
        age: selectedUserData?.age?.toString() as string,
      });
      dispatch(updateModalStatus("userAddModal"));
    }
  }, [editMode]);

  const handleCloser = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  //form functionalities
  const multiInputHandler = (e: any) => {
    const { name, value } = e.target;
    if (name === "userName") {
      if (/(^$|^[A-z])/.test(value)) {
        setData({ ...data, name: value });
        setErrorStatus({ ...errorStatus, name: "" });
      }
    } else if (name === "age") {
      if (/(^$|^[0-9]+$)/.test(value)) {
        setData({ ...data, age: value });
        setErrorStatus({ ...errorStatus, age: "" });
      }
    }
  };

  const formValidator = () => {
    const errDetails = { ...errorStatus };
    if (!data.name) errDetails.name = "Name is required";
    else {
      errDetails.name = "";
    }

    if (!data.age) errDetails.age = "Age is required";
    else errDetails.age = "";

    if (data.name && data.age) {
      setErrorStatus(errDetails);
      return true;
    } else {
      setErrorStatus(errDetails);
      return false;
    }
  };

  const submitHandler = (e: any) => {
    e.preventDefault();
    if (formValidator()) {
      editMode? updateUser({...selectedUserData, age: +data.age, name: data.name}): addNewUser({...data, age: +data.age});
      // setSnackbarOpen(true);
      setData({ name: "", age: "" });
      dispatch(updateModalStatus("userAddModal"));
    }
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Modal
          id="userAddModal"
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={userAddModal}
          onClose={() => dispatch(updateModalStatus("userAddModal"))}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={userAddModal}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Box sx={formStyling}>
                <Typography
                  variant="h3"
                  sx={{
                    fontSize: "1.5rem",
                    textAlign: "center",
                    marginBottom: "5px",
                  }}
                >
                  Fill User Details
                </Typography>
                <form
                  onSubmit={submitHandler}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <PersonName
                    data={data}
                    errorStatus={errorStatus}
                    multiInputHandler={multiInputHandler}
                  />
                  <PersonAge
                    data={data}
                    errorStatus={errorStatus}
                    multiInputHandler={multiInputHandler}
                  />
                  {/* <CountrySelect /> */}
                  {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      value={data.date}
                      onChange={(event:any)=>console.log(event)}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider> */}
                  <Button type="submit" variant="contained" color="primary">
                    Submit
                  </Button>
                  {/*<input
                    onKeyDown={(e) => console.log(e)}
                    onKeyPress={(e) => console.log(e)}
                  />
                  <label htmlFor="html">HTML</label>
                  <br />
                  <input
                    type="radio"
                    id="css"
                    name="fav_language"
                    value="CSS"
                  />
                  <label htmlFor="css">CSS</label>
                  <br />
                  <input
                    type="radio"
                    id="javascript"
                    name="fav_language"
                    value="JavaScript"
                  />
                  <label htmlFor="javascript">JavaScript</label> */}
                  {/*<input type="color" id="favcolor" name="favcolor" value={colorValue} onBlur={(e)=>{setColorValue(e.target.value);console.log(e)}} />
                  <input type="reset" /> */}
                </form>
              </Box>
            </Box>
          </Fade>
        </Modal>
      </Box>
      <Snackbar
        open={SnackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloser}
      >
        <Alert severity="success" sx={{ width: "100%" }} variant="filled">
          User Added
        </Alert>
      </Snackbar>
    </>
  );
}
