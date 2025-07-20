
import { ReactElement, useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import { retirarItem, listarCarrinho } from "../../redux/carrinho/slice";

import { IoTrashBinOutline } from "react-icons/io5";

import { RootState } from "../../redux/root-reducer";

import Table from 'react-bootstrap/Table';
import Button  from 'react-bootstrap/Button';

import Cabecalho from "../../components/Cabecalho";
import Menu from "../../components/Menu";

const Carrinho = (): ReactElement => {

    const dispatch = useDispatch();

     const IconeRemover = IoTrashBinOutline as unknown as React.FC<React.SVGProps<SVGSVGElement>>;

    const { loading, produtos } = useSelector((state: RootState) => state.carrinho);

    useEffect(() => {
         dispatch(listarCarrinho());
    },[]);

    const removerProduto = (produto_id: number, data: string, nome: string) => {
        let dados = {
            "produto_id": produto_id,
            "nome": nome,
            "data": data
        } 
        
        dispatch(retirarItem(dados));

        setTimeout(() => {
            window.location.reload()
        }, 7000);
    }

    const formatarData = (data: string) => {
        const dataFormatada = new Date(data);

        const dataExibicao = dataFormatada.toLocaleString("pt-BR");

        return dataExibicao.replace(',','');
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
                            <Button href='/cadastrocupom' className='me-2 mb-4 float-start'>Confirmar Compra</Button>
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
                                    <div className='me-2 float-start w-100'>
                                        Não existem dados para exibir
                                    </div>
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
                                                produtos.map((c,i) => 
                                                (
                                                    <tr key={i}>
                                                        <td>{c['nome']}</td>
                                                        <td>{c['quantidade']}</td>
                                                        <td>{c['valor_total']}</td>  
                                                        <td>{c['status']}</td>                                                                                                                    
                                                        <td>{formatarData(c['data'])}</td>   
                                                        <td>
                                                            <button 
                                                                className="btn btn-danger float-start me-1 text-white"
                                                                title='Remover produto'
                                                                onClick={() => removerProduto(c['produto_id'],c['data'],c['nome'])}>
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