import {createSlice} from '@reduxjs/toolkit';


const initialState = {
  items: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite(state, action) {
      console.log("action payload", action.payload.recipe.ingredients)
      if (
        !action.payload ||
        !action.payload.recipe ||
        !action.payload.recipe.label
      ) {
        console.error('Invalid payload:', action.payload);
        return state;
      }

     
      const {label} = action.payload.recipe;

      const existingItem = state.items.find(item => {
        return item.recipe.label === label;
      });

      if (!existingItem) {
        state.items.push(action.payload);
      } else {
        console.log('Item already exists in favorites:', existingItem);
      }
    },

    removeFavorite(state, action) {
      state.items = state.items.filter(item => item !== action.payload);
    },

  },


  
});

export const {addFavorite,removeFavorite} = favoritesSlice.actions;
export default favoritesSlice.reducer;
