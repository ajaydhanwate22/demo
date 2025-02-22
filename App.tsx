/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React  , {useState,useEffect} from 'react';
import type {PropsWithChildren} from 'react';
import {  SafeAreaView,  ScrollView,  StatusBar,  StyleSheet,Text, useColorScheme,  View,Image} from 'react-native';
import {  Colors,  DebugInstructions,  Header,  LearnMoreLinks,  ReloadInstructions,} from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import {  } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'; 
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'; 
// import {Platform} from 'react-native';



// import all pages 
import Signin from './screens/Signin';
import Signup from './screens/Signup';
import ForgotPassword from './screens/ForgotPassword';
import Sale from './screens/Sale';
import Purchase from './screens/Purchase';
import Payment from './screens/Payment';
import Stock from './screens/Stock';
import LocationHistory from './screens/LocationHistory';
import CustomerPage from './screens/CustomerPage';
import SplashScreen from './screens/SplashScreen';
import EmployeeLedger from './screens/EmployeeLedger';
import EmployeeList from './screens/EmployeeList';
import DailyTaskSelf from './screens/DailyTaskSelf';
import CustomerList from './screens/CustomerList';
import EmployeeBorrowList from './screens/EmployeeBorrowList';
import EmployeesPayLedger from './screens/EmployeesPayLedger';
import VehicleStatus from './screens/VehicleStatus';
import HomeHeader from './components/HomeHeader';
import VehicleList from './screens/VehicleList';
import RequiredMaterial from './screens/UsedMaterialSection/RequiredMaterial';
import ApproveMaterial from './screens/UsedMaterialSection/ApproveMaterial';
import UsedCheck from './screens/UsedMaterialSection/UsedCheck';
import ReturnMaterial from './screens/UsedMaterialSection/ReturnMaterial';
import ActualUsed from './screens/UsedMaterialSection/ActualUsed';
import TeaCoffeeBill from './screens/UsedMaterialSection/TeaCoffeeBill';
import ApproveTeaCoffeBill from './screens/UsedMaterialSection/ApproveTeaCoffeBill';
import MonthlyBillUpdate from './screens/QuotationSection/MonthlyBillUpdate';
import MSEB3phaseConnection from './screens/QuotationSection/MSEB3phaseConnection';
import PurchaseMaterial from './screens/UsedMaterialSection/PurchaseMaterial';
import UsedMaterialHome from './screens/UsedMaterialSection/UsedMaterialHome';
import QuotationHome from './screens/QuotationSection/QuotationHome';
import BillHome from './screens/BillSection/BillHome';
import LedgerHome from './screens/LedgerSection/LedgerHome';
import VisitHome from './screens/VisitSection/VisitHome';
import GeneralDeatilled from './screens/QuotationSection/GeneralDeatilled';
import QuotationGSTupdate from './screens/QuotationSection/QuotationGSTupdate';
import DetailedInfoAbout from './screens/QuotationSection/DetailedInfoAbout';
import AboutSolarPlant from './screens/QuotationSection/AboutSolarPlant';
import Quotationpaymentloan from './screens/QuotationSection/Quotationpaymentloan';
import ReceivedUdhariPayment from './screens/PaymentSection/ReceivedUdhariPayment';
import PurchasePayPayment from './screens/PaymentSection/PurchasePayPayment';
import Purchasedbill from './screens/PurchasedSection/Purchasedbill';
import SupplierUpdate from './screens/PurchasedSection/SupplierUpdate';
import ProfileUpdate from './screens/profileScreensection/ProfileUpdate';
import Requestforadvanced from './screens/profileScreensection/Requestforadvanced';
import AdvancedForm from './screens/profileScreensection/AdvancedForm';
import LocationReport from './screens/profileScreensection/LocationReport';
import CheckAttendence from './screens/profileScreensection/CheckAttendence';
import Quotation1 from './screens/BillSection/Quotation1';
import UserStack from './UserPages/UserStack';
import InverterForm from './screens/reusablescreens/InverterForm';
import BatteryForm from './screens/reusablescreens/BatteryForm';
import LoggerForm from './screens/reusablescreens/LoggerForm';



const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


// Stack Navigator for Stock-related screens
// function StockStackNavigator() {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name="Stock" component={Stock} options={{ headerShown: false }} />
//       <Stack.Screen name="StockProductDetails" component={StockProductDetails} options={{ headerShown: false }} />
//     </Stack.Navigator>
//   );
// }




function TabEmployeeNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let IconComponent;
          // Assign icon and component based on route name
          if (route.name === 'Home') {
            iconName = 'home';
            IconComponent = AntDesign;
          } else if (route.name === 'Purchase') {
            iconName = 'cart-plus';
            IconComponent = FontAwesome;
          } else if (route.name === 'Payment') {
            iconName = 'file-invoice-dollar';
            IconComponent = FontAwesome6;
          } else if (route.name === 'Stock') {
            iconName = 'social-dropbox'; // Example FontAwesome6 icon
            IconComponent = SimpleLineIcons;
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
        tabBarStyle: {
          backgroundColor: '#fff', // Background color for the tab bar
          height: 80,               // Height of the tab bar
          paddingBottom: 20,         // Padding at the bottom for better spacing
          paddingTop:15
          
        },
        tabBarIconStyle: {
          size: 35,                  // Increase the size of the icons
        },
      })} >
      <Tab.Screen name="Home" component={Sale} />
      <Tab.Screen name="Purchase" component={Purchase} />
      <Tab.Screen name="Payment" component={Payment} />
      <Tab.Screen name="Stock" component={Stock} />
      <Tab.Screen name="Profile" component={LocationHistory} />
      {/* <Tab.Screen name="Stock" component={StockStackNavigator} />Nesting the stack here */}
    </Tab.Navigator>
  );
}

function TabCustomerNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let IconComponent;
          // Assign icon and component based on route name
          if (route.name === 'Sale') {
            iconName = 'solution1';
            IconComponent = AntDesign;
          } else if (route.name === 'Stock') {
            iconName = 'social-dropbox'; // Example FontAwesome6 icon
            IconComponent = SimpleLineIcons;
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
        tabBarStyle: {
          backgroundColor: '#fff', // Background color for the tab bar
          height: 80,               // Height of the tab bar
          paddingBottom: 20,         // Padding at the bottom for better spacing
          paddingTop:15
          
        },
        tabBarIconStyle: {
          size: 35,                  // Increase the size of the icons
        },
      })}
    >
      <Tab.Screen name="Sale" component={Sale} />
      <Tab.Screen name="Stock" component={Stock} />
      <Tab.Screen name="Profile" component={LocationHistory} />
      {/* <Tab.Screen name="Stock" component={StockStackNavigator} />Nesting the stack here */}
    </Tab.Navigator>
  );
}



