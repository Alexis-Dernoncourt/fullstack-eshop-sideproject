import styled from 'styled-components';
import { mobile } from '../../styles/responsive';

interface IPage {
    page: string;
}

export const InputContainer = styled.div`
    width: max-content;
    position: relative;
    ${mobile({
        margin: '1.5rem 0',
    })};
`;

export const SelectInput = styled.select<IPage>`
    height: 4rem;
    font-size: var(--fz-md);
    background-color: var(--white);
    border: solid 0.1rem var(--gray);
    border-radius: 0.4rem;
    margin: ${(props) => (props.page === 'cart' ? '0' : '0 1.5rem')};
    &:hover {
        cursor: pointer;
    }
    &.error {
        border-color: var(--red);
        border-width: 0.2rem;
    }
    ${mobile({
        fontSize: 'var(--fz-sm)',
    })};
`;

export const ErrorMsg = styled.small`
    display: block;
    position: absolute;
    top: 4rem;
    left: 1.5rem;
    &.error-msg {
        color: var(--red);
    }
`;

export const SelectOption = styled.option`
    font-size: var(--fz-md);
    &:hover {
        cursor: pointer;
    }
    ${mobile({
        fontSize: 'var(--fz-sm)',
    })};
`;
