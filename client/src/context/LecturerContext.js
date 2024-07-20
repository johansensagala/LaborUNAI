import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const LecturerContext = createContext({});

export function LecturerContextProvider({children}) {
    const [lecturer, setLecturer] = useState(null);

    useEffect(() => {
        if (!lecturer) {
            axios.get('http://localhost:5000/lecturer-data', { withCredentials: true }).then(({data}) => {
                setLecturer(data);
            });
        }
    }, [])

    return (
        <LecturerContext.Provider value={{ lecturer, setLecturer }}>
            {children}
        </LecturerContext.Provider>
    )
}
