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
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Collapse,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
  Add as AddIcon,
} from '@mui/icons-material';

// Sample data structure matching Prescribe page
const initialPrescriptions = [
  {
    id: 'RX0001',
    prescriptionDate: '2024-03-26',
    expiryDate: '2024-09-26',
    status: 'Complete',
    // Patient Information
    patientName: 'John Doe',
    dateOfBirth: '1990-05-15',
    patientId: 'P001',
    contactDetails: '+1234567890',
    // Prescriber Information
    prescriberName: 'Dr. Sarah Smith, MD',
    prescriberLicense: 'MD12345',
    prescriberContact: '+1987654321',
    prescriberClinic: 'City General Hospital',
    // Prescription Items
    items: [
      {
        id: 1,
        drugName: 'Paracetamol (Panadol)',
        dosageForm: 'Tablet',
        strength: '500mg',
        quantity: '30',
        frequency: 'Twice daily',
        duration: '7 days',
        specialNotes: 'Take with food',
      },
      {
        id: 2,
        drugName: 'Ibuprofen',
        dosageForm: 'Tablet',
        strength: '400mg',
        quantity: '20',
        frequency: 'As needed',
        duration: '5 days',
        specialNotes: 'Take for pain relief',
      }
    ],
    refillAuthorization: '0'
  }
];

