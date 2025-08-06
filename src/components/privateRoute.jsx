import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { useEffect } from "react";

export const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const navigate = useNavigate();
  
    useEffect(() => {
      if (!loading && !user) {
        navigate('/', { replace: true });
      }
    }, [user, loading, navigate]);
  
    if (loading) {
      return <div>Carregando...</div>;
    }
  
    return user ? children : null;
  };