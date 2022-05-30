import { LogoLink } from '../../styles/GeneralComponents';
import { Nav, NavLogo, ProfileLink, UserBtn } from './Navbar.style';
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
import { selectCurrentUser } from '../../redux/auth/authSlice';

const Navbar = () => {
    const [toggleMenu, setToggleMenu] = useState(false);
    const user = useAppSelector(selectCurrentUser);

    return (
        <>
            <Nav>
                <LogoLink to="/">
                    <NavLogo>Shopping App</NavLogo>
                </LogoLink>
                <MenuContainer>
                    {!user ? (
                        <UserBtn to="/login" className="link">
                            Connexion
                        </UserBtn>
                    ) : (
                        <UserBtn to="/dashboard">
                            <HiOutlineUserCircle
                                style={{ height: '1.5em', width: '1.5em' }}
                            />
                            <ProfileLink className="link">
                                Mon profil
                            </ProfileLink>
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
