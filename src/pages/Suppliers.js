import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Grid,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Collapse,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
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
} from '@mui/icons-material';

// Placeholder data
const initialSuppliers = [
  {
    id: 1,
    name: 'PharmaCorp',
    category: 'Pharmaceuticals',
    status: 'Active',
    rating: 'A+',
    itemsSupplied: 150,
    lastOrder: '2024-02-15',
    contactPerson: 'John Smith',
    email: 'john.smith@pharmacorp.com',
    phone: '+1 (555) 123-4567',
    address: '123 Pharma Street, Medical District, City',
    paymentTerms: 'Net 30',
    description: 'Leading pharmaceutical supplier committed to providing high-quality medical supplies and medications. Our mission is to support healthcare providers with reliable and innovative solutions.',
    orderHistory: [
      { date: '2024-02-15', items: 'Paracetamol, Bandages', amount: '$2,500' },
      { date: '2024-01-15', items: 'Antibiotics, First Aid Kits', amount: '$3,200' },
    ],
  },
  {
    id: 2,
    name: 'MedSupply',
    category: 'Medical Supplies',
    status: 'Active',
    rating: 'A',
    itemsSupplied: 120,
    lastOrder: '2024-02-10',
    contactPerson: 'Sarah Johnson',
    email: 'sarah.j@medsupply.com',
    phone: '+1 (555) 987-6543',
    address: '456 Medical Ave, Healthcare Zone, City',
    paymentTerms: 'Net 45',
    description: 'Specialized medical supply company focused on providing comprehensive healthcare solutions. We pride ourselves on our extensive inventory and quick delivery times.',
    orderHistory: [
      { date: '2024-02-10', items: 'Surgical Masks, Gloves', amount: '$1,800' },
      { date: '2024-01-10', items: 'Bandages, First Aid Kits', amount: '$2,100' },
    ],
  },
];

// Add this after the initialSuppliers array
const ratingOptions = ['A+', 'A', 'B+', 'B', 'C'];

