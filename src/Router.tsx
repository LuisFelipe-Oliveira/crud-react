import { Route, Routes } from "react-router-dom";
import { ListProd } from "./pages/ListProd";
import { CreateProd } from "./pages/CreateProd";
import { UpdateProd } from "./pages/UpdateProd";


export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<ListProd />}/>
      <Route path="/createProd" element={<CreateProd />}/>
      <Route path="/updateProd" element={<UpdateProd />}/>
    </Routes>
  )
}