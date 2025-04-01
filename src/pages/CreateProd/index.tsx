import { useEffect } from "react";
import { Form } from "../../components/Form";

export const CreateProd = () => {

  useEffect(() => {
    document.title = "CRUD react | Cadastrar Produto";
  })
  
  return (
    <Form title="Cadastrar Produto" buttonForm="Cadastrar"/>
  )
}