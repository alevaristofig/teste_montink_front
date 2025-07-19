import { createBrowserRouter } from "react-router-dom";

import Home from "./paginas/Home";
import Produto from "./paginas/Produto";
import CadastroProduto from "./paginas/Produto/cadastroProduto";
import EditarProduto from "./paginas/Produto/editarProduto";
import Cupom from "./paginas/Cupom";
import CadastroCupom from "./paginas/Cupom/CadastroCupom";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />
    },
    {
        path: '/produto',
        element: <Produto />
    },
    {
        path: '/cadastroproduto',
        element: <CadastroProduto />
    },
    {
        path: '/editarproduto/:id',
        element: <EditarProduto />
    },
    {
        path: '/cupom',
        element: <Cupom />
    },
     {
        path: '/cadastrocupom',
        element: <CadastroCupom />
    },
]);

export { router }