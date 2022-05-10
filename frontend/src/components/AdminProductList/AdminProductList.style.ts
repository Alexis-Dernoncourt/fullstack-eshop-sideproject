import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
    display: flex;
    margin: 2rem auto;
    width: 50vw;
    height: 20rem;
    border-bottom: 1px solid var(--gray);
    border-right: 1px solid var(--lightgray);
    transition: var(--transition);
    &:hover {
        background-color: var(--xtralightgray);
    }
`;

export const ImgContainer = styled.img`
    display: flex;
    align-items: center;
    justify-content: center;
    object-fit: cover;
    width: 30%;
    height: 100%;
`;

export const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 2rem;
    width: 70%;
    border-right: 1px solid var(--lightgray);
    cursor: default;
`;

export const ProductTitle = styled.p`
    font-weight: 700;
    font-size: var(--fz-lg);
    margin-bottom: 0;
`;

export const ProductInfo = styled.p`
    font-size: var(--fz-sm);
`;

export const CategoryList = styled.div`
    font-size: var(--fz-sm);
    color: var(--gray);
    padding: 0.7rem;
`;

export const PublicationInfo = styled(ProductInfo)`
    font-weight: 700;
    color: salmon;
    padding: 0.7rem;
    align-self: flex-end;
    margin-top: auto;
`;

export const ElastikContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const BottomElastikContainer = styled(ElastikContainer)`
    margin-top: auto;
`;

export const EditBtnContainer = styled.div`
    width: 10%;
`;

export const BtnContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid var(--lightgray);
    font-size: var(--fz-lg);
    height: 50%;
    transition: var(--transition);
    &:hover {
        cursor: pointer;
        color: var(--white);
        background-color: var(--darkblue);
    }
`;

export const BtnSpan = styled.span`
    text-transform: uppercase;
    font-size: var(--fz-xxs);
`;
