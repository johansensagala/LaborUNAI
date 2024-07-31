import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { AppConfigContext } from "./AppConfigContext";

export const StudentContext = createContext({});

export function StudentContextProvider({ children }) {
    const [student, setStudent] = useState(null);
    const { backendUrl } = useContext(AppConfigContext);

    useEffect(() => {
        if (!student) {
            axios.get(`${backendUrl}/student-data`, { withCredentials: true }).then(({ data }) => {
                setStudent(data);
            });
        }
    }, [student, backendUrl]);

    return (
        <StudentContext.Provider value={{ student, setStudent }}>
            {children}
        </StudentContext.Provider>
    );
}
