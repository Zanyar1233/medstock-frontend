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
  Alert,
  Chip,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  QrCodeScanner as BarcodeIcon,
  Search as SearchIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
} from '@mui/icons-material';

// Placeholder data
const initialInventory = [
  {
    id: 1,
    name: 'Paracetamol',
    barcode: '123456789',
    category: 'Pain Relief',
    quantity: 150,
    unit: 'tablets',
    minQuantity: 200,
    location: 'Shelf A1',
    supplier: 'PharmaCorp',
  },
  {
    id: 2,
    name: 'Bandages',
    barcode: '987654321',
    category: 'First Aid',
    quantity: 75,
    unit: 'boxes',
    minQuantity: 100,
    location: 'Shelf B2',
    supplier: 'MedSupply',
  },
];

// List of approved suppliers
const suppliers = [
  {
    name: 'ABC Pharmaceuticals',
    location: 'New York, NY',
    type: 'Manufacturer',
    rating: 'A+'
  },
  {
    name: 'Global Medical Supplies',
    location: 'Chicago, IL',
    type: 'Distributor',
    rating: 'A'
  },
  {
    name: 'HealthCare Solutions',
    location: 'Los Angeles, CA',
    type: 'Manufacturer',
    rating: 'A+'
  },
  {
    name: 'MediCorp International',
    location: 'Miami, FL',
    type: 'Distributor',
    rating: 'A'
  },
  {
    name: 'MedSupply Co.',
    location: 'Houston, TX',
    type: 'Distributor',
    rating: 'B+'
  },
  {
    name: 'PharmaCorp',
    location: 'Boston, MA',
    type: 'Manufacturer',
    rating: 'A+'
  },
  {
    name: 'Quality Medical Products',
    location: 'Seattle, WA',
    type: 'Manufacturer',
    rating: 'A'
  },
  {
    name: 'SafeMed Supplies',
    location: 'Dallas, TX',
    type: 'Distributor',
    rating: 'B+'
  },
  {
    name: 'United Healthcare',
    location: 'Atlanta, GA',
    type: 'Manufacturer',
    rating: 'A+'
  },
  {
    name: 'Worldwide Medical',
    location: 'San Francisco, CA',
    type: 'Distributor',
    rating: 'A'
  }
];

