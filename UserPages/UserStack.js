import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserSignIn from './UserSignIn';
import UserSignUp from './UserSignUp';
import UserHome from './UserHomeSection/UserHome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Octicons from 'react-native-vector-icons/Octicons'; 
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; 
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; 
import OverView from './UserHomeSection/UserHome';
import Data from './UserDataSection/UserData';
import Device from './UserDeviceSection/UserDevice';
import Visit from './UserVisitSection/UserVisit';
import Profile from './UseProfileSection/UserProfile';
import UserProfileUpdate from './UseProfileSection/UserProfileUpdate';
import UserUploadDocument from './UseProfileSection/UserUploadDocument';
import InverterHome from './UserDeviceSection/InverterHome';
import InverterMainPage from './UserDeviceSection/InverterMainPages/InverterMainPage';
import LoggerHome from './UserDeviceSection/LoggerHome';
import LoggerMainPage from './UserDeviceSection/LoggerMainPages/LoggerMainPage';
import BatteryHome from './UserDeviceSection/BatteryHome';
import BatteryMainPage from './UserDeviceSection/BatteryMainPages/BatteryMainPage';
import Visiteddata from './UserVisitSection/Visiteddata';
import AllNotifications from './UseProfileSection/AllNotifications';
import HelpandSupport from './UseProfileSection/HelpandSupport';
import FAQs from './UseProfileSection/FAQs';
import TermsAndCondition from './TermsAndCondition';
import PrivancyPolicy from './PrivancyPolicy';
import Aboutus from './Aboutus';
import DocumentsDetails from './UseProfileSection/DocumentsDetails';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function UserStack() {


  function TabUser() {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let IconComponent;
            // Assign icon and component based on route name
            if (route.name === 'OverView') {
              iconName = 'solution1';
              IconComponent = AntDesign;
            } else if (route.name === 'Data') {
              iconName = 'database-eye';
              IconComponent = MaterialCommunityIcons;
            } else if (route.name === 'Device') {
              iconName = 'device-mobile';
              IconComponent = Octicons;
            } else if (route.name === 'Visit') {
              iconName = 'add-location-alt'; 
              IconComponent = MaterialIcons;
            } else if (route.name === 'Profile') {
              iconName = 'user';
              IconComponent = FontAwesome;
            }
  
            // Render the assigned icon
            return <IconComponent name={iconName} size={30} color={color} />;
          },
          tabBarActiveTintColor: '#f2be25',
          tabBarInactiveTintColor: '#2b2b2b',
          headerShown: false, // Hide header
          tabBarStyle: {backgroundColor: '#fff',height: 80,paddingBottom: 20,paddingTop:15,justifyContent: 'center',alignItems: 'center',},
          tabBarIconStyle: {width: '100%', height: '100%',justifyContent: 'center',alignItems: 'center',},
        })} >
        <Tab.Screen name="OverView" component={OverView} />
        <Tab.Screen name="Data" component={Data} />
        <Tab.Screen name="Device" component={Device} />
        <Tab.Screen name="Visit" component={Visit} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    );
  }

    return (
      <Stack.Navigator>
        <Stack.Screen name="UserSignIn" component={UserSignIn} options={{ headerShown: false }} />
        <Stack.Screen name="UserSignUp" component={UserSignUp} options={{ headerShown: false }} />
        <Stack.Screen name="TabUser" component={TabUser} options={{ headerShown: false }} />
        <Stack.Screen name="UserProfileUpdate" component={UserProfileUpdate} options={{ headerShown: false }} />
        <Stack.Screen name="UserUploadDocument" component={UserUploadDocument} options={{ headerShown: false }} />
        <Stack.Screen name="InverterHome" component={InverterHome} options={{ headerShown: false }} />
        <Stack.Screen name="InverterMainPage" component={InverterMainPage} options={{ headerShown: false }} />
        <Stack.Screen name="LoggerMainPage" component={LoggerMainPage} options={{ headerShown: false }} />
        <Stack.Screen name="LoggerHome" component={LoggerHome} options={{ headerShown: false }} />
        <Stack.Screen name="BatteryHome" component={BatteryHome} options={{ headerShown: false }} />
        <Stack.Screen name="BatteryMainPage" component={BatteryMainPage} options={{ headerShown: false }} />
        <Stack.Screen name="Visiteddata" component={Visiteddata} options={{ headerShown: false }} />
        <Stack.Screen name="AllNotifications" component={AllNotifications} options={{ headerShown: false }} />
        <Stack.Screen name="HelpandSupport" component={HelpandSupport} options={{ headerShown: false }} />
        <Stack.Screen name="FAQs" component={FAQs} options={{ headerShown: false }} />
        <Stack.Screen name="TermsAndCondition" component={TermsAndCondition} options={{ headerShown: false }} />
        <Stack.Screen name="PrivancyPolicy" component={PrivancyPolicy} options={{ headerShown: false }} />
        <Stack.Screen name="Aboutus" component={Aboutus} options={{ headerShown: false }} />
        <Stack.Screen name="DocumentsDetails" component={DocumentsDetails} options={{ headerShown: false }} />
      </Stack.Navigator>
    );
  }
  
  export default UserStack;