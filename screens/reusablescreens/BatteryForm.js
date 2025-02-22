import { StyleSheet, View, Pressable, ScrollView, TouchableOpacity, Image, Modal, TextInput,SafeAreaView, Text,FlatList  } from 'react-native'
import React, {useState} from 'react'
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';


const BatteryForm = () => {

    const navigation = useNavigation();
    
    const [ConnectedDeviceSN, setConnectedDeviceSN] = useState('');
    const [packnumber, setpacknumber] = useState('');
    const [batteryStatus, setBatteryStatus] = useState('');
    const [BatteryVoltage, setBatteryVoltage] = useState('');
    const [BatteryCurrent, setBatteryCurrent] = useState('');
    const [BatterySOC, setBatterySOC] = useState('');
    const [BatterySOH, setBatterySOH] = useState('');
    const [BatteryCApAh, setBatteryCApAh] = useState('');
    const [BatteryMaxVolatge, setBatteryMaxVolatge] = useState('');
    const [BatteryMinVolatge, setBatteryMinVolatge] = useState('');
    const [BatteryMaxTemp, setBatteryMaxTemp] = useState('');
    const [batteryMinTemp, setbatteryMinTemp] = useState('');
    const [BatteryTemp, setBatteryTemp] = useState('');
    const [ChargedEndVoltage, setChargedEndVoltage] = useState('');
    const [DisChargedEndVoltage, setDisChargedEndVoltage] = useState('');
    const [chargedLimitCurrent, setchargedLimitCurrent] = useState('');
    const [dischargedLimitCurrent, setdischargedLimitCurrent] = useState('');
    const [ForceChargeFlag, setForceChargeFlag] = useState('');
    const [SocFlag, setSocFlag] = useState('');
  
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
                                    <Text style={{ fontSize: 18, color: "#f01a05", fontWeight: "bold", textAlign:"center" }}>Add  Battery Inforamtion</Text>
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
                        placeholder='Connected Device SN' placeholderTextColor='#000'  value={ConnectedDeviceSN} 
                        onChangeText={setConnectedDeviceSN}/>
                          <TextInput style={styles.Input}
                        placeholder='Packnum number' placeholderTextColor='#000'   value={packnumber}
                        onChangeText={setpacknumber} />

<View style={{marginVertical:10}}>
                          <Text style={{fontSize:16,color:'#000',fontWeight:'bold'}}>Battery Pack:</Text>
                      </View>
                                                  <TextInput style={styles.Input}
                        placeholder='Battery Status ' placeholderTextColor='#000'   value={ batteryStatus}
                        onChangeText={setBatteryStatus} />

<View style={{marginVertical:10}}>
                          <Text style={{fontSize:16,color:'#000',fontWeight:'bold'}}>Key Inforamtion:</Text>
                      </View>
                                                  <TextInput style={styles.Input}
                        placeholder='Battery Voltage' placeholderTextColor='#000'   value={BatteryVoltage}
                        onChangeText={setBatteryVoltage} />
                        <TextInput style={styles.Input}
                        placeholder='Battery Current' placeholderTextColor='#000'   value={BatteryCurrent}
                        onChangeText={setBatteryCurrent} />
                                                <TextInput style={styles.Input}
                        placeholder='Battery SOC' placeholderTextColor='#000'   value={BatterySOC}
                        onChangeText={setBatterySOC} />

<TextInput style={styles.Input}
                        placeholder='Battery SOH' placeholderTextColor='#000'   value={BatterySOH}
                        onChangeText={setBatterySOH} />

<TextInput style={styles.Input}
                        placeholder='Battery CApAH' placeholderTextColor='#000'   value={BatteryCApAh}
                        onChangeText={setBatteryCApAh} />

<TextInput style={styles.Input}
                        placeholder='Battery 1 maximum Voltage' placeholderTextColor='#000'   value={BatteryMaxVolatge}
                        onChangeText={setBatteryMaxVolatge} />

<TextInput style={styles.Input}
                        placeholder='Battery 1 minimum Voltage' placeholderTextColor='#000'   value={BatteryMinVolatge}
                        onChangeText={setBatteryMinVolatge} />


<TextInput style={styles.Input}
                        placeholder='Battery 1 maximum temparature' placeholderTextColor='#000'   value={BatteryMaxTemp}
                        onChangeText={setBatteryMaxTemp} />

<TextInput style={styles.Input}
                        placeholder='Battery 1 minimum temparature' placeholderTextColor='#000'   value={batteryMinTemp}
                        onChangeText={setbatteryMinTemp} />

<TextInput style={styles.Input}
                        placeholder='Battery temparature' placeholderTextColor='#000'   value={BatteryTemp}
                        onChangeText={setBatteryTemp} />

                          {/* Version Inforamtion */}
                      <View style={{marginVertical:10}}>
                          <Text style={{fontSize:16,color:'#000',fontWeight:'bold'}}>Charged and Discharg limit:</Text>
                      </View>
                      <TextInput style={styles.Input}
                        placeholder='Charged End Voltage' placeholderTextColor='#000'   value={ChargedEndVoltage}
                        onChangeText={setChargedEndVoltage} />
                      <TextInput style={styles.Input}
                        placeholder='Discharged End Voltage' placeholderTextColor='#000'   value={DisChargedEndVoltage}
                        onChangeText={setDisChargedEndVoltage} />

<TextInput style={styles.Input}
                        placeholder='Charged Limit Current' placeholderTextColor='#000'   value={chargedLimitCurrent}
                        onChangeText={setchargedLimitCurrent} />

<TextInput style={styles.Input}
                        placeholder='Discharged Limit Current' placeholderTextColor='#000'   value={dischargedLimitCurrent}
                        onChangeText={setdischargedLimitCurrent} />

                                                  {/* other */}
                      <View style={{marginVertical:10}}>
                          <Text style={{fontSize:16,color:'#000', fontWeight:'bold'}}>Other:</Text>
                      </View>

                      <TextInput style={styles.Input}
                        placeholder='Force charge Flag' placeholderTextColor='#000'   value={ForceChargeFlag}
                        onChangeText={setForceChargeFlag} />
                                            <TextInput style={styles.Input}
                        placeholder='Check SOC Flag' placeholderTextColor='#000'   value={SocFlag}
                        onChangeText={setSocFlag} />

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

export default BatteryForm
const styles = StyleSheet.create({
  PageContainer: { backgroundColor: "#fff", height: "100%" },
  Input: { backgroundColor: "#fff", borderWidth: 1, width: "100%", borderRadius: 5, marginTop: 5, marginBottom: 5, paddingLeft: 15 },
  btn: { width: "100%", height: "100%", backgroundColor: "#f2be25", borderWidth: 1, borderColor: "#000", borderRadius: 6, justifyContent: "center", alignItems: "center" }
})