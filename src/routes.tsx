import { createBrowserRouter } from "react-router-dom";

import Login from "./paginas/Login";
import Home from "./paginas/Home";
import Produto from "./paginas/Produto";
import CadastroProduto from "./paginas/Produto/cadastroProduto";
import EditarProduto from "./paginas/Produto/editarProduto";
import Cupom from "./paginas/Cupom";
import CadastroCupom from "./paginas/Cupom/cadastroCupom";
import EditarCupom from "./paginas/Cupom/editarCupom";
import Carrinho from "./paginas/Carrinho/carrinho";
import Pedido from "./paginas/Pedido";
import ConfirmarPedido from "./paginas/Pedido/confirmarPedido";

const router = createBrowserRouter([
    {
        path: '/login',
        element: <Login />
    },
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
    {
        path: '/editarcupom/:id',
        element: <EditarCupom />
    },
    {
        path: '/carrinho/',
        element: <Carrinho />
    },
    {
        path: '/confirmarpedido/',
        element: <ConfirmarPedido />
    },
    {
        path: '/pedido/',
        element: <Pedido />
    },
]);

export { router }