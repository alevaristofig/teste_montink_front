import { ReactElement, useState, useEffect } from "react";

import './modal.css';

const ModalPedido = (): ReactElement => {
    return(
        <>
            <div id="modal" className='d-none'>
                <div className="modal">
                    <h1>Modal Pedido</h1>
                </div>                
            </div>
        </>
    )
}

export default ModalPedido; 