import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { Box } from '@mui/system';
import api from '../../../service/api';
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import './Register.css'
import { Link, Typography } from '@mui/material';
const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: ""
  })
  const [errors, setErrors] = useState({
    nameErr: "",
    emailErr: "",
    mobileErr: "",
    passwordErr: ""
  })

  const validDateForm = (data) => {

    const err = {
      nameErr: "",
      emailErr: "",
      mobileErr: "",
      passwordErr: ""
    }
    let isValid = true
    if (data?.name.trim() === "") {
      err.nameErr = "Name is required"
      isValid = false
    } else if (data?.name.trim().length < 2) {
      err.nameErr = "Name is too short!"
      isValid = false
    }
    if (data?.email.trim() === "") {
      err.emailErr = "Email is required"
      isValid = false
    }
    else if (! /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data?.email.trim())) {
      err.emailErr = "Invalid Email"
      isValid = false
    }

    if (data?.mobile.trim() === "") {
      err.mobileErr = "Mobile is required!"
      isValid = false
    } else if (data?.mobile?.trim().length !== 10) {
      err.mobileErr = "Invalid mobile!"
      isValid = false
    }
    if (data?.password.trim() === "") {
      err.passwordErr = "Password is required!"
      isValid = false
    } else if (data?.password.trim().length < 6) {
      err.passwordErr = "Password length should be alteast 6 or greater !"
      isValid = false
    }
    setErrors(err)
    return isValid
  }
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setErrors({ ...errors, [`${e.target.name}Err`]: "" })
  }
  const handleSubmit = async (e) => {
    setIsLoading(true)
    e.preventDefault();
    if (!validDateForm(formData)) {
      alert("form is not valid ")
      console.log("form data ", formData);
      console.log(errors);
      setIsLoading(false)
      return
    }
    try {
      const result = await api.post("/auth/register", formData)
      const data = result?.data
      if (data.success) {
        console.log(result.data);
        toast.success(data?.message)
        navigate("/")
      }
    } catch (err) {
      const data = err?.response?.data
      console.log(data);
      toast.error(data?.message || "Something went wrong!")
      setErrors({ ...errors, emailErr: data?.error?.message })
    } finally {
      setIsLoading(false)
    }

  }

  return (
    <div>
      <Box sx={{
        width: "50%",
        margin: "auto"
      }}>
        <Card>

          <CardContent>
            <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
              Expense Tracker
            </Typography>
            <Typography variant="subtitle1" align="center" gutterBottom>
              Create your account
            </Typography>
            <form onSubmit={handleSubmit}>
              <div className='input-group'>
                <TextField
                  placeholder='Name'
                  name='name'
                  required
                  value={formData.name}
                  onChange={onChange}
                  id='name'
                  label="Name"
                  sx={{
                    width: "100%"
                  }}
                  helperText={errors.nameErr}
                  error={Boolean(errors.nameErr)}
                />
              </div>
              <div className='input-group'>
                <TextField
                  placeholder='Email'
                  required
                  name='email'
                  value={formData.email}
                  onChange={onChange}
                  id='email'
                  label="Email"
                  sx={{
                    width: "100%"
                  }}
                  helperText={errors.emailErr}
                  error={Boolean(errors.emailErr)}
                />
              </div>
              <div className='input-group'>
                <TextField
                  placeholder='Mobile'
                  required
                  name='mobile'
                  value={formData.mobile}
                  onChange={onChange}
                  id='mobile'
                  label="Mobile"
                  sx={{
                    width: "100%"
                  }}
                  helperText={errors.mobileErr}
                  error={Boolean(errors.mobileErr)}
                />
              </div>
              <div className='input-group'>
                <TextField
                  placeholder='Password'
                  required
                  type='password'
                  name='password'
                  value={formData.password}
                  onChange={onChange}
                  id='password'
                  label="Password"
                  sx={{
                    width: "100%"
                  }}
                  helperText={errors.passwordErr}
                  error={Boolean(errors.passwordErr)}
                />
              </div>
              <Button variant='contained' type='submit'
                sx={{
                  width: "100%",

                }}
                loading={isLoading}
              >submit</Button>
            </form>
            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Typography variant="body2">
                Already have an account?{' '}
                <Link style={{ cursor: "pointer", color: '#1976d2', fontWeight: 'bold', textDecoration: 'none' }} onClick={() => navigate("/")}>
                  Sign in
                </Link>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </div>
  )
}

export default Register