export type User = {
    userId: string;
    email: string;
    password: string;
    username: string;
    adress?: {
        firstName: string;
        lastName: string;
        postalCode: string;
        street: string;
        city: string;
        adressComplement: string;
        streetNumber: string;
        appartment: false;
        etage: number;
    };
    refreshToken: string;
    validatedAccount: Boolean;
    userRoles: { User: number; Editor?: number; Admin?: number };
};

export type Product = {
    _id: string;
    title: string;
    textContent: string;
    img: string;
    price: number;
    categories: string;
    productInfo: string;
    options: {
        taille: string[];
        couleur: string[];
    };
    state: { published: boolean };
};

export type CartProduct = {
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

export type ProductItems = CartProduct[];

export type ProductUpdateType = {
    uid: string;
    couleur: string;
    taille: string;
    quantity: number;
};

export interface ILogin {
    email: string;
    password: string;
}
