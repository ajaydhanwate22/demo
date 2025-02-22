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


const HistoryYear = ({ navigation}) => {

    const data = [{ id: 1, Kw: '70' },{ id: 2, Kw: '56' },{ id: 3, Kw: '42'},{ id: 4, Kw: '28' },{ id: 5, Kw: '14'},{ id: 6, Kw: '0.0'}];

      const Hours = [{ id: 1, Hr: '1'},{ id: 2, Hr: '2'},{ id: 3, Hr: '3'},{ id: 4, Hr: '4'},{ id: 5, Hr: '5'},
        { id: 6, Hr: '6'},{ id: 7, Hr: '7'},{ id: 8, Hr: '8'},{ id: 9, Hr: '9'},{ id: 10, Hr: '10'},{ id: 11, Hr: '11'},{ id: 12, Hr: '12'}];

  return (
    <>
            {/* calender */}
            <View style={{flexDirection:'row', justifyContent:'space-between',backgroundColor: 'rgb(243, 238, 238)', paddingVertical:5, paddingHorizontal:10}}>
                  <TouchableOpacity style={{justifyContent:"center", alignItems: 'center'}}>
                    <AntDesign name="left" size={15} color="black" />
                  </TouchableOpacity>
                  <TouchableOpacity style={{flexDirection:'row', justifyContent:"center", alignItems:"center", gap:10}}>
                      <AntDesign name="calendar" size={20} color="black" />
                            <Text style={styles.Text}>2025</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{justifyContent:"center", alignItems: 'center'}}>
                      <AntDesign name="right" size={15} color="black" />
                  </TouchableOpacity>                  
              </View>

            <View style={{padding:10,backgroundColor:'white'}}>
               {/* select parameter */}
                <TouchableOpacity style={{flexDirection:'row', justifyContent:'flex-end', alignItems:'center'}}>
                 <Text style={{textAlign:'right'}}>Select Parameter</Text>
                 <Entypo name="thermometer" size={15} color="black" />
                 </TouchableOpacity>


                   <View style={{justifyContent:"space-between", alignItems:'center', flexDirection:'row', marginTop:10}}>
                       <View style={{alignSelf:"center"}}>
                           <Text style={{fontSize:12, textAlign:'center'}} >KWh</Text>
                       </View>
                   </View>                 
   
                 
                   {data.map((item, index) => (
                   <View key={item.id} style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', width: '100%', marginTop: 15, padding:5 }}>
                       <View style={{ alignSelf: 'center' }}>
                       <Text style={{ fontSize: 10, textAlign: 'center' }}>{item.Kw}</Text>
                       </View>
                       <View style={{ height: 1, backgroundColor: 'black', flex: 1, marginHorizontal: 5 }}></View>
                       <View style={{ alignSelf: 'center' }}>
                       <Text style={{ fontSize: 10, textAlign: 'center' }}>{item.percentage}</Text>
                       </View>
                   </View>
                   ))}
                   <View style={{flexDirection:"row",justifyContent:"space-around", alignItems:"center"}}>
                       {Hours.map((item, index) => (
                           <Text key={item.id} style={{ fontSize: 8, textAlign: 'center' }}>{item.Hr}</Text>
                       ))}
                   </View>
   
                   <View style={{justifyContent:'space-around', flexDirection:'row', marginTop:5}}>
                   <View style={{gap:1}}>
                           <TouchableOpacity style={{flexDirection:'row', justifyContent:"center", alignItems:'center', gap:5, flex:1}}>
                               <View style={{width: 8,height: 8,backgroundColor: 'red',alignSelf:'center'}}></View>
                               <Text style={{fontSize:8}} >Production</Text>
                           </TouchableOpacity>
                       </View>
                       <View style={{gap:1}}>
                           <TouchableOpacity style={{flexDirection:'row', justifyContent:"center", alignItems:'center', gap:5, flex:1}}>
                               <View style={{width: 8,height: 8,backgroundColor: 'blue',alignSelf:'center'}}></View>
                               <Text style={{fontSize:8}} >Grid Feed-In</Text>
                           </TouchableOpacity>
                       </View>
                       <View style={{gap:1}}>
                           <TouchableOpacity style={{flexDirection:'row', justifyContent:"center", alignItems:'center', gap:5, flex:1}}>
                               <View style={{width: 8,height: 8,backgroundColor: 'pink',alignSelf:'center'}}></View>
                               <Text style={{fontSize:8}} >Consumption</Text>
                           </TouchableOpacity>
                       </View>
                       <View style={{gap:1}}>
                           <TouchableOpacity style={{flexDirection:'row', justifyContent:"center", alignItems:'center', gap:5, flex:1}}>
                               <View style={{width: 8,height: 8,backgroundColor: 'yellow',alignSelf:'center'}}></View>
                               <Text style={{fontSize:8}} > Electricity Purchasine</Text>
                           </TouchableOpacity>
                       </View>
                   </View>
             </View>           

    </>
  );
};

export default HistoryYear;

const styles = StyleSheet.create({
    Text:{textAlign:'center', alignSelf:'center'}, 
    activetab:{textAlign:"center", fontWeight:"bold", fontSize:17, alignSelf:"center"},
    TouchableOpacity:{justifyContent:'center', alignItems:'center',padding:8, flex:1, borderRightWidth:0.3, borderColor:"#e0e0e0",},
    activeTouchableOpacity:{justifyContent:'center', alignItems:'center',padding:8, flex:1, borderRightWidth:0.3, borderColor:"#e0e0e0",backgroundColor:"white"},
    Headline:{fontSize:16, textAlign:'center', color:'black', fontWeight:'bold'}
});
