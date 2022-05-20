import styled from 'styled-components';
import { mobile, tablet } from '../../styles/responsive';
import { Link } from 'react-router-dom';

interface IBorder {
    border: string;
}
interface IText {
    danger: string;
}
interface ILink {
    marginBottom: boolean;
}

export const Container = styled.div`
    min-height: 70vh;
    margin: 5rem 0;
    text-align: center;
    font-size: var(--fz-lg);
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    padding: 0 10rem;
    ${mobile({ padding: '0 1rem', fontSize: 'var(--fz-md)' })};
`;

export const TitleContainer = styled.h1`
    text-transform: uppercase;
    color: var(--darkblue);
    ${mobile({ fontSize: 'var(--fz-lg)' })};
`;

export const AdminInfo = styled.p`
    ${mobile({ fontSize: 'var(--fz-xs)' })};
`;

export const TextZone = styled.p<IText>`
    color: ${(props) => props.danger === 'danger' && 'var(--red)'};
    font-weight: ${(props) => props.danger === 'danger' && 'bold'};
    ${mobile({ fontSize: 'var(--fz-xs)' })};
`;

export const InfosTitle = styled.p`
    font-size: var(--fz-xxl);
    text-transform: uppercase;
    font-weight: 800;
    color: var(--gray);
    margin: 3rem 0 1rem;
    ${mobile({ fontSize: 'var(--fz-md)' })};
`;

export const ProfilInfosContainer = styled.div<IBorder>`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    border-left: ${(props) => props.border === 'left' && '2px solid lightgray'};
    ${tablet({ borderLeft: 'none' })};
`;

export const AdressZone = styled.div`
    border: 0.1rem solid lightgrey;
    border-radius: 1rem;
    padding: 1.5rem 2rem;
    margin: 2rem auto 0.5rem;
`;

export const StyledLink = styled(Link)<ILink>`
    width: max-content;
    color: var(--darkblue);
    margin: ${(props) => (props.marginBottom ? '0 auto 2rem' : '0 auto')};
    ${tablet({ width: 'auto' })};
`;
