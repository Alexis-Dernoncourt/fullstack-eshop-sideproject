import styled from 'styled-components';
import { mobile, tablet, MaxWidth1150px } from '../../styles/responsive';

interface IPage {
    page: string;
}

export const QuantityContainer = styled.div<IPage>`
    display: flex;
    align-items: center;
    height: 4rem;
    ${(props) => (props.page === 'cart' ? 'margin: 0' : 'margin: 3rem 5rem')};
    ${MaxWidth1150px({
        margin: '1.5rem auto',
    })};
    ${tablet({
        height: '3rem',
        margin: '0.5rem 0',
    })};
`;

export const QtyInput = styled.input`
    font-size: var(--fz-lg);
    text-align: center;
    line-height: 3.5rem;
    margin: 0.5rem 0;
    width: 7rem;
    height: 100%;
    ${tablet({
        fontSize: 'var(--fz-md)',
    })};
    ${mobile({
        fontSize: 'var(--fz-md)',
    })};
`;

export const QtyButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--blue);
    opacity: 0.8;
    border: none;
    border-radius: 0.2rem;
    color: var(--white);
    height: 100%;
    width: 4rem;
    transition: var(--transition);
    &.disabled {
        cursor: not-allowed;
        background-color: var(--gray);
        opacity: 0.8;
    }
    &:hover {
        opacity: 1;
        cursor: pointer;
        &.disabled {
            cursor: not-allowed;
        }
    }
    &:active {
        background-color: var(--darkblue);
    }
`;
