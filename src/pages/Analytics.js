import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {
  BarChart,
  LineChart,
  PieChart,
} from '@mui/x-charts';

function Analytics() {
  // Sample data for charts
  const prescriptionData = [
    { id: 1, name: 'Paracetamol', value: 150 },
    { id: 2, name: 'Amoxicillin', value: 120 },
    { id: 3, name: 'Ibuprofen', value: 90 },
    { id: 4, name: 'Aspirin', value: 80 },
    { id: 5, name: 'Omeprazole', value: 70 },
  ];

  const monthlyTrendData = [
    { id: 1, month: 'Jan', count: 65 },
    { id: 2, month: 'Feb', count: 78 },
    { id: 3, month: 'Mar', count: 90 },
    { id: 4, month: 'Apr', count: 85 },
    { id: 5, month: 'May', count: 95 },
    { id: 6, month: 'Jun', count: 100 },
  ];

  const inventoryUsageData = [
    { id: 1, name: 'Tablets', usage: 40 },
    { id: 2, name: 'Injections', usage: 30 },
    { id: 3, name: 'Syrups', usage: 20 },
    { id: 4, name: 'Creams', usage: 10 },
  ];

  const topPerformingItems = [
    { id: 1, name: 'Paracetamol', prescriptions: 150, revenue: 1500 },
    { id: 2, name: 'Amoxicillin', prescriptions: 120, revenue: 2400 },
    { id: 3, name: 'Ibuprofen', prescriptions: 90, revenue: 900 },
    { id: 4, name: 'Aspirin', prescriptions: 80, revenue: 800 },
    { id: 5, name: 'Omeprazole', prescriptions: 70, revenue: 2100 },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Analytics Dashboard
      </Typography>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6">Total Prescriptions</Typography>
            <Typography variant="h4">1,250</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6">Low Stock Items</Typography>
            <Typography variant="h4">12</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6">Monthly Revenue</Typography>
            <Typography variant="h4">$25,000</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6">Active Patients</Typography>
            <Typography variant="h4">450</Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Charts */}
      <Grid container spacing={3}>
        {/* Most Prescribed Medicines */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Most Prescribed Medicines
            </Typography>
            <BarChart
              series={[
                {
                  data: prescriptionData.map((item) => item.value),
                },
              ]}
              xAxis={[{ data: prescriptionData.map((item) => item.name), scaleType: 'band' }]}
              height={300}
            />
          </Paper>
        </Grid>

        {/* Monthly Prescription Trends */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Monthly Prescription Trends
            </Typography>
            <LineChart
              series={[
                {
                  data: monthlyTrendData.map((item) => item.count),
                },
              ]}
              xAxis={[{ data: monthlyTrendData.map((item) => item.month), scaleType: 'band' }]}
              height={300}
            />
          </Paper>
        </Grid>

        {/* Inventory Usage by Category */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Inventory Usage by Category
            </Typography>
            <PieChart
              series={[
                {
                  data: inventoryUsageData.map((item) => ({
                    id: item.id,
                    value: item.usage,
                    label: item.name,
                  })),
                },
              ]}
              height={300}
            />
          </Paper>
        </Grid>

        {/* Top Performing Items */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Top Performing Items
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Medicine</TableCell>
                    <TableCell align="right">Prescriptions</TableCell>
                    <TableCell align="right">Revenue</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {topPerformingItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell align="right">{item.prescriptions}</TableCell>
                      <TableCell align="right">${item.revenue}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Analytics; 