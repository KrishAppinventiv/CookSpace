import {StyleSheet} from 'react-native';
import {vh, vw} from '../../theme/dimensions';
import {colors} from '../../theme';

export default StyleSheet.create({
    main: {
        marginTop: vh(20),
        marginHorizontal: vw(20),
        marginVertical: vh(20),
        paddingBottom:vh(30)
      },
      container: {
        flex: 1,
        backgroundColor: 'white',
      },
      columnWrapper: {
        justifyContent: 'space-between',
      },
      recipeImage: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
      },
      recipeTitle: {
        fontSize: 16,
        fontWeight: '700',
        marginTop: vh(10),
        color: 'white',
      },
      recipeSource: {
        fontSize: 12,
        fontWeight: '500',
        color: '#F0F0F0',
        marginTop: vh(4),
      },
      transparentView: {
        height: '100%',
        width: '100%',
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,.3)',
        justifyContent: 'flex-end',
        paddingBottom: vh(15),
        paddingStart: vw(10),
        borderRadius: 10,
      },
      point: {
        fontSize: 13,
        marginLeft: 4,
      },
      review: {
        width: 50,
        height: 23,
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: '#FFE1B3',
        borderRadius: 17,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      },
      card: {
        width: vw(160),
        height: vh(170),
        marginBottom: vh(15),
        marginRight: vw(15),
        backgroundColor: '#f9f9f9',
        justifyContent: 'flex-end',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 10,
      },
      back: {
        height: vh(30),
        width: vw(20),
        marginStart: vw(10),
      },
})