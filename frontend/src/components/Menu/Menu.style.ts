import styled, { keyframes, css } from 'styled-components';
import { Link } from 'react-router-dom';

interface IBtn {
    open: boolean;
}

interface IMenuList {
    main: boolean;
}

const openMenuTransition = keyframes`
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0);
  }
`;

const openMenuBackgroundTransition = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const openMenu = css`
    animation: ${openMenuTransition} 0.15s ease-in forwards;
`;

const openBackgroundMenu = css`
    animation: ${openMenuBackgroundTransition} 0.5s ease both;
`;

export const Background = styled.div<IBtn>`
    position: fixed;
    top: 0;
    left: 0;
    display: ${(props) => (!props.open ? 'none' : 'flex')};
    height: 100%;
    width: ${(props) => (!props.open ? '0' : '70%')};
    background-color: rgba(255, 255, 255, 0.4);
    ${(props) => props.open && openBackgroundMenu};
    z-index: 5;
`;

export const Container = styled.div<IBtn>`
    position: fixed;
    right: 0;
    top: 0;
    display: ${(props) => (!props.open ? 'none' : 'flex')};
    flex-direction: column;
    align-items: flex-start;
    color: #fff;
    padding: 6.2rem 5.5rem;
    width: 30%;
    height: 100vh;
    background-color: rgb(45, 45, 45);
    ${(props) => props.open && openMenu};
    z-index: 50;
`;

export const ItemsMenuContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5rem;
    margin: 10rem 7rem;
    font-size: var(--fz-xl);
`;

export const ItemsMenuListContainer = styled.div<IMenuList>`
    display: flex;
    flex-direction: column;
    font-weight: ${(props) => (props.main ? 'bold' : 'light')};
`;

export const MenuItem = styled(Link)`
    display: block;
    margin: 0.5rem 0;
    color: #fff;
    width: max-content;
`;
