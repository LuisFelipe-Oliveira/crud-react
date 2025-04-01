import axios from "axios";
import Swal from "sweetalert2";

// Iniciando axios
export const api = axios.create({
  baseURL: "http://34.71.240.100/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Pegar o token do localStorage
const getToken = () => localStorage.getItem("access_token");

// Adicionando o token em todas as requisições
api.interceptors.request.use(
  (config) => {
    if (config.url?.includes("/login")) {
      return config; // Não adiciona token nas requisições de login
    }
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response) {
      // Se o status for 401 (token expirado ou inválido)
      if (error.response.status === 401) {
        console.log("Token inválido");

        // Exibe um popup avisando que o token expirou
        await Swal.fire({
          title: "Sessão Encerrada",
          text: "Não conseguimos identificar sua sessão. Por favor, faca login novamente.",
          icon: "error",
          confirmButtonText: "OK",
        }).then(() => {
          // Redireciona para a tela de login
          window.location.href = "/";
        });
        return Promise.reject(error);
      }
    }

    // Qualquer outro erro
    return Promise.reject(error);
  }
);
