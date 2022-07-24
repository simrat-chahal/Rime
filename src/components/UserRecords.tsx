import React, { useEffect } from "react";

//mui imports
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import ThreeDotsMenu from "./ThreeDotsMenu";

//redux imports
import { useSelector, useDispatch } from "react-redux";
//redux actions
import { saveCurrentUserData } from "../Redux/reducers/usersInfoSlice";
import { RootState } from "../Redux/store";

interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: "right" | "left";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "name", label: "Name", minWidth: 170 },
  {
    id: "age",
    label: "Age",
    minWidth: 170,
    align: "left",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "options",
    label: "",
    minWidth: 170,
    align: "left",
  },
];

interface Data {
  name: string;
  code: string;
  population: number;
  size: number;
  density: number;
}

const UserRecords: React.FC = (): JSX.Element => {
  const { userList, selectedUserData } = useSelector(
    (state: RootState) => state.usersInfo
  );
  const dispatch = useDispatch();

  useEffect(() => {
    userList[0] && dispatch(saveCurrentUserData(userList[0]));
  }, []);

  return (
    <Paper sx={{ width: "50%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: "100vh" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column: Column, index: number) => (
                <TableCell
                  key={index}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    backgroundColor: "#bfa4a4",
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {userList.map((row: any, index: number) => (
              <TableRow
                hover={row.id === selectedUserData?.id ? false : true}
                role="checkbox"
                tabIndex={-1}
                key={index}
                onClick={() => dispatch(saveCurrentUserData(row))}
                sx={{
                  backgroundColor: `${
                    row.id === selectedUserData?.id && "#81ecec"
                  }`,
                  cursor: "pointer",
                }}
              >
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.age}</TableCell>
                <TableCell>
                  {row.id === selectedUserData?.id && <ThreeDotsMenu itemData={row} />}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default UserRecords;
