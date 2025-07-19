import { ReactElement, useState, useEffect } from "react";

import useProduto from "../../hook/produtoHook";

import Row  from 'react-bootstrap/Row';
import Col  from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form  from 'react-bootstrap/Form';
import Button  from 'react-bootstrap/Button';

import './modal.css';

interface Props {
    id?: number
}

const ModalPedido = ({id}: Props): ReactElement => {

    const { buscarProduto } = useProduto();

    const [nome,setNome] = useState<string>('');
    const [preco,setPreco] = useState<number>(0);
    const [variacoes,setVariacoes] = useState<string>('');
    const [quantidade,setQuantidade] = useState<number>();

    useEffect(() => {        
        async function buscarDados() {
            let response = await buscarProduto(Number(id));

            setNome(response[0].nome);
            setPreco(response[0].preco);
            setVariacoes(response[0].variacoes);            
         }

         if(typeof id !== 'undefined') {
            buscarDados();
         }         
    },[id]);

    const realizarPedido = (id: number) => {
           //onSubmit={realizarPedido}
    } 

    const fecharModal = (e: React.MouseEvent): void => {
        //setQuantidade(null);
        const modal = document.querySelector("#modal");
        modal!.classList.add("d-none");
    };

    return(
        <>
            <div id="modal" className='d-none'>
                <div className="modal">
                    <form className="form">
                        <div className="container-fluid">
                            <Form>
                                <Card>
                                    <Card.Body>
                                        <Form.Group className='mb-4'>
                                            <Row className="mb-4">                                                
                                                <Col xs={10}>
                                                    <Form.Control 
                                                        type='text'                                                         
                                                        value={nome}
                                                        disabled
                                                    ></Form.Control></Col>
                                            </Row>
                                            <Row className="mb-4">                                                
                                                <Col xs={10}>
                                                    <Form.Control 
                                                        type='text'                                                         
                                                        value={preco}
                                                        disabled
                                                    ></Form.Control></Col>
                                            </Row>
                                            <Row className="mb-4">                                                
                                                <Col xs={10}>
                                                    <Form.Control 
                                                        type='text'                                                         
                                                        value={variacoes}
                                                        disabled
                                                    ></Form.Control></Col>
                                            </Row>
                                            <Row>                                                
                                                <Col xs={10}>
                                                    <Form.Control 
                                                        type='text' 
                                                        onChange={(e) => setQuantidade(Number(e.target.value))}
                                                        value={quantidade}
                                                        required
                                                        placeholder="Digite a quantidade"
                                                    ></Form.Control></Col>
                                            </Row>
                                        </Form.Group>
                                        <Form.Group className='mt-4'>
                                            <Button type='submit'>Fazer Pedido</Button>
                                            <div onClick={fecharModal} className="mt-2 text-danger fs-5" style={{cursor: 'pointer'}}>X</div>                    
                                        </Form.Group> 
                                    </Card.Body>
                                </Card>
                            </Form>
                        </div>
                    </form>                    
                </div>                
            </div>
        </>
    )
}

export default ModalPedido; 