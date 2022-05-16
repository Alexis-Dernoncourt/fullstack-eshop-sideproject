import styled from 'styled-components';
import { mobile } from '../../styles/responsive';

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex-wrap: wrap;
    gap: 5rem;
    margin: 8rem 10rem 20rem;
    ${mobile({ margin: '8rem 1.5rem 10rem' })};
`;
