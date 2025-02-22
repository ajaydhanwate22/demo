import { StyleSheet, View, Pressable, ScrollView, TouchableOpacity, Image, Modal, TextInput,SafeAreaView, Text,FlatList , Searchbar } from 'react-native'
import React, {useState,useEffect } from 'react'
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';


const Requestforadvanced = () => {

    const navigation = useNavigation();

    const [selectedMonth, setSelectedMonth] = useState("Select Month");
    const [modalVisible, setModalVisible] = useState(false);

    const months = [
      'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
    ];

  // Set the current month as the default selected month
  useEffect(() => {
    const currentMonth = new Date().getMonth(); // 0-based index
    setSelectedMonth(months[currentMonth]);  // Set the current month in the state
  }, []);

  // Handle month selection
  const handleMonthSelect = (month) => {
    setSelectedMonth(month);  // Update the selected month
    setModalVisible(false);  // Close the modal
  };
      
  return (
    <SafeAreaView style={styles.PageContainer}>
       <ScrollView>

                    <Pressable style={{ width: "100%", height: "100%", backgroundColor: "#fff" }}>
                        <Pressable style={{justifyContent:"space-between",flexDirection:'row', padding:20,}}>
                        <TouchableOpacity  onPress={() => navigation.goBack()}  style={{ alignItems: "center" }}>
                                      <Text style={{ fontSize: 26, color: "#000", fontWeight: "400" }}>X</Text>
                            </TouchableOpacity>
                        <Image source={{ uri: 'https://realrate.store/AkshayUrjaSolar/Images/akshyurjalogo.jpeg' }} 
                                style={{ width: 130,  height:50,justifyContent:"center" }}
                                resizeMode="contain"  
                              />
                          </Pressable>

                          <View style={{padding:20, flexDirection:'row', gap:10}}>
                            <TouchableOpacity style={{justifyContent:"center"}} onPress={() => navigation.navigate('AdvancedForm')} >
                               <Entypo name="plus" size={22} color="#f01a05" style={{backgroundColor:"#f2be25", borderRadius:25}} />
                            </TouchableOpacity>
                            <View style={{justifyContent:"center", }}>
                            <Text style={{ fontSize: 19, color: "#f01a05", fontWeight: "bold", }}>Request For Advanced</Text>
                            </View>
                            </View>


                            {/* serach box */}

                            <View style={{paddingHorizontal:20,marginBottom:20}}>
                                <View style={{backgroundColor: '#f9f4f4',borderRadius:20}}>
                                        <TextInput style={{justifyContent:"center", justifyContent:"center",paddingLeft:15}}  placeholder='search'/>
                                </View>                               
                            </View>

                              <View style={{ paddingHorizontal:20,marginBottom:10}}>
                                <View style={{flexDirection:"row", justifyContent:"space-between", width:"100%"}}>
                                <TouchableOpacity style={{ width: "50%" }}  onPress={() => setModalVisible(true)}>
                                <LinearGradient  colors={['#ffde59', '#ff914d']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                                    style={{ paddingLeft: 25, gap: 15, paddingBottom:35, paddingTop:10, paddingRight:10 }} >
                                       <View style={{gap: 10}}>
                                          <Text style={{ textAlign: "right", fontSize: 18, fontWeight: 'bold',color: "#000" }}>Advanced</Text>
                                          <View style={{flexDirection:"row", justifyContent:"center", gap:10}}>
                                          <AntDesign name={modalVisible ? "caretright" : "caretdown"} size={20} color="#000000" />   
                                          <Text style={{ textAlign: "center", fontSize: 16,color: "#000" }}>{selectedMonth} </Text>
                                          </View>
                                        </View>
                                  </LinearGradient>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ width: "50%" }}  onPress={() => navigation.navigate('')} >

                                <View style={{ backgroundColor: 'rgb(230, 230, 230)', paddingRight: 25, gap: 15, paddingBottom:35, paddingLeft:10,paddingTop:10 }} >
                                      <View style={{gap: 10}}>
                                          <Text style={{ textAlign: "left", fontSize: 18, fontWeight: 'bold',color: "#000" }}>Amount</Text>
                                          <Text style={{ textAlign: "center", fontSize: 16,color: "#000" }}>₹ 10,000</Text>
                                        </View>
                                      </View>
                                </TouchableOpacity>
                                </View>
                            </View>

                            <View style={{paddingHorizontal:20}}>
                            <TouchableOpacity  style={{borderColor:"black", borderBottomWidth:1, marginTop:10,gap:2, marginBottom:10}}  onPress={() => navigation.navigate('')}>
                                <Text style={{fontSize:14, color:"black", fontWeight:'bold'}}>For Go to Doctor</Text>
                                <Text style={{fontSize:14, color:"black", fontWeight:'bold'}}>Amount : ₹ 5000</Text>
                                 <View style={{flexDirection:"row", justifyContent:"space-between", marginBottom:10,paddingRight:50}}> 
                                  <Text style={{fontSize:12, color:"#f01a05"}}>Date: 18/01/2024</Text>
                                 <Text style={{fontSize:12, color:"green"}}>Approved</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity  style={{borderColor:"black", borderBottomWidth:1, marginTop:10,gap:2, marginBottom:10}}  onPress={() => navigation.navigate('')}>
                                <Text style={{fontSize:14, color:"black", fontWeight:'bold'}}>For Program</Text>
                                <Text style={{fontSize:14, color:"black", fontWeight:'bold'}}>Amount : ₹ 5000</Text>
                                 <View style={{flexDirection:"row", justifyContent:"space-between", marginBottom:10,paddingRight:50}}> 
                                  <Text style={{fontSize:12, color:"#f01a05"}}>Date: 18/01/2024</Text>
                                 <Text style={{fontSize:12, color:"#f01a05"}}>Denied</Text>
                                </View>
                            </TouchableOpacity>
                            </View>
                     </Pressable>
                </ScrollView>

                        {/* Modal for Month Selection */}
        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Select Month</Text>
              <FlatList
                data={months}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity style={styles.monthOption} onPress={() => handleMonthSelect(item)}>
                    <Text style={styles.monthText}>{item}</Text>
                  </TouchableOpacity>
                )}
              />
              <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        
            </SafeAreaView>
  )
}

export default Requestforadvanced
const styles = StyleSheet.create({
  PageContainer: { backgroundColor: "#fff", height: "100%" },
  Input: { backgroundColor: "#fff", borderWidth: 1, width: "100%", borderRadius: 5, marginTop: 5, marginBottom: 5, paddingLeft: 15 },
  btn: { width: "100%", height: "100%", backgroundColor: "#f2be25", borderWidth: 1, borderColor: "#000", borderRadius: 6, justifyContent: "center", alignItems: "center" },
  modalBackground: {flex: 1,justifyContent: 'center',  alignItems: 'center', backgroundColor:  'rgba(29, 24, 24, 0.5)',},
  modalContainer: {width: '70%',backgroundColor: 'white',borderRadius: 10,padding: 10,
    alignItems: 'center',},
  modalTitle: {fontSize: 18,fontWeight: 'bold', color:'black',marginBottom: 10,},
  monthOption: {padding: 10,marginBottom: 10,backgroundColor: '#f2f2f2', borderRadius: 5, width: '100%',alignItems: 'center',paddingHorizontal:50},
  monthText: {fontSize: 12,color: '#333',},
  closeButton: {padding: 10, backgroundColor: '#f01a05', borderRadius: 5,marginTop: 10,paddingHorizontal:50},
  closeButtonText: {color: '#fff',fontSize: 16, fontWeight: 'bold',},
})