function Suppliers() {
  const [suppliers, setSuppliers] = useState(initialSuppliers);
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [expandedId, setExpandedId] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'asc',
  });
  const [formData, setFormData] = useState({
    name: '',
    category: 'Medical Supplies',
    status: 'Active',
    rating: 'A',
    contactPerson: '',
    email: '',
    phone: '',
    address: '',
    paymentTerms: '',
    description: '',
    itemsSupplied: 0,
    lastOrder: new Date().toISOString().split('T')[0],
    orderHistory: []
  });

  const [orderHistory, setOrderHistory] = useState([{
    date: new Date().toISOString().split('T')[0],
    items: '',
    amount: ''
  }]);

  const handleOrderHistoryChange = (index, field, value) => {
    setOrderHistory(prev => {
      const newHistory = [...prev];
      newHistory[index][field] = value;
      return newHistory;
    });
  };

  const addOrderHistory = () => {
    setOrderHistory(prev => [{
      date: new Date().toISOString().split('T')[0],
      items: '',
      amount: ''
    }, ...prev]);
  };

  const removeOrderHistory = (index) => {
    setOrderHistory(prev => prev.filter((_, i) => i !== index));
  };

  const handleOpenDialog = (supplier = null) => {
    if (supplier) {
      setSelectedSupplier(supplier);
      setFormData({
        name: supplier.name,
        category: supplier.category,
        status: supplier.status,
        rating: supplier.rating,
        contactPerson: supplier.contactPerson,
        email: supplier.email,
        phone: supplier.phone,
        address: supplier.address,
        paymentTerms: supplier.paymentTerms,
        description: supplier.description,
        itemsSupplied: supplier.itemsSupplied,
        lastOrder: supplier.lastOrder,
        orderHistory: supplier.orderHistory
      });
      setOrderHistory(supplier.orderHistory.length > 0 
        ? supplier.orderHistory 
        : [{
            date: new Date().toISOString().split('T')[0],
            items: '',
            amount: ''
          }]);
    } else {
      setSelectedSupplier(null);
      setFormData({
        name: '',
        category: 'Medical Supplies',
        status: 'Active',
        rating: 'A',
        contactPerson: '',
        email: '',
        phone: '',
        address: '',
        paymentTerms: '',
        description: '',
        itemsSupplied: 0,
        lastOrder: new Date().toISOString().split('T')[0],
        orderHistory: []
      });
      setOrderHistory([{
        date: new Date().toISOString().split('T')[0],
        items: '',
        amount: ''
      }]);
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedSupplier(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    const sortedOrderHistory = [...orderHistory]
      .filter(order => order.items && order.amount)
      .sort((a, b) => new Date(b.date) - new Date(a.date));

    const newSupplier = {
      ...formData,
      itemsSupplied: sortedOrderHistory.reduce((total, order) => {
        const itemsCount = order.items.split(',').length;
        return total + itemsCount;
      }, 0),
      lastOrder: sortedOrderHistory.length > 0 ? sortedOrderHistory[0].date : new Date().toISOString().split('T')[0],
      orderHistory: sortedOrderHistory
    };

    if (selectedSupplier) {
      setSuppliers(prev =>
        prev.map(supplier =>
          supplier.id === selectedSupplier.id ? { ...newSupplier, id: supplier.id } : supplier
        )
      );
    } else {
      setSuppliers(prev => [
        ...prev,
        { ...newSupplier, id: prev.length + 1 }
      ]);
    }
    handleCloseDialog();
  };

  const handleDelete = (id) => {
    setSuppliers(prev => prev.filter(supplier => supplier.id !== id));
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

  const sortedSuppliers = [...suppliers].sort((a, b) => {
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

  const filteredSuppliers = sortedSuppliers.filter(supplier =>
    Object.values(supplier).some(value =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const SortableTableCell = ({ label, sortKey }) => (
    <TableCell
      onClick={() => handleSort(sortKey)}
      sx={{ 
        cursor: 'pointer',
        textAlign: 'center'
      }}
    >
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center',
        justifyContent: 'center'
      }}>
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
        Supplier Management
      </Typography>
        <Typography variant="body1" sx={{ 
          color: '#64748b',
          fontSize: '1.1rem'
        }}>
          Manage and track your medical suppliers
        </Typography>
      </Box>

      {/* Search and Actions */}
      <Box sx={{ 
        display: 'flex',
        gap: 2,
        alignItems: 'center'
      }}>
          <TextField
          placeholder="Search suppliers..."
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
            }}
          sx={{ 
            width: '400px',
            backgroundColor: 'white',
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
            }
          }}
        />
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
          sx={{ 
            height: 56,
            px: 3,
            borderRadius: 2,
            textTransform: 'none',
            fontSize: '1rem'
          }}
          >
            Add Supplier
          </Button>
      </Box>

      {/* Table Container */}
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
            <TableRow sx={{ 
              backgroundColor: '#f8fafc',
              '& th': {
                fontWeight: 600,
                color: '#1e293b',
                borderBottom: '1px solid',
                borderColor: 'rgba(0,0,0,0.08)',
                py: 2,
                textAlign: 'center',
                '&:first-of-type': {
                  borderTopLeftRadius: 3,
                },
                '&:last-of-type': {
                  borderTopRightRadius: 3,
                }
              }
            }}>
              <SortableTableCell label="Name" sortKey="name" />
              <SortableTableCell label="Category" sortKey="category" />
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Rating</TableCell>
              <TableCell align="center">Items Supplied</TableCell>
              <TableCell align="center">Last Order</TableCell>
              <TableCell align="right" sx={{ width: '80px' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredSuppliers.map((supplier) => (
              <React.Fragment key={supplier.id}>
                <TableRow 
                  onClick={() => setExpandedId(expandedId === supplier.id ? null : supplier.id)}
                  sx={{ 
                    '& > *': { borderBottom: expandedId === supplier.id ? 'none' : '1px solid rgba(0,0,0,0.08)' },
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
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>{supplier.name}</Typography>
                      <Typography variant="caption" sx={{ color: '#64748b' }}>
                        ID: {supplier.id}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                      <Typography variant="body1">{supplier.category}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Chip 
                      label={supplier.status}
                      color={supplier.status === 'Active' ? 'success' : 'error'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="center">
                      <Chip 
                        label={supplier.rating}
                      color={supplier.rating === 'A+' ? 'success' : supplier.rating === 'A' ? 'primary' : 'warning'}
                        size="small"
                      />
                  </TableCell>
                  <TableCell align="center">
                      <Typography variant="body1">{supplier.itemsSupplied}</Typography>
                  </TableCell>
                  <TableCell align="center">
                      <Typography variant="body1">{supplier.lastOrder}</Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'flex-end' }}>
                      <IconButton 
                        size="small" 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenDialog(supplier);
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
                          handleDelete(supplier.id);
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
                {expandedId === supplier.id && (
                <TableRow>
                    <TableCell colSpan={10} sx={{ py: 0, backgroundColor: '#f8fafc' }}>
                      <Box sx={{ 
                        p: 2,
                        backgroundColor: '#f8fafc',
                        borderBottom: '1px solid',
                        borderColor: 'rgba(0,0,0,0.08)',
                        width: '100%'
                      }}>
                        <Box sx={{ mb: 2 }}>
                            <Typography variant="subtitle2" color="text.secondary" gutterBottom>Contact Information</Typography>
                          <Typography variant="body2">Contact Person: {supplier.contactPerson}</Typography>
                          <Typography variant="body2">Email: {supplier.email}</Typography>
                          <Typography variant="body2">Phone: {supplier.phone}</Typography>
                          <Typography variant="body2">Address: {supplier.address}</Typography>
                          <Typography variant="body2">Payment Terms: {supplier.paymentTerms}</Typography>
                        </Box>

                        <Box sx={{ mb: 2 }}>
                            <Typography variant="subtitle2" color="text.secondary" gutterBottom>About Supplier</Typography>
                          <Typography variant="body2">{supplier.description}</Typography>
                        </Box>

                        <Box>
                          <Typography variant="subtitle2" color="text.secondary" gutterBottom>Order History</Typography>
                            <Table size="small">
                              <TableHead>
                                <TableRow>
                                  <TableCell>Date</TableCell>
                                  <TableCell>Items</TableCell>
                                  <TableCell>Amount</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {supplier.orderHistory.map((order, index) => (
                                  <TableRow key={index}>
                                    <TableCell>{order.date}</TableCell>
                                    <TableCell>{order.items}</TableCell>
                                    <TableCell>{order.amount}</TableCell>
                                  </TableRow>
                                ))}
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
            {selectedSupplier ? 'Edit Supplier' : 'Add New Supplier'}
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
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    variant="outlined"
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
                      <MenuItem value="Pharmaceuticals">
                        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', py: 1 }}>
                          <Typography>Pharmaceuticals</Typography>
                        </Box>
                      </MenuItem>
                      <MenuItem value="Medical Supplies">
                        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', py: 1 }}>
                          <Typography>Medical Supplies</Typography>
                        </Box>
                      </MenuItem>
                      <MenuItem value="Equipment">
                        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', py: 1 }}>
                          <Typography>Equipment</Typography>
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
                      <MenuItem value="Inactive">
                        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', py: 1 }}>
                          <Chip label="Inactive" size="small" color="error" sx={{ mr: 1 }} />
                          <Typography>Inactive</Typography>
                        </Box>
                      </MenuItem>
                      <MenuItem value="Pending">
                        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', py: 1 }}>
                          <Chip label="Pending" size="small" color="warning" sx={{ mr: 1 }} />
                          <Typography>Pending</Typography>
                        </Box>
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Rating</InputLabel>
                    <Select
                      name="rating"
                      value={formData.rating}
                      onChange={handleInputChange}
                      label="Rating"
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
                      {ratingOptions.map((rating) => (
                        <MenuItem key={rating} value={rating}>
                          <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', py: 1 }}>
                            <Chip 
                              label={rating}
                              size="small"
                              color={rating === 'A+' ? 'success' : rating === 'A' ? 'primary' : rating === 'B+' ? 'warning' : 'default'}
                              sx={{ mr: 1 }}
                            />
                            <Typography variant="body2">
                              {rating === 'A+' ? 'Excellent' : 
                               rating === 'A' ? 'Very Good' : 
                               rating === 'B+' ? 'Good' :
                               rating === 'B' ? 'Fair' : 'Average'}
                            </Typography>
                          </Box>
                        </MenuItem>
                      ))}
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
                    label="Contact Person"
                    name="contactPerson"
                    value={formData.contactPerson}
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
                    label="Phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Payment Terms"
                    name="paymentTerms"
                    value={formData.paymentTerms}
                    onChange={handleInputChange}
                    variant="outlined"
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

            {/* Additional Information Section */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" sx={{ mb: 2, mt: 1, fontWeight: 500, color: 'primary.main' }}>
                Additional Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Description"
                    name="description"
                    multiline
                    rows={3}
                    value={formData.description}
                    onChange={handleInputChange}
                    variant="outlined"
                    placeholder="Enter supplier's mission statement or brief description"
                  />
                </Grid>
              </Grid>
            </Grid>

            {/* Order History Section */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" sx={{ mb: 2, mt: 1, fontWeight: 500, color: 'primary.main' }}>
                Supplier Statistics
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Items Supplied"
                    value={orderHistory.reduce((total, order) => {
                      const itemsCount = order.items.split(',').length;
                      return total + itemsCount;
                    }, 0)}
                    InputProps={{
                      readOnly: true,
                    }}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Last Order Date"
                    value={orderHistory.length > 0 ? orderHistory[0].date : new Date().toISOString().split('T')[0]}
                    InputProps={{
                      readOnly: true,
                    }}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </Grid>

            {/* Order History Section */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" sx={{ mb: 2, mt: 1, fontWeight: 500, color: 'primary.main' }}>
                Order History
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {orderHistory.map((order, index) => (
                  <Paper key={index} elevation={0} sx={{ p: 2, backgroundColor: '#f8fafc' }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', mb: -1 }}>
                        <IconButton 
                          size="small" 
                          onClick={() => removeOrderHistory(index)}
                          sx={{ opacity: orderHistory.length === 1 ? 0 : 1 }}
                          disabled={orderHistory.length === 1}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Date"
                          type="date"
                          value={order.date}
                          onChange={(e) => handleOrderHistoryChange(index, 'date', e.target.value)}
                          InputLabelProps={{ shrink: true }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Items"
                          value={order.items}
                          onChange={(e) => handleOrderHistoryChange(index, 'items', e.target.value)}
                          multiline
                          rows={2}
                          placeholder="Enter items separated by commas"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Amount"
                          value={order.amount}
                          onChange={(e) => handleOrderHistoryChange(index, 'amount', e.target.value)}
                          placeholder="$0.00"
                        />
                      </Grid>
                    </Grid>
                  </Paper>
                ))}
                <Button
                  variant="outlined"
                  startIcon={<AddIcon />}
                  onClick={addOrderHistory}
                  sx={{ alignSelf: 'flex-start' }}
                >
                  Add Order
                </Button>
              </Box>
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
            {selectedSupplier ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Suppliers; 