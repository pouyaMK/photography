// 'use client';
// import { createContext, useContext, useState, useEffect } from 'react';
// import axios from 'axios';

// const UserContext = createContext(null);

// export function UserProvider({ children }: { children: React.ReactNode }) {
//     const [user, setUser] = useState(null);
//     const [loading, setLoading] = useState(true);

//     const fetchUser = async () => {
//         try {
//             const token = localStorage.getItem('token');
//             if (token) {
//                 const response = await axios.get("https://api.lightsostudio.com/api/user", {
//                     headers: { Authorization: `Bearer ${token}` }
//                 });
//                 setUser(response.data);
//             }
//         } catch (error) {
//             console.error('خطا در دریافت اطلاعات کاربر:', error);
//             localStorage.removeItem('token');
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchUser();
//     }, []);

//     return (
//         <UserContext.Provider value={{ user, setUser, loading, fetchUser }}>
//             {children}
//         </UserContext.Provider>
//     );
// }

// export const useUser = () => useContext(UserContext);


'use client';
import { createContext, useContext, useState, useEffect, Dispatch, SetStateAction } from 'react';
import axios from 'axios';

interface User {
    id: number;
    name: string;
}

interface UserContextType {
    user: User | null;
    setUser: Dispatch<SetStateAction<User | null>>;
    loading: boolean;
    fetchUser: () => Promise<void>;
}

const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchUser = async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const response = await axios.get("https://api.lightsostudio.com/api/user", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUser(response.data);
            }
        } catch (error) {
            console.error('خطا در دریافت اطلاعات کاربر:', error);
            localStorage.removeItem('token');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, loading, fetchUser }}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser باید داخل UserProvider استفاده شود');
    }
    return context;
};
