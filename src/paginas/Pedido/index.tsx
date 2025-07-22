import { ReactElement, useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

import { listar } from "../../redux/pedido/slice";
import { atualizarStatus } from "../../redux/pedido/slice";

import { RootState } from "../../redux/root-reducer";

import Table from 'react-bootstrap/Table';
import Form  from 'react-bootstrap/Form';

import Cabecalho from "../../components/Cabecalho";
import Menu from "../../components/Menu";

const Pedido = (): ReactElement => {

    const dispatch = useDispatch();
    const { loading, pedidos } = useSelector((state: RootState) => state.pedido);
    const navigate = useNavigate(); 

    useEffect(() => {
        if(sessionStorage.getItem('token') === null) {            
            navigate('/login');
        } 

        dispatch(listar());
    },[]);

    const formatarData = (data: string) => {
        const dataFormatada = new Date(data);

        const dataExibicao = dataFormatada.toLocaleString("pt-BR");

        return dataExibicao.replace(',','');
    }

    const atualizarStatusDados = async (value: any) => {
        if (window.confirm("Deseja mudar o status do pedido?")) {           
            let dadosStatus = value.split('|');

            dispatch(atualizarStatus({
                'id': dadosStatus[1],
                'status': dadosStatus[0]
            }));

            setTimeout(() => {
                window.location.reload()
            }, 7000);
        }
    }

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
                                                <th scope='col'>Quantidade</th>
                                                <th scope='col'>Valor</th>                                                
                                                <th scope='col'>Data</th>
                                                <th scope='col'>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                pedidos.map((p: any,i: number) => 
                                                (
                                                    <tr key={p['id']}>
                                                        <td>
                                                            {
                                                                (p as any).produtos.map((pn: any, t: number) =>(
                                                                    <>
                                                                        {pn['nome']}&nbsp;                                                                  
                                                                    </>
                                                                ))                                                            
                                                            }
                                                        </td> 
                                                        <td>{p['quantidade']}</td>
                                                        <td>{p['valor_total'].toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</td> 
                                                        <td>{formatarData(p['created_at'])}</td>  
                                                        <td>
                                                            <Form.Select
                                                                onChange={(e) => atualizarStatusDados(e.target.value)}
                                                            >
                                                                <option value={`Pendente|${p['id']}`} selected={p['status'] === 'Pendente'}>Pendente</option>
                                                                <option value={`Enviado|${p['id']}`} selected={p['status'] === 'Enviado'}>Enviado</option>
                                                                <option value={`Cancelado|${p['id']}`} selected={p['status'] === 'Cancelado'}>Cancelado</option>
                                                                <option value={`Concluído|${p['id']}`} selected={p['status'] === 'Concluído'}>Concluído</option>                                                                    
                                                            </Form.Select>
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