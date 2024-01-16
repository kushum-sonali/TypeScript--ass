import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import UserForm from './components/UserForm';
import SecondPage from './components/SecondPage';

type UserDetails = {
  name: string;
  phone: string;
  email: string;
};

const RedirectToSecondPage: React.FC<{ userDetails: UserDetails | null }> = ({ userDetails }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (userDetails) {
      navigate('/second');
    }
  }, [userDetails, navigate]);

  return null; // This component does not render anything
};

const App = () => {
  const userDetailsString = localStorage.getItem('userDetails');
  const userDetailsInitialValue = userDetailsString ? JSON.parse(userDetailsString) : null;
  const [userDetails, setUserDetails] = useState<UserDetails | null>(userDetailsInitialValue);

  const saveUserDetails = (details: UserDetails) => {
    localStorage.setItem('userDetails', JSON.stringify(details));
    setUserDetails(details);

  };

  return (
    <Router>
      <RedirectToSecondPage userDetails={userDetails} />
      <Routes>
        <Route path="/" element={<UserForm onSave={saveUserDetails} />} />
        <Route path="/second" element={<SecondPage />} />
      </Routes>
    </Router>
  );
};

export default App;




