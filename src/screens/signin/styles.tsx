import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    signupColor: {
        color:'#FF9C00',
      },
      dontView: {
        flexDirection:'row',
        justifyContent:'center',
        marginTop:60,
      },
      google: {
        height:28,
        width:28,
      },
      googleView: {
        height:54,
        width:54,
        elevation:2,
        justifyContent:'center',
        alignItems:'center',
        shadowColor: '#C3C3C3',
        shadowOpacity: 5,
        shadowRadius: 3,
        backgroundColor:'white',
        borderRadius:10,
        marginHorizontal:10,
      },
      otherOption: {
        flexDirection:'row',
        justifyContent:'center',
        marginTop:40,
      },
      
      option: {
        marginHorizontal:10,
        color:'#c7c7c7',
      },
      footerView: {
        height:1,
        width:30,
        backgroundColor:'#c7c7c7',
        alignSelf:'center',
      },
      footerContain: {
        flexDirection:'row',
        justifyContent:'center',
        marginTop:40,
      },
        container: {
            flex: 1,
            backgroundColor: "#ffffff"
        },
        img: {
            marginTop: 20,
            height: 42,
            width: 120
        },
        imageContain: {
            marginTop: 10,
            marginStart: 30,
            marginBottom:40
        },
        signText: {
            color: "#000000",
            fontSize: 30,
            fontWeight: '700',
        },
    
        welText: {
            color: "#000000",
            fontSize: 23,
            fontWeight: '400',
            fontFamily:'Poppins'
        },
        blurBackground: {
            opacity: 0.6,
        },
        textContain: {
            marginTop: 40,
            marginStart: 35
        },
        greyText: {
            color: "grey",
            marginTop: 10,
            width: 270,
            fontSize: 15,
            fontWeight: '600'
        },
        input: {
            alignItems: 'center',
            padding: 10,
            color: 'black',
        },
        inputContainer: {
            padding:10,
            width: 350,
            borderRadius: 7,
            borderColor: "#ccc",
            borderWidth: 1,
            backgroundColor: 'white',
            marginBottom: 25
    
        },
    
        inputContainer1: {
            padding:10,
            width: 350,
            borderRadius: 7,
            borderColor: "#ccc",
            borderWidth: 1,
            backgroundColor: 'white',
            
    
        },
    
        textInputContain: {
            marginHorizontal: 15,
            marginTop: 75,
            alignItems:'center'
        },
        touch: { 
            marginTop: 15,
           paddingHorizontal:130,
            paddingVertical:20,
            backgroundColor: "#129575",
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center'
        },
    
        text: {
            fontSize: 18,
            fontWeight: '600',
            color: 'white'
        },
        touchContain: {
            justifyContent: 'center',
            alignItems: 'center'
        },
    
        errorText: {
            color: 'red',
            fontSize: 12,
            marginTop: 5,
            marginLeft: 10,
        },
        img2: {
            height: 16,
            width: 16,
            marginEnd: 10,
            alignItems: 'center',
        },
        passwordContain: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
        },
    
        
        signupContainer: {
            flex: 1,
            marginTop:80
        },
        errorContain:{
            height: 65,
            width: 350,
            borderRadius: 7,
            marginStart: 35,
            backgroundColor: '#ffe8e7',
           
            justifyContent:'center',
            alignItems:'center',
            marginBottom:30
        },
        redText:{
            color:"black",
            padding:10,
            fontSize:13,
            fontWeight:'400'
        },
        forget:{
        marginStart:39,
        marginTop:25,
        marginBottom:25
        },
        forgetText:{
            color:'#FFAD30',
            fontWeight:'600'
        },
    
        content:{
         marginStart:50,
         marginTop:20
            
        },
    
        instructionText:{
            paddingHorizontal:12,
            color:"grey",
            fontSize:12
        },
        instruction:{
            
            marginTop:17,
            marginBottom:10
        }
})