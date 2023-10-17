import { useAuthContext } from "./useAuthContext";
import { useJobsContext } from "./useJobsContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: JobDispatch } = useJobsContext();

  const logout = () => {
    //clear user item from local storage
    localStorage.removeItem("user");

    //clear global state using dispatch action
    dispatch({ type: "LOGOUT" });
    JobDispatch({ type: "SET_JOBLISTINGS", payload: null });
  };

  return { logout };
};
