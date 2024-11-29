import {createSlice} from '@reduxjs/toolkit';
import {act} from 'react';

const initialState = {
  items: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    setFavorites(state, action) {
      state.items = action.payload;
      console.log('Tryinggggggg', state.items);
    },
    addFavorite(state, action) {
      console.log('action payload', action.payload);

      const {label} = action.payload.recipe.recipe;
      console.log('hiiii', label);
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
      console.log('acttttion', state.items);
      console.log('acttttionpayload', action.payload);
      const dish = action.payload.recipeLabel;
     
      console.log('Updated favorites before removal:', state.items);
      state.items = state.items.filter(item => {
        console.log('itemlabelcheck', item.recipe.recipe.label);
        console.log('labelcheck', dish.recipe.label);
    
       
        return item.recipe.recipe.label !== dish.recipe.label;
      });
      console.log('Updated favorites after removal:', state.items);
    },
  },
});

export const {addFavorite, removeFavorite, setFavorites} =
  favoritesSlice.actions;
export default favoritesSlice.reducer;
