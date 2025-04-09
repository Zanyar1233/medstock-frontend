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
  Refresh as RestockIcon,
  ShoppingCart as OrdersIcon,
  LocalPharmacy as PrescribeIcon,
  PersonSearch as PatientRecordsIcon,
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
    { text: 'Patient Records', icon: <PatientRecordsIcon />, path: '/patient-records' },
    { text: 'Staff Records', icon: <StaffIcon />, path: '/staff-records' },
    { text: 'Suppliers', icon: <SuppliersIcon />, path: '/suppliers' },
    { text: 'Prescribe', icon: <PrescribeIcon />, path: '/prescribe' },
    { text: 'Restock', icon: <RestockIcon />, path: '/restock' },
    { text: 'Orders', icon: <OrdersIcon />, path: '/orders' },
    { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
  ];

  const drawer = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Drawer Header */}
      <Box sx={{ 
        p: 2.5, 
        display: 'flex', 
        alignItems: 'center', 
        gap: 2,
        background: 'linear-gradient(135deg, #1e88e5 0%, #1976d2 100%)',
        color: 'white',
        height: '68px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        position: 'relative',
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0) 100%)',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        }
      }}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 1.5,
          width: '100%'
        }}>
          <LocalHospitalIcon sx={{ 
            fontSize: 32, 
            color: 'white',
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
          }} />
          <Box>
            <Typography 
              variant="h6" 
              sx={{ 
                fontSize: '1.15rem',
                fontWeight: 600,
                letterSpacing: '0.5px',
                textShadow: '0 2px 4px rgba(0,0,0,0.2)',
                color: 'white',
                lineHeight: 1.2,
                mb: 0.3,
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
                letterSpacing: '0.5px',
                color: 'rgba(255, 255, 255, 0.9)',
                textShadow: '0 1px 2px rgba(0,0,0,0.15)',
              }}
            >
              Healthcare Management System
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box sx={{ flex: 1, overflowY: 'auto' }}>
        <List sx={{ 
          px: 1,
          py: 1,
          '& .MuiListItem-root': {
            borderRadius: 1.5,
            mb: 0.5,
            color: 'rgba(255, 255, 255, 0.9)',
            transition: 'all 0.2s ease',
            backgroundColor: 'transparent',
            '&:hover': {
              backgroundColor: 'transparent',
            },
          },
        }}>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              onClick={() => navigate(item.path)}
              selected={location.pathname === item.path}
              sx={{
                position: 'relative',
                '&.Mui-selected': {
                  backgroundColor: 'transparent',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    left: '-8px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '4px',
                    height: '60%',
                    backgroundColor: 'white',
                    borderRadius: '0 4px 4px 0',
                    boxShadow: '0 0 10px rgba(255,255,255,0.5)',
                  },
                  '&:hover': {
                    backgroundColor: 'transparent',
                  },
                },
                '&:hover': {
                  backgroundColor: 'transparent',
                  transform: 'translateX(4px)',
                  '& .MuiListItemIcon-root': {
                    transform: 'scale(1.1)',
                    filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.5))',
                  },
                  '& .MuiListItemText-root': {
                    textShadow: '0 0 10px rgba(255,255,255,0.5)',
                  },
                },
              }}
            >
              <ListItemIcon 
                sx={{
                  color: location.pathname === item.path ? 'white' : 'rgba(255, 255, 255, 0.7)',
                  minWidth: '40px',
                  transition: 'all 0.2s ease',
                  filter: location.pathname === item.path ? 'drop-shadow(0 0 6px rgba(255,255,255,0.4))' : 'none',
                  transform: location.pathname === item.path ? 'scale(1.1)' : 'scale(1)',
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text}
                sx={{
                  '& .MuiTypography-root': {
                    fontWeight: location.pathname === item.path ? 600 : 400,
                    color: location.pathname === item.path ? 'white' : 'rgba(255, 255, 255, 0.9)',
                    transition: 'all 0.2s ease',
                    textShadow: location.pathname === item.path ? '0 0 10px rgba(255,255,255,0.4)' : 'none',
                    letterSpacing: location.pathname === item.path ? '0.5px' : 'normal',
                  },
                }}
              />
            </ListItem>
          ))}
        </List>
      </Box>
      <Box sx={{ mt: 'auto' }}>
        <Divider sx={{ 
          borderColor: 'rgba(255, 255, 255, 0.12)',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }} />
        <List sx={{ 
          backgroundColor: '#1565c0',
          borderRadius: '0 0 4px 4px',
          boxShadow: 'inset 0 3px 6px rgba(0,0,0,0.15), 0 2px 4px rgba(0,0,0,0.1)',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '1px',
            background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0) 100%)',
            boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
          }
        }}>
          <ListItem 
            button 
            onClick={handleMenuOpen}
            sx={{
              color: 'white',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                boxShadow: 'inset 0 2px 5px rgba(0,0,0,0.1)',
              },
              py: 1.5,
              transition: 'all 0.2s ease',
            }}
          >
            <ListItemIcon>
              <Avatar sx={{ 
                bgcolor: 'rgba(255, 255, 255, 0.9)',
                color: '#1565c0',
                fontWeight: 'bold',
                boxShadow: '0 3px 6px rgba(0,0,0,0.2)',
                transition: 'all 0.2s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.25)',
                },
              }}>
                {userRole?.charAt(0).toUpperCase()}
              </Avatar>
            </ListItemIcon>
            <ListItemText 
              primary={userRole} 
              sx={{
                '& .MuiTypography-root': {
                  fontWeight: 500,
                  color: 'white',
                  textShadow: '0 1px 2px rgba(0,0,0,0.15)',
                },
              }}
            />
          </ListItem>
        </List>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          PaperProps={{
            sx: {
              mt: 1,
              boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
              borderRadius: 1,
            },
          }}
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
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth,
              background: 'linear-gradient(180deg, #1976d2 0%, #1565c0 100%)',
              color: 'white',
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth,
              background: 'linear-gradient(165deg, #1e88e5 0%, #1565c0 100%)',
              color: 'white',
              borderRight: 'none',
              boxShadow: '4px 0 10px rgba(0,0,0,0.1)',
            },
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
          height: '100vh',
          overflow: 'auto',
          backgroundColor: '#f8fafc',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: '#f8fafc',
            zIndex: -1
          }
        }}
      >
        <Box sx={{ 
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          p: 3,
          position: 'relative',
          zIndex: 1
        }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}

export default Layout; 