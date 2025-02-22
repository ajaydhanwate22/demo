import { StyleSheet, View, Pressable, ScrollView, TouchableOpacity, Image, Modal, TextInput,SafeAreaView, Text,FlatList  } from 'react-native'
import React, {useState} from 'react'
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';


const InverterForm = () => {

    const navigation = useNavigation();
    
    const [inverterType, setInverterType] = useState('');
    const [sn, setSn] = useState('');
    const [generalSetting, setGeneralSetting] = useState('');
    const [batteryVoltageType, setBatteryVoltageType] = useState('');
    const [ratedPower, setRatedPower] = useState('');
    const [systemTime, setSystemTime] = useState('');
    const [protocolVersion, setProtocolVersion] = useState('');
    const [mainVersion, setMainVersion] = useState('');
    const [hmiVersion, setHmiVersion] = useState('');
    const [batteryVersion, setBatteryVersion] = useState('');
    const [gridFeedIn, setGridFeedIn] = useState('');
    const [gridType, setGridType] = useState('');
    const [gridVoltage, setGridVoltage] = useState('');
    const [gridCurrent, setGridCurrent] = useState('');
    const [externalCtPower, setExternalCtPower] = useState('');
    const [gridFrequency, setGridFrequency] = useState('');
    const [totalGridPower, setTotalGridPower] = useState('');
    const [cumulativeEnergyPurchased, setCumulativeEnergyPurchased] = useState('');
    const [dailyGridFeedIn, setDailyGridFeedIn] = useState('');
    const [dailyEnergyPurchased, setDailyEnergyPurchased] = useState('');
    const [internalPower, setInternalPower] = useState('');
    const [cumulativeConsumption, setCumulativeConsumption] = useState('');
    const [loadVoltage, setLoadVoltage] = useState('');
    const [totalConsumptionPower, setTotalConsumptionPower] = useState('');
    const [batteryStatus, setBatteryStatus] = useState('');
    const [batteryVoltage, setBatteryVoltage] = useState('');
    const [batteryCurrent, setBatteryCurrent] = useState('');
    const [batteryPower, setBatteryPower] = useState('');
    const [soc, setSoc] = useState('');
    const [totalChargingEnergy, setTotalChargingEnergy] = useState('');
    const [totalDischargingEnergy, setTotalDischargingEnergy] = useState('');
    const [dailyChargingEnergy, setDailyChargingEnergy] = useState('');
    const [dailyDischargingEnergy, setDailyDischargingEnergy] = useState('');
    const [batteryRatedCapacity, setBatteryRatedCapacity] = useState('');
    const [batteryType, setBatteryType] = useState('');
    const [batteryMode, setBatteryMode] = useState('');
    const [temperatureBattery, setTemperatureBattery] = useState('');
    const [dcTemperature, setDcTemperature] = useState('');
    const [acTemperature, setAcTemperature] = useState('');
    const [gridRelayStatus, setGridRelayStatus] = useState('');
    const [generatorRunTime, setGeneratorRunTime] = useState('');
    const [generatorFrequency, setGeneratorFrequency] = useState('');
    const [generatorVoltage, setGeneratorVoltage] = useState('');
    const [totalGeneratorPower, setTotalGeneratorPower] = useState('');
    const [dailyProductionGenerator, setDailyProductionGenerator] = useState('');
    const [totalProductionGenerator, setTotalProductionGenerator] = useState('');
  
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
                                    <Text style={{ fontSize: 18, color: "#f01a05", fontWeight: "bold", textAlign:"center" }}>Add  Inverter Inforamtion</Text>
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
                        placeholder='Inverter Type' placeholderTextColor='#000'  value={inverterType} 
                        onChangeText={setInverterType}/>
                          <TextInput style={styles.Input}
                        placeholder='SN' placeholderTextColor='#000'   value={sn}
                        onChangeText={setSn} />
                                                  <TextInput style={styles.Input}
                        placeholder='General Setting' placeholderTextColor='#000'   value={generalSetting}
                        onChangeText={setGeneralSetting} />
                                                  <TextInput style={styles.Input}
                        placeholder='Battery Voltage Type' placeholderTextColor='#000'   value={batteryVoltageType}
                        onChangeText={setBatteryVoltageType} />
                        <TextInput style={styles.Input}
                        placeholder='Rated Power' placeholderTextColor='#000'   value={ratedPower}
                        onChangeText={setRatedPower} />
                                                <TextInput style={styles.Input}
                        placeholder='System Time' placeholderTextColor='#000'   value={systemTime}
                        onChangeText={setSystemTime} />


                          {/* Version Inforamtion */}
                      <View style={{marginVertical:10}}>
                          <Text style={{fontSize:16,color:'#000',fontWeight:'bold'}}>Version Inforamtion:</Text>
                      </View>
                      <TextInput style={styles.Input}
                        placeholder='Protocol Version' placeholderTextColor='#000'   value={protocolVersion}
                        onChangeText={setProtocolVersion} />
                        <TextInput style={styles.Input}
                        placeholder='MAIN Version' placeholderTextColor='#000'   value={mainVersion}
                        onChangeText={setMainVersion} />
                        <TextInput style={styles.Input}
                        placeholder='HMI Version' placeholderTextColor='#000'   value={hmiVersion}
                        onChangeText={setHmiVersion} />
                        <TextInput style={styles.Input}
                        placeholder='Lithium Battery Version Number' placeholderTextColor='#000'   value={batteryVersion}
                        onChangeText={setBatteryVersion} />


                                                  {/* Power Grid Inforamtion */}
                      <View style={{marginVertical:10}}>
                          <Text style={{fontSize:16,color:'#000', fontWeight:'bold'}}>Power Grid :</Text>
                      </View>

                      <TextInput style={styles.Input}
                        placeholder='Cummulative Grid Feed-in' placeholderTextColor='#000'   value={gridFeedIn}
                        onChangeText={setGridFeedIn} />
                                              <TextInput style={styles.Input}
                        placeholder='Grid Type' placeholderTextColor='#000'   value={gridType}
                        onChangeText={setGridType} />
                                                                      <TextInput style={styles.Input}
                        placeholder='Grid Voltage L1L2' placeholderTextColor='#000'   value={gridVoltage}
                        onChangeText={setGridVoltage} />
                                                                                              <TextInput style={styles.Input}
                        placeholder='Grid current L1L2' placeholderTextColor='#000'   value={gridCurrent}
                        onChangeText={setGridCurrent} />

                        <TextInput style={styles.Input}
                        placeholder='Extranal CT Power L1L2' placeholderTextColor='#000'   value={externalCtPower}
                        onChangeText={setExternalCtPower} />
                        
                        <TextInput style={styles.Input}
                        placeholder='Grid Frequency' placeholderTextColor='#000'   value={gridFrequency}
                        onChangeText={setGridFrequency} />

                        <TextInput style={styles.Input}
                        placeholder='Total Grid power' placeholderTextColor='#000'   value={totalGridPower}
                        onChangeText={setTotalGridPower} />

                        <TextInput style={styles.Input}
                        placeholder='Commulative Energy Purchased' placeholderTextColor='#000'   value={cumulativeEnergyPurchased}
                        onChangeText={setCumulativeEnergyPurchased} />


                        <TextInput style={styles.Input}
                        placeholder='Daily Grid Feed-in' placeholderTextColor='#000'   value={dailyGridFeedIn}
                        onChangeText={setDailyGridFeedIn} />

                        <TextInput style={styles.Input}
                        placeholder='Daily Energy Purchased' placeholderTextColor='#000'   value={dailyEnergyPurchased}
                        onChangeText={setDailyEnergyPurchased} />

                        <TextInput style={styles.Input}
                        placeholder='internal Power L1L2' placeholderTextColor='#000'   value={internalPower}
                        onChangeText={setInternalPower} />


                        
                                                  {/*  Electrical Consumption   */}
                      <View style={{marginVertical:10}}>
                          <Text style={{fontSize:16,color:'#000', fontWeight:'bold'}}>Electrical Consumption :</Text>
                      </View>

                      
                      <TextInput style={styles.Input}
                        placeholder='Commulative Consumption' placeholderTextColor='#000'   value={cumulativeConsumption}
                        onChangeText={setCumulativeConsumption} />
                                              
                      <TextInput style={styles.Input}
                        placeholder='Load voltage L1L2 ' placeholderTextColor='#000'   value={loadVoltage}
                        onChangeText={setLoadVoltage} />


                                                                      
                      <TextInput style={styles.Input}
                        placeholder='Total Consumption Power ' placeholderTextColor='#000'   value={totalConsumptionPower}
                        onChangeText={setTotalConsumptionPower} />

                                {/* Battery */}

                    <View style={{marginVertical:10}}>
                          <Text style={{fontSize:16,color:'#000', fontWeight:'bold'}}>Battery:</Text>
                      </View>

                                                                                            
                      <TextInput style={styles.Input}
                        placeholder='Battery Status' placeholderTextColor='#000'   value={batteryStatus}
                        onChangeText={setBatteryStatus} />
                        

                        <TextInput style={styles.Input}
                        placeholder='Battery Voltage' placeholderTextColor='#000'   value={batteryVoltage}
                        onChangeText={setBatteryVoltage} />

                                                

                        <TextInput style={styles.Input}
                        placeholder='Battery Current' placeholderTextColor='#000'   value={batteryCurrent}
                        onChangeText={setBatteryCurrent} />

                        <TextInput style={styles.Input}
                        placeholder='Battery Power' placeholderTextColor='#000'   value={batteryPower}
                        onChangeText={setBatteryPower} />

                        
<TextInput style={styles.Input}
                        placeholder='Soc:' placeholderTextColor='#000'   value={soc}
                        onChangeText={setSoc} />
                        

                        <TextInput style={styles.Input}
                        placeholder='Total Charging Energy' placeholderTextColor='#000'   value={totalChargingEnergy}
                        onChangeText={setTotalChargingEnergy} />

<TextInput style={styles.Input}
                        placeholder='Total Discharging Energy' placeholderTextColor='#000'   value={totalDischargingEnergy}
                        onChangeText={setTotalDischargingEnergy} />

<TextInput style={styles.Input}
                        placeholder='Daily Chraging Energy' placeholderTextColor='#000'   value={dailyChargingEnergy}
                        onChangeText={setDailyChargingEnergy} />

<TextInput style={styles.Input}
                        placeholder='Daily Discharging Energy' placeholderTextColor='#000'   value={dailyDischargingEnergy}
                        onChangeText={setDailyDischargingEnergy} />


<TextInput style={styles.Input}
                        placeholder='Battery Rated Capacity ' placeholderTextColor='#000'   value={batteryRatedCapacity}
                        onChangeText={setBatteryRatedCapacity} />

<TextInput style={styles.Input}
                        placeholder='Battery Type' placeholderTextColor='#000'   value={batteryType}
                        onChangeText={setBatteryType} />

<TextInput style={styles.Input}
                        placeholder='Battery Mode' placeholderTextColor='#000'   value={batteryMode}
                        onChangeText={setBatteryMode} />

                      {/* Temparature */}
<View style={{marginVertical:10}}>
                          <Text style={{fontSize:16,color:'#000', fontWeight:'bold'}}>Temparature:</Text>
                      </View>

                      <TextInput style={styles.Input}
                        placeholder='Temparature-Battery' placeholderTextColor='#000'   value={temperatureBattery}
                        onChangeText={setTemperatureBattery} />

<TextInput style={styles.Input}
                        placeholder='Dc-Temparature' placeholderTextColor='#000'   value={dcTemperature}
                        onChangeText={setDcTemperature} />

<TextInput style={styles.Input}
                        placeholder='Ac-Temparature' placeholderTextColor='#000'   value={acTemperature}
                        onChangeText={setAcTemperature} />

                            {/* state */}
<View style={{marginVertical:10}}>
                          <Text style={{fontSize:16,color:'#000', fontWeight:'bold'}}>State:</Text>
                      </View>

                      <TextInput style={styles.Input}
                        placeholder='Grid relay Status' placeholderTextColor='#000'   value={gridRelayStatus}
                        onChangeText={setGridRelayStatus} />
                                {/* Generator */}
<View style={{marginVertical:10}}>
                          <Text style={{fontSize:16,color:'#000', fontWeight:'bold'}}>Generator:</Text>
                      </View>

                      <TextInput style={styles.Input}
                        placeholder='Generator Daily Run time' placeholderTextColor='#000'   value={generatorRunTime}
                        onChangeText={setGeneratorRunTime} />
                        
                      <TextInput style={styles.Input}
                        placeholder='Generator Frequency' placeholderTextColor='#000'   value={generatorFrequency}
                        onChangeText={setGeneratorFrequency} />

<TextInput style={styles.Input}
                        placeholder='Generator Voltage' placeholderTextColor='#000'   value={generatorVoltage}
                        onChangeText={setGeneratorVoltage} />

<TextInput style={styles.Input}
                        placeholder='Total Generator Power' placeholderTextColor='#000'   value={totalGeneratorPower}
                        onChangeText={setTotalGeneratorPower} />

<TextInput style={styles.Input}
                        placeholder='Daily Production Generator' placeholderTextColor='#000'   value={dailyProductionGenerator}
                        onChangeText={setDailyProductionGenerator} />

<TextInput style={styles.Input}
                        placeholder='Total Production Generator' placeholderTextColor='#000'   value={totalProductionGenerator}
                        onChangeText={setTotalProductionGenerator} />

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

export default InverterForm
const styles = StyleSheet.create({
  PageContainer: { backgroundColor: "#fff", height: "100%" },
  Input: { backgroundColor: "#fff", borderWidth: 1, width: "100%", borderRadius: 5, marginTop: 5, marginBottom: 5, paddingLeft: 15 },
  btn: { width: "100%", height: "100%", backgroundColor: "#f2be25", borderWidth: 1, borderColor: "#000", borderRadius: 6, justifyContent: "center", alignItems: "center" }
})