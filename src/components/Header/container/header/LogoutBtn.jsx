import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../../../store/authSlice';
import authService from '../../../../appwrite/auth'; 

function LogoutBtn() {
    const dispatch = useDispatch();
    
    const handleLogout = async () => {
        try {
            await authService.logout(); 
            dispatch(logout());         
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };
    
    return (
        <button
            onClick={handleLogout}
            className="
                inline-flex items-center justify-center 
                px-4 py-2 text-sm font-medium text-gray-700 
                bg-white border border-gray-200 rounded-lg shadow-sm 
                transition-all duration-200 ease-in-out 
                hover:bg-red-50 hover:text-red-600 hover:border-red-200 hover:shadow 
                focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:ring-offset-1
                active:scale-95
            "
        >
            Sign out
        </button>
    );
}

export default LogoutBtn;