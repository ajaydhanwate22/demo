import { StyleSheet, View, ScrollView, Pressable, TouchableOpacity, TextInput, Image, Alert, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { Text } from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

const Header = () => {

      const navigation = useNavigation();
    
      const [isMenuVisible, setIsMenuVisible] = useState(false);
  
      const toggleMenu = () => {
          setIsMenuVisible(!isMenuVisible);
      };
  return (
            <>
                <View style={{padding:10,borderBottomWidth:0.3, borderColor:'lightgrey',paddingRight:20}}>
                    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                        <Image source={{ uri: 'https://realrate.store/AkshayUrjaSolar/Images/akshyurjalogo.jpeg' }}style={{ width: 130,  height:40,justifyContent:"center" }} resizeMode="center"/>
                        <View style={{flexDirection:"row", gap:20, justifyContent:'center',alignItems:"center"}}>
                        <TouchableOpacity>
                            <Text><FontAwesome5 name='bell' size={30} color='black' /></Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={toggleMenu} >
                            <Text><Feather name='menu' size={30} color='black' /></Text>
                        </TouchableOpacity>
                        </View>
                    </View>
                </View>

 
                     {isMenuVisible && (
                     <View style={{ position: 'absolute', top: 60,  right: 0, backgroundColor: 'white',borderWidth: 1,borderColor: '#d3d3d3',
                         borderRadius: 5,padding: 10,width: '45%',shadowColor: '#000',shadowOffset: { width: 0, height: 2 },shadowOpacity: 0.25,shadowRadius: 3.5,
                         elevation: 5,marginRight:10,zIndex: 999}}>
                         <TouchableOpacity onPress={() => navigation.navigate('Aboutus')}  style={{ marginBottom: 5 }}>
                         <Text style={{ paddingVertical: 4, color: 'black', borderBottomWidth:0.3, borderColor:"#d3d3d3" }}>About Us</Text>
                         </TouchableOpacity>
                         <TouchableOpacity onPress={() => navigation.navigate('TermsAndCondition')}  style={{ marginBottom: 5 }}>
                         <Text style={{ paddingVertical: 4, color: 'black', borderBottomWidth:0.3, borderColor:"#d3d3d3" }}>Terms & Condition</Text>
                         </TouchableOpacity>
                         <TouchableOpacity onPress={() => navigation.navigate('PrivancyPolicy')}  style={{ marginBottom: 0 }}>
                         <Text style={{ paddingVertical: 2, color: 'black' }}>Privancy policy</Text>
                         </TouchableOpacity>
                     </View>
                     )}     
            </>
  );
};

export default Header;

const styles = StyleSheet.create({


});
