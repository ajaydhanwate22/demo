import { StyleSheet, View, ScrollView, Pressable, TouchableOpacity, TextInput, Image, Alert, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const DeviceData = ({ navigation}) => {

const DC = [{ id: 1, dc: 'PV1', volatage :'0.00V', current :'0.00A', Power:'0W'},{ id: 2, dc: 'PV2', volatage :'0.00V', current :'0.00A', Power:'0W'},{ id: 3, dc: 'PV2', volatage :'0.00V', current :'0.00A', Power:'0W'}];

const AC = [{ id: 1, AC: 'R', volatage :'230.10V', current :'1.10V', frequency:'50.00Hz'}];

  return (
    <>

    {/* electricity Information */}
                    <View style={{padding:10, backgroundColor:"#f5f5f5"}}></View>
                    <View style={{ borderBottomColor:'lightgrey',borderBottomWidth:0.3,paddingVertical:10,padding:10 ,borderColor:'lightgrey',}}>
                        <Text style={{fontWeight:'bold', fontSize:16,}}>Electricity Generation</Text>
                    </View>

                    <View style={{paddingVertical:10, borderBottomColor:'lightgrey',borderBottomWidth:0.3, paddingBottom:10 ,borderColor:'lightgrey',}}>
                        {/* table heading */}
                        <View style={{flexDirection:'row', width:'100%', paddingVertical:5}}>
                            <View style={{justifyContent:'center', alignItems:'center', width:'25%'}}>
                                <Text style={{fontSize:14, textAlign:'center', backgroundColor:"#f5f5f5", paddingHorizontal:10, paddingVertical:5}}>DC</Text>
                            </View>
                            <View style={{justifyContent:'center', alignItems:'center', width:'25%'}}>
                                <Text style={{fontSize:14, textAlign:'center'}}>Voltage</Text>
                            </View>
                            <View style={{justifyContent:'center', alignItems:'center', width:'25%'}}>
                                <Text style={{fontSize:14, textAlign:'center'}}>Current</Text>
                             </View>
                             <View style={{justifyContent:'center', alignItems:'center', width:'25%'}}>
                             <Text style={{fontSize:14, textAlign:'center'}}>Power</Text>
                            </View>
                        </View>

                        {/* table data */}
                        {DC.map((item, index) => (
                        <View key={item.id}  style={{flexDirection:'row', width:'100%', paddingVertical:5}}>
                            <View style={{justifyContent:'center', alignItems:'center', width:'25%'}}>
                                <Text style={{fontSize:14, textAlign:'center'}}>{item.dc}</Text>
                            </View>
                            <View style={{justifyContent:'center', alignItems:'center', width:'25%'}}>
                                <Text style={{fontSize:14, textAlign:'center'}}>{item.volatage}</Text>
                            </View>
                            <View style={{justifyContent:'center', alignItems:'center', width:'25%'}}>
                                <Text style={{fontSize:14, textAlign:'center'}}>{item.current}</Text>
                             </View>
                             <View style={{justifyContent:'center', alignItems:'center', width:'25%'}}>
                             <Text style={{fontSize:14, textAlign:'center'}}>{item.Power}</Text>
                            </View>
                        </View>
                       ))}                        
                    </View>

                    <View style={{paddingVertical:10, borderBottomColor:'lightgrey',borderBottomWidth:0.3,borderColor:'lightgrey',}}>
                        {/* table heading */}
                        <View style={{flexDirection:'row', width:'100%', paddingVertical:5}}>
                            <View style={{justifyContent:'center', alignItems:'center', width:'25%'}}>
                                <Text style={{fontSize:14, textAlign:'center', backgroundColor:"orange", paddingHorizontal:10, paddingVertical:5}}>AC</Text>
                            </View>
                            <View style={{justifyContent:'center', alignItems:'center', width:'25%'}}>
                                <Text style={{fontSize:14, textAlign:'center'}}>Voltage</Text>
                            </View>
                            <View style={{justifyContent:'center', alignItems:'center', width:'25%'}}>
                                <Text style={{fontSize:14, textAlign:'center'}}>Current</Text>
                             </View>
                             <View style={{justifyContent:'center', alignItems:'center', width:'25%'}}>
                             <Text style={{fontSize:14, textAlign:'center'}}>frequency</Text>
                            </View>
                        </View>

                        {/* table data */}
                        {AC.map((item, index) => (
                        <View key={item.id}  style={{flexDirection:'row', width:'100%', paddingVertical:5}}>
                            <View style={{justifyContent:'center', alignItems:'center', width:'25%'}}>
                                <Text style={{fontSize:14, textAlign:'center'}}>{item.AC}</Text>
                            </View>
                            <View style={{justifyContent:'center', alignItems:'center', width:'25%'}}>
                                <Text style={{fontSize:14, textAlign:'center'}}>{item.volatage}</Text>
                            </View>
                            <View style={{justifyContent:'center', alignItems:'center', width:'25%'}}>
                                <Text style={{fontSize:14, textAlign:'center'}}>{item.current}</Text>
                             </View>
                             <View style={{justifyContent:'center', alignItems:'center', width:'25%'}}>
                             <Text style={{fontSize:14, textAlign:'center'}}>{item.frequency}</Text>
                            </View>
                        </View>
                       ))}                        
                    </View>

                    <View style={{padding:10}}>
                    <View style={{flexDirection:'row', justifyContent:'flex-start', alignItems:'flex-start', paddingVertical:10, width:'100%'}}>
                        <View style={{width:'50%'}}>
                        <Text style={{textAlign:'left',fontSize:14,}}>Total Dc Input Power:</Text>
                        <Text style={{textAlign:'left', fontWeight:'bold',fontSize:14,}}>0W</Text>
                        </View>
                        <View style={{width:'50%'}}>
                        <Text style={{textAlign:'left'}}>Communative Production (Active):</Text>
                        <Text style={{textAlign:'left', fontWeight:'bold'}}>0kWh</Text>
                        </View>
                    </View>


                    
                    <View style={{flexDirection:'row', justifyContent:'flex-start', alignItems:'flex-start', paddingVertical:10, width:'100%'}}>
                        <View style={{width:'50%'}}>
                        <Text style={{textAlign:'left',fontSize:14,}}>Daily Production (Active):</Text>
                        <Text style={{textAlign:'left', fontWeight:'bold', fontSize:14,}}>0KWH</Text>
                        </View>
                        <View style={{width:'50%'}}>
                        <Text style={{textAlign:'left', fontSize:14,}}>Generate Input as load Output Enable:</Text>
                        <Text style={{textAlign:'left', fontWeight:'bold', fontSize:14,}}>0</Text>
                        </View>
                    </View>


                    <View style={{flexDirection:'row', justifyContent:'flex-start', alignItems:'flex-start', paddingVertical:10, width:'100%'}}>
                        <View style={{width:'50%'}}>
                        <Text style={{textAlign:'left',fontSize:14,}}>Inverter output Power L1L2:</Text>
                        <Text style={{textAlign:'left', fontWeight:'bold', fontSize:14,}}>168W</Text>
                        </View>
                        <View style={{width:'50%'}}>
                        <Text style={{textAlign:'left', fontSize:14,}}>Grid Tie Power:</Text>
                        <Text style={{textAlign:'left', fontWeight:'bold', fontSize:14,}}>0W</Text>
                        </View>
                    </View>
                    </View>

                    {/* Basic Inforamtion */}

                    <View style={{padding:5, backgroundColor:"#f5f5f5"}}></View>
                    <View style={{borderBottomWidth:0.3,paddingVertical:10,padding:10,borderColor:'lightgrey',}}>
                        <Text style={{fontWeight:'bold', fontSize:16,}}>Basic Inforamtion</Text>
                    </View>
                    <View style={{padding:10}}>
                    <View style={{flexDirection:'row', justifyContent:'flex-start', alignItems:'flex-start', paddingVertical:10, width:'100%'}}>
                        <View style={{width:'50%'}}>
                        <Text style={{textAlign:'left',fontSize:14,}}>SN:</Text>
                        <Text style={{textAlign:'left', fontWeight:'bold',fontSize:14,}}>2406281016</Text>
                        </View>
                        <View style={{width:'50%'}}>
                        <Text style={{textAlign:'left'}}>Inverte Type:</Text>
                        <Text style={{textAlign:'left', fontWeight:'bold'}}>Singale Phase LV Hybrid</Text>
                        </View>
                    </View>


                    
                    <View style={{flexDirection:'row', justifyContent:'flex-start', alignItems:'flex-start', paddingVertical:10, width:'100%'}}>
                        <View style={{width:'50%'}}>
                        <Text style={{textAlign:'left',fontSize:14,}}>General Setting:</Text>
                        <Text style={{textAlign:'left', fontWeight:'bold', fontSize:14,}}>0,1,2,3,4,5,6,7,8,9,10</Text>
                        </View>
                        <View style={{width:'50%'}}>
                        <Text style={{textAlign:'left', fontSize:14,}}>Battery Volatage Type:</Text>
                        <Text style={{textAlign:'left', fontWeight:'bold', fontSize:14,}}>LV-48V</Text>
                        </View>
                    </View>


                    <View style={{flexDirection:'row', justifyContent:'flex-start', alignItems:'flex-start', paddingVertical:10, width:'100%'}}>
                        <View style={{width:'50%'}}>
                        <Text style={{textAlign:'left',fontSize:14,}}>Rated Power:</Text>
                        <Text style={{textAlign:'left', fontWeight:'bold', fontSize:14,}}>5kW</Text>
                        </View>
                        <View style={{width:'50%'}}>
                        <Text style={{textAlign:'left', fontSize:14,}}>System Time:</Text>
                        <Text style={{textAlign:'left', fontWeight:'bold', fontSize:14,}}>25-01-26 11.16.18</Text>
                        </View>
                    </View>
                    </View>


                                       {/* Version Inforamtion */}

                <View style={{padding:5, backgroundColor:"#f5f5f5"}}></View>
                    <View style={{ borderBottomColor:'lightgrey',borderBottomWidth:0.3,paddingVertical:10,padding:10}}>
                        <Text style={{fontWeight:'bold', fontSize:16,}}>Version Inforamtion</Text>
                    </View>
                    <View style={{padding:10}}>
                    <View style={{flexDirection:'row', justifyContent:'flex-start', alignItems:'flex-start', paddingVertical:10, width:'100%'}}>
                        <View style={{width:'50%'}}>
                        <Text style={{textAlign:'left',fontSize:14,}}>Protocol Vrsion:</Text>
                        <Text style={{textAlign:'left', fontWeight:'bold',fontSize:14,}}>V0.2.0.1</Text>
                        </View>
                        <View style={{width:'50%'}}>
                        <Text style={{textAlign:'left'}}>MAIN:</Text>
                        <Text style={{textAlign:'left', fontWeight:'bold'}}>3386-1515</Text>
                        </View>
                    </View>


                    
                    <View style={{flexDirection:'row', justifyContent:'flex-start', alignItems:'flex-start', paddingVertical:10, width:'100%'}}>
                        <View style={{width:'50%'}}>
                        <Text style={{textAlign:'left',fontSize:14,}}>HMI:</Text>
                        <Text style={{textAlign:'left', fontWeight:'bold', fontSize:14,}}>0000-C36E</Text>
                        </View>
                        <View style={{width:'50%'}}>
                        <Text style={{textAlign:'left', fontSize:14,}}>Lithium Battery Version Number:</Text>
                        <Text style={{textAlign:'left', fontWeight:'bold', fontSize:14,}}>V2.0.0.8</Text>
                        </View>
                    </View>
                    </View>


                                                           {/* Power Grid */}

                <View style={{padding:5, backgroundColor:"#f5f5f5"}}></View>
                    <View style={{ borderBottomColor:'lightgrey',borderBottomWidth:0.3,paddingVertical:10,padding:10}}>
                        <Text style={{fontWeight:'bold', fontSize:16,}}>Power Grid</Text>
                    </View>
                    <View style={{padding:10}}>
                    <View style={{flexDirection:'row', justifyContent:'flex-start', alignItems:'flex-start', paddingVertical:10, width:'100%'}}>
                        <View style={{width:'50%'}}>
                        <Text style={{textAlign:'left',fontSize:14,}}>Communative Grid Feed-In:</Text>
                        <Text style={{textAlign:'left', fontWeight:'bold',fontSize:14,}}>0KWh</Text>
                        </View>
                        <View style={{width:'50%'}}>
                        <Text style={{textAlign:'left'}}>Grid Type:</Text>
                        <Text style={{textAlign:'left', fontWeight:'bold'}}>Single Phase</Text>
                        </View>
                    </View>


                    
                    <View style={{flexDirection:'row', justifyContent:'flex-start', alignItems:'flex-start', paddingVertical:10, width:'100%'}}>
                        <View style={{width:'50%'}}>
                        <Text style={{textAlign:'left',fontSize:14,}}>Grid Voltage L1L2:</Text>
                        <Text style={{textAlign:'left', fontWeight:'bold', fontSize:14,}}>2.80V</Text>
                        </View>
                        <View style={{width:'50%'}}>
                        <Text style={{textAlign:'left', fontSize:14,}}>Grid Current L1L2:</Text>
                        <Text style={{textAlign:'left', fontWeight:'bold', fontSize:14,}}>0.00A</Text>
                        </View>
                    </View>

                                        
                    <View style={{flexDirection:'row', justifyContent:'flex-start', alignItems:'flex-start', paddingVertical:10, width:'100%'}}>
                        <View style={{width:'50%'}}>
                        <Text style={{textAlign:'left',fontSize:14,}}>Extranal CT Power L1L2:</Text>
                        <Text style={{textAlign:'left', fontWeight:'bold', fontSize:14,}}>0W</Text>
                        </View>
                        <View style={{width:'50%'}}>
                        <Text style={{textAlign:'left', fontSize:14,}}>Grid frequency :</Text>
                        <Text style={{textAlign:'left', fontWeight:'bold', fontSize:14,}}>0.00Hz</Text>
                        </View>
                    </View>

                    <View style={{flexDirection:'row', justifyContent:'flex-start', alignItems:'flex-start', paddingVertical:10, width:'100%'}}>
                        <View style={{width:'50%'}}>
                        <Text style={{textAlign:'left',fontSize:14,}}>Total Grid Power:</Text>
                        <Text style={{textAlign:'left', fontWeight:'bold', fontSize:14,}}>0W</Text>
                        </View>
                        <View style={{width:'50%'}}>
                        <Text style={{textAlign:'left', fontSize:14,}}>Communative Energy Purchased :</Text>
                        <Text style={{textAlign:'left', fontWeight:'bold', fontSize:14,}}>597.7kWh</Text>
                        </View>
                    </View>
                    <View style={{flexDirection:'row', justifyContent:'flex-start', alignItems:'flex-start', paddingVertical:10, width:'100%'}}>
                        <View style={{width:'50%'}}>
                        <Text style={{textAlign:'left',fontSize:14,}}>Daily Grid Feed in:</Text>
                        <Text style={{textAlign:'left', fontWeight:'bold', fontSize:14,}}>0Kwh</Text>
                        </View>
                        <View style={{width:'50%'}}>
                        <Text style={{textAlign:'left', fontSize:14,}}>Daily Energy Purchased :</Text>
                        <Text style={{textAlign:'left', fontWeight:'bold', fontSize:14,}}>4kWh</Text>
                        </View>
                    </View>
                    <View style={{flexDirection:'row', justifyContent:'flex-start', alignItems:'flex-start', paddingVertical:10, width:'100%'}}>
                        <View style={{width:'50%'}}>
                        <Text style={{textAlign:'left',fontSize:14,}}>internal Power L1L2:</Text>
                        <Text style={{textAlign:'left', fontWeight:'bold', fontSize:14,}}>0W</Text>
                        </View>
                    </View>
                    </View>

                    {/* Electricity COnsumption */}

                <View style={{padding:5, backgroundColor:"#f5f5f5"}}></View>
                    <View style={{ borderBottomColor:'lightgrey',borderBottomWidth:0.3,paddingVertical:10,padding:10}}>
                        <Text style={{fontWeight:'bold', fontSize:16,}}>Electricity Consumption</Text>
                    </View>
                    <View style={{padding:10}}>
                    <View style={{flexDirection:'row', justifyContent:'flex-start', alignItems:'flex-start', paddingVertical:10, width:'100%'}}>
                        <View style={{width:'50%'}}>
                        <Text style={{textAlign:'left',fontSize:14,}}>Communative Consumption:</Text>
                        <Text style={{textAlign:'left', fontWeight:'bold',fontSize:14,}}>455.4kWh</Text>
                        </View>
                        <View style={{width:'50%'}}>
                        <Text style={{textAlign:'left'}}>Load Voltage L1L2:</Text>
                        <Text style={{textAlign:'left', fontWeight:'bold'}}>233.70V</Text>
                        </View>
                    </View>

                    <View style={{flexDirection:'row', justifyContent:'flex-start', alignItems:'flex-start', paddingVertical:10, width:'100%'}}>
                        <View style={{width:'50%'}}>
                        <Text style={{textAlign:'left',fontSize:14,}}>Total Consumption Power:</Text>
                        <Text style={{textAlign:'left', fontWeight:'bold',fontSize:14,}}>168W</Text>
                        </View>
                        <View style={{width:'50%'}}>
                        <Text style={{textAlign:'left'}}>Daily Consumption:</Text>
                        <Text style={{textAlign:'left', fontWeight:'bold'}}>3.8KWh</Text>
                        </View>
                    </View>
                    </View>


                    {/* battery */}

                    <View style={{padding:5, backgroundColor:"#f5f5f5"}}></View>
                    <View style={{ borderBottomColor:'lightgrey',borderBottomWidth:0.3,paddingVertical:10,padding:10}}>
                        <Text style={{fontWeight:'bold', fontSize:16,}}>Battery</Text>
                    </View>
                    <View style={{padding:10}}>
                    <View style={{flexDirection:'row', justifyContent:'flex-start', alignItems:'flex-start', paddingVertical:10, width:'100%'}}>
                        <View style={{width:'50%'}}>
                        <Text style={{textAlign:'left',fontSize:14,}}>Battery Status:</Text>
                        <Text style={{textAlign:'left', fontWeight:'bold',fontSize:14,}}>Discharging</Text>
                        </View>
                        <View style={{width:'50%'}}>
                        <Text style={{textAlign:'left'}}>Battery Voltage:</Text>
                        <Text style={{textAlign:'left', fontWeight:'bold'}}>54.35V</Text>
                        </View>
                    </View>

                    <View style={{flexDirection:'row', justifyContent:'flex-start', alignItems:'flex-start', paddingVertical:10, width:'100%'}}>
                        <View style={{width:'50%'}}>
                        <Text style={{textAlign:'left',fontSize:14,}}>Battery Current:</Text>
                        <Text style={{textAlign:'left', fontWeight:'bold',fontSize:14,}}>3.82A</Text>
                        </View>
                        <View style={{width:'50%'}}>
                        <Text style={{textAlign:'left'}}>Battery Power:</Text>
                        <Text style={{textAlign:'left', fontWeight:'bold'}}>207W</Text>
                        </View>
                    </View>

                    <View style={{flexDirection:'row', justifyContent:'flex-start', alignItems:'flex-start', paddingVertical:10, width:'100%'}}>
                        <View style={{width:'50%'}}>
                        <Text style={{textAlign:'left',fontSize:14,}}>SoC:</Text>
                        <Text style={{textAlign:'left', fontWeight:'bold',fontSize:14,}}>99%</Text>
                        </View>
                        <View style={{width:'50%'}}>
                        <Text style={{textAlign:'left'}}>TOtal Charging Energy:</Text>
                        <Text style={{textAlign:'left', fontWeight:'bold'}}>59.2Kwh</Text>
                        </View>
                    </View>

                    <View style={{flexDirection:'row', justifyContent:'flex-start', alignItems:'flex-start', paddingVertical:10, width:'100%'}}>
                        <View style={{width:'50%'}}>
                        <Text style={{textAlign:'left',fontSize:14,}}>Total Discharging Energy::</Text>
                        <Text style={{textAlign:'left', fontWeight:'bold',fontSize:14,}}>15.7kwh</Text>
                        </View>
                        <View style={{width:'50%'}}>
                        <Text style={{textAlign:'left'}}>Daily Charging Energy:</Text>
                        <Text style={{textAlign:'left', fontWeight:'bold'}}>0.2kwh</Text>
                        </View>
                    </View>


                    <View style={{flexDirection:'row', justifyContent:'flex-start', alignItems:'flex-start', paddingVertical:10, width:'100%'}}>
                        <View style={{width:'50%'}}>
                        <Text style={{textAlign:'left',fontSize:14,}}>Daily Discharging Energy:</Text>
                        <Text style={{textAlign:'left', fontWeight:'bold',fontSize:14,}}>0kWh</Text>
                        </View>
                        <View style={{width:'50%'}}>
                        <Text style={{textAlign:'left'}}>Battery Related Capacity:</Text>
                        <Text style={{textAlign:'left', fontWeight:'bold'}}>230Ah</Text>
                        </View>
                    </View>


                    <View style={{flexDirection:'row', justifyContent:'flex-start', alignItems:'flex-start', paddingVertical:10, width:'100%'}}>
                        <View style={{width:'50%'}}>
                        <Text style={{textAlign:'left',fontSize:14,}}>Battery Mode:</Text>
                        <Text style={{textAlign:'left', fontWeight:'bold',fontSize:14,}}>Lead Acid</Text>
                        </View>
                        <View style={{width:'50%'}}>
                        <Text style={{textAlign:'left'}}>Battery Mode:</Text>
                        <Text style={{textAlign:'left', fontWeight:'bold'}}>% Mode</Text>
                        </View>
                    </View>
                    </View>


                          {/* Temparature */}

                   <View style={{padding:5, backgroundColor:"#f5f5f5"}}></View>
                    <View style={{ borderBottomColor:'lightgrey',borderBottomWidth:0.3,paddingVertical:10,padding:10}}>
                        <Text style={{fontWeight:'bold', fontSize:16,}}>Temparature</Text>
                    </View>
                    <View style={{padding:10}}>
                    <View style={{flexDirection:'row', justifyContent:'flex-start', alignItems:'flex-start', paddingVertical:10, width:'100%'}}>
                        <View style={{width:'50%'}}>
                        <Text style={{textAlign:'left',fontSize:14,}}>Temparature Battery:</Text>
                        <Text style={{textAlign:'left', fontWeight:'bold',fontSize:14,}}>25.00C</Text>
                        </View>
                        <View style={{width:'50%'}}>
                        <Text style={{textAlign:'left'}}>DC Temparature:</Text>
                        <Text style={{textAlign:'left', fontWeight:'bold'}}>62.80C</Text>
                        </View>
                    </View>

                    <View style={{flexDirection:'row', justifyContent:'flex-start', alignItems:'flex-start', paddingVertical:10, width:'100%'}}>
                        <View style={{width:'50%'}}>
                        <Text style={{textAlign:'left',fontSize:14,}}>AC  Temparature:</Text>
                        <Text style={{textAlign:'left', fontWeight:'bold',fontSize:14,}}>42.80C</Text>
                        </View>
                    </View>
                    </View>


                      {/* state */}

                 <View style={{padding:5, backgroundColor:"#f5f5f5"}}></View>
                    <View style={{ borderBottomColor:'lightgrey',borderBottomWidth:0.3,paddingVertical:10,padding:10}}>
                        <Text style={{fontWeight:'bold', fontSize:16,}}>State</Text>
                    </View>
                    <View style={{padding:10}}>
                    <View style={{flexDirection:'row', justifyContent:'flex-start', alignItems:'flex-start', paddingVertical:10, width:'100%'}}>
                        <View style={{width:'50%'}}>
                        <Text style={{textAlign:'left',fontSize:14,}}>Grid relay Status:</Text>
                        <Text style={{textAlign:'left', fontWeight:'bold',fontSize:14,}}>Maharashtra</Text>
                        </View>
                    </View>
                    </View>


                {/* generator */}

                     <View style={{padding:5, backgroundColor:"#f5f5f5"}}></View>
                    <View style={{ borderBottomColor:'lightgrey',borderBottomWidth:0.3,paddingVertical:10,padding:10}}>
                        <Text style={{fontWeight:'bold', fontSize:16,}}>Generator</Text>
                    </View>
                    <View style={{padding:10}}>
                    <View style={{flexDirection:'row', justifyContent:'flex-start', alignItems:'flex-start', paddingVertical:10, width:'100%'}}>
                        <View style={{width:'50%'}}>
                        <Text style={{textAlign:'left',fontSize:14,}}>Gen Daily Run Time:</Text>
                        <Text style={{textAlign:'left', fontWeight:'bold',fontSize:14,}}>0.00h</Text>
                        </View>
                        <View style={{width:'50%'}}>
                        <Text style={{textAlign:'left',fontSize:14,}}>Generator frequency:</Text>
                        <Text style={{textAlign:'left', fontWeight:'bold',fontSize:14,}}>0.00h</Text>
                        </View>
                    </View>
                    <View style={{flexDirection:'row', justifyContent:'flex-start', alignItems:'flex-start', paddingVertical:10, width:'100%'}}>
                        <View style={{width:'50%'}}>
                        <Text style={{textAlign:'left',fontSize:14,}}>Gen Voltage:</Text>
                        <Text style={{textAlign:'left', fontWeight:'bold',fontSize:14,}}>8.60V</Text>
                        </View>
                        <View style={{width:'50%'}}>
                        <Text style={{textAlign:'left',fontSize:14,}}>Total Gen Power:</Text>
                        <Text style={{textAlign:'left', fontWeight:'bold',fontSize:14,}}>0W</Text>
                        </View>
                    </View>

                    <View style={{flexDirection:'row', justifyContent:'flex-start', alignItems:'flex-start', paddingVertical:10, width:'100%'}}>
                        <View style={{width:'50%'}}>
                        <Text style={{textAlign:'left',fontSize:14,}}>Daily Production Generator:</Text>
                        <Text style={{textAlign:'left', fontWeight:'bold',fontSize:14,}}>0Kwh</Text>
                        </View>
                        <View style={{width:'50%'}}>
                        <Text style={{textAlign:'left',fontSize:14,}}>Total Production Generater:</Text>
                        <Text style={{textAlign:'left', fontWeight:'bold',fontSize:14,}}>0KWh</Text>
                        </View>
                    </View>
                    </View>
                    <View style={{padding:20, backgroundColor:"#f5f5f5"}}></View>
                    </>

  );
};

export default DeviceData;

const styles = StyleSheet.create({
});
