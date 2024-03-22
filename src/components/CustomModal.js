import { View, Text, StyleSheet,Modal,ScrollView,TouchableOpacity } from 'react-native'
import React from 'react'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
  } from 'react-native-responsive-screen';
import data from '../data'
const CustomModal = ({visible}) => {
  return (
    <View>
        <Modal
        visible={visible}
        animationType="slide"
        //  presentationStyle='pageSheet'
        transparent={true}
        onRequestClose={() => {
        //   setModal(false);
        }}
        style={{height: hp(8)}}>
      
      </Modal>
    </View>
  )
}

export default CustomModal
const styles=StyleSheet.create({
    container:{
        backgroundColor: '#b4fac8',
        position: 'absolute',
        alignSelf: 'center',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        paddingVertical: 20,
        width: wp(85),
        elevation: 5,
        paddingHorizontal: 5,
        top: hp(10),
      },
      header:{
        color: 'black',
        fontSize: 16,
        fontWeight: '600',
        alignSelf:'center'
      },
      button:{
        backgroundColor: '#3884e0',
        width: wp(30),
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 6,
        borderRadius: 10,
      },
      scrollView:{backgroundColor: 'white', marginVertical: 10}
})