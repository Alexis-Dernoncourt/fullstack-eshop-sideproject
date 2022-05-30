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
import { Product } from '../../typescript/types';
import toast from 'react-hot-toast';
import {
    useGetAllProductsQuery,
    useDeleteProductMutation,
} from '../../redux/products/productsApiSlice';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Modal from '../../components/Modal/Modal';
import { selectCurrentToken } from '../../redux/auth/authSlice';

const AdminProductList = () => {
    const [showModal, setShowModal] = useState(false);
    const [productId, setProductId] = useState('');
    const [confirmDeleteArticle, setConfirmDeleteArticle] = useState(false);
    //const user = useAppSelector(selectCurrentUser);
    const token: string = useAppSelector(selectCurrentToken);
    const { data, isLoading, isError } = useGetAllProductsQuery(token);
    const [deleteProduct] = useDeleteProductMutation();

    const handleDelete = async (id: string) => {
        try {
            if (confirmDeleteArticle) {
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

    const handleDeleteProduct = (uid: string) => {
        setProductId(uid);
        setShowModal(true);
    };

    useEffect(() => {
        handleDelete(productId);
    }, [showModal, confirmDeleteArticle]);

    useEffect(() => {
        setProductId('');
    }, []);

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
                                onClick={() => handleDeleteProduct(product._id)}
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
            {showModal &&
                productId &&
                productId !== '' &&
                ReactDOM.createPortal(
                    <Modal
                        modalText="Voulez-vous vraiment supprimer cet article ?"
                        ModalDangerInfo="Attention, cette action est irréversible"
                        validTextBtn="OK"
                        setShowModal={setShowModal}
                        setConfirmAction={setConfirmDeleteArticle}
                        setAbortAction={setConfirmDeleteArticle}
                    />,
                    document.body
                )}
        </>
    );
};

export default AdminProductList;
