import { StyleSheet, View, Pressable, ScrollView, TouchableOpacity, Image, Modal, Alert, ActivityIndicator, Animated, Easing, PermissionsAndroid, Platform, } from 'react-native'
import React, { useState, useEffect, useCallback, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import { Searchbar, Text, Button, TextInput } from 'react-native-paper';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EmployeeBorrowList = ({ navigation }) => {

    const [BorrowRequestList, setBorrowRequestList] = useState([]);
    const [loading, setLoading] = useState(false);
    const BorrowRequestListFetch = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`https://realrate.store/AkshayUrjaSolar/Borrow_request_fetch_Api.php`);
            // Ensure response data is an array
            const fetchedDailyTask = Array.isArray(response.data) ? response.data : [];
            console.log(fetchedDailyTask);
            setBorrowRequestList(fetchedDailyTask);

        } catch (error) {
            console.error('Error fetching Daily Working List :', error);
        } finally {
            setLoading(false)
        }
    };
    useEffect(() => {
        BorrowRequestListFetch(); // Assuming fetchProducts is defined and accepts city as a parameter
    }, []);


    const BorrowApprove = async (brorowid) => {

        try {
            setLoading(true); // Uncomment this to show loading indicator
            const formData = new FormData();

            formData.append('BrrowSts', 'Approve');
            formData.append('brorowid', brorowid);

            const response = await axios.post('https://realrate.store/AkshayUrjaSolar/Employee_Borrow_Status_Update_Api.php', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            console.log(response.data)
            if (response.data.errmessage) {
                Alert.alert("Warning ", response.data.errmessage)
            } else {
                console.log('Daily Working Task ' + response.data);
                //   setDailyWorkingTask('');
                //   DailyTaskListFetch();
                BorrowRequestListFetch();
                Alert.alert("Message", `Borrow Request  Approve`);

            }
            // Handle the response
        } catch (error) {
            console.error('Signup failed:', error.message);
            Alert.alert('Error Message', error.message);
        } finally {
            setLoading(false); // Uncomment this to hide loading indicator
        }



    }


    const BorrowDenied = async (brorowid) => {

        try {
            setLoading(true); // Uncomment this to show loading indicator
            const formData = new FormData();

            formData.append('BrrowSts', 'Denied');
            formData.append('brorowid', brorowid);

            const response = await axios.post('https://realrate.store/AkshayUrjaSolar/Employee_Borrow_Status_Update_Api.php', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            console.log(response.data)
            if (response.data.errmessage) {
                Alert.alert("Warning ", response.data.errmessage)
            } else {
                console.log('Daily Working Task ' + response.data);
                //   setDailyWorkingTask('');
                //   DailyTaskListFetch();
                BorrowRequestListFetch();
                Alert.alert("Message", `Borrow Request  Denied`);

            }
            // Handle the response
        } catch (error) {
            console.error('Signup failed:', error.message);
            Alert.alert('Error Message', error.message);
        } finally {
            setLoading(false); // Uncomment this to hide loading indicator
        }



    }


    const formatDates = (dateString) => {
        const date = new Date(dateString);
        const day = (`0${date.getDate()}`).slice(-2); // Ensure two digits
        const month = (`0${date.getMonth() + 1}`).slice(-2); // Months are 0-based
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };
    useFocusEffect(
        useCallback(() => {
          // Call functions or refresh data when this screen is focused
          BorrowRequestListFetch();
        }, [])
      );

    return (
        <SafeAreaView style={styles.PageContainer}>
            <ScrollView>
                <Pressable style={{ width: "90%", alignSelf: "center", height: 70, justifyContent: "center", alignItems: "center", display: "flex", flexDirection: "row" }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ width: "15%", height: "100%", justifyContent: "center", alignItems: "center" }}>
                        <Text><MaterialIcons name='arrow-back-ios' size={30} color='black' /></Text>
                    </TouchableOpacity>
                    <View style={{ width: "85%", height: "100%", justifyContent: "center", }}>
                        <Text style={{ color: "#000", fontWeight: "800", fontSize: 18 }}>Employee Borrow Request's  </Text>
                    </View>
                    {/* <TouchableOpacity style={{ width: "15%", height: "100%", justifyContent: "center", alignItems: "flex-end" }}>
                        <Text><SimpleLineIcons name='options-vertical' size={22} color='black' /></Text>
                    </TouchableOpacity> */}
                </Pressable>



                <Pressable style={{ width: "90%", alignSelf: "center", marginTop: 20, marginBottom: 50 }}>
                    {loading ? (
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 800 }}>
                            <ActivityIndicator size="large" color="#0000ff" />
                            <Text>Loading...</Text>
                        </View>
                    ) : BorrowRequestList.length > 0 ? (
                        BorrowRequestList.map((item, index) => (
                            <Pressable key={index} style={{ width: "100%", padding: 10, backgroundColor: "#ddd", marginBottom: 10 }}>
                                <View style={{ width: "100%", height: 50, justifyContent: "center" }}>
                                    <Text style={{ fontSize: 14, fontWeight: "700", color: "#000", width: "40%" }}> {item.emp_name} </Text>
                                    <Text style={{ fontSize: 14, fontWeight: "700", color: "#000", width: "40%" }}> {formatDates(item.br_added)} </Text>
                                </View>
                                <Text style={{ fontSize: 14, fontWeight: "500", color: "#000" }}> {item.borrowDes} </Text>
                                {item.br_status != '' ? (
                                    <View style={{ width: "100%", display: "flex", flexDirection: "row", height: 40, alignItems: "center", justifyContent: "flex-end", }}>
                                        <Text style={{fontSize:15,color:"green",fontWeight:"600"}}>{item.br_status}</Text>
                                    </View>
                                ) : (
                                    <View style={{ width: "100%", display: "flex", flexDirection: "row", height: 40, alignItems: "center", justifyContent: "flex-end" }}>
                                        <TouchableOpacity onPress={() => BorrowDenied(item.br_id)} style={{ width: "25%", height: "80%", justifyContent: "center", alignItems: "center", backgroundColor: "red", borderRadius: 6, marginRight: "5%" }}>
                                            <Text style={{ color: "#fff", fontSize: 12, fontWeight: "600" }}>Denied</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => BorrowApprove(item.br_id)} style={{ width: "30%", height: "80%", justifyContent: "center", alignItems: "center", backgroundColor: "green", borderRadius: 6 }}>
                                            <Text style={{ color: "#fff", fontSize: 12, fontWeight: "600" }}>Approve</Text>
                                        </TouchableOpacity>
                                    </View>
                                )

                                }

                            </Pressable>
                        )
                        )
                    ) : (
                        <View style={{ width: "100%", height: 300, justifyContent: "center", alignItems: "center" }}>
                            <Text style={{ fontSize: 17, fontWeight: "800", color: "#000", textAlign: "center" }}>There's No Borrow Request Here       </Text>
                        </View>
                    )}
                </Pressable>







            </ScrollView>
        </SafeAreaView>
    )
}

export default EmployeeBorrowList

const styles = StyleSheet.create({
    PageContainer: { backgroundColor: "#fff", height: "100%" },
})