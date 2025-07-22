import { ReactElement, useState, FormEvent, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import CurrencyInput from "react-currency-input-field";

import { atualizar } from "../../redux/produto/slice";

import useProduto from "../../hook/produto/produtoHook";

import Row  from 'react-bootstrap/Row';
import Col  from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form  from 'react-bootstrap/Form';
import Button  from 'react-bootstrap/Button';

import Cabecalho from "../../components/Cabecalho";
import Menu from "../../components/Menu";

const EditarProduto = (): ReactElement => {

    const dispatch = useDispatch();
    const navigate = useNavigate();     

    const { id } = useParams<string>();
    const { buscarProduto } = useProduto();

    const [nome,setNome] = useState<string>('');
    const [preco,setPreco] = useState<string>('');
    const [variacoes,setVariacoes] = useState<string>('');
    const [quantidade,setQuantidade] = useState<number>(0);

    useEffect(() => {

        if(sessionStorage.getItem('token') === null) {            
            navigate('/login');
        } 
        
         async function buscarDados() {
            let response = await buscarProduto(Number(id));

            setNome(response[0].nome);
            setPreco(response[0].preco);
            setVariacoes(response[0].variacoes);
            setQuantidade(response[0].estoques.quantidade)
         }

         buscarDados();
    },[])

    const editarProduto = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        dispatch(atualizar({
            'id': id,
            'nome': nome,
            'preco': preco.replace(',','.'),
            'variacoes': variacoes,
            'quantidade': quantidade
        }));

        setNome('');
        setPreco('');
        setVariacoes('');
        setQuantidade(0);

        navigate('/produto', {replace: true});
        
    }

    return(
        <>
            <Cabecalho />
            <div className='d-flex mt-3'>
                <Menu />
                <div className="container-fluid">
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
                                             <Form.Label>Preço*:</Form.Label>                                             
                                        </Col>
                                        <Col xs={10}>
                                            <CurrencyInput 
                                                name="salario-input"
                                                className='form-control'                                                   
                                                value={preco}
                                                intlConfig={{ locale: 'pt-BR', currency: 'BRL' }} 
                                                onValueChange={(event: any, originalValue, maskedValue) => {                                                                                                               
                                                    setPreco(event);
                                                    }}                                                    
                                                required
                                            />   
                                        </Col>
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

export default EditarProduto; 