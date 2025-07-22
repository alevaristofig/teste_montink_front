import { ReactElement, useState, FormEvent, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ToastContainer } from 'react-toastify';

import { atualizar } from "../../redux/cupom/slice";

import useCupom from "../../hook/cupom/cupomHook";

import Row  from 'react-bootstrap/Row';
import Col  from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form  from 'react-bootstrap/Form';
import Button  from 'react-bootstrap/Button';

import Cabecalho from "../../components/Cabecalho";
import Menu from "../../components/Menu";

const EditarCupom = (): ReactElement => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams<string>();
    const { buscarCupom } = useCupom();

    const [nome,setNome] = useState<string>('');
    const [desconto,setDesconto] = useState<number>(0);
    const [validade,setValidade] = useState<string>('');


    useEffect(() => {
        if(sessionStorage.getItem('token') === null) {            
            navigate('/login');
        } 
        
        async function buscarDados() {
            let response = await buscarCupom(Number(id));

            setNome(response.nome);
            setDesconto(response.desconto);
            setValidade(response.validade);            
         }

         buscarDados();
    },[])

    const editarProduto = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        dispatch(atualizar({
            'id': id,
            'nome': nome,
            'desconto': desconto,
            'validade': validade, 
        }));

        setNome('');
        setDesconto(0);
        setValidade('');   

        navigate('/cupom', {replace: true});
        
    }

    return(
        <>
            <Cabecalho />
            <div className='d-flex mt-3'>
                <Menu />
                <div className="container-fluid">
                    <div>
                        <ToastContainer />
                    </div>
                    <Form onSubmit={editarProduto}>
                        <Card>
                            <Card.Body>
                                <Form.Group className='mb-4'>
                                    <Row className="mb-4">
                                        <Col xs={1}>
                                             <Form.Label>Nome*:</Form.Label>                                             
                                        </Col>
                                        <Col xs={10}>
                                            <Form.Control 
                                                type='text' 
                                                onChange={(e) => setNome(e.target.value)}
                                                value={nome}
                                                required
                                            ></Form.Control></Col>
                                    </Row>
                                    <Row className="mb-4">
                                        <Col xs={1}>
                                             <Form.Label>Desconto*:</Form.Label>                                             
                                        </Col>
                                        <Col xs={10}>
                                            <Form.Control 
                                                type='text' 
                                                onChange={(e) => setDesconto(Number(e.target.value))}
                                                value={desconto}
                                                required
                                            ></Form.Control></Col>
                                    </Row>
                                    <Row className="mb-4">
                                        <Col xs={1}>
                                             <Form.Label>Validade*:</Form.Label>                                             
                                        </Col>
                                        <Col xs={10}>
                                            <Form.Control 
                                                type='text' 
                                                onChange={(e) => setValidade(e.target.value)}
                                                value={validade}
                                                required
                                            ></Form.Control></Col>
                                    </Row>
                                </Form.Group>
                                <Form.Group className='mt-4'>
                                    <Button type='submit'>Atualizar</Button>
                                </Form.Group> 
                            </Card.Body>
                        </Card>
                    </Form>
                </div>                
            </div>            
        </>
    )
}

export default EditarCupom; 