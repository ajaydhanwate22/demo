import { StyleSheet, View, ScrollView, Pressable, TouchableOpacity, TextInput, Image, Alert, ActivityIndicator } from 'react-native';
import React, { useState , useEffect} from 'react';
import { Text } from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { SafeAreaView } from 'react-native-safe-area-context';
import DeviceData from './DeviceData';
import History from './History';
import Architecture from './Architecture';

const InverterMainPage = ({ navigation}) => {

    const [selectedTab, setSelectedTab] = useState('DeviceData');

    const renderContent = () => {
        switch (selectedTab) {
          case 'DeviceData':
            return <DeviceData />;
          case 'History':
            return <History />;
            case 'Architecture':
            return <Architecture />;
          default:
            return null;
        }
      };

        const [currentTime, setCurrentTime] = useState('');
    
        useEffect(() => {
        const date = new Date();
        const formattedTime = date.toISOString().slice(0, 19).replace('T', ' ');
        setCurrentTime(formattedTime);
        }, []);

  return (
            <SafeAreaView style={styles.PageContainer}>
            <ScrollView>    
                <View style={{padding:10,borderBottomWidth:0.3, borderColor:'lightgrey',paddingHorizontal:10, paddingTop:20}}>
                   <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                       <TouchableOpacity onPress={() => navigation.goBack()}>
                           <Text><AntDesign name='left' size={25} color='black' /></Text>
                       </TouchableOpacity>
                       <TouchableOpacity style={{justifyContent:'center', alignItems:'center'}}>
                           <Text style={{textAlign:'center', fontWeight:'bold'}}>Inverter</Text>
                       </TouchableOpacity>
                       <TouchableOpacity>
                           <Text><Entypo name='dots-three-horizontal' size={25} color='black' /></Text>
                       </TouchableOpacity>
                   </View>
               </View>  
                <View style={{paddingVertical:20,padding:10}}>
                    <View style={{flexDirection:'row', gap:20, alignItems:'center'}}>
                        {/* 1st */}
                        <View style={{padding:5, backgroundColor:'#f01a05', borderRadius:5}}>
                            <Text><AntDesign name='book' size={25} color='white' /></Text>
                        </View>
                        
                        <View style={{gap:5}}>
                            <Text>SN: 2409890878</Text>
                            <Text>Last Update {currentTime} </Text>
                        </View>
                    </View>
                </View>
            <View style={{flexDirection:'row', gap:20,paddingHorizontal:10,}}>
                <TouchableOpacity style={[styles.TouchableOpacity, selectedTab === 'DeviceData' && styles.activeTouchableOpacity]} onPress={() => setSelectedTab('DeviceData')}>
                <Text style={[styles.Text, selectedTab === 'DeviceData' && styles.activetab]}>Device Data</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.TouchableOpacity, selectedTab === 'History' && styles.activeTouchableOpacity]} onPress={() => setSelectedTab('History')}>
                <Text style={[styles.Text, selectedTab === 'History' && styles.activetab]}>History</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.TouchableOpacity, selectedTab === 'Architecture' && styles.activeTouchableOpacity]} onPress={() => setSelectedTab('Architecture')}>
                <Text style={[styles.Text, selectedTab === 'Architecture' && styles.activetab]}>Architecture</Text>
                </TouchableOpacity>
            </View>
            {renderContent()}                 
                </ScrollView>
            </SafeAreaView>
  );
};

export default InverterMainPage;

const styles = StyleSheet.create({
    PageContainer: { backgroundColor: "white"},
    Text:{textAlign:'center', alignSelf:'center'}, 
    activetab:{textAlign:"center",alignSelf:"center", color:'#f01a05'},
    TouchableOpacity:{paddingVertical:10, paddingTop:5},
    activeTouchableOpacity:{borderBottomWidth:1, borderColor:'#f01a05',paddingVertical:10,paddingTop:5},
});
