import { ReactElement } from "react";
import { NavLink } from 'react-router-dom';
import { FcPaid } from "react-icons/fc";

const Menu = (): ReactElement => {

    const IconeProduto = FcPaid as unknown as React.FC<React.SVGProps<SVGSVGElement>>;  

    return(
        <>
            <div className='menu_esquerdo list-group float-start'>
                <NavLink to='/produto' className='list-group-item list-group-item-action mb-2'>
                    <IconeProduto fontSize={24} color='blue' /> Produto
            </NavLink>
            </div>
        </>
    )
}

export default Menu; 