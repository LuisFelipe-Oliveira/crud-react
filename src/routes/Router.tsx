import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import { ListProd } from "../pages/ListProd";
import { CreateProd } from "../pages/CreateProd";
import { UpdateProd } from "../pages/UpdateProd";
import PrivateRoute from "../../src/routes/privateRoutes";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export const Router = () => {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Login />} />

          <Route element={<PrivateRoute />}>
            <Route path="/listProd" element={<ListProd />} />
            <Route path="/createProd" element={<CreateProd />} />
            <Route path="/updateProd" element={<UpdateProd />} />
          </Route>
        </Routes>
      </main>
      <Footer />
    </>
  );
};
