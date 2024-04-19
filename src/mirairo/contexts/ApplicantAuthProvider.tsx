import React, { createContext, useContext } from "react";
import { useLocalStorage } from "../../core/hooks/useLocalStorage";
import { useLogin } from "../hooks/useApplicantLogin";
import { useLogout } from "../hooks/useApplicantLogout";
import { useApplicantData } from "../hooks/useApplicantData";
import { ApplicantResume, PersonalInformation } from "../types/Information";
import { useGetApplicantData } from "../hooks/useGetApplicantData";

interface AuthContextInterface {
  // eslint-disable-next-line @typescript-eslint/ban-types
  //   hasRole: (roles?: string[]) => {};
  isLoggingIn: boolean;
  isLoggingOut: boolean;
  isDataLoading: boolean;
  login: (email: string, password: string) => Promise<any>;
  logout: () => Promise<any>;
  applicantInfo?: ApplicantResume;
  authKey: string;
}

export const AuthContext = createContext({} as AuthContextInterface);

type AuthProviderProps = {
  children?: React.ReactNode;
};

const ApplicantAuthProvider = ({ children }: AuthProviderProps) => {
  const [authKey, setAuthKey] = useLocalStorage<string>(
    "applicant_authkey",
    ""
  );

  const { isLoggingIn, login } = useLogin();
  const { isLoggingOut, logout } = useLogout();
  const { isLoading, data: applicantInfo } = useGetApplicantData(authKey);

  //   const hasRole = (roles?: string[]) => {
  //     if (!roles || roles.length === 0) return true;

  //     if (!applicantInfo) return false;

  //     return roles.includes(applicantInfo);
  //   };

  const handleLogin = async (email: string, password: string) => {
    return login({ email, password })
      .then((key: string) => {
        setAuthKey(key);
        return key;
      })
      .catch((err) => {
        throw err;
      });
  };

  const handleLogout = async () => {
    return logout()
      .then((data) => {
        setAuthKey("");
        return data;
      })
      .catch((err) => {
        throw err;
      });
  };

  return (
    <AuthContext.Provider
      value={{
        // hasRole,
        isLoggingIn,
        isLoggingOut,
        isDataLoading: isLoading,
        login: handleLogin,
        logout: handleLogout,
        applicantInfo,
        authKey,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useApplicantAuth() {
  return useContext(AuthContext);
}

export default ApplicantAuthProvider;
