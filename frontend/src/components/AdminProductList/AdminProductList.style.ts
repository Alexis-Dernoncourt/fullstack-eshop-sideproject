import styled from 'styled-components';
import { MaxWidth1400px, mobile, tablet } from '../../styles/responsive';

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
    ${MaxWidth1400px({ width: '90%', height: 'auto' })};
    ${tablet({ width: '95%', height: 'auto' })};
    ${mobile({ width: '95%', height: 'auto' })};
`;

export const ImgContainer = styled.img`
    display: flex;
    align-items: center;
    justify-content: center;
    object-fit: cover;
    width: 30%;
    height: 100%;
    ${MaxWidth1400px({
        maxHeight: '20rem',
    })};
    ${mobile({ width: '35%' })};
`;

export const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 2rem;
    width: 70%;
    border-right: 1px solid var(--lightgray);
    cursor: default;
    ${mobile({ width: '65%', padding: '0.5rem' })};
`;

export const ProductTitle = styled.p`
    font-weight: 700;
    font-size: var(--fz-lg);
    margin-bottom: 0;
    ${mobile({ fontSize: 'var(--fz-sm)' })};
`;

export const ProductInfo = styled.p`
    font-size: var(--fz-sm);
    ${mobile({ fontSize: 'var(--fz-xs)' })};
`;

export const CategoryList = styled.div`
    font-size: var(--fz-sm);
    color: var(--gray);
    padding: 0.7rem;
    ${mobile({ fontSize: 'var(--fz-xxs)' })};
`;

export const PublicationInfo = styled(ProductInfo)`
    font-weight: 700;
    color: salmon;
    padding: 0.7rem;
    align-self: flex-end;
    margin-top: auto;
    ${mobile({ fontSize: 'var(--fz-xxs)' })};
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
    ${mobile({ width: '17%' })};
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
    ${mobile({ fontSize: 'var(--fz-md)' })};
`;

export const BtnSpan = styled.span`
    text-transform: uppercase;
    font-size: var(--fz-xxs);
    ${mobile({ fontSize: '0.8rem' })};
`;
