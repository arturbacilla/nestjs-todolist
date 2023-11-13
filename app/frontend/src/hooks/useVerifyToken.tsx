import { useContext, useEffect, useState } from "react";
import { requestPostPut } from "../services/api";
import { useNavigate } from "react-router-dom";
import { ITasksContext } from "../types/context";
import TasksContext from "../context/TasksContext";

const useVerifyToken = () => {
  const endpoint = "/auth/verify";
  const token = localStorage.getItem("_auth");
  const storeUser = localStorage.getItem("_auth_state");
  const { id, email, userName } = (storeUser && JSON.parse(storeUser)) || {};
  const navigate = useNavigate();
  const [isValid, setIsValid] = useState<boolean>(false);
  const { userHandlers } = useContext<ITasksContext | null>(TasksContext) || {};

  const [, setStoreUser] = userHandlers || [];

  useEffect(() => {
    if (!token || !setStoreUser) return navigate("/login");
    try {
      const tokenResult = requestPostPut(
        endpoint,
        {
          token,
        },
        "",
        "post"
      );
      if (!tokenResult) {
        setStoreUser(null);
        return setIsValid(false);
      }
      setStoreUser({ id, email, userName });
      return setIsValid(true);
    } catch (error) {
      setStoreUser(null);
      return setIsValid(false);
    }
  }, [token, navigate, setStoreUser, id, email, userName]);
  return isValid;
};

export default useVerifyToken;
