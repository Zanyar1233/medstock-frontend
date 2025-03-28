import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import Prescriptions from './pages/Prescriptions';
import Analytics from './pages/Analytics';
import StaffRecords from './pages/StaffRecords';
import Suppliers from './pages/Suppliers';
import Settings from './pages/Settings';

// Components
import Layout from './components/Layout';

// Context
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

function NotFound() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        textAlign: 'center',
      }}
    >
      <Typography variant="h1" component="h1" gutterBottom>
        404
      </Typography>
      <Typography variant="h4" component="h2" gutterBottom>
        Page Not Found
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        The page you are looking for doesn't exist or has been moved.
      </Typography>
      <Button variant="contained" color="primary" href="/">
        Go to Dashboard
      </Button>
    </Box>
  );
}

function AppContent() {
  const { isAuthenticated } = useAuth();

  return (
    <Box sx={{ display: 'flex' }}>
      {isAuthenticated ? (
        <>
          <Layout />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/prescriptions" element={<Prescriptions />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/staff-records" element={<StaffRecords />} />
              <Route path="/suppliers" element={<Suppliers />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Box>
        </>
      ) : (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      )}
    </Box>
  );
}

function App() {
  return (
    <ThemeProvider>
      <CssBaseline />
      <Router>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
