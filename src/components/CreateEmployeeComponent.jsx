import React, { useState } from 'react';
import { Container, Grid, Card, CardContent, Typography, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CreateEmployeeComponent = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [emailId, setEmailId] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch('http://localhost:8080/employee/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstname: firstName,
                    lastname: lastName,
                    email: emailId
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            console.log('Employee created successfully');
            
            setFirstName('');
            setLastName('');
            setEmailId('');
            navigate('/');
          
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'firstName':
                setFirstName(value);
                break;
            case 'lastName':
                setLastName(value);
                break;
            case 'emailId':
                setEmailId(value);
                break;
            default:
                break;
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '75vh' }}>
            <Container maxWidth="md" mt={4} >
                <Grid container justifyContent="center">
                    <Grid item xs={12} md={6} style={{ border: '2px solid #e0e0e0', borderRadius: '4px' }}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5" align="center" gutterBottom>Create Employee</Typography>
                                <form onSubmit={handleSubmit}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                label="First Name"
                                                variant="outlined"
                                                value={firstName}
                                                onChange={handleChange}
                                                name="firstName"
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                label="Last Name"
                                                variant="outlined"
                                                value={lastName}
                                                onChange={handleChange}
                                                name="lastName"
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                label="Email Id"
                                                variant="outlined"
                                                type="email"
                                                value={emailId}
                                                onChange={handleChange}
                                                name="emailId"
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Button type="submit" variant="contained" color="primary">Save</Button>
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

export default CreateEmployeeComponent;
