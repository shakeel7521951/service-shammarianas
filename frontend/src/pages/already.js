import { Navigate } from "react-router-dom";
import { useGetUserQuery } from "../features/usersApi";

const LoggedIn = ({ children }) => {
  const { data: userData, isLoading } = useGetUserQuery();
  if (!isLoading) {
    if (userData?.user !== undefined) {
      return <Navigate to="/" replace />;
    }
    return children;
  }
};

export default LoggedIn;
