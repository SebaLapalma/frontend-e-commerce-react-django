import axios from 'axios'

import { 
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,

    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    
} from '../constants/productContants'

export const listProducts = (keyword = '') => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST });

        // Quitar acentos de la palabra clave
        const normalizedKeyword = keyword.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

        // Crear una expresión regular para realizar la búsqueda insensible a mayúsculas y minúsculas
        const regex = new RegExp(normalizedKeyword, 'i');

        const { data } = await axios.get('https://nunafraganciasback.com/api/products/');

        // Filtrar los productos según la palabra clave
        const filteredProducts = data.filter(product => regex.test(product.name.normalize('NFD').replace(/[\u0300-\u036f]/g, '')));

        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: filteredProducts,
        });
    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,
        });
    }
};

export const listProductDetails = (id) => async (dispatch) => {
    try{
        dispatch({type:PRODUCT_DETAILS_REQUEST})

        const { data } = await axios.get(`https://nunafraganciasback.com/api/products/${id}`)

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        })

    }catch(error){
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}