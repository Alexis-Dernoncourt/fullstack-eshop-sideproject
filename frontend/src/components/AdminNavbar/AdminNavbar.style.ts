import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
    display: flex;
    align-items: center;
    position: sticky;
    gap: 2rem;
    top: 0;
    z-index: 100;
    height: 5rem;
    background-color: black;
    text-align: center;
    color: white;
    &:after {
        content: '';
        width: 100%;
        height: 10%;
        background-color: var(--darkblue);
        position: absolute;
        bottom: 0;
    }
`;

export const LinksContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    background-color: black;
    text-align: center;
    width: 100%;
    height: 100%;
`;

export const Title = styled.p`
    font-size: 1.6rem;
    margin: 0 2rem;
`;

export const BtnContainer = styled(Link)`
    display: flex;
    align-items: center;
    color: var(--white);
    text-transform: uppercase;
    font-weight: 600;
    font-size: 1.4rem;
    margin: 0 2rem;
`;
