import { 
  LOAD_PRODUCT_START, 
  LOAD_PRODUCT_SUCCESS,
  MOER_PRODUCTS_TO_LOAD 
} from "../actions/productActions";

const initialState = {
  products: {},
  loading: true,
  moreProducts: true,
};

export function productReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_PRODUCT_START:
      return {
        ...state,
      };
    case LOAD_PRODUCT_SUCCESS:
      return Object.assign({}, state, {
        ...state,
        products: {
          ...state.products,
          [action.payload.id] : action.payload.fields
        }
      });
      case MOER_PRODUCTS_TO_LOAD:
        return {
          ...state,
          moreProducts: action.payload
        };
    default:
      return state;
  }
}