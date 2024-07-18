import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [token, setToken] = useState(localStorage.getItem('tokenIms'));
    const [user, setUser] = useState("")
    const [allUser, setAllUser] = useState();
    const [Branch, setBranch] = useState();
    const [allCourse, setAllCourse] = useState();
    const [allFollowUps, setAllFollowUps] = useState();
    const [allInquiry, setAllInquiry] = useState();
    const [allReferences, setAllReferences] = useState();
    const [allRole, setAllRole] = useState();
    const [allStatus, setAllStatus] = useState();
    let authorizationToken = token;

    const api = 'https://ims-backend-emui.onrender.com';

    const findAdmin = async () => {
        const response = await fetch(`${api}/auth/admin`, {
            method: "GET",
            headers: {
                AUthorization: authorizationToken
            }
        });

        if (response.ok) {
            const data = await response.json();
            setUser(data[0])
        }
    }

    const getAllUser = async () => {
        const response = await fetch(`${api}/auth/view_admin`, {
            method: "GET",
            headers: {
                AUthorization: authorizationToken
            }
        });

        if (response.ok) {
            const data = await response.json();
            setAllUser(data.data);
        }
    }

    const storeTokenInLs = (token) => {
        setToken(token);
        return localStorage.setItem('tokenIms', token);
    }

    const Logout = () => {
        setToken("");
        localStorage.removeItem('tokenIms');
    }

    let isLoggedIn = !!token;

    const getAllBranch = async () => {
        const response = await fetch(`${api}/branch/view_branch`, {
            method: "GET",
            headers: {
                AUthorization: authorizationToken
            }
        });

        if (response.ok) {
            const data = await response.json();
            setBranch(data.data)
        }
    }

    const getAllCourse = async () => {
        const response = await fetch(`${api}/course/view_course`, {
            method: "GET",
            headers: {
                AUthorization: authorizationToken
            }
        });

        if (response.ok) {
            const data = await response.json();
            setAllCourse(data.data);
        }
    }

    const getAllFollowUps = async () => {
        const response = await fetch(`${api}/follow/view_followup`, {
            method: "GET",
            headers: {
                AUthorization: authorizationToken
            }
        });

        if (response.ok) {
            const data = await response.json();
            setAllFollowUps(data.data);
        }
    };

    const getAllInquiry = async () => {
        const response = await fetch(`${api}/inquiry/view_inquiry`, {
            method: "GET",
            headers: {
                AUthorization: authorizationToken
            }
        });

        if (response.ok) {
            const data = await response.json();
            setAllInquiry(data.data);
        }
    };

    const getAllReferences = async () => {
        const response = await fetch(`${api}/ref/view_reference`, {
            method: "GET",
            headers: {
                AUthorization: authorizationToken
            }
        });

        if (response.ok) {
            const data = await response.json();
            setAllReferences(data.data);
        }
    };

    const getAllRole = async () => {
        const response = await fetch(`${api}/role/view_role`, {
            method: "GET",
            headers: {
                AUthorization: authorizationToken
            }
        });

        if (response.ok) {
            const data = await response.json();
            setAllRole(data.data)
        }
    }

    const getAllStatus = async () => {
        const response = await fetch(`${api}/status/view_status`, {
            method: "GET",
            headers: {
                AUthorization: authorizationToken
            }
        });

        if (response.ok) {
            const data = await response.json();
            setAllStatus(data.data)
        }
    }

    useEffect(() => {
        findAdmin();
    }, [token]);

    return (
        <AuthContext.Provider value={{ storeTokenInLs, isLoggedIn, Logout, api, authorizationToken, user, findAdmin, getAllUser, allUser, getAllBranch, Branch, getAllCourse, allCourse, getAllFollowUps, allFollowUps, getAllInquiry, allInquiry, getAllReferences, allReferences, getAllRole, allRole, getAllStatus, allStatus }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
};