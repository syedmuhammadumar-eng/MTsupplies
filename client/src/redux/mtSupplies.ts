import { createSlice } from "@reduxjs/toolkit";
export interface Product {
  id: string,
  quantity: number,
  productId: number,
  Name: string,
  price: string,
  paragraph: string,
  imgSrc: string,
  isSpecial: boolean,
  specialText: string,
  isDiscount: boolean,
  categoryName: string,
  isBestSelling: boolean,
  discountpercent: number,
  discountprice: number,
  category: string,
  isChecked: boolean,
  subCategory: string,
  stock: number,
  bestseller: boolean,
}

export interface IselectCategory {
  id: string,
  category: string,
  categoryLabel: string,
  images: [{ url: string, }]
  isChecked: boolean,
}

export interface State {
  userInfo: any[],
  products: Product[],
  productDetails: Product[],
  BreadValue: Array<[]>,
  searchedProduct: Product[],
  selectedCategory: IselectCategory,
  searchProductData: Product[],
  relatedProductData: Product[],
}
const initialState: State = {
  userInfo: [],
  BreadValue: [],
  products: [
    {
      id: '',
      quantity: 0,
      productId: 0,
      Name: '',
      price: '',
      paragraph: '',
      imgSrc: '',
      isSpecial: false,
      specialText: '',
      isDiscount: false,
      categoryName: '',
      isBestSelling: false,
      discountpercent: 0,
      discountprice: 0,
      category: '',
      isChecked: false,
      subCategory: '',
      stock: 0,
      bestseller: false,
    },
  ],
  productDetails: [],
  searchedProduct: [],
  searchProductData: [],
  relatedProductData: [],
  selectedCategory: {
    id: '',
    category: '',
    categoryLabel: '',
    images: [{ url: '', }],
    isChecked: false,
  },
};

export const mtSupplies = createSlice({
  name: "mtSupplies",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const cartState = JSON.parse(JSON.stringify(state.products));
      const index = cartState.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.products[index].quantity += action.payload.quantity;
      } else {
        state.products.push(action.payload);
      }
    },

    increaseQuantity: (state, action) => {
      const item = state.products.find(
        (item) => item.id === action.payload.id
      );
      if (item) {
        if (item.stock > item.quantity) {
          item.quantity++;
        }
      }
    },

    drecreaseQuantity: (state, action) => {
      const item = state.products.find(
        (item) => item.id === action.payload.id
      );
      if (item) {
        if (item.quantity === 1) {
          item.quantity = 1;
        } else {
          item.quantity--;
        }
      }
    },

    deleteItem: (state, action) => {
      state.products = state.products.filter(
        (item) => item.id !== action.payload
      );
    },

    resetCart: (state) => {
      state.products = [];
    },

    setProductDetail: (state, action) => {
      const actionArray = JSON.parse(JSON.stringify(action.payload));
      state.productDetails = [actionArray];
    },

    increaseProductDetailQuantity: (state, action) => {
      const item = state.productDetails.find(
        (item) => item.id === action.payload.id
      );
      if (item) {
        item.quantity++;
      }
    },

    drecreaseProductDetailQuantity: (state, action) => {
      const item = state.productDetails.find(
        (item) => item.id === action.payload.id
      );
      if (item) {
        if (item.quantity === 1) {
          item.quantity = 1;
        } else {
          item.quantity--;
        }
      }
    },

    removeProductDetail: (state) => {
      state.productDetails = [];
    },

    setBreadCrumb: (state, action) => {
      state.BreadValue = action.payload;
    },

    setSearchItem: (state, action) => {
      state.searchedProduct = action.payload;
    },

    clearSearchedProduct(state) {
      state.searchedProduct = [];
    },

    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },

    setSearchProductData: (state, action) => {
      state.searchProductData = action.payload;
    },

    setRelatedProductData: (state, action) => {
      state.relatedProductData = action.payload;
    },
  },
});

export const {
  addToCart,
  increaseQuantity,
  drecreaseQuantity,
  deleteItem,
  resetCart,
  setProductDetail,
  increaseProductDetailQuantity,
  drecreaseProductDetailQuantity,
  removeProductDetail,
  setBreadCrumb,
  setSearchItem,
  clearSearchedProduct,
  setSelectedCategory,
  setSearchProductData,
  setRelatedProductData,
} = mtSupplies.actions;
export default mtSupplies.reducer;
