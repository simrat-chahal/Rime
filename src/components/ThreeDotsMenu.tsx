import * as React from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

//redux imports
import { useDispatch } from 'react-redux';
import { deleteUserData, updateEditMode } from '../Redux/reducers/usersInfoSlice';
import { deleteUser } from '../apis/apisList';

const options = [
  'Edit',
  'Delete'
];

const ITEM_HEIGHT = 48;

interface ThreeDotsMenuProps {
  itemData: any
}

export default function ThreeDotsMenu(props: ThreeDotsMenuProps) {
  const {itemData} = props
  const dispatch = useDispatch()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  }
  const handleCloseEdit = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    dispatch(updateEditMode())
    setAnchorEl(null);
  };
  const handleCloseDelete = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    deleteUser(itemData)
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        {/* {options.map((option) => (
          <MenuItem key={option} selected={option === 'Pyxis'} onClick={handleClose}>
            {option}
          </MenuItem>
        ))} */}
        <MenuItem
          onClick={handleCloseEdit}
        >
          Edit
        </MenuItem>
        <MenuItem
          onClick={handleCloseDelete}
        >
          Delete
        </MenuItem>
      </Menu>
      </>
  );
}
