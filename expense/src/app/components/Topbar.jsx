import React, { useContext, useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Avatar, Menu, MenuItem, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../service/api';
export default function Topbar({ onMobileMenuClick }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const { setUserData, userData } = useContext(AuthContext)
  const open = Boolean(anchorEl);
  const handleProfileClick = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const navigate = useNavigate()
  const handleLogout = async () => {
    try {
      const result = await api.post("/auth/logout")
      console.log(result);
      localStorage.removeItem('Auth');
      setUserData(null)
      navigate("/")

    } catch (err) {
      console.log(err);

    }

  };

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <IconButton
          color="inherit"
          edge="start"
          onClick={onMobileMenuClick}
          sx={{ mr: 2, display: { md: 'none' } }}
          aria-label="open drawer"
        >
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" noWrap component="div">
          MyExpenseApp
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

        <IconButton
          onClick={handleProfileClick}
          size="small"
          aria-controls={open ? 'profile-menu' : undefined}
          aria-haspopup="true"
        >
          <Avatar alt="User">{userData?.user?.name.charAt(0).toUpperCase()}</Avatar>
        </IconButton>

        <Menu
          id="profile-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <MenuItem onClick={() => { handleClose(); }}>Profile</MenuItem>
          <MenuItem onClick={() => { handleClose(); handleLogout(); }}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
