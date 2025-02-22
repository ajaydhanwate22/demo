import { StyleSheet, View, ScrollView, Pressable, TouchableOpacity, TextInput, Image, Alert, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HistryDay from './HistryDay';
import HistoryMonth from './HistoryMonth';
import HistoryYear from './HistoryYear';
import HistoryLifetime from './HistoryLifetime';

const History = ({ navigation}) => {

  const data = [{ id: 1, Kw: '3.44', percentage: '105' },{ id: 2, Kw: '2.58', percentage: '84' },{ id: 3, Kw: '1.72', percentage: '63' },{ id: 4, Kw: '0.86', percentage: '42' },{ id: 5, Kw: '00', percentage: '21' },{ id: 6, Kw: '-0.86', percentage: '00' },];

  const Hours = [{ id: 1, Hr: '00.00'},{ id: 2, Hr: '04.00'},{ id: 3, Hr: '08.00'},{ id: 4, Hr: '12.00'},{ id: 5, Hr: '16.00'},
    { id: 6, Hr: '20.00'},{ id: 7, Hr: '24.00'}];

    const [selectedTab, setSelectedTab] = useState('HistryDay');

    const renderContent = () => {
        switch (selectedTab) {
          case 'HistryDay':
            return <HistryDay />;
          case 'HistoryMonth':
            return <HistoryMonth />;
          case 'HistoryYear':
            return <HistoryYear />;
            case 'HistoryLifetime':
              return <HistoryLifetime />;
          default:
            return null;
        }
      };
  

  return (
    <SafeAreaView style={styles.PageContainer}>
      <ScrollView>
        <View style={{padding:10,backgroundColor:'#f5f5f5'}}>
                  <View style={{ justifyContent: 'space-around', flexDirection: 'row', marginTop:10, backgroundColor:'white', paddingHorizontal:10 }}>
                    <TouchableOpacity
                      style={[styles.TouchableOpacity, selectedTab === 'HistryDay' && styles.activeTouchableOpacity]}
                      onPress={() => setSelectedTab('HistryDay')}
                    >
                      <Text style={[styles.Text, selectedTab === 'HistryDay' && styles.activetab]}>Day</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.TouchableOpacity, selectedTab === 'HistoryMonth' && styles.activeTouchableOpacity]}
                      onPress={() => setSelectedTab('HistoryMonth')}
                    >
                      <Text style={[styles.Text, selectedTab === 'HistoryMonth' && styles.activetab]}>Month</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.TouchableOpacity, selectedTab === 'HistoryYear' && styles.activeTouchableOpacity]}
                      onPress={() => setSelectedTab('HistoryYear')}
                    >
                      <Text style={[styles.Text, selectedTab === 'HistoryYear' && styles.activetab]}>Year</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.TouchableOpacity, selectedTab === 'HistoryLifetime' && styles.activeTouchableOpacity]}
                      onPress={() => setSelectedTab('HistoryLifetime')}
                    >
                      <Text style={[styles.Text, selectedTab === 'HistoryLifetime' && styles.activetab]}>LifeTime</Text>
                    </TouchableOpacity>
                  </View>
                  {renderContent()}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default History;

const styles = StyleSheet.create({
  PageContainer: { backgroundColor: "#fff", height: "100%" },
  Text:{textAlign:'center', alignSelf:'center'}, 
  activetab:{textAlign:"center", fontSize:14, alignSelf:"center", color:'#f01a05'},
  TouchableOpacity:{justifyContent:'center', alignItems:'center', flex:1, borderColor:"#e0e0e0",},
  activeTouchableOpacity:{justifyContent:'center', alignItems:'center',padding:10, flex:1, borderColor:"#f01a05", borderBottomWidth:2,},
  Headline:{fontSize:16, textAlign:'center', color:'black', fontWeight:'bold'}

});
