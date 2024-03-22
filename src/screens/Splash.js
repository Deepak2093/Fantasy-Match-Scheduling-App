import { View, Text,Image, SafeAreaView } from 'react-native'
import React from 'react'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
  } from 'react-native-responsive-screen';
  import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
const Splash = () => {

    const navigation=useNavigation();
setTimeout(()=>{
navigation.replace('Home')
},3000)

  return (
   <SafeAreaView style={{justifyContent:"center",
   alignItems:'center',flex:1,
   }}>
     <View >
        <Text style={{fontSize:35,fontWeight:'800',color:'#a81005'}}>Join Fantasy Match </Text>
     <LottieView source={require('../asset/bol.json')} autoPlay loop 
     style={{height:hp(30),width:wp(70),alignSelf:'center'}}
     />
    </View>
   </SafeAreaView>
  )
}

export default Splash