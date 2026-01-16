// To fetch the current loggedin username to USer Dashboard.
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    // This function would run on app load or successful login
    useEffect(() => {
        // Replace this with actual API call or local storage check
        const fetchedUser = {
            name: "Real User Name", // <--- The dynamic name
            email: "user@example.com",
            isAuthenticated: true,
            // ... other user details
        };
        setCurrentUser(fetchedUser);
    }, []);

    return (
        <AuthContext.Provider value={{ currentUser }}>
            {children}
        </AuthContext.Provider>
    );
};