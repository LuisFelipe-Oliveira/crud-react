import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Login from "../pages/Login";
import { BrowserRouter } from "react-router-dom";
import { login } from "../service/apiMethods";

jest.mock("../service/apiMethods", () => ({
  login: jest.fn(),
}));

describe("Login", () => {
  it("Should render email and password inputs", () => {
    render(React.createElement(Login), { wrapper: BrowserRouter });

    //Verifica se os inputs foram renderizados
    expect(screen.getByPlaceholderText("Digite seu e-mail")).toBeTruthy();
    expect(screen.getByPlaceholderText("Digite sua senha")).toBeTruthy();
  });

  it("should call API on form submit", async () => {
    (login as jest.Mock).mockResolvedValueOnce({ access_token: "fake-token" });

    render(React.createElement(Login), { wrapper: BrowserRouter });

    //Preenche os inputs
    fireEvent.change(screen.getByPlaceholderText("Digite seu e-mail"), {
      target: { value: "teste@email.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Digite sua senha"), {
      target: { value: "12345678" },
    });

    // Clica no botão de login
    fireEvent.click(screen.getByRole("button", { name: "Entrar" }));

    //Verifica se a API foi chamada corretamente
    await waitFor(() => {
      expect(login).toHaveBeenCalledTimes(1);
    });
    expect(login).toHaveBeenCalledWith("teste@email.com", "12345678");
  });
});
