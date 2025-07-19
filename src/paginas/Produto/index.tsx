import { ReactElement, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import { listar, deletar } from "../../redux/produto/slice";

import { PiNotePencilLight } from "react-icons/pi";
import { IoTrashBinOutline } from "react-icons/io5";

import { RootState } from "../../redux/root-reducer";

import Alert  from 'react-bootstrap/Alert';
import Table from 'react-bootstrap/Table';
import Button  from 'react-bootstrap/Button';

import Cabecalho from "../../components/Cabecalho";
import Menu from "../../components/Menu";

const Produto = (): ReactElement => {

    const dispatch = useDispatch();
    const { loading, produtos } = useSelector((state: RootState) => state.produto);

    const IconeEditar = PiNotePencilLight as unknown as React.FC<React.SVGProps<SVGSVGElement>>;  
    const IconeRemover = IoTrashBinOutline as unknown as React.FC<React.SVGProps<SVGSVGElement>>;

    useEffect(() => {
         dispatch(listar());
    },[]);

    const removerProduto = (id: number) => {
        dispatch(deletar({
            'id': id
        }));

        setTimeout(() => {
            window.location.reload()
        }, 7000);
    } 

    return (
        <>
            <Cabecalho />
            <div className='d-flex mt-3'>
                <Menu />
                <div className="container-fluid">
                        <div>
                            <ToastContainer />
                        </div>
                        <div className='me-2 float-start'>
                            <Button href='/cadastroproduto' className='me-2 mb-4 float-start'>Novo Produto</Button>
                        </div>
                        {
                            loading
                            ?
                                <div className="spinner-border text-primary mt-3" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            :                            
                                produtos.length === 0
                                ?
                                    <Alert variant='info'>
                                        Não existem dados para exibir
                                    </Alert>
                                :
                                                                   
                                    <Table className="responsive striped bordered hover">
                                        <thead>
                                            <tr>
                                                <th scope='col'>Nome</th>                        
                                                <th scope='col'>Preço</th>
                                                <th scope='col'>Variações</th>
                                                <th scope='col'>Quantidade</th>
                                                <th scope='col'>Data</th>
                                                <th scope='col'></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                produtos.map((p,i) => 
                                                (
                                                    <tr key={p['id']}>
                                                        <td>{p['nome']}</td>
                                                        <td>{p['preco']}</td>  
                                                        <td>{p['variacoes']}</td>
                                                        <td>{p['estoques']['quantidade']}</td>        
                                                        <td>{p['created_at']}</td>
                                                        <td>
                                                            <Link to={`/editarproduto/${p['id']}`} 
                                                                className="btn btn-info float-start me-1 text-white"
                                                                title='Editar'>
                                                                <IconeEditar />        
                                                            </Link>
                                                            <button 
                                                                className="btn btn-danger float-start text-white"
                                                                title='Remover'
                                                                onClick={() => removerProduto(p['id'])}>
                                                                <IconeRemover />
                                                            </button>
                                                        </td>                         
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </Table>
                                
                        }
                    
                </div>
            </div>                       
        </>
    )
}

export default Produto; 