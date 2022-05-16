import styled from 'styled-components';
import { mobile, tablet } from '../../styles/responsive';

export const Container = styled.div`
    height: 70vh;
    background-color: var(--blue);
    overflow: hidden;
    position: relative;
    ${tablet({ height: '40vh' })};
    ${mobile({ height: '30vh' })};
`;

export const ArrowContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    width: 5%;
    height: 100%;
    top: 0;
    bottom: 0;
    margin: auto;
    color: var(--white);
    cursor: pointer;
    z-index: 2;
    transition: var(--transition);
    &:hover {
        background-color: rgba(0, 0, 0, 0.25);
    }
    ${tablet({ width: '10%' })};
    ${mobile({ width: '15%', color: '#ffffff6e' })};
`;

export const Wrapper = styled.div`
    width: 300vw;
    height: 100%;
    display: flex;
    transition: transform 0.9s ease-out;
`;

export const ImgContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100%;
    position: relative;
`;

export const SliderText = styled.h3`
    position: absolute;
    align-self: flex-end;
    margin-bottom: 10rem;
    z-index: 2;
    background-color: rgba(0, 0, 0, 0.8);
    font-size: 5rem;
    color: var(--white);
    padding: 1rem 3rem;
    border-radius: 0.4rem;
    transform: rotate(-2deg);
    ${tablet({ fontSize: '2.4rem' })};
    ${mobile({ fontSize: '1.8rem' })};
`;

export const Img = styled.img`
    width: 100%;
    height: 100%;
    flex: 3;
    object-fit: cover;
`;
