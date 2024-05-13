import React, { createContext, useContext, useEffect, useState } from "react";
import { UserOp, UserOpContextType } from "../@types/userOp";

const UserOptionsContext = createContext<UserOpContextType | undefined>(
  undefined
);

export const UserOptionsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<UserOp["option"]>(
    localStorage.getItem("theme") || "light"
  );
  const [lang, setLang] = useState<UserOp["option"]>(
    localStorage.getItem("lang") || "es"
  );
  const [showFinished, setShowFinished] = useState<UserOp["option"]>(
    localStorage.getItem("showFinished") || "false"
  );
  const [showMain, setShowMain] = useState<UserOp["option"]>(
    localStorage.getItem("showMain") || "false"
  );

  useEffect(() => {
    localStorage.setItem("theme", theme);
    localStorage.setItem("lang", lang);
    localStorage.setItem("showFinished", showFinished);
    localStorage.setItem("showMain", showMain);
  }, [theme, lang, showFinished, showMain]);

  return (
    <UserOptionsContext.Provider
      value={{
        theme,
        toggleTheme: () => setTheme(theme === "light" ? "dark" : "light"),
        lang,
        toggleLang: () => setLang(lang === "es" ? "en" : "es"),
        showFinished,
        toggleShowFinished: () =>
          setShowFinished(showFinished === "true" ? "false" : "true"),
        showMain,
        toggleShowMain: () =>
          setShowMain(showMain === "true" ? "false" : "true"),
      }}
    >
      {children}
    </UserOptionsContext.Provider>
  );
};

export default function useUserOptions() {
  const context = useContext(UserOptionsContext);
  if (!context)
    throw Error(
      "UserOptionsContext can only be used inside an UserOptionsProvider"
    );
  return context;
}
