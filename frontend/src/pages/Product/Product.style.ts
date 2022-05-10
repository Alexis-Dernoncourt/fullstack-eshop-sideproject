import { Link } from 'react-router-dom';
import styled from 'styled-components';
export const Container = styled.div`
    display: flex;
    justify-content: center;
    width: fit-content;
    margin: 7rem auto;
    height: max-content;
`;

export const ImgContainer = styled.div`
    height: 60vh;
    width: 40vw;
`;

export const ProductImg = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 0.2rem;
`;

export const ProductInfosContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 1rem auto;
    width: 40vw;
    font-size: var(--fz-lg);
`;

export const ProductCategories = styled.small`
    align-self: flex-end;
    margin-right: 12rem;
    font-size: 1.4rem;
    color: var(--darkblue);
`;

export const ProductLink = styled(Link)`
    color: var(--darkblue);
    width: max-content;
    margin: 0 0.3rem;
`;

export const ProductTextContent = styled.p`
    margin: 3rem auto;
    padding: 0 5rem;
    text-align: justify;
    color: var(--gray);
`;

export const PriceContainer = styled.div`
    width: 40%;
    transform: rotate(1deg);
    margin: 2rem auto;
`;
