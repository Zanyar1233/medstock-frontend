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
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Tab,
  Tabs,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  LocalHospital,
  Medication as MedicationIcon,
  Warning as WarningIcon,
  History as HistoryIcon,
  Person as PersonIcon,
  Group as GroupIcon,
  Event as EventIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
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

// Sample data with enhanced medical history
const initialPatients = [
  {
    id: 'P001',
    name: 'John Doe',
    dateOfBirth: '1990-05-15',
    gender: 'Male',
    contactNumber: '+1234567890',
    email: 'john.doe@email.com',
    address: '123 Main St, City, Country',
    bloodType: 'O+',
    allergies: ['Penicillin', 'Peanuts'],
    chronicConditions: ['Hypertension'],
    emergencyContact: {
      name: 'Jane Doe',
      relationship: 'Spouse',
      phone: '+1987654321'
    },
    familyHistory: {
      father: ['Diabetes Type 2', 'Heart Disease'],
      mother: ['Hypertension'],
      siblings: ['None']
    },
    medications: [
      {
        name: 'Lisinopril',
        dosage: '10mg',
        frequency: 'Once daily',
        startDate: '2023-01-15',
        endDate: null,
        prescribedBy: 'Dr. Sarah Smith',
        status: 'Active'
      }
    ],
    medicalHistory: [
      {
        date: '2024-03-15',
        time: '09:30',
        type: 'Consultation',
        department: 'Cardiology',
        provider: 'Dr. Sarah Smith',
        notes: 'Regular checkup, blood pressure well controlled',
        vitals: {
          bloodPressure: '120/80',
          heartRate: '72',
          temperature: '98.6'
        }
      },
      {
        date: '2024-02-01',
        time: '14:15',
        type: 'Procedure',
        department: 'Radiology',
        provider: 'Dr. Michael Brown',
        procedure: 'Chest X-ray',
        notes: 'Annual screening, results normal'
      }
    ],
    registrationDate: '2023-01-15',
    status: 'Being Treated'
  },
  // Add more sample patients as needed
];

const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case 'being treated':
      return {
        color: '#2196f3',
        backgroundColor: '#e3f2fd',
        borderColor: '#90caf9'
      };
    case 'discharged':
      return {
        color: '#4caf50',
        backgroundColor: '#e8f5e9',
        borderColor: '#c8e6c9'
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
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        height: '32px',
        px: 1.5,
        py: 0.5,
        borderRadius: '16px',
        border: '1px solid',
        fontSize: '0.875rem',
        fontWeight: 500,
        ...colors
      }}
    >
      {status}
    </Box>
  );
};

function TabPanel({ children, value, index }) {
  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`patient-tabpanel-${index}`}
      aria-labelledby={`patient-tab-${index}`}
      sx={{ py: 2 }}
    >
      {value === index && children}
    </Box>
  );
}

