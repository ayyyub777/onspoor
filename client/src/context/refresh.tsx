import { createContext, useState, useContext } from "react";

const defaultValue = {
    refresh: false,
    triggerRefresh: () => {},
};

const RefreshContext = createContext(defaultValue);

export function RefreshProvider({ children }: { children: React.ReactNode }) {
    const [refresh, setRefresh] = useState(false);

    const triggerRefresh = () => {
        setRefresh((prev) => !prev);
    };

    return (
        <RefreshContext.Provider value={{ refresh, triggerRefresh }}>
            {children}
        </RefreshContext.Provider>
    );
}

export function useRefresh() {
    return useContext(RefreshContext);
}
