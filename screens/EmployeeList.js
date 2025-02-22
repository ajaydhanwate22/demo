import { StyleSheet, View, ScrollView, Pressable, TouchableOpacity, TextInput, Image, Alert, ActivityIndicator, Modal } from 'react-native'
import React, { useState, useEffect , useCallback } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Searchbar, Text, Button } from 'react-native-paper';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EmployeeList = ({ navigation }) => {


    // Fetch login Store Id   LoginStore
    const [LoginRole, setLoginRole] = useState(null);
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

    console.log('LoginRole ' + LoginRole)
    console.log('LoginId ' + LoginId)

    const [visible, setVisible] = React.useState(false);




    const showModal = (empid) => {
        setVisible(true);
        setEmpID(empid);
        fetchEmployeesLedger(empid);
    }
    const hideModal = (empid) => {
        setVisible(false);
        setEmpID('');
    }


    const [searchQuery, setSearchQuery] = React.useState('');



    const [loading, setLoading] = useState(false);
    const [Employees, setEmployees] = useState([]);
    const [filteredCustomers, setFilteredCustomers] = useState([]);

    const EmployeeList = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`https://realrate.store/AkshayUrjaSolar/Employee_list_fetch_Api.php`);
            // Ensure response data is an array
            const fetchedCustomers = Array.isArray(response.data) ? response.data : [];
            setEmployees(fetchedCustomers);

        } catch (error) {
            console.error('Error fetching Customer List :', error);
        } finally {
            setLoading(false)
        }
    };
    useEffect(() => {
        EmployeeList(); // Assuming fetchProducts is defined and accepts city as a parameter
    }, []);

    // Filter transactions based on the selected filter
    useEffect(() => {
        if (Employees && Array.isArray(Employees)) {
            const filtered = Employees.filter(Employees => Employees.emp_name.toLowerCase().includes(searchQuery.toLowerCase()));
            setFilteredCustomers(filtered);
        }
    }, [searchQuery, Employees]);


    const GoToEmployeeLedger = (empID) => {
        if (LoginId == empID) {
            navigation.navigate('EmployeeLedger', { empID });
        } else if(LoginRole == 'admin') {
            navigation.navigate('EmployeeLedger', { empID });
        } else {
            Alert.alert('Message', "You Can See Only Own Ledger");
        }
    }

      
    useFocusEffect(
        useCallback(() => {
          // Call functions or refresh data when this screen is focused
          EmployeeList();
        }, [LoginId,LoginRole])
      );

    return (
        <SafeAreaView style={styles.PageContainer}>
            <ScrollView>

                <Pressable style={{ width: "90%", alignSelf: "center", height: 70, justifyContent: "center", alignItems: "center", display: "flex", flexDirection: "row" }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ width: "15%", height: "100%", justifyContent: "center", alignItems: "center" }}>
                        <Text><MaterialIcons name='arrow-back-ios' size={30} color='black' /></Text>
                    </TouchableOpacity>
                    <View style={{ width: "85%", height: "100%", justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ color: "#000", fontWeight: "800", fontSize: 18 }}>Employee's</Text>
                    </View>
                    {/* <TouchableOpacity style={{ width: "15%", height: "100%", justifyContent: "center", alignItems: "flex-end" }}>
                        <Text><SimpleLineIcons name='options-vertical' size={22} color='black' /></Text>
                    </TouchableOpacity> */}
                </Pressable>


                {/* Search baar  */}
                <Pressable style={{ width: "90%", alignSelf: "center", height: 50, marginTop: 10, marginBottom: 30 }}>
                    <Searchbar
                        // placeholder="Search"
                        onChangeText={setSearchQuery}
                        value={searchQuery}
                        style={{ width: "100%", height: "100%" }}
                    />
                </Pressable>


                <Pressable style={{ width: "90%", marginBottom: 50, alignSelf: "center" }}>
                    {/* <TouchableOpacity style={{width:"100%",height:100,borderWidth:1}}>
                               <View style={{width:"30%",height:"100%",back}}>
                                <Text style={{fontSize:35}}>ES</Text>
                               </View>
                         </TouchableOpacity> */}

                    {loading ? (
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 800 }}>
                            <ActivityIndicator size="large" color="#0000ff" />
                            <Text>Loading...</Text>
                        </View>
                    ) : filteredCustomers.length > 0 ? (
                        filteredCustomers.map((item, index) => {
                            return (
                                <TouchableOpacity key={index} style={styles.empRowBox} onPress={() => GoToEmployeeLedger(item.emp_id)}>
                                    <View style={styles.empRow}>
                                        {/* <View style={styles.empRowCol2}>
                                <Text style={styles.empRowCol2Circle}>
                                    <FontAwesome name="user-circle-o" size={44} color="#B8B8B8" />
                                </Text>
                            </View> */}
                                        <View style={styles.empRowCol}>
                                            <Text style={styles.empRowColText1}>{item.emp_name}</Text>

                                            <Text style={styles.empRowColText2}>Employee ID   <Text style={styles.empRowColText3}>{item.emp_ids}</Text> </Text>
                                            <Text style={styles.empRowColText2}>Mobile Number  <Text style={styles.empRowColText3}>+91 8446931810</Text> </Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )
                        })
                    ) : (
                        <View style={{ width: '100%', marginTop: 50, height: 400, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 40, fontWeight: '700', color: '#000' }}>
                                Sorry <Text style={{ color: 'red', fontSize: 40, fontWeight: '700' }}>!</Text>
                            </Text>
                            <Text style={{ color: 'red', fontSize: 22, fontWeight: '700', textAlign: 'center', marginTop: 30 }}>
                                There's No Customer's <Text style={{ fontSize: 25, fontWeight: '700', color: '#000' }}>Found.</Text>
                            </Text>
                        </View>
                    )}
                </Pressable>



            </ScrollView>
        </SafeAreaView>
    )
}

export default EmployeeList

const styles = StyleSheet.create({
    PageContainer: { backgroundColor: "#fff", height: "100%" },

    empRowBox: { width: "100%", alignSelf: "center" },
    empRow: { width: "100%", backgroundColor: "#fff", elevation: 3, height: 90, marginBottom: 10, borderRadius: 8, display: "flex", flexDirection: "row" },
    empRowCol: { width: "75%", height: "100%", justifyContent: "center", paddingLeft: 10 },
    empRowColText1: { fontSize: 15, color: "#000000", fontWeight: "600", lineHeight: 22, marginBottom: 5 },
    empRowColText2: { fontSize: 12, color: "#818181", fontWeight: "400", lineHeight: 22 },
    empRowColText3: { color: "#037baf", fontSize: 14, fontWeight: "500", lineHeight: 22 },
    empRowCol2: { width: "20%", height: "100%", justifyContent: "center", alignItems: "center" },
    empRowCol2Circle: { borderWidth: 1, borderColor: "#B8B8B8", width: 45, height: 45, borderRadius: 500, textAlign: "center", textAlignVertical: "center" },
})