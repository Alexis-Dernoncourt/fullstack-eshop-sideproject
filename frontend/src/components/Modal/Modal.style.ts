import styled from 'styled-components';
import { mobile, tablet } from '../../styles/responsive';

export const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 500;
    height: 100vh;
    width: 100vw;
    background-color: rgba(0, 0, 0, 0.5);
`;

export const Wrapper = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    height: auto;
    width: 50%;
    ${tablet({ width: '75%' })};
    ${mobile({ width: '90%' })};
`;

export const ModalContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 20000;
    width: 100%;
    min-height: 40rem;
    padding: 4rem;
    background-color: #fff;
    ${tablet({ minHeight: '32rem' })};
    ${mobile({ minHeight: '25rem' })};
`;

export const ModalContent = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const Text = styled.p`
    width: 100%;
    text-align: center;
    font-size: var(--fz-lg);
    font-weight: 700;
    ${tablet({ fontSize: 'var(--fz-md)' })};
    ${mobile({ fontSize: 'var(--fz-sm)' })};
`;

export const SubText = styled.p`
    width: 100%;
    text-align: center;
    margin-top: 2rem;
    font-size: var(--fz-lg);
    color: var(--red);
    ${tablet({ fontSize: 'var(--fz-md)' })};
    ${mobile({ fontSize: 'var(--fz-sm)' })};
`;

export const BtnContainer = styled.div`
    width: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 4rem;
`;

export const StyledBtn = styled.button`
    flex-direction: row;
    width: max-content;
    background-color: var(--lightgray);
    color: var(--black);
    padding: 1.5rem;
    border: 1px solid transparent;
    border-radius: 0.5rem;
    margin-left: 2rem;
    font-size: var(--fz-xl);
    font-weight: 700;
    transition: var(--transition);
    &:hover,
    &:active {
        cursor: pointer;
    }
    ${tablet({ fontSize: 'var(--fz-lg)' })};
    ${mobile({ fontSize: 'var(--fz-md)' })};
`;

export const ConfirmBtn = styled(StyledBtn)`
    background-color: #b2e28a;
    &:hover,
    &:active {
        background-color: darkgreen;
        color: var(--white);
    }
    &:disabled {
        cursor: not-allowed;
        color: inherit;
    }
`;

export const CloseBtn = styled(StyledBtn)`
    background-color: var(--white);
    color: var(--black);
    border: 1px solid var(--black);
    &:hover,
    &:active {
        background-color: var(--black);
        color: var(--white);
    }
    &:disabled {
        cursor: not-allowed;
        color: inherit;
    }
`;
