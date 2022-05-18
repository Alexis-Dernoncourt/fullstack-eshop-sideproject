import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { mobile, tablet } from '../../styles/responsive';

interface ITooltip {
    productInfo: string;
}
interface IPage {
    page: string;
}

export const Container = styled(Link)<IPage>`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    height: max-content;
    width: ${(props) => (props.page === 'home' ? '40rem' : '30rem')};
    margin: ${(props) => (props.page === 'home' ? '0' : '1.5rem 3rem')};
    border-radius: 1rem;
    -webkit-box-shadow: 0px 0.2rem 2.2rem -0.5rem rgba(0, 0, 0, 0.3);
    box-shadow: 0rem 0.2rem 2.2rem -0.5rem rgba(0, 0, 0, 0.3);
    transition: var(--transition);
    &:hover {
        color: inherit;
        transform: scale(1.02);
        cursor: pointer;
        -webkit-box-shadow: 0rem 0.2rem 3rem -0.5rem rgba(0, 0, 0, 0.5);
        box-shadow: 0rem 0.2rem 3rem -0.5rem rgba(0, 0, 0, 0.5);
    }
`;

export const CardTooltip = styled.span<ITooltip>`
    position: absolute;
    right: 1.5rem;
    top: 1.5rem;
    background-color: ${(props) =>
        props.productInfo.toLowerCase() === 'new'
            ? 'green'
            : props.productInfo.toLowerCase() === 'en solde'
            ? 'salmon'
            : 'black'};
    color: var(--white);
    font-size: var(--fz-sm);
    text-transform: uppercase;
    font-weight: bold;
    padding: 0.5rem 1.5rem;
    border-radius: 0.4rem;
`;

export const PriceItem = styled.div`
    width: 100%;
    text-align: center;
    color: var(--white);
    font-size: var(--fz-xxl);
    font-weight: bold;
    background-color: var(--black);
    padding: 1rem 0;
    ${tablet({ fontSize: 'var(--fz-xl)' })};
    ${mobile({ fontSize: 'var(--fz-md)' })};
`;

export const CardHead = styled.div<IPage>`
    display: flex;
    align-items: center;
    justify-content: center;
    height: ${(props) => (props.page === 'home' ? '8.5rem' : '5rem')};
    font-size: ${(props) =>
        props.page === 'home' ? 'var(--fz-xxl)' : 'var(--fz-md)'};
    font-weight: 700;
    text-transform: uppercase;
    text-align: center;
    padding: ${(props) =>
        props.page === 'home' ? '2rem 2rem 1rem' : '0.7rem 0.7rem'};
    ${tablet({ fontSize: 'var(--fz-md)' })};
    ${mobile({
        fontSize: 'var(--fz-md)',
        padding: '1.5rem 2rem 1rem',
        height: 'max-content',
    })};
`;

export const CardImg = styled.img<IPage>`
    width: 100%;
    height: ${(props) => (props.page === 'home' ? '25rem' : '22rem')};
    object-fit: cover;
    border-radius: 1rem 1rem 0 0;
`;
export const CardBody = styled.div<IPage>`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: var(--fz-lg);
    padding: ${(props) =>
        props.page === 'home' ? '1rem 0 2rem' : '0.7rem 0 1rem'};
`;
