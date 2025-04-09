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
    pricePerUnit: 0.50,
    batches: [
      {
        batchNumber: 'B001',
        expirationDate: '2024-06-15',
        quantity: 100,
        manufactureDate: '2023-06-15',
        pricePerUnit: 0.50,
        supplier: 'PharmaCorp'
      },
      {
        batchNumber: 'B002',
        expirationDate: '2024-03-20',
        quantity: 50,
        manufactureDate: '2023-03-20',
        pricePerUnit: 0.55,
        supplier: 'PharmaCorp'
      }
    ]
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
    pricePerUnit: 2.99,
    batches: [
      {
        batchNumber: 'B003',
        expirationDate: '2025-01-10',
        quantity: 45,
        manufactureDate: '2023-01-10',
        pricePerUnit: 2.99,
        supplier: 'MedSupply'
      },
      {
        batchNumber: 'B004',
        expirationDate: '2024-04-15',
        quantity: 30,
        manufactureDate: '2023-04-15',
        pricePerUnit: 3.25,
        supplier: 'MedSupply'
      }
    ]
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
  const [expandedRow, setExpandedRow] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    barcode: '',
    category: 'Medical Supplies',
    quantity: 0,
    unit: 'units',
    minQuantity: '0',
    location: '',
    supplier: 'PharmaCorp',
    pricePerUnit: '',
    batches: []
  });
  const [newBatch, setNewBatch] = useState({
    batchNumber: '',
    expirationDate: '',
    quantity: '',
    pricePerUnit: '',
    supplier: 'PharmaCorp'
  });
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'asc',
  });

  const calculateTotalQuantity = (batches) => {
    return batches.reduce((total, batch) => total + Number(batch.quantity), 0);
  };

  const handleBatchChange = (e) => {
    const { name, value } = e.target;
    setNewBatch(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddBatch = () => {
    if (!newBatch.batchNumber || !newBatch.expirationDate || !newBatch.quantity || !newBatch.pricePerUnit || !newBatch.supplier) {
      return;
    }
    setFormData(prev => {
      const updatedBatches = [...prev.batches, { ...newBatch }];
      return {
        ...prev,
        batches: updatedBatches,
        quantity: calculateTotalQuantity(updatedBatches),
        // Update main item price and supplier from the latest batch
        pricePerUnit: newBatch.pricePerUnit,
        supplier: newBatch.supplier
      };
    });
    setNewBatch({
      batchNumber: '',
      expirationDate: '',
      quantity: '',
      pricePerUnit: '',
      supplier: 'PharmaCorp'
    });
  };

  const handleRemoveBatch = (batchNumber) => {
    setFormData(prev => {
      const updatedBatches = prev.batches.filter(b => b.batchNumber !== batchNumber);
      const lastBatch = updatedBatches[updatedBatches.length - 1];
      return {
        ...prev,
        batches: updatedBatches,
        quantity: calculateTotalQuantity(updatedBatches),
        // Update main item price and supplier from the last remaining batch, or reset if none
        pricePerUnit: lastBatch ? lastBatch.pricePerUnit : '',
        supplier: lastBatch ? lastBatch.supplier : 'PharmaCorp'
      };
    });
  };

  const handleOpenDialog = (item = null) => {
    if (item) {
      setSelectedItem(item);
      setFormData({
        ...item,
        category: item.category,
        batches: item.batches.map(batch => ({
          ...batch,
          // Each batch should maintain its own price and supplier
          pricePerUnit: batch.pricePerUnit || item.pricePerUnit,
          supplier: batch.supplier || item.supplier
        })) || []
      });
    } else {
      setSelectedItem(null);
      setFormData({
        name: '',
        barcode: '',
        category: 'Medical Supplies',
        quantity: 0,
        unit: 'units',
        minQuantity: '0',
        pricePerUnit: '',
        supplier: 'PharmaCorp',
        batches: []
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
          item.id === selectedItem.id ? { 
            ...formData, 
            id: item.id,
            // Update the main item's price and supplier from the latest batch
            pricePerUnit: formData.batches[formData.batches.length - 1]?.pricePerUnit || '',
            supplier: formData.batches[formData.batches.length - 1]?.supplier || 'PharmaCorp'
          } : item
        )
      );
    } else {
      // Add new item
      setInventory(prev => [
        ...prev,
        { 
          ...formData, 
          id: prev.length + 1,
          // Set the main item's price and supplier from the latest batch
          pricePerUnit: formData.batches[formData.batches.length - 1]?.pricePerUnit || '',
          supplier: formData.batches[formData.batches.length - 1]?.supplier || 'PharmaCorp'
        }
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

  const getBatchStatus = (expirationDate) => {
    const today = new Date();
    const expDate = new Date(expirationDate);
    const threeMonthsFromNow = new Date();
    threeMonthsFromNow.setMonth(threeMonthsFromNow.getMonth() + 3);

    if (expDate < today) {
      return { status: 'Expired', color: 'error' };
    } else if (expDate < threeMonthsFromNow) {
      return { status: 'Almost Expired', color: 'warning' };
    }
    return { status: 'Valid', color: 'success' };
  };

  const getExpiredItemsCount = (batches) => {
    return batches.reduce((count, batch) => {
      return count + (getBatchStatus(batch.expirationDate).status === 'Expired' ? batch.quantity : 0);
    }, 0);
  };

  const handleBatchEdit = (batchNumber, field, value) => {
    setFormData(prev => {
      const updatedBatches = prev.batches.map(batch => {
        if (batch.batchNumber === batchNumber) {
          return { ...batch, [field]: value };
        }
        return batch;
      });
      const lastBatch = updatedBatches[updatedBatches.length - 1];
      return {
        ...prev,
        batches: updatedBatches,
        quantity: calculateTotalQuantity(updatedBatches),
        // Update main item price and supplier only if editing the last batch
        ...(lastBatch && batchNumber === lastBatch.batchNumber ? {
          pricePerUnit: field === 'pricePerUnit' ? value : lastBatch.pricePerUnit,
          supplier: field === 'supplier' ? value : lastBatch.supplier
        } : {})
      };
    });
  };

  const SortableTableCell = ({ label, sortKey }) => (
    <TableCell
      onClick={() => handleSort(sortKey)}
      sx={{ 
        cursor: 'pointer',
        textAlign: 'center',
        '& .MuiBox-root': {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1
        }
      }}
    >
      <Box>
        {label}
        {sortConfig.key === sortKey && (
          sortConfig.direction === 'asc' ? <ArrowUpwardIcon fontSize="small" /> : <ArrowDownwardIcon fontSize="small" />
        )}
      </Box>
    </TableCell>
  );

  return (
    <Box sx={{ 
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: 3
    }}>
      {/* Header Section */}
      <Box sx={{ 
        backgroundColor: 'white',
        p: 3,
        borderRadius: 2,
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        borderBottom: '1px solid',
        borderColor: 'divider'
      }}>
        <Typography variant="h4" sx={{ 
          fontWeight: 600,
          color: '#1e293b',
          mb: 1
        }}>
          Inventory Management
        </Typography>
        <Typography variant="body1" sx={{ 
          color: '#64748b',
          fontSize: '1.1rem'
        }}>
          Track and manage your medical inventory
        </Typography>
      </Box>

      {/* Low Stock Alert */}
      {lowStockItems.length > 0 && (
        <Alert 
          severity="warning" 
          sx={{ 
            borderRadius: 2,
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            '& .MuiAlert-icon': {
              color: '#f59e0b'
            }
          }}
        >
          {lowStockItems.length} items are running low on stock
        </Alert>
      )}

      {/* Search Bar */}
      <TextField
        fullWidth
        placeholder="Search inventory..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        InputProps={{
          startAdornment: (
            <SearchIcon sx={{ 
              color: '#94a3b8',
              mr: 1
            }} />
          ),
        }}
        sx={{
          maxWidth: '600px',
          '& .MuiOutlinedInput-root': {
            borderRadius: 2,
            backgroundColor: 'white',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            '&:hover': {
              backgroundColor: '#f8fafc'
            },
            '&.Mui-focused': {
              backgroundColor: 'white',
              boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.2)'
            }
          }
        }}
      />

      {/* Inventory Table */}
      <TableContainer 
        component={Paper} 
        sx={{ 
          borderRadius: 3,
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          overflow: 'hidden',
          border: '1px solid',
          borderColor: 'rgba(0,0,0,0.08)'
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f8fafc' }}>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Category</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="center">Unit</TableCell>
              <TableCell align="center">Min. Quantity</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="right" sx={{ width: '80px' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredInventory.map((item) => (
              <React.Fragment key={item.id}>
                <TableRow 
                  onClick={() => setExpandedRow(expandedRow === item.id ? null : item.id)}
                  sx={{ 
                    '& > *': { borderBottom: expandedRow === item.id ? 'none' : '1px solid rgba(0,0,0,0.08)' },
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: '#f8fafc',
                    },
                    '& td': {
                      color: '#1e293b',
                      py: 2.5,
                      transition: 'background-color 0.2s ease',
                      textAlign: 'center'
                    }
                  }}
                >
                  <TableCell align="center">
                    <Box>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>{item.name}</Typography>
                      <Typography variant="caption" sx={{ color: '#64748b' }}>
                        ID: {item.id}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="body1">{item.category}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="body1">{item.quantity} {item.unit}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="body1">{item.unit}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="body1">{item.minQuantity} {item.unit}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Chip 
                      label={item.quantity <= item.minQuantity ? 'Low Stock' : 'In Stock'}
                      color={item.quantity <= item.minQuantity ? 'warning' : 'success'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'flex-end' }}>
                      <IconButton 
                        size="small" 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenDialog(item);
                        }}
                        sx={{ 
                          p: 0.5,
                          color: '#64748b',
                          '&:hover': { 
                            backgroundColor: '#e2e8f0',
                            color: '#3b82f6'
                          }
                        }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton 
                        size="small" 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(item.id);
                        }}
                        sx={{ 
                          p: 0.5,
                          color: '#64748b',
                          '&:hover': { 
                            backgroundColor: '#fee2e2',
                            color: '#ef4444'
                          }
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
                {expandedRow === item.id && (
                  <TableRow>
                    <TableCell colSpan={10} sx={{ py: 0, backgroundColor: '#f8fafc' }}>
                      <Box sx={{ 
                        p: 2,
                        backgroundColor: '#f8fafc',
                        borderBottom: '1px solid',
                        borderColor: 'rgba(0,0,0,0.08)',
                        width: '100%'
                      }}>
                        <Box>
                          <Typography variant="subtitle2" color="text.secondary" gutterBottom>Batch Details</Typography>
                          <Table size="small">
                            <TableHead>
                              <TableRow>
                                <TableCell>Batch Number</TableCell>
                                <TableCell>Quantity</TableCell>
                                <TableCell>Price per Unit</TableCell>
                                <TableCell>Supplier</TableCell>
                                <TableCell>Expiration Date</TableCell>
                                <TableCell>Status</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {item.batches.map((batch, index) => {
                                const { status, color } = getBatchStatus(batch.expirationDate);
                                return (
                                  <TableRow key={index}>
                                    <TableCell>{batch.batchNumber}</TableCell>
                                    <TableCell>{batch.quantity}</TableCell>
                                    <TableCell>${Number(batch.pricePerUnit || item.pricePerUnit || 0).toFixed(2)}</TableCell>
                                    <TableCell>{batch.supplier || item.supplier}</TableCell>
                                    <TableCell>{batch.expirationDate}</TableCell>
                                    <TableCell>
                                      <Chip 
                                        label={status}
                                        color={color}
                                        size="small"
                                      />
                                    </TableCell>
                                  </TableRow>
                                );
                              })}
                            </TableBody>
                          </Table>
                        </Box>
                      </Box>
                    </TableCell>
                  </TableRow>
                )}
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
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Box display="flex" alignItems="center">
            <EditIcon sx={{ mr: 1 }} />
            <Typography variant="h6">
              {selectedItem ? 'Edit Inventory Item' : 'Add New Inventory Item'}
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3}>
            {/* Item Information Section */}
            <Grid item xs={12}>
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Item Information
                </Typography>
              </Box>
            </Grid>

            {/* Item Information Fields Container */}
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Item Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Item ID"
                    name="barcode"
                    value={formData.barcode}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth required>
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
                            maxHeight: '300px',
                            width: 'auto',
                            '& .MuiMenuItem-root': {
                              py: 1,
                              px: 2
                            }
                          }
                        },
                        anchorOrigin: {
                          vertical: 'bottom',
                          horizontal: 'left'
                        },
                        transformOrigin: {
                          vertical: 'top',
                          horizontal: 'left'
                        }
                      }}
                    >
                      <MenuItem value="Medical Supplies">Medical Supplies</MenuItem>
                      <MenuItem value="Medications">Medications</MenuItem>
                      <MenuItem value="Equipment">Equipment</MenuItem>
                      <MenuItem value="First Aid">First Aid</MenuItem>
                      <MenuItem value="Lab Supplies">Lab Supplies</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Unit"
                    name="unit"
                    value={formData.unit}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Total Quantity"
                    value={formData.quantity}
                    disabled
                    helperText="Automatically calculated from batch quantities"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    type="number"
                    label="Minimum Quantity"
                    name="minQuantity"
                    value={formData.minQuantity}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Expired Items"
                    value={getExpiredItemsCount(formData.batches)}
                    disabled
                    helperText="Automatically calculated from batch details"
                  />
                </Grid>
              </Grid>
            </Grid>

            {/* Batch Management Section with increased spacing */}
            <Grid item xs={12}>
              <Box sx={{ mt: 6, mb: 3 }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Batch Management
                </Typography>
              </Box>
            </Grid>

            {/* Batch Management Table */}
            <Grid item xs={12}>
              <TableContainer 
                component={Paper} 
                variant="outlined"
                sx={{ 
                  '& .MuiTable-root': {
                    minWidth: 650
                  }
                }}
              >
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Batch Number</TableCell>
                      <TableCell>Quantity</TableCell>
                      <TableCell>Price per Unit ($)</TableCell>
                      <TableCell>Supplier</TableCell>
                      <TableCell>Expiration Date</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {formData.batches.map((batch) => (
                      <TableRow key={batch.batchNumber}>
                        <TableCell>
                          <TextField
                            size="small"
                            value={batch.batchNumber}
                            onChange={(e) => handleBatchEdit(batch.batchNumber, 'batchNumber', e.target.value)}
                            fullWidth
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            size="small"
                            type="number"
                            value={batch.quantity}
                            onChange={(e) => handleBatchEdit(batch.batchNumber, 'quantity', e.target.value)}
                            fullWidth
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            size="small"
                            type="number"
                            value={batch.pricePerUnit}
                            onChange={(e) => handleBatchEdit(batch.batchNumber, 'pricePerUnit', e.target.value)}
                            fullWidth
                          />
                        </TableCell>
                        <TableCell>
                          <Select
                            size="small"
                            value={batch.supplier}
                            onChange={(e) => handleBatchEdit(batch.batchNumber, 'supplier', e.target.value)}
                            sx={{ minWidth: 120 }}
                            fullWidth
                          >
                            {suppliers.map((supplier) => (
                              <MenuItem key={supplier.name} value={supplier.name}>
                                {supplier.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </TableCell>
                        <TableCell>
                          <TextField
                            size="small"
                            type="date"
                            value={batch.expirationDate}
                            onChange={(e) => handleBatchEdit(batch.batchNumber, 'expirationDate', e.target.value)}
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                          />
                        </TableCell>
                        <TableCell align="right">
                          <IconButton 
                            size="small" 
                            onClick={() => handleRemoveBatch(batch.batchNumber)}
                            color="error"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell>
                        <TextField
                          size="small"
                          placeholder="Batch #"
                          name="batchNumber"
                          value={newBatch.batchNumber}
                          onChange={handleBatchChange}
                          fullWidth
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          size="small"
                          type="number"
                          name="quantity"
                          value={newBatch.quantity}
                          onChange={handleBatchChange}
                          fullWidth
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          size="small"
                          type="number"
                          name="pricePerUnit"
                          value={newBatch.pricePerUnit}
                          onChange={handleBatchChange}
                          fullWidth
                        />
                      </TableCell>
                      <TableCell>
                        <Select
                          size="small"
                          name="supplier"
                          value={newBatch.supplier}
                          onChange={handleBatchChange}
                          sx={{ minWidth: 120 }}
                          fullWidth
                        >
                          {suppliers.map((supplier) => (
                            <MenuItem key={supplier.name} value={supplier.name}>
                              {supplier.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </TableCell>
                      <TableCell>
                        <TextField
                          size="small"
                          type="date"
                          name="expirationDate"
                          value={newBatch.expirationDate}
                          onChange={handleBatchChange}
                          InputLabelProps={{ shrink: true }}
                          fullWidth
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          variant="contained"
                          size="small"
                          onClick={handleAddBatch}
                          disabled={!newBatch.batchNumber || !newBatch.quantity || !newBatch.pricePerUnit || !newBatch.supplier || !newBatch.expirationDate}
                        >
                          Add
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={handleCloseDialog} startIcon={<DeleteIcon />}>
            Cancel
          </Button>
          <Button 
            variant="contained" 
            onClick={handleSubmit}
            disabled={!formData.name || !formData.barcode || !formData.category || !formData.unit}
          >
            {selectedItem ? 'Update Item' : 'Add Item'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Inventory; 