import React, { useEffect, useState } from "react";
import { getListProd } from "../../service/apiMethods";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { deleteProd } from "../../service/apiMethods";
import "../../styles/pages/listProd.scss";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  status: string;
  stock_quantity: number;
}

export const ListProd: React.FC = () => {
  const [productList, setProductList] = useState<Product[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "CRUD react | Listagem de produtos";
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getListProd();
        if (Array.isArray(products)) {
          setProductList(products);
        }
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    }

    fetchProducts();
  }, [])

  const statusOptions: { [key: number]: string } = {
    1: "Em estoque",
    2: "Em reposição",
    3: "Em falta"
  }

  const handleEdit = async (product: Product) => {
    navigate(`/updateProd`, { state: { product } });

    const products = await getListProd();
    setProductList(products);
  }

  const handleDelete = (id: number) => {
    Swal.fire({
      title: 'Tem certeza?',
      text: "Voce realmente deseja excluir esse produto?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, excluir!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteProd(id, {});
          setProductList(productList.filter((product) => product.id !== id));
          Swal.fire("Excluído!", "O produto foi excluído.", "success");

        } catch (error) {
          Swal.fire("Erro!", "Não foi possível excluir o produto.", "error");
        }
      }
    })
  }

  const logout = () => {
    localStorage.removeItem('access_token');
    navigate('/');
  }

  return (
    <section className="container sec-list">
      <h1 className="title text-center mb-5">Listagem de Produtos</h1>

      <div className="overflow">
        <table className="table table-striped text-center">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Preço</th>
              <th>Status</th>
              <th>Estoque</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {productList.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>R$ {product.price.toFixed(2)}</td>
                <td className={Number(product.status) === 1 ? "text-success" : Number(product.status) === 2 ? "text-warning" : "text-danger"}>
                  {statusOptions[Number(product.status)]}
                </td>
                <td>{product.stock_quantity}</td>
                <td>
                  {/* Botão de Editar */}
                  <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(product)}>
                    <i className="bi bi-pencil"></i>
                  </button>

                  {/* Botão de Excluir */}
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(product.id)}>
                    <i className="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="contentInput">
          <button className="btn btn-primary" onClick={() => navigate("/createProd")}>
            <i className="bi bi-plus"></i> Adicionar Produto
          </button>
          <button className="btn btn-danger ms-3" onClick={() => logout()}>
            <i className="bi bi-box-arrow-right " onClick={logout}></i> Sair
          </button>
        </div>
      </div>
    </section >
  );
};
