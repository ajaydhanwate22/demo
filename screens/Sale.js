import { StyleSheet, View, Pressable, ScrollView, TouchableOpacity, Image, Modal, TextInput, Alert, ActivityIndicator, Animated, Easing, PermissionsAndroid, Platform, } from 'react-native'
import React, { useState, useEffect, useCallback, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Searchbar, Text, Button } from 'react-native-paper';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from 'react-native-geolocation-service';
import Geocoding from 'react-native-geocoding';
import DateTimePicker from '@react-native-community/datetimepicker';
import LinearGradient from 'react-native-linear-gradient';
import HomeHeader from '../components/HomeHeader';
import { useRoute } from '@react-navigation/native';



const Sale = ({ navigation }) => {



  
    // Fetch login Store Id   LoginStore
    const [LoginRole, setLoginRole] = useState(null);
    const [loading, setLoading] = useState(false);
    const [LoginId, setLoginId] = useState(null);

    useEffect(() => {
        // Retrieve the saved username from AsyncStorage
        AsyncStorage.getItem('LoginRole')
            .then((LoginRole) => {
                if (LoginRole) {
                    //   console.log(userId)
                    setLoginRole(LoginRole);
                }
            })
        AsyncStorage.getItem('LoginId')
            .then((LoginId) => {
                if (LoginId) {
                    //   console.log(userId)
                    setLoginId(LoginId);
                }
            })
            .catch((error) => {
                console.error('Error retrieving Login Role:', error);
            });
    });
    
  console.log('DayStart ' + LoginId)
  console.log('DayEnd ' + LoginRole)




  const [DayStartID, setDayStartID] = useState('');
  const [DayStart, setDayStart] = useState(null);
  const [DayEnd, setDayEnd] = useState(null);
  const [CustomerCount, setCustomerCount] = useState(null);
  const [DayWorkCount, setDayWorkCount] = useState(null);
  const [VehicleCount, setVehicleCount] = useState(null);
  const [DayWOrkingTime, setDayWOrkingTime] = useState('');

  const EmployeeLoginFetch = async () => {
    try {
      const response = await axios.get(`https://realrate.store/AkshayUrjaSolar/Employee_profile_details_fetch_Api.php?empID=${LoginId}`);
      // Ensure response data is an array
      const fetchedEmployeeProfile = response.data;
      // console.log('fetchedEmployeeProfile ' + fetchedEmployeeProfile.EmployeeAttendance.att_time_start)
      setDayStart(fetchedEmployeeProfile?.EmployeeAttendance?.att_time_start || null);
      setDayEnd(fetchedEmployeeProfile?.EmployeeAttendance?.att_time_end || null);
      setDayStartID(fetchedEmployeeProfile?.EmployeeAttendance?.att_id || null);
      setDayWOrkingTime(fetchedEmployeeProfile?.EmployeeAttendance?.total_time_difference || null);
    } catch (error) {
      console.error('Error fetching Customer List :', error);
    }
  };
  useEffect(() => {
    EmployeeLoginFetch(); // Assuming fetchProducts is defined and accepts city as a parameter
  });

  const CountFetch = async () => {
    try {
      const response = await axios.get(`https://realrate.store/AkshayUrjaSolar/UniqueNUmberFetchApi.php?loginID=${LoginId}&loginrole=${LoginRole}`);
      // Ensure response data is an array
      const fetchedCounts = response.data;
      // console.log('fetchedCounts ' + );
      setCustomerCount(fetchedCounts.customerCount);
      setDayWorkCount(fetchedCounts.DailyCount);
      setVehicleCount(fetchedCounts.VehicleCount);
    } catch (error) {
      console.error('Error fetching Counts :', error);
    }
  };
  useEffect(() => {
    CountFetch(); // Assuming fetchProducts is defined and accepts city as a parameter
  });
  console.log('DayStart ' + DayStart)
  console.log('DayEnd ' + DayEnd)











  const [TodayTaskDesc, setTodayTaskDesc] = useState('');

  const handleToTaskSubmit = async () => {
    try {
      setLoading(true); // Uncomment this to show loading indicator
      const formData = new FormData();

      console.log('formData' + formData);
      formData.append('taskDate', formatDate(startDate));
      formData.append('TodayTaskDesc', TodayTaskDesc);
      formData.append('LoginId', LoginId);
      formData.append('LoginRole', LoginRole);

      const response = await axios.post('https://realrate.store/AkshayUrjaSolar/Add_Today_Task_Api.php', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });


      console.log(response.data)
      if (response.data.ErrMessage) {
        Alert.alert("Warning ", response.data.ErrMessage)
      } else {
        console.log('employee Info ' + response.data);
        hideStartModal();
        setTodayTaskDesc('');
        TodayTaskListFetch();

        Alert.alert("Message", `Your Task Added`);

      }
      // Handle the response
    } catch (error) {
      console.error('Signup failed:', error.message);
      Alert.alert('Error Message', error.message);
    } finally {
      setLoading(false); // Uncomment this to hide loading indicator
    }
  };

  const [TodayTaskList, setTodayTaskList] = useState([]);
  const TodayTaskListFetch = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`https://realrate.store/AkshayUrjaSolar/Today_Task_Fetch_Api.php`);
      // Ensure response data is an array
      const fetchedCustomers = Array.isArray(response.data) ? response.data : [];
      setTodayTaskList(fetchedCustomers);

    } catch (error) {
      console.error('Error fetching Customer List :', error);
    } finally {
      setLoading(false)
    }
  };
  useEffect(() => {
    TodayTaskListFetch(); // Assuming fetchProducts is defined and accepts city as a parameter
  }, []);



  const [StartVisible, setStartVisible] = useState(false);

  const showStartModal = () => setStartVisible(true);
  const hideStartModal = () => setStartVisible(false);

  const [startDate, setStartDate] = useState(new Date(new Date()));
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState('date');
  const [activeInput, setActiveInput] = useState(null);

  const formatDates = (dateString) => {
    const date = new Date(dateString);
    const day = (`0${date.getDate()}`).slice(-2); // Ensure two digits
    const month = (`0${date.getMonth() + 1}`).slice(-2); // Months are 0-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = (`0${date.getDate()}`).slice(-2); // Ensure two digits
    const month = (`0${date.getMonth() + 1}`).slice(-2); // Months are 0-based
    const year = date.getFullYear();
    return `${year}/${month}/${day}`;
  };


  // Show the date picker
  const showDatePicker = (inputType) => {
    setActiveInput(inputType); // Set active input (start or end)
    setShow(true);
    //   setMode('date');
  };

  // Handle date picker change
  const onChange = (event, selectedDate) => {
    setShow(false); // Close date picker
    if (selectedDate) {
      if (activeInput === 'start') {
        setStartDate(selectedDate); // Update start date
      }
    }
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    let hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12 || 12; // Convert to 12-hour format
    return `${hour}:${minutes} ${ampm}`;
  };

  // console.log('startDate '+ startDate)
  return (
    <SafeAreaView style={styles.PageContainer}>
      <Pressable style={{ width: "100%", height: "8%", marginBottom: 25 }}>

        <HomeHeader />
      </Pressable>

      {LoginRole != 'customer' && (
        <Pressable style={{ width: "100%", height: "92%" }}>

          <Pressable style={{ width: "90%", height: "12%", alignSelf: "center", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <View style={{ width: "30%", height: "100%", }}>
              <TouchableOpacity onPress={() => navigation.navigate('CustomerList')} style={{ width: "100%", height: "100%" }}>
                <LinearGradient
                  colors={['#ffde59', '#ff914d']} // Gradient colors
                  start={{ x: 0, y: 0 }} // Start at the left
                  end={{ x: 1, y: 0 }}   // End at the right
                  style={{ width: "100%", height: "100%", borderRadius: 10 }} // Style for gradient
                >
                  <View style={{ width: "100%", height: "100%", justifyContent: "center", alignItems: "center", paddingTop: 15, display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
                    <Text style={{ fontSize: 17, fontWeight: "800", width: "50%", height: "40%", textAlign: "center", verticalAlign: "middle" }}><FontAwesome6 name='users' size={25} color='black' /></Text>
                    <Text style={{ fontSize: 18.1, fontWeight: "600", width: "50%", height: "40%", textAlign: "center", verticalAlign: "middle" }}>{CustomerCount}</Text>
                    <Text style={{ fontSize: 16.5, fontWeight: "bold", width: "100%", height: "35%", textAlign: "center", verticalAlign: "middle",marginTop:10 }}>Customer</Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            </View>
            <View style={{ width: "30%", height: "100%", }}>
              <TouchableOpacity onPress={() => navigation.navigate('DailyTaskSelf', {LoginId,LoginRole})} style={{ width: "100%", height: "100%" }}>
                <LinearGradient
                  colors={['#ffde59', '#ff914d']} // Gradient colors
                  start={{ x: 0, y: 0 }} // Start at the left
                  end={{ x: 1, y: 0 }}   // End at the right
                  style={{ width: "100%", height: "100%", borderRadius: 10 }} // Style for gradient
                >
                  <View style={{ width: "100%", height: "100%", justifyContent: "center", alignItems: "center", paddingTop: 15, display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
                    <Text style={{ fontSize: 17, fontWeight: "800", width: "50%", height: "40%", textAlign: "center", verticalAlign: "middle" }}><Ionicons name='document-text-sharp' size={25} color='black' /></Text>
                    <Text style={{ fontSize: 18.1, fontWeight: "500", width: "50%", height: "40%", textAlign: "center", verticalAlign: "middle" }}>{DayWorkCount}</Text>
                    <Text style={{ fontSize: 16.5, fontWeight: "bold", width: "100%", height: "35%", textAlign: "center", verticalAlign: "middle",marginTop:10 }}>Day Work</Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            </View>
            <View style={{ width: "30%", height: "100%", }}>
              <TouchableOpacity onPress={() => navigation.navigate('VehicleList', {LoginId,LoginRole})} style={{ width: "100%", height: "100%" }}>
                <LinearGradient
                  colors={['#ffde59', '#ff914d']} // Gradient colors
                  start={{ x: 0, y: 0.5 }} // Start at the left
                  end={{ x: 1, y: 0.5 }}   // End at the right
                  style={{ width: "100%", height: "100%", borderRadius: 10 }} // Style for gradient
                >
                  <View style={{ width: "100%", height: "100%", justifyContent: "center", alignItems: "center", paddingTop: 15, display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
                    <Text style={{ fontSize: 17, fontWeight: "800", width: "50%", height: "40%", textAlign: "center", verticalAlign: "middle" }}><FontAwesome name='car' size={25} color='black' /></Text>
                    <Text style={{ fontSize: 18.1, fontWeight: "500", width: "50%", height: "40%", textAlign: "center", verticalAlign: "middle" }}>{VehicleCount}</Text>
                    <Text style={{ fontSize: 16.5, fontWeight: "bold", width: "100%", height: "35%", textAlign: "center", verticalAlign: "middle",marginTop:10 }}>Vehicle </Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </Pressable>
          <Pressable style={{ width: "90%", height: "85%", alignSelf: "center", marginTop: 20 }}>


            {/* Add Customer Button */}
            <TouchableOpacity onPress={showStartModal} style={{ width: "100%", alignSelf: "center", display: "flex", flexDirection: "row", height: 30, alignItems: "center", marginBottom: 20 }}>
              <Text style={{ backgroundColor: "#f01a05", width: 25, textAlign: "center", height: 25, verticalAlign: "middle", borderRadius: 50 }}>
                <Feather name='plus' size={22} color='#d9d9d9' />
              </Text>
              <Text style={{ fontSize: 13, color: "#000", fontWeight: "600", marginLeft: 7 }}>Add To Do List</Text>
            </TouchableOpacity>

            <ScrollView style={{ width: "100%", overflow: "scroll" }} contentContainerStyle={{ paddingVertical: 10 }} scrollToOverflowEnabled={true} scrollEnabled={true}>
              {loading ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 800 }}>
                  <ActivityIndicator size="large" color="#0000ff" />
                  <Text>Loading...</Text>
                </View>
              ) : TodayTaskList.length > 0 ? (
                TodayTaskList.map((item, index) => (
                  <View style={{ width: "100%", borderBottomWidth: 1, borderColor: "#000000", padding: 5, display: "flex", flexDirection: "row", flexWrap: "wrap", alignSelf: "center" }}>
                    <Text key={index} style={{ fontSize: 14, fontWeight: "bold", color: "#000", lineHeight: 30, width: "100%" }}>{item.task_Desc}</Text>
                    <Text key={index} style={{ fontSize: 12, fontWeight: "500", color: "#f01a05", width: "50%" }}>{formatDates(item.tt_date)}</Text>
                    <Text key={index} style={{ fontSize: 12, fontWeight: "500", color: "#f01a05", width: "50%", textAlign: "center" }}>{formatTime(item.tt_time)}</Text>

                  </View>
                )
                )
              ) : (
                <Text style={{ fontSize: 14, fontWeight: "600", color: "#000" }}>There's No Today Task          </Text>

              )}

              {/* Add Daily Tast  Start Modal */}

              <Modal visible={StartVisible} style={{ width: "100%", height: "100%", backgroundColor: "#000" }}>

                <Pressable style={{ width: "90%", height: 100, alignSelf: "center", display: "flex", flexDirection: "row" }}>
                  <View style={{ width: "80%", height: "100%", justifyContent: "center", }}>
                    <Text style={{ fontSize: 18, color: "#f01a05", fontWeight: "bold" }}>Add To Daily Working</Text>
                  </View>
                  <TouchableOpacity onPress={() => hideStartModal()} style={{ width: "20%", height: "100%", justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ fontSize: 33, color: "#000", fontWeight: "400" }}>x</Text>
                  </TouchableOpacity>
                </Pressable>

                <View style={{ width: "90%", alignSelf: "center" }}>
                  <TextInput style={styles.customerInput}
                    placeholder='Date' placeholderTextColor='#000' onPressIn={() => showDatePicker('start')} value={formatDates(startDate)} />
                  <TextInput placeholder='Today Work' placeholderTextColor='#000' multiline={true} onChangeText={(text) => setTodayTaskDesc(text)} value={TodayTaskDesc} style={{ backgroundColor: "#fff", borderWidth: 1, width: "100%", borderRadius: 5, marginTop: 5, marginBottom: 5, paddingLeft: 15, height: 130 }} />
                  <View style={{ width: "100%", height: 45, alignSelf: "flex-end", marginTop: 100 }}>
                    <TouchableOpacity onPress={() => handleToTaskSubmit()} style={styles.btn}>
                      <Text style={{ color: "#000", fontWeight: "700", fontSize: 14 }}>Submit</Text>
                    </TouchableOpacity>
                  </View>

                </View>
                {show && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={activeInput === 'start' ? startDate || new Date() : endDate || new Date()} // Ensure valid date is passed
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onChange} // Handle the change
                  />
                )}
              </Modal>

              {/* Add daily Task  Start Modal */}
            </ScrollView>
          </Pressable>
        </Pressable>
      )}

















    </SafeAreaView>
  )
}

export default Sale

const styles = StyleSheet.create({
  PageContainer: { backgroundColor: "#fff", height: "100%" },
  logo: { width: "50%", height: 80, marginTop: 15 },
  daystartBTn: { width: "100%", justifyContent: "center", alignItems: "center", backgroundColor: "red", borderRadius: 50, height: 30, },
  customerInput: { backgroundColor: "#fff", borderWidth: 1, width: "100%", borderRadius: 5, marginTop: 5, marginBottom: 5, paddingLeft: 15 },
  btn: { width: "100%", height: "100%", backgroundColor: "#f2be25", borderWidth: 1, borderColor: "#000", borderRadius: 6, justifyContent: "center", alignItems: "center" },



})