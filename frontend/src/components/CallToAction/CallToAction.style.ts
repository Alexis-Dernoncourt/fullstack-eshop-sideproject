import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const CTA = styled(Link)`
    display: block;
    margin: 3rem auto;
    padding: 2rem 7rem;
    text-transform: uppercase;
    font-size: var(--fz-xxl);
    font-weight: bolder;
    background-color: var(--black);
    color: var(--white);
    border-radius: 0.3rem;
    border: 0.25rem solid var(--black);
    transition: background-color 0.1s ease-in-out;
    &:hover {
        background-color: transparent;
        color: var(--black);
        cursor: pointer;
        &:active {
            background-color: rgba(0, 0, 0, 0.1);
        }
    }
`;
