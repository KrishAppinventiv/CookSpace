import {StyleSheet} from 'react-native';
import {vh, vw} from '../../theme/dimensions';
import {colors} from '../../theme';

export default StyleSheet.create({
    addIconText: {
        fontSize: vh(17),
        fontWeight: '500',
        marginLeft: vw(10),
      },
      addicon: {
        height: vh(25),
        width: vh(25),
      },
      add: {
        marginTop: vh(15),
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
      },
      recipedesc: {
        fontSize: vh(22),
        fontWeight: '500',
      },
      detail: {
        marginTop: vh(25),
        marginHorizontal: vw(20),
      },
      halfText: {
        fontSize: vh(17),
        fontWeight: '400',
      },
      middle: {
        justifyContent: 'center',
        alignItems: 'center',
      },
      halfContain: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: vw(20),
        marginTop: vh(20),
      },
      scroll: {},
      gallery: {
        marginRight: vw(7),
        height: vh(26),
        width: vw(26),
      },
      uploadRecip: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      },
      options: {
        height: 30,
        width: 30,
        marginRight: vw(8),
      },
      header: {
        height: vh(60),
        backgroundColor: colors.main,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
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
        fontSize: vh(17),
        fontWeight: '500',
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
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        alignSelf: 'center',
      },
      back: {
        height: vh(33),
        width: vw(33),
        marginLeft: vw(10),
      },
      ImageView: {
        width: vw(35),
        height: vh(35),
        borderRadius: 20,
    
        backgroundColor: '#A9A9A9',
    
        justifyContent: 'center',
        alignItems: 'center',
      },
      blackOverlap: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,.7)',
      },
      inputContainer: {
        padding: 10,
        marginHorizontal: vw(20),
        borderRadius: vh(17),
        borderColor: colors.main,
        borderWidth: 2,
        backgroundColor: colors.white,
        marginTop: vh(30),
        opacity: 0.8,
      },
      ingredientContainer: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginHorizontal: vw(10),
        borderRadius: vh(17),
        borderColor: colors.main,
        borderWidth: 2,
        backgroundColor: colors.white,
        marginTop: vh(20),
        opacity: 0.8,
      },
      input: {
        alignItems: 'center',
        padding: 10,
        color: 'black',
        fontSize: vh(15),
      },
      inputs: {
        alignItems: 'center',
        padding: 10,
        color: 'black',
        fontSize: vh(15),
      },
      inputContainers: {
        padding: 10,
        justifyContent: 'center',
        borderColor: colors.main,
        borderWidth: 2,
        borderRadius: vh(17),
        width: vw(200),
        backgroundColor: colors.white,
    
        opacity: 0.8,
      },
      text: {
        fontSize: vh(15),
        fontWeight: '600',
        color: 'white',
      },
    
      touch: {
        marginTop: vh(25),
        marginHorizontal: vw(80),
        paddingVertical: vh(12),
        backgroundColor: '#129575',
        borderRadius: vh(30),
        justifyContent: 'center',
        alignItems: 'center',
      },
})