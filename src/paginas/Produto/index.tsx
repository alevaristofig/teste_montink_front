import { ReactElement, useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';

import { listar } from "../../redux/produto/slice";

import Cabecalho from "../../components/Cabecalho";
import Menu from "../../components/Menu";

const Produto = (): ReactElement => {

    const dispatch = useDispatch();
    const { loading } = useSelector((rootReducer) => rootReducer.produto);

    //const [loading,setLoading] = useState<boolean>(true);

    useEffect(() => {
         dispatch(listar());
    })

    return (
        <>
            <Cabecalho />
            <div className='d-flex mt-3'>
                <Menu />
                <div className="container-fluid">
                    {
                        loading
                        ?
                            <div className="spinner-border text-primary mt-3" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        :

                            "ok"
                    }
                </div>
            </div>                       
        </>
    )
}

export default Produto; 