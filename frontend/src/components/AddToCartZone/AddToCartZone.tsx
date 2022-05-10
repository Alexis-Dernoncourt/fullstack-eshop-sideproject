import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
    MadeCartLoading,
    MadeCartIdle,
    addToCart,
} from '../../redux/cartSlice';
import { FormContainer, AddToCartBtn } from './AddToCartZone.style';
import { FlexDiv } from '../../styles/GeneralComponents';
import toast from 'react-hot-toast';
import QuantityBtn from '../QuantityBtn/QuantityBtn';
import ProductOptionsInput from '../ProductOptionsInput/ProductOptionsInput';

type AddToCartProps = {
    id: string;
    uid: string;
    img: string;
    name: string;
    price: number;
    options: {
        taille: string[];
        couleur: string[];
    };
};

type Product = {
    image: string;
    couleur: string;
    productName: string;
    uid: string;
    productid: string;
    quantity: number;
    taille: string;
    total?: number;
    unitPrice: number;
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const AddToCartZone = ({
    id,
    uid,
    img,
    name,
    price,
    options,
}: AddToCartProps) => {
    const [quantity, setQuantity] = useState(1);
    const dispatch = useAppDispatch();
    const { status } = useAppSelector((state) => state.shoppingAppCart);

    const {
        register,
        setValue,
        handleSubmit,
        reset,
        formState: { errors, isDirty, isSubmitting, isValid },
    } = useForm<Product>({ mode: 'onChange' });

    const onSubmit = async (data: Product) => {
        if (isValid) {
            dispatch(MadeCartLoading());
            await sleep(1000);
            try {
                dispatch(addToCart(data));
            } catch (error) {
                console.log('errrorrrr');
            } finally {
                dispatch(MadeCartIdle());
                toast.success('Ajouté au panier !');
                reset();
                setQuantity(1);
            }
        }
    };

    return (
        <FormContainer onSubmit={handleSubmit(onSubmit)}>
            <FlexDiv>
                <input type="hidden" value={img} {...register('image')} />
                <input type="hidden" value={id} {...register('productid')} />
                <input type="hidden" value={uid} {...register('uid')} />
                <input
                    type="hidden"
                    value={name}
                    {...register('productName')}
                />
                <input
                    type="hidden"
                    value={price}
                    {...register('unitPrice', { valueAsNumber: true })}
                />
                <QuantityBtn
                    quantity={quantity}
                    defaultVal={quantity}
                    setQuantity={setQuantity}
                    register={register}
                    setValue={setValue}
                    page="productPage"
                />

                <ProductOptionsInput
                    register={register}
                    defaultVal={''}
                    errors={errors}
                    options={options}
                    fieldName="taille"
                    page="productPage"
                />

                <ProductOptionsInput
                    register={register}
                    defaultVal={''}
                    errors={errors}
                    options={options}
                    fieldName="couleur"
                    page="productPage"
                />
            </FlexDiv>
            <p>
                Total :{' '}
                {new Intl.NumberFormat('fr-FR', {
                    style: 'currency',
                    currency: 'EUR',
                }).format(quantity * price)}
            </p>

            <AddToCartBtn
                type="submit"
                disabled={!isDirty || isSubmitting || !isValid}
            >
                {status && status === 'loading' ? 'Ajout...' : 'Ajouter'}
            </AddToCartBtn>
        </FormContainer>
    );
};

export default AddToCartZone;
