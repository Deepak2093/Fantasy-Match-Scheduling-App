import {
  View,
  Text,
  Modal,
  Touchable,
  TouchableOpacity,
  ScrollView,
  FlatList,
  StyleSheet,
} from 'react-native';
import React, {useState} from 'react';
import moment from 'moment';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import CalendarPicker from 'react-native-calendar-picker';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Iconn from 'react-native-vector-icons/MaterialCommunityIcons';
import { deleteTimeSlot } from '../../redux/ScheduleSlice';

const Home = () => {
  const navigation = useNavigation();
  const data = useSelector(state => state.schedule.slot);
  const [modal,setModal]=useState(false);
  const [Id,setId]=useState();
    const dispatch=useDispatch();
  // console.log('Heri-->', moment(data.date).format('MMMM Do'));

const deleteItem=(item)=>{
setId(item)
}


  const renderItem = ({item}) => {
    return (
      <View style={styles.mainContainer}>
        <View style={{flexDirection: 'row',
      // backgroundColor:'green',
      width:wp(88),alignItems:"center",
      justifyContent:'center'
      }}>
          <Text style={styles.teamName}>{item.name.length<25?item.name.substring(0, 25):item.name.substring(0, 25)+'...'}</Text>
         <View style={{
        flexDirection:'row',left:wp(2),
        width:wp(20),justifyContent:"space-between"
        }}>
         <TouchableOpacity
            style={styles.cardButton}
            onPress={() => {
              navigation.navigate('Edit', {item: item});
            }}>
            <Icon name="edit" size={22} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.cardButton,{borderRadius: 4}]}
            onPress={() => {
             setModal(true)
             deleteItem(item.Id)
            }}>
            <Iconn name="delete-circle-outline" size={22} />
          </TouchableOpacity>
         </View>
        </View>
        <View style={{flexDirection: 'row', marginVertical: 6}}>
          <Text style={{color: 'black'}}>
            {item.enddate ? moment(data.date).format('MMMM Do') : item.date}
          </Text>
          {item.enddate!=undefined?<Text style={{color: 'black'}}>{'  -  ' + item.enddate}</Text>:''}
        </View>
        <FlatList
          data={item.myTimeSlot}
          horizontal={true}
          renderItem={({item}) => {
            return (
              <View style={styles.innerView}>
                <Text style={{fontWeight: '600'}}>{item}</Text>
              </View>
            );
          }}
        />
      </View>
    );
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          Scheduled Matches <Iconn name="cricket" size={25} />
        </Text>
      </View>
      <View style={styles.paresntView}>
        <Text style={styles.topText}>Selected Time Slots</Text>
        {/* Showing the booked slots list for the match---> */}
        <FlatList data={data} renderItem={renderItem} style={{}} />
        <Modal visible={modal}
          animationType="slide"
          transparent={true}
          onRequestClose={() => {
            setModal(false);
          }}
        >
          <View style={{backgroundColor:"white",
         position: 'absolute',
         alignSelf: 'center',
         borderRadius:10,
         padding:20,
         height: hp(20),
         width: wp(85),
         elevation: 5,
         paddingHorizontal: 5,
         top: hp(30),
         alignItems:"center",justifyContent:'space-evenly'
        }}>
            <Text style={{
              color:'black',fontSize:18
            }}>Are you sure  you want to do that?</Text>

            <TouchableOpacity style={[styles.modalButton,{marginTop:10}]}
            onPress={()=>{
              dispatch(deleteTimeSlot(Id));
              setModal(false);
            }}
            >
              <Text style={[styles.modalButtonText,{color:'white'}]}>Remove From List</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.modalButton,{backgroundColor:'white'}]}
            onPress={setModal}
            >
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            navigation.navigate('Schedule', {});
          }}>
          <Icon name="plus" size={20} color={'white'} />
          <Text style={{color: 'white', fontWeight: '500', fontSize: 16}}>
            {' '}
            Add New
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Home;
const styles = StyleSheet.create({
  paresntView: {backgroundColor: '#edf0fc', paddingHorizontal: 10},
  topText: {fontSize: 17, fontWeight: '600', marginVertical: 8,
color:'gray'
},
  mainContainer: {
    backgroundColor: '#ac63c2',
    borderRadius: 8,
    marginTop: 6,
    height: hp(16),
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    elevation: 4,
  },
  teamName: {color: 'white', fontSize: 18, fontWeight: '600'},
  innerView: {
    marginLeft: 5,
    backgroundColor: 'white',
    height: hp(4.5),
    width: wp(40),
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: '#3884e0',
    borderRadius: 20,
    height: hp(7),

    justifyContent: 'center',
    alignItems: 'center',
    width: wp(22),
    position: 'absolute',
    top: hp(80),
    alignSelf: 'flex-end',
    right: wp(5),
  },
  header: {
    elevation: 10,
    backgroundColor: 'black',
    height: hp(7),
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {fontSize: 20, color: 'white', fontWeight: '600'},
  cardButton:{
    padding: 5,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  modalButton:{backgroundColor:'black',
  height:hp(5),width:wp(40),justifyContent:'center',
  alignItems:"center",borderRadius:10,
  },
  modalButtonText:{
fontSize:15,color:'black'
  }
});
