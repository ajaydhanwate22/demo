import { StyleSheet, View, ScrollView, Pressable, TouchableOpacity, TextInput, Image, Alert, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'react-native-paper';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Footer = ({ navigation}) => {

  return (
        <View style={{padding:10, borderTopWidth:0.3, borderColor:'lightgrey', paddingTop:15, paddingHorizontal:20}}>
            <View style={{flexDirection:'row', justifyContent:"space-between"}}>
              <View style={{justifyContent:'center', alignItems:"center"}}>
                   <TouchableOpacity>
                       <Text><AntDesign name='solution1' size={30} color='#2b2b2b'/></Text>
                    </TouchableOpacity>
                <Text style={styles.Text} >Overview</Text>
              </View>
              <View style={{justifyContent:'center', alignItems:"center"}}>
                    <TouchableOpacity>
                       <Text><MaterialCommunityIcons name='database-eye' size={30} color='#2b2b2b'/></Text>
                    </TouchableOpacity>
                <Text style={styles.Text} >Data</Text>
              </View>
              <View style={{justifyContent:'center', alignItems:"center"}}>
                    <TouchableOpacity>
                       <Text><Octicons name='device-mobile' size={30} color='#2b2b2b'/></Text>
                    </TouchableOpacity>
                <Text style={styles.Text} >Device</Text>
              </View>
              <View style={{justifyContent:'center', alignItems:"center"}}>
                    <TouchableOpacity>
                       <Text><MaterialIcons name='add-location-alt' size={30} color='#2b2b2b' /></Text>
                    </TouchableOpacity>
                <Text style={styles.Text} >Visit</Text>
              </View>
              <View style={{ justifyContent:'center', alignItems:"center"}}>
                    <TouchableOpacity>
                       <Text><FontAwesome name='user' size={30} color='#2b2b2b'/></Text>
                    </TouchableOpacity>
                <Text style={styles.Text} >Mr. Meheta</Text>
              </View>
            </View>
        </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  Text:{color:'#2b2b2b', fontSize:11}

});
