import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import React from 'react'
import FormHelperText from '@mui/material/FormHelperText'

const ExpenseForm = ({ formData, setFormData ,errors,setErrors }) => {
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    setErrors({
      ...errors,
      [`${e.target.name}Err`]:""
    })
  }

  return (
    <form>
      <Stack spacing={2}>
        {/* Amount */}
        <TextField
          label="Amount"
          variant="outlined"
          size="small"
          name="amount"
          fullWidth
          onChange={handleChange}
          value={formData.amount || ''}
          error={Boolean(errors?.amountErr)}
          helperText={errors?.amountErr}
        />

        {/* Type */}
        <FormControl required sx={{ m: 1, minWidth: 120 }} size='small'   error={Boolean(errors?.expense_typeErr)}>
        <InputLabel id="type">Type</InputLabel>
        <Select
          labelId="type"
          id="type"
          value={formData.expense_type}
          onChange={handleChange}
          name='expense_type'
          label="Age *"
        >
         
          <MenuItem value={1}>Gain</MenuItem>
          <MenuItem value={2}>Expense</MenuItem>
        </Select>
         <FormHelperText>{errors?.expense_typeErr}</FormHelperText>
      </FormControl>

        {/* Description */}
        <TextField
          label="Description"
          variant="outlined"
          size="small"
          name="description"
          fullWidth
          value={formData.description || ''}
          onChange={handleChange}
           error={Boolean(errors?.descriptionErr)}
          helperText={errors?.descriptionErr}
        />
      </Stack>
    </form>
  )
}

export default ExpenseForm
