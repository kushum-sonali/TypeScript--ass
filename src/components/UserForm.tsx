import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import "./Form.css"
import { useNavigate } from 'react-router-dom';
type UserFormData = {
  name: string;
  phone: string;
  email: string;
};

type UserFormProps = {
  onSave: (data: UserFormData) => void;
};

const UserForm: React.FC<UserFormProps> = ({ onSave }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
const navigate= useNavigate();
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSave({ name, phone, email });
    navigate("/second")
  };
  

  return (
    <Box 
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      flexDirection: 'column',
      backgroundColor:'rgb(18,23,61)'
    }}
  >
    {/* Your form goes here */}

    <form   className='form-page'>
      <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <TextField label="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
      <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Button
      onClick={handleSubmit}
  sx={{
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',    
    fontSize: '16px',
    
    '&:hover': {
      backgroundColor: '#0056b3',
    },
    // Add any additional styles you need here
  }}
>
  Submit
</Button>
    </form>
    </Box>
  );
};

export default UserForm;

