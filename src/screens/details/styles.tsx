import {StyleSheet} from 'react-native';
import {vh, vw} from '../../theme/dimensions';
import {colors} from '../../theme';

export default StyleSheet.create({
    review: {
    fontSize: 18,
    fontWeight: '600',
    color: '#A9A9A9',
    fontFamily: 'Poppins',
  },
  flatView: {
    marginHorizontal: vw(20),
    marginTop: vh(8),
  },
  flatText: {
    marginStart: vw(20),
    fontSize: vh(16),
    fontWeight: '600',
    color: 'white',
  },
  labelText: {
    fontSize: 22,
    fontWeight: '600',
    color: 'black',
    width: '60%',
  },
  ingredient: {
    backgroundColor: '#7A9E9F',
    marginBottom: vh(10),
    justifyContent: 'center',
    paddingTop: vh(28),
    paddingBottom: vh(28),
    borderRadius: 10,
    shadowColor: 'rgba(0,0,0,.3)',
    shadowOpacity: 5,
  },
  category: {
    backgroundColor: colors.white,

    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    paddingHorizontal: vh(25),
    paddingVertical: vw(10),
  },
  left: {
    marginLeft: 10,
  },
  locView: {
    flexDirection: 'row',
    marginTop: 5,
  },
  chef: {
    fontSize: 18,
    fontWeight: '600',
  },
  locImg: {
    height: 29,
    width: 29,
    marginRight: 6,
  },
  locText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#A9A9A9',
  },
  followText: {
    color: 'white',
    fontSize: 17,
    fontWeight: '700',
  },
  followView: {
    paddingHorizontal: 30,
    backgroundColor: colors.main,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    opacity: 0.9,
  },
  chefContain: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chefImg: {
    height: 40,
    width: 40,
    borderRadius: 25,
  },
  mainContain: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 20,
    marginHorizontal: 20,
  },

  tooltipContainer: {
    position: 'absolute',
    top: vh(50),
    right: vw(20),
    backgroundColor: 'white',
    padding: vh(10),
    borderRadius: 8,
    shadowColor: 'rgba(0,0,0,.3)',
    shadowOpacity: 10,
    elevation: 5,
  },
  tooltipItem: {
    paddingVertical: vh(10),
    paddingHorizontal: vw(15),
    flexDirection: 'row',
  },
  tooltipText: {
    fontSize: 17,
    color: colors.black,
    fontWeight: '500',
    fontFamily: 'Poppins',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  main: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 20,
  },
  saveView: {
    height: 33,
    width: 33,
    backgroundColor: 'white',
    justifyContent: 'center',
    borderRadius: 18,
  },
  save: {
    height: 23,
    width: 23,
    alignSelf: 'center',
  },
  prepare: {
    color: 'white',
    fontSize: 17,
    marginRight: 10,
  },
  timer: {
    height: 22,
    width: 22,
    marginRight: 5,
  },
  minView: {
    flexDirection: 'row',
    marginTop: 5,
  },
  timeView: {
    bottom: 7,
    position: 'absolute',
    right: 10,
    flexDirection: 'row',
    marginBottom: 20,
  },
  back: {
    height: 32,
    width: 32,
  },
  ImageView: {
    width: vh(35),
    height: vh(35),
    borderRadius: 20,
    position: 'absolute',
    backgroundColor: '#A9A9A9',
    top: vh(41),
    left: vw(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  blackOverlap: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,.5)',
  },
  headDish: {
    width: '100%',
    height: '38%',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  banner: {
    width: '100%',
    height: '100%',
  },
  typeItem: {
    
    marginTop: vh(25),
    paddingBottom: vh(10),
  },})