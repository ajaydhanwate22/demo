import { StyleSheet, View, ScrollView, Pressable, TouchableOpacity, TextInput, Image, Alert, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../Header';
import OverviewMain from './OverviewMain';
import Svg, { Path } from 'react-native-svg';

const OverView = ({ navigation}) => {

          const [currentTime, setCurrentTime] = useState('');
      
          useEffect(() => {
            // This will run only once when the component mounts
            const date = new Date();
            const formattedTime = date.toISOString().slice(0, 19).replace('T', ' ');
            setCurrentTime(formattedTime);
          }, []);  // Empty dependency array means this effect runs only once when the component is mounted
        
        

  return (
    <SafeAreaView style={styles.PageContainer}>
      <Header/>
      <ScrollView>
        <View style={{ flex: 1,}}>
        <Image source={require('../../assets/akshyurjaimage.jpeg')}  style={{width: '100%', height:200}}/>
        </View>
        <View style={{padding:10,backgroundColor:'#f5f5f5', paddingTop:20}}>

          {/* heading and location section */}
          <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <View style={{gap:5}}>
            <Text style={{fontWeight:'bold', fontSize:16}}>Prodcution Today</Text>
            <View style={{}}>
            <Text style={{fontSize:24, fontWeight:'bold',}}>0.00 <Text style={{fontSize:14,fontWeight:'bold'}}>kwh</Text> </Text>
            </View>
            </View>
            <TouchableOpacity style={{gap:5}}>
            <Text style={{fontWeight:'bold', fontSize:16}}>Weather</Text>
              <View style={{flexDirection:'row',gap:5,alignItems: 'center',justifyContent:"center"}}>
                <Ionicons name="sunny-outline" size={25} color="black" />
                <Text style={{fontSize:24, fontWeight:'bold'}}>30°<Text style={{fontSize:14,fontWeight:'bold'}}>C</Text></Text>
               </View>
            </TouchableOpacity>
            <View>
            </View>
          </View>

          {/* location and time */}

          <View style={{marginVertical:20}}>
            <View style={{flexDirection:'row', gap:5,alignItems:'center'}}>
            <Entypo name="location-pin" size={15} color="black" />
            <Text style={{fontSize:12}}>sangmner, maharashtra,india</Text>
            </View>

            <View style={{flexDirection:'row', gap:7, alignItems:'center',marginTop:5}}>
            <Ionicons name="time-outline" size={13} color="black" />
            <Text style={{fontSize:10}}>{currentTime}</Text>
            </View>
          </View>

          {/* power flow  */}
          <View style={{marginTop:10}}>
              <View style={{justifyContent:'space-between', flexDirection:'row'}}>
                  <Text style={{fontSize:16, fontWeight:'bold'}}>Power Flow</Text>
                  <TouchableOpacity>
                    <View style={{flexDirection:'row',gap:5,alignItems: 'center'}}>
                    <Text style={{fontSize:14}}>Plant data</Text>
                    <EvilIcons name="chevron-down" size={20} color="black" />
                    </View>
                  </TouchableOpacity>
              </View>
              
              <View style={{marginTop:30, gap:60}}>

                    <View style={{ position: 'absolute', width: '70%', height: '80%',flexDirection: 'row', flexWrap: 'wrap',left:'15%',top:"20%"}}>
                      <View style={{width: '50%',  height: '37%',borderLeftWidth:1,borderBottomWidth:1, borderColor:'black',borderBottomLeftRadius:20,}}/>
                      <View style={{width: '50%',  height: '37%',borderLeftWidth:1,borderTopWidth:1, borderColor:'black',borderTopLeftRadius:20,}}/>
                      <View style={{width: '50%',  height: '40%',borderRightWidth:1,borderBottomWidth:1, borderColor:'black',borderBottomRightRadius:20,}}/>
                      <View style={{width: '50%',  height: '40%',borderTopWidth:1,borderRightWidth:1, borderColor:'black',borderTopRightRadius:20,}}/>
                  </View>

            
                  <View style={{flexDirection:"row", justifyContent:'space-between', paddingHorizontal:30,}}>
                    <View style={{gap:10, justifyContent:'center', alignItems:'center'}}>
                    <View style={{justifyContent:'center', alignItems:'center'}}>
                      <Text style={{fontSize:14, fontWeight:'bold',textAlign:'center'}}>0.00 <Text style={{fontSize:10,fontWeight:'bold',textAlign:'center'}}>w</Text> </Text>
                      <Text style={{textAlign:'center', fontSize:12}}>Prodcution</Text>
                      </View>
                      <View style={{padding:15, backgroundColor:'white',borderRadius:10, elevation:10}}>
                          <FontAwesome5 name="solar-panel" size={25} color="black" />
                      </View>
                    </View>


                    <View style={{gap:10, justifyContent:'center', alignItems:'center'}}>
                    <View style={{justifyContent:'center', alignItems:'center'}}>
                      <Text style={{fontSize:14, fontWeight:'bold',textAlign:'center'}}>0.00 <Text style={{fontSize:10,fontWeight:'bold',textAlign:'center'}}>w</Text> </Text>
                      <Text style={{textAlign:'center', fontSize:12}}>Grid</Text>
                      </View>
                      <View style={{padding:15, backgroundColor:'white',borderRadius:10, elevation:10}}>
                          <Ionicons name="accessibility-sharp" size={25} color="black" />
                      </View>
                    </View>
                  </View>


                  <View style={{flexDirection:"row", justifyContent:'center',}}>
                      <View style={{padding:10, backgroundColor:'white',borderRadius:10, elevation:10, borderColor:'#f01a05', borderWidth:1,alignItems: 'center', }}>
                          <SimpleLineIcons name="grid" size={25} color="black" />
                          <Text style={{ marginTop: 5, fontSize: 8, color: 'black' }}>Panel Board</Text>
                      </View>
                  </View>
                  


                  <View style={{flexDirection:"row", justifyContent:'space-between', paddingHorizontal:30}}>
                    <View style={{gap:10, justifyContent:'center', alignItems:'center'}}>
                      <View style={{padding:15, backgroundColor:'white',borderRadius:10, elevation:10}}>
                          <FontAwesome name="battery" size={25} color="black" />
                      </View>
                      <View style={{justifyContent:'center', alignItems:'center'}}>
                      <Text style={{fontSize:14, fontWeight:'bold',textAlign:'center'}}>207.00 <Text style={{fontSize:10,fontWeight:'bold', textAlign:'center'}}>w</Text> </Text>
                      <Text style={{textAlign:'center', fontSize:12}}>Generator</Text>
                      </View>
                    </View>

                    <View style={{gap:10, justifyContent:'center', alignItems:'center'}}>
                      <View style={{padding:15, backgroundColor:'white',borderRadius:10, elevation:10}}>
                          <Ionicons name="home" size={25} color="black" />   
                      </View>
                      <View style={{justifyContent:'center', alignItems:'center'}}>
                      <Text style={{fontSize:14, fontWeight:'bold',textAlign:'center'}}>0.00 <Text style={{fontSize:10,fontWeight:'bold', textAlign:'center'}}>w</Text> </Text>
                      <Text style={{textAlign:'center', fontSize:12}}>Load</Text>
                      </View>
                    </View>
                  </View>
              </View>
          </View>
        </View>
        <OverviewMain/>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OverView;

const styles = StyleSheet.create({
  PageContainer: { backgroundColor: "#fff", height: "100%" },

});
