import { createContext, useState, useEffect, useMemo, useCallback } from "react";
import axiosInstance from "../utils/axiosinstance";
import { API_PATHS } from "../utils/apiPaths";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUserState] = useState(null);
    const [loading, setLoading] = useState(true);

    // 🔒 Fetch profile ONLY once
    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if (!token) {
            setLoading(false);
            return;
        }

        let mounted = true;

        const fetchUser = async () => {
            try {
                const res = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE);

                if (mounted) {
                    setUserState(prev => {
                        // prevent re-render if same user
                        if (JSON.stringify(prev) === JSON.stringify(res.data)) {
                            return prev;
                        }
                        return res.data;
                    });
                }
            } catch (error) {
                console.log("User not authenticated", error);
                clearUser();
            } finally {
                if (mounted) setLoading(false);
            }
        };

        fetchUser();

        return () => {
            mounted = false;
        };
    }, []);

    // ✅ stable reference functions
    const updateUser = useCallback((userData) => {
        setUserState(userData);
        localStorage.setItem("accessToken", userData.token);
        setLoading(false);
    }, []);

    const clearUser = useCallback(() => {
        setUserState(null);
        localStorage.removeItem("accessToken");
    }, []);

    // 🔥 MOST IMPORTANT FIX
    const value = useMemo(() => ({
        user,
        loading,
        updateUser,
        clearUser
    }), [user, loading, updateUser, clearUser]);

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
