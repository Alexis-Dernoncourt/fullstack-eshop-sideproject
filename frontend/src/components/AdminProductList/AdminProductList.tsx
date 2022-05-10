import PriceFormat from '../PriceFormat/PriceFormat';
import {
    Container,
    ImgContainer,
    ContentContainer,
    ProductTitle,
    ProductInfo,
    CategoryList,
    PublicationInfo,
    ElastikContainer,
    BottomElastikContainer,
    EditBtnContainer,
    BtnContainer,
    BtnSpan,
} from './AdminProductList.style';
import { MdCreate, MdDeleteForever } from 'react-icons/md';
import { useAppSelector } from '../../redux/hooks';
import { User, Product } from '../../typescript/types';
import toast from 'react-hot-toast';
import {
    useGetAllProductsQuery,
    useDeleteProductMutation,
} from '../../redux/apiSlice';
import { Link } from 'react-router-dom';

const AdminProductList = () => {
    const user: {
        userData: User;
        status: string;
        pending: boolean;
        authenticated: boolean;
        message: string;
        error: boolean;
    } = useAppSelector((state) => state.user);
    const token: string = user?.userData?.accessToken;
    const { data, isLoading, isError } = useGetAllProductsQuery(token);
    const [deleteProduct] = useDeleteProductMutation();

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

    const handleDelete = async (id: string) => {
        try {
            const confirmDelete = window.confirm(
                'Voulez-vous vraiment supprimer cet article ? Attention: cette action est définitive...'
            );
            if (confirmDelete) {
                const data = {
                    id,
                    token,
                };
                const response = await deleteProduct(data).unwrap();
                toast.success(`${response.message}`);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            {data.totalProducts && (
                <ProductTitle>
                    Total des articles: {data.totalProducts}
                </ProductTitle>
            )}
            {data?.products &&
                data.products.map((product: Product) => (
                    <Container key={product._id}>
                        <ImgContainer src={product.img} />
                        <ContentContainer>
                            <ElastikContainer>
                                <ProductTitle>{product.title}</ProductTitle>
                                <ProductTitle>
                                    <PriceFormat price={product.price} />
                                </ProductTitle>
                            </ElastikContainer>
                            <CategoryList>
                                Catégories:{' '}
                                {product.categories.split(',').join(', ')}
                            </CategoryList>
                            <ProductInfo>
                                {product.textContent.length > 120
                                    ? `${product.textContent.slice(0, 120)}...`
                                    : product.textContent}
                            </ProductInfo>
                            <BottomElastikContainer>
                                <CategoryList>
                                    <p>
                                        Couleur(s):{' '}
                                        {product.options.couleur.join(', ')}
                                    </p>
                                    <p>
                                        Taille(s):{' '}
                                        {product.options.taille.join(', ')}
                                    </p>
                                </CategoryList>
                                <PublicationInfo>
                                    {product.state.published
                                        ? 'Publié'
                                        : 'Brouillon'}
                                </PublicationInfo>
                            </BottomElastikContainer>
                        </ContentContainer>
                        <EditBtnContainer>
                            <Link to="/admin/products/update" state={product}>
                                <BtnContainer>
                                    <MdCreate
                                        style={{
                                            height: '1.5em',
                                            width: '1.5em',
                                        }}
                                    />
                                    <BtnSpan>Modifier</BtnSpan>
                                </BtnContainer>
                            </Link>
                            <BtnContainer
                                onClick={() => handleDelete(product._id)}
                            >
                                <MdDeleteForever
                                    style={{
                                        height: '1.5em',
                                        width: '1.5em',
                                    }}
                                />
                                <BtnSpan>Supprimer</BtnSpan>
                            </BtnContainer>
                        </EditBtnContainer>
                    </Container>
                ))}
        </>
    );
};

export default AdminProductList;
