import { StyleSheet, View, ScrollView, Pressable, TouchableOpacity, TextInput, Image, Alert,ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Text } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'

const UserSignUp = ({ navigation }) => {

    const [FullName, setFullName] = useState('');
    const [Email, setEmail] = useState('');
    const [Mobile, setMobile] = useState('');
    const [Address, setAddress] = useState('');
    const [EmployeesIDS, setEmployeesIDS] = useState('');
    const [Salary, setSalary] = useState('');
    const [Password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    // Fetch Employee ID from the API
    const fetchStoreEmployees = async () => {
        try {
            const response = await axios.get(`https://realrate.store/AkshayUrjaSolar/UniqueNUmberFetchApi.php`);
            const fetchedEmployees = response.data;
            // console.log(fetchedEmployees.employee_ID);  // Set the fetched employee ID
            setEmployeesIDS(fetchedEmployees.employee_ID);  // Set the fetched employee ID
        } catch (error) {
            console.error('Error fetching Employees:', error);
        }
    };

    useEffect(() => {
        fetchStoreEmployees();
    });


    const ErrorMessageClose = () => {
        setErrorMessage('');
    }


    // Handle form submission to create employee
    const handleToCreateEmployee = async () => {
        try {
            setLoading(true);
            const formData = new FormData();

            formData.append('FullName', FullName);
            formData.append('Email', Email);
            formData.append('Mobile', Mobile);
            formData.append('Address', Address);
            formData.append('EmployeesIDS', EmployeesIDS);
            formData.append('Salary', Salary);
            formData.append('Password', Password);

            const response = await axios.post('https://realrate.store/AkshayUrjaSolar/Employee_create_Api.php', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            console.log('Response:', response.data);

            if (response.data.errmessage) {
                // Alert.alert('Alert', response.data.errmessage);
                setErrorMessage(response.data.errmessage);
                // Hide the error message after 5 seconds
                setTimeout(() => {
                    setErrorMessage('');
                }, 4000);
            } else {
                Alert.alert('Message', 'Employee Added SuccessFully');
                fetchStoreEmployees();
                navigation.navigate('Signin');
            }

        } catch (error) {
            console.error('Signup failed:', error.message);
            Alert.alert('Error Message', error.message);
        } finally {
            setLoading(false);
        }
    };





    return (
        <SafeAreaView style={styles.PageContainer}>
            <ScrollView>

                <Pressable style={styles.logoSection}>
                    <View style={styles.logoSectionDiv1}>
                        {/* <Text style={styles.logoSectionDiv1Text}>Akshay</Text>
                        <Text style={styles.logoSectionDiv1Text}>Urja</Text>
                        <Text style={styles.logoSectionDiv1Text}>Solar</Text> */}
                    </View>
                    <View style={styles.logoSectionDiv2}>
                        <Image
                        source={{ uri: 'https://realrate.store/AkshayUrjaSolar/Images/akshyurjalogo.jpeg' }}
                        style={{ width: 130,  height:50,justifyContent:"center" }}
                        resizeMode="contain"  // Adjust width, height, and margin as needed
                        />
                    </View>

                </Pressable>
                <Pressable style={styles.BannerSection}>
                    <Text style={styles.bannerTitle}>Hi !</Text>
                    <Text style={styles.bannerTitle}>User</Text>
                    <Text style={styles.bannerText}>Let's create an account</Text>
                </Pressable>

                {errorMessage != '' && (
                    <View style={{ width: "90%", height: 40, justifyContent: "center", alignItems: "center", alignSelf: "center", borderRadius: 6, backgroundColor: "#f2be25", elevation: 2, display: "flex", flexDirection: "row" }}>
                        <Text style={{ fontSize: 14, fontWeight: "700", color: "#000", width: "90%", paddingLeft: 5 }}>{errorMessage}</Text>
                        <TouchableOpacity onPress={() => ErrorMessageClose()} style={{ width: "10%" }}><Text style={{ fontSize: 14, fontWeight: "700", color: "#000" }}>X</Text></TouchableOpacity>
                    </View>
                )}


                <Pressable style={styles.AuthFormGroup}>
                    <TextInput placeholder='Full Name' placeholderTextColor={"#c1c1c1"} style={styles.AuthFormGroupInput} onChangeText={(text) => setFullName(text)} value={FullName} />
                </Pressable>
                <Pressable style={styles.AuthFormGroup}>
                    <TextInput placeholder='Email' placeholderTextColor={"#c1c1c1"} style={styles.AuthFormGroupInput} onChangeText={(text) => setEmail(text)} value={Email} />
                </Pressable>
                <Pressable style={styles.AuthFormGroup}>
                    <TextInput placeholder='Phone Number' placeholderTextColor={"#c1c1c1"} style={styles.AuthFormGroupInput} onChangeText={(text) => setMobile(text)} value={Mobile} keyboardType="numeric" maxLength={10} />
                </Pressable>
                <Pressable style={styles.AuthFormGroup}>
                    <TextInput placeholder='Consumer Number' placeholderTextColor={"#c1c1c1"} style={styles.AuthFormGroupInput} onChangeText={(text) => setMobile(text)} value={Mobile} keyboardType="numeric" maxLength={10} />
                </Pressable>
                <Pressable style={styles.AuthFormGroup}>
                    <TextInput placeholder='Address  ' placeholderTextColor={"#c1c1c1"} style={styles.AuthFormGroupInput} onChangeText={(text) => setAddress(text)} value={Address} />
                </Pressable>

                <Pressable style={styles.AuthFormGroup}>
                    <TextInput placeholder='Pine Code' placeholderTextColor={"#c1c1c1"} style={styles.AuthFormGroupInput} onChangeText={(text) => setAddress(text)} value={Address} />
                </Pressable>
                {/* <Pressable style={styles.AuthFormGroup1}> */}
                    {/* <TextInput style={styles.AuthFormGroupInput} value={EmployeesIDS} placeholder={EmployeesIDS} placeholderTextColor={"#c1c1c1"} /> */}
                    {/* placeholder='Employee code  ' placeholderTextColor={"#c1c1c1"}  */}
                    {/* <Text style={{ paddingTop: 13, paddingLeft: 5 }}>{EmployeesIDS}</Text> */}
                {/* </Pressable> */}
                {/* <Pressable style={styles.AuthFormGroup}>
                    <TextInput placeholder='Employee Salary ' placeholderTextColor={"#c1c1c1"} style={styles.AuthFormGroupInput} onChangeText={(text) => setSalary(text)} value={Salary} keyboardType="numeric" />
                </Pressable> */}
                <Pressable style={styles.AuthFormGroup}>
                    <TextInput placeholder='Password ' placeholderTextColor={"#c1c1c1"} style={styles.AuthFormGroupInput} onChangeText={(text) => setPassword(text)} value={Password} />
                </Pressable>

                <Pressable style={styles.AuthFormLinks}>
                    <View style={styles.AuthFormLinksDiv1}>
                        <Text style={{ fontSize: 12, color: "#c1c1c1", fontWeight: "500" }}>Must contain a number and least of 6 characters</Text>
                    </View>
                </Pressable>

                {loading ? (
                    <View style={styles.signinBtn}>
                        <ActivityIndicator size="large" color="#0000ff" />
                        <Text>Loading...</Text>
                    </View>
                ) : (
                    <TouchableOpacity onPress={() => navigation.navigate('TabUser')} style={styles.signinBtn}>
                        <Text style={{ color: "#f2be25", fontSize: 15, fontWeight: "700" }}>Sign Up</Text>
                    </TouchableOpacity>
                )}
                <Pressable style={styles.BottomLinkDiv}>
                    <Text style={styles.BottomLinkDivText}>Have an account ?  </Text>
                    <TouchableOpacity >
                        <Text style={styles.BottomLinkDivBtnText}>Log In </Text>
                    </TouchableOpacity>
                </Pressable>

            </ScrollView>
        </SafeAreaView>
    )
}

export default UserSignUp

const styles = StyleSheet.create({
    PageContainer: { backgroundColor: "#fff", height: "100%" },
    logoSection: { width: "90%", alignSelf: "center", height: 80, display: "flex", flexDirection: "row", },
    logoSectionDiv1: { width: "70%", justifyContent: "center", alignItems: "flex-end" },
    logoSectionDiv2: { width: "20%", justifyContent: "center", alignItems: "center", height: "100%" },
    logoSectionDiv1Text: { fontSize: 14.4, color: "#f01a05", fontWeight: "700" },
    logo: { width: "100%", height: "100%", marginTop: 15 },
    BannerSection: { width: "90%", alignSelf: "center", marginBottom: 20 },
    bannerTitle: { fontSize: 55, color: "#343341", fontWeight: "700" },
    bannerText: { color: "#c1c1c1", fontSize: 12, fontWeight: "500" },
    AuthFormGroup: { width: "90%", alignSelf: "center", height: 40 },
    AuthFormGroup1: { width: "90%", alignSelf: "center", height: 40, borderBottomWidth: 1, borderBottomColor: "#f2be25" },
    AuthFormGroupInput: { backgroundColor: "#fff", borderBottomWidth: 1, borderBottomColor: "#f2be25", height: "100%" },
    AuthFormLinks: { width: "90%", alignSelf: "center", height: 25, display: "flex", flexDirection: "row" },
    AuthFormLinksDiv1: { width: "100%", height: "100%", justifyContent: "center" },
    AuthFormLinksDiv2Text: { fontSize: 12, color: "#c1c1c1", fontWeight: "500" },
    signinBtn: { backgroundColor: "#343341", width: "90%", alignSelf: "center", height: 50, justifyContent: "center", alignItems: "center", marginTop: 20 },
    BottomLinkDiv: { width: "90%", alignSelf: "center", justifyContent: "center", height: 50, display: "flex", flexDirection: "row", alignItems: "center", marginTop: 30 },
    BottomLinkDivText: { fontSize: 12, color: "#c1c1c1", fontWeight: "600" },
    BottomLinkDivBtnText: { fontSize: 15, color: "#f2be25", fontWeight: "700" },





})   