import styled from 'styled-components';
import { MenuBtnContainer } from '../../styles/GeneralComponents';

export const Container = styled.div`
    display: flex;
    margin: 5rem 10rem;
    min-height: 70vh;
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
`;

export const CartItemsContainer = styled.div`
    display: flex;
    flex-direction: column;
    //justify-content: space-between;
    flex: 2;
`;

export const CartItem = styled.div`
    display: flex;
    margin: 0.5rem 5rem;
    height: 15rem;
    -webkit-box-shadow: 0px 0.2rem 1.2rem -0.5rem rgba(0, 0, 0, 0.3);
    box-shadow: 0rem 0.2rem 1.2rem -0.5rem rgba(0, 0, 0, 0.3);
`;

export const ImgContainer = styled.div`
    width: 18%;
    height: 100%;
    overflow: hidden;
    flex-shrink: 0;
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
`;

export const ItemTitle = styled.div`
    font-size: var(--fz-xxl);
    font-weight: bold;
`;

export const Infos = styled.small`
    font-size: var(--fz-md);
    color: var(--darkblue);
    margin: 0.5rem 1.5rem;
`;

export const Details = styled.p`
    font-size: var(--fz-lg);
    margin: 0.3rem 0;
    font-style: italic;
`;

export const BtnContainer = styled.div`
    margin: auto 2rem auto auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
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
    color: var(--black);
    transition: var(--transition);
    &:hover,
    &:active {
        font-size: var(--fz-xxl);
        color: var(--green);
    }
    &:disabled {
        cursor: not-allowed;
        font-size: var(--fz-xl);
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
`;

export const FormContainer = styled.form`
    display: flex;
    gap: 0.5rem;
    flex-wrap: nowrap;
`;
