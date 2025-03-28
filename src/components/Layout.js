import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  Avatar,
  Menu,
  MenuItem,
  CssBaseline,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Inventory as InventoryIcon,
  Description as PrescriptionIcon,
  Analytics as AnalyticsIcon,
  People as StaffIcon,
  LocalShipping as SuppliersIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  LocalHospital as LocalHospitalIcon,
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

const drawerWidth = 240;

function Layout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { userRole, logout } = useAuth();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    logout();
    navigate('/login');
  };

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { text: 'Inventory', icon: <InventoryIcon />, path: '/inventory' },
    { text: 'Prescriptions', icon: <PrescriptionIcon />, path: '/prescriptions' },
    { text: 'Analytics', icon: <AnalyticsIcon />, path: '/analytics' },
    { text: 'Staff Records', icon: <StaffIcon />, path: '/staff-records' },
    { text: 'Suppliers', icon: <SuppliersIcon />, path: '/suppliers' },
    { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
  ];

  const drawer = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Drawer Header */}
      <Box sx={{ 
        p: 2, 
        display: 'flex', 
        alignItems: 'center', 
        gap: 2,
        background: 'linear-gradient(45deg, #1976d2 30%, #2196f3 90%)',
        color: 'white',
        height: '64px'
      }}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 1,
          width: '100%'
        }}>
          <LocalHospitalIcon sx={{ fontSize: 32 }} />
          <Box>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 700,
                letterSpacing: '0.5px',
                textShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
            >
              MedStock
            </Typography>
            <Typography 
              variant="caption" 
              sx={{ 
                opacity: 0.9,
                display: 'block',
                fontSize: '0.7rem',
                letterSpacing: '0.5px'
              }}
            >
              Healthcare Management System
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box>
        <Divider />
        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              onClick={() => navigate(item.path)}
              selected={location.pathname === item.path}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Box>
      <Box sx={{ mt: 'auto' }}>
        <Divider />
        <List>
          <ListItem button onClick={handleMenuOpen}>
            <ListItemIcon>
              <Avatar sx={{ bgcolor: 'secondary.main' }}>
                {userRole?.charAt(0).toUpperCase()}
              </Avatar>
            </ListItemIcon>
            <ListItemText primary={userRole} />
          </ListItem>
        </List>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleLogout}>
            <LogoutIcon sx={{ mr: 1 }} />
            Logout
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          minHeight: '100vh',
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

export default Layout; 