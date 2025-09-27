import React, { useState } from 'react';
import { Box, Paper, Toolbar } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Topbar from '../components/Topbar';
import Sidebar from '../components/Sidebar';

const drawerWidth = 240;

const DashboardLayout = ({ children }) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  return (
    <Box sx={{ display: 'flex' }}>
      <Topbar onMobileMenuClick={handleDrawerToggle} />
        <Toolbar/>
      <Sidebar
        mobileOpen={mobileOpen}
        onMobileClose={handleDrawerToggle}
        drawerWidth={drawerWidth}
      />

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p:1,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: isDesktop ? `${drawerWidth-60}px` : 0,
          backgroundColor: '#f5f5f5',
        }}
      >
        {/* Spacer for fixed Topbar */}
        <Toolbar />
        <Paper sx={{ p: 0 }}>{children}</Paper>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
