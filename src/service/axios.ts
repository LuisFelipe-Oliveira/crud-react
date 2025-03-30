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

//Adicionando o token em todas as requisições
api.interceptors.request.use(
  (config) => {
    if (config.url?.includes("/login")) {
      return config;
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
    if (error.response && error.response.status === 401) {
      console.log("Token expirado");

      // Exibe um popup avisando que o token expirou
      await Swal.fire({
        title: "Sessão Expirada",
        text: "O seu token de sessão expirou. Você será redirecionado para a página inicial.",
        icon: "warning",
        confirmButtonText: "OK",
      }).then(() => {
        window.location.href = "/";
      });

      // Reutiliza as credenciais para gerar um novo token
      // const savedEmail = localStorage.getItem("email");
      // const savedPassword = localStorage.getItem("password");

      // if (savedEmail && savedPassword) {
      //   try {
      //     // Tenta obter o novo token com as credenciais salvas
      //     const { data } = await api.post("/auth/login", {
      //       email: savedEmail,
      //       password: savedPassword,
      //     });

      //     // Atualiza o token salvo no localStorage
      //     localStorage.setItem("access_token", data.access_token);

      //     // Atualiza o cabeçalho da requisição com o novo token
      //     error.config.headers.Authorization = `Bearer ${data.access_token}`;

      //     // Refaz a requisição original com o novo token
      //     return api.request(error.config);
      //   } catch (refreshError) {
      //     console.error("Erro ao tentar renovar o token:", refreshError);
      //     localStorage.removeItem("access_token"); // Remove token inválido
      //     isRefreshing = false;
      //     // Se não conseguir renovar o token, recarrega a página
      //   }
      // }
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);
