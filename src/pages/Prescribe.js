import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Divider,
  Badge,
  Chip,
  Alert,
  Snackbar,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  LocalPharmacy as PrescriptionIcon,
  Delete as DeleteIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// Sample inventory data for testing
const inventory = [
  {
    category: 'Pain Relief',
    items: [
      {
        id: 1,
        name: 'Paracetamol (Panadol)',
        dosageForms: ['Tablet', 'Syrup', 'Suppository'],
        strengths: ['500mg', '1000mg'],
        unit: 'tablets',
        currentStock: 5000,
        minQuantity: 1000,
      },
      {
        id: 2,
        name: 'Ibuprofen (Advil)',
        dosageForms: ['Tablet', 'Capsule', 'Suspension'],
        strengths: ['200mg', '400mg', '600mg'],
        unit: 'tablets',
        currentStock: 3000,
        minQuantity: 1000,
      },
    ],
  },
  {
    category: 'Antibiotics',
    items: [
      {
        id: 3,
        name: 'Amoxicillin (Amoxil)',
        dosageForms: ['Capsule', 'Suspension', 'Injection'],
        strengths: ['250mg', '500mg'],
        unit: 'capsules',
        currentStock: 1000,
        minQuantity: 500,
      },
    ],
  },
];

function Prescribe() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [prescriptionDialogOpen, setPrescriptionDialogOpen] = useState(false);
  const [basketDialogOpen, setBasketDialogOpen] = useState(false);
  const [prescriptionDetails, setPrescriptionDetails] = useState({
    // Medication Details
    drugName: '',
    dosageForm: '',
    strength: '',
    quantity: '',
    frequency: '',
    duration: '',
    route: '',
    specialNotes: '',
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
    // Prescription Metadata
    prescriptionDate: new Date().toISOString().split('T')[0],
    prescriptionId: `RX${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
    refillAuthorization: '0',
    expiryDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  });
  const [prescriptionItems, setPrescriptionItems] = useState([]);
  const [snackbarState, setSnackbarState] = useState({
    open: false,
    message: '',
    severity: 'success',
  });
  const [currentInventory, setCurrentInventory] = useState(inventory);

  const handleAddToPrescription = (item) => {
    setSelectedItem(item);
    // Reset prescription details when adding a new item
    setPrescriptionDetails({
      drugName: item.name,
      dosageForm: item.dosageForms[0],
      strength: item.strengths[0],
      quantity: '',
      frequency: '',
      duration: '',
      specialNotes: '',
      // Keep patient and prescriber info
      patientName: prescriptionDetails.patientName,
      dateOfBirth: prescriptionDetails.dateOfBirth,
      patientId: prescriptionDetails.patientId,
      contactDetails: prescriptionDetails.contactDetails,
      prescriberName: prescriptionDetails.prescriberName,
      prescriberLicense: prescriptionDetails.prescriberLicense,
      prescriberContact: prescriptionDetails.prescriberContact,
      prescriberClinic: prescriptionDetails.prescriberClinic,
      prescriptionDate: prescriptionDetails.prescriptionDate,
      prescriptionId: prescriptionDetails.prescriptionId,
      refillAuthorization: prescriptionDetails.refillAuthorization,
      expiryDate: prescriptionDetails.expiryDate,
    });
    setPrescriptionDialogOpen(true);
  };

  const handlePrescriptionSubmit = () => {
    const newItem = {
      id: selectedItem.id,
      drugName: prescriptionDetails.drugName,
      dosageForm: prescriptionDetails.dosageForm,
      strength: prescriptionDetails.strength,
      quantity: prescriptionDetails.quantity,
      frequency: prescriptionDetails.frequency,
      duration: prescriptionDetails.duration,
      specialNotes: prescriptionDetails.specialNotes,
    };

    setPrescriptionItems(prev => [...prev, newItem]);
    setPrescriptionDialogOpen(false);
    setSelectedItem(null); // Reset selected item but keep the category

    // Update inventory
    setCurrentInventory(prevInventory => 
      prevInventory.map(category => ({
        ...category,
        items: category.items.map(item => 
          item.id === selectedItem.id
            ? { ...item, currentStock: item.currentStock - parseInt(prescriptionDetails.quantity) }
            : item
        )
      }))
    );

    setSnackbarState({
      open: true,
      message: 'Medication added to prescription',
      severity: 'success',
    });
  };

  const handlePrescriptionRemove = (itemId) => {
    const removedItem = prescriptionItems.find(item => item.id === itemId);
    setPrescriptionItems(prev => prev.filter(item => item.id !== itemId));

    // Restore inventory
    setCurrentInventory(prevInventory => 
      prevInventory.map(category => ({
        ...category,
        items: category.items.map(item => 
          item.id === itemId
            ? { ...item, currentStock: item.currentStock + parseInt(removedItem.quantity) }
            : item
        )
      }))
    );

    setSnackbarState({
      open: true,
      message: 'Medication removed from prescription',
      severity: 'success',
    });
  };

  const handleFinalizePrescription = () => {
    // Here you would typically send the prescription to your backend
    console.log('Prescription submitted:', {
      ...prescriptionDetails,
      items: prescriptionItems,
    });
    
    setSnackbarState({
      open: true,
      message: 'Prescription finalized successfully!',
      severity: 'success',
    });
    
    // Reset the form
    setPrescriptionDetails({
      drugName: '',
      dosageForm: '',
      strength: '',
      quantity: '',
      frequency: '',
      duration: '',
      route: '',
      specialNotes: '',
      patientName: '',
      dateOfBirth: '',
      patientId: '',
      contactDetails: '',
      prescriberName: '',
      prescriberLicense: '',
      prescriberContact: '',
      prescriberClinic: '',
      prescriptionDate: new Date().toISOString().split('T')[0],
      prescriptionId: `RX${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
      refillAuthorization: '0',
      expiryDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    });
    setPrescriptionItems([]);
    setSelectedCategory(null);
    setSelectedItem(null);
    setCurrentInventory(inventory); // Reset inventory
    setBasketDialogOpen(false);
  };

  const handleBack = () => {
    if (selectedItem) {
      setSelectedItem(null);
    } else if (selectedCategory) {
      setSelectedCategory(null);
    } else {
      navigate(-1);
    }
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* Header Section */}
      <Box sx={{ 
        backgroundColor: 'white',
        p: 3,
        borderRadius: 2,
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        borderBottom: '1px solid',
        borderColor: 'divider',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton onClick={handleBack} sx={{ color: '#64748b' }}>
            <ArrowBackIcon />
          </IconButton>
          <Box>
            <Typography variant="h4" sx={{ 
              fontWeight: 600,
              color: '#1e293b',
              mb: 1
            }}>
              Create Prescription
            </Typography>
            <Typography variant="body1" sx={{ 
              color: '#64748b',
              fontSize: '1.1rem'
            }}>
              {selectedCategory ? `Select a medication from ${selectedCategory.category}` : 'Select a category to begin'}
            </Typography>
          </Box>
        </Box>
        {prescriptionItems.length > 0 && (
          <Button
            variant="contained"
            onClick={() => setBasketDialogOpen(true)}
            startIcon={<PrescriptionIcon />}
            sx={{
              borderRadius: 2,
              px: 3,
              py: 1.5,
              backgroundColor: '#3b82f6',
              '&:hover': {
                backgroundColor: '#2563eb',
              },
            }}
          >
            View Prescription ({prescriptionItems.length})
          </Button>
        )}
      </Box>

      {/* Content Section */}
      <Box sx={{ flex: 1, overflow: 'auto', position: 'relative' }}>
        {!selectedCategory ? (
          // Categories Grid
          <Grid container spacing={3} sx={{ p: 3 }}>
            {currentInventory.map((category) => (
              <Grid item xs={12} sm={6} md={4} key={category.category}>
                <Card 
                  onClick={() => setSelectedCategory(category)}
                  sx={{ 
                    cursor: 'pointer',
                    height: '100%',
                    '&:hover': {
                      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.2s ease',
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {category.category}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {category.items.length} medications available
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          // Items Table
          <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f8fafc' }}>
                  <TableCell align="center">Medication Name</TableCell>
                  <TableCell align="center">Available Forms</TableCell>
                  <TableCell align="center">Available Strengths</TableCell>
                  <TableCell align="center">Current Stock</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedCategory.items.map((item) => {
                  const currentStock = item.currentStock;
                  const isOutOfStock = currentStock <= 0;
                  return (
                    <TableRow key={item.id}>
                      <TableCell align="center">{item.name}</TableCell>
                      <TableCell align="center">{item.dosageForms.join(', ')}</TableCell>
                      <TableCell align="center">{item.strengths.join(', ')}</TableCell>
                      <TableCell align="center">
                        {isOutOfStock ? (
                          <Typography color="error">Out of Stock</Typography>
                        ) : (
                          `${currentStock} ${item.unit}`
                        )}
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => handleAddToPrescription(item)}
                          disabled={isOutOfStock}
                        >
                          Add to Prescription
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>

      {/* Prescription Dialog */}
      <Dialog
        open={prescriptionDialogOpen}
        onClose={() => setPrescriptionDialogOpen(false)}
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
          py: 2
        }}>
          Add Medication to Prescription
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <Box sx={{ 
            backgroundColor: '#f1f5f9',
            p: 2,
            borderRadius: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: 2
          }}>
            <Typography variant="subtitle1">Medication Details</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Drug Name"
                  value={prescriptionDetails.drugName}
                  fullWidth
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="dosage-form-label">Dosage Form</InputLabel>
                  <Select
                    labelId="dosage-form-label"
                    value={prescriptionDetails.dosageForm}
                    onChange={(e) => setPrescriptionDetails(prev => ({ ...prev, dosageForm: e.target.value }))}
                    label="Dosage Form"
                  >
                    {selectedItem?.dosageForms.map((form) => (
                      <MenuItem key={form} value={form}>
                        {form}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="strength-label">Strength</InputLabel>
                  <Select
                    labelId="strength-label"
                    value={prescriptionDetails.strength}
                    onChange={(e) => setPrescriptionDetails(prev => ({ ...prev, strength: e.target.value }))}
                    label="Strength"
                  >
                    {selectedItem?.strengths.map((strength) => (
                      <MenuItem key={strength} value={strength}>
                        {strength}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Quantity"
                  value={prescriptionDetails.quantity}
                  onChange={(e) => setPrescriptionDetails(prev => ({ ...prev, quantity: e.target.value }))}
                  fullWidth
                  type="number"
                  inputProps={{ min: 1, max: selectedItem?.currentStock }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Frequency"
                  value={prescriptionDetails.frequency}
                  onChange={(e) => setPrescriptionDetails(prev => ({ ...prev, frequency: e.target.value }))}
                  fullWidth
                  placeholder="e.g., Twice daily"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Duration"
                  value={prescriptionDetails.duration}
                  onChange={(e) => setPrescriptionDetails(prev => ({ ...prev, duration: e.target.value }))}
                  fullWidth
                  placeholder="e.g., For 7 days"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Usage Instructions"
                  value={prescriptionDetails.specialNotes}
                  onChange={(e) => setPrescriptionDetails(prev => ({ ...prev, specialNotes: e.target.value }))}
                  fullWidth
                  multiline
                  rows={2}
                  placeholder="e.g., Take with food"
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions sx={{ 
          p: 2,
          borderTop: '1px solid',
          borderColor: 'divider'
        }}>
          <Button 
            onClick={() => setPrescriptionDialogOpen(false)}
            sx={{ 
              borderRadius: 1,
              px: 3
            }}
          >
            Cancel
          </Button>
          <Button 
            variant="contained"
            onClick={handlePrescriptionSubmit}
            disabled={!prescriptionDetails.dosageForm || !prescriptionDetails.strength || !prescriptionDetails.quantity || !prescriptionDetails.frequency || !prescriptionDetails.duration || !prescriptionDetails.specialNotes}
            sx={{ 
              borderRadius: 1,
              px: 3
            }}
          >
            Add to Prescription
          </Button>
        </DialogActions>
      </Dialog>

      {/* Prescription Basket Dialog */}
      <Dialog
        open={basketDialogOpen}
        onClose={() => setBasketDialogOpen(false)}
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
          py: 2
        }}>
          Prescription Basket
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <Box sx={{ 
            backgroundColor: '#f1f5f9',
            p: 3,
            borderRadius: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: 3
          }}>
            <Box>
              <Typography variant="subtitle1" gutterBottom>
                Current Prescription Items
              </Typography>
              <List>
                {prescriptionItems.map((item) => (
                  <ListItem 
                    key={item.id} 
                    divider
                    sx={{ 
                      py: 1.5,
                      '&:hover': {
                        backgroundColor: 'rgba(0,0,0,0.02)'
                      }
                    }}
                  >
                    <ListItemText
                      primary={item.drugName}
                      secondary={
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                          <Typography variant="body2">
                            {item.dosageForm} {item.strength}
                          </Typography>
                          <Typography variant="body2">
                            {item.quantity} - {item.frequency} for {item.duration}
                          </Typography>
                          {item.specialNotes && (
                            <Typography variant="body2" color="text.secondary">
                              Instructions: {item.specialNotes}
                            </Typography>
                          )}
                        </Box>
                      }
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        onClick={() => handlePrescriptionRemove(item.id)}
                        size="small"
                        sx={{ 
                          color: 'error.main',
                          '&:hover': {
                            backgroundColor: 'error.light',
                            color: 'error.contrastText'
                          }
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </Box>

            <Box>
              <Typography variant="subtitle1" gutterBottom>
                Patient Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Full Name"
                    value={prescriptionDetails.patientName}
                    onChange={(e) => setPrescriptionDetails(prev => ({ ...prev, patientName: e.target.value }))}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Date of Birth"
                    type="date"
                    value={prescriptionDetails.dateOfBirth}
                    onChange={(e) => setPrescriptionDetails(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Patient ID"
                    value={prescriptionDetails.patientId}
                    onChange={(e) => setPrescriptionDetails(prev => ({ ...prev, patientId: e.target.value }))}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Contact Details"
                    value={prescriptionDetails.contactDetails}
                    onChange={(e) => setPrescriptionDetails(prev => ({ ...prev, contactDetails: e.target.value }))}
                    fullWidth
                  />
                </Grid>
              </Grid>
            </Box>

            <Box>
              <Typography variant="subtitle1" gutterBottom>
                Prescriber Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Doctor's Name & Credentials"
                    value={prescriptionDetails.prescriberName}
                    onChange={(e) => setPrescriptionDetails(prev => ({ ...prev, prescriberName: e.target.value }))}
                    fullWidth
                    placeholder="e.g., Dr. Smith, MD"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="License/Registration Number"
                    value={prescriptionDetails.prescriberLicense}
                    onChange={(e) => setPrescriptionDetails(prev => ({ ...prev, prescriberLicense: e.target.value }))}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Contact Details"
                    value={prescriptionDetails.prescriberContact}
                    onChange={(e) => setPrescriptionDetails(prev => ({ ...prev, prescriberContact: e.target.value }))}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Clinic/Hospital Details"
                    value={prescriptionDetails.prescriberClinic}
                    onChange={(e) => setPrescriptionDetails(prev => ({ ...prev, prescriberClinic: e.target.value }))}
                    fullWidth
                  />
                </Grid>
              </Grid>
            </Box>

            <Box>
              <Typography variant="subtitle1" gutterBottom>
                Prescription Metadata
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Prescription ID"
                    value={prescriptionDetails.prescriptionId}
                    fullWidth
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Date of Issue"
                    type="date"
                    value={prescriptionDetails.prescriptionDate}
                    onChange={(e) => setPrescriptionDetails(prev => ({ ...prev, prescriptionDate: e.target.value }))}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Refill Authorization"
                    value={prescriptionDetails.refillAuthorization}
                    onChange={(e) => setPrescriptionDetails(prev => ({ ...prev, refillAuthorization: e.target.value }))}
                    fullWidth
                    placeholder="e.g., Refills: 1"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Expiry Date"
                    type="date"
                    value={prescriptionDetails.expiryDate}
                    onChange={(e) => setPrescriptionDetails(prev => ({ ...prev, expiryDate: e.target.value }))}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
              </Grid>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ 
          p: 2,
          borderTop: '1px solid',
          borderColor: 'divider'
        }}>
          <Button 
            onClick={() => setBasketDialogOpen(false)}
            sx={{ 
              borderRadius: 1,
              px: 3
            }}
          >
            Cancel
          </Button>
          <Button 
            variant="contained"
            onClick={handleFinalizePrescription}
            disabled={!prescriptionDetails.patientName || !prescriptionDetails.prescriberName}
            sx={{ 
              borderRadius: 1,
              px: 3
            }}
          >
            Finalize Prescription
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success Message */}
      <Snackbar
        open={snackbarState.open}
        autoHideDuration={6000}
        onClose={() => setSnackbarState(prev => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setSnackbarState(prev => ({ ...prev, open: false }))} 
          severity={snackbarState.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbarState.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Prescribe; 