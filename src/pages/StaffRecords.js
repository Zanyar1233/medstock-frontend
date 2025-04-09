import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Collapse,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
  MedicalServices as MedicalIcon,
  Assignment as AssignmentIcon,
  EventNote as EventNoteIcon,
  School as SchoolIcon,
  EmojiEvents as AchievementIcon,
  Warning as WarningIcon,
  Person as PersonIcon,
  LocalHospital as LocalHospitalIcon,
  Medication as MedicationIcon,
  Event as EventIcon,
} from '@mui/icons-material';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent,
} from '@mui/lab';

// Update initial staff data structure
const initialStaff = [
  {
    id: 'S001',
    name: 'Dr. Sarah Smith',
    role: 'Pharmacist',
    department: 'Pharmacy',
    status: 'Active',
    contactNumber: '+1234567890',
    email: 'sarah.smith@example.com',
    dateOfJoining: '2024-01-01',
    qualifications: ['PharmD', 'BCPS'],
    specializations: ['Clinical Pharmacy', 'Medication Therapy Management'],
    yearsOfExperience: 8,
    emergencyContact: {
      name: 'John Smith',
      relationship: 'Spouse',
      phone: '+1987654321'
    },
    performanceMetrics: {
      prescriptionsPerMonth: 150,
      prescriptionsPerMonthTarget: 200,
      inventoryAccuracyRate: 98.5,
      inventoryAccuracyRateTarget: 95
    },
    activityLog: [
      {
        action: 'Created',
        timestamp: '2024-01-01T09:00:00',
        details: 'Staff member created'
      },
      {
        action: 'Training Completed',
        timestamp: '2024-01-15T14:30:00',
        details: 'Completed new medication safety training'
      }
    ]
  }
];

