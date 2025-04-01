import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

// Função para verificar se o token está no localStorage
const isAuthenticated = (): boolean => {
  const token = localStorage.getItem("access_token");
  return !!token;  // Retorna true se o token existir, caso contrário, false
};

const PrivateRoute: React.FC = () => {
  const location = useLocation();  // Pega a localização atual

  // Verifica se o token está presente e válido
  if (!isAuthenticated()) {
    // Se não tiver token, redireciona para a página de login e mantém o estado da localização
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // Caso tenha token, permite o acesso à rota protegida
  return <Outlet />;
};

export default PrivateRoute;
