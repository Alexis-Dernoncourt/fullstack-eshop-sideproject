import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { MinWidth1400px, mobile, tablet } from './responsive';

export const LogoLink = styled(Link)`
    width: fit-content;
    height: auto;
`;

export const Logo = styled.div`
    font-size: var(--fz-xxl);
    font-weight: bolder;
    width: 100%;
    height: auto;
`;

export const MenuContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: var(--fz-xl);
    color: var(--gray);
    width: max-content;
    height: max-content;
    z-index: 2;
    ${mobile({ padding: '0 0.5rem' })};
`;

export const MenuBtnContainer = styled.button`
    border: none;
    background-color: inherit;
    color: var(--gray);
    font-size: var(--fz-xl);
    cursor: pointer;
    ${tablet({ fontSize: '1.8rem' })};
    ${mobile({ fontSize: '1.4rem' })};
`;

export const CartContainer = styled(Link)`
    color: var(--gray);
    align-self: center;
    position: relative;
    margin: 0 5rem;
    ${tablet({ fontSize: '1.8rem' })};
    ${mobile({ fontSize: '1.4rem' })};
`;

export const CartTooltip = styled.span`
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: var(--fz-sm);
    width: 2.4rem;
    height: 2.4rem;
    border-radius: 50%;
    background-color: var(--red);
    color: var(--white);
    position: absolute;
    top: -1rem;
    right: -1.7rem;
    ${tablet({
        fontSize: '1.2rem',
        width: '2rem',
        height: '2rem',
        right: '-1.2rem',
    })};
    ${mobile({
        fontSize: '1rem',
        width: '1.5rem',
        height: '1.5rem',
        top: '-0.7rem',
        right: '-1rem',
    })};
`;

export const FlexDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    width: 100%;
`;

export const TitleH2 = styled.h2`
    font-size: 3vw;
    margin: 7rem auto 3rem;
    padding: 0 1rem;
    text-transform: uppercase;
    position: relative;
    width: max-content;
    text-align: center;
    &::after {
        content: '';
        display: block;
        width: 100%;
        height: 1.7rem;
        background-color: var(--blue);
        opacity: 0.5;
        position: absolute;
        bottom: 0;
        left: 0;
        z-index: -1;
        border-radius: 0.4rem;
        ${tablet({ height: '50%' })};
        ${mobile({ opacity: '0' })};
    }
    ${mobile({ fontSize: '2rem', width: 'auto', padding: '1rem' })};
    ${MinWidth1400px({ fontSize: '3rem' })};
`;

export const Button = styled.button`
    font-size: 2rem;
    margin: 3rem auto;
    padding: 2rem 5rem;
    text-transform: uppercase;
    width: max-content;
    background-color: var(--black);
    color: var(--white);
    border: none;
    border-radius: 0.2rem;
    &:hover {
        background-color: var(--blue);
        cursor: pointer;
    }
    &:active {
        background-color: var(--darkblue);
    }
`;
