import { StyleSheet, View, Pressable, ScrollView, TouchableOpacity, Image, Modal, TextInput, Alert, ActivityIndicator, Animated, Easing, PermissionsAndroid, Platform, } from 'react-native'
import React, { useState, useEffect, useCallback, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Searchbar, Text, RadioButton } from 'react-native-paper';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from 'react-native-geolocation-service';
import Geocoding from 'react-native-geocoding';
import DateTimePicker from '@react-native-community/datetimepicker';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Picker } from '@react-native-picker/picker';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import HomeHeader from '../components/HomeHeader';

const Stock = ({ navigation }) => {


  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState('');  // 'IN' or 'OUT'
  const [quantity, setQuantity] = useState('');
  const [purchasePrice, setPurchasePrice] = useState(''); // This could be dynamically fetched

  // Function to open modal for "Stock IN" or "Stock OUT"
  const openModal = (type) => {
    setModalType(type);
    setModalVisible(true);
  };


  const [searchQuery, setSearchQuery] = React.useState('');
  const [StartVisible, setStartVisible] = useState(false);

  const showStartModal = () => setStartVisible(true);
  const hideStartModal = () => setStartVisible(false);

  const [UnitVisible, setUnitVisible] = useState(false);

  const showUnitModal = () => setUnitVisible(true);
  const hideUnitModal = () => setUnitVisible(false);



  const [UnitList, setUnitList] = useState([]);
  const [filteredUNits, setFilteredUnits] = useState([]);
  const [loading, setLoading] = useState(false);

  const CustomerList = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`https://realrate.store/AkshayUrjaSolar/Units_fetch_Api.php`);
      // Ensure response data is an array
      const fetchedCustomers = Array.isArray(response.data) ? response.data : [];
      console.log(fetchedCustomers);
      setUnitList(fetchedCustomers);

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
    if (UnitList && Array.isArray(UnitList)) {
      const filtered = UnitList.filter(UnitList => UnitList.unit_name.toLowerCase().includes(searchQuery.toLowerCase()));
      setFilteredUnits(filtered);
    }
  }, [searchQuery, UnitList]);


  // Auto-select the first record when filteredUNits changes
  useEffect(() => {
    if (filteredUNits.length > 0) {
      setSelectedUnit(filteredUNits[0].unit_name);
    }
  }, [filteredUNits]);

  const [selectedUnit, setSelectedUnit] = useState(null); // Store the selected radio button value

  const handleRadioButtonChange = (unitName) => {
    setSelectedUnit(unitName); // Update the selected unit
    console.log(`${unitName} is selected`); // Print the selected unit_name
    hideUnitModal();
  };


  const [imageUri, setImageUri] = React.useState(null);

  const selectImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.error('ImagePicker Error: ', response.error);
      } else {
        console.log(response.assets[0].uri);
        setImageUri(response.assets[0].uri); // Set the image URI to state
      }
    });
  };
  console.log(selectedUnit);



    const [StocName, setStocName] = useState('');
    const [StocSellingPrice, setStocSellingPrice] = useState('');
    const [StocDealerPrice, setStocDealerPrice] = useState('');
    const [StocOpeningStock, setStocOpeningStock] = useState('');
    const [StocLowtock, setStocLowtock] = useState('');
    const [StockHsn, setStockHsn] = useState('');
    const [StockGst, setStockGst] = useState('');
    const [errorMessage, setErrorMessage] = useState('');


    const ErrorMessageClose = () => {
      setErrorMessage('');
  }


  const handleToCreateStock = async () => {
    try {
      setLoading(true); // Uncomment this to show loading indicator
      const formData = new FormData();

      formData.append('StocName', StocName);
      formData.append('selectedUnit', selectedUnit);
      formData.append('StocSellingPrice', StocSellingPrice);
      formData.append('StocDealerPrice', StocDealerPrice);
      formData.append('StocOpeningStock', StocOpeningStock);
      formData.append('StocLowtock', StocLowtock);
      formData.append('StockHsn', StockHsn);
      formData.append('StockGst', StockGst);

       // Check if an image is selected
       if (imageUri) {
        formData.append('image', {
            uri: imageUri,
            type: 'image/jpeg', // Adjust the type according to the image format
            name: 'product_image.jpg', // You can specify any file name
        });
    }
    console.log('formData ' + formData);

      const response = await axios.post('https://realrate.store/AkshayUrjaSolar/Stock_Add_Api.php', formData, {
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
        Alert.alert("Message", "Stock Added SuccessFully");
        // navigation.navigate('SplashScreen');
        hideStartModal();
        setStocName('');
        setStocLowtock();
        setStocDealerPrice('');
        setStocOpeningStock('');
        setStockHsn('');
        setStockGst('');
        setImageUri('');

      }
      // Handle the response
    } catch (error) {
      console.error('Signup failed:', error.message);
      Alert.alert('Error Message', error.message);
    } finally {
      setLoading(false); // Uncomment this to hide loading indicator
    }
  };

  return (
    <SafeAreaView style={styles.PageContainer}>

      {/* Top Header */}
    <Pressable style={{ width: "100%", height: "8%", marginBottom: 25 }}>
    <HomeHeader />
  </Pressable>

        <View style={{paddingHorizontal:20, gap:15, backgroundColor:"rgba(210, 200, 200, 0.5)", marginTop:"-4%", paddingTop:10, paddingBottom:20}}>
          <View style={{flexDirection:"row", justifyContent:"space-between", width:"100%"}}>
          <TouchableOpacity style={{ width: "32%" }} onPress={() => navigation.navigate('')} >
          <LinearGradient  colors={['#ffde59', '#ff914d']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
              style={{ borderRadius: 10, padding: 10, gap: 10 }} >
                 <View style={{flexDirection:'row', justifyContent:"space-between"}}>
                 <Text style={{ fontSize: 17, fontWeight: "800", textAlign: "center", verticalAlign: "middle" }}><FontAwesome5 name='solar-panel' size={20} color='black' /></Text>
                    <Text style={{ textAlign: "center", fontSize: 16,color: "#000" }}>15</Text>
                  </View>
                  <View>
                    <Text style={{fontWeight:'bold',textAlign: "center", fontSize: 16,}}>Total stock</Text>
                  </View>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity style={{ width: "32%" }} onPress={() => navigation.navigate('')} >
          <LinearGradient  colors={['#ffde59', '#ff914d']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
              style={{ borderRadius: 10, padding: 10, gap: 10 }} >
                 <View style={{flexDirection:'row', justifyContent:"space-between"}}>
                 <Text style={{ fontSize: 17, fontWeight: "800", textAlign: "center", verticalAlign: "middle" }}><Ionicons name='document-text-sharp' size={20} color='black' /></Text>
                    <Text style={{ textAlign: "center", fontSize: 16,color: "#000" }}>1000</Text>
                  </View>
                  <View>
                    <Text style={{fontWeight:'bold',textAlign: "center", fontSize: 16,}}>Stock Value</Text>
                  </View>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={{ width: "32%" }} onPress={() => navigation.navigate('')} >
          <LinearGradient  colors={['#ffde59', '#ff914d']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
              style={{ borderRadius: 10, padding: 10, gap: 10 }} >
                 <View style={{flexDirection:'row', justifyContent:"space-between"}}>
                 <Text style={{ fontSize: 17, fontWeight: "800", textAlign: "center", verticalAlign: "middle" }}><FontAwesome name='battery-1'  size={20} color='black' /></Text>
                    <Text style={{ textAlign: "center", fontSize: 16,color: "#000" }}>03</Text>
                  </View>
                  <View>
                    <Text style={{fontWeight:'bold',textAlign: "center", fontSize: 16,}}>Low stock</Text>
                  </View>
            </LinearGradient>
          </TouchableOpacity>
          </View>
      </View>

                            <Pressable style={{ width: "90%", alignSelf: "center", height: 50, marginTop: 15, marginBottom: 15 }}>
                                <Searchbar
                                    // placeholder="Search"
                                    onChangeText={setSearchQuery}
                                    value={searchQuery}
                                    style={{ width: "100%", height: "100%",backgroundColor: '#f9f4f4'  }}
                                />
                            </Pressable>

                            <Pressable style={{width:"100%", backgroundColor:"#f2be25"}}>
                            <Text style={{padding:8, fontWeight:"bold", paddingLeft:40, fontSize:16.1}}>All Product</Text>
                            </Pressable>

                            <Pressable style={{padding:10,paddingLeft:20, width:"100%",borderBottomWidth: 3,  borderBottomColor: "rgb(212, 212, 212)"}}>
                              <View style={{flexDirection:'row',}}>
                              <View style={{backgroundColor:"#e7e7e7", height:70, width:"22%", borderRadius:10,justifyContent: 'center', alignItems: 'center' }}>
                                  <Text style={{ fontSize: 17, fontWeight: "800", width: "50%", height: "40%", textAlign: "center", verticalAlign: "middle" }}><MaterialIcons name='attach-money' size={35} color='black' /></Text>
                                  </View>
                                  <Text style={{padding:20,}}>Solar Panel</Text>
                              </View>
                              <View style={{flexDirection:"row", marginTop:5}}>
                              <View style={{width:'20%',justifyContent:"center", alignItems:"center"}}>
                              <Text style={{fontSize:12}}>Sale Price</Text>
                              <Text style={{fontWeight:"bold", fontSize:16}}>₹ 50000 </Text>
                              </View>
                              <View style={{width:'40%',justifyContent:"center", alignItems:"center"}}>
                              <Text style={{fontSize:12}}>Current Stock</Text>
                              <Text style={{fontWeight:"bold", fontSize:16}}>56</Text>
                              </View>
                              <View style={{width:'40%',justifyContent:"center", alignItems:"center",flexDirection:"row", gap:5}}>
                                <TouchableOpacity onPress={() => openModal('IN')} style={{borderWidth:1, borderRadius:15}} >
                                <Text style={{padding:8, paddingHorizontal:15}}>+ IN</Text>
                                </TouchableOpacity>
                                <TouchableOpacity  onPress={() => openModal('OUT')} style={{borderWidth:1, borderRadius:15}} >
                                <Text style={{padding:8, paddingHorizontal:10}}>- OUT</Text>
                                </TouchableOpacity>
                              </View>
                              </View>
                            </Pressable>


                            <Pressable style={{padding:10,paddingLeft:20, width:"100%",borderBottomWidth: 3,  borderBottomColor: "rgb(212, 212, 212)"}}>
                              <View style={{flexDirection:'row',}}>
                              <View style={{backgroundColor:"#e7e7e7", height:70, width:"22%", borderRadius:10,justifyContent: 'center', alignItems: 'center' }}>
                                  <Text style={{ fontSize: 17, fontWeight: "800", width: "50%", height: "40%", textAlign: "center", verticalAlign: "middle" }}><MaterialIcons name='attach-money' size={35} color='black' /></Text>
                                  </View>
                                  <Text style={{padding:20,}}>Solar Panel</Text>
                              </View>
                              <View style={{flexDirection:"row", marginTop:5}}>
                              <View style={{width:'20%',justifyContent:"center", alignItems:"center"}}>
                              <Text style={{fontSize:12}}>Sale Price</Text>
                              <Text style={{fontWeight:"bold", fontSize:16}}>₹ 50000 </Text>
                              </View>
                              <View style={{width:'40%',justifyContent:"center", alignItems:"center"}}>
                              <Text style={{fontSize:12}}>Current Stock</Text>
                              <Text style={{fontWeight:"bold", fontSize:16}}>56</Text>
                              </View>
                              <View style={{width:'40%',justifyContent:"center", alignItems:"center",flexDirection:"row", gap:5}}>
                                <TouchableOpacity onPress={() => openModal('IN')} style={{borderWidth:1, borderRadius:15}} >
                                <Text style={{padding:8, paddingHorizontal:15}}>+ IN</Text>
                                </TouchableOpacity>
                                <TouchableOpacity  onPress={() => openModal('OUT')} style={{borderWidth:1, borderRadius:15}} >
                                <Text style={{padding:8, paddingHorizontal:10}}>- OUT</Text>
                                </TouchableOpacity>
                              </View>
                              </View>
                            </Pressable>
                            <View style={{ backgroundColor: "rgba(238, 237, 236, 0.8)", height:400}}>

                              
                            </View>

                              {/* Modal for Stock In and Stock Out */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            padding: 20,
          }}
        >
          <View
            style={{
              width: '90%',
              backgroundColor: 'white',
              borderRadius: 10,
              padding: 20,
            }}
          >
            {/* Modal Header */}
            <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}>
              {modalType === 'IN' ? 'Stock In' : 'Stock Out'}
            </Text>

            {/* Modal Subheader */}
            <Text style={{ fontSize: 14, textAlign: 'center', marginTop: 10 }}>
              Enter Quantity of Purchase Item
            </Text>

            {/* Quantity Input */}
            <TextInput
              style={{
                borderWidth: 1,
                borderRadius: 5,
                padding: 10,
                marginTop: 10,
                fontSize: 16,
              }}
              keyboardType="numeric"
              placeholder="Enter Quantity"
              value={quantity}
              onChangeText={setQuantity}
            />

            <View style={{ marginTop: 20 }}>
              {/* Purchase Price and Stock In Unit */}
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'  }}>
                <Text style={{ fontWeight: 'bold' }}>Purchase Price:</Text>
                <View style={{backgroundColor:"#e7e7e7", borderWidth:1, borderColor:"black",width:"30%", justifyContent:"center", alignItems:"center", height: 40,}}>
                <Text style={{ fontWeight: 'bold', padding: 10}}>₹ 5000</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' , marginTop:10 }}>
                <Text style={{ fontWeight: 'bold' }}>Stock In Unit </Text>
                <View style={{backgroundColor:"#e7e7e7", borderWidth:1, borderColor:"black",width:"30%", justifyContent:"center", alignItems:"center", height: 40,}}>
                <Text style={{ fontWeight: 'bold', padding: 10}}>Today</Text>
                </View>
              </View>
            </View>

            {/* Stock In Button */}
            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
                // Add logic for stock in or out, for example:
                // Update stock value, handle price updates, etc.
              }}
              style={{
                backgroundColor: '#f2be25',
                padding: 15,
                borderRadius: 15,
                marginTop: 20,
                alignItems: 'center',
              }}
            >
              <Text style={{ color: 'black', fontWeight: 'bold' }}>Stock {modalType === 'IN' ? 'In' : 'Out'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
                            



      <Pressable style={{ width: "90%", height: 55, alignSelf: "center", justifyContent: "center", alignItems: "flex-end", position: "absolute", bottom: 10 }}>
        <TouchableOpacity onPress={() => showStartModal()} style={{ width: "50%", height: 45, borderRadius: 45, backgroundColor: "#f01a05", justifyContent: "center", alignItems: "center", flexDirection:"row", gap:10 }}>
          <Entypo name="plus" size={20} color="#f01a05" style={{backgroundColor:"#f2be25", borderRadius:25}} />
          <Text style={{ fontSize: 17, fontWeight: "700", color: "#ffff",  }}>Add Product</Text>
        </TouchableOpacity>
      </Pressable>
      {/* Add Daily Tast  Start Modal */}

      <Modal visible={StartVisible} style={{ width: "100%", height: "100%", backgroundColor: "#000" }}>
        {/* Top Header */}
        <Pressable style={{ width: "90%", alignSelf: "center", height: 70, display: "flex", flexDirection: "row", marginBottom: 10 }}>
          <TouchableOpacity onPress={() => hideStartModal()} style={{ width: "15%", height: "100%", justifyContent: "center", }}>
            <Text><MaterialIcons name='arrow-back-ios' size={30} color='black' /></Text>
          </TouchableOpacity>
          <View style={{ width: "85%", height: "100%", justifyContent: "center" }}>
            <Text style={{ fontSize: 18, color: "#000", fontWeight: "700" }}>Stocks</Text>
          </View>
        </Pressable>

        <ScrollView>

          <Pressable style={{ width: "90%", alignSelf: "center", height: 75, display: "flex", flexDirection: "row" }}>
            <View style={{ width: "70%", height: "100%", justifyContent: "center", alignItems: "center" }}>
              <TextInput placeholder='Enter Item name Here' placeholderTextColor='#000' style={styles.customerInput} onChangeText={(text) => setStocName(text)} value={StocName} />
            </View>
            <View style={{ width: "30%", height: "100%", justifyContent: "center", alignItems: "center" }}>
              <TouchableOpacity onPress={selectImage} style={{ borderWidth: 1, borderColor: "#f2be25", justifyContent: "center", alignItems: "center", width: "80%", height: "80%", borderRadius: 7 }}>
                {imageUri != null ? (
                  <Image
                    source={{ uri: imageUri }}
                    style={{ width: "100%", height: "100%" }}
                  />
                ) : (
                  <View style={{ width: "100%", height: "100%", justifyContent: "center", alignItems: "center" }}>
                    <Text><EvilIcons name='camera' size={30} color='black' /></Text>
                    <Text>Photo</Text>
                  </View>
                )}

              </TouchableOpacity>
            </View>
          </Pressable>


          <TouchableOpacity onPress={() => setUnitVisible()} style={{ width: "90%", alignSelf: "center", height: 50, display: "flex", flexDirection: "row", marginTop: 15, borderWidth: 1, borderColor: "#f2be25", borderRadius: 6 }}>
            <View style={{ width: "80%", height: "100%", justifyContent: "center", paddingLeft: 10 }}>
              <Text style={{ fontSize: 16, fontWeight: "700", color: "#000" }}>{selectedUnit}</Text>
            </View>
            <View style={{ width: "20%", height: "100%", justifyContent: "center", alignItems: "center" }}>
              <Text><Entypo name='chevron-small-down' size={30} color='black' /></Text>
            </View>
          </TouchableOpacity>
          <Pressable style={{ width: "90%", alignSelf: "center", height: 75, display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: 15 }}>
            <View style={{ width: "48%", height: "100%", justifyContent: "center", }}>
              <Text style={{ fontSize: 14, fontWeight: "600", color: "#000" }}>Sale Price</Text>
              <TextInput placeholder='₹ Enter Price' placeholderTextColor='#000' style={styles.customerInput}  keyboardType="numeric"  onChangeText={(text) => setStocSellingPrice(text)} value={StocSellingPrice} />
            </View>
            <View style={{ width: "48%", height: "100%", justifyContent: "center", }}>
              <Text style={{ fontSize: 14, fontWeight: "600", color: "#000", textAlign: "left" }}>Purchase Price</Text>
              <TextInput placeholder='₹ Enter Price' placeholderTextColor='#000' style={styles.customerInput}  keyboardType="numeric"  onChangeText={(text) => setStocDealerPrice(text)} value={StocDealerPrice} />
            </View>
          </Pressable>

          <Pressable style={{ width: "90%", alignSelf: "center", height: 75, display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: 15 }}>
            <View style={{ width: "48%", height: "100%", justifyContent: "center", }}>
              <Text style={{ fontSize: 14, fontWeight: "600", color: "#000" }}>Opening Stock </Text>
              <TextInput placeholder='Enter Count' placeholderTextColor='#000' style={styles.customerInput}  keyboardType="numeric"  onChangeText={(text) => setStocOpeningStock(text)} value={StocOpeningStock} />
            </View>
            <View style={{ width: "48%", height: "100%", justifyContent: "center", }}>
              <Text style={{ fontSize: 14, fontWeight: "600", color: "#000", textAlign: "left" }}> Low Stock Alert</Text>
              <TextInput placeholder='Enter Count' placeholderTextColor='#000' style={styles.customerInput}  keyboardType="numeric"  onChangeText={(text) => setStocLowtock(text)} value={StocLowtock} />
            </View>
          </Pressable>
          <Pressable style={{ width: "90%", alignSelf: "center", height: 75, display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: 15 }}>
            <View style={{ width: "48%", height: "100%", justifyContent: "center", }}>
              <Text style={{ fontSize: 14, fontWeight: "600", color: "#000" }}>HSN  </Text>
              <TextInput placeholder='Enter HSN' placeholderTextColor='#000' style={styles.customerInput}   onChangeText={(text) => setStockHsn(text)} value={StockHsn}/>
            </View>
            <View style={{ width: "48%", height: "100%", justifyContent: "center", }}>
              <Text style={{ fontSize: 14, fontWeight: "600", color: "#000", textAlign: "left" }}>GST%</Text>
              <TextInput placeholder='Enter GST' placeholderTextColor='#000' style={styles.customerInput}  keyboardType="numeric"  onChangeText={(text) => setStockGst(text)} value={StockGst}/>
            </View>
          </Pressable>

          <Pressable style={{ width: "90%", height: 50, alignSelf: "center", marginTop:100 }}>
          <TouchableOpacity onPress={()=> handleToCreateStock()} style={styles.btn}>
            <Text>Submit</Text>
          </TouchableOpacity>
        </Pressable>


        </ScrollView>
      
      </Modal>

      {/* Add daily Task  Start Modal */}



      <Modal visible={UnitVisible} style={{ width: "100%", height: "90%", }} transparent={true}>
        <Pressable style={{ width: "100%", height: "10%", backgroundColor: "transparent" }}>
          <TouchableOpacity onPress={() => hideUnitModal()} style={{ width: "20%", alignSelf: "flex-end", justifyContent: "center", alignItems: "center", height: "100%" }}>
            <Text style={{ fontSize: 18, fontWeight: "bold", color: "#000" }}>X</Text>
          </TouchableOpacity>
        </Pressable>
        <Pressable style={{ width: "100%", height: "90%", backgroundColor: "#fff", position: "absolute", bottom: 0, elevation: 4, borderTopLeftRadius: 25, borderTopRightRadius: 25, }}>


          <TouchableOpacity onPress={() => hideUnitModal()} style={{ width: "100%", height: 50, alignItems: "center" }}>
            <Text style={{ backgroundColor: "#f2be25", height: 5, width: 100, borderRadius: 5, marginTop: 10 }}></Text>
          </TouchableOpacity>

          <Searchbar style={{ width: "90%", alignSelf: "center", marginTop: 15 }} placeholder="Search" onChangeText={setSearchQuery} value={searchQuery} />
          <ScrollView>

            {loading ? (
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 800 }}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Loading...</Text>
              </View>
            ) : filteredUNits.length > 0 ? (
              filteredUNits.map((item, index) => {
                return (
                  <Pressable key={index} style={{ width: "90%", alignSelf: "center", backgroundColor: "#fff", height: 50, display: "flex", flexDirection: "row" }}>
                    <View style={{ width: "80%", height: "100%", justifyContent: "center" }}>
                      <Text style={{ fontSize: 18, color: "#000" }}>{item.unit_desc} - {item.unit_name}</Text>
                    </View>
                    <View style={{ width: "20%", height: "100%", justifyContent: "center", alignItems: "center" }}>
                      <RadioButton
                        value={item.unit_name}
                        status={selectedUnit === item.unit_name ? 'checked' : 'unchecked'}
                        onPress={() => handleRadioButtonChange(item.unit_name)}
                      />
                    </View>
                  </Pressable>
                )
              })
            ) : (
              <View style={{ width: '100%', marginTop: 50, height: 400, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Not Found</Text>
              </View>
            )}
          </ScrollView>
          {/* <Pressable style={{ width: "100%", height: 70, backgroundColor: "#FFF", elevation: 3, paddingLeft: 15, paddingRight: 15, paddingTop: 10, paddingBottom: 10 }}>
            <TouchableOpacity onPress={() => GoToSelectUnit()} style={styles.btn}>
              <Text>Submit</Text>
            </TouchableOpacity>
          </Pressable> */}
        </Pressable>

      </Modal>
    </SafeAreaView>

  )
}

export default Stock

const styles = StyleSheet.create({
  PageContainer: { backgroundColor: "#fff", height: "100%" },
  customerInput: { backgroundColor: "#fff", borderWidth: 1, borderColor: "#f2be25", width: "100%", borderRadius: 5, paddingLeft: 15, height: "80%" },
  btn: { width: "100%", height: "100%", backgroundColor: "#f2be25", borderWidth: 1, borderColor: "#000", borderRadius: 6, justifyContent: "center", alignItems: "center" },

})