function App(): React.JSX.Element {
  // const isDarkMode = useColorScheme() === 'dark';

  // const backgroundStyle = {
  //   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  // };

  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="UserStack" component={UserStack}  options={{ headerShown: false }}/>  
      <Stack.Screen name="SplashScreen" component={SplashScreen}  options={{ headerShown: false }}/> 
      <Stack.Screen name="Main" component={TabEmployeeNavigator} options={{ headerShown: false }}/>
      <Stack.Screen name="CustTab" component={TabCustomerNavigator} options={{ headerShown: false }}/>
      <Stack.Screen name="EmployeeList" component={EmployeeList}  options={{ headerShown: false }}/>
      <Stack.Screen name="Signin" component={Signin}  options={{ headerShown: false }}/> 
      <Stack.Screen name="ForgotPassword" component={ForgotPassword}  options={{ headerShown: false }}/>
      <Stack.Screen name="Signup" component={Signup}  options={{ headerShown: false }}/>
      <Stack.Screen name="EmployeeLedger" component={EmployeeLedger}  options={{ headerShown: false }}/>
      <Stack.Screen name="DailyTaskSelf" component={DailyTaskSelf}  options={{ headerShown: false }}/>
      <Stack.Screen name="CustomerList" component={CustomerList}  options={{ headerShown: false }}/>
      <Stack.Screen name="EmployeeBorrowList" component={EmployeeBorrowList}  options={{ headerShown: false }}/>
      <Stack.Screen name="VehicleStatus" component={VehicleStatus}  options={{ headerShown: false }}/>
      <Stack.Screen name="EmployeesPayLedger" component={EmployeesPayLedger}  options={{ headerShown: false }}/>
      <Stack.Screen name="HomeHeader" component={HomeHeader}  options={{ headerShown: false }}/>
      <Stack.Screen name="VehicleList" component={VehicleList}  options={{ headerShown: false }}/>

      {/* all section screen */}
      <Stack.Screen name="CustomerPage" component={CustomerPage}  options={{ headerShown: false }}/>
      <Stack.Screen name="InverterForm" component={InverterForm}  options={{ headerShown: false }}/>
      <Stack.Screen name="LoggerForm" component={LoggerForm}  options={{ headerShown: false }}/>
      <Stack.Screen name="BatteryForm" component={BatteryForm}  options={{ headerShown: false }}/>


      {/* Used-Material Section screens */}
      <Stack.Screen name="UsedMaterialHome" component={UsedMaterialHome}  options={{ headerShown: false }}/>
      <Stack.Screen name="RequiredMaterial" component={RequiredMaterial}  options={{ headerShown: false }}/>
      <Stack.Screen name="ApproveMaterial" component={ApproveMaterial}  options={{ headerShown: false }}/>
      <Stack.Screen name="PurchaseMaterial" component={PurchaseMaterial}  options={{ headerShown: false }}/>
      <Stack.Screen name="UsedCheck" component={UsedCheck}  options={{ headerShown: false }}/>
      <Stack.Screen name="ReturnMaterial" component={ReturnMaterial}  options={{ headerShown: false }}/>
      <Stack.Screen name="ActualUsed" component={ActualUsed}  options={{ headerShown: false }}/>
      <Stack.Screen name="TeaCoffeeBill" component={TeaCoffeeBill}  options={{ headerShown: false }}/>
      <Stack.Screen name="ApproveTeaCoffeBill" component={ApproveTeaCoffeBill}  options={{ headerShown: false }}/>

      {/* Quotation section screens */}
      <Stack.Screen name="MonthlyBillUpdate" component={MonthlyBillUpdate}  options={{ headerShown: false }}/>
      <Stack.Screen name="MSEB3phaseConnection" component={MSEB3phaseConnection}  options={{ headerShown: false }}/>
      <Stack.Screen name="QuotationHome" component={QuotationHome}  options={{ headerShown: false }}/>
      <Stack.Screen name="GeneralDeatilled" component={GeneralDeatilled}  options={{ headerShown: false }}/>
      <Stack.Screen name="QuotationGSTupdate" component={QuotationGSTupdate}  options={{ headerShown: false }}/>
      <Stack.Screen name="DetailedInfoAbout" component={DetailedInfoAbout}  options={{ headerShown: false }}/>
      <Stack.Screen name="AboutSolarPlant" component={AboutSolarPlant}  options={{ headerShown: false }}/>
      <Stack.Screen name="Quotationpaymentloan" component={Quotationpaymentloan}  options={{ headerShown: false }}/>

      
      {/* Bill scetion screens */}
      <Stack.Screen name="BillHome" component={BillHome}  options={{ headerShown: false }}/>
      <Stack.Screen name="Quotation1" component={Quotation1}  options={{ headerShown: false }}/>


      {/* ledger section screens */}
      <Stack.Screen name="LedgerHome" component={LedgerHome}  options={{ headerShown: false }}/>

      {/* visit section */}
      <Stack.Screen name="VisitHome" component={VisitHome}  options={{ headerShown: false }}/>

      {/* payment section Screens */}
      <Stack.Screen name="ReceivedUdhariPayment" component={ReceivedUdhariPayment}  options={{ headerShown: false }}/>
      <Stack.Screen name="PurchasePayPayment" component={PurchasePayPayment}  options={{ headerShown: false }}/>

      {/* purchased section screens */}
      <Stack.Screen name="Purchasedbill" component={Purchasedbill}  options={{ headerShown: false }}/>
      <Stack.Screen name="SupplierUpdate" component={SupplierUpdate}  options={{ headerShown: false }}/>

      {/* Profile section screens */}
      <Stack.Screen name="ProfileUpdate" component={ProfileUpdate}  options={{ headerShown: false }}/>
      <Stack.Screen name="Requestforadvanced" component={Requestforadvanced}  options={{ headerShown: false }}/>
      <Stack.Screen name="AdvancedForm" component={AdvancedForm}  options={{ headerShown: false }}/>
      <Stack.Screen name="LocationReport" component={LocationReport}  options={{ headerShown: false }}/>
      <Stack.Screen name="CheckAttendence" component={CheckAttendence}  options={{ headerShown: false }}/>      
    </Stack.Navigator>
  </NavigationContainer>  
  );
}

const styles = StyleSheet.create({

});

export default App;
