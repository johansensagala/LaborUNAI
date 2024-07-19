import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const MahasiswaContext = createContext({});

export function MahasiswaContextProvider({children}) {
    const [mahasiswa, setMahasiswa] = useState(null);

    useEffect(() => {
        if (!mahasiswa) {
            axios.get('http://localhost:5000/mhs', { withCredentials: true }).then(({data}) => {
                setMahasiswa(data);
            });
        }
    }, [])

    return (
        <MahasiswaContext.Provider value={{ mahasiswa, setMahasiswa }}>
            {children}
        </MahasiswaContext.Provider>
    )
}
