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
  Chip,
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
  Snackbar,
  Alert,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Divider,
  Badge,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
  ShoppingCart as CartIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// Categories data
const categories = [
  {
    id: 1,
    name: 'Pain Relief',
    description: 'Medications for pain management',
    image: '💊'
  },
  {
    id: 2,
    name: 'First Aid',
    description: 'Emergency care supplies',
    image: '🏥'
  },
  {
    id: 3,
    name: 'Antibiotics',
    description: 'Infection treatment medications',
    image: '💉'
  },
  {
    id: 4,
    name: 'Medical Supplies',
    description: 'General medical equipment and supplies',
    image: '🧰'
  },
];

// Sample items data
const items = [
  {
    id: 1,
    name: 'Paracetamol',
    category: 'Pain Relief',
    quantity: 150,
    unit: 'tablets',
    minQuantity: 200,
    suppliers: [
      {
        id: 1,
        name: 'PharmaCorp',
        rating: 'A+',
        deliveryDuration: '2-3 days',
        pricePerUnit: 0.5,
        moq: 1000,
      },
      {
        id: 2,
        name: 'MedSupply',
        rating: 'A',
        deliveryDuration: '3-5 days',
        pricePerUnit: 0.45,
        moq: 2000,
      },
    ],
    expirationStatus: 'Valid',
  },
  {
    id: 2,
    name: 'Bandages',
    category: 'First Aid',
    quantity: 75,
    unit: 'boxes',
    minQuantity: 100,
    suppliers: [
      {
        id: 2,
        name: 'MedSupply',
        rating: 'A',
        deliveryDuration: '3-5 days',
        pricePerUnit: 5.99,
        moq: 50,
      },
    ],
    expirationStatus: 'Almost Expired',
  },
  {
    id: 3,
    name: 'Ibuprofen',
    category: 'Pain Relief',
    quantity: 50,
    unit: 'tablets',
    minQuantity: 150,
    suppliers: [
      {
        id: 1,
        name: 'PharmaCorp',
        rating: 'A+',
        deliveryDuration: '2-3 days',
        pricePerUnit: 0.75,
        moq: 500,
      },
      {
        id: 3,
        name: 'GlobalMeds',
        rating: 'B+',
        deliveryDuration: '5-7 days',
        pricePerUnit: 0.60,
        moq: 1000,
      },
    ],
    expirationStatus: 'Almost Expired',
  },
  {
    id: 4,
    name: 'Aspirin',
    category: 'Pain Relief',
    quantity: 200,
    unit: 'tablets',
    minQuantity: 100,
    suppliers: [
      {
        id: 2,
        name: 'MedSupply',
        rating: 'A',
        deliveryDuration: '3-5 days',
        pricePerUnit: 0.35,
        moq: 1000,
      },
      {
        id: 4,
        name: 'LocalPharm',
        rating: 'A-',
        deliveryDuration: '1-2 days',
        pricePerUnit: 0.40,
        moq: 500,
      },
    ],
    expirationStatus: 'Valid',
  },
  {
    id: 5,
    name: 'Naproxen',
    category: 'Pain Relief',
    quantity: 0,
    unit: 'tablets',
    minQuantity: 100,
    suppliers: [
      {
        id: 1,
        name: 'PharmaCorp',
        rating: 'A+',
        deliveryDuration: '2-3 days',
        pricePerUnit: 0.90,
        moq: 300,
      },
      {
        id: 3,
        name: 'GlobalMeds',
        rating: 'B+',
        deliveryDuration: '5-7 days',
        pricePerUnit: 0.70,
        moq: 500,
      },
    ],
    expirationStatus: 'Valid',
  },
  {
    id: 6,
    name: 'Codeine',
    category: 'Pain Relief',
    quantity: 25,
    unit: 'tablets',
    minQuantity: 50,
    suppliers: [
      {
        id: 1,
        name: 'PharmaCorp',
        rating: 'A+',
        deliveryDuration: '1-2 days',
        pricePerUnit: 2.50,
        moq: 100,
      },
    ],
    expirationStatus: 'Expired',
  },
  {
    id: 7,
    name: 'Diclofenac',
    category: 'Pain Relief',
    quantity: 80,
    unit: 'tablets',
    minQuantity: 120,
    suppliers: [
      {
        id: 2,
        name: 'MedSupply',
        rating: 'A',
        deliveryDuration: '3-5 days',
        pricePerUnit: 0.85,
        moq: 400,
      },
      {
        id: 3,
        name: 'GlobalMeds',
        rating: 'B+',
        deliveryDuration: '5-7 days',
        pricePerUnit: 0.65,
        moq: 600,
      },
      {
        id: 4,
        name: 'LocalPharm',
        rating: 'A-',
        deliveryDuration: '1-2 days',
        pricePerUnit: 0.95,
        moq: 200,
      },
    ],
    expirationStatus: 'Almost Expired',
  },
];

