import { StyleSheet, View, Pressable, ScrollView, TouchableOpacity, Text, FlatList, SafeAreaView } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';

const PrivancyPolicy = () => {
  const navigation = useNavigation();

  // State to manage which FAQ is expanded
  const [expandedIndex, setExpandedIndex] = useState(null);

  // FAQ data
  const faqs = [
    { 
      id: 1, 
      question: "1. Information We Collect", 
      answer: "We collect personal information such as your name, email address, phone number, and payment details when you register or use our services. This helps us provide a personalized experience and communicate with you effectively."
    },
    { 
      id: 2, 
      question: "2. How We Use Your Information", 
      answer: "We use the information we collect to improve our services, process transactions, provide customer support, and send notifications related to your account or our services."
    },
    { 
      id: 3, 
      question: "3. Data Security", 
      answer: "We implement various security measures to protect your personal data, including encryption and secure servers. However, please note that no method of transmission over the internet is 100% secure."
    },
    { 
      id: 4, 
      question: "4. Sharing Information with Third Parties", 
      answer: "We may share your information with trusted third parties who help us operate our services or comply with legal requirements. We ensure that any third parties with whom we share information adhere to similar privacy standards."
    },
    { 
      id: 5, 
      question: "5. User Rights", 
      answer: "You have the right to access, update, and delete your personal information at any time. If you wish to exercise these rights, please contact us via the provided contact information."
    },
    { 
      id: 6, 
      question: "6. Cookies and Tracking Technologies", 
      answer: "We use cookies and other tracking technologies to improve your browsing experience and analyze website traffic. You can control cookies through your browser settings."
    },
    { 
      id: 7, 
      question: "7. Policy Changes", 
      answer: "We reserve the right to update our privacy policy from time to time. Any changes will be posted on this page with the updated date."
    },    
    { 
      id: 8,
      question: "8. Third-Party Services", 
      answer: "We may use third-party services such as payment gateways, analytics, and social media plugins, which may collect data on their own. Please review their privacy policies to understand their practices."
    },
    { 
      id: 9,
      question: "9. International Data Transfers", 
      answer: "If you are located outside of our country, please be aware that your data may be transferred to, stored, and processed in a country other than your own, which may have different data protection laws."
    },
    { 
      id: 10, 
      question: "10. Data Retention", 
      answer: "We retain your personal data only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, or as required by law or contractual obligations."
    },
    { 
      id: 11, 
      question: "11. Children's Privacy", 
      answer: "Our services are not intended for children under the age of 13. We do not knowingly collect or maintain personal information from children. If we learn we have inadvertently collected data from a child under 13, we will take steps to delete that information."
    },
    { 
      id: 12, 
      question: "12. Contact Us", 
      answer: "If you have any questions or concerns about this Privacy Policy or the way we handle your data, please contact us at:\n\nEmail: yes@akshayurja63.com\nPhone: +91 98908 28999"
    },  
  ];
  

  // Toggle expanded FAQ
  const toggleExpanded = (index) => {
    if (expandedIndex === index) {
      setExpandedIndex(null); // Close if the same FAQ is clicked again
    } else {
      setExpandedIndex(index); // Open the clicked FAQ
    }
  };

  return (
    <SafeAreaView style={styles.PageContainer}>
      <ScrollView>
        <View style={{ paddingHorizontal: 20, paddingTop: 30, paddingBottom: 10, flexDirection: 'row', justifyContent: 'space-between', backgroundColor: "#f2be25" }}>
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ justifyContent: "center", alignItems: "center", alignSelf: 'center' }}>
              <AntDesign name="left" size={25} color="black" />
            </TouchableOpacity>
          </View>
          <Text style={{ fontSize: 19, fontWeight: 'bold', color: 'black', alignSelf: 'center' }}>Privancy Policy</Text>
          <View>

          </View>
        </View>
                {/* Update and Effective Date Section */}
                <View style={styles.dateContainer}>
                  <Text style={styles.dateText}>Update Date: 7 Feb, 2025</Text>
                  <Text style={styles.dateText}>Effective Date: 7 Feb, 2025</Text>
                </View>

                {/* Introduction Section */}
                <View style={styles.introductionContainer}>
          <Text style={styles.introductionText}>
            Welcome to AkshayUrjaSolar! This Privacy Policy outlines how we collect, use, and protect your personal information when you interact with our services, including our mobile application, web application, APIs, email notifications, and other services we provide. 
            By using our services, you consent to the collection and use of your personal information as described in this policy.
          </Text>
        </View>
        <View style={styles.faqsContainer}>
          {/* Render FAQ items */}
          <FlatList
            data={faqs}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item, index }) => (
              <View style={styles.faqItem}>
                <TouchableOpacity onPress={() => toggleExpanded(index)} style={styles.faqTouchable}>
                  <Text style={styles.faqText}>{item.question}</Text>
                  <Feather name={expandedIndex === index ? "chevron-down" : "chevron-right"} 
                    size={20} color="black" style={styles.icon} />
                </TouchableOpacity>
                {expandedIndex === index && (
                  <View style={styles.answerContainer}>
                    <Text style={styles.answerText}>{item.answer}</Text>
                  </View>
                )}
              </View>
            )}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PrivancyPolicy;

const styles = StyleSheet.create({
  PageContainer: { backgroundColor: "#fff", height: "100%" },
  faqsContainer: {marginTop: 10,marginBottom:20},
  faqItem: {padding: 20,borderBottomWidth: 0.3,borderColor: "#000",paddingVertical: 20,paddingHorizontal: 30,},
  faqTouchable: {flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center',width: '100%',},
  faqText: {fontSize: 16,color: 'black',flex: 1,fontWeight:'bold'},
  icon: {marginLeft: 10,},
  answerContainer: {marginTop: 10,},
  answerText: {fontSize: 14,color: '#555'},
  dateContainer: { paddingHorizontal: 20,paddingVertical:10, marginTop:20 },
  dateText: { fontSize: 14, color: 'black', fontWeight: 'bold' },
  introductionContainer: { paddingHorizontal: 20, },
  introductionText: { fontSize: 14, color: '#555' },
});
