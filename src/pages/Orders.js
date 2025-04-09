import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
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
  IconButton,
  Tooltip,
  Alert,
  Collapse,
  List,
  ListItem,
  ListItemText,
  useTheme,
} from '@mui/material';
import {
  Add as AddIcon,
  Cancel as CancelIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// Sample orders data
const initialOrders = [
  {
    id: 1,
    name: 'Order 1',
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
    name: 'Order 2',
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
    name: 'Order 3',
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

function Orders() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [orders, setOrders] = useState(initialOrders);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'asc',
  });
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortedOrders = () => {
    if (!sortConfig.key) return orders;

    return [...orders].sort((a, b) => {
      if (sortConfig.key === 'name') {
        return sortConfig.direction === 'asc' 
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      }
      if (sortConfig.key === 'date') {
        return sortConfig.direction === 'asc'
          ? new Date(a.orderDate) - new Date(b.orderDate)
          : new Date(b.orderDate) - new Date(a.orderDate);
      }
      if (sortConfig.key === 'totalPrice') {
        return sortConfig.direction === 'asc'
          ? a.totalPrice - b.totalPrice
          : b.totalPrice - a.totalPrice;
      }
      if (sortConfig.key === 'status') {
        const statusOrder = { 'complete': 0, 'pending': 1, 'terminated': 2 };
        return sortConfig.direction === 'asc'
          ? statusOrder[a.status] - statusOrder[b.status]
          : statusOrder[b.status] - statusOrder[a.status];
      }
      return 0;
    });
  };

  const handleCancelOrder = (orderId) => {
    setOrders(orders.map(order => 
      order.id === orderId
        ? { ...order, status: 'terminated' }
        : order
    ));
  };

  const handleAddToOrder = (orderId) => {
    // Redirect to restock page
    navigate('/restock');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'complete':
        return 'success';
      case 'terminated':
        return 'error';
      default:
        return 'default';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
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
        borderColor: 'divider',
      }}>
        <Typography variant="h4" sx={{ 
          fontWeight: 600,
          color: '#1e293b',
          mb: 1
        }}>
          Orders
        </Typography>
        <Typography variant="body1" sx={{ 
          color: '#64748b',
          fontSize: '1.1rem'
        }}>
          Manage and track your orders
        </Typography>
      </Box>

      {/* Orders Table */}
      <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f8fafc' }}>
              <SortableTableCell label="Order" sortKey="name" />
              <SortableTableCell label="Date" sortKey="date" />
              <TableCell align="center">Supplier</TableCell>
              <SortableTableCell label="Total Price" sortKey="totalPrice" />
              <SortableTableCell label="Status" sortKey="status" />
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {getSortedOrders().map((order) => (
              <TableRow 
                key={order.id}
                onClick={() => setSelectedOrder(order)}
                sx={{ 
                  cursor: 'pointer',
                  '&:hover': { backgroundColor: '#f8fafc' }
                }}
              >
                <TableCell align="center">{order.name}</TableCell>
                <TableCell align="center">{formatDate(order.orderDate)}</TableCell>
                <TableCell align="center">
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                    {order.supplier.name}
                    <Chip 
                      label={order.supplier.rating}
                      color={order.supplier.rating === 'A+' ? 'success' : 'primary'}
                      size="small"
                    />
                  </Box>
                </TableCell>
                <TableCell align="center">${order.totalPrice.toFixed(2)}</TableCell>
                <TableCell align="center">
                  <Chip 
                    label={order.status}
                    color={getStatusColor(order.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell align="center">
                  <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                    {order.status === 'pending' && (
                      <>
                        <Button
                          variant="contained"
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddToOrder(order.id);
                          }}
                        >
                          Add Items
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCancelOrder(order.id);
                          }}
                        >
                          Cancel
                        </Button>
                      </>
                    )}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Order Details Dialog */}
      <Dialog
        open={selectedOrder !== null}
        onClose={() => setSelectedOrder(null)}
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
          Order Details
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          {selectedOrder && (
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
                  Order Information
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="h6">{selectedOrder.name}</Typography>
                  <Chip 
                    label={selectedOrder.status}
                    color={getStatusColor(selectedOrder.status)}
                    size="small"
                  />
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Date: {formatDate(selectedOrder.orderDate)}
                </Typography>
              </Box>

              <Box>
                <Typography variant="h6" gutterBottom>
                  Items
                </Typography>
                <List>
                  {selectedOrder.items.map((item, index) => (
                    <ListItem 
                      key={index} 
                      divider={index < selectedOrder.items.length - 1}
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
                              ${item.price.toFixed(2)}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              =
                            </Typography>
                            <Typography variant="body2" color="primary" fontWeight="medium">
                              ${(item.quantity * item.price).toFixed(2)}
                            </Typography>
                          </Box>
                        }
                      />
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
                  <Typography variant="subtitle1">Order Total</Typography>
                  <Typography variant="h6" color="primary">
                    ${selectedOrder.totalPrice.toFixed(2)}
                  </Typography>
                </Box>
              </Box>

              <Box>
                <Typography variant="subtitle1" gutterBottom>
                  Notes
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {selectedOrder.notes}
                </Typography>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ 
          p: 2,
          borderTop: '1px solid',
          borderColor: 'divider'
        }}>
          <Button 
            onClick={() => setSelectedOrder(null)}
            sx={{ 
              borderRadius: 1,
              px: 3
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Orders; 