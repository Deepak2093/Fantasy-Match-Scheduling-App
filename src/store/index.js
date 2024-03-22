import { configureStore } from "@reduxjs/toolkit";
import Schedulereducer from '../redux/ScheduleSlice'
const MyStore=configureStore({

    reducer:{
schedule:Schedulereducer
    }
})
export default MyStore;