import "../../styles/components/form.scss";
import { createProd, updateProd } from "../../service/apiMethods";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
  existingProduct?: Product
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
      [name]: ["price", "status", "stock_quantity"].includes(name) ? Number(value) : value,
    }));
  };

  //Função para enviar o formulário de cadastro ou update de produto defidinindo de acordo com a existencia do productId
  const handlerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const productData = {
      ...product,
    };

    try {
      if (productId) {
        await updateProd(productId, productData);
        console.log("Produto atualizado com sucesso!");
      } else {
        await createProd(productData);
        console.log("Produto cadastrado com sucesso!");
      }

      navigate("/");
    } catch (error) {
      console.error("Erro ao enviar produto:", error);
    }
  }

  return (
    <section className="container sec-form">
      <div className="boxFormCreate">
        <h2 className="subtitle">
          {title}
        </h2>
        <form onSubmit={handlerSubmit} method="POST" className="formCreate">
          <input type="text" value={product.name || ""} onChange={handleChange} name="name" placeholder="nome" required />
          <input type="text" value={product.description || ""} onChange={handleChange} name="description" placeholder="Descrição" required />
          <input type="number" value={product.price || 0} onChange={handleChange} name="price" placeholder="Preço" required />
          <select name="status" id="status" value={product.status || 0} onChange={handleChange} required>
            <option value="">Selecione um status</option>
            <option value={1}>Em estoque</option>
            <option value={2}>Em reposição</option>
            <option value={3}>Em falta</option>
          </select>
          <input type="number" value={product.stock_quantity || 0} onChange={handleChange} name="stock_quantity" placeholder="Estoque" required />
          <div className="contentInput">
            <button type="button" className="btn-submit" onClick={() => navigate("/")}>Voltar</button>
            <button type="submit" className="btn-submit">{buttonForm}</button>
          </div>
        </form>
      </div>
    </section>
  )
}