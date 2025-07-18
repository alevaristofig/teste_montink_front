import { createBrowserRouter } from "react-router-dom";

import Home from "./paginas/Home";
import Produto from "./paginas/Produto";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />
    },
    {
        path: '/produto',
        element: <Produto />
    }
]);

export { router }