import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Switch,
  FormControlLabel,
  TextField,
  Button,
  Divider,
  Alert,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Avatar,
  IconButton,
} from '@mui/material';
import {
  Settings as SettingsIcon,
  Notifications as NotificationsIcon,
  Security as SecurityIcon,
  Backup as BackupIcon,
  Language as LanguageIcon,
  Storage as StorageIcon,
  Update as UpdateIcon,
  Save as SaveIcon,
  PhotoCamera as PhotoCameraIcon,
  Person as PersonIcon,
} from '@mui/icons-material';

function Settings() {
  const [settings, setSettings] = useState({
    // Profile Settings
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1234567890',
    role: 'Staff',
    profilePicture: null,

    // System Settings
    systemNotifications: true,
      autoBackup: true,
      backupFrequency: 'daily',
    dataRetention: '30',
    language: 'en',
    timezone: 'UTC',
    
    // Security Settings
    twoFactorAuth: false,
    sessionTimeout: '30',
    passwordPolicy: 'medium',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    
    // Storage Settings
    maxStorage: '50',
    compressionEnabled: true,
    
    // Update Settings
    autoUpdate: true,
    updateChannel: 'stable',
  });

  const handleChange = (name) => (event) => {
    setSettings({
      ...settings,
      [name]: event.target.value,
    });
  };

  const handleToggle = (name) => (event) => {
    setSettings({
      ...settings,
      [name]: event.target.checked,
    });
  };

  const handleSave = () => {
    // Implement save functionality
    console.log('Settings saved:', settings);
  };

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Handle file upload
      console.log('Profile picture changed:', file);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 600 }}>
        Settings
      </Typography>

      <Grid container spacing={3}>
        {/* Profile Settings */}
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <PersonIcon sx={{ mr: 1, color: '#3b82f6' }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Profile Settings
                </Typography>
            </Box>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
                <Box sx={{ position: 'relative', mb: 2 }}>
                  <Avatar
                    src={settings.profilePicture}
                    sx={{ width: 100, height: 100, mb: 1 }}
                  >
                    {settings.name?.charAt(0)}
                  </Avatar>
                  <IconButton
                    component="label"
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      backgroundColor: '#3b82f6',
                      '&:hover': { backgroundColor: '#2563eb' },
                    }}
                  >
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={handleProfilePictureChange}
                    />
                    <PhotoCameraIcon sx={{ color: 'white' }} />
                  </IconButton>
                </Box>
              </Box>

              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    value={settings.name}
                    onChange={handleChange('name')}
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    value={settings.email}
                    onChange={handleChange('email')}
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    value={settings.phone}
                    onChange={handleChange('phone')}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Role"
                    value={settings.role}
                    disabled
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Password Change */}
          <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', mt: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <SecurityIcon sx={{ mr: 1, color: '#ef4444' }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Change Password
                </Typography>
              </Box>
              
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Current Password"
                    type="password"
                    value={settings.currentPassword}
                    onChange={handleChange('currentPassword')}
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="New Password"
                    type="password"
                    value={settings.newPassword}
                    onChange={handleChange('newPassword')}
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Confirm New Password"
                    type="password"
                    value={settings.confirmPassword}
                    onChange={handleChange('confirmPassword')}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* System Preferences */}
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <SettingsIcon sx={{ mr: 1, color: '#3b82f6' }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  System Preferences
                </Typography>
            </Box>
              
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Language</InputLabel>
                    <Select
                      value={settings.language}
                      onChange={handleChange('language')}
                      label="Language"
                    >
                      <MenuItem value="en">English</MenuItem>
                      <MenuItem value="es">Spanish</MenuItem>
                      <MenuItem value="fr">French</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Timezone</InputLabel>
                    <Select
                      value={settings.timezone}
                      onChange={handleChange('timezone')}
                      label="Timezone"
                    >
                      <MenuItem value="UTC">UTC</MenuItem>
                      <MenuItem value="EST">Eastern Time</MenuItem>
                      <MenuItem value="PST">Pacific Time</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                
                <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                        checked={settings.systemNotifications}
                        onChange={handleToggle('systemNotifications')}
                      />
                    }
                    label="System Notifications"
                  />
                </Grid>
        </Grid>
            </CardContent>
          </Card>

          {/* Backup & Storage */}
          <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', mt: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <BackupIcon sx={{ mr: 1, color: '#10b981' }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Backup & Storage
                </Typography>
            </Box>
              
              <Grid container spacing={2}>
                <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                        checked={settings.autoBackup}
                        onChange={handleToggle('autoBackup')}
                />
              }
              label="Automatic Backup"
            />
                </Grid>
                
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Backup Frequency</InputLabel>
                    <Select
                      value={settings.backupFrequency}
                      onChange={handleChange('backupFrequency')}
              label="Backup Frequency"
                    >
                      <MenuItem value="daily">Daily</MenuItem>
                      <MenuItem value="weekly">Weekly</MenuItem>
                      <MenuItem value="monthly">Monthly</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                
                <Grid item xs={12}>
            <TextField
              fullWidth
                    label="Data Retention (days)"
              type="number"
                    value={settings.dataRetention}
                    onChange={handleChange('dataRetention')}
            />
        </Grid>

                <Grid item xs={12}>
            <TextField
              fullWidth
                    label="Maximum Storage (GB)"
                    type="number"
                    value={settings.maxStorage}
                    onChange={handleChange('maxStorage')}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', mt: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <SecurityIcon sx={{ mr: 1, color: '#ef4444' }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Security Settings
                </Typography>
              </Box>
              
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.twoFactorAuth}
                        onChange={handleToggle('twoFactorAuth')}
                      />
                    }
                    label="Two-Factor Authentication"
                  />
                </Grid>
                
                <Grid item xs={12}>
            <TextField
              fullWidth
                    label="Session Timeout (minutes)"
                    type="number"
                    value={settings.sessionTimeout}
                    onChange={handleChange('sessionTimeout')}
                  />
        </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Password Policy</InputLabel>
                    <Select
                      value={settings.passwordPolicy}
                      onChange={handleChange('passwordPolicy')}
                      label="Password Policy"
                    >
                      <MenuItem value="low">Low</MenuItem>
                      <MenuItem value="medium">Medium</MenuItem>
                      <MenuItem value="high">High</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Update Settings */}
          <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', mt: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <UpdateIcon sx={{ mr: 1, color: '#f59e0b' }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Update Settings
                </Typography>
            </Box>
              
              <Grid container spacing={2}>
                <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                        checked={settings.autoUpdate}
                        onChange={handleToggle('autoUpdate')}
                      />
                    }
                    label="Automatic Updates"
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Update Channel</InputLabel>
                    <Select
                      value={settings.updateChannel}
                      onChange={handleChange('updateChannel')}
                      label="Update Channel"
                    >
                      <MenuItem value="stable">Stable</MenuItem>
                      <MenuItem value="beta">Beta</MenuItem>
                      <MenuItem value="alpha">Alpha</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          startIcon={<SaveIcon />}
          onClick={handleSave}
          sx={{
            backgroundColor: '#3b82f6',
            '&:hover': {
              backgroundColor: '#2563eb',
            }
          }}
        >
          Save Changes
        </Button>
      </Box>
    </Box>
  );
}

export default Settings; 