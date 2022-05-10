import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit';
import { RootState } from './store';

type Product = {
    uid: string;
    image: string;
    couleur: string;
    productName: string;
    productid: string;
    quantity: number;
    taille: string;
    total?: number;
    unitPrice: number;
};

type ProductUpdateType = {
    uid: string;
    couleur: string;
    taille: string;
    quantity: number;
};

type ProductItems = Product[];

type CartState = {
    cartData: ProductItems;
    status: string;
    error: string | object | null;
};

const initialState: CartState = {
    cartData: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        MadeCartLoading(state) {
            if (state.status === 'idle' || state.status !== 'loading') {
                state.status = 'loading';
            }
        },
        MadeCartIdle(state) {
            if (state.status !== 'idle') {
                state.status = 'idle';
            }
        },
        addToCart(state, action: PayloadAction<Product>) {
            const uuid = nanoid(15);
            state.cartData.push({ ...action.payload, uid: uuid });
            state.status = 'succeeded';
        },
        updateCartItem(state, action: PayloadAction<ProductUpdateType>) {
            if (state.status === 'loading') {
                const { uid, couleur, taille, quantity } = action.payload;
                const currentProduct = state.cartData.find(
                    (el: Product) => el.uid === uid
                );
                if (currentProduct) {
                    const updatedProduct = {
                        ...currentProduct,
                        couleur,
                        taille,
                        quantity,
                    };
                    state.cartData.splice(
                        state.cartData.indexOf(currentProduct),
                        1,
                        updatedProduct
                    );
                    state.status = 'succeeded';
                } else {
                    state.status = 'failed';
                    state.error = {
                        error: 'updateCart',
                        message: 'Erreur ! Produit non trouvé.',
                    };
                    throw Error('Erreur ! Produit non trouvé.');
                }
            }
        },
        deleteProduct(state, action: PayloadAction<string>) {
            if (state.status === 'loading') {
                state.cartData = state.cartData.filter(
                    (el: Product) => el.uid !== action.payload
                );
                state.status = 'succeeded';
            }
        },
        deleteCartData(state) {
            if (state.status === 'loading') {
                state.cartData = initialState.cartData;
                state.status = 'succeeded';
            }
        },
    },
});

export const selectAllCartItems = (state: RootState) =>
    state.shoppingAppCart.cartData;

export const {
    MadeCartLoading,
    addToCart,
    updateCartItem,
    MadeCartIdle,
    deleteProduct,
    deleteCartData,
} = cartSlice.actions;

export default cartSlice.reducer;
