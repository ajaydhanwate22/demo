import { StyleSheet, View, Pressable, ScrollView, TouchableOpacity, Image, Modal, TextInput,SafeAreaView, Text,FlatList  } from 'react-native'
import React, {useState} from 'react'
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';


const AllNotifications = () => {

    const navigation = useNavigation();

  
  return (
    <SafeAreaView style={styles.PageContainer}>
        <ScrollView>
            <View style={{paddingHorizontal:20, paddingTop:30,paddingBottom:10,flexDirection:'row', justifyContent:'space-between', backgroundColor:"#f2be25"}}> 
                <View style={{flexDirection:'row',gap:10}}>
                    <TouchableOpacity onPress={() => navigation.goBack()}  style={{justifyContent:"center", alignItems:"center", alignSelf:'center'}}>
                    <AntDesign name="arrowleft" size={25} color="black" />
                    </TouchableOpacity>
                    <Text style={{fontSize:19, fontWeight:'bold',color:'black', alignSelf:'center'}}>Notifications</Text>
                </View>
                <View>
                    <TouchableOpacity>
                    <FontAwesome6 name="chevron-up" size={25} color="black" />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{padding:20, borderBottomWidth:1,  borderColor: "#000",paddingVertical:20, marginTop:10}}>
                <View style={{justifyContent:'space-between', flexDirection:'row',}}>
                    <View style={{alignSelf:'center', gap:2, justifyContent:'center'}}> 
                        <Text style={{fontWeight:'bold',color:'black'}}>Visit</Text>
                        <Text style={{color:'black'}}>Tommorow enginner will Visit</Text>
                        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                            <View>
                            <Text style={{fontWeight:'bold',color: "#f01a05"}}>Date: 04/02/2025 </Text>
                            </View>
                            <View>
                            <Text style={{fontWeight:'bold',color: "#f01a05"}}>  Time: 3:50PM</Text>
                            </View>
                        </View>
                    </View>

                    <TouchableOpacity style={{borderColor:'#f01a05',borderRadius:50, justifyContent:'center',alignItems:'center', borderWidth:1, width:40, height:40, alignSelf:'center', backgroundColor:'#f01a05', marginTop:10}}>
                        <Text style={{ fontSize:12,color:'white'}}>Clear</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default AllNotifications
const styles = StyleSheet.create({
  PageContainer: { backgroundColor: "#fff", height: "100%" },
})