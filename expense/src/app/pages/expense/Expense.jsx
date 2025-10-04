import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import ComanModal from '../../components/ComanModal';
import ConfirmDialog from '../../components/ConfirmDialog';
import api from '../../service/api';
import ExpenseForm from './ExpenseForm';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { DataGrid } from '@mui/x-data-grid';
const Expense = () => {
  const [expenses, setExpenses] = useState([]);
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState("Create Expense");
  const [editId, setEditId] = useState("");
  const [count, setCount] = useState(1);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const columns = [
    {
      field: "id",
      headerName: "ID",
      width:250,
    },
    {
      field: "amount",
      headerName: "Amount",
      width:100
    },
    {
      field: "expense_type",
      headerName: "type",
      width:100,
      valueGetter:(value,row)=>{
        return row.expense_type===1?"Gain":"Expense"
      }
    },
    {
      field: "description",
      headerName: "Decription",
      width:250
    },
    {
      field: "date",
      headerName: "Date",
      width:150
    },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      width:150,
    renderCell: (params) => (
      <Stack direction="row" spacing={1}>
        <Button
          variant="contained"
          size="small"
          onClick={(e) => {e.stopPropagation();   handleModalOpen(params.row);}}
        >
          <ModeEditOutlinedIcon fontSize="small" />
        </Button>
        <Button
          variant="outlined"
          color="error"
          size="small"
          onClick={(e) =>{ e.stopPropagation();handleOpen(params.row.id)}}
        >
          <DeleteOutlineOutlinedIcon fontSize="small" />
        </Button>
      </Stack>)
    },
  ]
  const [errors, setErrors] = useState({
    amountErr: "",
    expense_typeErr: "",
    descriptionErr: ""
  });
  const [formData, setFormData] = useState({
    amount: "",
    expense_type: "",
    description: ""
  });

  const handleModalOpen = (data) => {
    setModalOpen(true);
    if (data) {
      setEditId(data.id);
      setFormData({ ...data });
      setTitle("Update Expense");
    } else {
      setFormData({ amount: "", expense_type: "", description: "" });
      setTitle("Create Expense");
      setEditId("");
    }
  };

  const handleSubmit = async () => {
    const { error, isValid } = validateForm(formData);
    if (!isValid) {
      setErrors(error);
      return;
    }
    const url = editId ? `/expense/${editId}` : "/expense";
    try {
      const result = await api[editId ? "put" : "post"](url, formData);
      const data = result?.data;
      const newData = data?.data;
      if (!newData) throw new Error("Failed to update");
      if (editId) {
        const newExpenses = expenses.map(ex => ex.id === newData.id ? newData : ex);
        setExpenses(newExpenses);
      } else {
        setExpenses(prev => [...prev, newData]);
      }
      toast.success(data?.message || "Action performed");
    } catch (err) {
      const data = err?.response?.data;
      toast.error(data?.message || "Something went wrong!");
    } finally {
      onClose();
    }
  };

  const onClose = () => {
    setFormData({ amount: "", expense_type: "", description: "" });
    setModalOpen(false);
    setErrors(null);
  };

  const handleOpen = (id) => {
    setDeleteId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setDeleteId(null);
  };

  const confirmDelete = async () => {
    try {
      const result = await api.delete(`/expense/${deleteId}`);
      const data = result?.data;
      if (data?.success) {
        toast.success(data?.message || "Deleted");
        setExpenses(prev => prev.filter(ex => ex.id !== deleteId));
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Delete failed");
    } finally {
      handleClose();
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search)
    }, 500)
    return () => {
      clearTimeout(handler)
    }
  }, [search])

  useEffect(() => {
    const getExpenses = async () => {
      const filter = { page, limit, search: debouncedSearch.trim() };
      try {
        const res = await api.get("/expense", { params: filter });
        const data = res?.data;
        if (data?.success) {
          setCount(data?.data?.totalPages);
          setExpenses(data?.data?.list);
        } else {
          throw new Error("Something went wrong");
        }
      } catch (err) {
        toast.error(err.response?.data?.message || "Something went wrong!");
      }
    };
    getExpenses();
  }, [page, limit, debouncedSearch]);

  return (
    <div>
      <Card sx={{ mb: 2, boxShadow: 3, borderRadius: 2 }}>
        <CardContent>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h2 style={{ margin: 0 }}>Expense</h2>
            <Stack direction="row" spacing={1}>
              <TextField
                size="small"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                label="Search"
                sx={{ width: 250 }}
              />
              <Button variant="contained" color="primary" onClick={() => handleModalOpen()}>
                Add
              </Button>
            </Stack>
          </Box>
        </CardContent>
      </Card>

      {expenses.length > 0 && (
        <TableContainer component={Paper} sx={{ mt: 2, boxShadow: 3, borderRadius: 2 }}>
          <Table aria-label="expense table" size="small">
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                <TableCell sx={{ fontWeight: 'bold' }}>Id</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Amount</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Type</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Description</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: "center" }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {expenses.map(ex => (
                <TableRow key={ex?.id} hover>
                  <TableCell>{ex?.id}</TableCell>
                  <TableCell>{ex?.amount}</TableCell>
                  <TableCell>{ex?.expense_type === 1 ? "Gain" : "Expense"}</TableCell>
                  <TableCell>{ex?.description}</TableCell>
                  <TableCell>{ex?.date}</TableCell>
                  <TableCell align="center">
                    <Button variant="contained" size="small" sx={{ mr: 1, minWidth: 36, padding: "4px" }} onClick={() => handleModalOpen(ex)}>
                      <ModeEditOutlinedIcon fontSize="small" />
                    </Button>
                    <Button variant="outlined" size="small" color="error" sx={{ minWidth: 36, padding: "4px" }} onClick={() => handleOpen(ex.id)}>
                      <DeleteOutlineOutlinedIcon fontSize="small" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ p: 2 }}>
            <Pagination count={count} page={page} onChange={(e, value) => setPage(value)} showLastButton showFirstButton size="small" />
            <Stack direction="row" spacing={1} alignItems="center">
              <InputLabel id="limit-select-label" sx={{ fontSize: "0.875rem" }}>Item/Page</InputLabel>
              <Select labelId="limit-select-label" id="limit-select" value={limit} onChange={(e) => { setLimit(e.target.value); setPage(1) }} size="small" sx={{ minWidth: 80 }}>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={50}>50</MenuItem>
                <MenuItem value={100}>100</MenuItem>
              </Select>
            </Stack>
          </Stack>
        </TableContainer>
      )}
      {/* <DataGrid
        columns={columns}
        rows={expenses}
        disableRowSelectionOnClick={true}
      /> */}
      <ConfirmDialog open={open} onClose={handleClose} onConfirm={confirmDelete} title="Confirm Delete" content="Are you sure you want to delete this expense?" />
      <ComanModal open={modalOpen} onClose={onClose} children={<ExpenseForm formData={formData} setFormData={setFormData} errors={errors} setErrors={setErrors} />} onSubmit={handleSubmit} title={title} />
    </div>
  );
};

export default Expense;

export const validateForm = (expense) => {
  const { expense_type, amount, description } = expense;
  let isValid = true;
  const error = { expense_typeErr: "", amountErr: "", descriptionErr: "" };

  if (!expense_type) { error.expense_typeErr = "Expense type is required"; isValid = false; }
  if (amount === null || amount === undefined || amount === "") { error.amountErr = "Amount is required!"; isValid = false; }
  else if (amount < 0) { error.amountErr = "Amount should be positive!"; isValid = false; }
  if (!description || description.trim() === "") { error.descriptionErr = "Description is required!"; isValid = false; }

  return { error, isValid };
};
