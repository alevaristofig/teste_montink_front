import React, { ReactElement, FormEvent } from 'react';

import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

const Cabecalho = (): ReactElement => {

    const logout = () => {}

    return (
        <>
            <Navbar bg='primary' className='menu_superior'>
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