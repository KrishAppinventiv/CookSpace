import {StyleSheet} from 'react-native';
import {vh, vw} from '../../theme/dimensions';
import {colors} from '../../theme';

export default StyleSheet.create({
    filtText: {
        color: colors.white,
        fontWeight: '600',
        fontSize: vh(15),
      },
      filtButton: {
        backgroundColor: colors.main,
        marginHorizontal: vw(60),
        marginTop: vh(30),
        padding: 20,
        borderRadius: vh(30),
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: vh(20),
      },
      flatMargin: {
        marginHorizontal: vw(14),
      },
      flatView: {
        marginHorizontal: vw(14),
      },
      dishTyp: {
        marginTop: vh(20),
        marginStart: vw(13),
        fontSize: vh(16),
        fontWeight: '700',
      },
      scroll: {
        paddingBottom: vh(30),
      },
      filterText: {
        fontSize: vh(17),
        fontWeight: '600',
      },
      textHist: {
        alignSelf:'center',
      },
      load: {
        
       
        marginHorizontal: vw(20),
        paddingBottom: vh(140),
        marginVertical:vh(20)
      },
      response: {
        fontSize: 20,
        fontWeight: '600',
      },
      filterImg: {
        height: vh(25),
        width: vw(25),
      },
      search: {
        height: vh(25),
        width: vw(25),
        tintColor: '#D9D9D9',
      },
      boxView: {
        flexDirection: 'row',
        marginHorizontal: vw(20),
        marginTop: vh(30),
      },
      head: {
        textAlign: 'center',
        fontSize: vh(23),
        fontWeight: '600',
        alignSelf: 'center',
      },
      mainView: {
        justifyContent: 'center',
      },
      star: {
        height: 15,
        width: 15,
      },
      filtertext: {
        color: colors.main,
        fontWeight: '300',
      },
      container: {
        flex: 1,
        backgroundColor: 'white',
      },
      ImageView: {
        width: vw(35),
        height: vh(35),
        borderRadius: 20,
    
        backgroundColor: '#E8E8E8',
    
        marginLeft: 20,
        justifyContent: 'center',
        alignItems: 'center',
      },
      back: {
        height: vh(30),
        width: vw(20),
        marginStart: vw(10),
      },
      searchBox: {
        width: vw(265),
        height: vh(50),
        paddingHorizontal: vw(10),
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#D9D9D9',
        backgroundColor: 'white',
      },
    
      filter: {
        width: vw(50),
        height: vh(50),
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: vw(20),
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#D9D9D9',
        backgroundColor: colors.main,
      },
      columnWrapper: {
        justifyContent: 'space-between',
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
      modalView: {
        width: '100%',
        height: '50%',
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 0,
        borderTopEndRadius: vh(20),
        borderTopStartRadius: vh(20),
      },
      modalHeader: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: vh(20),
        paddingBottom: vh(10),
      },
      filterItem: {
        marginRight: vh(20),
    
        marginTop: vh(12),
        paddingHorizontal: vh(20),
        paddingVertical: vh(10),
        borderWidth: 1,
        borderColor: colors.main,
        borderRadius: vh(10),
      },
      filterItems: {
        marginRight: vh(13),
    
        marginTop: vh(12),
        paddingHorizontal: vh(13),
        paddingVertical: vh(10),
        borderWidth: 1,
        borderColor: colors.main,
        borderRadius: vh(10),
      },
      nosearchView:{
        
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      nosearchImg:{
        
          height:vh(100),
          width:vh(100),
      
      },
      nosearchText:{
        textAlign:'center',
        fontSize:vh(24),
        fontWeight:'600',
        color:colors.main,
        marginTop:vh(30),
        fontFamily:'Poppins',
      }
})