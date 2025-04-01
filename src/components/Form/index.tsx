import "../../styles/components/form.scss";
import { createProd, updateProd } from "../../service/apiMethods";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FormInput } from "../FormInput";
import { FormSelect } from "../FormSelect";

//Interface de produtos
interface Product {
  id?: number
  name: string;
  description: string;
  price: number;
  status: number;
  stock_quantity: number;
}

//Interface para receber os dados do formulário
interface FormProps {
  title: string;
  buttonForm: string;
  productId?: number;
  existingProduct?: Product;
}

export const Form: React.FC<FormProps> = ({ title, buttonForm, productId, existingProduct }) => {
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product>({
    name: "",
    description: "",
    price: 0,
    status: 0,
    stock_quantity: 0
  });

  //Atualiza os estados quando o produto existir
  useEffect(() => {
    if (existingProduct) {
      setProduct({
        name: existingProduct.name || "",
        description: existingProduct.description || "",
        price: existingProduct.price || 0,
        status: existingProduct.status || 0,
        stock_quantity: existingProduct.stock_quantity || 0,
      });
    }
  }, [existingProduct]);

  // Função para lidar com as mudanças no formulário
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: ["price", "stock_quantity"].includes(name) ? (value === "" ? 0 : Number(value)) : value,
    }));
  };

  /// Função para enviar o formulário de cadastro ou update de produto de acordo com a existencia do productId
  const handlerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Dados do produto antes de enviar para a API:", product);

    const productData = { ...product };

    try {
      // Validação da quantidade de estoque baseada no status
      if (productData.status === 1 && productData.stock_quantity <= 0) {
        Swal.fire({
          icon: 'error',
          title: 'Erro',
          text: 'O produto em estoque deve ter uma quantidade maior que zero.',
        });
      } else if (productData.status === 2 && productData.stock_quantity !== 0) {
        Swal.fire({
          icon: 'error',
          title: 'Erro',
          text: 'O produto em reposição deve ter uma quantidade igual a zero.',
        });
      } else if (productData.status === 3 && productData.stock_quantity !== 0) {
        Swal.fire({
          icon: 'error',
          title: 'Erro',
          text: 'O produto em falta deve ter uma quantidade igual a zero.',
        });
      } else {
        // Enviar para a API
        if (productId) {
          await updateProd(productId, productData);
          Swal.fire({
            icon: 'success',
            title: 'Sucesso',
            text: 'Produto atualizado com sucesso!',
          });
          navigate("/listProd", {replace: true});
        } else {
          await createProd(productData);
          Swal.fire({
            icon: 'success',
            title: 'Sucesso',
            text: 'Produto cadastrado com sucesso!',
          });
          navigate("/listProd");
        }
      }
    } catch (error) {
      console.error("Erro ao enviar produto:", error);
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'Ocorreu um erro ao tentar cadastrar/atualizar o produto.',
      });
    }
  };

  return (
    <section className="container sec-form">
      <div className="boxFormCreate">
        <h2 className="subtitle text-center mb-3">
          {title}
        </h2>
        <form onSubmit={handlerSubmit} method="POST" className="formCreate">
          <FormInput type="text" name="name" value={product.name} onChange={handleChange} nameLabel="Nome" placeholder="Informe o nome do produto" htmlFor="name" required />
          <FormInput type="text" name="description" value={product.description} onChange={handleChange} placeholder="Informe a descrição do produto"  nameLabel="Descrição" htmlFor="description" required />
          <FormInput type="number" name="price" value={product.price} onChange={handleChange} nameLabel="Preço" htmlFor="price" required />
          <FormSelect name="status" value={product.status} onChange={handleChange} htmlFor="status" nameLabel="Status do produto" required />
          <FormInput type="number" name="stock_quantity" value={product.stock_quantity} onChange={handleChange} nameLabel="Qtd em estoque" htmlFor="stock_quantity" required />

          <div className="contentInput mt-4">
            <button type="button" className="btn-submit" onClick={() => navigate("/listProd")}>Voltar</button>
            <button type="submit" className="btn-submit">{buttonForm}</button>
          </div>
        </form>
      </div>
    </section>
  )
}