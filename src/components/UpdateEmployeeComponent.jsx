import React, { useState, useEffect } from 'react';
import { Container, Grid, Card, CardContent, Typography, TextField, Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateEmployeeComponent = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [emailId, setEmailId] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchEmployeeDetails = async () => {
            try {
                const response = await fetch(`http://localhost:8080/employee/${id}`);
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                setFirstName(data.firstname);
                setLastName(data.lastname);
                setEmailId(data.email);
            } catch (error) {
                console.error('Failed to fetch employee details:', error);
            }
        };
        fetchEmployeeDetails();
    }, [id]);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8080/employee/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ firstname: firstName, lastname: lastName, email: emailId }),
            });
            if (!response.ok) throw new Error('Network response was not ok');
            navigate('/');
        } catch (error) {
            console.error('Failed to update employee details:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'firstName': setFirstName(value); break;
            case 'lastName': setLastName(value); break;
            case 'emailId': setEmailId(value); break;
            default: break;
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '75vh' }}>
            <Container maxWidth="md">
                <Grid container justifyContent="center">
                    <Grid item xs={12} md={6}>
                        <Card variant="outlined">
                            <CardContent>
                                <Typography variant="h5" align="center" gutterBottom>Update Employee</Typography>
                                <form onSubmit={handleSubmit}>
                                     <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <TextField fullWidth label="First Name" variant="outlined" value={firstName} onChange={handleChange} name="firstName" />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField 
                                            fullWidth 
                                            label="Last Name" 
                                            variant="outlined" 
                                            value={lastName} 
                                            onChange={handleChange} 
                                            name="lastName" />
                                        </Grid>

                                        <Grid item xs={12}>
                                            <TextField 
                                            fullWidth label="Email Id" 
                                            variant="outlined" 
                                            value={emailId} 
                                            onChange={handleChange} 
                                            name="emailId" />
                                        </Grid>

                                        <Grid item xs={12}>
                                            <Button type="submit" variant="contained" color="primary">Update</Button>
                                        </Grid>

                                     </Grid>
                                </form>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default UpdateEmployeeComponent;