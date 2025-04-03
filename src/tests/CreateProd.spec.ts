import React from "react";
import Swal from "sweetalert2";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { CreateProd } from "../pages/CreateProd";
import { createProd, getListProd } from "../service/apiMethods";

jest.mock("../service/apiMethods", () => ({
  createProd: jest.fn(),
  getListProd: jest.fn(() => Promise.resolve([])),
}));

jest.mock("sweetalert2", () => ({
  fire: jest.fn(),
}));

describe("CreateProd", () => {
  it("shoul render form fields", () => {
    render(React.createElement(CreateProd), { wrapper: BrowserRouter });

    //Verifica se os inputs estão sendo renderizados
    expect(
      screen.getByPlaceholderText("Informe o nome do produto")
    ).toBeTruthy();
    expect(
      screen.getByPlaceholderText("Informe a descrição do produto")
    ).toBeTruthy();
    expect(screen.getByLabelText(/Preço/i)).toBeTruthy();
    expect(screen.getByLabelText(/Status do produto/i)).toBeTruthy();
    expect(screen.getByLabelText(/Qtd em estoque/i)).toBeTruthy();
  });

  it("shoul call API when form is submitted", async () => {
    render(React.createElement(CreateProd), { wrapper: BrowserRouter });

    //Preenche os inputs
    fireEvent.change(screen.getByPlaceholderText("Informe o nome do produto"), {
      target: { value: "Teste" },
    });
    fireEvent.change(
      screen.getByPlaceholderText("Informe a descrição do produto"),
      { target: { value: "descrição teste" } }
    );
    fireEvent.change(screen.getByLabelText(/Preço/i), {
      target: { value: 10 },
    });
    fireEvent.change(screen.getByLabelText(/Status do produto/i), {
      target: { value: 1 },
    });
    fireEvent.change(screen.getByLabelText(/Qtd em estoque/i), {
      target: { value: 10 },
    });

    //Clica no botão
    fireEvent.click(screen.getByRole("button", { name: "Cadastrar" }));

    await waitFor(() => {
      //Verifica se a função foi chamada com os dados corretos
      expect(createProd).toHaveBeenCalledWith({
        name: "Teste",
        description: "descrição teste",
        price: 10,
        status: 1,
        stock_quantity: 10,
      });
    });

    await waitFor(() => {
      expect(Swal.fire).toHaveBeenCalledWith({
        icon: "success",
        title: "Sucesso",
        text: "Produto cadastrado com sucesso!",
      });
    });
  });

  it("Should show error message when API fails", async () => {
    (createProd as jest.Mock).mockRejectedValueOnce(
      new Error("Erro ao cadastrar produto.")
    );

    render(React.createElement(CreateProd), { wrapper: BrowserRouter });

    //Preenche os inputs
    fireEvent.change(screen.getByPlaceholderText("Informe o nome do produto"), {
      target: { value: "Segundo teste" },
    });
    fireEvent.change(
      screen.getByPlaceholderText("Informe a descrição do produto"),
      { target: { value: "descrição do segundo teste" } }
    );
    fireEvent.change(screen.getByLabelText(/Preço/i), {
      target: { value: 10 },
    });
    fireEvent.change(screen.getByLabelText(/Status do produto/i), {
      target: { value: 1 },
    });
    fireEvent.change(screen.getByLabelText(/Qtd em estoque/i), {
      target: { value: 0 },
    });

    fireEvent.click(screen.getByRole("button", { name: "Cadastrar" }));

    await waitFor(() => {
      expect(Swal.fire).toHaveBeenCalledWith({
        icon: "error",
        title: "Erro",
        text: "O produto em estoque deve ter uma quantidade maior que zero.",
      });
    });
  });
});
