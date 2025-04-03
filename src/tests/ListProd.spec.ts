import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ListProd } from '../pages/ListProd';
import { getListProd, deleteProd  } from "../service/apiMethods";
import Swal from "sweetalert2";

jest.mock("../service/apiMethods", () => ({
  getListProd: jest.fn(() => 
    Promise.resolve([
      { id: 1, name: "Produto 1", description: "Desc 1", price: 10, status: "1", stock_quantity: 5 },
      { id: 2, name: "Produto 2", description: "Desc 2", price: 20, status: "2", stock_quantity: 8 },
    ])
  ),
  deleteProd: jest.fn(() => Promise.resolve()),
}));

jest.spyOn(Swal, "fire").mockResolvedValue({
  isConfirmed: true,
  isDenied: false,
  isDismissed: false,
  value: undefined,
});

describe("ListProd", () => {
  it("should render the list of products", () => {
    render(React.createElement(ListProd), { wrapper: BrowserRouter });

    //Verifica se a tabela de produtos está aparecendo na tela
    expect(screen.getByText("Nome")).toBeTruthy();
    expect(screen.getByText("Descrição")).toBeTruthy();
    expect(screen.getByText("Preço")).toBeTruthy();
    expect(screen.getByText("Status")).toBeTruthy();
    expect(screen.getByText("Estoque")).toBeTruthy();
    expect(screen.getByText("Ações")).toBeTruthy();
  });
  
  it("should call getListProd when component mounts", async () => {
    render(React.createElement(ListProd), { wrapper: BrowserRouter });
  
    await waitFor(() => {
      expect(getListProd).toHaveBeenCalledTimes(2);
    });
  });

  it("should render the products correctly", async () => {
    render(React.createElement(ListProd), { wrapper: BrowserRouter });

    expect(await screen.findByText("Produto 1")).toBeTruthy();
    expect(await screen.findByText("Produto 2")).toBeTruthy();
  });

  it("must delete a product when clicking the delete button", async () => {
    render(React.createElement(ListProd), { wrapper: BrowserRouter });

    await screen.findByText("Produto 1");

    fireEvent.click(screen.getAllByRole('button', { name: /excluir/i })[0]);

    await waitFor(() => expect(deleteProd).toHaveBeenCalledWith(1, {}));

    await waitFor(() => expect(screen.queryByText("Produto 1")).not.toBeTruthy());
  });
})