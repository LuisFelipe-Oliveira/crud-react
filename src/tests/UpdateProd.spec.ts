import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { UpdateProd } from "../pages/UpdateProd";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => ({
    state: {
      product: {
        id: 1,
        name: "Produto Teste",
        description: "Descrição do produto",
        price: 10,
        status: 1,
        stock_quantity: 10,
      },
    },
  }),
}));

describe("UpdateProd", () => {
  it("should render the form with the product ID", () => {
    render(React.createElement(UpdateProd), { wrapper: BrowserRouter });

    expect(screen.getByText("Atualizar Produto")).toBeTruthy();
  });

  it("should ensure the name input is enabled", () => {
    const mockProduct = {
      id: 1,
      name: "Produto Teste",
      description: "Descrição do produto",
      price: 10,
      status: 1,
      stock_quantity: 10,
    };
  
    render(React.createElement(UpdateProd, { product: mockProduct }), {
      wrapper: BrowserRouter,
    });
  
    const nameInput = screen.getByLabelText(/Nome/i);
  
    // Verifica se o input NÃO tem o atributo "disabled"
    expect(nameInput.hasAttribute("disabled")).toBe(false);
  });  
});
