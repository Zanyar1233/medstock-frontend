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
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  Visibility as ViewIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
} from '@mui/icons-material';

// Placeholder data
const initialPrescriptions = [
  {
    id: 1,
    patientName: 'John Doe',
    patientId: 'P001',
    patientAddress: '123 Main St',
    doctorName: 'Dr. Smith',
    doctorId: 'D001',
    nurseName: 'Nurse Johnson',
    nurseId: 'N001',
    medicine: 'Paracetamol',
    quantity: '20 tablets',
    dosage: '2 tablets daily',
    date: '2024-03-26',
    status: 'Active',
    prescriptionHistory: [
      {
        id: 1,
        date: '2024-03-26',
        diagnosis: 'Acute Fever',
        notes: 'Patient presented with high fever and body aches. Prescribed paracetamol for fever management.',
        followUp: '2024-03-29',
        administeredBy: 'Nurse Johnson',
        observations: 'Temperature: 39°C, Blood Pressure: 120/80',
      },
      {
        id: 2,
        date: '2024-03-27',
        diagnosis: 'Persistent Fever',
        notes: 'Follow-up visit. Fever reduced but still present. Continuing current medication.',
        followUp: '2024-03-30',
        administeredBy: 'Nurse Johnson',
        observations: 'Temperature: 38°C, Blood Pressure: 118/78',
      },
    ],
  },
  {
    id: 2,
    patientName: 'Jane Smith',
    patientId: 'P002',
    patientAddress: '456 Oak Ave',
    doctorName: 'Dr. Brown',
    doctorId: 'D002',
    nurseName: 'Nurse Wilson',
    nurseId: 'N002',
    medicine: 'Amoxicillin',
    quantity: '30 capsules',
    dosage: '1 capsule twice daily',
    date: '2024-03-25',
    status: 'Completed',
    prescriptionHistory: [
      {
        id: 1,
        date: '2024-03-25',
        diagnosis: 'Bacterial Infection',
        notes: 'Patient showing signs of bacterial infection. Prescribed antibiotics for 7 days.',
        followUp: '2024-04-01',
        administeredBy: 'Nurse Wilson',
        observations: 'Temperature: 37.5°C, Blood Pressure: 122/82',
      },
      {
        id: 2,
        date: '2024-03-28',
        diagnosis: 'Improving',
        notes: 'Follow-up visit. Infection showing signs of improvement. Continuing antibiotics.',
        followUp: '2024-04-01',
        administeredBy: 'Nurse Wilson',
        observations: 'Temperature: 37°C, Blood Pressure: 120/80',
      },
    ],
  },
];

