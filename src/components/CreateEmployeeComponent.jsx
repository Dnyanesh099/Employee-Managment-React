import React, { useState } from 'react';
import { Container, Grid, Card, CardContent, Typography, TextField, Button, Snackbar, SnackbarContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const CreateEmployeeComponent = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [emailId, setEmailId] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false); // State for Snackbar
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
            setOpenSnackbar(true); // Open Snackbar
            // navigate('/'); // You may navigate to another page if needed
          
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            // Handle error if needed
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

    const handleSnackbarClose = () => {
        setOpenSnackbar(false);
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '75vh' }}>
            <Container maxWidth="md" mt={4}>
                <Grid container justifyContent="center">
                    <Grid item xs={12} md={6} style={{ border: '2px solid #e0e0e0', borderRadius: '4px' }}>
                        <Snackbar
                            open={openSnackbar}
                            autoHideDuration={3000}
                            onClose={handleSnackbarClose}
                            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                        >
                            <SnackbarContent
                                style={{ backgroundColor: 'green', color: '#fff' }}
                                message={
                                    <span style={{ display: 'flex', alignItems: 'center' }}>
                                        <CheckCircleIcon style={{ marginRight: '8px' }} />
                                        Employee created successfully!
                                    </span>
                                }
                            />
                        </Snackbar>
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
