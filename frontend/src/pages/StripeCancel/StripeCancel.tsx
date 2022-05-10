import {
    Container,
    TextInfo,
    LinksContainer,
    LinkItem,
} from './StripeCancel.style';

const StripeCancel = () => {
    return (
        <Container>
            <h2>Annulation</h2>
            <TextInfo>Le paiement de votre commande a été annulé...</TextInfo>
            <LinksContainer>
                <LinkItem to="/cart" className="link">
                    Retourner vers votre panier
                </LinkItem>
                <LinkItem to="/" className="link">
                    Retourner à l'accueil
                </LinkItem>
            </LinksContainer>
        </Container>
    );
};

export default StripeCancel;
