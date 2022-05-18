import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { MenuBtnContainer } from '../../styles/GeneralComponents';
import {
    MaxWidth1150px,
    MaxWidth1400px,
    mobile,
    tablet,
} from '../../styles/responsive';

export const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin: 5rem 10rem;
    min-height: 70vh;
    ${mobile({ margin: '2rem 1rem' })};
    ${tablet({ margin: '4rem 2rem' })};
`;

export const EmptyInfoDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: 60vh;
    text-align: center;
    font-size: var(--fz-lg);
    font-weight: 700;
    color: var(--red);
    ${mobile({ fontSize: 'var(--fz-sm)' })};
`;

export const CartContentContainer = styled.div`
    display: flex;
    width: 100%;
    ${tablet({ flexDirection: 'column' })};
`;

export const CartItemsContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex: 2;
    ${tablet({ order: '2', flex: '1' })};
`;

export const CartItem = styled.div`
    display: flex;
    margin: 0.5rem 5rem;
    height: 15rem;
    -webkit-box-shadow: 0px 0.2rem 1.2rem -0.5rem rgba(0, 0, 0, 0.3);
    box-shadow: 0rem 0.2rem 1.2rem -0.5rem rgba(0, 0, 0, 0.3);
    ${MaxWidth1400px({ height: 'auto', margin: '1rem' })};
    ${mobile({ height: 'auto', margin: '0.5rem' })};
`;

export const ImgContainer = styled.div`
    width: 18%;
    min-width: 13rem;
    height: 100%;
    overflow: hidden;
    flex-shrink: 0;
    ${tablet({ width: '30%', minWidth: '18rem' })};
    ${mobile({ height: '50%', width: '25%', minWidth: 'unset' })};
`;

export const ItemImg = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;
export const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 2rem;
    ${mobile({ margin: '0.5rem 1rem' })};
`;

export const ItemTitle = styled.div`
    font-size: var(--fz-xxl);
    font-weight: bold;
    ${tablet({ fontSize: 'var(--fz-lg)' })};
    ${mobile({ fontSize: 'var(--fz-sm)' })};
`;

export const Infos = styled.small`
    font-size: var(--fz-md);
    color: var(--darkblue);
    margin: 0.5rem 1.5rem;
    ${MaxWidth1150px({
        display: 'block',
    })};
    ${tablet({
        fontSize: 'var(--fz-sm)',
        margin: '0.5rem 1rem',
        display: 'block',
    })};
    ${mobile({
        fontSize: 'var(--fz-xs)',
        margin: '0.5rem',
        display: 'block',
    })};
`;

export const InputContainer = styled.div`
    font-size: var(--fz-md);
    margin: 0.5rem 1.5rem;
    ${tablet({
        fontSize: 'var(--fz-sm)',
        margin: '1rem',
    })};
    ${mobile({
        fontSize: 'var(--fz-xs)',
        margin: '0.5rem',
    })};
`;

export const Details = styled.p`
    font-size: var(--fz-lg);
    margin: 0.3rem 0;
    font-style: italic;
    ${tablet({ fontSize: 'var(--fz-md)' })};
    ${mobile({ fontSize: 'var(--fz-xs)' })};
`;

export const BtnContainer = styled.div`
    margin: auto 2rem auto auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    ${tablet({ margin: 'auto 1rem auto auto' })};
    ${mobile({ margin: 'auto 0.4rem auto auto' })};
`;

export const SpanBtnText = styled.span`
    ${tablet({ fontSize: 'var(--fz-sm)', display: 'block' })};
    ${mobile({ fontSize: '1rem', display: 'block' })};
`;

export const DeleteBtnContainer = styled(MenuBtnContainer)`
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--red);
    transition: var(--transition);
    &:hover,
    &:active {
        color: var(--blue);
    }
    ${MaxWidth1150px({ fontSize: 'var(--fz-md)', flexDirection: 'column' })};
    ${tablet({ fontSize: 'var(--fz-sm)', flexDirection: 'column' })};
    ${mobile({ fontSize: 'var(--fz-xs)', flexDirection: 'column' })};
`;

export const UpdateBtnContainer = styled(DeleteBtnContainer)`
    color: var(--darkblue);
    transition: var(--transition);
    &:hover,
    &:active {
        color: var(--gray);
    }
`;

export const AbortBtnContainer = styled(DeleteBtnContainer)`
    color: var(--gray);
    transition: var(--transition);
    &:hover,
    &:active {
        color: var(--blue);
    }
`;

export const ConfirmBtnContainer = styled(DeleteBtnContainer)`
    flex-direction: row;
    color: var(--black);
    transition: var(--transition);
    background-color: var(--lightgray);
    padding: 1.5rem;
    border-radius: 1rem;
    margin-left: 2rem;
    font-size: var(--fz-xl);
    width: max-content;
    &:hover,
    &:active {
        color: var(--green);
    }
    &:disabled {
        cursor: not-allowed;
        color: inherit;
    }
`;

export const DeleteCart = styled(DeleteBtnContainer)`
    align-self: flex-end;
    margin: 2rem 4rem 2rem 0;
`;

export const RightCartSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: var(--lightgray);
    flex: 1;
    height: max-content;
    padding: 2rem;
    font-size: var(--fz-lg);
    ${mobile({ order: '1', fontSize: 'var(--fz-sm)' })};
    ${tablet({ order: '1', flex: '1' })};
`;

export const StyledH2 = styled.h2`
    ${mobile({ fontSize: 'var(--fz-md)' })};
`;

export const StyledH1 = styled.h1`
    ${mobile({ fontSize: 'var(--fz-md)' })};
`;

export const FormContainer = styled.form`
    display: flex;
    gap: 0.5rem;
    flex-wrap: nowrap;
    ${MaxWidth1150px({ flexWrap: 'wrap', flexDirection: 'column' })};
`;

export const AlertText = styled.p`
    color: var(--red);
    font-weight: 700;
    margin-top: 3rem;
    text-align: center;
`;

export const StyledLink = styled(Link)`
    width: max-content;
    margin: 1.5rem auto 2rem;
    color: var(--darkblue);
`;
