import React from 'react';
import {
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
} from '@mui/material';
import {
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  LocalHospital as HospitalIcon,
  Medication as MedicationIcon,
  People as PeopleIcon,
  LocalShipping as ShippingIcon,
  Error as ErrorIcon,
  LocalPharmacy as LocalPharmacyIcon,
  LocalShipping as LocalShippingIcon,
  PersonAdd as PersonAddIcon,
  Update as UpdateIcon,
  Add as AddIcon,
  Inventory as InventoryIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// Placeholder data
const notifications = [
  {
    id: 1,
    type: 'warning',
    message: 'Low stock alert: Paracetamol is running low',
    time: '2 hours ago',
  },
  {
    id: 2,
    type: 'success',
    message: 'New prescription received from Dr. Smith',
    time: '3 hours ago',
  },
  {
    id: 3,
    type: 'warning',
    message: 'Inventory update required for Medical Supplies',
    time: '5 hours ago',
  },
];

const metrics = [
  {
    title: 'Total Patients',
    value: '1,234',
    icon: <PeopleIcon sx={{ fontSize: 40, color: '#4caf50' }} />,
    color: '#4caf50'
  },
  {
    title: 'Pending Prescriptions',
    value: '45',
    icon: <LocalPharmacyIcon sx={{ fontSize: 40, color: '#ff9800' }} />,
    color: '#ff9800'
  },
  {
    title: 'Expired Items',
    value: '12',
    icon: <WarningIcon sx={{ fontSize: 40, color: '#f44336' }} />,
    color: '#f44336'
  },
  {
    title: 'Being Treated',
    value: '89',
    icon: <HospitalIcon sx={{ fontSize: 40, color: '#9c27b0' }} />,
    color: '#9c27b0'
  },
  {
    title: 'Pending Deliveries',
    value: '8',
    icon: <LocalShippingIcon sx={{ fontSize: 40, color: '#2196f3' }} />,
    color: '#2196f3'
  }
];

const dashboardData = {
  totalPatients: 150,
  activePrescriptions: 45,
  lowStockItems: 12,
  totalInventory: 250,
  expiredItems: 8,
  recentActivity: [
    { type: 'prescription', description: 'New prescription for John Doe', time: '2 hours ago' },
    { type: 'inventory', description: 'Added 50 units of Paracetamol', time: '3 hours ago' },
    { type: 'patient', description: 'New patient registration: Jane Smith', time: '4 hours ago' },
  ],
};

function Dashboard() {
  const navigate = useNavigate();

  return (
    <Box sx={{ 
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: 3,
      p: 3
    }}>
      {/* Header Section */}
      <Box sx={{ 
        backgroundColor: 'white',
        p: 3,
        borderRadius: 2,
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        borderBottom: '1px solid',
        borderColor: 'divider'
      }}>
        <Typography variant="h4" sx={{ 
          fontWeight: 600,
          color: '#1e293b',
          mb: 1
        }}>
          Dashboard
        </Typography>
        <Typography variant="body1" sx={{ 
          color: '#64748b',
          fontSize: '1.1rem'
        }}>
          Overview of your pharmacy operations
        </Typography>
      </Box>
      
      {/* Quick Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {metrics.map((stat) => (
          <Grid item xs={12} sm={6} md={2.4} key={stat.title}>
            <Paper
              sx={{
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                height: 160,
                borderRadius: 3,
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                border: '1px solid',
                borderColor: 'rgba(0,0,0,0.08)',
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.12)'
                }
              }}
            >
              <Box sx={{ 
                color: stat.color, 
                mb: 2,
                backgroundColor: `${stat.color}15`,
                borderRadius: '50%',
                p: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {stat.icon}
              </Box>
              <Typography variant="h4" component="div" sx={{ 
                fontWeight: 600,
                color: '#1e293b',
                mb: 1,
                fontSize: '2rem'
              }}>
                {stat.value}
              </Typography>
              <Typography sx={{ 
                color: '#64748b',
                textAlign: 'center',
                fontSize: '1rem'
              }}>
                {stat.title}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Main Content */}
      <Grid container spacing={3}>
        {/* Notifications */}
        <Grid item xs={12} md={6}>
          <Card sx={{ 
            borderRadius: 3,
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            border: '1px solid',
            borderColor: 'rgba(0,0,0,0.08)'
          }}>
            <CardContent>
              <Typography variant="h6" sx={{ 
                fontWeight: 600,
                color: '#1e293b',
                mb: 2
              }}>
                Notifications
              </Typography>
              <List>
                {notifications.map((notification) => (
                  <React.Fragment key={notification.id}>
                    <ListItem sx={{ 
                      py: 1.5,
                      '&:hover': {
                        backgroundColor: '#f8fafc'
                      }
                    }}>
                      <ListItemIcon sx={{ minWidth: 40 }}>
                        {notification.type === 'warning' ? (
                          <WarningIcon sx={{ color: '#f59e0b' }} />
                        ) : (
                          <CheckCircleIcon sx={{ color: '#10b981' }} />
                        )}
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography sx={{ 
                            color: '#1e293b',
                            fontWeight: 500
                          }}>
                            {notification.message}
                          </Typography>
                        }
                        secondary={
                          <Typography sx={{ 
                            color: '#64748b',
                            fontSize: '0.875rem'
                          }}>
                            {notification.time}
                          </Typography>
                        }
                      />
                    </ListItem>
                    <Divider sx={{ borderColor: 'rgba(0,0,0,0.08)' }} />
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
            <CardActions sx={{ p: 2, borderTop: '1px solid', borderColor: 'rgba(0,0,0,0.08)' }}>
              <Button 
                size="small"
                sx={{ 
                  color: '#3b82f6',
                  '&:hover': {
                    backgroundColor: '#e2e8f0'
                  }
                }}
              >
                View All
              </Button>
            </CardActions>
          </Card>
        </Grid>

        {/* Recent Activity */}
        <Grid item xs={12} md={6}>
          <Card sx={{ 
            borderRadius: 3,
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            border: '1px solid',
            borderColor: 'rgba(0,0,0,0.08)'
          }}>
            <CardContent>
              <Typography variant="h6" sx={{ 
                fontWeight: 600,
                color: '#1e293b',
                mb: 2
              }}>
                Recent Activity
              </Typography>
              <List>
                {dashboardData.recentActivity.map((activity, index) => (
                  <React.Fragment key={index}>
                    <ListItem sx={{ 
                      py: 1.5,
                      '&:hover': {
                        backgroundColor: '#f8fafc'
                      }
                    }}>
                      <ListItemText
                        primary={
                          <Typography sx={{ 
                            color: '#1e293b',
                            fontWeight: 500
                          }}>
                            {activity.description}
                          </Typography>
                        }
                        secondary={
                          <Typography sx={{ 
                            color: '#64748b',
                            fontSize: '0.875rem'
                          }}>
                            {activity.time}
                          </Typography>
                        }
                      />
                    </ListItem>
                    <Divider sx={{ borderColor: 'rgba(0,0,0,0.08)' }} />
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
            <CardActions sx={{ p: 2, borderTop: '1px solid', borderColor: 'rgba(0,0,0,0.08)' }}>
              <Button 
                size="small"
                sx={{ 
                  color: '#3b82f6',
                  '&:hover': {
                    backgroundColor: '#e2e8f0'
                  }
                }}
              >
                View All
              </Button>
            </CardActions>
          </Card>
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12}>
          <Card sx={{ 
            borderRadius: 3,
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            border: '1px solid',
            borderColor: 'rgba(0,0,0,0.08)',
            p: 3
          }}>
            <Typography variant="h6" sx={{ 
              fontWeight: 600,
              color: '#1e293b',
              mb: 3
            }}>
              Quick Actions
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={3}>
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => navigate('/prescribe')}
                  sx={{
                    height: 100,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                    backgroundColor: '#4caf50',
                    borderRadius: 2,
                    boxShadow: '0 2px 8px rgba(76, 175, 80, 0.2)',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      backgroundColor: '#388e3c',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 12px rgba(76, 175, 80, 0.3)'
                    }
                  }}
                >
                  <Typography variant="subtitle1">New Prescription</Typography>
                  <Typography variant="caption">Create a new prescription</Typography>
                </Button>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<InventoryIcon />}
                  onClick={() => navigate('/restock')}
                  sx={{
                    height: 100,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                    backgroundColor: '#2196f3',
                    borderRadius: 2,
                    boxShadow: '0 2px 8px rgba(33, 150, 243, 0.2)',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      backgroundColor: '#1976d2',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 12px rgba(33, 150, 243, 0.3)'
                    }
                  }}
                >
                  <Typography variant="subtitle1">Order Supplies</Typography>
                  <Typography variant="caption">Place new orders</Typography>
                </Button>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<PersonAddIcon />}
                  onClick={() => navigate('/suppliers')}
                  sx={{
                    height: 100,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                    backgroundColor: '#ff9800',
                    borderRadius: 2,
                    boxShadow: '0 2px 8px rgba(255, 152, 0, 0.2)',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      backgroundColor: '#f57c00',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 12px rgba(255, 152, 0, 0.3)'
                    }
                  }}
                >
                  <Typography variant="subtitle1">Add Supplier</Typography>
                  <Typography variant="caption">Register new supplier</Typography>
                </Button>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<UpdateIcon />}
                  onClick={() => navigate('/inventory')}
                  sx={{
                    height: 100,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                    backgroundColor: '#9c27b0',
                    borderRadius: 2,
                    boxShadow: '0 2px 8px rgba(156, 39, 176, 0.2)',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      backgroundColor: '#7b1fa2',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 12px rgba(156, 39, 176, 0.3)'
                    }
                  }}
                >
                  <Typography variant="subtitle1">Update Inventory</Typography>
                  <Typography variant="caption">Manage stock levels</Typography>
                </Button>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard; 