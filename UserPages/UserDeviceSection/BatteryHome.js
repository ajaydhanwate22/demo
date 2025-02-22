import { StyleSheet, View, ScrollView, Pressable, TouchableOpacity, TextInput, Image, Alert, ActivityIndicator } from 'react-native';
import React, { useState , useEffect} from 'react';
import { Text } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';


const BatteryHome = () => {

    const navigation = useNavigation(); 
    

    const [currentTime, setCurrentTime] = useState('');

        useEffect(() => {
          const date = new Date();
          const formattedTime = date.toISOString().slice(0, 19).replace('T', ' ');
          setCurrentTime(formattedTime);
        }, []);
      
  return (
            <SafeAreaView style={styles.PageContainer}>
                <ScrollView>
                    <View style={{paddingVertical:10}}>
                        <Text>Battery Quantity: 1</Text>
                    </View>
                    <TouchableOpacity style={{paddingVertical:20, paddingHorizontal:10, backgroundColor:'white', borderBottomWidth:0.3,borderColor:'lightgrey'  }} onPress={() => navigation.navigate('BatteryMainPage')} >
                        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                             <View style={{flexDirection:"row",justifyContent:'center', alignItems:'center',gap:5}}>
                                <Text><Entypo name='circle-with-minus' size={18} color='#f01a05' /></Text>
                                <Text style={{textAlign:'center'}}>Battery</Text>
                            </View>
                            <View style={{flexDirection:"row",justifyContent:'center', alignItems:'center',gap:5}}>
                                <Text style={{textAlign:'center'}}>2406281016</Text>
                                <Text><MaterialCommunityIcons name='file-multiple-outline' size={15} color='black' /></Text>
                            </View>
                        </View>
                        <View style={{paddingVertical:20}}>
                            <Text>{currentTime}</Text>
                        </View>
                    </TouchableOpacity>

                    <View style={{justifyContent:'center', alignItems:'center',marginTop:30}}>
                    <Text style={{fontSize:14}}>All loaded</Text> 

                    </View>
                </ScrollView>
            </SafeAreaView>
  );
};

export default BatteryHome;

const styles = StyleSheet.create({
    PageContainer: { backgroundColor: "#f5f5f5", height: 900, padding:10},


});
