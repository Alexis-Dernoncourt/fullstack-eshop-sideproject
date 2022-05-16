import styled from 'styled-components';
import { Button } from '../../styles/GeneralComponents';

export const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    flex-wrap: wrap;
    flex: 1 0;
    width: 100%;
`;

export const InputContainer = styled.div`
    width: max-content;
    position: relative;
`;

export const SelectInput = styled.select`
    height: 4rem;
    font-size: var(--fz-md);
    background-color: var(--white);
    border: solid 0.1rem var(--gray);
    border-radius: 0.4rem;
    margin: 0 1rem;
    &:hover {
        cursor: pointer;
    }
    &.error {
        border-color: var(--red);
        border-width: 0.2rem;
    }
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
    font-size: 2rem;
    &:hover {
        cursor: pointer;
    }
`;

export const AddToCartBtn = styled(Button)`
    margin: 0 5rem;
    font-size: 1.8rem;
    &:disabled {
        background-color: var(--gray);
        cursor: not-allowed;
    }
`;
