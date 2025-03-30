import React, { useEffect } from 'react';
import { Router } from "./Router";
import { BrowserRouter } from 'react-router-dom';
import { login } from './service/apiMethods';

const loginAutomatically = async () => {
  const email = "luis.felipeoliveirafrancisco@gmail.com";
  const password = "6HR223sy";

  try {
    await login(email, password);
    console.log("Login realizado com sucesso!")
  } catch (error) {
    console.error("Error ao tentar fazer login:", error);
  }
};

function App() {
  useEffect(() => {
    loginAutomatically();
  }, []);

  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}

export default App;
