import { StyleSheet, View, Pressable, ScrollView, TouchableOpacity, Image, Modal, TextInput, Alert, ActivityIndicator, Animated, Easing, PermissionsAndroid, Platform, } from 'react-native'
import React, { useState, useEffect, useCallback, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import { Searchbar, Text, Button, } from 'react-native-paper';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeHeader from '../components/HomeHeader';
import LinearGradient from 'react-native-linear-gradient';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRoute } from '@react-navigation/native';

const VehicleList = ( { navigation } ) => {



    // Dealer route
    const route = useRoute();
    const { LoginRole } = route.params;
    const { LoginId } = route.params;



    const [VehicleName, setVehicleName] = useState('');
    const [VehicleKM, setVehicleKM] = useState('');
    const [VehicleAvarage, setVehicleAvarge] = useState('');
    const [loading, setLoading] = useState(false);

    const handleToSubmitDailyWork = async () => {
        try {
            setLoading(true); // Uncomment this to show loading indicator
            const formData = new FormData();

            formData.append('VehicleName', VehicleName);
            formData.append('VehicleKM', VehicleKM);
            formData.append('VehicleAvarage', VehicleAvarage);
            formData.append('LoginId', LoginId);
            formData.append('LoginRole', LoginRole);

            const response = await axios.post('https://realrate.store/AkshayUrjaSolar/Add_Vehicle_Api.php', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            console.log(response.data)
            if (response.data.errmessage) {
                Alert.alert("Warning ", response.data.errmessage)
            } else {
                console.log('Daily Working Task ' + response.data);
                setVehicleName('');
                setVehicleKM('');
                setVehicleAvarge('');
                DailyTaskListFetch()
                hideStartModal()
                
                Alert.alert("Message", `Your Vehicle  Added`);

            }
            // Handle the response
        } catch (error) {
            console.error('Signup failed:', error.message);
            Alert.alert('Error Message', error.message);
        } finally {
            setLoading(false); // Uncomment this to hide loading indicator
        }
    };


    const [DailyTaskList, setDaiyTaskList] = useState([]);
    const DailyTaskListFetch = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`https://realrate.store/AkshayUrjaSolar/Vehicle_List_Fetch_Api.php?loginID=${LoginId}&loginRole=${LoginRole}`);
            // Ensure response data is an array
            const fetchedDailyTask = Array.isArray(response.data) ? response.data : [];
            console.log(fetchedDailyTask);
            setDaiyTaskList(fetchedDailyTask);

        } catch (error) {
            console.error('Error fetching Daily Working List :', error);
        } finally {
            setLoading(false)
        }
    };
    useEffect(() => {
        DailyTaskListFetch(); // Assuming fetchProducts is defined and accepts city as a parameter
    }, [LoginId, LoginRole]);

    useFocusEffect(
        useCallback(() => {
            // Call functions or refresh data when this screen is focused
            DailyTaskListFetch();
        }, [LoginId, LoginRole])
    );


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

    const [StartVisible, setStartVisible] = useState(false);

    const showStartModal = () => setStartVisible(true);
    const hideStartModal = () => setStartVisible(false);

    const [startDate, setStartDate] = useState(new Date(new Date()));

    const [DayWorkCount, setDayWorkCount] = useState(null);

    const CountFetch = async () => {
        try {
            const response = await axios.get(`https://realrate.store/AkshayUrjaSolar/UniqueNUmberFetchApi.php?loginID=${LoginId}&loginrole=${LoginRole}`);
            // Ensure response data is an array
            const fetchedCounts = response.data;
            // console.log('fetchedCounts ' + );
            setDayWorkCount(fetchedCounts.DailyCount);


        } catch (error) {
            console.error('Error fetching Counts :', error);
        }
    };
    useEffect(() => {
        CountFetch(); // Assuming fetchProducts is defined and accepts city as a parameter
    });

    return (
        <SafeAreaView style={styles.PageContainer}>
            <Pressable style={{ width: "100%", height: "10%" }}>
                <HomeHeader />
            </Pressable>

            <Pressable style={{ width: "100%", height: "90%", marginBottom: 25 }}>
                <TouchableOpacity style={{ width: "100%", height: 40, overflow: "hidden", alignSelf: "center" }}>
                    <LinearGradient colors={['#ffde59', '#ff914d']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ width: "100%", height: "100%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }} >
                        <Text style={{ fontSize: 19.1, color: "#000", fontWeight: "bold" }}>Vehicle List</Text>
                        {/* <Text style={{ fontSize: 19.1, color: "#000", fontWeight: "600", marginLeft: 25 }}>{DayWorkCount}</Text> */}
                    </LinearGradient>
                </TouchableOpacity>

                {/* Add Customer Button */}
                <TouchableOpacity onPress={showStartModal} style={{ width: "90%", alignSelf: "center", display: "flex", flexDirection: "row", height: 30, alignItems: "center", marginBottom: 20, marginTop: 15 }}>
                    <Text style={{ backgroundColor: "#f01a05", width: 25, textAlign: "center", height: 25, verticalAlign: "middle", borderRadius: 50 }}>
                        <Feather name='plus' size={22} color='#d9d9d9' />
                    </Text>
                    <Text style={{ fontSize: 13, color: "#000", fontWeight: "600", marginLeft: 7 }}>Add Vehicle </Text>
                </TouchableOpacity>

                <ScrollView>






                    <Pressable style={{ width: "90%", alignSelf: "center", }}>
                        {loading ? (
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 800 }}>
                                <ActivityIndicator size="large" color="#0000ff" />
                                <Text>Loading...</Text>
                            </View>
                        ) : DailyTaskList.length > 0 ? (
                            DailyTaskList.map((item, index) => (
                                <TouchableOpacity  onPress={() => navigation.navigate('VehicleStatus', {LoginId,LoginRole,vehicle: item.vehicle_name,vehicleID:item.v_id,avg:item.Vehicle_Avarage})}  key={index} style={{ width: "100%", borderBottomWidth: 1, borderColor: "#000000", padding: 5, display: "flex", flexDirection: "row", flexWrap: "wrap", alignSelf: "center" }}>
                                    <Text  style={{ fontSize: 14, fontWeight: "bold", color: "#000", lineHeight: 30, width: "100%" }}>{item.vehicle_name}</Text>
                                    <Text  style={{ fontSize: 12, fontWeight: "500", color: "#f01a05", width: "50%" }}>{formatDates(item.AddedOn)}</Text>
                                    <Text  style={{ fontSize: 12, fontWeight: "500", color: "#f01a05", width: "50%", textAlign: "center" }}>{item.vehicle_km} KM</Text>
                                </TouchableOpacity>
                             )
                            )
                        ) : (
                            <View style={{ width: "100%", height: 300, justifyContent: "center", alignItems: "center" }}>
                                <Text style={{ fontSize: 17, fontWeight: "800", color: "#000", textAlign: "center" }}>There's No Daily Task Here       </Text>
                            </View>
                        )} 
                    </Pressable>



                </ScrollView>

                {/* Add Daily Tast  Start Modal */}

                <Modal visible={StartVisible} style={{ width: "100%", height: "100%", backgroundColor: "#000" }}>

                    <Pressable style={{ width: "90%", height: 100, alignSelf: "center", display: "flex", flexDirection: "row" }}>
                        <View style={{ width: "80%", height: "100%", justifyContent: "center", }}>
                            <Text style={{ fontSize: 18, color: "#f01a05", fontWeight: "bold" }}>Add Vehicle </Text>
                        </View>
                        <TouchableOpacity onPress={() => hideStartModal()} style={{ width: "20%", height: "100%", justifyContent: "center", alignItems: "center" }}>
                            <Text style={{ fontSize: 33, color: "#000", fontWeight: "400" }}>x</Text>
                        </TouchableOpacity>
                    </Pressable>

                    <View style={{ width: "90%", alignSelf: "center",justifyContent:"center",alignItems:"center",height:"80%" }}>
                        <TextInput style={styles.customerInput} placeholder='Vehicle Name' placeholderTextColor='#000' onChangeText={(text) => setVehicleName(text)} value={VehicleName}  />
                        <TextInput style={styles.customerInput} placeholder='Vehicle  Avarage' placeholderTextColor='#000' onChangeText={(text) => setVehicleAvarge(text)} value={VehicleAvarage} />
                        <TextInput style={styles.customerInput} placeholder='Vehicle KM' placeholderTextColor='#000' onChangeText={(text) => setVehicleKM(text)} value={VehicleKM} />
                       
                        <View style={{ width: "100%", height: 45, alignSelf: "flex-end", marginTop: 100 }}>
                            <TouchableOpacity onPress={() => handleToSubmitDailyWork()} style={styles.btn}>
                                <Text style={{ color: "#000", fontWeight: "700", fontSize: 14 }}>Submit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                {/* Add daily Task  Start Modal */}
            </Pressable>

        </SafeAreaView>
    )
}

export default VehicleList

const styles = StyleSheet.create({

    PageContainer: { backgroundColor: "#fff", height: "100%" },
    btn: { width: "100%", height: "100%", backgroundColor: "#f2be25", borderWidth: 1, borderColor: "#000", borderRadius: 6, justifyContent: "center", alignItems: "center" },
    customerInput: { backgroundColor: "#fff", borderWidth: 1, width: "100%", borderRadius: 5, marginTop: 5, marginBottom: 5, paddingLeft: 15 },

})