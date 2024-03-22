import {View, Text, TouchableOpacity, StyleSheet, ScrollView, FlatList, Alert} from 'react-native';
import React, { useEffect, useState } from 'react';
import CustomModal from '../../components/CustomModal';
import moment from 'moment';
import Iconn from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import data from '../../data';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { updateSlot } from '../../redux/ScheduleSlice';
import CustomHeader from '../../components/CustomHeader';

const EditScreen = ({route}) => {
  const navigation = useNavigation();
const dispatch=useDispatch()
//   console.log('Samriti dei-->', route.params);
  const item = route.params.item;
  console.log('Checkalldata-->', item);
  console.log('Samriti deiTime-->', item.myTimeSlot);
  const [selectedItems, setSelectedItems] = useState(item.myTimeSlot);
  const dataList = useSelector(state => state.schedule.slot);
  const Id=item.Id;
// Update slots

  const toggleItemSelection = itemId => {


    const checkArr = dataList.filter(item => item.date == item.date);
    checkArr.map((item, index) => {
      if (item.date == item.date) {
        if (item.myTimeSlot.includes(itemId.time))
          Alert.alert('Please use another slot this slot already is booked');
        // setDisable(itemId.id);
      }
    });



    const index = selectedItems.indexOf(itemId.time);

    if (index === -1) {
      // Item not selected, add it to the selection
      setSelectedItems([...selectedItems, itemId.time]);
    } else {
      // Item already selected, remove it from the selection
      const updatedSelection = [...selectedItems];
      updatedSelection.splice(index, 1);
      setSelectedItems(updatedSelection);
    }
    console.log('Deeeeeeeeee---> ', selectedItems);
  };



  const arr = [];
  data.map((item, index) => {
    if (selectedItems.includes(item.id)) {
      // setTimeSlot(item.time)
      console.log("nanaji -->",item.time);
      arr.push(item.time);
    }
  });
  return (
    <View style={{backgroundColor: '#edf0fc', flex: 1}}>
     <CustomHeader title={'Update Your Time'}/>
      <View style={styles.container}>
        <Text style={styles.header}>Update your time according to match</Text>
        <View
          style={{
            backgroundColor: '#1a1813',
            borderRadius: 20,
            width: wp(80),
            marginVertical: 10,
            justifyContent: 'center',
            alignItems: 'center',
            height: hp(8),
            alignSelf:'center'
          }}>
          <Text style={{fontSize: 18, color: 'white'}}>{item.name}</Text>
          <View style={{flexDirection:'row'}}>
            <Text style={{color: 'white'}}>{item.date}</Text>
            <Text style={{color: 'white'}}>{'  -  '+item.enddate}</Text>
          </View>
        </View>
        {/* Showing the list of time slots*/}
          <FlatList
            data={data}
            renderItem={({item})=>(
              <View style={styles.flatListItem}>
                <TouchableOpacity
                  onPress={() => {
                    // setCurrentItem(item)
                    toggleItemSelection(item);
                  }}>
                  <View style={[styles.itemContainer,{backgroundColor:selectedItems.includes(item.time) ?'transparent':'#60b8f7'}]}>
                    <Text style={styles.itemText}>{item.time}</Text>
                  </View>
                </TouchableOpacity>
                {selectedItems.includes(item.time) ?<Iconn name='check' size={22} color={'black'}/>:<Text 
                style={{color:'white'}}>. </Text>}
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
// updating slot with Reference of Id

dispatch(updateSlot(
 { Id,
  selectedItems}
  ))
  navigation.goBack()
}} >
          <Text style={{color: 'white', fontSize: 18}}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EditScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 20,
    width: wp(90),
    elevation: 5,
    paddingHorizontal: 5,
    alignSelf: 'center',
    marginTop: hp(5),
    flex: 1,
  },
  header: {
    color: 'black',
    fontSize: 18,
    fontWeight: '600',
    alignSelf: 'center',
  },
  button: {
    backgroundColor: '#3884e0',
    alignSelf: 'center',
    width: wp(45),
    height: hp(5.5),
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 20,
    // marginTop:5
  },
  flatListItem: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    // backgroundColor:'red',
    marginTop:1
  },
  itemContainer: {
    marginTop: 6,
    borderRadius: 8,
    padding: 10,
    width: wp(70),
    borderWidth: 0.5,
  },
  itemText: {
    fontSize: 18,
    color: 'black',
  },
});