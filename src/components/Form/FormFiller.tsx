import React, { useState } from "react";

//material-ui imports
import {
  TextField,
  Typography,
  Snackbar,
  Alert,
  Backdrop,
  Box,
  Modal,
  Fade,
  Button,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { formStyling } from "../../styles/customMuiStylingObjects";

//redux-imports
import { useSelector, useDispatch } from "react-redux";
import { addUserData } from "../../Redux/reducers/usersInfoSlice";
import CountrySelect from "./CountrySelection";
import PersonName from "./PersonName";
import PersonAge from "./PersonAge";

type errorStatusTypes = {
  name: string;
  age: string;
};

export default function FormFiller() {
  console.log("component is rendered");
  // const { usersList } = useSelector(state=>state.usersInfo)
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false as boolean);
  const [colorValue, setColorValue] = useState("" as string);
  const handleOpen = () => setOpen(true as boolean);
  const handleClose = () => {
    setOpen(false as boolean);
    setErrorStatus({
      name: "",
      age: "",
    });
    setData({ name: "", age: "", date: "" });
  };

  const [data, setData] = useState({ name: "", age: "", date: "" });
  const [errorStatus, setErrorStatus] = useState({
    name: "",
    age: "",
  } as errorStatusTypes);

  const [SnackbarOpen, setSnackbarOpen] = React.useState(false as boolean);

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
    console.log("hkh");
    if (formValidator()) {
      dispatch(addUserData(data));
      setSnackbarOpen(true);
      setData({ name: "", age: "", date: "" });
      handleClose();
    }
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button variant="outlined" onClick={handleOpen}>
          Add New User
        </Button>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
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
                  <CountrySelect />
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
