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
import OverViewDay from './OverViewDay';
import OverViewMonth from './OverViewMonth';
import OverViewYear from './OverViewYear';
import OverViewLifetime from './OverViewLifetime';


const OverviewMain = ({ navigation}) => {

    const [selectedTab, setSelectedTab] = useState('OverViewDay');

    const renderContent = () => {
        switch (selectedTab) {
          case 'OverViewDay':
            return <OverViewDay />;
          case 'OverViewMonth':
            return <OverViewMonth />;
          case 'OverViewYear':
            return <OverViewYear />;
          case 'OverViewLifetime':
            return <OverViewLifetime />;
          default:
            return null;
        }
      };

  return (
    <>
    <View style={{padding:10,backgroundColor:'#f5f5f5'}}>
        <View style={{padding:15, borderRadius:10, backgroundColor:'white'}}>
        {/* Tab Navigation */}
        <View style={{ borderRadius: 10, justifyContent: 'space-between', flexDirection: 'row', backgroundColor: "#f5f5f5", elevation: 3 }}>
          <TouchableOpacity
            style={[styles.TouchableOpacity, selectedTab === 'OverViewDay' && styles.activeTouchableOpacity]}
            onPress={() => setSelectedTab('OverViewDay')}
          >
            <Text style={[styles.Text, selectedTab === 'OverViewDay' && styles.activetab]}>Day</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.TouchableOpacity, selectedTab === 'OverViewMonth' && styles.activeTouchableOpacity]}
            onPress={() => setSelectedTab('OverViewMonth')}>
            <Text style={[styles.Text, selectedTab === 'OverViewMonth' && styles.activetab]}>Month</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.TouchableOpacity, selectedTab === 'OverViewYear' && styles.activeTouchableOpacity]}
            onPress={() => setSelectedTab('OverViewYear')}
          >
            <Text style={[styles.Text, selectedTab === 'OverViewYear' && styles.activetab]}>Year</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.TouchableOpacity, selectedTab === 'OverViewLifetime' && styles.activeTouchableOpacity]}
            onPress={() => setSelectedTab('OverViewLifetime')}
          >
            <Text style={[styles.Text, selectedTab === 'OverViewLifetime' && styles.activetab]}>Lifetime</Text>
          </TouchableOpacity>
        </View>

        {renderContent()}
        </View>
    </View>
    </>
  );
};

export default OverviewMain;

const styles = StyleSheet.create({
    Text:{textAlign:'center', alignSelf:'center'}, 
    activetab:{textAlign:"center", fontWeight:"bold", fontSize:17, alignSelf:"center"},
    TouchableOpacity:{justifyContent:'center', alignItems:'center',padding:8, flex:1, borderRightWidth:0.3, borderColor:"#e0e0e0",},
    activeTouchableOpacity:{justifyContent:'center', alignItems:'center',padding:8, flex:1, borderRightWidth:0.3, borderColor:"#e0e0e0",backgroundColor:"white"},
    Headline:{fontSize:16, textAlign:'center', color:'black', fontWeight:'bold'}
});
