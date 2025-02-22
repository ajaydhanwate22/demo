import { StyleSheet, View, Pressable, ScrollView, TouchableOpacity, Image, Modal, TextInput, Alert, ActivityIndicator, Animated, Easing, PermissionsAndroid, Platform, } from 'react-native'
import React, { useState, useEffect, useCallback, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import { Searchbar, Text, Button } from 'react-native-paper';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from 'react-native-geolocation-service';
import Geocoding from 'react-native-geocoding';

const CustomerList = ( { navigation } ) => {



    const [searchQuery, setSearchQuery] = React.useState('');
    const [visible, setVisible] = React.useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    const [customers, setCustomers] = useState([]);
    const [filteredCustomers, setFilteredCustomers] = useState([]);
    const [loading, setLoading] = useState(false);

    const CustomerList = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`https://realrate.store/AkshayUrjaSolar/customer_fetch_Api.php`);
            // Ensure response data is an array
            const fetchedCustomers = Array.isArray(response.data) ? response.data : [];
            setCustomers(fetchedCustomers);

        } catch (error) {
            console.error('Error fetching Customer List :', error);
        } finally {
            setLoading(false)
        }
    };
    useEffect(() => {
        CustomerList(); // Assuming fetchProducts is defined and accepts city as a parameter
    }, []);

    // Filter transactions based on the selected filter
    useEffect(() => {
        if (customers && Array.isArray(customers)) {
            const filtered = customers.filter(customer => customer.cust_name.toLowerCase().includes(searchQuery.toLowerCase()));
            setFilteredCustomers(filtered);
        }
    }, [searchQuery, customers]);

    useFocusEffect(
        useCallback(() => {
            // Call functions or refresh data when this screen is focused
            CustomerList();
        }, [])
    );


    const [FullName, setFullName] = useState('');
    const [MobileNumber, setMobileNumber] = useState('');
    const [Email, setEmail] = useState('');
    const [Address, setAddress] = useState('');
    const [Password, setPassword] = useState('');
    const [Pincode, setPincode] = useState('');
    const [ConsumerNumber, setConsumerNumber] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const ErrorMessageClose = () => {
        setErrorMessage('');
    }

    const handleToCreateCustomer = async () => {
        try {
          setLoading(true); // Uncomment this to show loading indicator
          const formData = new FormData();
    
          formData.append('FullName', FullName);
          formData.append('MobileNumber', MobileNumber);
          formData.append('Email', Email);
          formData.append('ConsumerNumber', ConsumerNumber);
          formData.append('Address', Address);
          formData.append('Pincode', Pincode);
          formData.append('Password', Password);
    
          const response = await axios.post('https://realrate.store/AkshayUrjaSolar/customer_create_Api.php', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          });
    
    
          console.log(response.data)
          if (response.data.errmessage) {
            // Alert.alert("Warning ", response.data.ErrMessage)
            setErrorMessage(response.data.errmessage);
            // Hide the error message after 5 seconds
            setTimeout(() => {
              setErrorMessage('');
            }, 4000);
          } else {
    
            console.log(response.data);
            Alert.alert("Message", "Welcome To Akshay Urja Solar");
            // navigation.navigate('SplashScreen');
            CustomerList();
            hideModal();
            CustomerList();
            setFullName('');
            setMobileNumber('');
            setEmail('');
            setConsumerNumber('');
            setAddress('');
            setPincode('');
            setPassword('');
    
          }
          // Handle the response
        } catch (error) {
          console.error('Signup failed:', error.message);
          Alert.alert('Error Message', error.message);
        } finally {
          setLoading(false); // Uncomment this to hide loading indicator
        }
      };


      const [location, setLocation] = useState(null);
      const [error, setError] = useState(null);
      const getLocation = async (custID) => {
    
        console.log(custID)
        setLoading(true);
        setError(null);
    
        try {
          // Request location permissions for Android
          if (Platform.OS === 'android') {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            );
    
            if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
              setError('Location permission denied');
              Alert.alert('Location permission denied');
              setLoading(false);
              return;
            }
          }
    
          // Get the current location
          Geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords;
    
              try {
                // Fetch the address using reverse geocoding
                const response = await fetch(
                  `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
                );
                const data = await response.json();
                console.log('Address Data:', JSON.stringify(data, null, 2));
    
                // Set location details
                const locationDetails = {
                  latitude: data.lat,
                  longitude: data.lon,
                  pincode: data.address?.postcode || 'N/A',
                  city: data.address?.city || data.address?.town || data.address?.village || 'N/A',
                  district: data.address?.state_district || 'N/A',
                  state: data.address?.state || 'N/A',
                  country: data.address?.country || 'N/A',
                  fullAddress: data.display_name || 'N/A',
                  addressType: data.addresstype || 'N/A',
                  name: data.name || 'N/A',
                  type: data.type || 'N/A',
                  class: data.class || 'N/A',
                  custId: custID,
                };
    
                setLocation(locationDetails);
    
                // Prepare form data for the API
                const formData = new FormData();
                Object.entries(locationDetails).forEach(([key, value]) => formData.append(key, value));
    
                // Send data to the backend
                try {
                  const apiResponse = await axios.post(
                    'https://realrate.store/AkshayUrjaSolar/Customer_Location_Update_Api.php',
                    formData,
                    { headers: { 'Content-Type': 'multipart/form-data' } },
                  );
                  console.log('API Response:', apiResponse.data);
    
                  if (apiResponse.data.errmessage) {
                    Alert.alert('Alert', apiResponse.data.errmessage);
                  } else {
                    Alert.alert('Message', 'Location Added Successfully');
                    navigation.navigate('Main');
                    // Optionally refresh data or call additional functions
                    // fetchStoreEmployees();
                  }
                } catch (apiError) {
                  console.error('Error sending data to API:', apiError.message);
                  Alert.alert('Error', 'Failed to update location on the server.');
                }
              } catch (geoError) {
                console.error('Error fetching address:', geoError.message);
                setError('Failed to fetch address.');
              }
    
              setLoading(false);
            },
            (error) => {
              console.error('Geolocation Error:', error.message);
              setError(error.message);
              setLoading(false);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
          );
        } catch (err) {
          console.error('Unexpected Error:', err.message);
          setError(err.message);
          setLoading(false);
        }
      };
    
    return (
        <SafeAreaView style={styles.PageContainer}>


            {/* Header With logo and menu but */}


            <Pressable style={{ width: "90%", alignSelf: "center", height: 40, display: "flex", flexDirection: "row", marginTop: 20, marginBottom: 20 }}>
                <TouchableOpacity  onPress={() => navigation.goBack()} style={{ width: "15%", height: "100%", justifyContent: "center",}}>
                <Text><MaterialIcons name='arrow-back-ios' size={30} color='black' /></Text>
                </TouchableOpacity>
                <View style={{ width: "80%", height: "100%", justifyContent: "center" }}>
                    <Text style={{ fontSize: 18, color: "#f01a05", fontWeight: "700" }}>Customer's</Text>
                </View>
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

            {Array.isArray(filteredCustomers) && filteredCustomers.length === 0 && searchQuery.trim() !== "" && (
                <Text style={{ width: "90%", alignSelf: "center", color: "#D9D9D9", fontWeight: "500", textTransform: "capitalize", fontSize: 14, marginTop: 10, marginBottom: 15 }}>
                    "<Text style={{ fontWeight: 'bold' }}>{searchQuery}</Text>" is not in the Customer list.
                </Text>
            )}

            <ScrollView style={{ width: "100%", alignSelf: "center", paddingLeft: "5%", paddingRight: "5%" }}>

                      {/* Add Customer Button */}
        <TouchableOpacity onPress={showModal} style={{ width: "90%", alignSelf: "center", display: "flex", flexDirection: "row", height: 30, alignItems: "center", marginBottom: 20 }}>
            <Text style={{ backgroundColor: "#f01a05", width: 25, textAlign: "center", height: 25, verticalAlign: "middle", borderRadius: 50 }}>
              <Feather name='plus' size={22} color='#d9d9d9' />
            </Text>
            <Text style={{ fontSize: 13, color: "#000", fontWeight: "600", marginLeft: 7 }}>Add customer</Text>
          </TouchableOpacity>


                {/* Customer List show */}


                {loading ? (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 800 }}>
                        <ActivityIndicator size="large" color="#0000ff" />
                        <Text>Loading...</Text>
                    </View>
                ) : filteredCustomers.length > 0 ? (
                    filteredCustomers.map((item, index) => {
                        return (
                            <Pressable key={item.cust_id}  style={{ width: "90%", alignSelf: "center", borderBottomWidth: 1, height: 80, display: "flex", flexDirection: "row" }}>
                                <TouchableOpacity onPress={() => navigation.navigate('CustomerPage')} style={{ width: "70%", height: "100%", justifyContent: "center" }}>
                                    <Text style={{ fontSize: 12, fontWeight: "700", color: "#000" }}>{item.cust_name}</Text>
                                    <Text style={{ fontSize: 12, fontWeight: "500", color: "#000" }}>{item.cust_address}</Text>
                                    <Text style={{ fontSize: 12, fontWeight: "500", color: "#000" }}>Site ID: {item.site_ID}</Text>
                                    <Text style={{ fontSize: 12, fontWeight: "600", color: "#7ed957" }}>Normal</Text>
                                </TouchableOpacity>

                                <Pressable style={{ width: "30%", height: "100%", justifyContent: "center", alignItems: "center" }}>
                                    {/* {loadingLoc ? ( */}

                                    <TouchableOpacity onPress={() => getLocation(item.cust_id)} style={{ width: "100%", height: 40, borderRadius: 15, backgroundColor: "#01a30c", justifyContent: "center", alignItems: "center", marginTop: 5 }}>
                                        <Text style={{ fontSize: 11, fontWeight: "700", color: "#fffffe", textAlign: "center" }}>Update location </Text>
                                    </TouchableOpacity>
                                </Pressable>
                            </Pressable>
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
            </ScrollView>







            <Modal visible={visible} style={{ width: "100%", height: "100%", backgroundColor: "#000" }}>
                <Pressable style={{ width: "90%", alignSelf: "center", height: 40, display: "flex", flexDirection: "row", marginTop: 50, marginBottom: 40 }}>
                    <View style={{ width: "80%", height: "100%", justifyContent: "center" }}>
                        <Text style={{ fontSize: 18, color: "#f01a05", fontWeight: "700" }}>Add customer</Text>
                    </View>
                    <TouchableOpacity onPress={hideModal} style={{ width: "20%", height: "100%", justifyContent: "center", alignItems: "center" }}>
                        <Text><Entypo name='cross' size={30} color='black' /></Text>
                    </TouchableOpacity>
                </Pressable>

                {errorMessage != '' && (
                    <View style={{ width: "90%", height: 40, justifyContent: "center", alignItems: "center", alignSelf: "center", borderRadius: 6, backgroundColor: "#f2be25", elevation: 2, display: "flex", flexDirection: "row" }}>
                        <Text style={{ fontSize: 14, fontWeight: "700", color: "#000", width: "90%", paddingLeft: 5 }}>{errorMessage}</Text>
                        <TouchableOpacity onPress={() => ErrorMessageClose()} style={{ width: "10%" }}><Text style={{ fontSize: 14, fontWeight: "700", color: "#000" }}>X</Text></TouchableOpacity>
                    </View>
                )}

                <ScrollView style={{ width: "100%", alignSelf: "center", paddingLeft: "5%", paddingRight: "5%" }}>
                    <TextInput style={styles.customerInput} placeholder='Customer name' placeholderTextColor='#000' onChangeText={(text) => setFullName(text)} value={FullName} />
                    <TextInput style={styles.customerInput} placeholder='Customer Mobile' placeholderTextColor='#000' onChangeText={(text) => setMobileNumber(text)} value={MobileNumber} maxLength={10} keyboardType="numeric" />
                    <TextInput style={styles.customerInput} placeholder='Mail id' placeholderTextColor='#000' onChangeText={(text) => setEmail(text)} value={Email} />
                    <TextInput style={styles.customerInput} placeholder='Consumer number' placeholderTextColor='#000' onChangeText={(text) => setConsumerNumber(text)} value={ConsumerNumber} keyboardType="numeric" />
                    <TextInput style={styles.customerInput} placeholder='Address' placeholderTextColor='#000' onChangeText={(text) => setAddress(text)} value={Address} />
                    <TextInput style={styles.customerInput} placeholder='Pincode' placeholderTextColor='#000' onChangeText={(text) => setPincode(text)} value={Pincode} keyboardType="numeric" />
                    <TextInput style={styles.customerInput} placeholder='Password' placeholderTextColor='#000' onChangeText={(text) => setPassword(text)} value={Password} />


                    <TouchableOpacity onPress={() => handleToCreateCustomer()} style={styles.btn}>
                        <Text>Submit</Text>
                    </TouchableOpacity>
                </ScrollView>
            </Modal>


        </SafeAreaView>
    )
}

export default CustomerList

const styles = StyleSheet.create({
    PageContainer: { backgroundColor: "#fff", height: "100%" },
    customerInput: { backgroundColor: "#fff", borderWidth: 1, width: "100%", borderRadius: 5, marginTop: 5, marginBottom: 5, paddingLeft: 15 },
    btn:{ width: "100%", height: 45, backgroundColor: "#f2be25", borderWidth: 1, borderColor: "#000", borderRadius: 6, justifyContent: "center", alignItems: "center", marginTop: 50 }
  
})