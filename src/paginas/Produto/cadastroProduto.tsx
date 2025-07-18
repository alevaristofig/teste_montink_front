import { ReactElement, useState, FormEvent } from "react";

import Cabecalho from "../../components/Cabecalho";
import Menu from "../../components/Menu";


import Row  from 'react-bootstrap/Row';
import Col  from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form  from 'react-bootstrap/Form';
import Button  from 'react-bootstrap/Button';

const CadastroProduto = (): ReactElement => {

    const [nome,setNome] = useState<string>('');
    const [preco,setPreco] = useState<number>();
    const [variacoes,setVariacoes] = useState<string>('');

    const salvar = (e: FormEvent<HTMLFormElement>) => {
         e.preventDefault();
        console.log(nome,preco,variacoes);
    }

    return(
        <>
            <Cabecalho />
            <div className='d-flex mt-3'>
                <Menu />
                <div className="container-fluid">
                    <Form onSubmit={salvar}>
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
                                    <Row>
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