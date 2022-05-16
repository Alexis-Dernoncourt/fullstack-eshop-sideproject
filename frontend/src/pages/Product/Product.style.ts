import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { MaxWidth600px, mobile } from '../../styles/responsive';

export const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: fit-content;
    margin: 7rem auto;
    height: max-content;
    ${MaxWidth600px({
        margin: '1rem auto',
    })};
`;

export const ImgContainer = styled.div`
    height: 50rem;
    width: 60rem;
    margin: 0 auto;
    ${MaxWidth600px({
        width: '100vw',
        height: 'auto',
        padding: '0.2rem',
    })};
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
    padding: 2rem;
    width: 40vw;
    min-width: 52rem;
    font-size: var(--fz-lg);
    ${MaxWidth600px({
        width: '100vw !important',
        minWidth: '0 !important',
        padding: '0.5rem',
    })};
`;

export const ProductCategories = styled.small`
    align-self: flex-end;
    margin-right: 12rem;
    font-size: 1.4rem;
    color: var(--darkblue);
    ${mobile({
        marginRight: 'unset',
        margin: 'auto',
    })};
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
    ${mobile({
        padding: '0 1rem',
        margin: '1.8rem auto',
    })};
`;

export const PriceContainer = styled.div`
    width: 40%;
    min-width: 17rem;
    transform: rotate(1deg);
    margin: 2rem auto;
`;
