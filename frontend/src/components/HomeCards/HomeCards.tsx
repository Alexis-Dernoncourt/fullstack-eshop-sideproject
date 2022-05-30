import { Container } from './HomeCards.style';
import Card from '../Card/Card';
import { useGetAllPublishedQuery } from '../../redux/products/productsApiSlice';

type HomeCardsProps = {
    _id: string;
    img: string;
    title: string;
    textContent: string;
    productInfo: string;
    price: number;
    categories: string;
    options: object;
    page: string;
};

const HomeCards = () => {
    const { data, isLoading, isError } = useGetAllPublishedQuery('Products');

    if (isLoading) {
        return <p style={{ width: '100%', textAlign: 'center' }}>Loading...</p>;
    }

    if (isError) {
        return (
            <p style={{ width: '100%', textAlign: 'center' }}>
                Il y a eu une erreur...
            </p>
        );
    }

    return (
        <Container>
            {data?.products &&
                data.products.map(
                    (data: HomeCardsProps, index: number) =>
                        index < 6 && (
                            <Card
                                key={data._id}
                                id={data._id}
                                img={data.img}
                                title={data.title}
                                textContent={data.textContent}
                                productInfo={data.productInfo}
                                price={data.price}
                                categories={data.categories}
                                options={data.options}
                                page="home"
                            />
                        )
                )}
        </Container>
    );
};

export default HomeCards;
