import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();

  const logout = () => {
    //clear user item from local storage
    localStorage.removeItem("user");

    //clear global state using dispatch action
    dispatch({ type: "LOGOUT" });
  };

  return { logout };
};
