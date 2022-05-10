import styled from 'styled-components';

export const Container = styled.div`
    height: 70vh;
    background-color: var(--blue);
    overflow: hidden;
    position: relative;
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
`;

export const Img = styled.img`
    flex: 3;
    object-fit: cover;
`;
