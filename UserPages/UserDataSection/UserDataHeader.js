import { StyleSheet, View, ScrollView, Pressable, TouchableOpacity, TextInput, Image, Alert, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { Text } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';

const UserDataHeader = ({ navigation}) => {

  return (
        <View style={{padding:10,borderBottomWidth:0.3, borderColor:'lightgrey',paddingHorizontal:10, paddingTop:20}}>
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <TouchableOpacity>
                    <Text><AntDesign name='left' size={25} color='black' /></Text>
                </TouchableOpacity>
                <TouchableOpacity style={{justifyContent:'center', alignItems:'center'}}>
                    <Text style={{textAlign:'center', fontWeight:'bold'}}>SandeepKumar</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text><Feather name='menu' size={25} color='black' /></Text>
                </TouchableOpacity>
            </View>
        </View>
  );
};

export default UserDataHeader;

const styles = StyleSheet.create({

});
