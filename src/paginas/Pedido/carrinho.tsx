
import { ReactElement, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import { listarCarrinho } from "../../redux/pedido/slice";

import { IoTrashBinOutline } from "react-icons/io5";

import { RootState } from "../../redux/root-reducer";

import Alert  from 'react-bootstrap/Alert';
import Table from 'react-bootstrap/Table';
import Button  from 'react-bootstrap/Button';

import Cabecalho from "../../components/Cabecalho";
import Menu from "../../components/Menu";

const Carrinho = (): ReactElement => {

    const dispatch = useDispatch();

     const IconeRemover = IoTrashBinOutline as unknown as React.FC<React.SVGProps<SVGSVGElement>>;

    const { loading, pedidos } = useSelector((state: RootState) => state.pedido);

    useEffect(() => {
         dispatch(listarCarrinho());
    },[]);

    const removerProduto = (id: number) => {}

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
                            <Button href='/cadastrocupom' className='me-2 mb-4 float-start'>Confirmar Compra</Button>
                        </div>
                        {
                            loading
                            ?
                                <div className="spinner-border text-primary mt-3" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            :                            
                                pedidos.length === 0
                                ?
                                    <Alert variant='info'>
                                        Não existem dados para exibir
                                    </Alert>
                                :
                                                                   
                                    <Table className="responsive striped bordered hover">
                                        <thead>
                                            <tr>
                                                <th scope='col'>Nome</th>                        
                                                <th scope='col'>Quantidade</th>
                                                <th scope='col'>Valor total</th>                                                
                                                <th scope='col'>Status</th>
                                                <th scope='col'>Data</th>
                                                <th scope='col'></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                pedidos.map((c,i) => 
                                                (
                                                    <tr key={i}>
                                                        <td>{c['nome']}</td>
                                                        <td>{c['quantidade']}</td>
                                                        <td>{c['valor_total']}</td>  
                                                        <td>{c['status']}</td>                                                                                                                    
                                                        <td>{c['data']}</td>   
                                                        <td>
                                                            <button 
                                                                className="btn btn-danger float-start me-1 text-white"
                                                                title='Remover produto'
                                                                onClick={() => removerProduto(c['produto_id'])}>
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

export default Carrinho; 