function StaffRow({ staff, onEdit, onDelete, onStatusChange }) {
  const [open, setOpen] = useState(false);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return {
          color: '#4caf50',
          backgroundColor: '#e8f5e9',
          borderColor: '#c8e6c9'
        };
      case 'on leave':
        return {
          color: '#ff9800',
          backgroundColor: '#fff3e0',
          borderColor: '#ffe0b2'
        };
      case 'inactive':
        return {
          color: '#f44336',
          backgroundColor: '#ffebee',
          borderColor: '#ffcdd2'
        };
      default:
        return {
          color: '#9e9e9e',
          backgroundColor: '#f5f5f5',
          borderColor: '#eeeeee'
        };
    }
  };

  const StatusChip = ({ status }) => {
    const colors = getStatusColor(status);
    return (
      <Typography
        sx={{
          color: colors.color,
          fontWeight: 500,
          fontSize: '0.875rem',
        }}
      >
        {status}
      </Typography>
    );
  };

  return (
    <>
      <TableRow 
        onClick={() => setOpen(!open)}
        sx={{ 
          '& > *': { borderBottom: 'unset' },
          cursor: 'pointer',
          '&:hover': {
            backgroundColor: 'rgba(0,0,0,0.04)'
          }
        }}
      >
        <TableCell align="center">{staff.id}</TableCell>
        <TableCell align="center">{staff.name}</TableCell>
        <TableCell align="center">{staff.role}</TableCell>
        <TableCell align="center">{staff.department}</TableCell>
        <TableCell align="center">
          <FormControl size="small" variant="standard" sx={{ minWidth: 120 }}>
            <Select
              value={staff.status}
              onChange={(e) => {
                e.stopPropagation();
                onStatusChange(staff.id, e.target.value);
              }}
              onClick={(e) => e.stopPropagation()}
              sx={{ 
                '& .MuiSelect-select': {
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  py: 0.5,
                  px: 2,
                  backgroundColor: 'transparent',
                  width: '100%'
                },
                '& .MuiSelect-root': {
                  backgroundColor: 'transparent',
                  width: '100%'
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  border: 'none'
                },
                width: '100%'
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    backgroundColor: '#fff',
                    '& .MuiMenuItem-root': {
                      py: 1,
                      px: 2,
                      width: '100%'
                    },
                    '& .MuiList-root': {
                      width: '100%',
                      padding: 0
                    }
                  }
                },
                anchorOrigin: {
                  vertical: 'bottom',
                  horizontal: 'center'
                },
                transformOrigin: {
                  vertical: 'top',
                  horizontal: 'center'
                }
              }}
              renderValue={(value) => <StatusChip status={value} />}
              disableUnderline
            >
              <MenuItem value="Active">
                <StatusChip status="Active" />
              </MenuItem>
              <MenuItem value="On Leave">
                <StatusChip status="On Leave" />
              </MenuItem>
              <MenuItem value="Inactive">
                <StatusChip status="Inactive" />
              </MenuItem>
            </Select>
          </FormControl>
        </TableCell>
        <TableCell align="center">
          <IconButton size="small" onClick={(e) => {
            e.stopPropagation();
            onEdit(staff);
          }}>
            <EditIcon />
          </IconButton>
          <IconButton size="small" onClick={(e) => {
            e.stopPropagation();
            onDelete(staff.id);
          }}>
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ 
              backgroundColor: '#f8fafc',
              p: 3,
              borderRadius: 1,
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              '& > *': {
                backgroundColor: 'transparent',
              }
            }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <Paper elevation={0} sx={{ p: 2, height: '100%', backgroundColor: '#fff' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <MedicalIcon sx={{ mr: 1, color: 'primary.main' }} />
                      <Typography variant="subtitle2" color="text.secondary">
                        Contact Information
                      </Typography>
                    </Box>
                    <List dense>
                      <ListItem>
                        <ListItemText 
                          primary={<Typography variant="body2" color="text.secondary">Email</Typography>}
                          secondary={
                            <Typography variant="body1" sx={{ mt: 0.5 }}>
                              {staff.email}
                            </Typography>
                          }
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText 
                          primary={<Typography variant="body2" color="text.secondary">Phone</Typography>}
                          secondary={
                            <Typography variant="body1" sx={{ mt: 0.5 }}>
                              {staff.contactNumber}
                            </Typography>
                          }
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText 
                          primary={<Typography variant="body2" color="text.secondary">Emergency Contact</Typography>}
                          secondary={
                            <Typography variant="body1" sx={{ mt: 0.5 }}>
                              {staff.emergencyContact?.name} ({staff.emergencyContact?.relationship}) - {staff.emergencyContact?.phone}
                            </Typography>
                          }
                        />
                      </ListItem>
                    </List>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Paper elevation={0} sx={{ p: 2, height: '100%', backgroundColor: '#fff' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <SchoolIcon sx={{ mr: 1, color: 'primary.main' }} />
                      <Typography variant="subtitle2" color="text.secondary">
                        Professional Details
                      </Typography>
                    </Box>
                    <List dense>
                      <ListItem>
                        <ListItemText 
                          primary={<Typography variant="body2" color="text.secondary">Years of Experience</Typography>}
                          secondary={
                            <Typography variant="body1" sx={{ mt: 0.5 }}>
                              {staff.yearsOfExperience} years
                            </Typography>
                          }
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText 
                          primary={<Typography variant="body2" color="text.secondary">Qualifications</Typography>}
                          secondary={
                            <Box sx={{ mt: 0.5 }}>
                              {(staff.qualifications || []).map((qual, index) => (
                                <Chip
                                  key={index}
                                  label={qual}
                                  size="small"
                                  sx={{ mr: 0.5, mb: 0.5 }}
                                />
                              ))}
                            </Box>
                          }
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText 
                          primary={<Typography variant="body2" color="text.secondary">Specializations</Typography>}
                          secondary={
                            <Box sx={{ mt: 0.5 }}>
                              {(staff.specializations || []).map((spec, index) => (
                                <Chip
                                  key={index}
                                  label={spec}
                                  size="small"
                                  sx={{ mr: 0.5, mb: 0.5 }}
                                />
                              ))}
                            </Box>
                          }
                        />
                      </ListItem>
                    </List>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Paper elevation={0} sx={{ p: 2, height: '100%', backgroundColor: '#fff' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <AssignmentIcon sx={{ mr: 1, color: 'primary.main' }} />
                      <Typography variant="subtitle2" color="text.secondary">
                        Performance Metrics
                      </Typography>
                    </Box>
                    <TableContainer>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell sx={{ fontWeight: 500, border: 'none' }}>Metric</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 500, border: 'none' }}>Value</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 500, border: 'none' }}>Target</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 500, border: 'none' }}>Status</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <TableCell sx={{ border: 'none' }}>Prescriptions per Month</TableCell>
                            <TableCell align="center" sx={{ border: 'none' }}>{staff.performanceMetrics?.prescriptionsPerMonth || 0}</TableCell>
                            <TableCell align="center" sx={{ border: 'none' }}>{staff.performanceMetrics?.prescriptionsPerMonthTarget || 0}</TableCell>
                            <TableCell align="center" sx={{ border: 'none' }}>
                              <Chip 
                                label={staff.performanceMetrics?.prescriptionsPerMonth >= staff.performanceMetrics?.prescriptionsPerMonthTarget ? "On Target" : "Below Target"} 
                                size="small"
                                color={staff.performanceMetrics?.prescriptionsPerMonth >= staff.performanceMetrics?.prescriptionsPerMonthTarget ? "success" : "warning"}
                              />
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell sx={{ border: 'none' }}>Inventory Accuracy Rate</TableCell>
                            <TableCell align="center" sx={{ border: 'none' }}>{staff.performanceMetrics?.inventoryAccuracyRate || 0}%</TableCell>
                            <TableCell align="center" sx={{ border: 'none' }}>{staff.performanceMetrics?.inventoryAccuracyRateTarget || 0}%</TableCell>
                            <TableCell align="center" sx={{ border: 'none' }}>
                              <Chip 
                                label={staff.performanceMetrics?.inventoryAccuracyRate >= staff.performanceMetrics?.inventoryAccuracyRateTarget ? "On Target" : "Below Target"} 
                                size="small"
                                color={staff.performanceMetrics?.inventoryAccuracyRate >= staff.performanceMetrics?.inventoryAccuracyRateTarget ? "success" : "warning"}
                              />
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Activity Log
                  </Typography>
                  <TableContainer component={Paper} variant="outlined">
                    <Table size="small">
                      <TableHead>
                        <TableRow sx={{ backgroundColor: '#f8fafc' }}>
                          <TableCell align="center" sx={{ fontWeight: 500 }}>Date</TableCell>
                          <TableCell align="center" sx={{ fontWeight: 500 }}>Time</TableCell>
                          <TableCell align="center" sx={{ fontWeight: 500 }}>Action</TableCell>
                          <TableCell align="center" sx={{ fontWeight: 500 }}>Details</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {(staff.activityLog || []).map((log, index) => {
                          const [date, time] = log.timestamp.split('T');
                          return (
                            <TableRow key={index}>
                              <TableCell align="center">{date}</TableCell>
                              <TableCell align="center">{time.split('.')[0]}</TableCell>
                              <TableCell align="center">{log.action}</TableCell>
                              <TableCell align="center">{log.details}</TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

function StaffRecords() {
  const [staff, setStaff] = useState(initialStaff);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    role: 'Pharmacist',
    department: 'Pharmacy',
    email: '',
    phone: '',
    dateOfJoining: new Date().toISOString().split('T')[0],
    qualifications: '',
    specializations: '',
    yearsOfExperience: '',
    emergencyContact: {
      name: '',
      relationship: '',
      phone: ''
    },
    status: 'Active',
    performanceMetrics: {
      prescriptionsPerMonth: '',
      prescriptionsPerMonthTarget: '',
      inventoryAccuracyRate: '',
      inventoryAccuracyRateTarget: ''
    },
    activityLog: [{
      action: 'Created',
      timestamp: new Date().toISOString(),
      details: 'Staff member created'
    }]
  });

  const handleStatusChange = (id, newStatus) => {
    setStaff(prev =>
      prev.map(staff =>
        staff.id === id
          ? { ...staff, status: newStatus }
          : staff
      )
    );
  };

  const handleEdit = (staff) => {
    setSelectedStaff(staff);
    setOpenDialog(true);
  };

  const handleDelete = (id) => {
    setStaff(prev => prev.filter(staff => staff.id !== id));
  };

  const handleOpenDialog = (selectedStaffMember = null) => {
    if (selectedStaffMember) {
      setSelectedStaff(selectedStaffMember);
      setFormData({
        id: selectedStaffMember.id,
        name: selectedStaffMember.name,
        role: selectedStaffMember.role,
        department: selectedStaffMember.department,
        email: selectedStaffMember.email,
        phone: selectedStaffMember.contactNumber,
        dateOfJoining: selectedStaffMember.dateOfJoining || new Date().toISOString().split('T')[0],
        qualifications: selectedStaffMember.qualifications.join(', '),
        specializations: selectedStaffMember.specializations?.join(', ') || '',
        yearsOfExperience: selectedStaffMember.yearsOfExperience,
        emergencyContact: {
          name: selectedStaffMember.emergencyContact?.name || '',
          relationship: selectedStaffMember.emergencyContact?.relationship || '',
          phone: selectedStaffMember.emergencyContact?.phone || ''
        },
        status: selectedStaffMember.status,
        performanceMetrics: {
          prescriptionsPerMonth: selectedStaffMember.performanceMetrics?.prescriptionsPerMonth || '',
          prescriptionsPerMonthTarget: selectedStaffMember.performanceMetrics?.prescriptionsPerMonthTarget || '',
          inventoryAccuracyRate: selectedStaffMember.performanceMetrics?.inventoryAccuracyRate || '',
          inventoryAccuracyRateTarget: selectedStaffMember.performanceMetrics?.inventoryAccuracyRateTarget || ''
        },
        activityLog: selectedStaffMember.activityLog || [{
          action: 'Created',
          timestamp: new Date().toISOString(),
          details: 'Staff member created'
        }]
      });
    } else {
      setSelectedStaff(null);
      const newId = `S${String(staff.length + 1).padStart(3, '0')}`;
      setFormData({
        id: newId,
        name: '',
        role: 'Pharmacist',
        department: 'Pharmacy',
        email: '',
        phone: '',
        dateOfJoining: new Date().toISOString().split('T')[0],
        qualifications: '',
        specializations: '',
        yearsOfExperience: '',
        emergencyContact: {
          name: '',
          relationship: '',
          phone: ''
        },
        status: 'Active',
        performanceMetrics: {
          prescriptionsPerMonth: '',
          prescriptionsPerMonthTarget: '',
          inventoryAccuracyRate: '',
          inventoryAccuracyRateTarget: ''
        },
        activityLog: [{
          action: 'Created',
          timestamp: new Date().toISOString(),
          details: 'Staff member created'
        }]
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedStaff(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = () => {
    const newStaff = {
      id: formData.id,
      name: formData.name,
      role: formData.role,
      department: formData.department,
      email: formData.email,
      contactNumber: formData.phone,
      dateOfJoining: formData.dateOfJoining,
      qualifications: formData.qualifications.split(',').map(item => item.trim()).filter(Boolean),
      specializations: formData.specializations.split(',').map(item => item.trim()).filter(Boolean),
      yearsOfExperience: formData.yearsOfExperience,
      emergencyContact: {
        name: formData.emergencyContact.name,
        relationship: formData.emergencyContact.relationship,
        phone: formData.emergencyContact.phone
      },
      status: formData.status,
      performanceMetrics: {
        prescriptionsPerMonth: Number(formData.performanceMetrics.prescriptionsPerMonth) || 0,
        prescriptionsPerMonthTarget: Number(formData.performanceMetrics.prescriptionsPerMonthTarget) || 0,
        inventoryAccuracyRate: Number(formData.performanceMetrics.inventoryAccuracyRate) || 0,
        inventoryAccuracyRateTarget: Number(formData.performanceMetrics.inventoryAccuracyRateTarget) || 0
      },
      activityLog: formData.activityLog
    };

    if (selectedStaff) {
      setStaff(prev => prev.map(s => 
        s.id === selectedStaff.id ? newStaff : s
      ));
    } else {
      setStaff(prev => [...prev, newStaff]);
    }
    handleCloseDialog();
  };

  const filteredStaff = staff.filter(staff =>
    Object.values(staff).some(value =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box sx={{ 
        backgroundColor: 'white',
        p: 3,
        borderRadius: 2,
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          Staff Records
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <TextField
            size="small"
            placeholder="Search staff..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />,
            }}
            sx={{ width: 300 }}
          />
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
            sx={{
              borderRadius: 2,
              px: 3,
              py: 1,
              backgroundColor: 'primary.main',
              '&:hover': {
                backgroundColor: 'primary.dark',
              }
            }}
          >
            Add Staff Member
          </Button>
        </Box>
      </Box>

      <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f8fafc' }}>
              <TableCell align="center" sx={{ fontWeight: 500 }}>Staff ID</TableCell>
              <TableCell align="center" sx={{ fontWeight: 500 }}>Name</TableCell>
              <TableCell align="center" sx={{ fontWeight: 500 }}>Role</TableCell>
              <TableCell align="center" sx={{ fontWeight: 500 }}>Department</TableCell>
              <TableCell align="center" sx={{ fontWeight: 500 }}>Status</TableCell>
              <TableCell align="center" sx={{ fontWeight: 500 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredStaff.map((staff) => (
              <StaffRow
                key={staff.id}
                staff={staff}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onStatusChange={handleStatusChange}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          }
        }}
      >
        <DialogTitle sx={{ 
          backgroundColor: '#f8fafc',
          borderBottom: '1px solid',
          borderColor: 'divider',
          py: 2,
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}>
          <PersonIcon color="primary" />
          {selectedStaff ? 'Edit Staff Member' : 'Add New Staff Member'}
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Personal Information Section */}
            <Box>
              <Typography variant="subtitle1" color="primary" sx={{ mb: 2, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                <PersonIcon fontSize="small" />
                Personal Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    required
                    label="Staff ID"
                    name="id"
                    value={formData.id}
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    required
                    label="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    required
                    label="Date of Joining"
                    name="dateOfJoining"
                    type="date"
                    value={formData.dateOfJoining}
                    onChange={handleInputChange}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth required>
                    <InputLabel>Role</InputLabel>
                    <Select
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      label="Role"
                    >
                      <MenuItem value="Pharmacist">Pharmacist</MenuItem>
                      <MenuItem value="Nurse">Nurse</MenuItem>
                      <MenuItem value="Doctor">Doctor</MenuItem>
                      <MenuItem value="Administrator">Administrator</MenuItem>
                      <MenuItem value="Technician">Technician</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth required>
                    <InputLabel>Department</InputLabel>
                    <Select
                      name="department"
                      value={formData.department}
                      onChange={handleInputChange}
                      label="Department"
                    >
                      <MenuItem value="Pharmacy">Pharmacy</MenuItem>
                      <MenuItem value="Emergency">Emergency</MenuItem>
                      <MenuItem value="Cardiology">Cardiology</MenuItem>
                      <MenuItem value="Radiology">Radiology</MenuItem>
                      <MenuItem value="Administration">Administration</MenuItem>
                      <MenuItem value="Laboratory">Laboratory</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth required>
                    <InputLabel>Status</InputLabel>
                    <Select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      label="Status"
                    >
                      <MenuItem value="Active">Active</MenuItem>
                      <MenuItem value="On Leave">On Leave</MenuItem>
                      <MenuItem value="Inactive">Inactive</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Box>

            {/* Contact Information Section */}
            <Box>
              <Typography variant="subtitle1" color="primary" sx={{ mb: 2, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocalHospitalIcon fontSize="small" />
                Contact Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    required
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    required
                    label="Phone Number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </Grid>
              </Grid>
            </Box>

            {/* Professional Details Section */}
            <Box>
              <Typography variant="subtitle1" color="primary" sx={{ mb: 2, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                <MedicationIcon fontSize="small" />
                Professional Details
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    required
                    label="Years of Experience"
                    name="yearsOfExperience"
                    type="number"
                    value={formData.yearsOfExperience}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    required
                    label="Qualifications"
                    name="qualifications"
                    value={formData.qualifications}
                    onChange={handleInputChange}
                    helperText="Separate multiple qualifications with commas"
                    multiline
                    rows={2}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Specializations"
                    name="specializations"
                    value={formData.specializations}
                    onChange={handleInputChange}
                    helperText="Separate multiple specializations with commas"
                    multiline
                    rows={2}
                  />
                </Grid>
              </Grid>
            </Box>

            {/* Emergency Contact Section */}
            <Box>
              <Typography variant="subtitle1" color="primary" sx={{ mb: 2, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                <WarningIcon fontSize="small" />
                Emergency Contact
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    required
                    label="Name"
                    name="emergencyContact.name"
                    value={formData.emergencyContact.name}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    required
                    label="Relationship"
                    name="emergencyContact.relationship"
                    value={formData.emergencyContact.relationship}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    required
                    label="Phone"
                    name="emergencyContact.phone"
                    value={formData.emergencyContact.phone}
                    onChange={handleInputChange}
                  />
                </Grid>
              </Grid>
            </Box>

            {/* Performance Metrics Section */}
            <Box>
              <Typography variant="subtitle1" color="primary" sx={{ mb: 2, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                <EventIcon fontSize="small" />
                Performance Metrics
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Current Prescriptions per Month"
                    name="performanceMetrics.prescriptionsPerMonth"
                    type="number"
                    value={formData.performanceMetrics.prescriptionsPerMonth}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Target Prescriptions per Month"
                    name="performanceMetrics.prescriptionsPerMonthTarget"
                    type="number"
                    value={formData.performanceMetrics.prescriptionsPerMonthTarget}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Current Inventory Accuracy Rate (%)"
                    name="performanceMetrics.inventoryAccuracyRate"
                    type="number"
                    value={formData.performanceMetrics.inventoryAccuracyRate}
                    onChange={handleInputChange}
                    InputProps={{
                      inputProps: { min: 0, max: 100 }
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Target Inventory Accuracy Rate (%)"
                    name="performanceMetrics.inventoryAccuracyRateTarget"
                    type="number"
                    value={formData.performanceMetrics.inventoryAccuracyRateTarget}
                    onChange={handleInputChange}
                    InputProps={{
                      inputProps: { min: 0, max: 100 }
                    }}
                  />
                </Grid>
              </Grid>
            </Box>

            {/* Activity Log Section */}
            <Box>
              <Typography variant="subtitle1" color="primary" sx={{ mb: 2, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                <EventNoteIcon fontSize="small" />
                Activity Log
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {formData.activityLog.map((log, index) => (
                  <Paper key={index} sx={{ p: 2, position: 'relative' }}>
                    <IconButton
                      size="small"
                      onClick={() => {
                        const newLogs = formData.activityLog.filter((_, i) => i !== index);
                        setFormData(prev => ({ ...prev, activityLog: newLogs }));
                      }}
                      sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        color: 'error.main',
                        '&:hover': {
                          backgroundColor: 'error.light',
                        }
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          fullWidth
                          label="Action"
                          value={log.action}
                          onChange={(e) => {
                            const newLogs = [...formData.activityLog];
                            newLogs[index] = { ...newLogs[index], action: e.target.value };
                            setFormData(prev => ({ ...prev, activityLog: newLogs }));
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          fullWidth
                          label="Timestamp"
                          type="datetime-local"
                          value={log.timestamp}
                          onChange={(e) => {
                            const newLogs = [...formData.activityLog];
                            newLogs[index] = { ...newLogs[index], timestamp: e.target.value };
                            setFormData(prev => ({ ...prev, activityLog: newLogs }));
                          }}
                          InputLabelProps={{ shrink: true }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          fullWidth
                          label="Details"
                          value={log.details}
                          onChange={(e) => {
                            const newLogs = [...formData.activityLog];
                            newLogs[index] = { ...newLogs[index], details: e.target.value };
                            setFormData(prev => ({ ...prev, activityLog: newLogs }));
                          }}
                        />
                      </Grid>
                    </Grid>
                  </Paper>
                ))}
                <Button
                  variant="outlined"
                  startIcon={<AddIcon />}
                  onClick={() => {
                    setFormData(prev => ({
                      ...prev,
                      activityLog: [
                        ...prev.activityLog,
                        {
                          action: '',
                          timestamp: new Date().toISOString(),
                          details: ''
                        }
                      ]
                    }));
                  }}
                >
                  Add Activity Log Entry
                </Button>
              </Box>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ 
          p: 2,
          borderTop: '1px solid',
          borderColor: 'divider',
          gap: 1
        }}>
          <Button 
            onClick={handleCloseDialog}
            variant="outlined"
            startIcon={<DeleteIcon />}
            sx={{ 
              borderRadius: 2,
              px: 3
            }}
          >
            Cancel
          </Button>
          <Button 
            variant="contained"
            onClick={handleSubmit}
            startIcon={<AddIcon />}
            sx={{ 
              borderRadius: 2,
              px: 3
            }}
          >
            {selectedStaff ? 'Update Staff Member' : 'Add Staff Member'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default StaffRecords; 