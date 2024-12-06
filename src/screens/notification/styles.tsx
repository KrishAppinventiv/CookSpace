import {StyleSheet} from 'react-native';
import {vh, vw} from '../../theme/dimensions';
import {colors} from '../../theme';

export default StyleSheet.create({
    dateText: {
        fontSize: vh(15),
        fontWeight: '600',
      },
      date: {
        backgroundColor: 'white',
        alignSelf: 'center',
        padding: 8,
        borderRadius: 5,
      },
      item: {
        color: '#71B1A1',
        fontWeight: '800',
        fontSize: 16,
      },
      source: {
        height:vh(28),
        width:vw(28),
        backgroundColor:'#FFE1B3',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:vh(10),
      },
      time: {
        color:'#A9A9A9',
        marginTop:vh(8),
        fontSize:vh(13),
      },
      desc: {
        color:'#A9A9A9',
        marginTop:vh(10),
        fontSize:vh(15),
        lineHeight:vh(22),
      },
      head: {
        fontSize:vh(17),
        fontWeight:'600',
      },
      renderView: {
        width:'95%',
      },
      heading: {
        textAlign: 'center',
        fontSize: vh(23),
        fontWeight: '600',
        alignSelf: 'center',
      },
      headed: {
        justifyContent: 'center',
        marginTop: vh(10),
      },
      container: {
        flex: 1,
        backgroundColor: 'white',
      },
      typeItem: {
        marginHorizontal: vw(12),
        marginTop: vh(25),
        paddingBottom: vh(10),
      },
      category: {
        backgroundColor: colors.white,
        width: vw(100),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        paddingHorizontal: vh(20),
        paddingVertical: vw(10),
      },
    
      card: {
       justifyContent:'space-between',
        marginBottom: vh(20),
        marginHorizontal: vw(20),
        backgroundColor: '#F0F0F0',
        flexDirection:'row',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 10,
        paddingVertical:vh(14),
        paddingHorizontal:vw(20),
        marginTop:vh(15)
      },
})