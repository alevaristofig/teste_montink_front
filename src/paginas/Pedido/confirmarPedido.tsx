
import { ReactElement, useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';

import { listarCarrinho } from "../../redux/carrinho/slice";
import { listar } from "../../redux/cupom/slice";

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
    const { cupons } = useSelector((state: RootState) => state.cupom);

    const { pesquisarEndereco } = usePedido();

    const [cep,setCep] = useState<string>('');
    const [logradouro,setLogradouro] = useState<string>('');
    const [numero,setNumero] = useState<string>('');
    const [bairro,setBairro] = useState<string>('');
    const [complemento,setComplemento] = useState<string>('');
    const [cidade,setCidade] = useState<string>('');
    const [estado,setEstado] = useState<string>('');
    const [valorTotal,setValortotal] = useState<number>();
    
    useEffect(() => {
         dispatch(listarCarrinho());
         dispatch(listar());
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
        let total = dados.reduce((total: number, item:TProduto) => total + Number(item.valor_unitario) * Number(item.quantidade), 0);

       // setValortotal(total);

        return total;
    }

    const calcularFrete = (dados: TProduto[]) => {
        let total = dados.reduce((total: number, item:TProduto) => total + Number(item.valor_unitario) * Number(item.quantidade), 0);

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

    const validarCupom = (i: any) => {
        let indice = cupons.findIndex((c: any) => c.id == i);
        let dataAtual = new Date().getTime();
        let dataValidade = new Date(cupons[indice]['validade']).getTime();

        if(dataValidade <= dataAtual) {
            let divTotal = document.getElementById("divTotal");
            //let total = divTotal?.innerHTML; 

            /*if (divTotal) {
                divTotal.innerHTML = `${valorTotal}`;
            }*/

            toast.info("Desconto não aplicado, cupom expirado");
        } else {
            let divTotal = document.getElementById("divTotal");
            let total = Number(divTotal?.innerHTML);            
            let porcentagem = cupons[indice]['desconto'] / 100;
            let desconto = (total * porcentagem);
            let totalDesconto = total - desconto;

           if (divTotal) {
                divTotal.innerHTML = `${total} - ${desconto} = ${totalDesconto}`;
           }

           toast.success(`Desconto de ${cupons[indice]['desconto']}% aplicado com sucesso!`);
        }        
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
                                            <Card className='mt-4'>
                                                <Card.Body>                                                    
                                                    <Form.Group>
                                                        <Row className="fw-bold">
                                                            <Col xs={2} className="float-start">
                                                                <Form.Label>Total de Produtos:</Form.Label>                                             
                                                            </Col> 
                                                            <Col id="divQuantidade" xs={1} className="float-start">
                                                                {somarQuantidade(produtos)}
                                                            </Col>
                                                            <Col xs={2} className="float-start">
                                                                <Form.Label>Valor Total:</Form.Label>                                             
                                                            </Col> 
                                                            <Col id="divTotal" xs={1} className="float-start">
                                                                {somarValores(produtos)}
                                                            </Col>
                                                            <Col xs={1} className="float-start">
                                                                <Form.Label>Frete:</Form.Label>                                             
                                                            </Col> 
                                                            <Col id="divFrete" xs={1} className="float-start">
                                                                {calcularFrete(produtos)}
                                                            </Col>
                                                            <Col xs={1} className="float-start">
                                                                <Form.Label>Cupom:</Form.Label>                                             
                                                            </Col> 
                                                            <Col xs={2} className="me-2">
                                                                <Form.Select
                                                                    onChange={(e) => validarCupom(e.target.value)}
                                                                >
                                                                    <option>Cupom</option>
                                                                    {
                                                                         cupons.map((c,i) => (
                                                                            <option key={c['id']} value={c['id']}>{c['nome']}</option>
                                                                         ))
                                                                    }
                                                                </Form.Select>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Form.Group className='mt-4'>
                                                                <Button type='submit'>Confirmar</Button>
                                                            </Form.Group>
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