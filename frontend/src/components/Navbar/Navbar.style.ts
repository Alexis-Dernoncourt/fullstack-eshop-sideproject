import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Logo } from '../../styles/GeneralComponents';
import { mobile, tablet } from '../../styles/responsive';

export const Nav = styled.nav`
    display: flex;
    align-items: center;
    justify-content: space-around;
    z-index: 4 !important;
    margin: 0;
    padding: 3rem 0;
    width: 100%;
    height: 10rem;
    background-color: var(--white);
    font-size: var(--fz-lg);
    -webkit-box-shadow: 0rem 0.2rem 1.7rem -0.5rem rgba(0, 0, 0, 0.5);
    box-shadow: 0rem 0.2rem 1.7rem -0.5rem rgba(0, 0, 0, 0.5);
    ${tablet({ height: '8rem' })};
    ${mobile({ height: '4rem' })};
`;

export const NavLogo = styled(Logo)`
    color: var(--gray);
    ${tablet({ fontSize: '1.8rem' })};
    ${mobile({ fontSize: '1.4rem' })};
`;

export const CartTooltip = styled.span`
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    width: 2.4rem;
    height: 2.4rem;
    border-radius: 50%;
    background-color: var(--red);
    color: var(--white);
    position: absolute;
    top: -1rem;
    right: -1.7rem;
`;

export const UserBtn = styled(Link)`
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--darkblue);
    text-transform: uppercase;
    font-weight: 600;
    ${tablet({ fontSize: '1.8rem' })};
    ${mobile({ fontSize: '1.2rem' })};
`;
