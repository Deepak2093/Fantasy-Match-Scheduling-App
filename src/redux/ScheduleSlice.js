import {createSlice} from '@reduxjs/toolkit';

const MySchedule = createSlice({
  name: 'scheduling',
  initialState: {
    slot: [],
  },
  reducers: {

    // Adding here new Scheduled time slot
    addUserSchedule(state, action) {
      console.log('Rana-->', action.payload);
      state.slot.push(action.payload);
    },
    // Updating Slots with reference of Id
    updateSlot(state, action) {
      const {Id, selectedItems} = action.payload;

      let index = state.slot.findIndex(slot => slot.Id == Id);
      if (index !== -1) {
        selectedItems.forEach((item)=>{
            console.log("Lal bhadur shashr=tri-->",item)
            if (state.slot[index].myTimeSlot.includes(item)==false) {
                state.slot[index].myTimeSlot.push(item);
              }
        })
      
      }
    },
    deleteTimeSlot: (state, action) => {
        state.slot = state.slot.filter(slot => slot.Id !== action.payload);
      },
  },
});
export const {addUserSchedule, updateSlot,deleteTimeSlot} = MySchedule.actions;
export default MySchedule.reducer;
