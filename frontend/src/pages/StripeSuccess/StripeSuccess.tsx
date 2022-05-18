import {
    Container,
    TextInfoBlue,
    Text,
} from '../StripeCancel/StripeCancel.style';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { deleteCartData, MadeCartLoading } from '../../redux/cartSlice';

const StripeSuccess = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(MadeCartLoading());
        dispatch(deleteCartData());
    }, []);

    useEffect(() => {
        const delai = setTimeout(() => {
            navigate('/dashboard');
        }, 5000);

        return () => {
            clearTimeout(delai);
        };
    }, []);

    return (
        <Container>
            <h2>C'est fait !</h2>
            <TextInfoBlue>Merci pour votre commande ! 😊</TextInfoBlue>
            <Text>
                Vous allez être redirigé vers votre profil dans 5 secondes !
            </Text>
        </Container>
    );
};

export default StripeSuccess;
