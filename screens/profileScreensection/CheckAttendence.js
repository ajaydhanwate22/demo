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
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';

const CheckAttendence = ({navigation}) => {

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

                <View style={{paddingHorizontal:20}}>
                    <Text style={{fontSize: 14, color: "#f01a05",fontWeight:'900'}}>Check Attendance</Text>
                </View>

                <View style={{flexDirection:'row', paddingHorizontal:20, justifyContent:'space-between', borderBottomWidth:0.3,paddingBottom:20, borderColor:'#d3d3d3',marginTop:10 }}>
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

                <View style={{flexDirection:'row', paddingHorizontal:20, justifyContent:'center', borderColor:'#d3d3d3', marginTop:5 }}>
                    <TouchableOpacity style={{flexDirection:'row', gap:10,paddingVertical:10, paddingHorizontal:10,justifyContent:"center", alignItems:'center'}}>
                        <Text style={{fontSize: 14}}>01/01/2025</Text>
                    </TouchableOpacity>
                    <View style={{justifyContent:'center', alignItems:"center"}}>
                        <Text style={{textAlign:'center',fontSize: 14 }}>TO</Text>
                    </View>
                    <TouchableOpacity style={{flexDirection:'row', gap:10,paddingVertical:10, paddingHorizontal:10,justifyContent:"center", alignItems:'center'}}>
                        <Text style={{fontSize: 14}}>20/01/2025</Text>
                    </TouchableOpacity>
                </View>

                <View style={{paddingHorizontal:20, gap:10, marginTop:10}}>
                    <View style={{flexDirection:'row',width:'100%', justifyContent:"space-between"}}>
                        <TouchableOpacity style={{width:'49%'}}>
                        <LinearGradient colors={['#ffde59', '#ff914d']}  start={{ x: 0, y: 0 }}  end={{ x: 1, y: 0 }} style={styles.gradientBorder} >
                        <View style={styles.innerContent}>
                            <Text style={{fontSize:26, fontWeight:'900', textAlign:"center", color:'black'}}>2</Text>
                            <Text style={{fontSize:17, fontWeight:'900', textAlign:"center", justifyContent:"center"}}>Total Working Days</Text>
                        </View>
                         </LinearGradient>
                        </TouchableOpacity>
                        <TouchableOpacity style={{width:'49%'}}>
                        <LinearGradient colors={['#ffde59', '#ff914d']}  start={{ x: 0, y: 0 }}  end={{ x: 1, y: 0 }} style={styles.gradientBorder} >
                        <View style={styles.innerContent}>
                            <Text style={{fontSize:26, fontWeight:'900', textAlign:"center", color:'black'}}>16</Text>
                            <Text style={{fontSize:17, fontWeight:'900', textAlign:"center", justifyContent:"center", paddingHorizontal:40,}}>Total Leave</Text>
                            </View>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>

                    <View style={{flexDirection:'row',width:'100%', justifyContent:"space-between"}}>
                        <TouchableOpacity style={{width:'49%'}}>
                        <LinearGradient colors={['#ffde59', '#ff914d']}  start={{ x: 0, y: 0 }}  end={{ x: 1, y: 0 }} style={styles.gradientBorder} >
                        <View style={styles.innerContent}>
                            <Text style={{fontSize:26, fontWeight:'900', textAlign:"center", color:'black'}}>₹ 1000</Text>
                            <Text style={{fontSize:17, fontWeight:'900', textAlign:"center", justifyContent:"center", paddingHorizontal:40}}>Total Salary</Text>
                            </View>
                            </LinearGradient>
                        </TouchableOpacity>
                        <TouchableOpacity style={{width:'49%'}}>
                        <LinearGradient colors={['#ffde59', '#ff914d']}  start={{ x: 0, y: 0 }}  end={{ x: 1, y: 0 }} style={styles.gradientBorder} >
                        <View style={styles.innerContent}>
                            <Text style={{fontSize:26, fontWeight:'900', textAlign:"center", color:'black'}}>₹ 1000</Text>
                            <Text style={{fontSize:17, fontWeight:'900', textAlign:"center", justifyContent:"center", paddingHorizontal:40}}>Salary Paid</Text>
                            </View>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{padding:20,marginTop:5}}>
                    {/* table heading */}
                    <View style={{borderWidth:1}}>
                        <View style={{flexDirection:'row', width:'100%',backgroundColor:'#f2be25',}}>
                        <View style={{width:'32%', paddingVertical:20,alignItems:"center",justifyContent:"center",borderRightWidth:1}}>
                            <Text style={{textAlign:'center',fontSize:16, fontWeight:'bold'}}>Date</Text>
                        </View>
                        <View style={{width:'34%', paddingVertical:20,alignItems:"center",justifyContent:"center",borderRightWidth:1}}>
                            <Text style={{textAlign:'center',fontSize:16, fontWeight:'bold'}}>Attendance</Text>
                        </View>
                        <View style={{width:'34%', paddingVertical:20,alignItems:"center",justifyContent:"center"}}>
                            <Text style={{textAlign:'center',fontSize:16, fontWeight:'bold'}}>Salary Paid</Text>
                        </View> 
                        </View>
                        {/* table content */}
                        <View style={{flexDirection:'row', width:'100%',borderTopWidth:1}}>
                        <View style={{width:'32%', paddingVertical:20,alignItems:"center",justifyContent:"center",borderRightWidth:1}}>
                            <Text style={{textAlign:'center',fontSize:16}}>01/01/2025</Text>
                        </View>
                        <View style={{width:'34%', paddingVertical:10,alignItems:"center",justifyContent:"center",borderRightWidth:1}}>
                            <Text style={{textAlign:'center',fontSize:16}}>10.00 AM</Text>
                            <Text style={{textAlign:'center',fontSize:16}}>7.00 PM</Text>
                        </View>
                        <View style={{width:'34%', paddingVertical:20,alignItems:"center",justifyContent:"center"}}>
                            <Text style={{textAlign:'center',fontSize:16}}>₹ 500.00</Text>
                        </View> 
                        </View>
                        <View style={{flexDirection:'row', width:'100%',borderTopWidth:1}}>
                        <View style={{width:'32%', paddingVertical:20,alignItems:"center",justifyContent:"center",borderRightWidth:1}}>
                            <Text style={{textAlign:'center',fontSize:16}}>02/01/2025</Text>
                        </View>
                        <View style={{width:'34%', paddingVertical:10,alignItems:"center",justifyContent:"center",borderRightWidth:1}}>
                            <Text style={{textAlign:'center',fontSize:16}}>10.00 AM</Text>
                            <Text style={{textAlign:'center',fontSize:16}}>7.00 PM</Text>
                        </View>
                        <View style={{width:'34%', paddingVertical:20,alignItems:"center",justifyContent:"center"}}>
                            <Text style={{textAlign:'center',fontSize:16}}>₹ 1000.00</Text>
                        </View> 
                        </View>
                    </View>
                </View>
            </ScrollView>
                <Pressable style={{ width: "100%", height: 70, justifyContent: "center", alignItems: "center", backgroundColor: "#ffffff", elevation: 3 }}>
                    <TouchableOpacity style={{ width: "90%", height: 50, backgroundColor: "#f2be25", borderRadius: 6, justifyContent: "center", alignItems: "center" }}>
                         <View style={{flexDirection: 'row', gap:10}}>
                            <Text style={{ fontSize: 16, fontWeight: "700", color: "#000000", alignSelf:"center" }}>Download</Text>
                        </View>
                     </TouchableOpacity>
                </Pressable>
        </SafeAreaView>
    )
}

export default CheckAttendence

const styles = StyleSheet.create({
    PageContainer: { backgroundColor: "#fff", height: "100%" },
    logo: { width: "50%", height: 80, marginTop: 15 },
    gradientBorder: { padding: 3,borderColor: 'transparent',},
    innerContent: {backgroundColor: '#fff',padding: 10,justifyContent: 'center',alignItems: 'center',},
})