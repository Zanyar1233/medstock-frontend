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
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  LocalHospital as HospitalIcon,
  Medication as MedicationIcon,
  People as PeopleIcon,
  LocalShipping as ShippingIcon,
  TrendingUp as TrendingUpIcon,
  Inventory as InventoryIcon,
  Error as ErrorIcon,
} from '@mui/icons-material';

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

const quickStats = [
  {
    title: 'Total Patients',
    value: '1,234',
    icon: <PeopleIcon sx={{ fontSize: 40 }} />,
    color: '#1976d2',
  },
  {
    title: 'Active Prescriptions',
    value: '89',
    icon: <MedicationIcon sx={{ fontSize: 40 }} />,
    color: '#2e7d32',
  },
  {
    title: 'Low Stock Items',
    value: '12',
    icon: <WarningIcon sx={{ fontSize: 40 }} />,
    color: '#ed6c02',
  },
  {
    title: 'Pending Deliveries',
    value: '5',
    icon: <ShippingIcon sx={{ fontSize: 40 }} />,
    color: '#9c27b0',
  },
  {
    title: 'Expired Items',
    value: '8',
    icon: <ErrorIcon sx={{ fontSize: 40 }} />,
    color: '#d32f2f',
  },
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
  const StatCard = ({ title, value, icon, color }) => (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Box sx={{ 
            backgroundColor: `${color}15`, 
            borderRadius: '50%', 
            p: 1, 
            mr: 2,
            display: 'flex'
          }}>
            {icon}
          </Box>
          <Typography variant="h6" component="div">
            {title}
          </Typography>
        </Box>
        <Typography variant="h4" component="div" sx={{ mb: 1 }}>
          {value}
        </Typography>
      </CardContent>
    </Card>
  );

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      
      {/* Quick Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {quickStats.map((stat) => (
          <Grid item xs={12} sm={6} md={2.4} key={stat.title}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                height: 140,
              }}
            >
              <Box sx={{ color: stat.color, mb: 1 }}>{stat.icon}</Box>
              <Typography variant="h4" component="div">
                {stat.value}
              </Typography>
              <Typography color="text.secondary" variant="subtitle1">
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
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Notifications
              </Typography>
              <List>
                {notifications.map((notification) => (
                  <React.Fragment key={notification.id}>
                    <ListItem>
                      <ListItemIcon>
                        {notification.type === 'warning' ? (
                          <WarningIcon color="warning" />
                        ) : (
                          <CheckCircleIcon color="success" />
                        )}
                      </ListItemIcon>
                      <ListItemText
                        primary={notification.message}
                        secondary={notification.time}
                      />
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
            <CardActions>
              <Button size="small">View All</Button>
            </CardActions>
          </Card>
        </Grid>

        {/* Recent Activity */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Activity
              </Typography>
              <List>
                {dashboardData.recentActivity.map((activity, index) => (
                  <React.Fragment key={index}>
                    <ListItem>
                      <ListItemText
                        primary={activity.description}
                        secondary={activity.time}
                      />
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
            <CardActions>
              <Button size="small">View All</Button>
            </CardActions>
          </Card>
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Quick Actions
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                  <Button
                    variant="outlined"
                    startIcon={<MedicationIcon />}
                    fullWidth
                  >
                    New Prescription
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Button
                    variant="outlined"
                    startIcon={<HospitalIcon />}
                    fullWidth
                  >
                    Add Patient
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Button
                    variant="outlined"
                    startIcon={<ShippingIcon />}
                    fullWidth
                  >
                    Order Supplies
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Button
                    variant="outlined"
                    startIcon={<PeopleIcon />}
                    fullWidth
                  >
                    Staff Schedule
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard; 