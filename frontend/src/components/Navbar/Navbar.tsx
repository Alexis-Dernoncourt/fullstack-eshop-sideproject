import { LogoLink } from '../../styles/GeneralComponents';
import { Nav, NavLogo, UserBtn } from './Navbar.style';
import {
    MenuContainer,
    MenuBtnContainer,
    CartContainer,
    CartTooltip,
} from '../../styles/GeneralComponents';
import { HiOutlineShoppingBag, HiOutlineUserCircle } from 'react-icons/hi';
import { CgMenu } from 'react-icons/cg';
import { useState } from 'react';
import Menu from '../Menu/Menu';
import CartTooltipTotal from '../CartTooltipTotal/CartTooltipTotal';
import { useAppSelector } from '../../redux/hooks';

const Navbar = () => {
    const [toggleMenu, setToggleMenu] = useState(false);
    const authenticatedUser: boolean = useAppSelector(
        (state) => state.user.authenticated
    );

    return (
        <>
            <Nav>
                <LogoLink to="/">
                    <NavLogo>Shopping App</NavLogo>
                </LogoLink>
                <MenuContainer>
                    {!authenticatedUser ? (
                        <UserBtn to="/login" className="link">
                            Login / Register
                        </UserBtn>
                    ) : (
                        <UserBtn to="/dashboard">
                            <HiOutlineUserCircle
                                style={{ height: '1.5em', width: '1.5em' }}
                            />
                            <p className="link">Mon profil</p>
                        </UserBtn>
                    )}
                    <CartContainer to="/cart">
                        <HiOutlineShoppingBag
                            style={{ height: '1.5em', width: '1.5em' }}
                        />
                        <CartTooltip>
                            <CartTooltipTotal />
                        </CartTooltip>
                    </CartContainer>
                    <MenuBtnContainer
                        onClick={() => setToggleMenu(!toggleMenu)}
                    >
                        {!toggleMenu ? (
                            <CgMenu
                                style={{ height: '1.5em', width: '1.5em' }}
                            />
                        ) : (
                            <CgMenu
                                style={{
                                    height: '1.5em',
                                    width: '1.5em',
                                    color: 'lightgrey',
                                }}
                            />
                        )}
                    </MenuBtnContainer>
                </MenuContainer>
            </Nav>
            <Menu open={toggleMenu} setToggleMenu={setToggleMenu} />
        </>
    );
};

export default Navbar;
