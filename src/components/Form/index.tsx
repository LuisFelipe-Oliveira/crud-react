import "../../styles/components/form.scss";
import { createProd, updateProd, getListProd } from "../../service/apiMethods";
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
      [name]: ["price", "status", "stock_quantity"].includes(name) ? (value === "" ? 0 : Number(value)) : value,
    }));
  };

  // Função para verificar se o produto com o mesmo nome ja existe
  const checkProductName = async (name: string) => {
    try {
      const products = await getListProd(); // Aqui já vem o array de produtos
  
      console.log(products);

      // Filtra para encontrar se já existe um produto com o mesmo nome
      const existingProduct = products.find((prod: any) => prod.name.toLowerCase() === name.toLowerCase());
  
      return existingProduct || null; // Retorna o produto encontrado ou null se não existir
    } catch (error) {
      console.error("Erro ao verificar o nome do produto:", error);
      return null;
    }
  };
  
  // Função para lidar com o envio do formulário
  const handlerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    let productData = { ...product };
  
    try {
      // Se a quantidade de estoque for negativa, define o status como "Em falta" e a quantidade como 0
      if (productData.stock_quantity < 0) {
        productData.stock_quantity = 0;
        productData.status = 3; 
        Swal.fire({
          icon: 'warning',
          title: 'Ajuste no Estoque',
          text: 'A quantidade de estoque não pode ser negativa. O status foi alterado para "Em falta" e a quantidade para 0.',
        });
      }
  
      // Validação baseada no status
      if (productData.status === 1 && productData.stock_quantity <= 0) {
        Swal.fire({
          icon: 'error',
          title: 'Erro',
          text: 'O produto em estoque deve ter uma quantidade maior que zero.',
        });
        return;
      }
  
      if ((productData.status === 2 || productData.status === 3) && productData.stock_quantity !== 0) {
        Swal.fire({
          icon: 'error',
          title: 'Erro',
          text: `O produto ${productData.status === 2 ? 'em reposição' : 'em falta'} deve ter uma quantidade igual a zero.`,
        });
        return;
      }
  
      // Verificar se já existe um produto com o mesmo nome
      const existingProduct = await checkProductName(productData.name);
  
      if (existingProduct && (!productId || (productId && existingProduct.id !== productId))) {
        Swal.fire({
          icon: 'error',
          title: 'Erro',
          text: 'Já existe um produto com esse nome.',
        });
        return;
      }
  
      // Enviar para a API
      if (productId) {
        await updateProd(productId, productData);
        Swal.fire({
          icon: 'success',
          title: 'Sucesso',
          text: 'Produto atualizado com sucesso!',
        });
        navigate("/listProd", { replace: true });
      } else {
        await createProd(productData);
        Swal.fire({
          icon: 'success',
          title: 'Sucesso',
          text: 'Produto cadastrado com sucesso!',
        });
        navigate("/listProd");
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
          <FormInput type="text" id="name" name="name" value={product.name} onChange={handleChange} nameLabel="Nome" placeholder="Informe o nome do produto" htmlFor="name" required />
          <FormInput type="text" id="description" name="description" value={product.description} onChange={handleChange} placeholder="Informe a descrição do produto"  nameLabel="Descrição" htmlFor="description" required />
          <FormInput type="number" id="price" name="price" value={product.price} onChange={handleChange} nameLabel="Preço" htmlFor="price" required />
          <FormSelect name="status" id="status" value={product.status} onChange={handleChange} htmlFor="status" nameLabel="Status do produto" required />
          <FormInput type="number" id="stock_quantity" name="stock_quantity" value={product.stock_quantity} onChange={handleChange} nameLabel="Qtd em estoque" htmlFor="stock_quantity" required />

          <div className="contentInput mt-4">
            <button type="button" className="btn-submit" onClick={() => navigate("/listProd")}>Voltar</button>
            <button type="submit" className="btn-submit">{buttonForm}</button>
          </div>
        </form>
      </div>
    </section>
  )
}