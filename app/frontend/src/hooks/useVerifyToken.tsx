import { useEffect, useState } from "react";
import { requestPostPut } from "../services/api";
import { useNavigate } from "react-router-dom";

const useVerifyToken = () => {
  const endpoint = "/auth/verify";
  const token = localStorage.getItem("_auth");
  const navigate = useNavigate();
  const [isValid, setIsValid] = useState<boolean>(false);

  useEffect(() => {
    if (!token) return navigate("/login");
    try {
      const tokenResult = requestPostPut(
        endpoint,
        {
          token,
        },
        "",
        "post"
      );
      if (!tokenResult) return setIsValid(false);
      return setIsValid(true);
    } catch (error) {
      return setIsValid(false);
    }
  }, [token, navigate]);
  return isValid;
};

export default useVerifyToken;
