import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Grid,
  Switch,
  FormControlLabel,
  Divider,
  Alert,
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  Security as SecurityIcon,
  Storage as StorageIcon,
  Email as EmailIcon,
  Palette as PaletteIcon,
} from '@mui/icons-material';
import { useTheme } from '../context/ThemeContext';

function Settings() {
  const { darkMode, toggleDarkMode } = useTheme();
  const [settings, setSettings] = useState({
    notifications: {
      lowStock: true,
      newPrescriptions: true,
      systemUpdates: true,
      emailNotifications: true,
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: 30,
      passwordExpiry: 90,
    },
    system: {
      autoBackup: true,
      backupFrequency: 'daily',
      retentionPeriod: 30,
    },
    email: {
      smtpServer: 'smtp.example.com',
      smtpPort: 587,
      username: 'admin@hospital.com',
      password: '********',
    },
    appearance: {
      darkMode: darkMode,
    },
  });

  useEffect(() => {
    setSettings(prev => ({
      ...prev,
      appearance: {
        ...prev.appearance,
        darkMode: darkMode,
      },
    }));
  }, [darkMode]);

  const handleNotificationChange = (setting) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [setting]: !prev.notifications[setting],
      },
    }));
  };

  const handleSecurityChange = (setting, value) => {
    setSettings(prev => ({
      ...prev,
      security: {
        ...prev.security,
        [setting]: value,
      },
    }));
  };

  const handleSystemChange = (setting, value) => {
    setSettings(prev => ({
      ...prev,
      system: {
        ...prev.system,
        [setting]: value,
      },
    }));
  };

  const handleEmailChange = (setting, value) => {
    setSettings(prev => ({
      ...prev,
      email: {
        ...prev.email,
        [setting]: value,
      },
    }));
  };

  const handleAppearanceChange = (setting, value) => {
    if (setting === 'darkMode') {
      toggleDarkMode();
    }
    setSettings(prev => ({
      ...prev,
      appearance: {
        ...prev.appearance,
        [setting]: value,
      },
    }));
  };

  const handleSave = () => {
    // TODO: Implement settings save functionality
    console.log('Saving settings:', settings);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        System Settings
      </Typography>

      <Grid container spacing={3}>
        {/* Notifications Settings */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <NotificationsIcon sx={{ mr: 1 }} />
              <Typography variant="h6">Notification Settings</Typography>
            </Box>
            <FormControlLabel
              control={
                <Switch
                  checked={settings.notifications.lowStock}
                  onChange={() => handleNotificationChange('lowStock')}
                />
              }
              label="Low Stock Alerts"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={settings.notifications.newPrescriptions}
                  onChange={() => handleNotificationChange('newPrescriptions')}
                />
              }
              label="New Prescription Notifications"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={settings.notifications.systemUpdates}
                  onChange={() => handleNotificationChange('systemUpdates')}
                />
              }
              label="System Update Notifications"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={settings.notifications.emailNotifications}
                  onChange={() => handleNotificationChange('emailNotifications')}
                />
              }
              label="Email Notifications"
            />
          </Paper>
        </Grid>

        {/* Security Settings */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <SecurityIcon sx={{ mr: 1 }} />
              <Typography variant="h6">Security Settings</Typography>
            </Box>
            <FormControlLabel
              control={
                <Switch
                  checked={settings.security.twoFactorAuth}
                  onChange={(e) => handleSecurityChange('twoFactorAuth', e.target.checked)}
                />
              }
              label="Two-Factor Authentication"
            />
            <TextField
              fullWidth
              label="Session Timeout (minutes)"
              type="number"
              value={settings.security.sessionTimeout}
              onChange={(e) => handleSecurityChange('sessionTimeout', parseInt(e.target.value))}
              sx={{ mt: 2 }}
            />
            <TextField
              fullWidth
              label="Password Expiry (days)"
              type="number"
              value={settings.security.passwordExpiry}
              onChange={(e) => handleSecurityChange('passwordExpiry', parseInt(e.target.value))}
              sx={{ mt: 2 }}
            />
          </Paper>
        </Grid>

        {/* System Settings */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <StorageIcon sx={{ mr: 1 }} />
              <Typography variant="h6">System Settings</Typography>
            </Box>
            <FormControlLabel
              control={
                <Switch
                  checked={settings.system.autoBackup}
                  onChange={(e) => handleSystemChange('autoBackup', e.target.checked)}
                />
              }
              label="Automatic Backup"
            />
            <TextField
              fullWidth
              label="Backup Frequency"
              select
              value={settings.system.backupFrequency}
              onChange={(e) => handleSystemChange('backupFrequency', e.target.value)}
              sx={{ mt: 2 }}
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </TextField>
            <TextField
              fullWidth
              label="Retention Period (days)"
              type="number"
              value={settings.system.retentionPeriod}
              onChange={(e) => handleSystemChange('retentionPeriod', parseInt(e.target.value))}
              sx={{ mt: 2 }}
            />
          </Paper>
        </Grid>

        {/* Email Settings */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <EmailIcon sx={{ mr: 1 }} />
              <Typography variant="h6">Email Settings</Typography>
            </Box>
            <TextField
              fullWidth
              label="SMTP Server"
              value={settings.email.smtpServer}
              onChange={(e) => handleEmailChange('smtpServer', e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="SMTP Port"
              type="number"
              value={settings.email.smtpPort}
              onChange={(e) => handleEmailChange('smtpPort', parseInt(e.target.value))}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Username"
              value={settings.email.username}
              onChange={(e) => handleEmailChange('username', e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={settings.email.password}
              onChange={(e) => handleEmailChange('password', e.target.value)}
              sx={{ mb: 2 }}
            />
          </Paper>
        </Grid>

        {/* Appearance Settings */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <PaletteIcon sx={{ mr: 1 }} />
              <Typography variant="h6">Appearance Settings</Typography>
            </Box>
            <FormControlLabel
              control={
                <Switch
                  checked={settings.appearance.darkMode}
                  onChange={(e) => handleAppearanceChange('darkMode', e.target.checked)}
                />
              }
              label="Dark Mode"
            />
          </Paper>
        </Grid>
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          sx={{ minWidth: 200 }}
        >
          Save Changes
        </Button>
      </Box>
    </Box>
  );
}

export default Settings; 