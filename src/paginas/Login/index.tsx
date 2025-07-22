import { ReactElement, useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";

import Row  from 'react-bootstrap/Row';
import Col  from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form  from 'react-bootstrap/Form';
import Button  from 'react-bootstrap/Button';

import Cabecalho from "../../components/Cabecalho";

const Login = (): ReactElement => {

    const navigate = useNavigate();

    const [email,setEmail] = useState<string>('');
    const [password,setPassword] = useState<string>('');

    const logar = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let dados = {
			'email': email,
			'password': password
		}

        axios.post(`http://localhost:8000/api/erp_gerenciamento/autenticacao`,dados)		
          .then((response) => {                                			 
			 sessionStorage.setItem('token',response.data.token);
			 sessionStorage.setItem('id',response.data.id);

			 navigate('/produto', {replace: true});
          })
          .catch((error) => {
              toast.error('Email/Senha incorretos');  
			  console.log(error)           
          }); 
    }

    return(
        <>
            <Cabecalho />
            <div className='d-flex mt-3'>                
                <div className="container-fluid">
                    <div>
                        <ToastContainer />
                    </div>
                    <Form onSubmit={logar}>
                        <Card>
                            <Card.Body>
                                <Form.Group className='mb-4'>
                                    <Row className="mb-4">
                                        <Col xs={1}>
                                             <Form.Label>Email*:</Form.Label>                                             
                                        </Col>
                                        <Col xs={10}>
                                            <Form.Control 
                                                type='text' 
                                                onChange={(e) => setEmail(e.target.value)}
                                                value={email}
                                                required
                                            >
                                            </Form.Control>
                                        </Col>
                                    </Row>
                                    <Row className="mb-4">
                                        <Col xs={1}>
                                             <Form.Label>Senha*:</Form.Label>                                             
                                        </Col>
                                        <Col xs={10}>
                                            <Form.Control 
                                                type='password' 
                                                onChange={(e) => setPassword(e.target.value)}
                                                value={password}
                                                required
                                            ></Form.Control></Col>
                                    </Row>
                                </Form.Group>
                                <Form.Group className='mt-4'>
                                    <Button type='submit'>Logar</Button>
                                </Form.Group> 
                            </Card.Body>
                        </Card>
                    </Form>
                </div>                
            </div>            
        </>
    )
}

export default Login; 