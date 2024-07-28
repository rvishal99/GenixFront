import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import toast from "react-hot-toast";
import axiosInstance from "../../utils/axiosInstance.js";



const initialState = {
  productsData: []
}



export const getAllProducts = createAsyncThunk("/products/fetchAllProducts", async () => {
  try {
    const response = axiosInstance.get("/products");

    // toast.promise(response, {
    //   loading: 'Loading...',
    //   // success: 'Products loaded successfully',
    //   error: 'Failed to get the Products'
    // })

    return (await response).data.Products;

  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
})
export const getProduct = createAsyncThunk("/products/getProduct", async (id) => {
  try {

    console.log(id)
    const response = await axiosInstance.get(`/products/${id}`);
    console.log(response)

    // toast.promise(response, {
    //   loading: 'Loading...',
    //   success: 'Products loaded successfully',
    //   error: 'Failed to get the Products'
    // })

    return response.data;

  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
})



export const createNewProduct = createAsyncThunk("/products/create", async (data) => {
  try {
    const response = axiosInstance.post("/products", data);

    toast.promise(response, {
      loading: "Creating new product",
      success: "product created successfully",
      error: "Failed to product"
    })

    return (await response).data
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
})

export const deleteProduct = createAsyncThunk("/products/delete", async (id) => {
  try {
    const response = axiosInstance.delete(`/products/${id}`);
    toast.promise(response, {
      loading: "deleting product ...",
      success: "product deleted successfully",
      error: "Failed to delete the product",
    });

    return (await response).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

export const newBid = createAsyncThunk("products/createBid", async ({ data, id }) => {
  try {

    console.log(id)
    const response = axiosInstance.put(`/products/${id}`, data);

    toast.promise(response, {
      loading: "Creating new bid",
      success: "Bid created successfully",
      error: "Failed to Bid"
    });

    return (await response).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);

  }
});
export const updateProduct = createAsyncThunk("products/updateProduct", async (data) => {
  try {

    console.log(data.id)
    console.log(data)

    const response = axiosInstance.put(`/products/update/${data.id}`, data);

    toast.promise(response, {
      loading: "Updating",
      success: "Updated successfully",
      error: "Failed to update"
    });

    return (await response).data;
  }
  catch (error) {
    toast.error(error?.response?.data?.message);
    throw error; // Ensure the error is thrown to be caught by the thunk
  }
});
const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      console.log(action.payload)
      if (action.payload) {
        state.productsData = [...action.payload];
      }
    })
      .addCase(getProduct.fulfilled, (state, action) => {
        console.log(action.payload)
        if (action.payload) {
          state.product = action.payload.product;
        }
      })

      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.productsData = state.productsData.filter((product) => product.id !== action.payload.id);

      })
  },
});

export default productsSlice.reducer;
