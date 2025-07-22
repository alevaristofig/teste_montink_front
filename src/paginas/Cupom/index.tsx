import { ReactElement, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import { listar, deletar } from "../../redux/cupom/slice";

import { PiNotePencilLight } from "react-icons/pi";
import { IoTrashBinOutline } from "react-icons/io5";

import { RootState } from "../../redux/root-reducer";

import Alert  from 'react-bootstrap/Alert';
import Table from 'react-bootstrap/Table';
import Button  from 'react-bootstrap/Button';

import Cabecalho from "../../components/Cabecalho";
import Menu from "../../components/Menu";

const Cupom = (): ReactElement => {

    const dispatch = useDispatch();
    const { loading, cupons } = useSelector((state: RootState) => state.cupom);
    const navigate = useNavigate();

    const IconeEditar = PiNotePencilLight as unknown as React.FC<React.SVGProps<SVGSVGElement>>;  
    const IconeRemover = IoTrashBinOutline as unknown as React.FC<React.SVGProps<SVGSVGElement>>;

    useEffect(() => {
        if(sessionStorage.getItem('token') === null) {            
            navigate('/login');
        } 

        dispatch(listar());
    },[]);

    const removerCupom = (id: number) => {
        dispatch(deletar({
            'id': id
        }));

        setTimeout(() => {
            window.location.reload()
        }, 7000);
    } 

    const formatarData = (data: string) => {
        const dataFormatada = new Date(data);

        const dataExibicao = dataFormatada.toLocaleString("pt-BR");

        return dataExibicao.substring(0,10);
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
                            <Button href='/cadastrocupom' className='me-2 mb-4 float-start'>Novo Cupom</Button>
                        </div>
                        {
                            loading
                            ?
                                <div className="spinner-border text-primary mt-3" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            :                            
                                cupons.length === 0
                                ?
                                    <Alert variant='info'>
                                        Não existem dados para exibir
                                    </Alert>
                                :
                                                                   
                                    <Table className="responsive striped bordered hover">
                                        <thead>
                                            <tr>
                                                <th scope='col'>Nome</th>                        
                                                <th scope='col'>Desconto</th>
                                                <th scope='col'>Validade</th>                                                
                                                <th scope='col'></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                cupons.map((c,i) => 
                                                (
                                                    <tr key={c['id']}>
                                                        <td>{c['nome']}</td>
                                                        <td>{c['desconto']}</td>  
                                                        <td>{formatarData(c['validade'])}</td>                                                                                                                    
                                                        <td>
                                                            <Link to={`/editarcupom/${c['id']}`} 
                                                                className="btn btn-info float-start me-1 text-white"
                                                                title='Editar'>
                                                                <IconeEditar />        
                                                            </Link>
                                                            <button 
                                                                className="btn btn-danger float-start text-white"
                                                                title='Remover'
                                                                onClick={() => removerCupom(c['id'])}>
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

export default Cupom; 