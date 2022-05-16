import styled from 'styled-components';
import { MinWidth1400px, mobile, tablet } from '../../styles/responsive';

export const NewsletterContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: min-content;
    width: 100%;
    margin: 10rem 0;
    ${mobile({ margin: '5rem auto 5rem' })};
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 70vw;
    height: max-content;
    padding: 0 4rem 4rem;
    border-radius: 0.4rem;
    ${mobile({ width: '100%' })};
`;

export const Input = styled.input`
    display: block;
    width: 70%;
    border-radius: 5rem;
    border: 0.3rem solid var(--lightgray);
    padding: 1.5rem 1.5rem;
    margin: 0;
    font-size: var(--fz-lg);
    color: var(--gray);
    text-align: center;
    &.error {
        border-color: var(--red);
        border-width: 0.2rem;
    }
    ${MinWidth1400px({ width: '650px' })};
    ${tablet({ width: '100%' })};
`;

export const ErrorSpan = styled.span`
    color: var(--red);
    margin: 1rem 0 0 2rem;
    font-size: var(--fz-sm);
`;

export const SubmitBtn = styled.button`
    color: var(--darkblue);
    margin: 2rem 0;
    padding: 2rem 3rem;
    border-radius: 5rem;
    border: none;
    width: 18rem;
    font-size: var(--fz-md);
    font-weight: 700;
    text-transform: uppercase;
    transition: var(--transition);
    &:hover {
        cursor: pointer;
        width: 20rem;
        font-size: var(--fz-lg);
        -webkit-box-shadow: 0px 0.2rem 2.2rem -0.5rem rgba(0, 0, 0, 0.3);
        box-shadow: 0rem 0.2rem 2.2rem -0.5rem rgba(0, 0, 0, 0.3);
    }
    &:disabled {
        cursor: not-allowed;
        color: darkgray;
    }
`;
