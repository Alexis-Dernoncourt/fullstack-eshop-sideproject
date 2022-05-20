import {
    Container,
    Background,
    ItemsMenuContainer,
    ItemsMenuListContainer,
    MenuItem,
} from './Menu.style';
import {
    MenuContainer,
    MenuBtnContainer,
    CartContainer,
    CartTooltip,
} from '../../styles/GeneralComponents';

import { CgClose } from 'react-icons/cg';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import CartTooltipTotal from '../CartTooltipTotal/CartTooltipTotal';

type MenuProps = {
    open: boolean;
    setToggleMenu: Function;
};

const Menu = ({ open, setToggleMenu }: MenuProps) => {
    const pathName = '/products/filter?category=';
    return (
        <>
            <Background open={open} onClick={() => setToggleMenu(false)} />
            <Container open={open}>
                <MenuContainer>
                    <MenuBtnContainer onClick={() => setToggleMenu(false)}>
                        <CgClose style={{ height: '1.5em', width: '1.5em' }} />
                    </MenuBtnContainer>
                    <CartContainer to="/cart">
                        <HiOutlineShoppingBag
                            style={{ height: '1.5em', width: '1.5em' }}
                        />
                        <CartTooltip>
                            <CartTooltipTotal />
                        </CartTooltip>
                    </CartContainer>
                </MenuContainer>
                <ItemsMenuContainer>
                    <ItemsMenuListContainer main={true}>
                        <MenuItem to={`${pathName}femme`}>Femme</MenuItem>
                        <MenuItem to={`${pathName}homme`}>Homme</MenuItem>
                        <MenuItem to={`${pathName}enfant`}>Enfant</MenuItem>
                    </ItemsMenuListContainer>
                    <ItemsMenuListContainer main={false}>
                        <MenuItem to={`${pathName}vetements`}>
                            Vêtements
                        </MenuItem>
                        <MenuItem to={`${pathName}chaussures`}>
                            Chaussures
                        </MenuItem>
                        <MenuItem to={`${pathName}solde`}>En solde</MenuItem>
                        <MenuItem to={`${pathName}new`}>New !</MenuItem>
                        <MenuItem to={`${pathName}chemise`}>Chemises</MenuItem>
                        <MenuItem to={`${pathName}pull`}>Pulls</MenuItem>
                        <MenuItem to={`${pathName}jean`}>Jeans</MenuItem>
                        <MenuItem to={`${pathName}pantalons`}>
                            Pantalons
                        </MenuItem>
                        <MenuItem to={`${pathName}ete`}>Été</MenuItem>
                    </ItemsMenuListContainer>
                </ItemsMenuContainer>
            </Container>
        </>
    );
};

export default Menu;
