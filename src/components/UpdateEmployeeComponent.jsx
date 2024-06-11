import React, { useState, useEffect } from 'react';
import { Container, Grid, Card, CardContent, Typography, TextField, Button, Snackbar, SnackbarContent } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function UpdateEmployeeComponent  () {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
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
                setEmail(data.email);
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
                body: JSON.stringify(
                    { firstname: firstName, lastname: lastName, email: email }),
            });
            if (!response.ok) throw new Error('Network response was not ok');

            setOpenSnackbar(true);

            setTimeout(() => { navigate('/'); }, 500);
        } catch (error) {
            console.error('Failed to update employee details:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'firstName': setFirstName(value); break;
            case 'lastName': setLastName(value); break;
            case 'email': setEmail(value); break;
            default: break;
        }
    };

    const handleSnackbarClose = () => {
        setOpenSnackbar(false);
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '75vh' }}>
            <Container maxWidth="md">
                <Grid container justifyContent="center">
                    <Grid item xs={12} md={6}>
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
                                        Data updated successfully!
                                    </span>
                                }
                            />
                        </Snackbar>
                        <Card variant="outlined">
                            <CardContent>
                                <Typography variant="h5" align="center" gutterBottom>Update Employee</Typography>
                                <form onSubmit={handleSubmit}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <TextField fullWidth label="First Name" variant="outlined" value={firstName} onChange={handleChange} name="firstName" />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField fullWidth label="Last Name" variant="outlined" value={lastName} onChange={handleChange} name="lastName" />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField fullWidth label="Email Id" variant="outlined" value={email} onChange={handleChange} name="email" />
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
