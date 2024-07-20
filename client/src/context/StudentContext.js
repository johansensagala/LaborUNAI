import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const StudentContext = createContext({});

export function StudentContextProvider({children}) {
    const [student, setStudent] = useState(null);

    useEffect(() => {
        if (!student) {
            axios.get('http://localhost:5000/student', { withCredentials: true }).then(({data}) => {
                setStudent(data);
            });
        }
    }, [])

    return (
        <StudentContext.Provider value={{ student, setStudent }}>
            {children}
        </StudentContext.Provider>
    )
}
