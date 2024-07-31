import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { AppConfigContext } from "./AppConfigContext"; // import AppConfigContext

export const LecturerContext = createContext({});

export function LecturerContextProvider({ children }) {
    const [lecturer, setLecturer] = useState(null);
    const { backendUrl } = useContext(AppConfigContext);

    useEffect(() => {
        if (!lecturer) {
            axios.get(`${backendUrl}/lecturer-data`, { withCredentials: true }).then(({ data }) => {
                setLecturer(data);
            });
        }
    }, [lecturer, backendUrl]);

    return (
        <LecturerContext.Provider value={{ lecturer, setLecturer }}>
            {children}
        </LecturerContext.Provider>
    );
}
