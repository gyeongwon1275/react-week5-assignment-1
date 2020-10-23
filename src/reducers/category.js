const initialState = {
  categories: [],
  selectedIdx: -1,
};

const category = (state = initialState, action) => {
  if (action.type === 'setCategories') {
    const { categories } = action.payload;
    return {
      ...state,
      categories,
    };
  }
  return state;
};

export default category;
