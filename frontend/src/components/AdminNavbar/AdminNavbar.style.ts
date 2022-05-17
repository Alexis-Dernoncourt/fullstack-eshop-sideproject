import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { MaxWidth1150px, mobile, tablet } from '../../styles/responsive';

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
    ${mobile({ height: '8rem' })};
`;

export const LinksContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex-wrap: wrap;
    background-color: black;
    text-align: center;
    width: 100%;
    height: 100%;
`;

export const Title = styled.p`
    font-size: var(--fz-md);
    margin: 0 2rem;
    ${tablet({ display: 'none' })};
`;

export const BtnContainer = styled(Link)`
    display: flex;
    align-items: center;
    color: var(--white);
    text-transform: uppercase;
    font-weight: 600;
    font-size: var(--fz-md);
    margin: 0 2rem;
    ${MaxWidth1150px({ fontSize: 'var(--fz-sm)' })};
    ${tablet({
        fontSize: 'var(--fz-xs)',
        fontWeight: '400',
        margin: '0 1rem',
    })};
    ${mobile({ fontSize: 'var(--fz-xxs)' })};
`;
