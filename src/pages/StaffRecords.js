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

// Placeholder data
const initialStaff = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    role: 'Doctor',
    specialization: 'Cardiology',
    contact: '+1 (555) 123-4567',
    email: 'sarah.johnson@hospital.com',
    status: 'Active',
    idNumber: 'DOC001',
    prescriptions: 150,
    patients: 75,
    activityHistory: [
      {
        date: '2024-03-15',
        type: 'prescription',
        title: 'New Prescription Issued',
        description: 'Prescribed medication for patient with hypertension',
        details: {
          'Patient ID': 'P12345',
          'Medication': 'Lisinopril',
          'Dosage': '10mg daily',
          'Duration': '30 days'
        }
      },
      {
        date: '2024-03-14',
        type: 'training',
        title: 'Completed Advanced Cardiac Life Support Training',
        description: 'Successfully completed ACLS certification renewal',
        details: {
          'Provider': 'American Heart Association',
          'Duration': '2 days',
          'Score': '95%'
        }
      },
      {
        date: '2024-03-10',
        type: 'achievement',
        title: 'Excellence in Patient Care Award',
        description: 'Recognized for outstanding patient care and satisfaction scores',
        details: {
          'Award Type': 'Quarterly Recognition',
          'Patient Satisfaction': '98%'
        }
      }
    ]
  },
  {
    id: 2,
    name: 'Dr. Michael Chen',
    role: 'Doctor',
    specialization: 'Pediatrics',
    contact: '+1 (555) 234-5678',
    email: 'michael.chen@hospital.com',
    status: 'Active',
    idNumber: 'DOC002',
    prescriptions: 120,
    patients: 60,
    activityHistory: [
      {
        date: '2024-03-15',
        type: 'assignment',
        title: 'New Department Assignment',
        description: 'Assigned to lead the pediatric emergency department',
        details: {
          'Department': 'Pediatric Emergency',
          'Duration': '6 months',
          'Shift': 'Day'
        }
      },
      {
        date: '2024-03-12',
        type: 'prescription',
        title: 'Prescription Review',
        description: 'Completed monthly prescription review for pediatric patients',
        details: {
          'Total Reviews': '45',
          'Changes Made': '3',
          'Follow-ups Required': '2'
        }
      }
    ]
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Nurse',
    specialization: 'Emergency Care',
    contact: '+1 (555) 345-6789',
    email: 'emily.rodriguez@hospital.com',
    status: 'Active',
    idNumber: 'NUR001',
    prescriptions: 80,
    patients: 40,
    activityHistory: [
      {
        date: '2024-03-15',
        type: 'incident',
        title: 'Emergency Response',
        description: 'Responded to cardiac emergency in ER',
        details: {
          'Patient ID': 'P12346',
          'Response Time': '2 minutes',
          'Outcome': 'Stabilized'
        }
      },
      {
        date: '2024-03-13',
        type: 'training',
        title: 'Emergency Response Protocol Update',
        description: 'Completed new emergency response protocol training',
        details: {
          'Duration': '4 hours',
          'Topics Covered': 'Cardiac Emergencies, Trauma Response'
        }
      }
    ]
  },
  {
    id: 4,
    name: 'David Kim',
    role: 'Nurse',
    specialization: 'Intensive Care',
    contact: '+1 (555) 456-7890',
    email: 'david.kim@hospital.com',
    status: 'On Leave',
    idNumber: 'NUR002',
    prescriptions: 90,
    patients: 45,
    activityHistory: [
      {
        date: '2024-03-14',
        type: 'assignment',
        title: 'ICU Rotation',
        description: 'Assigned to ICU rotation for next 2 weeks',
        details: {
          'Department': 'Medical ICU',
          'Duration': '2 weeks',
          'Shift': 'Night'
        }
      },
      {
        date: '2024-03-10',
        type: 'achievement',
        title: 'Perfect Attendance Record',
        description: 'Maintained perfect attendance for 6 months',
        details: {
          'Period': 'September 2023 - March 2024',
          'Total Shifts': '180'
        }
      }
    ]
  }
];

