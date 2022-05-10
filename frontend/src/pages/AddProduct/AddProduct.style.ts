import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled.div`
    margin: 5rem auto;
    display: flex;
    flex-direction: column;
    min-height: calc(100vh - 23rem);
`;

export const Title = styled.h2`
    font-size: var(--fz-lg);
    margin-bottom: 2rem;
    font-size: bolder;
    text-transform: uppercase;
    text-align: center;
`;
export const InfoSpan = styled.span`
    display: block;
    font-size: 1.6rem;
    color: var(--red);
    margin-bottom: 1rem;
    margin-left: auto;
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0 auto;
    background-color: rgba(0, 0, 0, 0.05);
    width: 70%;
    height: max-content;
    padding: 4rem;
    border-radius: 0.4rem;
`;

export const FormSectionContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
    margin: 3rem 0;
    gap: 5rem;
`;

export const FormSideSection = styled.div`
    width: 45%;
`;

export const Input = styled.input`
    display: block;
    width: 100%;
    border-radius: 0.4rem;
    border: 0.1rem solid white;
    padding: 1rem 1.5rem;
    margin: 2rem 0;
    font-size: var(--fz-md);
    &.error {
        border-color: var(--red);
        border-width: 0.2rem;
    }
`;

export const TextArea = styled.textarea`
    display: block;
    width: 100%;
    max-width: 100%;
    min-width: 100%;
    border-radius: 0.4rem;
    border: 0.1rem solid white;
    padding: 1rem 1.5rem;
    margin: 2rem 0;
    font-size: var(--fz-md);
    &.error {
        border-color: var(--red);
        border-width: 0.2rem;
    }
`;

export const Label = styled.label`
    color: var(--black);
    font-size: var(--fz-md);
    margin-bottom: 2.5rem;
`;

export const ErrorSpan = styled.span`
    display: block;
    color: var(--red);
    font-size: var(--fz-xs);
    text-align: right;
    margin-top: -3.7rem;
    margin-bottom: 2rem;
    padding: 0 1rem;
`;

export const FormBtn = styled.button`
    background-color: transparent;
    border: 0.1rem solid var(--blue);
    border-radius: 0.4rem;
    min-width: 35rem;
    margin: 4rem auto 0;
    color: var(--blue);
    font-size: var(--fz-md);
    text-transform: uppercase;
    padding: 1.5rem 0;
    transition: var(--transition);
    &:hover {
        background-color: var(--blue);
        color: var(--white);
        cursor: pointer;
    }
    &:disabled {
        background-color: var(--gray);
        color: var(--black);
        border-color: var(--gray);
        cursor: not-allowed;
    }
`;

export const AbortLink = styled(Link)`
    font-size: var(--fz-md);
    font-weight: 700;
    width: max-content;
    margin: 3rem auto 0;
`;
