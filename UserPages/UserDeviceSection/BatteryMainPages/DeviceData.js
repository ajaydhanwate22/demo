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
                    {/* Basic Inforamtion */}
                    <View style={{padding:10, backgroundColor:"#f5f5f5"}}></View>
                    <View style={{borderBottomWidth:0.3,paddingVertical:10,padding:10,borderColor:'lightgrey',}}>
                        <Text style={{fontWeight:'bold', fontSize:16,}}>Basic Inforamtion</Text>
                    </View>
                    <View style={{padding:10}}>
                    <View style={{flexDirection:'row', justifyContent:'flex-start', alignItems:'flex-start', paddingVertical:10, width:'100%'}}>
                        <View style={{width:'50%'}}>
                        <Text style={{textAlign:'left',fontSize:14,}}>Connected Device SN:</Text>
                        <Text style={{textAlign:'left', fontWeight:'bold',fontSize:14,}}>2406281016</Text>
                        </View>
                        <View style={{width:'50%'}}>
                        <Text style={{textAlign:'left'}}>Packnum Number:</Text>
                        <Text style={{textAlign:'left', fontWeight:'bold'}}>1</Text>
                        </View>
                    </View>
                    </View>


                                       {/* battery Pack Inforamtion */}

                <View style={{padding:5, backgroundColor:"#f5f5f5"}}></View>
                    <View style={{ borderBottomColor:'lightgrey',borderBottomWidth:0.3,paddingVertical:10,padding:10}}>
                        <Text style={{fontWeight:'bold', fontSize:16,}}>Battery pack</Text>
                    </View>
                    <View style={{padding:10}}>
                    <View style={{flexDirection:'row', justifyContent:'flex-start', alignItems:'flex-start', paddingVertical:10, width:'100%'}}>
                        <View style={{width:'50%'}}>
                        <Text style={{textAlign:'left',fontSize:14,}}>Battery Status:</Text>
                        <Text style={{textAlign:'left', fontWeight:'bold',fontSize:14,}}>Discharging</Text>
                        </View>
                    </View>
                    </View>


                                                           {/* key Info */}

                <View style={{padding:5, backgroundColor:"#f5f5f5"}}></View>
                    <View style={{ borderBottomColor:'lightgrey',borderBottomWidth:0.3,paddingVertical:10,padding:10}}>
                        <Text style={{fontWeight:'bold', fontSize:16,}}>key Inforamtion</Text>
                    </View>
                    <View style={{padding:10}}>
                    <View style={{flexDirection:'row', justifyContent:'flex-start', alignItems:'flex-start', paddingVertical:10, width:'100%'}}>
                        <View style={{width:'50%'}}>
                        <Text style={{textAlign:'left',fontSize:14,}}>Battery Voltage</Text>
                        <Text style={{textAlign:'left', fontWeight:'bold',fontSize:14,}}>0V</Text>
                        </View>
                        <View style={{width:'50%'}}>
                        <Text style={{textAlign:'left'}}>Battery Current:</Text>
                        <Text style={{textAlign:'left', fontWeight:'bold'}}>0A</Text>
                        </View>
                    </View>


                    
                    <View style={{flexDirection:'row', justifyContent:'flex-start', alignItems:'flex-start', paddingVertical:10, width:'100%'}}>
                        <View style={{width:'50%'}}>
                        <Text style={{textAlign:'left',fontSize:14,}}>Battery SOC :</Text>
                        <Text style={{textAlign:'left', fontWeight:'bold', fontSize:14,}}>0%</Text>
                        </View>
                        <View style={{width:'50%'}}>
                        <Text style={{textAlign:'left', fontSize:14,}}>Battery SOH :</Text>
                        <Text style={{textAlign:'left', fontWeight:'bold', fontSize:14,}}>0%</Text>
                        </View>
                    </View>

                                        
                    <View style={{flexDirection:'row', justifyContent:'flex-start', alignItems:'flex-start', paddingVertical:10, width:'100%'}}>
                        <View style={{width:'50%'}}>
                        <Text style={{textAlign:'left',fontSize:14,}}>Battery CApAH :</Text>
                        <Text style={{textAlign:'left', fontWeight:'bold', fontSize:14,}}>0AH</Text>
                        </View>
                        <View style={{width:'50%'}}>
                        <Text style={{textAlign:'left', fontSize:14,}}>Battery 1 maximum Voltage :</Text>
                        <Text style={{textAlign:'left', fontWeight:'bold', fontSize:14,}}>0V</Text>
                        </View>
                    </View>

                    <View style={{flexDirection:'row', justifyContent:'flex-start', alignItems:'flex-start', paddingVertical:10, width:'100%'}}>
                        <View style={{width:'50%'}}>
                        <Text style={{textAlign:'left',fontSize:14,}}>Battery 1 minimum voltage :</Text>
                        <Text style={{textAlign:'left', fontWeight:'bold', fontSize:14,}}>0V</Text>
                        </View>
                        <View style={{width:'50%'}}>
                        <Text style={{textAlign:'left', fontSize:14,}}>Battery 1 maximum Temparature :</Text>
                        <Text style={{textAlign:'left', fontWeight:'bold', fontSize:14,}}>0C</Text>
                        </View>
                    </View>
                    <View style={{flexDirection:'row', justifyContent:'flex-start', alignItems:'flex-start', paddingVertical:10, width:'100%'}}>
                    <View style={{width:'50%'}}>
                        <Text style={{textAlign:'left', fontSize:14,}}>Battery 1 minimum Temparature :</Text>
                        <Text style={{textAlign:'left', fontWeight:'bold', fontSize:14,}}>0C</Text>
                        </View>
                        <View style={{width:'50%'}}>
                        <Text style={{textAlign:'left', fontSize:14,}}>Battery Temparature :</Text>
                        <Text style={{textAlign:'left', fontWeight:'bold', fontSize:14,}}>-100C</Text>
                        </View>
                    </View>
                    </View>

                    {/* charged and Discharged Limit */}

                <View style={{padding:5, backgroundColor:"#f5f5f5"}}></View>
                    <View style={{ borderBottomColor:'lightgrey',borderBottomWidth:0.3,paddingVertical:10,padding:10}}>
                        <Text style={{fontWeight:'bold', fontSize:16,}}>charged and Discharged Limit</Text>
                    </View>
                    <View style={{padding:10}}>
                    <View style={{flexDirection:'row', justifyContent:'flex-start', alignItems:'flex-start', paddingVertical:10, width:'100%'}}>
                        <View style={{width:'50%'}}>
                        <Text style={{textAlign:'left',fontSize:14,}}>charged End Voltage:</Text>
                        <Text style={{textAlign:'left', fontWeight:'bold',fontSize:14,}}>0V</Text>
                        </View>
                        <View style={{width:'50%'}}>
                        <Text style={{textAlign:'left'}}>Discharged END Voltage :</Text>
                        <Text style={{textAlign:'left', fontWeight:'bold'}}>0.00v</Text>
                        </View>
                    </View>

                    <View style={{flexDirection:'row', justifyContent:'flex-start', alignItems:'flex-start', paddingVertical:10, width:'100%'}}>
                        <View style={{width:'50%'}}>
                        <Text style={{textAlign:'left',fontSize:14,}}>charged Limit current :</Text>
                        <Text style={{textAlign:'left', fontWeight:'bold',fontSize:14,}}>0A</Text>
                        </View>
                        <View style={{width:'50%'}}>
                        <Text style={{textAlign:'left',fontSize:14,}}>Discharged Limit current :</Text>
                        <Text style={{textAlign:'left', fontWeight:'bold',fontSize:14,}}>0A</Text>
                        </View>
                    </View>
                    </View>


                    {/* Other */}

                    <View style={{padding:5, backgroundColor:"#f5f5f5"}}></View>
                    <View style={{ borderBottomColor:'lightgrey',borderBottomWidth:0.3,paddingVertical:10,padding:10}}>
                        <Text style={{fontWeight:'bold', fontSize:16,}}>Other</Text>
                    </View>
                    <View style={{padding:10}}>
                    <View style={{flexDirection:'row', justifyContent:'flex-start', alignItems:'flex-start', paddingVertical:10, width:'100%'}}>
                        <View style={{width:'50%'}}>
                        <Text style={{textAlign:'left',fontSize:14,}}>Forced Charge flag :</Text>
                        <Text style={{textAlign:'left', fontWeight:'bold',fontSize:14,}}>0000</Text>
                        </View>
                        <View style={{width:'50%'}}>
                        <Text style={{textAlign:'left'}}>Check SOC Flag:</Text>
                        <Text style={{textAlign:'left', fontWeight:'bold'}}>0000</Text>
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
