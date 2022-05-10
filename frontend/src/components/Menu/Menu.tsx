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
                        <MenuItem to="#">Femme</MenuItem>
                        <MenuItem to="#">Homme</MenuItem>
                        <MenuItem to="#">Enfant</MenuItem>
                    </ItemsMenuListContainer>
                    <ItemsMenuListContainer main={false}>
                        <MenuItem to="#">Vêtements</MenuItem>
                        <MenuItem to="#">Chaussures</MenuItem>
                        <MenuItem to="#">En solde</MenuItem>
                        <MenuItem to="#">New !</MenuItem>
                        <MenuItem to="#">Chemises</MenuItem>
                        <MenuItem to="#">Pulls</MenuItem>
                        <MenuItem to="#">Jeans</MenuItem>
                        <MenuItem to="#">Pantalons</MenuItem>
                    </ItemsMenuListContainer>
                </ItemsMenuContainer>
            </Container>
        </>
    );
};

export default Menu;