// Sample orders data
const initialOrders = [
  {
    id: 1,
    items: [
      {
        name: 'Paracetamol',
        unit: 'tablets',
        quantity: 1500,
        price: 750,
      },
      {
        name: 'Aspirin',
        unit: 'tablets',
        quantity: 1000,
        price: 350,
      }
    ],
    supplier: {
      name: 'PharmaCorp',
      rating: 'A+',
    },
    totalPrice: 1100,
    orderDate: '2024-03-15T10:30:00Z',
    status: 'pending',
    notes: 'Regular monthly order',
  },
  {
    id: 2,
    items: [
      {
        name: 'Ibuprofen',
        unit: 'tablets',
        quantity: 1000,
        price: 450,
      }
    ],
    supplier: {
      name: 'MedSupply',
      rating: 'A',
    },
    totalPrice: 450,
    orderDate: '2024-03-14T15:45:00Z',
    status: 'complete',
    notes: 'Emergency restock',
  },
  {
    id: 3,
    items: [
      {
        name: 'Aspirin',
        unit: 'tablets',
        quantity: 2000,
        price: 700,
      }
    ],
    supplier: {
      name: 'GlobalMeds',
      rating: 'B+',
    },
    totalPrice: 700,
    orderDate: '2024-03-13T09:15:00Z',
    status: 'terminated',
    notes: 'Order cancelled due to pricing issues',
  },
];

