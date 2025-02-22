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


  return (
    <>

    {/* electricity Information */}
                    <View style={{padding:10, backgroundColor:"#f5f5f5"}}></View>
                        
                    {/* Basic Inforamtion */}
                    <View style={{ borderBottomColor:'#f5f5f5',borderBottomWidth:0.3,paddingVertical:10,padding:10,borderColor:'lightgrey',}}>
                        <Text style={{fontWeight:'bold', fontSize:16,}}>Basic Inforamtion</Text>
                    </View>
                    <View style={{padding:10}}>
                    <View style={{flexDirection:'row', justifyContent:'flex-start', alignItems:'flex-start', paddingVertical:10, width:'100%'}}>
                        <View style={{width:'50%'}}>
                        <Text style={{textAlign:'left',fontSize:14,}}>Sensor List:</Text>
                        <Text style={{textAlign:'left', fontWeight:'bold',fontSize:14,}}>5406</Text>
                        </View>
                        <View style={{width:'50%'}}>
                        <Text style={{textAlign:'left'}}>Embedded Device SN:</Text>
                        <Text style={{textAlign:'left', fontWeight:'bold'}}>2974062707</Text>
                        </View>
                    </View>
                    </View>


                                       {/* Version Inforamtion */}

                <View style={{padding:5, backgroundColor:"#f5f5f5"}}></View>
                    <View style={{ borderBottomColor:'#f5f5f5',borderBottomWidth:0.3,paddingVertical:10,padding:10,borderColor:'lightgrey',}}>
                        <Text style={{fontWeight:'bold', fontSize:16,}}>Version Inforamtion</Text>
                    </View>
                    <View style={{padding:10}}>
                    <View style={{flexDirection:'row', justifyContent:'flex-start', alignItems:'flex-start', paddingVertical:10, width:'100%'}}>
                        <View style={{width:'50%'}}>
                        <Text style={{textAlign:'left',fontSize:14,}}>Module Vrsion No:</Text>
                        <Text style={{textAlign:'left', fontWeight:'bold',fontSize:14,}}>LSW3_32U_5406_1.06</Text>
                        </View>
                        <View style={{width:'50%'}}>
                        <Text style={{textAlign:'left'}}>Extend System Version:</Text>
                        <Text style={{textAlign:'left', fontWeight:'bold'}}>V1.1.00.10</Text>
                        </View>
                    </View>
                    </View>


                                                           {/* Power Grid */}

                <View style={{padding:5, backgroundColor:"#f5f5f5"}}></View>
                    <View style={{ borderBottomColor:'#f5f5f5',borderBottomWidth:0.3,paddingVertical:10,padding:10,borderColor:'lightgrey',}}>
                        <Text style={{fontWeight:'bold', fontSize:16,}}>Operation Information Grid</Text>
                    </View>
                    <View style={{padding:10}}>
                    <View style={{flexDirection:'row', justifyContent:'flex-start', alignItems:'flex-start', paddingVertical:10, width:'100%'}}>
                        <View style={{width:'50%'}}>
                        <Text style={{textAlign:'left',fontSize:14,}}>Data Uploading Period:</Text>
                        <Text style={{textAlign:'left', fontWeight:'bold',fontSize:14,}}>5min</Text>
                        </View>
                        <View style={{width:'50%'}}>
                        <Text style={{textAlign:'left'}}>Data Acquisition Period:</Text>
                        <Text style={{textAlign:'left', fontWeight:'bold'}}>60s</Text>
                        </View>
                    </View>


                    
                    <View style={{flexDirection:'row', justifyContent:'flex-start', alignItems:'flex-start', paddingVertical:10, width:'100%'}}>
                        <View style={{width:'50%'}}>
                        <Text style={{textAlign:'left',fontSize:14,}}>Max.No. of Connected Device:</Text>
                        <Text style={{textAlign:'left', fontWeight:'bold', fontSize:14,}}>32</Text>
                        </View>
                        <View style={{width:'50%'}}>
                        <Text style={{textAlign:'left', fontSize:14,}}>single  strenght :</Text>
                        <Text style={{textAlign:'left', fontWeight:'bold', fontSize:14,}}>92</Text>
                        </View>
                    </View>

                                        
                    <View style={{flexDirection:'row', justifyContent:'flex-start', alignItems:'flex-start', paddingVertical:10, width:'100%'}}>
                        <View style={{width:'50%'}}>
                        <Text style={{textAlign:'left',fontSize:14,}}>Module MAC Address:</Text>
                        <Text style={{textAlign:'left', fontWeight:'bold', fontSize:14,}}>D4233334657</Text>
                        </View>
                        <View style={{width:'50%'}}>
                        <Text style={{textAlign:'left', fontSize:14,}}>Routed SSID :</Text>
                        <Text style={{textAlign:'left', fontWeight:'bold', fontSize:14,}}>AirFiber-SGpBk3</Text>
                        </View>
                    </View>
                    </View>
                    <View style={{padding:100, backgroundColor:"#f5f5f5"}}></View>
                    </>

  );
};

export default DeviceData;

const styles = StyleSheet.create({
});
