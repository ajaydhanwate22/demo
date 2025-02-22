import { StyleSheet, View, ScrollView, Pressable, TouchableOpacity, TextInput, Image, PermissionsAndroid, Platform, Alert, ActivityIndicator } from 'react-native'
import React, { useState, useEffect ,useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'react-native-paper';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Geolocation from 'react-native-geolocation-service';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Geocoding from 'react-native-geocoding';
import axios from 'axios';

const LocationReport = ({navigation}) => {

    const [location, setLocation] = useState(null);
    const [address, setAddress] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Request Location Permission
    const requestLocationPermission = async () => {
        if (Platform.OS === 'android') {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: 'Location Permission',
                    message:
                        'This app needs access to your location to show your current position.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                }
            );
            return granted === PermissionsAndroid.RESULTS.GRANTED;
        }
        return true; // iOS permissions are handled automatically
    };

    // const getCurrentLocation = async () => {
    //     const hasPermission = await requestLocationPermission();
    //     if (!hasPermission) {
    //         Alert.alert('Permission Denied', 'Location permission is required');
    //         return;
    //     }

    //     Geolocation.getCurrentPosition(
    //         (position) => {
    //             const { latitude, longitude } = position.coords;
    //             setLocation({ latitude, longitude });
    //         },
    //         (error) => {
    //             console.error(error);
    //             Alert.alert('Error', 'Unable to fetch location: ' + error.message);
    //         },
    //         { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    //     );
    // };

    // const getCurrentLocation = async () => {
    //     const hasPermission = await requestLocationPermission();
    //     if (!hasPermission) {
    //         Alert.alert('Permission Denied', 'Location permission is required');
    //         return;
    //     }

    //     Geolocation.getCurrentPosition(
    //         async (position) => {
    //             const { latitude, longitude } = position.coords;
    //             setLocation({ latitude, longitude });

    //             try {
    //                 // Reverse Geocoding - Offline
    //                 const response = await Geocoding.from(latitude, longitude);

    //                 if (response.results.length > 0) {
    //                     const addressComponents = response.results[0].address_components;

    //                     // Extract city and area name
    //                     const city = addressComponents.find((component) =>
    //                         component.types.includes('locality')
    //                     )?.long_name;

    //                     const area = addressComponents.find((component) =>
    //                         component.types.includes('sublocality_level_1')
    //                     )?.long_name;

    //                     // setAddress({ area, city });
    //                     setAddress({addressComponents });
    //                 } else {
    //                     Alert.alert('Error', 'Unable to fetch address.');
    //                 }
    //             } catch (error) {
    //                 console.error(error);
    //                 Alert.alert('Error', 'Failed to fetch address: ' + error.message);
    //             }
    //         },
    //         (error) => {
    //             console.error(error);
    //             Alert.alert('Error', 'Unable to fetch location: ' + error.message);
    //         },
    //         { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    //     );
    // };

    // const fetchLocation = async () => {
    //     setLoading(true);
    //     setError(null); // Reset any previous errors
    //     try {
    //       const response = await fetch('https://ipinfo.io/152.58.19.41?token=d2b5d471357514');
    //       if (!response.ok) {
    //         throw new Error('Failed to fetch location data');
    //       }

    //       const data = await response.json();
    //       setLocation({
    //         ip: data.ip,
    //         city: data.city,
    //         region: data.region,
    //         country: data.country,
    //         loc: data.loc,
    //         postal: data.postal,
    //       });
    //     } catch (err) {
    //       setError(err.message);
    //     } finally {
    //       setLoading(false);
    //     }
    //   };

    //   useEffect(() => {
    //     fetchLocation(); // Fetch location data when the component mounts
    //   }, []);


    // const fetchLocation = async () => {
    //     setLoading(true);
    //     setError(null); // Reset previous errors
    //     try {
    //       const response = await fetch('https://ipinfo.io/152.58.19.41?token=d2b5d471357514');
    //       if (!response.ok) {
    //         throw new Error('Failed to fetch location data');
    //       }

    //       const data = await response.json();
    //       console.log(data);
    //       setLocation({
    //         city: data.city || 'Unknown',
    //         region: data.region || 'Unknown',
    //         postal: data.postal || 'Unknown',
    //         country: data.country || 'Unknown',
    //         area: data.org || 'Unknown',
    //       });
    //     } catch (err) {
    //       setError(err.message);
    //     } finally {
    //       setLoading(false);
    //     }
    //   };

    //   useEffect(() => {
    //     fetchLocation(); // Fetch location on component mount
    //   }, []);

    //   const getLocation = async () => {
    //     setLoading(true);
    //     setError(null);

    //     try {
    //       // Request location permissions for Android
    //       if (Platform.OS === 'android') {
    //         const granted = await PermissionsAndroid.request(
    //           PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    //         );

    //         if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
    //           setError('Location permission denied');
    //           setLoading(false);
    //           return;
    //         }
    //       }

    //       // Get the current location
    //       Geolocation.getCurrentPosition(
    //         async (position) => {
    //           const { latitude, longitude } = position.coords;

    //           // Fetch the address using reverse geocoding (via OpenStreetMap API)
    //           const response = await fetch(
    //             `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
    //           );
    //           const data = await response.json();
    //           console.log('data:', JSON.stringify(data, null, 2));

    //           setLocation({
    //             latitude : data.lat,
    //             longitude :data.lon,
    //             pincode :data.address.postcode,
    //             city :data.address.city,
    //             district :data.address.state_district,
    //             state :data.address.state,
    //             country :data.address.country,
    //             fullAddress :data.display_name,
    //           });

    //           const formData = new FormData();

    //           formData.append('latitude', data.lat);
    //           formData.append('longitude', data.lon);
    //           formData.append('pincode', data.address.postcode);
    //           formData.append('city', data.address.city);
    //           formData.append('district', data.address.state_district);
    //           formData.append('state', data.address.state);
    //           formData.append('country', data.address.country);

    //           const responses = await axios.post('https://realrate.store/AkshayUrjaSolar/Customer_Location_Update_Api.php', formData, {
    //               headers: { 'Content-Type': 'multipart/form-data' },
    //           });

    //           console.log('Response:', resporesponsesnse.data);

    //           if(responses.data.errmessage){
    //               Alert.alert('Alert', responses.data.errmessage);                  
    //           }else{
    //               Alert.alert('Message', 'Location Added SuccessFully');
    //             //   fetchStoreEmployees();
    //           }

    //           setLoading(false);
    //         },
    //         (error) => {
    //           setError(error.message);
    //           setLoading(false);
    //         },
    //         { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    //       );
    //     } catch (err) {
    //       setError(err.message);
    //       setLoading(false);
    //     }
    //   };
   
    const getLocation = async () => {
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
                            custId:  '1',
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
                                // Optionally refresh data or call additional functions
                                // fetchStoreEmployees();
                     fetchLocationHistory();
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

    //   useEffect(() => {  
    //     getLocation(); // Fetch location on component mount
    //   }, []);


    // fetch login Profile Details From Store  Start
   
    const [LocationHistory, setLocationHistory] = useState('');
   
    // Fetch employees and attendance data from the API
    const fetchLocationHistory = async () => {
        try {
            const response = await axios.get(`https://realrate.store/AkshayUrjaSolar/Customer_Location_History_fetch_Api.php?cust_Id=1`);
            const fetchedLocationHistroy = response.data;

            console.log('Customer Location History' + response);
            setLocationHistory(fetchedLocationHistroy);
        } catch (error) {
            console.error('Error fetching fetchedLocationHistroy:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLocationHistory();
    }, []);

    
  useFocusEffect(
    useCallback(() => {
      // Call functions or refresh data when this screen is focused
      fetchLocationHistory();
      
    }, [])
  );
    return (
        <SafeAreaView style={styles.PageContainer}>
            <ScrollView>
                <Pressable style={{ width: "100%", height: 120, backgroundColor: "#f9f4f4" }}>
                    <View style={{ width: "90%", height: 45, alignSelf: "center" }}>
                        <TouchableOpacity onPress={() => navigation.goBack()}  style={{ width: "15%", height: "100%", justifyContent: "center", alignItems: "center", marginTop:10 }}>
                            <Text style={{fontSize:26}}>X</Text>
                        </TouchableOpacity>
                    </View>
                </Pressable>
                <Pressable style={{ width: "90%", alignSelf: "center", height: 80, marginTop: -40, display: "flex", flexDirection: "row" }}>
                    <View style={{ width: 70, height: 70, backgroundColor: "#fff", borderRadius: 50, justifyContent: "center", alignItems: "center" }}>
                        <Text><FontAwesome6 name='user' size={50} color='black' /></Text>
                    </View>
                    <View style={{ height: 30, justifyContent: "flex-end", paddingLeft: 20 }}>
                        <Text style={{ fontSize: 18, color: "#f01a05", fontWeight: "700" }}>Akshay Sonwane </Text>
                    </View>
                </Pressable>


                <Pressable style={{ width: "90%", height: 110, alignSelf: "center", borderWidth: 1, justifyContent: "center", alignItems: "center", borderRadius: 5,}}>
                    <Text style={{ fontSize: 14, color: "#000", fontWeight: "500" }}>Day start time:  9.30 PM</Text>
                    <Text style={{ fontSize: 14, color: "#000", fontWeight: "500" }}>  Dte : 5/12/2024</Text>
                    <TouchableOpacity onPress={getLocation} style={{ width: "70%", height: 40, borderRadius: 50, backgroundColor: "#01a30c", justifyContent: "center", alignItems: "center", marginTop: 5 }}>
                        <Text style={{ fontSize: 17, fontWeight: "bold", color: "#fffffe" }}>Update location </Text>
                    </TouchableOpacity>
                </Pressable>

                {location && (
               
                <Text style={styles.locationText}>
                    Latitude: {location.latitude}, Longitude: {location.longitude}
                </Text>
            )}


                {loading && <ActivityIndicator size="large" color="#0000ff" />}
                {error && <Text style={styles.error}>Error: {error}</Text>}
                {location ? (
                    <View>
                        <Text style={styles.info}>Latitude: {location.latitude}</Text>
                        <Text style={styles.info}>Longitude: {location.longitude}</Text>
                        <Text style={styles.info}>pinocde: {location.pincode}</Text>
                        <Text style={styles.info}>City: {location.city}</Text>
                        <Text style={styles.info}>district: {location.district}</Text>
                        <Text style={styles.info}>State: {location.state}</Text>
                        <Text style={styles.info}>Country: {location.country}</Text>
                        <Text style={styles.info}>Full Address: {location.fullAddress}</Text>
                        <Text style={styles.info}> addressType: {location.addressType}</Text>
                        <Text style={styles.info}> name: {location.name}</Text>
                        <Text style={styles.info}> type: {location.type}</Text>
                        <Text style={styles.info}> class: {location.class}</Text>
                    </View>
                ) : (
                    !loading && <Text style={{paddingLeft:20}}></Text>
                )}
                

                <Pressable style={{ width: "90%", alignSelf: "center", height: 40, justifyContent: "center" }}>
                    <Text style={{ fontSize: 14, fontWeight: "700", color: "#f01a05" }}>Location History </Text>
                </Pressable>

                <View style={{flexDirection:'row', paddingHorizontal:20, justifyContent:'space-between' }}>
                    <TouchableOpacity style={{flexDirection:'row', gap:10,paddingVertical:10, paddingHorizontal:10, backgroundColor: 'rgb(193, 188, 188)', paddingRight:20, justifyContent:"center", alignItems:'center'}}>
                        <Ionicons name="calendar-outline" size={25} color="#000000" style={{ }} />
                        <Text style={{fontSize: 14, fontWeight:'700'}}>01/01/2025</Text>
                    </TouchableOpacity>
                    <View style={{justifyContent:'center', alignItems:"center"}}>
                        <Text style={{textAlign:'center',fontSize: 14 }}>TO</Text>
                    </View>
                    <TouchableOpacity style={{flexDirection:'row', gap:10,paddingVertical:10, paddingHorizontal:10, backgroundColor: 'rgb(193, 188, 188)', paddingRight:20, justifyContent:"center", alignItems:'center'}}>
                        <Ionicons name="calendar-outline" size={25} color="#000000" style={{ }} />
                        <Text style={{fontSize: 14, fontWeight:'700'}}>20/01/2025</Text>
                    </TouchableOpacity>
                </View>

                {loading ? (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 800 }}>
                        <ActivityIndicator size="large" color="#0000ff" />
                        <Text>Loading...</Text>
                    </View>
                ) : Array.isArray(LocationHistory) && LocationHistory.length > 0 ? (
                    // Show the list of dealers if available
                    LocationHistory.map((item, index) => {
                        const convertTo12Hour = (time24) => {
                            let [hours, minutes] = time24.split(':');
                            hours = parseInt(hours, 10);
                            const suffix = hours >= 12 ? 'PM' : 'AM';
                            hours = hours % 12 || 12; // Converts 0 to 12, and 13-23 to 1-11
                            return `${hours}:${minutes} ${suffix}`;
                          };
                        //    Function to format date as "DD-MM-YYYY"
  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

                        return (
                            <>
                      
                            <Pressable key={index} style={{ width: "90%", alignSelf: "center", height: 90, borderBottomWidth: 1, justifyContent: "center", marginTop:10 }}>
                                <Text style={{ fontSize: 14, fontWeight: "bold", color: "#000" }}>{item.city} - {item.pincode}, {item.district} - {item.state}</Text>
                                <Text style={{ fontSize: 14, fontWeight: "500", color: "#000" }}>Time : {convertTo12Hour(item.times)}</Text>
                                <Text style={{ fontSize: 14, fontWeight: "500", color: "#000" }}>Date : {formatDate(item.dates)}</Text>
                                <Text style={{ fontSize: 14, fontWeight: "500", color: "#000" }}>Reason :</Text>
                            </Pressable>
                            </>
                        );
                    })
                ) : (
                    <View style={{ width: '100%', marginTop: 50, height: 400, justifyContent: 'center', alignItems: 'center' }}>

                        <Text style={{ fontSize: 40, fontWeight: '700', color: '#000' }}>
                            Sorry <Text style={{ color: 'red', fontSize: 40, fontWeight: '700' }}>!</Text>
                        </Text>
                        <Text style={{ color: 'red', fontSize: 22, fontWeight: '700', textAlign: 'center', marginTop: 30, padding:20 }}>
                            There's No Update <Text style={{ fontSize: 25, fontWeight: '700', color: '#000' }}>Found.</Text>
                        </Text>
                    </View>
                )}
            </ScrollView>


                            <Pressable style={{ width: "100%", height: 70, justifyContent: "center", alignItems: "center", backgroundColor: "#ffffff", elevation: 3 }}>
                                <TouchableOpacity style={{ width: "90%", height: 50, backgroundColor: "#f2be25", borderRadius: 6, justifyContent: "center", alignItems: "center" }}>
                                  <View style={{flexDirection: 'row', gap:10}}>
                                  <Text style={{ fontSize: 16, fontWeight: "700", color: "#000000", alignSelf:"center" }}>Generate PDF</Text>
                                  </View>
                                </TouchableOpacity>
                            </Pressable>
        </SafeAreaView>
    )
}

export default LocationReport

const styles = StyleSheet.create({
    PageContainer: { backgroundColor: "#fff", height: "100%" },
    logo: { width: "50%", height: 80, marginTop: 15 },



})