function StaffRecords() {
  const [staff, setStaff] = useState(initialStaff);
  const [openDialog, setOpenDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'asc',
  });
  const [formData, setFormData] = useState({
    name: '',
    role: 'Doctor',
    specialization: '',
    idNumber: '',
    contact: '',
    email: '',
    address: '',
    department: 'General Medicine',
    status: 'Active',
    joinDate: new Date().toISOString().split('T')[0],
    qualifications: '',
    experience: '',
  });
  const [expandedId, setExpandedId] = useState(null);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleOpenDialog = (staff = null) => {
    if (staff) {
      setSelectedStaff(staff);
      setFormData(staff);
    } else {
      setSelectedStaff(null);
      setFormData({
        name: '',
        role: 'Doctor',
        specialization: '',
        idNumber: '',
        contact: '',
        email: '',
        address: '',
        department: 'General Medicine',
        status: 'Active',
        joinDate: new Date().toISOString().split('T')[0],
        qualifications: '',
        experience: '',
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
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    if (selectedStaff) {
      // Update existing staff member
      setStaff(prev =>
        prev.map(member =>
          member.id === selectedStaff.id ? { ...formData, id: member.id } : member
        )
      );
    } else {
      // Add new staff member
      setStaff(prev => [
        ...prev,
        { ...formData, id: prev.length + 1, prescriptions: 0, patients: 0 }
      ]);
    }
    handleCloseDialog();
  };

  const handleDelete = (id) => {
    setStaff(prev => prev.filter(member => member.id !== id));
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedStaff = [...staff].sort((a, b) => {
    if (!sortConfig.key) return 0;

    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    if (aValue < bValue) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const filteredStaff = sortedStaff.filter(member => {
    const matchesSearch = Object.values(member).some(value =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    );

    const matchesRole = tabValue === 0 || 
      (tabValue === 1 && member.role === 'Doctor') ||
      (tabValue === 2 && member.role === 'Nurse');

    return matchesSearch && matchesRole;
  });

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'success';
      case 'on leave':
        return 'warning';
      case 'inactive':
        return 'error';
      default:
        return 'default';
    }
  };

  const SortableTableCell = ({ label, sortKey }) => (
    <TableCell
      onClick={() => handleSort(sortKey)}
      sx={{ cursor: 'pointer' }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        {label}
        {sortConfig.key === sortKey && (
          sortConfig.direction === 'asc' ? <ArrowUpwardIcon fontSize="small" /> : <ArrowDownwardIcon fontSize="small" />
        )}
      </Box>
    </TableCell>
  );

  const handleExpand = (id) => {
    if (expandedId === id) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
    }
  };

  const getTimelineIcon = (type) => {
    switch (type) {
      case 'prescription':
        return <MedicalIcon />;
      case 'assignment':
        return <AssignmentIcon />;
      case 'training':
        return <SchoolIcon />;
      case 'achievement':
        return <AchievementIcon />;
      case 'incident':
        return <WarningIcon />;
      default:
        return <EventNoteIcon />;
    }
  };

  const getTimelineColor = (type) => {
    switch (type) {
      case 'prescription':
        return 'primary';
      case 'assignment':
        return 'secondary';
      case 'training':
        return 'success';
      case 'achievement':
        return 'info';
      case 'incident':
        return 'error';
      default:
        return 'grey';
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Staff Records
      </Typography>

      {/* Search and Actions */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Search Staff"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
            }}
          />
        </Grid>
        <Grid item xs={12} md={6} sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
          >
            Add Staff Member
          </Button>
        </Grid>
      </Grid>

      {/* Tabs */}
      <Paper sx={{ width: '100%', mb: 2 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="All Staff" />
          <Tab label="Doctors" />
          <Tab label="Nurses" />
        </Tabs>
      </Paper>

      {/* Staff Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell width="40px" /> {/* Expansion control column */}
              <SortableTableCell label="Name" sortKey="name" />
              <SortableTableCell label="Role" sortKey="role" />
              <SortableTableCell label="Specialization" sortKey="specialization" />
              <TableCell>Contact</TableCell>
              <SortableTableCell label="Status" sortKey="status" />
              <SortableTableCell label="Prescriptions" sortKey="prescriptions" />
              <SortableTableCell label="Patients" sortKey="patients" />
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredStaff.map((member) => (
              <React.Fragment key={member.id}>
                <TableRow>
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={() => handleExpand(member.id)}
                    >
                      {expandedId === member.id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <Box>
                      <Typography variant="body1">{member.name}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        ID: {member.idNumber}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box>
                      <Typography variant="body1">{member.role}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box>
                      <Typography variant="body1">{member.specialization}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box>
                      <Typography variant="body1">{member.contact}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {member.email}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box>
                      <Chip
                        label={member.status}
                        color={getStatusColor(member.status)}
                        size="small"
                      />
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box>
                      <Typography variant="body1">{member.prescriptions}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box>
                      <Typography variant="body1">{member.patients}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 0.5 }}>
                      <IconButton onClick={() => handleOpenDialog(member)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(member.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={9}>
                    <Collapse in={expandedId === member.id} timeout="auto" unmountOnExit>
                      <Box sx={{ margin: 2 }}>
                        <Typography variant="h6" gutterBottom component="div">
                          Activity Timeline
                        </Typography>
                        <Timeline>
                          {member.activityHistory?.map((activity, index) => (
                            <TimelineItem key={index}>
                              <TimelineOppositeContent color="text.secondary">
                                {activity.date}
                              </TimelineOppositeContent>
                              <TimelineSeparator>
                                <TimelineDot color={getTimelineColor(activity.type)}>
                                  {getTimelineIcon(activity.type)}
                                </TimelineDot>
                                {index < member.activityHistory.length - 1 && <TimelineConnector />}
                              </TimelineSeparator>
                              <TimelineContent>
                                <Typography variant="subtitle2" gutterBottom>
                                  {activity.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  {activity.description}
                                </Typography>
                                {activity.details && (
                                  <Box sx={{ mt: 1 }}>
                                    {Object.entries(activity.details).map(([key, value]) => (
                                      <Typography key={key} variant="caption" display="block">
                                        <strong>{key}:</strong> {value}
                                      </Typography>
                                    ))}
                                  </Box>
                                )}
                              </TimelineContent>
                            </TimelineItem>
                          ))}
                        </Timeline>
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add/Edit Dialog */}
      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog} 
        maxWidth="md" 
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            maxHeight: '90vh'
          }
        }}
      >
        <DialogTitle sx={{ 
          borderBottom: '1px solid', 
          borderColor: 'divider',
          pb: 2,
          px: 3
        }}>
          <Typography variant="h5" component="div" sx={{ fontWeight: 500 }}>
            {selectedStaff ? 'Edit Staff Member' : 'Add New Staff Member'}
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ p: 3 }}>
          <Grid container spacing={3}>
            {/* Basic Information Section */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 500, color: 'primary.main' }}>
                Basic Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Role</InputLabel>
                    <Select
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      label="Role"
                      sx={{ height: '56px' }}
                      MenuProps={{
                        PaperProps: {
                          sx: {
                            maxHeight: 400,
                            width: '100%'
                          }
                        }
                      }}
                    >
                      <MenuItem value="Doctor">
                        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', py: 1 }}>
                          <Typography>Doctor</Typography>
                        </Box>
                      </MenuItem>
                      <MenuItem value="Nurse">
                        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', py: 1 }}>
                          <Typography>Nurse</Typography>
                        </Box>
                      </MenuItem>
                      <MenuItem value="Pharmacist">
                        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', py: 1 }}>
                          <Typography>Pharmacist</Typography>
                        </Box>
                      </MenuItem>
                      <MenuItem value="Lab Technician">
                        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', py: 1 }}>
                          <Typography>Lab Technician</Typography>
                        </Box>
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Department</InputLabel>
                    <Select
                      name="department"
                      value={formData.department}
                      onChange={handleInputChange}
                      label="Department"
                      sx={{ height: '56px' }}
                      MenuProps={{
                        PaperProps: {
                          sx: {
                            maxHeight: 400,
                            width: '100%'
                          }
                        }
                      }}
                    >
                      <MenuItem value="General Medicine">
                        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', py: 1 }}>
                          <Typography>General Medicine</Typography>
                        </Box>
                      </MenuItem>
                      <MenuItem value="Emergency">
                        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', py: 1 }}>
                          <Typography>Emergency</Typography>
                        </Box>
                      </MenuItem>
                      <MenuItem value="Pediatrics">
                        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', py: 1 }}>
                          <Typography>Pediatrics</Typography>
                        </Box>
                      </MenuItem>
                      <MenuItem value="Surgery">
                        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', py: 1 }}>
                          <Typography>Surgery</Typography>
                        </Box>
                      </MenuItem>
                      <MenuItem value="Laboratory">
                        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', py: 1 }}>
                          <Typography>Laboratory</Typography>
                        </Box>
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      label="Status"
                      sx={{ height: '56px' }}
                      MenuProps={{
                        PaperProps: {
                          sx: {
                            maxHeight: 400,
                            width: '100%'
                          }
                        }
                      }}
                    >
                      <MenuItem value="Active">
                        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', py: 1 }}>
                          <Chip label="Active" size="small" color="success" sx={{ mr: 1 }} />
                          <Typography>Active</Typography>
                        </Box>
                      </MenuItem>
                      <MenuItem value="On Leave">
                        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', py: 1 }}>
                          <Chip label="On Leave" size="small" color="warning" sx={{ mr: 1 }} />
                          <Typography>On Leave</Typography>
                        </Box>
                      </MenuItem>
                      <MenuItem value="Inactive">
                        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', py: 1 }}>
                          <Chip label="Inactive" size="small" color="error" sx={{ mr: 1 }} />
                          <Typography>Inactive</Typography>
                        </Box>
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>

            {/* Contact Information Section */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" sx={{ mb: 2, mt: 1, fontWeight: 500, color: 'primary.main' }}>
                Contact Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="ID Number"
                    name="idNumber"
                    value={formData.idNumber}
                    onChange={handleInputChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Contact Number"
                    name="contact"
                    value={formData.contact}
                    onChange={handleInputChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Join Date"
                    name="joinDate"
                    type="date"
                    value={formData.joinDate}
                    onChange={handleInputChange}
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Address"
                    name="address"
                    multiline
                    rows={2}
                    value={formData.address}
                    onChange={handleInputChange}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </Grid>

            {/* Professional Information Section */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" sx={{ mb: 2, mt: 1, fontWeight: 500, color: 'primary.main' }}>
                Professional Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Specialization"
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleInputChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Years of Experience"
                    name="experience"
                    type="number"
                    value={formData.experience}
                    onChange={handleInputChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Qualifications"
                    name="qualifications"
                    multiline
                    rows={2}
                    value={formData.qualifications}
                    onChange={handleInputChange}
                    variant="outlined"
                    placeholder="Enter educational qualifications and certifications"
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ 
          borderTop: '1px solid', 
          borderColor: 'divider',
          px: 3,
          py: 2
        }}>
          <Button 
            onClick={handleCloseDialog}
            variant="outlined"
            sx={{ mr: 1 }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            variant="contained"
            sx={{ px: 4 }}
          >
            {selectedStaff ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default StaffRecords; 