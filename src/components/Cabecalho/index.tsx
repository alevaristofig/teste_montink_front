import React, { ReactElement } from 'react';

import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

export default function CabecalhoComponent (): ReactElement {

    return (
        <>
            <Navbar bg='primary' className='menu_superior'>
                <Container>
                    <div className='col-2'><h3 className='text-white'>ERP Gerenciamento</h3></div>
                </Container>
            </Navbar>
        </>
    )
}