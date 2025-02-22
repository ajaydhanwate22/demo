import { StyleSheet, View, ScrollView, Pressable, TouchableOpacity, TextInput, Image, Alert, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Headline, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Entypo from 'react-native-vector-icons/Entypo';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const OverViewDay = ({ navigation}) => {

    const data = [{ id: 1, Kw: '3.00', percentage: '100%' },{ id: 2, Kw: '2.00', percentage: '80%' },{ id: 3, Kw: '1.00', percentage: '60%' },{ id: 4, Kw: '0.00', percentage: '40%' },{ id: 5, Kw: '-1.00', percentage: '20%' },{ id: 6, Kw: '-2.00', percentage: '00%' },];

      const Hours = [{ id: 1, Hr: '00.00'},{ id: 2, Hr: '03.00'},{ id: 3, Hr: '06.00'},{ id: 4, Hr: '09.00'},{ id: 5, Hr: '12.00'},
        { id: 6, Hr: '15.00'},{ id: 7, Hr: '18.00'},{ id: 8, Hr: '21.00'},{ id: 9, Hr: '24.00'},];

  return (
    <>
            {/* calender */}
            <View style={{padding:10, marginVertical:5}}>
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                    <TouchableOpacity style={{justifyContent:"center", alignItems: 'center'}}>
                    <AntDesign name="left" size={15} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity style={{flexDirection:'row', justifyContent:"center", alignItems:"center", gap:10}}>
                        <AntDesign name="calendar" size={20} color="black" />
                        <Text style={styles.Text}>2025/01/23</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{justifyContent:"center", alignItems: 'center'}}>
                    <AntDesign name="right" size={15} color="black" />
                    </TouchableOpacity>                  
                </View>
            </View>

            {/* heading */}
            <View style={{flexDirection:'row',justifyContent:"space-between", marginTop:10}}>
                <View style={{justifyContent:'center', alignItems:'center'}}>
                    <Text style={styles.Headline}>Solar & Utilization</Text>
                </View>
                <View style={{flexDirection:'row',padding:5, backgroundColor:'#f5f5f5', gap:15, borderRadius:10, paddingHorizontal:10}}>
                    <TouchableOpacity style={{justifyContent:"center", alignItems: 'center'}}>
                        <FontAwesome6 name="chart-pie" size={20} color="black" />
                    </TouchableOpacity> 
                    <TouchableOpacity style={{justifyContent:"center", alignItems: 'center'}}>
                        <AntDesign name="bars" size={20} color="black" />
                    </TouchableOpacity> 
                </View>
            </View>
            {/* utilication */}
            <View style={{flexDirection:'row',justifyContent:"space-between", marginTop:10}}>
                <View style={{justifyContent:'center', alignItems:'center'}}>
                    <Text style={[styles.Text,{fontSize:12}]}>Utilization</Text>
                </View>
                <View style={{justifyContent:'center', alignItems:'center'}}>
                    <Text style={{textAlign:'center', fontWeight:'bold',fontSize:16}}>250kWh</Text>
                </View>
            </View>
            {/* line */}
            <View style={{marginTop:15,}}>
                <View style={{flexDirection:'row', justifyContent:'space-between',width:'100%', alignItems:'center'}}>
                <TouchableOpacity style={{backgroundColor: 'rgba(75, 188, 216, 0.7)', width:'20%',paddingVertical:5, borderRadius:3}}>
                </TouchableOpacity>
                <TouchableOpacity style={{backgroundColor: 'rgba(77, 77, 130, 0.7)', width:'79.8%',paddingVertical:5, borderRadius:3}}>
                </TouchableOpacity>
                </View>
            </View>
            {/* PV discharged Import*/}
            <View style={{marginTop:10,paddingBottom:20, borderBottomWidth:0.3}}>
                <View style={{justifyContent:'space-between', flexDirection:'row'}}>
                    <View style={{gap:1}}>
                        <TouchableOpacity style={{flexDirection:'row', justifyContent:"center", alignItems:'center', gap:5}}>
                            <View style={{width: 8,height: 8,borderRadius: 5,backgroundColor: 'red',}}></View>
                            <Text style={{fontSize:8}}>PV</Text>
                        </TouchableOpacity>
                        <View style={{justifyContent:"center", alignItems:'center',flex:1}}>
                            <Text style={{textAlign:'center', fontWeight:'bold',fontSize:10, }}>0KWH</Text>
                        </View>
                    </View>
                    <View style={{gap:1}}>
                        <TouchableOpacity style={{flexDirection:'row', justifyContent:"center", alignItems:'center', gap:5}}>
                            <View style={{width: 8,height: 8,borderRadius: 5,backgroundColor: 'blue',}}></View>
                            <Text style={{fontSize:8}}>Discharged</Text>
                        </TouchableOpacity>
                        <View style={{justifyContent:"center", alignItems:'center',flex:1}}>
                            <Text style={{textAlign:'center', fontWeight:'bold',fontSize:10 }}>12% 0.30KWH</Text>
                        </View>
                    </View>
                    <View style={{gap:1}}>
                        <TouchableOpacity style={{flexDirection:'row', justifyContent:"center", alignItems:'center', gap:5}}>
                            <View style={{width: 8,height: 8,borderRadius: 5,backgroundColor: 'green',}}></View>
                            <Text style={{fontSize:8}} >Import</Text>
                        </TouchableOpacity>
                        <View style={{justifyContent:"center", alignItems:'center', }}>
                            <Text style={{textAlign:'center', fontWeight:'bold',fontSize:10 }}>88% 2.20kWh</Text>
                        </View>
                    </View>
                </View>
            </View>
            {/* graph heading */}
            <View style={{marginTop:20,marginVertical:10}}>
                <Text style={{fontSize:16,color:'black', fontWeight:'bold'}}>Power Profile</Text>
            </View>

            {/* graph content */}
            <View style={{paddingHorizontal:10}}>
                <View style={{flexDirection:"row"}}>
                    <Text style={{color:"blue",fontSize:10}}>Time </Text>
                    <Text style={{fontSize:10}}>11.25</Text>
                </View>
                <View style={{marginTop:5, flexDirection:'row', justifyContent:"space-between"}}>
                        <TouchableOpacity style={{flexDirection:'row', justifyContent:"center", alignItems:'center', gap:5}}>
                            <View style={{width: 8,height: 8,borderRadius: 5,backgroundColor: 'green',}}></View>
                            <Text style={{fontSize:8}}>PV : 0.00KW</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{flexDirection:'row', justifyContent:"center", alignItems:'center', gap:5}}>
                            <View style={{width: 8,height: 8,borderRadius: 5,backgroundColor: 'yellow',}}></View>
                            <Text style={{fontSize:8}}>Consumption : 0.15KW</Text>
                        </TouchableOpacity>
                </View>
                
                <View style={{marginTop:5, flexDirection:'row', justifyContent:"space-between"}}>
                        <TouchableOpacity style={{flexDirection:'row', justifyContent:"center", alignItems:'center', gap:5}}>
                            <View style={{width: 8,height: 8,borderRadius: 5,backgroundColor: 'purple',}}></View>
                            <Text style={{fontSize:8}}>Grid : 0.21KW</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{flexDirection:'row', justifyContent:"center", alignItems:'center', gap:5}}>
                            <View style={{width: 8,height: 8,borderRadius: 5,backgroundColor: 'red',}}></View>
                            <Text style={{fontSize:8}}>Battery : -0.01KW</Text>
                        </TouchableOpacity>
                </View>
                <View style={{marginTop:5, flexDirection:'row', justifyContent:"space-between"}}>
                        <TouchableOpacity style={{flexDirection:'row', justifyContent:"center", alignItems:'center', gap:5}}>
                            <View style={{width: 8,height: 8,borderRadius: 5,backgroundColor: 'green',}}></View>
                            <Text style={{fontSize:8}}>SOC : 100.00%</Text>
                        </TouchableOpacity>
                </View>

                    {/* graph X and y axis */}
                <View style={{justifyContent:"space-between", alignItems:'center', flexDirection:'row', marginTop:15}}>
                    <View style={{alignSelf:"center"}}>
                        <Text style={{fontSize:12, textAlign:'center'}} >KW</Text>
                    </View>
                    <View style={{alignSelf:"center"}}>
                        <Text style={{fontSize:12, textAlign:'center'}} >Percentage</Text>
                    </View>
                </View>

                {data.map((item, index) => (
                <View key={item.id} style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', width: '100%', marginTop: 15 }}>
                    <View style={{ alignSelf: 'center' }}>
                    <Text style={{ fontSize: 10, textAlign: 'center' }}>{item.Kw}</Text>
                    </View>
                    <View style={{ height: 1, backgroundColor: 'black', flex: 1, marginHorizontal: 5 }}></View>
                    <View style={{ alignSelf: 'center' }}>
                    <Text style={{ fontSize: 10, textAlign: 'center' }}>{item.percentage}</Text>
                    </View>
                </View>
                ))}


                <View style={{flexDirection:"row",justifyContent:"space-around", marginTop:3, alignItems:"center"}}>
                    {Hours.map((item, index) => (
                        <Text key={item.id} style={{ fontSize: 8, textAlign: 'center' }}>{item.Hr}</Text>
                    ))}
                </View>
            </View>
    </>
  );
};

export default OverViewDay;

const styles = StyleSheet.create({
    Text:{textAlign:'center', alignSelf:'center'}, 
    activetab:{textAlign:"center", fontWeight:"bold", fontSize:17, alignSelf:"center"},
    TouchableOpacity:{justifyContent:'center', alignItems:'center',padding:8, flex:1, borderRightWidth:0.3, borderColor:"#e0e0e0",},
    activeTouchableOpacity:{justifyContent:'center', alignItems:'center',padding:8, flex:1, borderRightWidth:0.3, borderColor:"#e0e0e0",backgroundColor:"white"},
    Headline:{fontSize:16, textAlign:'center', color:'black', fontWeight:'bold'}
});
