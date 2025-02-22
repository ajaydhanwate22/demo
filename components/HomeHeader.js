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

const HomeHeader = () => {

    // useNavigation should be called inside the component
    const navigation = useNavigation();

   
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


    const formatTime = (timeString) => {
        const [hours, minutes] = timeString.split(':');
        let hour = parseInt(hours, 10);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        hour = hour % 12 || 12; // Convert to 12-hour format
        return `${hour}:${minutes} ${ampm}`;
    };



    const handleToEmployeeAttendance = async () => {
        try {
            setLoading(true); // Uncomment this to show loading indicator
            const formData = new FormData();

            formData.append('LoginId', LoginId);

            const response = await axios.post('https://realrate.store/AkshayUrjaSolar/Employee_Attendance_Api.php', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });


            console.log(response.data)
            if (response.data.errmessage) {
                Alert.alert("Warning ", response.data.errmessage)
            } else {

                console.log(response.data);
                Alert.alert("Message", "Your Day Start Now");
                // navigation.navigate('SplashScreen');

            }
            // Handle the response
        } catch (error) {
            console.error('Signup failed:', error.message);
            Alert.alert('Error Message', error.message);
        } finally {
            setLoading(false); // Uncomment this to hide loading indicator
        }
    };


    const handleToEmployeeAttendanceEnd = async () => {
        try {
          setLoading(true); // Uncomment this to show loading indicator
          const formData = new FormData();
    
          formData.append('LoginId', LoginId);
          formData.append('DayStartID', DayStartID);
    
          const response = await axios.post('https://realrate.store/AkshayUrjaSolar/Employee_Attendance_end_Api.php', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          });
    
    
          console.log(response.data)
          if (response.data.errmessage) {
            Alert.alert("Warning ", response.data.errmessage);
            EmployeeLoginFetch();
          } else {
    
            console.log(response.data);
            Alert.alert("Message", "Your Day End Now");
            // navigation.navigate('SplashScreen');
            EmployeeLoginFetch()
    
          }
          // Handle the response
        } catch (error) {
          console.error('Signup failed:', error.message);
          Alert.alert('Error Message', error.message);
        } finally {
          setLoading(false); // Uncomment this to hide loading indicator
        }
      };

    const [Menuvisible, setMenuVisible] = useState(false);

    const logout = async () => {
        try {
            // Clear AsyncStorage data (user session data)
            await AsyncStorage.clear();

            // Navigate to Login screen and reset navigation stack
            navigation.reset({
                index: 0,
                routes: [{ name: 'SplashScreen' }], // Ensure 'Login' is your actual login route name
            });
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    const Scale = useRef(new Animated.Value(0)).current;
    const options = [
        // Add Employee option conditionally based on StoreRole
        ...(LoginRole == 'admin'
            ? [
                {
                    Title: 'Add Employee',
                    action: () => navigation.navigate('Signup'),
                },
                {
                    Title: "Employee's List",
                    action: () => navigation.navigate('EmployeeList'),
                },
                {
                    Title: "Employee's Ledger",
                    action: () => navigation.navigate('EmployeesPayLedger'),
                },
                {
                    Title: 'Borrow List',
                    action: () => navigation.navigate('EmployeeBorrowList'),
                },
            ]
            : []),
        // Add Employee option conditionally based on StoreRole
        ...(LoginRole == 'employee'
            ? [
                {
                    Title: "Employee's List",
                    action: () => navigation.navigate('EmployeeList'),
                },
            ]
            : []),

        {
            Title: 'Logout',
            action: () => logout(),
        },

    ]

    function resizeBox(to) {
        to === 1 && setMenuVisible(true);
        Animated.timing(Scale, {
            toValue: to,
            useNativeDriver: true,
            duration: 200,
            easing: Easing.linear,
        }).start(() => to === 0 && setMenuVisible(false));
    }


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



    return (
        <Pressable>
            {/* Header With logo and menu but */}
            <Pressable style={{ width: "100%", alignSelf: "center", paddingRight: "3%", height: "100%", display: "flex", flexDirection: "row", alignItems: "center", backgroundColor: "#fff", elevation: 3, marginBottom: 10, }}>
                <View style={{ width: "37%", height: "100%", alignItems: "center", display: "flex", flexDirection: "row", justifyContent: "flex-start",}}>
                    <Image
                        source={{ uri: 'https://realrate.store/AkshayUrjaSolar/Images/akshyurjalogo.jpeg' }} // Replace with your splash image path
                        style={styles.logo}
                    />
                    {/* <View style={{ width: "50%", height: "100%", justifyContent: "center" }}>
                        <Text style={{ fontSize: 15, color: "#f01a05", fontWeight: "700", }}>Akshay</Text>
                        <Text style={{ fontSize: 15, color: "#f01a05", fontWeight: "700", }}>Urja</Text>
                    </View> */}
                </View>

                <View style={{ width: "30%", height: "100%", justifyContent: "center" }}>

                    {LoginRole == 'employee' && (

                        DayStart === null ? (
                            // Show DAY START button if DayStart is null
                            <TouchableOpacity
                                onPress={() => handleToEmployeeAttendance()} style={styles.daystartBTn} >
                                <Text style={{ fontSize: 12, color: "#fff", fontWeight: "600" }}>DAY START</Text>
                            </TouchableOpacity>
                        ) : DayEnd === '00:00:00' ? (
                            // Show DAY END button if DayStart is not null
                            <TouchableOpacity onPress={() => handleToEmployeeAttendanceEnd()} style={styles.dayEndBTn}
                            >
                                <Text style={{ fontSize: 12, color: "#fff", fontWeight: "600" }}>DAY END</Text>
                            </TouchableOpacity>
                        ) : (
                            // Show success message if DayEnd !== '00:00:00'
                            <View style={{ width: "100%", justifyContent: "center", alignItems: "center", height: "100%" }}>
                                <Text style={{ fontSize: 14, color: "#f2be25", fontWeight: "700" }}>{DayWOrkingTime}</Text>
                            </View>
                        )
                    )}
                </View>


                <TouchableOpacity style={{ width: "15%", height: "100%", justifyContent: "center", alignItems: "flex-end" }}>
                    <Text><FontAwesome5 name='bell' size={30} color='black' /></Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => resizeBox(1)} style={{ width: "15%", height: "100%", justifyContent: "center", alignItems: "flex-end" }}>
                    <Text><Feather name='menu' size={30} color='black' /></Text>
                </TouchableOpacity>
            </Pressable>

            {/* top header with menu button  End*/}

            <Modal transparent visible={Menuvisible} animationType="fade">
                <SafeAreaView style={{ flex: 1 }} onTouchStart={() => resizeBox(0)}>
                    <TouchableOpacity activeOpacity={1} style={{ flex: 1 }} onPressOut={() => resizeBox(0)}>
                        <Animated.View style={styles.popup}>
                            {options.map((op, i) => (
                                <TouchableOpacity key={i} onPress={op.action} style={styles.popList}>
                                    <Text>{op.Title}</Text>
                                </TouchableOpacity>
                            ))}
                        </Animated.View>
                    </TouchableOpacity>
                </SafeAreaView>
            </Modal>

        </Pressable>
    )
}

export default HomeHeader

const styles = StyleSheet.create({
    PageContainer: { backgroundColor: "#fff", height: "100%" },
    logo: { width: "100%", height: 40,  resizeMode:'contain' },
    daystartBTn: { width: "100%", justifyContent: "center", alignItems: "center", backgroundColor: "green", borderRadius: 50, height: 30, },
    dayEndBTn: { width: "100%", justifyContent: "center", alignItems: "center", backgroundColor: "red", borderRadius: 50, height: 30, },
    customerInput: { backgroundColor: "#fff", borderWidth: 1, width: "100%", borderRadius: 5, marginTop: 5, marginBottom: 5, paddingLeft: 15 },
    btn: { width: "100%", height: "100%", backgroundColor: "#f2be25", borderWidth: 1, borderColor: "#000", borderRadius: 6, justifyContent: "center", alignItems: "center" },
    popup: {
        width: "50%",
        backgroundColor: "#fff",
        paddingHorizontal: 10,
        position: "absolute",
        top: 50,
        right: 10,
        elevation: 4
    },
    popList: {
        height: 50,
        borderBottomWidth: 0.5,
        borderColor: "#D9D9D9",
        justifyContent: "center"
    }
})