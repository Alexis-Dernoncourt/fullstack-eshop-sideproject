import PriceFormat from '../PriceFormat/PriceFormat';
import {
    Container,
    CardTooltip,
    PriceItem,
    CardHead,
    CardImg,
    CardBody,
} from './Card.style';

type CardProps = {
    id: string;
    img: string;
    title: string;
    textContent: string;
    productInfo: string;
    price: number;
    categories: string;
    options: object;
    page: string;
};

const Card = ({
    id,
    img,
    title,
    textContent,
    productInfo,
    price,
    categories,
    options,
    page,
}: CardProps) => {
    return (
        <Container
            to={`/products/${title.toLowerCase().split(' ').join('-')}`}
            state={{
                id,
                img,
                title,
                textContent,
                productInfo,
                price,
                categories,
                options,
            }}
            page={page}
        >
            {page && page === 'home' && (
                <CardTooltip productInfo={productInfo}>
                    {productInfo}
                </CardTooltip>
            )}
            <CardImg src={img} page={page} />
            <PriceItem>
                <PriceFormat price={price} />
            </PriceItem>
            <CardHead page={page}>{title}</CardHead>
            <CardBody page={page}>
                <small>Voir l'article en détails</small>
            </CardBody>
        </Container>
    );
};

export default Card;