function PatientRow({ patient, onEdit, onDelete }) {
  const [open, setOpen] = useState(false);
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
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
        <TableCell align="center">{patient.id}</TableCell>
        <TableCell align="center">{patient.name}</TableCell>
        <TableCell align="center">{patient.dateOfBirth}</TableCell>
        <TableCell align="center">
          <StatusChip status={patient.status} />
        </TableCell>
        <TableCell align="center">
          <IconButton size="small" onClick={(e) => {
            e.stopPropagation();
            onEdit(patient);
          }}>
            <EditIcon />
          </IconButton>
          <IconButton size="small" onClick={(e) => {
            e.stopPropagation();
            onDelete(patient.id);
          }}>
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ py: 3 }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
                <Tabs value={tabValue} onChange={handleTabChange} aria-label="patient information tabs">
                  <Tab label="Timeline" icon={<HistoryIcon />} iconPosition="start" />
                  <Tab label="Personal Info" icon={<PersonIcon />} iconPosition="start" />
                  <Tab label="Medical History" icon={<LocalHospital />} iconPosition="start" />
                  <Tab label="Medications" icon={<MedicationIcon />} iconPosition="start" />
                </Tabs>
              </Box>

              <TabPanel value={tabValue} index={0}>
                <Timeline position="alternate">
                  {patient.medicalHistory.map((event, index) => (
                    <TimelineItem key={index}>
                      <TimelineOppositeContent color="text.secondary">
                        {event.date} {event.time}
                      </TimelineOppositeContent>
                      <TimelineSeparator>
                        <TimelineDot color={event.type === 'Procedure' ? 'secondary' : 'primary'} />
                        <TimelineConnector />
                      </TimelineSeparator>
                      <TimelineContent>
                        <Paper elevation={0} sx={{ p: 2, backgroundColor: '#f8fafc' }}>
                          <Typography variant="subtitle2" component="span">
                            {event.type}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {event.department} - {event.provider}
                          </Typography>
                          <Typography variant="body2" sx={{ mt: 1 }}>
                            {event.notes}
                          </Typography>
                          {event.vitals && (
                            <Box sx={{ mt: 1 }}>
                              <Typography variant="body2" color="text.secondary">
                                Vitals: BP {event.vitals.bloodPressure}, HR {event.vitals.heartRate}, Temp {event.vitals.temperature}°F
                              </Typography>
                            </Box>
                          )}
                        </Paper>
                      </TimelineContent>
                    </TimelineItem>
                  ))}
                </Timeline>
              </TabPanel>

              <TabPanel value={tabValue} index={1}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Paper elevation={0} sx={{ p: 2, backgroundColor: '#f8fafc' }}>
                      <Typography variant="subtitle2" gutterBottom>
                        Contact Information
                      </Typography>
                      <List dense>
                        <ListItem>
                          <ListItemText 
                            primary="Phone"
                            secondary={patient.contactNumber}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemText 
                            primary="Email"
                            secondary={patient.email}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemText 
                            primary="Address"
                            secondary={patient.address}
                          />
                        </ListItem>
                      </List>
                      <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>
                        Emergency Contact
                      </Typography>
                      <List dense>
                        <ListItem>
                          <ListItemText 
                            primary={patient.emergencyContact.name}
                            secondary={`${patient.emergencyContact.relationship} - ${patient.emergencyContact.phone}`}
                          />
                        </ListItem>
                      </List>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Paper elevation={0} sx={{ p: 2, backgroundColor: '#f8fafc' }}>
                      <Typography variant="subtitle2" gutterBottom>
                        Family History
                      </Typography>
                      <List dense>
                        <ListItem>
                          <ListItemText 
                            primary="Father"
                            secondary={patient.familyHistory.father.join(', ')}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemText 
                            primary="Mother"
                            secondary={patient.familyHistory.mother.join(', ')}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemText 
                            primary="Siblings"
                            secondary={patient.familyHistory.siblings.join(', ')}
                          />
                        </ListItem>
                      </List>
                    </Paper>
                  </Grid>
                </Grid>
              </TabPanel>

              <TabPanel value={tabValue} index={2}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Paper elevation={0} sx={{ p: 2, backgroundColor: '#f8fafc' }}>
                      <Typography variant="subtitle2" gutterBottom>
                        Allergies
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        {patient.allergies.map((allergy, index) => (
                          <Chip
                            key={index}
                            label={allergy}
                            color="error"
                            size="small"
                            icon={<WarningIcon />}
                          />
                        ))}
                      </Box>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Paper elevation={0} sx={{ p: 2, backgroundColor: '#f8fafc' }}>
                      <Typography variant="subtitle2" gutterBottom>
                        Chronic Conditions
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        {patient.chronicConditions.map((condition, index) => (
                          <Chip
                            key={index}
                            label={condition}
                            color="primary"
                            size="small"
                          />
                        ))}
                      </Box>
                    </Paper>
                  </Grid>
                </Grid>
              </TabPanel>

              <TabPanel value={tabValue} index={3}>
                <TableContainer component={Paper} variant="outlined">
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Medication</TableCell>
                        <TableCell>Dosage</TableCell>
                        <TableCell>Frequency</TableCell>
                        <TableCell>Start Date</TableCell>
                        <TableCell>End Date</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Prescribed By</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {patient.medications.map((medication, index) => (
                        <TableRow key={index}>
                          <TableCell>{medication.name}</TableCell>
                          <TableCell>{medication.dosage}</TableCell>
                          <TableCell>{medication.frequency}</TableCell>
                          <TableCell>{medication.startDate}</TableCell>
                          <TableCell>{medication.endDate || 'Ongoing'}</TableCell>
                          <TableCell>
                            <Chip
                              label={medication.status}
                              color={medication.status === 'Active' ? 'success' : 'default'}
                              size="small"
                            />
                          </TableCell>
                          <TableCell>{medication.prescribedBy}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </TabPanel>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

function PatientRecords() {
  const [patients, setPatients] = useState(initialPatients);
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [timelineEvents, setTimelineEvents] = useState([{
    date: new Date().toISOString().split('T')[0],
    time: '09:00',
    type: 'Consultation',
    department: '',
    provider: '',
    notes: '',
    vitals: {
      bloodPressure: '',
      heartRate: '',
      temperature: ''
    }
  }]);
  const [formData, setFormData] = useState({
    name: '',
    dateOfBirth: '',
    gender: 'Male', // Default value
    contactNumber: '',
    email: '',
    address: '',
    bloodType: 'O+', // Default value
    allergies: '',
    chronicConditions: '',
    emergencyContactName: '',
    emergencyContactRelationship: '',
    emergencyContactPhone: '',
    status: 'Being Treated', // Default value
    familyHistory: {
      father: '',
      mother: '',
      siblings: ''
    }
  });
  const [medications, setMedications] = useState([{
    name: '',
    dosage: '',
    frequency: '',
    startDate: new Date().toISOString().split('T')[0],
    endDate: '',
    prescribedBy: '',
    status: 'Active'
  }]);

  const handleOpenDialog = (patient = null) => {
    if (patient) {
      setSelectedPatient(patient);
      setFormData({
        name: patient.name,
        dateOfBirth: patient.dateOfBirth,
        gender: patient.gender,
        contactNumber: patient.contactNumber,
        email: patient.email,
        address: patient.address,
        bloodType: patient.bloodType,
        allergies: patient.allergies.join(', '),
        chronicConditions: patient.chronicConditions.join(', '),
        emergencyContactName: patient.emergencyContact.name,
        emergencyContactRelationship: patient.emergencyContact.relationship,
        emergencyContactPhone: patient.emergencyContact.phone,
        status: patient.status,
        familyHistory: {
          father: patient.familyHistory.father.join(', '),
          mother: patient.familyHistory.mother.join(', '),
          siblings: patient.familyHistory.siblings.join(', ')
        }
      });
      setTimelineEvents(patient.medicalHistory.map(event => ({
        ...event,
        vitals: event.vitals || {
          bloodPressure: '',
          heartRate: '',
          temperature: ''
        }
      })));
      setMedications(patient.medications || [{
        name: '',
        dosage: '',
        frequency: '',
        startDate: new Date().toISOString().split('T')[0],
        endDate: '',
        prescribedBy: '',
        status: 'Active'
      }]);
    } else {
      setSelectedPatient(null);
      setFormData({
        name: '',
        dateOfBirth: '',
        gender: 'Male',
        contactNumber: '',
        email: '',
        address: '',
        bloodType: 'O+',
        allergies: '',
        chronicConditions: '',
        emergencyContactName: '',
        emergencyContactRelationship: '',
        emergencyContactPhone: '',
        status: 'Being Treated',
        familyHistory: {
          father: '',
          mother: '',
          siblings: ''
        }
      });
      setTimelineEvents([{
        date: new Date().toISOString().split('T')[0],
        time: '09:00',
        type: 'Consultation',
        department: '',
        provider: '',
        notes: '',
        vitals: {
          bloodPressure: '',
          heartRate: '',
          temperature: ''
        }
      }]);
      setMedications([{
        name: '',
        dosage: '',
        frequency: '',
        startDate: new Date().toISOString().split('T')[0],
        endDate: '',
        prescribedBy: '',
        status: 'Active'
      }]);
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedPatient(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTimelineChange = (index, field, value) => {
    setTimelineEvents(prev => {
      const newEvents = [...prev];
      if (field.includes('.')) {
        const [parent, child] = field.split('.');
        newEvents[index][parent][child] = value;
      } else {
        newEvents[index][field] = value;
      }
      return newEvents;
    });
  };

  const addTimelineEvent = () => {
    setTimelineEvents(prev => [...prev, {
      date: new Date().toISOString().split('T')[0],
      time: '09:00',
      type: 'Consultation',
      department: '',
      provider: '',
      notes: '',
      vitals: {
        bloodPressure: '',
        heartRate: '',
        temperature: ''
      }
    }]);
  };

  const removeTimelineEvent = (index) => {
    setTimelineEvents(prev => prev.filter((_, i) => i !== index));
  };

  const handleFamilyHistoryChange = (member, value) => {
    setFormData(prev => ({
      ...prev,
      familyHistory: {
        ...prev.familyHistory,
        [member]: value
      }
    }));
  };

  const handleMedicationChange = (index, field, value) => {
    setMedications(prev => {
      const newMedications = [...prev];
      newMedications[index][field] = value;
      return newMedications;
    });
  };

  const addMedication = () => {
    setMedications(prev => [...prev, {
      name: '',
      dosage: '',
      frequency: '',
      startDate: new Date().toISOString().split('T')[0],
      endDate: '',
      prescribedBy: '',
      status: 'Active'
    }]);
  };

  const removeMedication = (index) => {
    setMedications(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPatient = {
      id: selectedPatient ? selectedPatient.id : Date.now(),
      name: formData.name,
      dateOfBirth: formData.dateOfBirth,
      gender: formData.gender,
      contactNumber: formData.contactNumber,
      email: formData.email,
      address: formData.address,
      bloodType: formData.bloodType,
      allergies: formData.allergies.split(',').map(item => item.trim()).filter(Boolean),
      chronicConditions: formData.chronicConditions.split(',').map(item => item.trim()).filter(Boolean),
      emergencyContact: {
        name: formData.emergencyContactName,
        relationship: formData.emergencyContactRelationship,
        phone: formData.emergencyContactPhone
      },
      status: formData.status,
      familyHistory: {
        father: formData.familyHistory.father.split(',').map(item => item.trim()).filter(Boolean),
        mother: formData.familyHistory.mother.split(',').map(item => item.trim()).filter(Boolean),
        siblings: formData.familyHistory.siblings.split(',').map(item => item.trim()).filter(Boolean)
      },
      medicalHistory: timelineEvents.filter(event => event.type && event.department),
      medications: medications.filter(med => med.name && med.dosage)
    };

    if (selectedPatient) {
      setPatients(patients.map(p => p.id === selectedPatient.id ? newPatient : p));
    } else {
      setPatients([...patients, newPatient]);
    }
    
    handleCloseDialog();
  };

  const handleDelete = (id) => {
    setPatients(prev => prev.filter(patient => patient.id !== id));
  };

  const filteredPatients = patients.filter(patient =>
    Object.values(patient).some(value =>
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
          Patient Records
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            size="small"
            placeholder="Search patients..."
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
            }}
          >
            Add Patient
          </Button>
        </Box>
      </Box>

      <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f8fafc' }}>
              <TableCell align="center" sx={{ fontWeight: 500 }}>Patient ID</TableCell>
              <TableCell align="center" sx={{ fontWeight: 500 }}>Name</TableCell>
              <TableCell align="center" sx={{ fontWeight: 500 }}>Date of Birth</TableCell>
              <TableCell align="center" sx={{ fontWeight: 500 }}>Status</TableCell>
              <TableCell align="center" sx={{ fontWeight: 500 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPatients.map((patient) => (
              <PatientRow
                key={patient.id}
                patient={patient}
                onEdit={handleOpenDialog}
                onDelete={handleDelete}
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
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <PersonIcon color="primary" />
            <Typography variant="h6">
              {selectedPatient ? 'Edit Patient' : 'Add New Patient'}
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Typography variant="subtitle1" sx={{ mb: 2 }}>
              Personal Information
            </Typography>
            <Grid container spacing={2}>
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
                  label="Date of Birth"
                  name="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Gender</InputLabel>
                  <Select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    label="Gender"
                  >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Blood Type</InputLabel>
                  <Select
                    name="bloodType"
                    value={formData.bloodType}
                    onChange={handleInputChange}
                    label="Blood Type"
                  >
                    {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(type => (
                      <MenuItem key={type} value={type}>{type}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Typography variant="subtitle1" sx={{ mb: 2 }}>
              Contact Information
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  required
                  label="Contact Number"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleInputChange}
                />
              </Grid>
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
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  label="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  multiline
                  rows={2}
                />
              </Grid>
            </Grid>

            <Typography variant="subtitle1" sx={{ mb: 2 }}>
              Medical Information
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Allergies"
                  name="allergies"
                  value={formData.allergies}
                  onChange={handleInputChange}
                  helperText="Separate multiple allergies with commas"
                  multiline
                  rows={2}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Chronic Conditions"
                  name="chronicConditions"
                  value={formData.chronicConditions}
                  onChange={handleInputChange}
                  helperText="Separate multiple conditions with commas"
                  multiline
                  rows={2}
                />
              </Grid>
            </Grid>

            <Typography variant="subtitle1" sx={{ mb: 2 }}>
              Emergency Contact
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  required
                  label="Name"
                  name="emergencyContactName"
                  value={formData.emergencyContactName}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  required
                  label="Relationship"
                  name="emergencyContactRelationship"
                  value={formData.emergencyContactRelationship}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  required
                  label="Phone"
                  name="emergencyContactPhone"
                  value={formData.emergencyContactPhone}
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>

            <Typography variant="subtitle1" sx={{ mb: 2 }}>
              Patient Status
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Status</InputLabel>
                  <Select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    label="Status"
                  >
                    <MenuItem value="Being Treated">Being Treated</MenuItem>
                    <MenuItem value="Discharged">Discharged</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Typography variant="subtitle1" sx={{ mb: 2 }}>
              Family History
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Father's Medical History"
                  value={formData.familyHistory.father}
                  onChange={(e) => handleFamilyHistoryChange('father', e.target.value)}
                  helperText="Separate multiple conditions with commas"
                  multiline
                  rows={2}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Mother's Medical History"
                  value={formData.familyHistory.mother}
                  onChange={(e) => handleFamilyHistoryChange('mother', e.target.value)}
                  helperText="Separate multiple conditions with commas"
                  multiline
                  rows={2}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Siblings' Medical History"
                  value={formData.familyHistory.siblings}
                  onChange={(e) => handleFamilyHistoryChange('siblings', e.target.value)}
                  helperText="Separate multiple conditions with commas"
                  multiline
                  rows={2}
                />
              </Grid>
            </Grid>

            <Typography variant="subtitle1" sx={{ mb: 2 }}>
              Timeline Events
            </Typography>
            <Button
              size="small"
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={addTimelineEvent}
              sx={{ borderRadius: 2 }}
            >
              Add Event
            </Button>
            {timelineEvents.map((event, index) => (
              <Paper key={index} elevation={0} sx={{ p: 2, mb: 2, backgroundColor: '#f8fafc' }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', mb: -1 }}>
                    <IconButton 
                      size="small" 
                      onClick={() => removeTimelineEvent(index)}
                      sx={{ opacity: timelineEvents.length === 1 ? 0 : 1 }}
                      disabled={timelineEvents.length === 1}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <TextField
                      fullWidth
                      required
                      label="Date"
                      type="date"
                      value={event.date}
                      onChange={(e) => handleTimelineChange(index, 'date', e.target.value)}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <TextField
                      fullWidth
                      required
                      label="Time"
                      type="time"
                      value={event.time}
                      onChange={(e) => handleTimelineChange(index, 'time', e.target.value)}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <FormControl fullWidth required>
                      <InputLabel>Type</InputLabel>
                      <Select
                        value={event.type}
                        onChange={(e) => handleTimelineChange(index, 'type', e.target.value)}
                        label="Type"
                      >
                        <MenuItem value="Consultation">Consultation</MenuItem>
                        <MenuItem value="Procedure">Procedure</MenuItem>
                        <MenuItem value="Test">Test</MenuItem>
                        <MenuItem value="Surgery">Surgery</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <TextField
                      fullWidth
                      required
                      label="Department"
                      value={event.department}
                      onChange={(e) => handleTimelineChange(index, 'department', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      required
                      label="Healthcare Provider"
                      value={event.provider}
                      onChange={(e) => handleTimelineChange(index, 'provider', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Notes"
                      value={event.notes}
                      onChange={(e) => handleTimelineChange(index, 'notes', e.target.value)}
                      multiline
                      rows={2}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" gutterBottom>
                      Vitals
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          fullWidth
                          label="Blood Pressure"
                          placeholder="120/80"
                          value={event.vitals.bloodPressure}
                          onChange={(e) => handleTimelineChange(index, 'vitals.bloodPressure', e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          fullWidth
                          label="Heart Rate"
                          placeholder="72"
                          value={event.vitals.heartRate}
                          onChange={(e) => handleTimelineChange(index, 'vitals.heartRate', e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          fullWidth
                          label="Temperature"
                          placeholder="98.6"
                          value={event.vitals.temperature}
                          onChange={(e) => handleTimelineChange(index, 'vitals.temperature', e.target.value)}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            ))}

            <Typography variant="subtitle1" sx={{ mb: 2 }}>
              Medications
            </Typography>
            <Button
              size="small"
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={addMedication}
              sx={{ borderRadius: 2 }}
            >
              Add Medication
            </Button>
            {medications.map((medication, index) => (
              <Paper key={index} elevation={0} sx={{ p: 2, mb: 2, backgroundColor: '#f8fafc' }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', mb: -1 }}>
                    <IconButton 
                      size="small" 
                      onClick={() => removeMedication(index)}
                      sx={{ opacity: medications.length === 1 ? 0 : 1 }}
                      disabled={medications.length === 1}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <TextField
                      fullWidth
                      required
                      label="Medication Name"
                      value={medication.name}
                      onChange={(e) => handleMedicationChange(index, 'name', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <TextField
                      fullWidth
                      required
                      label="Dosage"
                      value={medication.dosage}
                      onChange={(e) => handleMedicationChange(index, 'dosage', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <TextField
                      fullWidth
                      required
                      label="Frequency"
                      value={medication.frequency}
                      onChange={(e) => handleMedicationChange(index, 'frequency', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <TextField
                      fullWidth
                      required
                      label="Start Date"
                      type="date"
                      value={medication.startDate}
                      onChange={(e) => handleMedicationChange(index, 'startDate', e.target.value)}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <TextField
                      fullWidth
                      label="End Date"
                      type="date"
                      value={medication.endDate}
                      onChange={(e) => handleMedicationChange(index, 'endDate', e.target.value)}
                      InputLabelProps={{ shrink: true }}
                      helperText="Leave empty if ongoing"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <TextField
                      fullWidth
                      required
                      label="Prescribed By"
                      value={medication.prescribedBy}
                      onChange={(e) => handleMedicationChange(index, 'prescribedBy', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <FormControl fullWidth required>
                      <InputLabel>Status</InputLabel>
                      <Select
                        value={medication.status}
                        onChange={(e) => handleMedicationChange(index, 'status', e.target.value)}
                        label="Status"
                      >
                        <MenuItem value="Active">Active</MenuItem>
                        <MenuItem value="Discontinued">Discontinued</MenuItem>
                        <MenuItem value="Completed">Completed</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Paper>
            ))}

            <Typography variant="body2" color="text.secondary">
              Required fields are marked with *
            </Typography>
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
            {selectedPatient ? 'Update Patient' : 'Add Patient'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default PatientRecords; 