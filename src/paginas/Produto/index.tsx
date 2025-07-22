import { ReactElement, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import { listar, deletar } from "../../redux/produto/slice";
import { removerCarrinho } from "../../redux/carrinho/slice";

import { PiNotePencilLight } from "react-icons/pi";
import { IoTrashBinOutline } from "react-icons/io5";
import { FcAddRow } from "react-icons/fc";

import { RootState } from "../../redux/root-reducer";

import Alert  from 'react-bootstrap/Alert';
import Table from 'react-bootstrap/Table';
import Button  from 'react-bootstrap/Button';

import Cabecalho from "../../components/Cabecalho";
import Menu from "../../components/Menu";
import ModalPedido from "../../components/Modal/modalPedido";

const Produto = (): ReactElement => {

    const dispatch = useDispatch();
    const { loading, produtos } = useSelector((state: RootState) => state.produto);
    const navigate = useNavigate();

    const [id,setId] = useState<number>();

    const IconeEditar = PiNotePencilLight as unknown as React.FC<React.SVGProps<SVGSVGElement>>;  
    const IconeRemover = IoTrashBinOutline as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
    const IconeCarrinho = FcAddRow as unknown as React.FC<React.SVGProps<SVGSVGElement>>;

    useEffect(() => {
        if(sessionStorage.getItem('token') === null) {            
            navigate('/login');
        } 

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

    const mostrarDivPedido = (id: number) => {
        setId(id);
        const modal = document.querySelector("#modal");

        modal!.classList.remove('d-none')     
    }

    const removerCarrinhoDados = () => {
        dispatch(removerCarrinho());
    }

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
                        <div className='me-2 float-start'>
                            <Button href='/cadastroproduto' className='me-2 mb-4 float-start'>Novo Produto</Button>
                        </div>
                        <div className='me-2 float-start'>
                            <Button href='/carrinho' className='btn btn-info me-2 mb-4 float-start text-white'>Ver Carrinho</Button>
                        </div>
                        <div className='me-2 float-start'>
                            <Button onClick={() => removerCarrinhoDados()} className='btn btn-warning me-2 mb-4 float-start text-white'>Esvaziar Carrinho</Button>
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
                                                <th scope='col'>Estoque</th>
                                                <th scope='col'>Data</th>
                                                <th scope='col'></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                produtos.map((p: any,i: number) => 
                                                (
                                                    <tr key={p['id']}>
                                                        <td>{p['nome']}</td>
                                                        <td>{p['preco'].toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</td>  
                                                        <td>{p['variacoes']}</td>
                                                        <td>{p['estoques']['quantidade']}</td>        
                                                        <td>{
                                                             formatarData(p['created_at'])
                                                            }</td>
                                                        <td>
                                                            <Link to={`/editarproduto/${p['id']}`} 
                                                                className="btn btn-info float-start me-1 text-white"
                                                                title='Editar'>
                                                                <IconeEditar />        
                                                            </Link>
                                                            <button 
                                                                className="btn btn-danger float-start me-1 text-white"
                                                                title='Remover'
                                                                onClick={() => removerProduto(p['id'])}>
                                                                <IconeRemover />
                                                            </button>
                                                            <button 
                                                                className="btn btn-success float-start text-white"
                                                                title='Comprar'
                                                                onClick={() => mostrarDivPedido(p['id'])}>
                                                                <IconeCarrinho />
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