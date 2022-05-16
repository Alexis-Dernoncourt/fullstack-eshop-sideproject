import styled from 'styled-components';
import { mobile, tablet } from '../../styles/responsive';

export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: sticky;
    top: 0;
    z-index: 15;
    height: 3rem;
    background-color: var(--blue);
    color: var(--white);
    font-size: var(--fz-md);
    ${tablet({
        fontSize: '1.4rem',
        height: 'auto',
        padding: '0.5rem 1rem',
        textAlign: 'center',
    })};
    ${mobile({
        fontSize: '1.2rem',
        height: 'auto',
        padding: '0.5rem 1rem',
        textAlign: 'center',
    })};
`;
