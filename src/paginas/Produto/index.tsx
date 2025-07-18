import { ReactElement, useState } from "react";
import Cabecalho from "../../components/Cabecalho";
import Menu from "../../components/Menu";

const Produto = (): ReactElement => {

    const [loading,setLoading] = useState<boolean>(true);

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