function Inventory() {
  const [inventory, setInventory] = useState(initialInventory);
  const [openDialog, setOpenDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    barcode: '',
    category: 'Medical Supplies',
    quantity: '',
    unit: '',
    minQuantity: '',
    location: '',
    supplier: 'PharmaCorp',
    notes: '',
  });
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'asc',
  });

  const handleOpenDialog = (item = null) => {
    if (item) {
      setSelectedItem(item);
      setFormData(item);
    } else {
      setSelectedItem(null);
      setFormData({
        name: '',
        barcode: '',
        category: 'Medical Supplies',
        quantity: '',
        unit: '',
        minQuantity: '',
        location: '',
        supplier: 'PharmaCorp',
        notes: '',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedItem(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    if (selectedItem) {
      // Update existing item
      setInventory(prev =>
        prev.map(item =>
          item.id === selectedItem.id ? { ...formData, id: item.id } : item
        )
      );
    } else {
      // Add new item
      setInventory(prev => [
        ...prev,
        { ...formData, id: prev.length + 1 }
      ]);
    }
    handleCloseDialog();
  };

  const handleDelete = (id) => {
    setInventory(prev => prev.filter(item => item.id !== id));
  };

  const handleBarcodeScan = () => {
    // TODO: Implement barcode scanning functionality
    console.log('Barcode scanning initiated');
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedInventory = [...inventory].sort((a, b) => {
    if (!sortConfig.key) return 0;

    if (sortConfig.key === 'lastOrder') {
      return sortConfig.direction === 'asc'
        ? new Date(a[sortConfig.key]) - new Date(b[sortConfig.key])
        : new Date(b[sortConfig.key]) - new Date(a[sortConfig.key]);
    }

    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const filteredInventory = sortedInventory.filter(item =>
    Object.values(item).some(value =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const lowStockItems = inventory.filter(
    item => item.quantity <= item.minQuantity
  );

  const SortableTableCell = ({ label, sortKey }) => (
    <TableCell
      onClick={() => handleSort(sortKey)}
      sx={{ cursor: 'pointer' }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {label}
        {sortConfig.key === sortKey && (
          sortConfig.direction === 'asc' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />
        )}
      </Box>
    </TableCell>
  );

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Inventory Management
      </Typography>

      {/* Low Stock Alert */}
      {lowStockItems.length > 0 && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          {lowStockItems.length} items are running low on stock
        </Alert>
      )}

      {/* Search and Actions */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Search Inventory"
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
            startIcon={<BarcodeIcon />}
            onClick={handleBarcodeScan}
          >
            Scan Barcode
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
          >
            Add Item
          </Button>
        </Grid>
      </Grid>

      {/* Inventory Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <SortableTableCell label="Name" sortKey="name" />
              <SortableTableCell label="Barcode" sortKey="barcode" />
              <SortableTableCell label="Category" sortKey="category" />
              <TableCell>Quantity</TableCell>
              <TableCell>Unit</TableCell>
              <SortableTableCell label="Location" sortKey="location" />
              <SortableTableCell label="Supplier" sortKey="supplier" />
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredInventory.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <Box>
                    <Typography variant="body1">{item.name}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      ID: {item.id}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box>
                    <Typography variant="body1">{item.barcode}</Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box>
                    <Typography variant="body1">{item.category}</Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box>
                    <Typography variant="body1">{item.quantity}</Typography>
                    {item.quantity <= item.minQuantity && (
                      <Typography variant="caption" color="warning.main">
                        Below minimum
                      </Typography>
                    )}
                  </Box>
                </TableCell>
                <TableCell>
                  <Box>
                    <Typography variant="body1">{item.unit}</Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box>
                    <Typography variant="body1">{item.location}</Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box>
                    <Typography variant="body1">{item.supplier}</Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 0.5 }}>
                    <IconButton onClick={() => handleOpenDialog(item)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(item.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
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
            {selectedItem ? 'Edit Item' : 'Add New Item'}
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
                    label="Item Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Barcode"
                    name="barcode"
                    value={formData.barcode}
                    onChange={handleInputChange}
                    variant="outlined"
                    InputProps={{
                      endAdornment: (
                        <IconButton size="small" onClick={handleBarcodeScan}>
                          <BarcodeIcon />
                        </IconButton>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      label="Category"
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
                      <MenuItem value="Pain Relief">
                        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                          <Typography variant="body1">Pain Relief</Typography>
                          <Typography variant="caption" color="text.secondary">Medications for pain management</Typography>
                        </Box>
                      </MenuItem>
                      <MenuItem value="First Aid">
                        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                          <Typography variant="body1">First Aid</Typography>
                          <Typography variant="caption" color="text.secondary">Emergency care supplies</Typography>
                        </Box>
                      </MenuItem>
                      <MenuItem value="Antibiotics">
                        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                          <Typography variant="body1">Antibiotics</Typography>
                          <Typography variant="caption" color="text.secondary">Infection treatment medications</Typography>
                        </Box>
                      </MenuItem>
                      <MenuItem value="Medical Supplies">
                        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                          <Typography variant="body1">Medical Supplies</Typography>
                          <Typography variant="caption" color="text.secondary">General medical equipment and supplies</Typography>
                        </Box>
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Supplier</InputLabel>
                    <Select
                      name="supplier"
                      value={formData.supplier}
                      onChange={handleInputChange}
                      label="Supplier"
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
                      {suppliers.map((supplier) => (
                        <MenuItem key={supplier.name} value={supplier.name}>
                          <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                              <Typography variant="body1">{supplier.name}</Typography>
                              <Chip 
                                label={supplier.rating} 
                                size="small" 
                                color={supplier.rating === 'A+' ? 'success' : supplier.rating === 'A' ? 'primary' : 'warning'}
                                sx={{ ml: 1 }}
                              />
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <Typography variant="caption" color="text.secondary">
                                {supplier.location}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {supplier.type}
                              </Typography>
                            </Box>
                          </Box>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>

            {/* Quantity and Storage Section */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" sx={{ mb: 2, mt: 1, fontWeight: 500, color: 'primary.main' }}>
                Quantity and Storage
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Quantity"
                    name="quantity"
                    type="number"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Unit"
                    name="unit"
                    value={formData.unit}
                    onChange={handleInputChange}
                    variant="outlined"
                    placeholder="e.g., boxes, tablets, bottles"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Minimum Quantity"
                    name="minQuantity"
                    type="number"
                    value={formData.minQuantity}
                    onChange={handleInputChange}
                    variant="outlined"
                    helperText="Alert will be shown when stock falls below this level"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Storage Location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    variant="outlined"
                    placeholder="e.g., Shelf A1, Cabinet B2"
                  />
                </Grid>
              </Grid>
            </Grid>

            {/* Additional Information Section */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" sx={{ mb: 2, mt: 1, fontWeight: 500, color: 'primary.main' }}>
                Additional Information
              </Typography>
              <Grid container spacing={2}>
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
                    placeholder="Enter any additional information about the item"
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
            {selectedItem ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Inventory; 