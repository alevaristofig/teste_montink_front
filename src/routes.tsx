import { createBrowserRouter } from "react-router-dom";

import Home from "./paginas/Home";
import Produto from "./paginas/Produto";
import CadastroProduto from "./paginas/Produto/cadastroProduto";

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
    }
]);

export { router }