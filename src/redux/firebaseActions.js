import {getAuth} from '@react-native-firebase/auth';
import {
  addFavorite,
  removeFavorite,
  setFavorites,
} from './configure/favouriteSlice';
import {
  doc,
  getDoc,
  getFirestore,
  updateDoc,
} from '@react-native-firebase/firestore';

const db = getFirestore();

export const fetchFavoritesFromFirestore = () => async dispatch => {
  console.log('Action creator called');
  const userId = getAuth().currentUser?.uid;
  console.log('User ID:', userId);
  if (userId) {
    try {
      const userDocRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userDocRef);

      const favorites = userDoc.data().savedItems || [];
      dispatch(setFavorites(favorites));
      console.log('dispatch successfully by Firestore');
    } catch (error) {
      console.error('Error fetching favorites from Firestore: ', error);
    }
  }
};

export const addFavoriteRecipe = recipe => async dispatch => {
  const userId = getAuth().currentUser?.uid;
  if (userId) {
    try {
      const userDocRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userDocRef);

      let favorites = userDoc.exists ? userDoc.data().savedItems || [] : [];

      if (
        !favorites.some(fav => fav.recipe.recipe.label === recipe.recipe.label)
      ) {
        console.log('Entryyyyyyy');
        favorites.push({recipe});

        await updateDoc(userDocRef, {savedItems: favorites});

        dispatch(addFavorite({recipe}));
      } else {
        console.log('Recipe already exists in favorites');
      }
    } catch (error) {
      console.error('Error adding favorite recipe: ', error);
    }
  } else {
    console.log('User is not logged in');
  }
};

export const removeFavoriteRecipe = recipeLabel => async dispatch => {
  const userId = getAuth().currentUser?.uid;
  if (userId) {
    try {
      const userDocRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userDocRef);

      let favorites = userDoc.exists ? userDoc.data().savedItems || [] : [];

      if (recipeLabel && recipeLabel?.recipe && recipeLabel?.recipe?.label) {
        console.log('Remove', recipeLabel.recipe.label);
        const updatedFavorites = favorites.filter(
          fav => fav.recipe.recipe.label !== recipeLabel.recipe.label,
        );
        console.log('updatedFavorites', recipeLabel);

        await updateDoc(userDocRef, {savedItems: updatedFavorites});

        dispatch(removeFavorite({recipeLabel}));
        // console.log();
      } else {
        console.error('Invalid recipe structure', recipeLabel);
      }
    } catch (error) {
      console.error('Error removing favorite recipe: ', error);
    }
  } else {
    console.log('User is not logged in');
  }
};
