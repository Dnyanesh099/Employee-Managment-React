import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';

const ListEmployeeComponent = () => {
    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getEmployees().then(res => {
            setEmployees(res);
        });
    }, []);

    const getEmployees = async () => {
        try {
            const response = await fetch("http://localhost:8080/employee/all");
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            return [];
        }
    };

    const navigateToAddEmployee = () => {
        navigate("/add-employee");
    };

    const navigateToUpdateEmployee = (id) => {
        navigate(`/update-employee/${id}`);
    };

    const navigateToViewEmployee = (id) => {
        navigate(`/view-employee/${id}`);
    };


    const handleDeleteEmployee = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/employee/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Failed to delete employee');
            }
            // Remove the deleted employee from the state
            setEmployees(prevEmployees => prevEmployees.filter(employee => employee.id !== id));
            alert('Employee deleted successfully');

        } catch (error) {
            console.error('There was a problem................', error);
            alert('Failed to delete employee');
        }
    };

    const getRowClassName = (params) => {
        return params.row.id % 2 === 0 ? 'even-row' : 'odd-row';
    };

    return (
        <div className="container">
            <h2 className="text-center">Employees List</h2>
            <button className="btn btn-primary" onClick={navigateToAddEmployee}>Add Employee</button>
            <div className="table-container" style={{ height: 400, overflow: 'auto' }}>
                <DataGrid container spacing={2}
                    rows={employees}
                    columns={[
                        { field: 'id', headerName: 'Employee ID', width: 150 },
                        { field: 'firstname', headerName: 'Employee First Name', width: 200 },
                        { field: 'lastname', headerName: 'Employee Last Name', width: 200 },
                        { field: 'email', headerName: 'Employee Email Id', width: 250 },
                        {
                            field: 'actions',
                            headerName: 'Actions',
                            sortable: false,
                            width: 250,
                            renderCell: (params) => (
                                <div>
                                    <button className="btn btn-info" onClick={() => navigateToUpdateEmployee(params.row.id)}>Update</button>
                                    <button style={{ marginLeft: "15px" }} className="btn btn-danger" onClick={() => handleDeleteEmployee(params.row.id)}>Delete</button>
                                    <button style={{ marginLeft: "15px" }} className="btn btn-info" onClick={() => navigateToViewEmployee(params.row.id)}>View</button>
                                </div>
                            ),
                        },
                    ]}
                    autoHeight={false}
                    disableColumnResize={true}
                    getRowClassName={getRowClassName}
                />
            </div>
        </div>
    );
};

export default ListEmployeeComponent;
