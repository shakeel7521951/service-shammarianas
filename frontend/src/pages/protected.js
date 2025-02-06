import { Navigate } from "react-router-dom";
import { useGetUserQuery } from "../features/usersApi";

const AdminRoute = ({ children }) => {
  const { data: userData, isLoading } = useGetUserQuery();
  if (!isLoading) {
    console.log(userData?.user);
    if (!userData?.user || userData?.user?.email !== "admin@gmail.com") {
      return <Navigate to="/" replace />;
    }
    return children;
  }
};

export default AdminRoute;
