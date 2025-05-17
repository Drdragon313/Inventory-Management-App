import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	products: []
};

const productSlice = createSlice({
	name: "products",
	initialState,
	reducers: {
		addProduct: (state, action) => {
			state.products.push({
				...action.payload,
				id: Date.now()
			});
		},
		updateProduct: (state, action) => {
			const index = state.products.findIndex((p) => p.id === action.payload.id);
			if (index !== -1) {
				state.products[index] = action.payload;
			}
		},
		deleteProduct: (state, action) => {
			state.products = state.products.filter((p) => p.id !== action.payload);
		},
		setProducts: (state, action) => {
			state.products = action.payload;
		}
	}
});

export const { addProduct, updateProduct, deleteProduct, setProducts } =
	productSlice.actions;
export default productSlice.reducer;
