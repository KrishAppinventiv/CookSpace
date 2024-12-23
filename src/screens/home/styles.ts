import {StyleSheet} from 'react-native';
import { vh, vw } from '../../theme/dimensions';

export default StyleSheet.create({
  recipeImg: {
    position: 'absolute',
    top: 1,
    right: 1,
    shadowColor: 'rgba(0,0, 0,.6)',
    shadowOpacity: 10,
    elevation: 10,
  },
  mins: {
    color: '#A9A9A9',
    fontSize: 15,
  },
  timer: {
    height: 19,
    width: 19,
    marginRight: 5,
  },
  innerViews: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chefText: {
    color: '#A9A9A9',
    fontSize: 15,
  },
  newImg: {
    height: 30,
    width: 30,
    borderRadius: 10,
    marginRight: 10,
  },
  innerNew: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 30,
  },
  newView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  star: {
    marginHorizontal: 1,
    marginTop: 5,
    height: 15,
    width: 15,
  },
  totle: {
    fontSize: 18,
    fontWeight: '600',
  },
  trend: {
    position: 'absolute',
    top: 1,
    shadowColor: 'rgba(0,0,0,.3)',
    shadowOpacity: 10,
    elevation: 10,
  },
  saveView: {
    height: vh(28),
    width: vw(28),
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: vh(20),
  },
  timeText: {
    color: '#A9A9A9',
  },
  min: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: vh(10),
    marginHorizontal: vw(10),
  },
  newrecipe: {
    paddingVertical: vh(50),
    backgroundColor: 'white',
    marginHorizontal: vw(10),
    justifyContent: 'flex-end',
    marginTop: vh(20),
  },
  point: {
    fontSize: 13,
    marginLeft: 4,
  },
  review: {
    width: 50,
    height: 28,
    position: 'absolute',
    top: 20,
    right: 0,
    backgroundColor: '#FFE1B3',
    borderRadius: 17,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dish: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: vh(22),
    alignSelf: 'center',
    marginTop: vh(26),
    textAlign: 'center',
    paddingHorizontal: 10,
    height: '35%',
  },
  flat: {
    backgroundColor: '#D9D9D9',
    width: '100%',

    paddingTop: vh(20),

    justifyContent: 'center',
    borderRadius: 12,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  topView: {
    height: '45%',
  },
  banner: {
    height: '100%',
    width: '100%',

    borderBottomStartRadius: vh(15),
    borderBottomEndRadius: vh(15),
  },
  transparentView: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,.4)',
    justifyContent: 'center',
    // alignItems: 'center',
    borderBottomStartRadius: vh(15),
    borderBottomEndRadius: vh(15),
  },
  searchBox: {
    
    height: vh(60),

    backgroundColor: 'white',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    marginTop: vh(50),
  },
  placeholder: {
    marginLeft: 15,
    fontSize: vh(16),
    color: '#9e9e9e',
  },
  logo: {
    fontSize: vh(30),
    color: 'white',
    // position: 'absolute',
    // top: 60,
    // left: 20,
    fontFamily: 'Poppins',
    fontWeight: '600',
  },
  cookText: {
    fontSize: vh(20),
    color: '#E6E6E6',
    // position: 'absolute',
    // top: 95,
    // left: 20,
    fontWeight: '500',
  },
  searchRecipe: {
    fontSize: vh(17),
    color: 'white',

    alignSelf: 'center',
    marginTop: vh(10),
    fontWeight: '600',
  },
  heading: {
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 20,
    marginTop: 20,
  },
  categoryItem: {
    padding: 10,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  card: {
    padding: 20,
    shadowColor: 'rgba(0,0,0,.3)',
    shadowOpacity: 6,
    elevation: 10,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  cards: {
    padding: 20,
    shadowColor: 'rgba(0,0,0,.3)',
    shadowOpacity: 6,
    backgroundColor: 'white',
    elevation: 10,
    justifyContent: 'center',
    borderRadius: 10,
  },
  categoryIcon: {
    width: 50,
    height: 50,
  },
  trendyIcon: {
    marginTop: 5,
    width: 120,
    height: 120,
    borderRadius: 60,
    elevation: 10,
  },
  newIcon: {
    marginTop: 5,
    width: 100,
    height: 100,
    borderRadius: 50,
    elevation: 10,
  },
  category: {
    fontSize: 18,
    alignSelf: 'center',
    fontWeight: '600',
    marginTop: 10,
  },

  recipeItem: {
    width: 180,
    height: 250,
    margin: 10,
    marginTop: 20,
    justifyContent: 'flex-end',
    alignItems: 'center',

    borderRadius: 10,
  },
  scroll: {
    paddingBottom: 30,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  margin:{
    marginHorizontal:vw(15)
  },
  searchImg:{
    height: vh(30), width: vw(30)
  }
});
