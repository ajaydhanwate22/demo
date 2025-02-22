import { StyleSheet, View, Pressable, ScrollView, TouchableOpacity, Image, Modal, TextInput,SafeAreaView, Text,FlatList  } from 'react-native'
import React, {useState} from 'react'
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';


const LoggerForm = () => {

    const navigation = useNavigation();
    
    const [sensorlist, setSensorlist] = useState('');
    const [embeddesDevice, setEmbeddesDevice] = useState('');
    const [moduleVersionNumber, setModuleVersionNumber] = useState('');
    const [extendedSystemNumber, setExtendedSystemNumber] = useState('');
    const [DataUploadingPeriod, setDataUploadingPeriod] = useState('');
    const [DataAcquisitionPeriod, setDataAcquisitionPeriod] = useState('');
    const [connectedDevice, setconnectedDevice] = useState('');
    const [singlestrenght, setsinglestrenght] = useState('');
    const [MACaddress, setMACaddress] = useState('');
    const [routerSSID, setrouterSSID] = useState('');
  
    const handleSubmit = () => {
      // Add your form submission logic here
      alert('Form submitted');
    };
  
  return (
    <SafeAreaView style={styles.PageContainer}>
       <ScrollView>

                    <Pressable style={{ width: "100%", height: "100%", backgroundColor: "#fff", marginBottom:20 }}>
                        <Pressable style={{justifyContent:"space-between",flexDirection:'row', padding:20,}}>
                              <View style={{justifyContent: "center",alignItems:"center" }}>
                                    <Text style={{ fontSize: 18, color: "#f01a05", fontWeight: "bold", textAlign:"center" }}>Add  Logger Inforamtion</Text>
                                </View>
                          <TouchableOpacity  onPress={() => navigation.goBack()}  style={{ justifyContent:"center",alignItems: "center" }}>
                                      <Text style={{ fontSize: 26, color: "#000", fontWeight: "400" }}>X</Text>
                            </TouchableOpacity>
                          </Pressable>
        
                    <View style={{ width: "90%", alignSelf: "center" }}>
                      <View style={{marginVertical:10}}>
                          <Text style={{fontSize:16,color:'#000',fontWeight:'bold'}}>Basic Inforamtion:</Text>
                      </View>
                      {/* Basic Inforamtion */}
                      <TextInput style={styles.Input}
                        placeholder='Sensor list' placeholderTextColor='#000'  value={sensorlist} 
                        onChangeText={setSensorlist}/>
                          <TextInput style={styles.Input}
                        placeholder='Embedded Device SN' placeholderTextColor='#000'   value={embeddesDevice}
                        onChangeText={setEmbeddesDevice} />
                          {/* Version Inforamtion */}
                      <View style={{marginVertical:10}}>
                          <Text style={{fontSize:16,color:'#000',fontWeight:'bold'}}>Version Inforamtion:</Text>
                      </View>
                      <TextInput style={styles.Input}
                        placeholder='Module Version No.' placeholderTextColor='#000'   value={moduleVersionNumber}
                        onChangeText={setModuleVersionNumber} />
                        <TextInput style={styles.Input}
                        placeholder='Extended System Version' placeholderTextColor='#000'   value={extendedSystemNumber}
                        onChangeText={setExtendedSystemNumber} />
    

                                                  {/* Operation  Inforamtion */}
                      <View style={{marginVertical:10}}>
                          <Text style={{fontSize:16,color:'#000', fontWeight:'bold'}}>Operation Inforamtion :</Text>
                      </View>

                      <TextInput style={styles.Input}
                        placeholder='Data Uploading period' placeholderTextColor='#000'   value={DataUploadingPeriod}
                        onChangeText={setDataUploadingPeriod} />
                                              <TextInput style={styles.Input}
                        placeholder='Data Acquisition period' placeholderTextColor='#000'   value={DataAcquisitionPeriod}
                        onChangeText={setDataAcquisitionPeriod} />
                                                                      <TextInput style={styles.Input}
                        placeholder='Max.No.Of connected Device' placeholderTextColor='#000'   value={connectedDevice}
                        onChangeText={setconnectedDevice} />
                                                                                              <TextInput style={styles.Input}
                        placeholder='Single Strenght' placeholderTextColor='#000'   value={singlestrenght}
                        onChangeText={setsinglestrenght} />

                        <TextInput style={styles.Input}
                        placeholder='Module MAC address' placeholderTextColor='#000'   value={MACaddress}
                        onChangeText={setMACaddress} />
                        
                        <TextInput style={styles.Input}
                        placeholder='Router SSID' placeholderTextColor='#000'   value={routerSSID}
                        onChangeText={setrouterSSID} />

                      <View style={{ width: "100%", height: 45, alignSelf: "flex-end", marginTop: 100 }}>
                        <TouchableOpacity style={styles.btn} onPress={handleSubmit} >
                          <Text style={{ color: "#000", fontWeight: "700", fontSize: 14 }}>Submit</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                     </Pressable>
                </ScrollView>
            </SafeAreaView>
  )
}

export default LoggerForm
const styles = StyleSheet.create({
  PageContainer: { backgroundColor: "#fff", height: "100%" },
  Input: { backgroundColor: "#fff", borderWidth: 1, width: "100%", borderRadius: 5, marginTop: 5, marginBottom: 5, paddingLeft: 15 },
  btn: { width: "100%", height: "100%", backgroundColor: "#f2be25", borderWidth: 1, borderColor: "#000", borderRadius: 6, justifyContent: "center", alignItems: "center" }
})