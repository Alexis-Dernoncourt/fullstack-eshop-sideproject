import styled from 'styled-components';
import { tablet } from '../../styles/responsive';

export const Container = styled.div`
    display: flex;
    align-items: stretch;
    min-height: 100vh;
    ${tablet({
        flexDirection: 'column',
        minHeight: 'max-content',
    })}
`;

export const ProductsContainer = styled.div`
    display: flex;
    justify-content: center;
    margin: 3rem 0;
    flex-wrap: wrap;
    gap: 5rem;
`;
