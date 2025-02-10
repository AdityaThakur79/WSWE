import React, { useEffect, useState } from 'react';
import AdminContentWrapper from '../../components/AdminContentWrapper';
import AdminHeader from '../../components/AdminHeader';
import axios from 'axios';
import {
    GridComponent,
    ColumnsDirective,
    ColumnDirective,
    Page,
    Sort,
    Filter,
    ExcelExport,
    PdfExport,
    Inject,
} from '@syncfusion/ej2-react-grids';
import { usersGrid } from '../../Data';
import '@syncfusion/ej2-react-grids/styles/material.css';

const AllUsers = () => {
    const [users, setUsers] = useState([]);

    const getAllUsersAuthorized = async () => {
        try {
            const token = localStorage.getItem('token');
            const { data } = await axios.get('/api/v1/admin/getAllUsers', {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            });
            console.log('Fetched users:', data);
            setUsers(data?.data || []);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
        getAllUsersAuthorized();

     
    }, []);

    return (
        <AdminContentWrapper>
            <div className="mt-20">
                <AdminHeader category="Page" title="All Users" />
                <div className="mt-10 m-2 md:mt-10 p-2 md:p-5 bg-white rounded-3xl">
                    {users.length > 0 ? (
                        <GridComponent
                            id="gridComp"
                            dataSource={users}
                            allowTextWrap={true}
                            allowPaging
                            allowSorting
                            toolbar={['ExcelExport', 'PdfExport']}
                        >
                            <ColumnsDirective>
                                {usersGrid.map((item, index) => (
                                    <ColumnDirective key={index} {...item} />
                                ))}
                            </ColumnsDirective>
                            <Inject services={[Page, Sort, Filter, ExcelExport, PdfExport]} />
                        </GridComponent>
                    ) : (
                        <p>Loading users...</p>
                    )}
                </div>
            </div>
        </AdminContentWrapper>
    );
};

export default AllUsers;
