
import { ReactElement, useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import { listarCarrinho } from "../../redux/carrinho/slice";

import usePedido from "../../hook/pedido/pedidoHook";

import SubTotalFrete from "../../hook/enum/subtotalFrete";
import Frete from "../../hook/enum/frete";

import { RootState } from "../../redux/root-reducer";

import Table from 'react-bootstrap/Table';
import Button  from 'react-bootstrap/Button';
import Row  from 'react-bootstrap/Row';
import Col  from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form  from 'react-bootstrap/Form';

import Cabecalho from "../../components/Cabecalho";
import Menu from "../../components/Menu";


type TProduto = {
  nome: string;
  quantidade: string; 
  valor_unitario: string; 
  status: string;
  data: string; // ou Date, se for objeto
};

const ConfirmarPedido = (): ReactElement => {

    const dispatch = useDispatch();     

    const { loading, produtos } = useSelector((state: RootState) => state.carrinho);

    const { pesquisarEndereco } = usePedido();

    const [cep,setCep] = useState<string>('');
    const [logradouro,setLogradouro] = useState<string>('');
    const [numero,setNumero] = useState<string>('');
    const [bairro,setBairro] = useState<string>('');
    const [complemento,setComplemento] = useState<string>('');
    const [cidade,setCidade] = useState<string>('');
    const [estado,setEstado] = useState<string>('');
    
    useEffect(() => {
         dispatch(listarCarrinho());
    },[]);

    const formatarData = (data: string) => {
        const dataFormatada = new Date(data);

        const dataExibicao = dataFormatada.toLocaleString("pt-BR");

        return dataExibicao.replace(',','');
    }

    const somarQuantidade = (dados: TProduto[]) => {
        return dados.reduce((total: number, item:TProduto) => total + Number(item.quantidade), 0);
    }

    const somarValores = (dados: TProduto[]) => {
        return dados.reduce((total: number, item:TProduto) => total + Number(item.valor_unitario), 0);
    }

    const calcularFrete = (dados: TProduto[]) => {
        let total = dados.reduce((total: number, item:TProduto) => total + Number(item.valor_unitario), 0);

        if(total >= SubTotalFrete.TOTAL1 && total <= SubTotalFrete.TOTAL2) {
            return Frete.FRETE1;
        } else if(total > SubTotalFrete.TOTAL2 && total <= SubTotalFrete.TOTAL3) {
            return Frete.FRETE2;
        } else {
            return Frete.FRETE3;
        }
    }

    const confirmarPedido = async() => {
        let resp = await pesquisarEndereco(cep);

        setLogradouro(resp.logradouro);
        setBairro(resp.bairro);
        setCidade(resp.localidade);
        setEstado(resp.uf);
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
                                    <>                             
                                        <Table className="responsive striped bordered hover">
                                            <thead>
                                                <tr>
                                                    <th scope='col'>Nome</th>                        
                                                    <th scope='col'>Quantidade</th>
                                                    <th scope='col'>Preço</th>                                                
                                                    <th scope='col'>Status</th>
                                                    <th scope='col'>Data</th>                                                
                                                </tr>                                            
                                            </thead>
                                            <tbody>
                                                {
                                                    produtos.map((c,i) => 
                                                    (
                                                        <tr key={i}>
                                                            <td>{c['nome']}</td>
                                                            <td>{c['quantidade']}</td>
                                                            <td>{c['valor_unitario']}</td>  
                                                            <td>{c['status']}</td>                                                                                                                    
                                                            <td>{formatarData(c['data'])}</td>                                                                                
                                                        </tr>                                                   
                                                    ))
                                                }
                                                <tr className="fw-bold">
                                                    <td>Totais</td>
                                                    <td>{somarQuantidade(produtos)}</td>                                                
                                                    <td>{somarValores(produtos)}</td>
                                                    <td>Frete</td>
                                                    <td>{calcularFrete(produtos)}</td>
                                                </tr>
                                            </tbody>
                                        </Table> 
                                        
                                        <Form onSubmit={confirmarPedido}>
                                            <Card>
                                                <Card.Body>
                                                    <Form.Group className='mb-4'>
                                                        <Row className="mb-4">
                                                            <Col xs={1} className="float-start">
                                                                <Form.Label>CEP*:</Form.Label>                                             
                                                            </Col>
                                                            <Col xs={2} className="float-start me-2">
                                                                <Form.Control 
                                                                    type='text' 
                                                                    onChange={(e) => setCep(e.target.value)}
                                                                    value={cep}
                                                                    required
                                                                >
                                                                </Form.Control>
                                                            </Col>                                                        
                                                            <Col xs={2} className="float-start">
                                                                <Button type='button' onClick={confirmarPedido}>Pesquisar</Button>
                                                            </Col>
                                                        </Row>
                                                        <Row className="mb-4">
                                                            <Col xs={1} className="float-start">
                                                                <Form.Label>Logradouro*:</Form.Label>                                             
                                                            </Col>
                                                            <Col xs={5} className="float-start me-2">
                                                                <Form.Control 
                                                                    type='text' 
                                                                    onChange={(e) => setLogradouro(e.target.value)}
                                                                    value={logradouro}
                                                                    required
                                                                >
                                                                </Form.Control>
                                                            </Col> 
                                                            <Col xs={2} className="float-start">
                                                                <Form.Label>Numero*:</Form.Label>                                             
                                                            </Col> 
                                                            <Col xs={2} className="float-start me-2">
                                                                <Form.Control 
                                                                    type='text' 
                                                                    onChange={(e) => setNumero(e.target.value)}
                                                                    value={numero}
                                                                    required
                                                                >
                                                                </Form.Control>
                                                            </Col>  
                                                        </Row>
                                                        <Row className="mb-4">
                                                            <Col xs={1} className="float-start">
                                                                <Form.Label>Bairro*:</Form.Label>                                             
                                                            </Col>
                                                            <Col xs={5} className="float-start me-2">
                                                                <Form.Control 
                                                                    type='text' 
                                                                    onChange={(e) => setBairro(e.target.value)}
                                                                    value={bairro}
                                                                    required
                                                                >
                                                                </Form.Control>
                                                            </Col> 
                                                            <Col xs={2} className="float-start">
                                                                <Form.Label>Complemento*:</Form.Label>                                             
                                                            </Col> 
                                                            <Col xs={2} className="float-start me-2">
                                                                <Form.Control 
                                                                    type='text' 
                                                                    onChange={(e) => setComplemento(e.target.value)}
                                                                    value={complemento}
                                                                    required
                                                                >
                                                                </Form.Control>
                                                            </Col>  
                                                        </Row>
                                                        <Row className="mb-4">
                                                             <Col xs={1} className="float-start">
                                                                <Form.Label>Cidade*:</Form.Label>                                             
                                                            </Col>
                                                            <Col xs={5} className="float-start me-2">
                                                                <Form.Control 
                                                                    type='text' 
                                                                    onChange={(e) => setCidade(e.target.value)}
                                                                    value={cidade}
                                                                    required
                                                                >
                                                                </Form.Control>
                                                            </Col> 
                                                            <Col xs={2} className="float-start">
                                                                <Form.Label>Estado*:</Form.Label>                                             
                                                            </Col> 
                                                            <Col xs={2} className="float-start me-2">
                                                                <Form.Control 
                                                                    type='text' 
                                                                    onChange={(e) => setEstado(e.target.value)}
                                                                    value={estado}
                                                                    required
                                                                >
                                                                </Form.Control>
                                                            </Col>  
                                                        </Row>
                                                    </Form.Group>
                                                </Card.Body>
                                            </Card>
                                        </Form>
                                    </>
                        }
                    
                </div>
            </div>                       
        </>
    )
}

export default ConfirmarPedido; 