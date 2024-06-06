import React, { useState, useEffect } from 'react';
import { Container, Grid, Card, CardContent, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

const ViewEmployeeComponent = () => {
    const { id } = useParams();
    const [employee, setEmployee] = useState({});

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await fetch(`http://localhost:8080/employee/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch employee');
                }
                const data = await response.json();
                setEmployee(data);
            } catch (error) {
                console.error('Error fetching employee data:', error);
            }
        };
        fetchEmployee();
    }, [id]);

    return (
        <Container maxWidth="md" mt={4}>
            <Grid container justifyContent="center">
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5" align="center" gutterBottom>View Employee Details</Typography>
                            <Grid container spacing={2}>

                                <Grid item xs={12}>
                                    <Typography variant="subtitle1">Employee ID:</Typography>
                                    <Typography>{employee.id}</Typography>
                                </Grid>

                                <Grid item xs={12}>
                                    <Typography variant="subtitle1">First Name:</Typography>
                                    <Typography>{employee.firstname}</Typography>
                                </Grid>

                                <Grid item xs={12}>
                                    <Typography variant="subtitle1">Last Name:</Typography>
                                    <Typography>{employee.lastname}</Typography>
                                </Grid>

                                <Grid item xs={12}>
                                    <Typography variant="subtitle1">Email:</Typography>
                                    <Typography>{employee.email}</Typography>
                                </Grid>
                                
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

export default ViewEmployeeComponent;
