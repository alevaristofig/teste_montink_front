import { ReactElement, FormEvent } from 'react';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

const Cabecalho = (): ReactElement => {

    const navigate = useNavigate();

    const logout = () => {
        axios.get(`http://localhost:8000/api/erp_gerenciamento/logout`,{
            headers: {
                        "Authorization": `Bearer ${sessionStorage.getItem('token')}`                  
                     }
            })         
            .then(() => {                                			 
			 sessionStorage.removeItem('token');
			 sessionStorage.removeItem('id');

			 navigate('/login', {replace: true});
          })
          .catch((erro) => {
              toast.error('Ocorreu um erro e a operação não foi realizada');                  
          });
    }

    return (
        <>
            <Navbar bg='primary' className='menu_superior'>
                <div>
                    <ToastContainer />
                </div>
                <Container>
                    <div className='col-7 text-end'><h3 className='text-white'>ERP Gerenciamento</h3></div>
                </Container>
                {
                    sessionStorage.getItem('token') !== null
                    ?
                        <button className="btn btn-light me-2" onClick={() => logout()}>Sair</button>
                    :
                        ''
                }                
            </Navbar>           
        </>
    )
}

export default Cabecalho; 