function PrescriptionRow({ prescription, onEdit, onDelete, onStatusChange }) {
  const [open, setOpen] = useState(false);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'complete':
        return {
          color: '#4caf50',
          backgroundColor: '#e8f5e9',
          borderColor: '#c8e6c9'
        };
      case 'pending':
        return {
          color: '#ff9800',
          backgroundColor: '#fff3e0',
          borderColor: '#ffe0b2'
        };
      case 'terminated':
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
        <TableCell align="center">{prescription.prescriptionDate}</TableCell>
        <TableCell align="center">{prescription.id}</TableCell>
        <TableCell align="center">{prescription.patientName}</TableCell>
        <TableCell align="center">{prescription.prescriberName}</TableCell>
        <TableCell align="center">
          <FormControl size="small" variant="standard" sx={{ minWidth: 120 }}>
            <Select
              value={prescription.status}
              onChange={(e) => {
                e.stopPropagation();
                onStatusChange(prescription.id, e.target.value);
              }}
              onClick={(e) => e.stopPropagation()}
              sx={{ 
                '& .MuiSelect-select': {
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  py: 0.5
                }
              }}
              renderValue={(value) => <StatusChip status={value} />}
              disableUnderline
            >
              <MenuItem value="Complete">
                <StatusChip status="Complete" />
              </MenuItem>
              <MenuItem value="Pending">
                <StatusChip status="Pending" />
              </MenuItem>
              <MenuItem value="Terminated">
                <StatusChip status="Terminated" />
              </MenuItem>
            </Select>
          </FormControl>
        </TableCell>
        <TableCell align="center">
          <IconButton size="small" onClick={(e) => {
            e.stopPropagation();
            onEdit(prescription);
          }}>
            <EditIcon />
          </IconButton>
          <IconButton size="small" onClick={(e) => {
            e.stopPropagation();
            onDelete(prescription.id);
          }}>
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 2 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Patient Information
                  </Typography>
                  <List dense sx={{ bgcolor: 'background.paper', borderRadius: 1 }}>
                    <ListItem>
                      <ListItemText 
                        primary={<Typography variant="body2" color="text.secondary">Date of Birth</Typography>}
                        secondary={<Typography variant="body1">{prescription.dateOfBirth}</Typography>}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText 
                        primary={<Typography variant="body2" color="text.secondary">Patient ID</Typography>}
                        secondary={<Typography variant="body1">{prescription.patientId}</Typography>}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText 
                        primary={<Typography variant="body2" color="text.secondary">Contact</Typography>}
                        secondary={<Typography variant="body1">{prescription.contactDetails}</Typography>}
                      />
                    </ListItem>
                  </List>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Prescriber Information
                  </Typography>
                  <List dense sx={{ bgcolor: 'background.paper', borderRadius: 1 }}>
                    <ListItem>
                      <ListItemText 
                        primary={<Typography variant="body2" color="text.secondary">License Number</Typography>}
                        secondary={<Typography variant="body1">{prescription.prescriberLicense}</Typography>}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText 
                        primary={<Typography variant="body2" color="text.secondary">Contact</Typography>}
                        secondary={<Typography variant="body1">{prescription.prescriberContact}</Typography>}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText 
                        primary={<Typography variant="body2" color="text.secondary">Clinic/Hospital</Typography>}
                        secondary={<Typography variant="body1">{prescription.prescriberClinic}</Typography>}
                      />
                    </ListItem>
                  </List>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Prescribed Medications
                  </Typography>
                  <TableContainer component={Paper} variant="outlined">
                    <Table size="small">
                      <TableHead>
                        <TableRow sx={{ backgroundColor: '#f8fafc' }}>
                          <TableCell align="center" sx={{ fontWeight: 500 }}>Medication</TableCell>
                          <TableCell align="center" sx={{ fontWeight: 500 }}>Dosage Form</TableCell>
                          <TableCell align="center" sx={{ fontWeight: 500 }}>Strength</TableCell>
                          <TableCell align="center" sx={{ fontWeight: 500 }}>Quantity</TableCell>
                          <TableCell align="center" sx={{ fontWeight: 500 }}>Frequency</TableCell>
                          <TableCell align="center" sx={{ fontWeight: 500 }}>Duration</TableCell>
                          <TableCell align="center" sx={{ fontWeight: 500 }}>Refill Authorization</TableCell>
                          <TableCell align="center" sx={{ fontWeight: 500 }}>Expiry Date</TableCell>
                          <TableCell align="center" sx={{ fontWeight: 500 }}>Instructions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {prescription.items.map((item) => (
                          <TableRow key={item.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell align="center" sx={{ whiteSpace: 'nowrap' }}>{item.drugName}</TableCell>
                            <TableCell align="center">{item.dosageForm}</TableCell>
                            <TableCell align="center">{item.strength}</TableCell>
                            <TableCell align="center">{item.quantity}</TableCell>
                            <TableCell align="center">{item.frequency}</TableCell>
                            <TableCell align="center">{item.duration}</TableCell>
                            <TableCell align="center">{prescription.refillAuthorization}</TableCell>
                            <TableCell align="center">{prescription.expiryDate}</TableCell>
                            <TableCell align="center">{item.specialNotes}</TableCell>
                          </TableRow>
                        ))}
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

function Prescriptions() {
  const [prescriptions, setPrescriptions] = useState(initialPrescriptions);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [editFormData, setEditFormData] = useState({
    // Row Information
    id: '',
    prescriptionDate: '',
    status: '',
    // Patient Information
    patientName: '',
    dateOfBirth: '',
    patientId: '',
    contactDetails: '',
    // Prescriber Information
    prescriberName: '',
    prescriberLicense: '',
    prescriberContact: '',
    prescriberClinic: '',
    // Prescription Items
    items: []
  });

  const handleStatusChange = (id, newStatus) => {
    setPrescriptions(prev =>
      prev.map(prescription =>
        prescription.id === id
          ? { ...prescription, status: newStatus }
          : prescription
      )
    );
  };

  const handleEdit = (prescription) => {
    setSelectedPrescription(prescription);
    setEditFormData({
      // Row Information
      id: prescription.id,
      prescriptionDate: prescription.prescriptionDate,
      status: prescription.status,
      // Patient Information
      patientName: prescription.patientName,
      dateOfBirth: prescription.dateOfBirth,
      patientId: prescription.patientId,
      contactDetails: prescription.contactDetails,
      // Prescriber Information
      prescriberName: prescription.prescriberName,
      prescriberLicense: prescription.prescriberLicense,
      prescriberContact: prescription.prescriberContact,
      prescriberClinic: prescription.prescriberClinic,
      // Prescription Items
      items: [...prescription.items]
    });
    setOpenDialog(true);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleMedicationChange = (index, field, value) => {
    setEditFormData(prev => ({
      ...prev,
      items: prev.items.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const handleEditSubmit = () => {
    setPrescriptions(prev =>
      prev.map(prescription =>
        prescription.id === editFormData.id ? { ...editFormData } : prescription
      )
    );
    setOpenDialog(false);
    setSelectedPrescription(null);
  };

  const handleDelete = (id) => {
    setPrescriptions(prev => prev.filter(prescription => prescription.id !== id));
  };

  const filteredPrescriptions = prescriptions.filter(prescription =>
    Object.values(prescription).some(value =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* Header Section */}
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
          Prescriptions
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            size="small"
            placeholder="Search prescriptions..."
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
            onClick={() => setOpenDialog(true)}
            sx={{
              borderRadius: 2,
              px: 3,
            }}
          >
            Add Prescription
          </Button>
        </Box>
      </Box>

      {/* Main Content */}
      <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f8fafc' }}>
              <TableCell align="center" sx={{ fontWeight: 500 }}>Date</TableCell>
              <TableCell align="center" sx={{ fontWeight: 500 }}>Prescription ID</TableCell>
              <TableCell align="center" sx={{ fontWeight: 500 }}>Patient Name</TableCell>
              <TableCell align="center" sx={{ fontWeight: 500 }}>Prescriber</TableCell>
              <TableCell align="center" sx={{ fontWeight: 500 }}>Status</TableCell>
              <TableCell align="center" sx={{ fontWeight: 500 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPrescriptions.map((prescription) => (
              <PrescriptionRow
                key={prescription.id}
                prescription={prescription}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onStatusChange={handleStatusChange}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
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
          <EditIcon sx={{ color: 'primary.main' }} />
          <Typography variant="h6">
            {selectedPrescription ? 'Edit Prescription' : 'Add New Prescription'}
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Row Information Section */}
            <Box>
              <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600, color: 'primary.main' }}>
                Prescription Details
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Prescription ID"
                    name="id"
                    value={editFormData.id}
                    fullWidth
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Prescription Date"
                    name="prescriptionDate"
                    type="date"
                    value={editFormData.prescriptionDate}
                    onChange={handleEditInputChange}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select
                      name="status"
                      value={editFormData.status}
                      onChange={handleEditInputChange}
                      label="Status"
                    >
                      <MenuItem value="Complete">Complete</MenuItem>
                      <MenuItem value="Pending">Pending</MenuItem>
                      <MenuItem value="Terminated">Terminated</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Box>

            {/* Patient Information Section */}
            <Box>
              <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600, color: 'primary.main' }}>
                Patient Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Patient Name"
                    name="patientName"
                    value={editFormData.patientName}
                    onChange={handleEditInputChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Date of Birth"
                    name="dateOfBirth"
                    type="date"
                    value={editFormData.dateOfBirth}
                    onChange={handleEditInputChange}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Patient ID"
                    name="patientId"
                    value={editFormData.patientId}
                    onChange={handleEditInputChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Contact Details"
                    name="contactDetails"
                    value={editFormData.contactDetails}
                    onChange={handleEditInputChange}
                    fullWidth
                  />
                </Grid>
              </Grid>
            </Box>

            {/* Prescriber Information Section */}
            <Box>
              <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600, color: 'primary.main' }}>
                Prescriber Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Prescriber Name"
                    name="prescriberName"
                    value={editFormData.prescriberName}
                    onChange={handleEditInputChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="License Number"
                    name="prescriberLicense"
                    value={editFormData.prescriberLicense}
                    onChange={handleEditInputChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Contact Details"
                    name="prescriberContact"
                    value={editFormData.prescriberContact}
                    onChange={handleEditInputChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Clinic/Hospital"
                    name="prescriberClinic"
                    value={editFormData.prescriberClinic}
                    onChange={handleEditInputChange}
                    fullWidth
                  />
                </Grid>
              </Grid>
            </Box>

            {/* Prescribed Medications Section */}
            <Box>
              <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600, color: 'primary.main' }}>
                Prescribed Medications
              </Typography>
              <TableContainer component={Paper} variant="outlined">
                <Table size="small">
                  <TableHead>
                    <TableRow sx={{ backgroundColor: '#f8fafc' }}>
                      <TableCell>Medication</TableCell>
                      <TableCell>Dosage Form</TableCell>
                      <TableCell>Strength</TableCell>
                      <TableCell>Quantity</TableCell>
                      <TableCell>Frequency</TableCell>
                      <TableCell>Duration</TableCell>
                      <TableCell>Instructions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {editFormData.items.map((item, index) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <TextField
                            size="small"
                            value={item.drugName}
                            onChange={(e) => handleMedicationChange(index, 'drugName', e.target.value)}
                            fullWidth
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            size="small"
                            value={item.dosageForm}
                            onChange={(e) => handleMedicationChange(index, 'dosageForm', e.target.value)}
                            fullWidth
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            size="small"
                            value={item.strength}
                            onChange={(e) => handleMedicationChange(index, 'strength', e.target.value)}
                            fullWidth
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            size="small"
                            type="number"
                            value={item.quantity}
                            onChange={(e) => handleMedicationChange(index, 'quantity', e.target.value)}
                            fullWidth
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            size="small"
                            value={item.frequency}
                            onChange={(e) => handleMedicationChange(index, 'frequency', e.target.value)}
                            fullWidth
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            size="small"
                            value={item.duration}
                            onChange={(e) => handleMedicationChange(index, 'duration', e.target.value)}
                            fullWidth
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            size="small"
                            value={item.specialNotes}
                            onChange={(e) => handleMedicationChange(index, 'specialNotes', e.target.value)}
                            fullWidth
                            multiline
                            rows={2}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ 
          p: 2,
          borderTop: '1px solid',
          borderColor: 'divider'
        }}>
          <Button 
            onClick={() => setOpenDialog(false)}
            startIcon={<DeleteIcon />}
          >
            Cancel
          </Button>
          <Button 
            variant="contained"
            onClick={handleEditSubmit}
            disabled={!editFormData.patientName || !editFormData.prescriberName}
          >
            {selectedPrescription ? 'Update Prescription' : 'Add Prescription'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Prescriptions; 