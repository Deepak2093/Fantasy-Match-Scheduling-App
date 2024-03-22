import { View, Text ,TouchableOpacity} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
  } from 'react-native-responsive-screen';
  import Icon from 'react-native-vector-icons/Ionicons';

const CustomHeader = ({title}) => {
    const navigation = useNavigation();

  return (
    <View
    style={{
      backgroundColor: '#edf0fc',
      height: hp(7),
      elevation: 5,
      paddingHorizontal: 10,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
    }}>
    <TouchableOpacity
      onPress={() => {
        navigation.goBack();
      }}
      style={{paddingHorizontal: 10}}>
      <Icon name="arrow-back" size={25} color={'black'} />
    </TouchableOpacity>
    <Text
      style={{
        color: 'black',
        fontSize: 18,
        marginLeft: 10,
        fontWeight: '600',
      }}>
     {title}
    </Text>
  </View>
  )
}

export default CustomHeader