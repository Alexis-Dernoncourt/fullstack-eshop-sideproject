import Card from '../../components/Card/Card';
import Widget from '../../components/Widget/Widget';
import { Container, ProductsContainer } from './ProductList.style';
import { useGetAllPublishedQuery } from '../../redux/products/productsApiSlice';
import { Product } from '../../typescript/types';

const ProductList = () => {
    const { data, isLoading, isError } = useGetAllPublishedQuery('Products');

    if (isLoading) {
        return <p style={{ width: '100%', textAlign: 'center' }}>Loading...</p>;
    }
    if (isError) {
        return <p style={{ width: '100%', textAlign: 'center' }}>Erreur...</p>;
    }

    return (
        <Container>
            <Widget />
            <ProductsContainer>
                {data?.products &&
                    data.products.map((data: Product) => (
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
                            page="list"
                        />
                    ))}
            </ProductsContainer>
        </Container>
    );
};

export default ProductList;
