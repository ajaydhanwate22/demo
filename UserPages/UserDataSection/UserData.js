import { StyleSheet, View, ScrollView, Pressable, TouchableOpacity, TextInput, Image, Alert, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../Header';
import UserDataHeader from './UserDataHeader';
import UserDataMonth from './UserDataMonth';
import UserDataYear from './UserDataYear';
import UserDataLifeTime from './UserDataLifeTime';

const Data = ({ navigation}) => {

  const data = [{ id: 1, Kw: '3.44', percentage: '105' },{ id: 2, Kw: '2.58', percentage: '84' },{ id: 3, Kw: '1.72', percentage: '63' },{ id: 4, Kw: '0.86', percentage: '42' },{ id: 5, Kw: '00', percentage: '21' },{ id: 6, Kw: '-0.86', percentage: '00' },];

  const Hours = [{ id: 1, Hr: '00.00'},{ id: 2, Hr: '04.00'},{ id: 3, Hr: '08.00'},{ id: 4, Hr: '12.00'},{ id: 5, Hr: '16.00'},
    { id: 6, Hr: '20.00'},{ id: 7, Hr: '24.00'}];

    const [selectedTab, setSelectedTab] = useState('UserDataMonth');

    const renderContent = () => {
        switch (selectedTab) {
          case 'UserDataMonth':
            return <UserDataMonth />;
          case 'UserDataYear':
            return <UserDataYear />;
          case 'UserDataLifeTime':
            return <UserDataLifeTime />;
          default:
            return null;
        }
      };
  

  return (
    <SafeAreaView style={styles.PageContainer}>
      <UserDataHeader/>
      <ScrollView>
        <View style={{padding:10,backgroundColor:'#f5f5f5'}}>
            <View style={{flexDirection:'row', justifyContent:'space-between',backgroundColor: 'rgb(243, 238, 238)', paddingVertical:5, paddingHorizontal:10}}>
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
          <View style={{padding:10,backgroundColor:'white'}}>
            {/* select parameter */}
             <TouchableOpacity style={{flexDirection:'row', justifyContent:'flex-end', alignItems:'center'}}>
              <Text style={{textAlign:'right'}}>Select Parameter</Text>
              <Entypo name="thermometer" size={15} color="black" />
              </TouchableOpacity>

                <View style={{justifyContent:"space-between", alignItems:'center', flexDirection:'row', marginTop:10}}>
                    <View style={{alignSelf:"center"}}>
                        <Text style={{fontSize:12, textAlign:'center'}} >KW</Text>
                    </View>
                    <View style={{alignSelf:"center"}}>
                        <Text style={{fontSize:12, textAlign:'center'}} >%</Text>
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
                <View style={{flexDirection:"row",justifyContent:"space-around", alignItems:"center"}}>
                    {Hours.map((item, index) => (
                        <Text key={item.id} style={{ fontSize: 8, textAlign: 'center' }}>{item.Hr}</Text>
                    ))}
                </View>

                <View style={{justifyContent:'space-around', flexDirection:'row', marginTop:5}}>
                <View style={{gap:1}}>
                        <TouchableOpacity style={{flexDirection:'row', justifyContent:"center", alignItems:'center', gap:5, flex:1}}>
                            <View style={{width: 8,height: 8,backgroundColor: 'red',alignSelf:'center'}}></View>
                            <Text style={{fontSize:8}} >PV</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{gap:1}}>
                        <TouchableOpacity style={{flexDirection:'row', justifyContent:"center", alignItems:'center', gap:5, flex:1}}>
                            <View style={{width: 8,height: 8,backgroundColor: 'blue',alignSelf:'center'}}></View>
                            <Text style={{fontSize:8}} >Consumption</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{gap:1}}>
                        <TouchableOpacity style={{flexDirection:'row', justifyContent:"center", alignItems:'center', gap:5, flex:1}}>
                            <View style={{width: 8,height: 8,backgroundColor: 'pink',alignSelf:'center'}}></View>
                            <Text style={{fontSize:8}} >Grid</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{gap:1}}>
                        <TouchableOpacity style={{flexDirection:'row', justifyContent:"center", alignItems:'center', gap:5, flex:1}}>
                            <View style={{width: 8,height: 8,backgroundColor: 'yellow',alignSelf:'center'}}></View>
                            <Text style={{fontSize:8}} >Battery</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{gap:1}}>
                        <TouchableOpacity style={{flexDirection:'row', justifyContent:"center", alignItems:'center', gap:5, flex:1}}>
                            <View style={{width: 8,height: 8,backgroundColor: 'green',alignSelf:'center'}}></View>
                            <Text style={{fontSize:8}} >Soc</Text>
                        </TouchableOpacity>
                    </View>
                </View>
          </View>


                  <View style={{ justifyContent: 'space-around', flexDirection: 'row', marginTop:10, backgroundColor:'white', paddingHorizontal:10 }}>
                    <TouchableOpacity
                      style={[styles.TouchableOpacity, selectedTab === 'UserDataMonth' && styles.activeTouchableOpacity]}
                      onPress={() => setSelectedTab('UserDataMonth')}
                    >
                      <Text style={[styles.Text, selectedTab === 'UserDataMonth' && styles.activetab]}>Month</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.TouchableOpacity, selectedTab === 'UserDataYear' && styles.activeTouchableOpacity]}
                      onPress={() => setSelectedTab('UserDataYear')}
                    >
                      <Text style={[styles.Text, selectedTab === 'UserDataYear' && styles.activetab]}>Year</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.TouchableOpacity, selectedTab === 'UserDataLifeTime' && styles.activeTouchableOpacity]}
                      onPress={() => setSelectedTab('UserDataLifeTime')}
                    >
                      <Text style={[styles.Text, selectedTab === 'UserDataLifeTime' && styles.activetab]}>LifeTime</Text>
                    </TouchableOpacity>
                  </View>
                  {renderContent()}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Data;

const styles = StyleSheet.create({
  PageContainer: { backgroundColor: "#fff", height: "100%" },
  Text:{textAlign:'center', alignSelf:'center'}, 
  activetab:{textAlign:"center", fontSize:14, alignSelf:"center", color:'#f01a05'},
  TouchableOpacity:{justifyContent:'center', alignItems:'center', flex:1, borderColor:"#e0e0e0",},
  activeTouchableOpacity:{justifyContent:'center', alignItems:'center',padding:5, flex:1, borderColor:"#f01a05", borderBottomWidth:2,},
  Headline:{fontSize:16, textAlign:'center', color:'black', fontWeight:'bold'}

});
