import  { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
const SecondPage = () => {
  const [data, setData] = useState([]);
  const navigate=useNavigate();
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((json) => setData(json));
  }, []);

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'title', headerName: 'Title', width: 130 },
    { field: 'body', headerName: 'Body', width: 130 },
  ];
  const handleLogout=()=>{
    localStorage.clear();
    navigate("/")
  }

  return (
    <div style={{ height:'100vh', width: '100%',backgroundColor:'rgb(222,48,135)',overflowY:'scroll'}}>
      <Button
       onClick={handleLogout}
        sx={{
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            right:'0',
            position:'relative',
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',    
          fontSize: '16px',
          marginLeft:'1330px',
          
          '&:hover': {
            backgroundColor: '#0056b3',
          },
          // Add any additional styles you need here
        }}
      >Logout</Button>
      <DataGrid rows={data} columns={columns} checkboxSelection  style={{}}/>
      
    </div>
  );
};

export default SecondPage;


