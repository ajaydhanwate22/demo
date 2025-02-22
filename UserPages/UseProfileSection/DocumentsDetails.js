import { StyleSheet, View, Pressable, ScrollView, TouchableOpacity, Image, Modal, TextInput,SafeAreaView, Text,FlatList  } from 'react-native'
import React, {useState} from 'react'
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import { Picker } from '@react-native-picker/picker';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';


const DocumentsDetails = () => {

    const navigation = useNavigation();

      const [AddharCard, SetAddharCard] = useState('');
      const [Name, Setname] = useState('');
      const [imageUri, setImageUri] = React.useState(null);
      
        const selectImage = () => {
          launchImageLibrary({ mediaType: 'photo' }, (response) => {
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.error('ImagePicker Error: ', response.error);
            } else {
              console.log(response.assets[0].uri);
              setImageUri(response.assets[0].uri); // Set the image URI to state
            }
          });
        };
      
        const handleUpdate = () => {
          if (AddharCard && imageUri)  {  
            SetAddharCard('');
            setImageUri('');
          } else {
            alert('Please fill in all the fields.');
          }
        };
  
  return (
    <SafeAreaView style={styles.PageContainer}>
         <ScrollView>
                 <Pressable style={{ width: "100%", height: "100%", backgroundColor: "#fff" }}>
                        <Pressable style={{justifyContent:"space-between",flexDirection:'row', padding:20,}}>
                        <TouchableOpacity  onPress={() => navigation.goBack()}  style={{ alignItems: "center" }}>
                                      <Text style={{ fontSize: 26, color: "#000", fontWeight: "400" }}>X</Text>
                        </TouchableOpacity>
                        <Image source={{ uri: 'https://realrate.store/AkshayUrjaSolar/Images/akshyurjalogo.jpeg' }} 
                                style={{ width: 130,  height:50,justifyContent:"center" }}
                                resizeMode="contain"
                              />
                          </Pressable>

                          <View style={{padding:20}}>
                                    <Text style={{ fontSize: 19, color: "#f01a05", fontWeight: "bold",  }}>Documents Details:</Text>
                            </View>

                           <View style={{paddingHorizontal:20}}>
                                <View style={{borderBottomWidth:0.3, borderColor:"grey", paddingVertical:10,width:"100%", flexDirection:'row'}}>
                                        <View style={{width:"45%", height:100,backgroundColor:"grey",justifyContent:"center", alignItems:"center"}}>
                                            <Text style={{color:'black'}}>image</Text>
                                        </View>
                                        <View style={{width:"45%", alignItems:"center", justifyContent:"center"}}>
                                            <Text style={{color:'black'}}>Pan Card</Text>
                                        </View>
                                        <View style={{width:"10%", alignItems:"center", justifyContent:"center"}}>
                                            <Text><FontAwesome5 name='edit' size={20} color='black' /></Text>
                                        </View>                                
                                </View>

                                <View style={{borderBottomWidth:0.3, borderColor:"grey", paddingVertical:10,width:"100%", flexDirection:'row'}}>
                                        <View style={{width:"45%", height:100,justifyContent:"center", alignItems:"center", backgroundColor:"grey"}}>
                                            <Text style={{color:'black'}}>image</Text>
                                        </View>
                                        <View style={{width:"45%", alignItems:"center", justifyContent:"center"}}>
                                            <Text style={{color:'black'}}>Addhar Card</Text>
                                        </View>
                                        <View style={{width:"10%", alignItems:"center", justifyContent:"center"}}>
                                            <Text><FontAwesome5 name='edit' size={20} color='black' /></Text>
                                        </View>                                
                                </View>
                            </View> 
        
                     </Pressable>
                </ScrollView>
            </SafeAreaView>
  )
}

export default DocumentsDetails
const styles = StyleSheet.create({
  PageContainer: { backgroundColor: "#fff", height: "100%" },
  Input: { backgroundColor: "#fff", borderWidth: 1, width: "100%", borderRadius: 5, marginTop: 5, marginBottom: 5, paddingLeft: 15 },
  btn: { width: "100%", height: "100%", backgroundColor: "#f2be25", borderWidth: 1, borderColor: "#000", borderRadius: 6, justifyContent: "center", alignItems: "center" }
})