import { useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { Form } from "../../components/Form";

export const UpdateProd = () => {
  // Pega o estado passado pela navegação
  const location = useLocation();
  const product = location.state?.product;

  useEffect(() => {
    document.title = "CRUD react | Atualizar produto";
  }, [])

  return (
    <Form
      title="Atualizar Produto"
      buttonForm="Atualizar"
      productId={product.id}
      existingProduct={product}
    />
  );
};
