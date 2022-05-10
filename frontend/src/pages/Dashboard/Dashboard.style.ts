import styled from 'styled-components';
//import { Link } from 'react-router-dom';

export const Container = styled.div`
    min-height: 70vh;
    margin: 5rem 0;
    text-align: center;
    font-size: var(--fz-lg);
    display: flex;
    justify-content: space-around;
    padding: 0 10rem;
`;

export const TitleContainer = styled.h1`
    text-transform: uppercase;
    color: var(--darkblue);
`;

export const InfosTitle = styled.p`
    font-size: var(--fz-xxl);
    text-transform: uppercase;
    font-weight: 800;
    color: var(--gray);
    margin: 3rem 0 1rem;
`;

export const ProfilInfosContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
`;
