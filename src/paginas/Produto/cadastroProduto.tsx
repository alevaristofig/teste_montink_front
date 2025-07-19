import { ReactElement, useState, FormEvent } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer } from 'react-toastify';

import { salvar } from "../../redux/produto/slice";

import Row  from 'react-bootstrap/Row';
import Col  from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form  from 'react-bootstrap/Form';
import Button  from 'react-bootstrap/Button';

import Cabecalho from "../../components/Cabecalho";
import Menu from "../../components/Menu";

const CadastroProduto = (): ReactElement => {

    const dispatch = useDispatch();

    const [nome,setNome] = useState<string>('');
    const [preco,setPreco] = useState<number>(0);
    const [variacoes,setVariacoes] = useState<string>('');
    const [quantidade,setQuantidade] = useState<number>(0);

    const salvarProduto = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let dados = {
            'nome': nome,
            'preco': preco,
            'variacoes': variacoes,
            'estoque': {
                'quantidade': quantidade
            }
        };

        dispatch(salvar(dados));

        setNome('');
        setPreco(0);
        setVariacoes('');
        setQuantidade(0);
        
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
                    <Form onSubmit={salvarProduto}>
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
                                             <Form.Label>Preço*:</Form.Label>                                             
                                        </Col>
                                        <Col xs={10}>
                                            <Form.Control 
                                                type='text' 
                                                onChange={(e) => setPreco(Number(e.target.value))}
                                                value={preco}
                                                required
                                            ></Form.Control></Col>
                                    </Row>
                                    <Row className="mb-4">
                                        <Col xs={1}>
                                             <Form.Label>Variações*:</Form.Label>                                             
                                        </Col>
                                        <Col xs={10}>
                                            <Form.Control 
                                                type='text' 
                                                onChange={(e) => setVariacoes(e.target.value)}
                                                value={variacoes}
                                                required
                                            ></Form.Control></Col>
                                    </Row>
                                    <Row>
                                        <Col xs={1}>
                                             <Form.Label>Quantidade*:</Form.Label>                                             
                                        </Col>
                                        <Col xs={10}>
                                            <Form.Control 
                                                type='text' 
                                                onChange={(e) => setQuantidade(Number(e.target.value))}
                                                value={quantidade}
                                                required
                                            ></Form.Control></Col>
                                    </Row>
                                </Form.Group>
                                <Form.Group className='mt-4'>
                                    <Button type='submit'>Salvar</Button>
                                </Form.Group> 
                            </Card.Body>
                        </Card>
                    </Form>
                </div>                
            </div>            
        </>
    )
}

export default CadastroProduto; 