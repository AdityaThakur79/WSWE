import React, { useEffect, useState } from 'react'
import { useAuthenticationToken } from '../context/auth'
import { Outlet } from 'react-router-dom'
import axios from 'axios';

const AdminCheckAuth = () => {
    const [ok, setOk] = useState(false);
    const { authenticationToken } = useAuthenticationToken()

    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                console.log('authentication token at admin check auth', authenticationToken)

                const res = await axios.get('/api/v1/admin/adminRoute');
                console.log('res is', res)
                if (res?.data?.ok) {
                    setOk(true);
                }
            } catch (error) {
                setOk(false);
            }
        };
        if (authenticationToken) {
            checkAuthentication()
        }
    }, [authenticationToken])

    return ok ? <Outlet /> : 'Not Found';
}

export default AdminCheckAuth
