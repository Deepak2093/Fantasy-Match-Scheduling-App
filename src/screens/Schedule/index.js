import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  TextInput,
  StyleSheet,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import CalendarPicker from 'react-native-calendar-picker';
import {useDispatch, useSelector} from 'react-redux';
import {addUserSchedule} from '../../redux/ScheduleSlice';
import data from '../../data';
import uuid from 'react-native-uuid';
import {useNavigation} from '@react-navigation/native';
const Schedule = () => {
  const [showModal, setModal] = React.useState(false);
  const [disable, setDisable] = useState(false);
  const [enddate, setEndDate] = useState();
  const [name, setName] = useState('');
  const [error, setError] = useState(false);
  const [date, setDate] = useState('');
  const [myTimeSlot, setMyTimeSlot] = useState();
  const [selectedItems, setSelectedItems] = useState([]);

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const dataList = useSelector(state => state.schedule.slot);
  // here we are creating unique Id using uuid library
  const Id = uuid.v4();

  const toggleItemSelection = itemId => {
    const checkArr = dataList.filter(item => item.date == date);
    checkArr.map((item, index) => {
      if (item.date == date) {
        if (item.myTimeSlot.includes(itemId.time))
          Alert.alert('Please use another slot this slot already is booked');
        setDisable(itemId.id);
      }
    });

    const index = selectedItems.indexOf(itemId.id);

    if (index === -1) {
      // Item not selected, add it to the selection
      setSelectedItems([...selectedItems, itemId.id]);
    } else {
      // Item already selected, remove it from the selection
      const updatedSelection = [...selectedItems];
      updatedSelection.splice(index, 1);
      setSelectedItems(updatedSelection);
    }
    console.log('Rao ', selectedItems);
  };

  const arr = [];
  data.map((item, index) => {
    if (selectedItems.includes(item.id)) {
      // setTimeSlot(item.time)
      console.log(item.time);
      arr.push(item.time);
    }
  });

  onChangeDate = (date, type) => {
    // getting start and end date from user
    if (type === 'END_DATE') {
      console.log('endtime ', date);
      setEndDate(moment(date).format('MMMM Do YYYY'));
    } else {
      console.log('startTime ', date);
      console.log('serializefirst-->', moment(date).format('MMMM Do YYYY'));
      setDate(moment(date).format('MMMM Do YYYY'));
    }
  };

  const validate = () => {
    let valid = true;

    if (!date || !name || selectedItems.length === 0) {
      valid = false;
      setError(true); // This can be used to highlight the missing fields in the UI
    }

    return valid;
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.calendarView}>
        {/* here we are using calendar from calendar picker */}
        <CalendarPicker
          // selectedStartDate={date}
          // selectedEndDate={'2024-03-31'}
          // weekdays={['Mon']}
          scaleFactor={375}
          minDate={new Date()}
          maxDate={new Date(2025, 5, 30)}
          previousTitle="Previous"
          nextTitle="Next"
          selectedDayColor="#87de9e"
          selectedDayTextColor="black"
          allowRangeSelection={true}
          todayBackgroundColor="#f2e6ff"
          todayTextStyle={{color: '#333333'}}
          dayShape="circle"
          textStyle={{
            fontFamily: 'Cochin',
            color: 'black',
          }}
          onDateChange={(date, type) => onChangeDate(date, type)}
        />
      </View>

      <View style={{height: hp(1.5)}} />
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Schedule Your Match</Text>
        <View
          style={[
            styles.teamNameView,
            {marginVertical: 10, paddingVertical: 10},
          ]}>
          <Text style={styles.topTexts}>Selected Date</Text>

          <Text style={{fontSize: 16, color: 'black'}}>
            {date ? date : 'Select Your Date from calendar'}
            {enddate ? '  -  ' + enddate : ''}
          </Text>
        </View>
        <View style={styles.teamNameView}>
          <Text style={styles.topTexts}>Team Name</Text>
          <TextInput
            style={{
              height: hp(5),
              color: 'black',
              padding: 5,
            }}
            placeholder="Enter your team name"
            onChangeText={text => {
              setName(text);
            }}
          />
        </View>
        <View style={[styles.teamNameView, {marginVertical: 7}]}>
          <Text style={styles.topTexts}>Select a time slot</Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
            <TouchableOpacity
              style={{
                backgroundColor: '#3884e0',
                paddingHorizontal: 10,
                borderRadius: 8,
              }}
              onPress={() => {
                setModal(true);
              }}>
              <Icon
                name="clock-time-four-outline"
                size={25}
                style={{paddingVertical: 8}}
              />
            </TouchableOpacity>
            {myTimeSlot !== undefined ? (
              <ScrollView
                style={{
                  width: wp(40),
                }}>
                {myTimeSlot.map((item, index) => {
                  return (
                    <View key={index} style={styles.slots}>
                      <Text>{item}</Text>
                    </View>
                  );
                })}
              </ScrollView>
            ) : null}
          </View>
        </View>
      </View>
      {/* Using Modal---------> */}
      <Modal
        visible={showModal}
        animationType="slide"
        //  presentationStyle='pageSheet'
        transparent={true}
        onRequestClose={() => {
          setModal(false);
        }}
        style={{height: hp(8)}}>
        <View style={styles.slotListView}>
          <Text style={[styles.topTexts, {color: 'black'}]}>
            Select your time according to match
          </Text>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => {
              setMyTimeSlot(arr);
              setModal(false);
            }}>
            <Text style={{color: 'white'}}>Done</Text>
          </TouchableOpacity>
          {/* Showing the list of time slots-----> */}
          <ScrollView style={{backgroundColor: 'white', marginVertical: 10}}>
            {data.map((item, index) => (
              <View
                key={index}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  // disabled={disable==item.id?true:false}
                  onPress={() => {
                    // setCurrentItem(item)
                    toggleItemSelection(item);
                  }}>
                  <View
                    style={[
                      styles.slotButton,
                      {
                        backgroundColor: selectedItems.includes(item.id)
                          ? 'transparent'
                          : '#60b8f7',
                      },
                    ]}>
                    <Text style={{fontSize: 18, color: 'black'}}>
                      {item.time}
                    </Text>
                  </View>
                </TouchableOpacity>
                {selectedItems.includes(item.id) ? (
                  <Icon name="check-bold" size={15} />
                ) : (
                  <Text style={{color: 'white'}}>.</Text>
                )}
              </View>
            ))}
          </ScrollView>
        </View>
      </Modal>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          // Saving booked slot info to the redux store

          if (validate()) {
            dispatch(
              addUserSchedule({
                Id,
                date,
                enddate,
                name,
                myTimeSlot,
              }),
            );
            navigation.navigate('Home');
          } else {
            Alert.alert('Please Fill All Data');
          }
        }}>
        <Text style={[styles.topTexts, {color: 'white'}]}>
          Schedule Team match
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Schedule;

