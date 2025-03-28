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
  });

  const handleOpenDialog = (supplier = null) => {
    if (supplier) {
      setSelectedSupplier(supplier);
      setFormData(supplier);
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
      });
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
    if (selectedSupplier) {
      setSuppliers(prev =>
        prev.map(supplier =>
          supplier.id === selectedSupplier.id ? { ...formData, id: supplier.id } : supplier
        )
      );
    } else {
      setSuppliers(prev => [
        ...prev,
        { ...formData, id: prev.length + 1, itemsSupplied: 0, lastOrder: new Date().toISOString().split('T')[0], orderHistory: [] }
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
        Supplier Management
      </Typography>

      {/* Search and Actions */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Search Suppliers"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
            }}
          />
        </Grid>
        <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
          >
            Add Supplier
          </Button>
        </Grid>
      </Grid>

      {/* Suppliers Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell width="40px" /> {/* Expansion control column */}
              <SortableTableCell label="Name" sortKey="name" />
              <SortableTableCell label="Category" sortKey="category" />
              <SortableTableCell label="Status" sortKey="status" />
              <SortableTableCell label="Rating" sortKey="rating" />
              <SortableTableCell label="Items Supplied" sortKey="itemsSupplied" />
              <SortableTableCell label="Last Order" sortKey="lastOrder" />
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredSuppliers.map((supplier) => (
              <React.Fragment key={supplier.id}>
                <TableRow>
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={() => handleExpand(supplier.id)}
                    >
                      {expandedId === supplier.id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <Box>
                      <Typography variant="body1">{supplier.name}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        ID: {supplier.id}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box>
                      <Typography variant="body1">{supplier.category}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box>
                      <Typography variant="body1">{supplier.status}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Chip 
                        label={supplier.rating}
                        size="small"
                        color={supplier.rating === 'A+' ? 'success' : supplier.rating === 'A' ? 'primary' : 'warning'}
                      />
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box>
                      <Typography variant="body1">{supplier.itemsSupplied}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box>
                      <Typography variant="body1">{supplier.lastOrder}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 0.5 }}>
                      <IconButton onClick={() => handleOpenDialog(supplier)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(supplier.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
                    <Collapse in={expandedId === supplier.id} timeout="auto" unmountOnExit>
                      <Box sx={{ p: 3 }}>
                        <Grid container spacing={3}>
                          <Grid item xs={12} md={6}>
                            <Typography variant="subtitle2" color="text.secondary" gutterBottom>Contact Information</Typography>
                            <Typography>Contact Person: {supplier.contactPerson}</Typography>
                            <Typography>Email: {supplier.email}</Typography>
                            <Typography>Phone: {supplier.phone}</Typography>
                            <Typography>Address: {supplier.address}</Typography>
                            <Typography>Payment Terms: {supplier.paymentTerms}</Typography>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <Typography variant="subtitle2" color="text.secondary" gutterBottom>About Supplier</Typography>
                            <Typography>{supplier.description}</Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>Order History</Typography>
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