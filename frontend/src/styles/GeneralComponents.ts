import styled from 'styled-components';
import { Link } from 'react-router-dom';

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
`;

export const MenuBtnContainer = styled.button`
    border: none;
    background-color: inherit;
    color: var(--gray);
    font-size: var(--fz-xl);
    cursor: pointer;
`;

export const CartContainer = styled(Link)`
    color: var(--gray);
    align-self: flex-start;
    position: relative;
    margin: 0 5rem;
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
`;

export const FlexDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    width: 100%;
`;

export const TitleH2 = styled.h2`
    font-size: 3rem;
    margin: 7rem auto 3rem;
    padding: 0 1rem;
    text-transform: uppercase;
    position: relative;
    width: max-content;
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
    }
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
