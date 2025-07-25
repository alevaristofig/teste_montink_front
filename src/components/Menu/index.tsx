import { ReactElement } from "react";
import { NavLink } from 'react-router-dom';
import { FcPaid } from "react-icons/fc";
import { FcTemplate } from "react-icons/fc";
import { FcPodiumWithoutSpeaker } from "react-icons/fc";

import 'bootstrap/dist/css/bootstrap.min.css';

const Menu = (): ReactElement => {

    const IconeProduto = FcPaid as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
    const IconeCupom = FcTemplate as unknown as React.FC<React.SVGProps<SVGSVGElement>>;  
    const IconePedido = FcPodiumWithoutSpeaker as unknown as React.FC<React.SVGProps<SVGSVGElement>>;  

    return(
        <>
            <div className='menu_esquerdo list-group float-start'>
                <NavLink to='/produto' className='list-group-item list-group-item-action mb-2'>
                    <IconeProduto fontSize={24} color='blue' /> Produto
                </NavLink>
                <NavLink to='/cupom' className='list-group-item list-group-item-action mb-2'>
                    <IconeCupom fontSize={24} color='blue' /> Cupom
                </NavLink>
                <NavLink to='/pedido' className='list-group-item list-group-item-action mb-2'>
                    <IconePedido fontSize={24} color='blue' /> Pedido
                </NavLink>
            </div>
        </>
    )
}

export default Menu; 