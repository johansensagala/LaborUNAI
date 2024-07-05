import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const DosenContext = createContext({});

export function DosenContextProvider({children}) {
    const [dosen, setDosen] = useState(null);

    useEffect(() => {
        if (!dosen) {
            axios.get('http://localhost:5000/dosen', { withCredentials: true }).then(({data}) => {
                setDosen(data);
            });
        }
    }, [])

    return (
        <DosenContext.Provider value={{ dosen, setDosen }}>
            {children}
        </DosenContext.Provider>
    )
}
