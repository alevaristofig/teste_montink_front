import { ReactElement, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import { listar } from "../../redux/pedido/slice";

import { RootState } from "../../redux/root-reducer";

import Alert  from 'react-bootstrap/Alert';
import Table from 'react-bootstrap/Table';
import Button  from 'react-bootstrap/Button';

import Cabecalho from "../../components/Cabecalho";
import Menu from "../../components/Menu";
import ModalPedido from "../../components/Modal/modalPedido";

const Pedido = (): ReactElement => {

    const dispatch = useDispatch();
    const { loading, pedidos } = useSelector((state: RootState) => state.pedido);

    const [id,setId] = useState<number>();

    useEffect(() => {
         dispatch(listar());
    },[]);

    const formatarData = (data: string) => {
        const dataFormatada = new Date(data);

        const dataExibicao = dataFormatada.toLocaleString("pt-BR");

        return dataExibicao.substring(0,10);
    }

    return (
        <>
            <ModalPedido id={id}/>
            <Cabecalho />
            <div className='d-flex mt-3'>
                <Menu />
                <div className="container-fluid">
                        <div>
                            <ToastContainer />
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
                                    <div className='me-2 float-start w-100'>
                                        Não existem dados para exibir
                                    </div>
                                :
                                                                   
                                    <Table className="responsive striped bordered hover">
                                        <thead>
                                            <tr>
                                                <th scope='col'>Nome</th>                        
                                                <th scope='col'>Preço</th>
                                                <th scope='col'>Variações</th>
                                                <th scope='col'>Estoque</th>
                                                <th scope='col'>Data</th>
                                                <th scope='col'></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                pedidos.map((p: any,i: number) => 
                                                (
                                                    <tr key={p['id']}>
                                                        <td>{p['nome']}</td>
                                                        <td>{p['preco']}</td>  
                                                        <td>{p['variacoes']}</td>
                                                        <td>{p['estoques']['quantidade']}</td>        
                                                        <td>{
                                                             formatarData(p['created_at'])
                                                            }
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

export default Pedido; 