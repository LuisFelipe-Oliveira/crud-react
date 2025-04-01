import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../service/apiMethods";  // Importe o serviço de login
import Swal from "sweetalert2";
import { FormInput } from "../../components/FormInput"; // Reutilizando o FormInput

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "CRUD react | Login";
  }, []);

  // Função para lidar com as mudanças nos inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validação simples
    if (!formData.email || !formData.password) {
      Swal.fire({
        icon: "error",
        title: "Erro",
        text: "Por favor, preencha todos os campos.",
      });
      return;
    }

    try {
      // Chama o serviço de login com o email e senha
      const response = await login(formData.email, formData.password);  // Não precisamos usar o response aqui

      localStorage.setItem('access_token', response.access_token);

      navigate("/listProd");

    } catch (error) {
      console.error("Erro ao tentar fazer login:", error);
      Swal.fire({
        icon: "error",
        title: "Erro",
        text: "Falha no login. Tente novamente.",
      });
    }
  };

  return (
    <section className="container sec-form">
      <div className="boxFormCreate">
        <h2 className="subtitle text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit} className="formCreate">
          <FormInput
            type="text"
            name="email"
            value={formData.email}
            htmlFor="email"
            nameLabel="E-mail"
            onChange={handleChange}
            placeholder="Digite seu e-mail"
            required
          />
          <FormInput
            type="password"
            name="password"
            value={formData.password}
            htmlFor="password"
            nameLabel="Senha"
            onChange={handleChange}
            placeholder="Digite sua senha"
            required
          />
          <div className="contentInput mt-4">
            <button type="submit" className="btn-submit">
              Entrar
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
