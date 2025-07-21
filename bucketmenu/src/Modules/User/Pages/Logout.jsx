import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Logout() {
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem('usertoken');
        navigate('/'); // 🔥 Redirect to home page
    }, [navigate]); // ✅ Fix: Include `navigate` in dependency array

    return null; // 🔥 No need for an empty `<div>`
}
