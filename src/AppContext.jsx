import React, { createContext, useState } from "react";

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [page, setPage] = useState("");
  const [userCredentials, setUserCredentials] = useState(null);
  const [UserRole, setUserRole] = useState(null); // ✅ Ensure state exists

   console.log("AppContext.Provider is rendering...");
  console.log("setRole in context:", setUserRole);
   // Debugging line
   console.log("Roleis:",UserRole)

  return (
    <AppContext.Provider value={{ page, setPage, userCredentials, setUserCredentials, UserRole, setUserRole }}>
      {children}
      
    </AppContext.Provider>
  );
}
