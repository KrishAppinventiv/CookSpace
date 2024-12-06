import {StyleSheet} from 'react-native';
import {vh, vw} from '../../theme/dimensions';
import {colors} from '../../theme';

export default StyleSheet.create({
    start: {
        fontSize:16,
        color:'white',
        fontWeight:'700',
      },
      touch: {
        backgroundColor:'#129575',
        padding:20,
        borderRadius:30,
        paddingHorizontal:40,
        marginTop:20,
      },
      tasty: {
        color:'white',
        fontSize:15,
        fontWeight:'400',
        marginTop:10,
      },
      welcome: {
        color:'white',
        fontSize:24,
        fontWeight:'700',
        fontFamily:'Georgia',
      },
      mainView: {
        flex:1,
        justifyContent:'flex-end',
        alignItems:'center',
        marginBottom:100,
      },
      premium: {
        fontSize:19,
        color:'white',
        fontWeight:'800',
      },
      head: {
        marginTop:100,
        alignItems:'center',
        justifyContent:'flex-end',
      },
    
      container:{
        flex: 1,
        
      }
    
})