function Restock() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [orderDialogOpen, setOrderDialogOpen] = useState(false);
  const [basketDialogOpen, setBasketDialogOpen] = useState(false);
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [existingOrderDialog, setExistingOrderDialog] = useState({
    open: false,
    supplier: null,
    orderDetails: null,
  });
  const [snackbarState, setSnackbarState] = useState({
    open: false,
    message: '',
    severity: 'success',
  });
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'asc',
  });
  const [orderDetails, setOrderDetails] = useState({
    quantity: '',
    notes: '',
  });
  const [basket, setBasket] = useState({});

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortedItems = () => {
    if (!selectedCategory) return [];
    
    let filteredItems = items.filter(item => item.category === selectedCategory.name);
    
    if (!sortConfig.key) return filteredItems;

    return [...filteredItems].sort((a, b) => {
      if (sortConfig.key === 'name') {
        return sortConfig.direction === 'asc' 
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      }
      if (sortConfig.key === 'currentStock') {
        return sortConfig.direction === 'asc'
          ? a.quantity - b.quantity
          : b.quantity - a.quantity;
      }
      if (sortConfig.key === 'expirationStatus') {
        const statusOrder = { 'Valid': 0, 'Almost Expired': 1, 'Expired': 2 };
        return sortConfig.direction === 'asc'
          ? statusOrder[a.expirationStatus] - statusOrder[b.expirationStatus]
          : statusOrder[b.expirationStatus] - statusOrder[a.expirationStatus];
      }
      return 0;
    });
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedItem(null);
    setSelectedSupplier(null);
  };

  const handleItemSelect = (item) => {
    setSelectedItem(item);
    setSelectedSupplier(null);
  };

  const handleSupplierSelect = (supplier) => {
    // Check for existing pending orders
    const existingOrder = initialOrders.find(
      order => order.supplier.name === supplier.name && order.status === 'pending'
    );

    if (existingOrder) {
      setExistingOrderDialog({
        open: true,
        supplier,
        orderDetails: existingOrder,
      });
    } else {
      setSelectedSupplier(supplier);
      setOrderDetails({
        quantity: supplier.moq.toString(),
        notes: '',
      });
      setOrderDialogOpen(true);
    }
  };

  const handleBack = () => {
    if (selectedSupplier) {
      setSelectedSupplier(null);
    } else if (selectedItem) {
      setSelectedItem(null);
    } else if (selectedCategory) {
      setSelectedCategory(null);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Valid':
        return 'success';
      case 'Almost Expired':
        return 'warning';
      case 'Expired':
        return 'error';
      default:
        return 'default';
    }
  };

  const getRatingColor = (rating) => {
    switch (rating) {
      case 'A+':
        return 'success';
      case 'A':
        return 'primary';
      default:
        return 'warning';
    }
  };

  const getSortedSuppliers = () => {
    if (!selectedItem || !selectedItem.suppliers) return [];
    
    if (!sortConfig.key) return selectedItem.suppliers;

    return [...selectedItem.suppliers].sort((a, b) => {
      if (sortConfig.key === 'rating') {
        const ratingOrder = { 'A+': 0, 'A': 1, 'A-': 2, 'B+': 3, 'B': 4 };
        return sortConfig.direction === 'asc'
          ? ratingOrder[a.rating] - ratingOrder[b.rating]
          : ratingOrder[b.rating] - ratingOrder[a.rating];
      }
      if (sortConfig.key === 'deliveryDuration') {
        // Extract the first number from delivery duration (e.g., "2-3 days" -> 2)
        const getFirstNumber = (str) => parseInt(str.split('-')[0]);
        return sortConfig.direction === 'asc'
          ? getFirstNumber(a.deliveryDuration) - getFirstNumber(b.deliveryDuration)
          : getFirstNumber(b.deliveryDuration) - getFirstNumber(a.deliveryDuration);
      }
      if (sortConfig.key === 'price') {
        return sortConfig.direction === 'asc'
          ? a.pricePerUnit - b.pricePerUnit
          : b.pricePerUnit - a.pricePerUnit;
      }
      return 0;
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

  const handleBasketAdd = () => {
    const newItem = {
      name: selectedItem.name,
      unit: selectedItem.unit,
      quantity: Number(orderDetails.quantity),
      pricePerUnit: selectedSupplier.pricePerUnit,
      totalPrice: Number(orderDetails.quantity) * selectedSupplier.pricePerUnit,
      notes: orderDetails.notes,
    };

    setBasket(prev => {
      const supplierItems = prev[selectedSupplier.name] || [];
      return {
        ...prev,
        [selectedSupplier.name]: [...supplierItems, newItem],
      };
    });

    setOrderDialogOpen(false);
    setSnackbarState({
      open: true,
      message: 'Item added to basket',
      severity: 'success',
    });
  };

  const handleBasketRemove = (supplierName, itemIndex) => {
    setBasket(prev => {
      const supplierItems = [...prev[supplierName]];
      supplierItems.splice(itemIndex, 1);
      
      if (supplierItems.length === 0) {
        const { [supplierName]: _, ...rest } = prev;
        return rest;
      }
      
      return {
        ...prev,
        [supplierName]: supplierItems,
      };
    });
  };

  const getTotalItems = () => {
    return Object.values(basket).reduce((total, items) => total + items.length, 0);
  };

  const handleBasketFinalize = () => {
    const suppliers = Object.keys(basket);
    if (suppliers.length > 1) {
      setConfirmationDialogOpen(true);
    } else {
      submitOrders();
    }
  };

  const submitOrders = () => {
    // Here you would typically send the orders to your backend
    console.log('Orders submitted:', basket);
    
    setBasket({});
    setBasketDialogOpen(false);
    setConfirmationDialogOpen(false);
    setSnackbarState({
      open: true,
      message: 'Orders placed successfully!',
      severity: 'success',
    });
    
    // Reset selection
    setSelectedSupplier(null);
    setSelectedItem(null);
    setSelectedCategory(null);
  };

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
        borderColor: 'divider',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {(selectedCategory || selectedItem || selectedSupplier) && (
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={handleBack}
              variant="outlined"
              sx={{ 
                minWidth: 'auto',
                borderRadius: 2,
                borderColor: 'rgba(0,0,0,0.12)',
                color: '#475569',
                px: 2,
                '&:hover': {
                  backgroundColor: '#f1f5f9',
                  borderColor: 'rgba(0,0,0,0.24)',
                  transform: 'translateX(-2px)',
                },
                transition: 'all 0.2s ease',
              }}
            >
              Back
            </Button>
          )}
          <Box>
            <Typography variant="h4" sx={{ 
              fontWeight: 600,
              color: '#1e293b',
              mb: 1
            }}>
              {selectedItem ? selectedItem.name :
               selectedCategory ? selectedCategory.name :
               'Restock Inventory'}
            </Typography>
            <Typography variant="body1" sx={{ 
              color: '#64748b',
              fontSize: '1.1rem'
            }}>
              {selectedItem ? 'Select a supplier to order from' :
               selectedCategory ? 'Select an item to restock' :
               'Select a category to begin restocking'}
            </Typography>
          </Box>
        </Box>
        <Badge badgeContent={getTotalItems()} color="primary" sx={{ mr: 2 }}>
          <Button
            variant="contained"
            startIcon={<CartIcon />}
            onClick={() => setBasketDialogOpen(true)}
            disabled={getTotalItems() === 0}
          >
            View Basket
          </Button>
        </Badge>
      </Box>

      {/* Content Section */}
      {!selectedCategory ? (
        // Category Selection View
        <Grid container spacing={2}>
          {categories.map((category) => (
            <Grid item xs={12} sm={6} md={3} key={category.id}>
              <Card 
                onClick={() => handleCategorySelect(category)}
                sx={{ 
                  cursor: 'pointer',
                  height: '100%',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                  }
                }}
              >
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h2" sx={{ mb: 2 }}>{category.image}</Typography>
                  <Typography variant="h6" gutterBottom>{category.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {category.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : !selectedItem ? (
        // Items List View
        <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f8fafc' }}>
                <SortableTableCell label="Name" sortKey="name" />
                <SortableTableCell label="Current Stock" sortKey="currentStock" />
                <TableCell align="center">Min. Quantity</TableCell>
                <SortableTableCell label="Status" sortKey="expirationStatus" />
              </TableRow>
            </TableHead>
            <TableBody>
              {getSortedItems().map((item) => (
                <TableRow 
                  key={item.id}
                  onClick={() => handleItemSelect(item)}
                  sx={{ 
                    cursor: 'pointer',
                    '&:hover': { backgroundColor: '#f8fafc' }
                  }}
                >
                  <TableCell align="center">{item.name}</TableCell>
                  <TableCell align="center">
                    <Typography>
                      {item.quantity} {item.unit}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">{item.minQuantity}</TableCell>
                  <TableCell align="center">
                    <Chip 
                      label={item.expirationStatus}
                      color={getStatusColor(item.expirationStatus)}
                      size="small"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        // Suppliers List View
        <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f8fafc' }}>
                <TableCell align="center">Supplier</TableCell>
                <SortableTableCell label="Rating" sortKey="rating" />
                <SortableTableCell label="Delivery Duration" sortKey="deliveryDuration" />
                <SortableTableCell label="Price per Unit" sortKey="price" />
                <TableCell align="center">Min. Order Quantity</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {getSortedSuppliers().map((supplier) => (
                <TableRow key={supplier.id}>
                  <TableCell align="center">{supplier.name}</TableCell>
                  <TableCell align="center">
                    <Chip 
                      label={supplier.rating}
                      color={getRatingColor(supplier.rating)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="center">{supplier.deliveryDuration}</TableCell>
                  <TableCell align="center">${supplier.pricePerUnit.toFixed(2)}</TableCell>
                  <TableCell align="center">{supplier.moq} {selectedItem.unit}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => handleSupplierSelect(supplier)}
                    >
                      Select
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Order Details Dialog */}
      <Dialog 
        open={orderDialogOpen} 
        onClose={() => setOrderDialogOpen(false)}
        maxWidth="sm"
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
          Add to Basket
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box sx={{ 
              backgroundColor: '#f1f5f9',
              p: 2,
              borderRadius: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: 1
            }}>
              <Typography variant="subtitle2" color="text.secondary">
                Ordering from
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="h6">{selectedSupplier?.name}</Typography>
                <Chip 
                  label={selectedSupplier?.rating}
                  color={getRatingColor(selectedSupplier?.rating)}
                  size="small"
                />
              </Box>
            </Box>

            <TextField
              label="Quantity"
              type="number"
              value={orderDetails.quantity}
              onChange={(e) => setOrderDetails(prev => ({ ...prev, quantity: e.target.value }))}
              fullWidth
              helperText={`Minimum order quantity: ${selectedSupplier?.moq} ${selectedItem?.unit}`}
              InputProps={{
                sx: { borderRadius: 1 }
              }}
            />
            <TextField
              label="Notes"
              multiline
              rows={4}
              value={orderDetails.notes}
              onChange={(e) => setOrderDetails(prev => ({ ...prev, notes: e.target.value }))}
              fullWidth
              InputProps={{
                sx: { borderRadius: 1 }
              }}
            />
            <Box sx={{ 
              backgroundColor: '#f1f5f9',
              p: 2,
              borderRadius: 1,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <Typography variant="subtitle1">Total Cost</Typography>
              <Typography variant="h6" color="primary">
                ${selectedSupplier ? (Number(orderDetails.quantity) * selectedSupplier.pricePerUnit).toFixed(2) : '0.00'}
              </Typography>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ 
          p: 2,
          borderTop: '1px solid',
          borderColor: 'divider'
        }}>
          <Button 
            onClick={() => setOrderDialogOpen(false)}
            sx={{ 
              borderRadius: 1,
              px: 3
            }}
          >
            Cancel
          </Button>
          <Button 
            variant="contained"
            onClick={handleBasketAdd}
            disabled={!orderDetails.quantity || Number(orderDetails.quantity) < selectedSupplier?.moq}
            sx={{ 
              borderRadius: 1,
              px: 3
            }}
          >
            Add to Basket
          </Button>
        </DialogActions>
      </Dialog>

      {/* Basket Dialog */}
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
          Shopping Basket
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {Object.entries(basket).map(([supplierName, items]) => (
              <Box key={supplierName} sx={{ 
                backgroundColor: '#f8fafc',
                p: 2,
                borderRadius: 1,
                border: '1px solid',
                borderColor: 'divider'
              }}>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  mb: 2
                }}>
                  <Typography variant="h6">{supplierName}</Typography>
                  <Chip 
                    label={items[0].supplierRating}
                    color={getRatingColor(items[0].supplierRating)}
                    size="small"
                  />
                </Box>
                <List>
                  {items.map((item, index) => (
                    <ListItem 
                      key={index} 
                      divider={index < items.length - 1}
                      sx={{ 
                        py: 1.5,
                        '&:hover': {
                          backgroundColor: 'rgba(0,0,0,0.02)'
                        }
                      }}
                    >
                      <ListItemText
                        primary={item.name}
                        secondary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant="body2" color="text.secondary">
                              {item.quantity} {item.unit}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              ×
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              ${item.pricePerUnit.toFixed(2)}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              =
                            </Typography>
                            <Typography variant="body2" color="primary" fontWeight="medium">
                              ${item.totalPrice.toFixed(2)}
                            </Typography>
                          </Box>
                        }
                      />
                      <ListItemSecondaryAction>
                        <IconButton
                          edge="end"
                          onClick={() => handleBasketRemove(supplierName, index)}
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
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mt: 2,
                  pt: 2,
                  borderTop: '1px solid',
                  borderColor: 'divider'
                }}>
                  <Typography variant="subtitle1">Supplier Total</Typography>
                  <Typography variant="h6" color="primary">
                    ${items.reduce((sum, item) => sum + item.totalPrice, 0).toFixed(2)}
                  </Typography>
                </Box>
              </Box>
            ))}
            <Box sx={{ 
              backgroundColor: '#f1f5f9',
              p: 2,
              borderRadius: 1,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <Typography variant="h6">Grand Total</Typography>
              <Typography variant="h5" color="primary">
                ${Object.values(basket).reduce((total, items) => 
                  total + items.reduce((sum, item) => sum + item.totalPrice, 0), 0
                ).toFixed(2)}
              </Typography>
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
            Continue Shopping
          </Button>
          <Button 
            variant="contained"
            onClick={handleBasketFinalize}
            disabled={getTotalItems() === 0}
            sx={{ 
              borderRadius: 1,
              px: 3
            }}
          >
            Place Orders
          </Button>
        </DialogActions>
      </Dialog>

      {/* Multiple Suppliers Confirmation Dialog */}
      <Dialog
        open={confirmationDialogOpen}
        onClose={() => setConfirmationDialogOpen(false)}
      >
        <DialogTitle>Multiple Suppliers</DialogTitle>
        <DialogContent>
          <Typography>
            You are about to place separate orders with multiple suppliers. Would you like to proceed?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmationDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={submitOrders}>
            Proceed
          </Button>
        </DialogActions>
      </Dialog>

      {/* Existing Order Dialog */}
      <Dialog
        open={existingOrderDialog.open}
        onClose={() => setExistingOrderDialog({ open: false, supplier: null, orderDetails: null })}
      >
        <DialogTitle>Existing Order Found</DialogTitle>
        <DialogContent>
          <Typography>
            There is already a pending order with {existingOrderDialog.supplier?.name}. 
            Would you like to add to the existing order?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setExistingOrderDialog({ open: false, supplier: null, orderDetails: null });
            navigate('/orders');
          }}>
            View Existing Order
          </Button>
          <Button onClick={() => {
            setExistingOrderDialog({ open: false, supplier: null, orderDetails: null });
            setSelectedSupplier(existingOrderDialog.supplier);
            setOrderDetails({
              quantity: existingOrderDialog.supplier?.moq.toString(),
              notes: '',
            });
            setOrderDialogOpen(true);
          }}>
            Create New Order
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

export default Restock; 