function Prescriptions() {
  const [prescriptions, setPrescriptions] = useState(initialPrescriptions);
  const [openDialog, setOpenDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [expandedId, setExpandedId] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'asc',
  });
  const [formData, setFormData] = useState({
    patientName: '',
    patientId: '',
    patientAddress: '',
    doctorName: '',
    doctorId: '',
    nurseName: '',
    nurseId: '',
    medicine: '',
    quantity: '',
    dosage: '',
    date: new Date().toISOString().split('T')[0],  // Keep default to today
    status: 'Active',                               // Keep default status
    notes: '',
  });

  const handleOpenDialog = (prescription = null) => {
    if (prescription) {
      setSelectedPrescription(prescription);
      setFormData(prescription);
    } else {
      setSelectedPrescription(null);
      setFormData({
        patientName: '',
        patientId: '',
        patientAddress: '',
        doctorName: '',
        doctorId: '',
        nurseName: '',
        nurseId: '',
        medicine: '',
        quantity: '',
        dosage: '',
        date: new Date().toISOString().split('T')[0],  // Keep default to today
        status: 'Active',                               // Keep default status
        notes: '',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedPrescription(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    if (selectedPrescription) {
      // Update existing prescription
      setPrescriptions(prev =>
        prev.map(prescription =>
          prescription.id === selectedPrescription.id
            ? { ...formData, id: prescription.id, prescriptionHistory: prescription.prescriptionHistory || [] }
            : prescription
        )
      );
    } else {
      // Add new prescription
      setPrescriptions(prev => [
        ...prev,
        { ...formData, id: prev.length + 1, prescriptionHistory: [] }
      ]);
    }
    handleCloseDialog();
  };

  const handleDelete = (id) => {
    setPrescriptions(prev => prev.filter(prescription => prescription.id !== id));
  };

  const handleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const filteredPrescriptions = prescriptions.filter(prescription =>
    Object.values(prescription).some(value =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const sortedPrescriptions = [...filteredPrescriptions].sort((a, b) => {
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

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'success';
      case 'completed':
        return 'info';
      case 'cancelled':
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

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Prescription Management
      </Typography>

      {/* Search and Actions */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Search Prescriptions"
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
            New Prescription
          </Button>
        </Grid>
      </Grid>

      {/* Prescriptions Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell width="40px" /> {/* Expansion control column */}
              <SortableTableCell label="Patient" sortKey="patientName" />
              <SortableTableCell label="Doctor" sortKey="doctorName" />
              <SortableTableCell label="Nurse" sortKey="nurseName" />
              <SortableTableCell label="Medicine" sortKey="medicine" />
              <TableCell>Quantity</TableCell>
              <SortableTableCell label="Date" sortKey="date" />
              <SortableTableCell label="Status" sortKey="status" />
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedPrescriptions.map((prescription) => (
              <React.Fragment key={prescription.id}>
                <TableRow>
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={() => handleExpand(prescription.id)}
                    >
                      {expandedId === prescription.id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <Box>
                      <Typography variant="body1">{prescription.patientName}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        ID: {prescription.patientId}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box>
                      <Typography variant="body1">{prescription.doctorName}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        ID: {prescription.doctorId}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box>
                      <Typography variant="body1">{prescription.nurseName}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        ID: {prescription.nurseId}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{prescription.medicine}</TableCell>
                  <TableCell>{prescription.quantity}</TableCell>
                  <TableCell>{prescription.date}</TableCell>
                  <TableCell>
                    <Chip
                      label={prescription.status}
                      color={getStatusColor(prescription.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleOpenDialog(prescription)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(prescription.id)}>
                      <DeleteIcon />
                    </IconButton>
                    <IconButton>
                      <ViewIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={9}>
                    <Collapse in={expandedId === prescription.id} timeout="auto" unmountOnExit>
                      <Box sx={{ margin: 2 }}>
                        <Grid container spacing={3}>
                          {/* Left Column - Clinical Information */}
                          <Grid item xs={12} md={6}>
                            <Box sx={{ mb: 3 }}>
                              <Typography variant="subtitle1" color="primary" gutterBottom>
                                Clinical Assessment
                              </Typography>
                              <Box sx={{ pl: 2 }}>
                                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                  Diagnosis
                                </Typography>
                                <Typography variant="body2" paragraph>
                                  {prescription.prescriptionHistory?.[0]?.diagnosis || 'No diagnosis recorded'}
                                </Typography>
                                
                                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                  Clinical Notes
                                </Typography>
                                <Typography variant="body2" paragraph>
                                  {prescription.prescriptionHistory?.[0]?.notes || 'No clinical notes available'}
                                </Typography>

                                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                  Patient Observations
                                </Typography>
                                <Typography variant="body2" paragraph>
                                  {prescription.prescriptionHistory?.[0]?.observations || 'No observations recorded'}
                                </Typography>
                              </Box>
                            </Box>
                          </Grid>

                          {/* Right Column - Treatment & Administration */}
                          <Grid item xs={12} md={6}>
                            <Box sx={{ mb: 3 }}>
                              <Typography variant="subtitle1" color="primary" gutterBottom>
                                Treatment Plan
                              </Typography>
                              <Box sx={{ pl: 2 }}>
                                <Grid container spacing={2}>
                                  <Grid item xs={6}>
                                    <Typography variant="subtitle2" color="text.secondary">
                                      Medicine
                                    </Typography>
                                    <Typography variant="body2">
                                      {prescription.medicine}
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={6}>
                                    <Typography variant="subtitle2" color="text.secondary">
                                      Dosage
                                    </Typography>
                                    <Typography variant="body2">
                                      {prescription.dosage}
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={6}>
                                    <Typography variant="subtitle2" color="text.secondary">
                                      Quantity
                                    </Typography>
                                    <Typography variant="body2">
                                      {prescription.quantity}
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={6}>
                                    <Typography variant="subtitle2" color="text.secondary">
                                      Follow-up
                                    </Typography>
                                    <Typography variant="body2">
                                      {prescription.prescriptionHistory?.[0]?.followUp || 'Not scheduled'}
                                    </Typography>
                                  </Grid>
                                </Grid>
                              </Box>
                            </Box>

                            <Box>
                              <Typography variant="subtitle1" color="primary" gutterBottom>
                                Administration Details
                              </Typography>
                              <Box sx={{ pl: 2 }}>
                                <Grid container spacing={2}>
                                  <Grid item xs={6}>
                                    <Typography variant="subtitle2" color="text.secondary">
                                      Administered By
                                    </Typography>
                                    <Typography variant="body2">
                                      {prescription.prescriptionHistory?.[0]?.administeredBy || 'Not administered'}
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={6}>
                                    <Typography variant="subtitle2" color="text.secondary">
                                      Date
                                    </Typography>
                                    <Typography variant="body2">
                                      {prescription.date}
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={12}>
                                    <Typography variant="subtitle2" color="text.secondary">
                                      Status
                                    </Typography>
                                    <Chip
                                      label={prescription.status}
                                      color={getStatusColor(prescription.status)}
                                      size="small"
                                      sx={{ mt: 0.5 }}
                                    />
                                  </Grid>
                                </Grid>
                              </Box>
                            </Box>
                          </Grid>
                        </Grid>
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
            {selectedPrescription ? 'Edit Prescription' : 'New Prescription'}
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ p: 3 }}>
          <Grid container spacing={3}>
            {/* Patient Information Section */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 500, color: 'primary.main' }}>
                Patient Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Patient Name"
                    name="patientName"
                    value={formData.patientName}
                    onChange={handleInputChange}
                    variant="outlined"
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Patient ID"
                    name="patientId"
                    value={formData.patientId}
                    onChange={handleInputChange}
                    variant="outlined"
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Patient Address"
                    name="patientAddress"
                    value={formData.patientAddress}
                    onChange={handleInputChange}
                    variant="outlined"
                    multiline
                    rows={2}
                  />
                </Grid>
              </Grid>
            </Grid>

            {/* Prescription Details Section */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" sx={{ mb: 2, mt: 1, fontWeight: 500, color: 'primary.main' }}>
                Prescription Details
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Medicine"
                    name="medicine"
                    value={formData.medicine}
                    onChange={handleInputChange}
                    variant="outlined"
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Quantity"
                    name="quantity"
                    type="number"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    variant="outlined"
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Dosage"
                    name="dosage"
                    value={formData.dosage}
                    onChange={handleInputChange}
                    variant="outlined"
                    placeholder="e.g., 1 tablet twice daily"
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Date"
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth required>
                    <InputLabel>Status</InputLabel>
                    <Select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      label="Status"
                      sx={{ height: '56px' }}
                    >
                      <MenuItem value="Active">
                        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', py: 1 }}>
                          <Chip label="Active" size="small" color="success" sx={{ mr: 1 }} />
                          <Typography>Active</Typography>
                        </Box>
                      </MenuItem>
                      <MenuItem value="Completed">
                        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', py: 1 }}>
                          <Chip label="Completed" size="small" color="primary" sx={{ mr: 1 }} />
                          <Typography>Completed</Typography>
                        </Box>
                      </MenuItem>
                      <MenuItem value="Cancelled">
                        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', py: 1 }}>
                          <Chip label="Cancelled" size="small" color="error" sx={{ mr: 1 }} />
                          <Typography>Cancelled</Typography>
                        </Box>
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>

            {/* Healthcare Provider Information */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" sx={{ mb: 2, mt: 1, fontWeight: 500, color: 'primary.main' }}>
                Healthcare Provider Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Doctor Name"
                    name="doctorName"
                    value={formData.doctorName}
                    onChange={handleInputChange}
                    variant="outlined"
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Doctor ID"
                    name="doctorId"
                    value={formData.doctorId}
                    onChange={handleInputChange}
                    variant="outlined"
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Nurse Name"
                    name="nurseName"
                    value={formData.nurseName}
                    onChange={handleInputChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Nurse ID"
                    name="nurseId"
                    value={formData.nurseId}
                    onChange={handleInputChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Notes"
                    name="notes"
                    multiline
                    rows={2}
                    value={formData.notes}
                    onChange={handleInputChange}
                    variant="outlined"
                    placeholder="Enter any additional notes or instructions"
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
            {selectedPrescription ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Prescriptions; 