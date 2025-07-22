
import { ReactElement, useState, useEffect, FormEvent } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import {  toast } from 'react-toastify';

import { listarCarrinho, removerCarrinho } from "../../redux/carrinho/slice";
import { listar } from "../../redux/cupom/slice";
import { confirmar } from "../../redux/pedido/slice";

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
  data: string;
};

const ConfirmarPedido = (): ReactElement => {

    const dispatch = useDispatch();     

    const { loading, produtos } = useSelector((state: RootState) => state.carrinho);
    const { cupons } = useSelector((state: RootState) => state.cupom);

    const navigate = useNavigate();
    const { pesquisarEndereco } = usePedido();

    const [cep,setCep] = useState<string>('');
    const [logradouro,setLogradouro] = useState<string>('');
    const [numero,setNumero] = useState<string>('');
    const [bairro,setBairro] = useState<string>('');
    const [complemento,setComplemento] = useState<string>('');
    const [cidade,setCidade] = useState<string>('');
    const [estado,setEstado] = useState<string>('');
    const [desconto,setDesconto] = useState<number>();
    
    useEffect(() => {
        if(sessionStorage.getItem('token') === null) {            
            navigate('/login');
        } 

        dispatch(listarCarrinho());
        dispatch(listar());
    },[]);

    const confirmarPedido = async(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let endereco = `${logradouro} ${numero} ${bairro} ${complemento} ${cidade} ${estado}`;
        let produtoInsert = '';
        let produtosComprados = new Array();

        for(let p in produtos) {
            produtosComprados[p] = produtos[p]['produto_id'];
        }

        produtoInsert = JSON.stringify(produtosComprados);
        let divTotal = document.getElementById("divTotal");
        let subTotalAux = divTotal?.innerHTML.replace('R$&nbsp;','');          
        subTotalAux = subTotalAux?.substring(subTotalAux.indexOf(" = "),subTotalAux.length);
        subTotalAux = subTotalAux?.replace('R$&nbsp;','').replace('=','');        
        let subTotal = Number(subTotalAux?.replace(".", "").replace(",", "."));

        let divQuantidade = document.getElementById("divQuantidade");
        let quantidade = Number(divQuantidade?.innerHTML);

        let divFrete = document.getElementById("divFrete");
        let freteAux = divFrete?.innerHTML;
        let frete = 0;

        if(freteAux !== Frete.FRETE3) {
            frete = Number(freteAux);
        }

        let dados = {
            'id_usuario': sessionStorage.getItem('id'),
            'produtos': produtoInsert,
            'valor_total': subTotal,
            'quantidade': quantidade,
            'valor_frete': frete,
            'desconto': desconto,
            'endereco': endereco,
            'status': 'Pendente'
        }

        dispatch(confirmar(dados));

        navigate('/pedido', {replace: true});
        
    }

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

        return total.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
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

    const pesquisarEnderco = async() => {
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

            if (divTotal) {
                let valor = somarValores(produtos).toString();
                
                divTotal.innerHTML = valor;
            }

            setDesconto(0);

            toast.info("Desconto não aplicado, cupom expirado");
        } else {
            let divTotal = document.getElementById("divTotal");            
            let valorAux = divTotal?.innerHTML.replace('R$&nbsp;','').replace(".", "").replace(",", ".");                                  
            let total = Number(valorAux);     
            let porcentagem = cupons[indice]['desconto'] / 100;
            let desconto = (total * porcentagem);
            let totalDesconto = total - desconto;

           if (divTotal) {
                divTotal.innerHTML = `${total.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})} 
                    - ${desconto.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})} 
                    = ${totalDesconto.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}`;
           }

           setDesconto(cupons[indice]['desconto']);

           toast.success(`Desconto de ${cupons[indice]['desconto']}% aplicado com sucesso!`);
        }        
    }
    

    return (
        <>
            <Cabecalho />
            <div className='d-flex mt-3'>
                <Menu />
                <div className="container-fluid">                       
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
                                                    produtos.map((c: any,i: number) => 
                                                    (
                                                        <tr key={i}>
                                                            <td>{c['nome']}</td>
                                                            <td>{c['quantidade']}</td>
                                                            <td>{c['valor_unitario'].toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</td>  
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
                                                                <Button type='button' onClick={pesquisarEnderco}>Pesquisar</Button>
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
                                                                {calcularFrete(produtos).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}
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