const styles = StyleSheet.create({
  calendarView: {
    backgroundColor: 'white',
    height: hp(45),
    borderRadius: 15,
    paddingTop: 10,
  },
  card: {
    backgroundColor: 'white',
    elevation: 5,
    width: wp(85),
    alignSelf: 'center',
    padding: 15,
    borderRadius: 30,
  },
  scrollView: {flex: 1, backgroundColor: '#edf0fc', paddingHorizontal: 8},
  cardTitle: {
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: '600',
    color: 'black',
  },
  button: {
    height: hp(6),
    alignSelf: 'center',
    width: wp(60),
    backgroundColor: '#3884e0',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
    borderRadius: 20,
  },
  topTexts: {fontWeight: '600', fontSize: 16},
  teamNameView: {
    borderBottomWidth: 0.8,
    borderColor: 'gray',
    paddingVertical: 4,
  },
  slots: {
    backgroundColor: '#58c475',
    justifyContent: 'center',
    alignItems: 'center',
    height: hp(3),
    width: wp(40),
    marginTop: 2,
    borderRadius: 8,
    marginLeft: 20,
  },
  slotListView: {
    backgroundColor: '#b4fac8',
    position: 'absolute',
    alignSelf: 'center',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingVertical: 20,
    height: hp(50),
    width: wp(85),
    elevation: 5,
    paddingHorizontal: 5,
    top: hp(50),
  },
  modalButton: {
    backgroundColor: 'black',
    width: wp(30),
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 6,
    borderRadius: 10,
    marginVertical: 4,
  },
  slotButton: {
    marginTop: 6,
    borderRadius: 8,
    padding: 10,
    width: wp(70),
    borderWidth: 0.5,
  },
});
