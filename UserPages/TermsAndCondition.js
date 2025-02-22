import { StyleSheet, View, Pressable, ScrollView, TouchableOpacity, Text, FlatList, SafeAreaView } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';

const TermsAndCondition = () => {
  const navigation = useNavigation();

  const [expandedIndex, setExpandedIndex] = useState(null);

  const faqs = [
 { 
    id: 1, 
    question: "1. Who We Are", 
    answer: "We provide AkshayUrjaSolar Services, which enable you to manage, maintain, and monitor your PV Plant and associated devices. Our Services may also provide access to specific features, content, and services offered by third parties. In such cases, the terms and conditions provided by the respective third-party service providers will apply." 
  },
  { 
    id: 2, 
    question: "2. Who May Use Services", 
    answer: "You may only use the Services if you agree to enter into this binding contract with us and are not prohibited from receiving services under the laws of your jurisdiction. Additionally, you must be at least 18 years old to use the Services. If you are accepting these Terms and using the Services on behalf of a company, organization, government, or any other legal entity, you represent and warrant that you have the authority to do so and bind the entity to these Terms." 
  },
  { 
    id: 3, 
    question: "3. Privacy Protection", 
    answer: "Our Privacy Policy outlines how we process the personal information you provide to us when using the Services. By using the Services, you acknowledge that you consent to the collection and use of your personal information, including the transfer the transfer of this information to People's Republic of China, and its processing and use by us and our affiliates. Please be aware that we may offer different versions of the Privacy Policy to users in different regions. Therefore, it is important that you review the appropriate version of the Privacy Policy that pertains to your specific region." 
  },
  { 
    id: 4, 
    question: "4. Content on the Services", 
    answer: "You are solely responsible for your use of the Services and the Content you provide, ensuring compliance with applicable laws, rules, and regulations. It is important to understand that any reliance on Content or materials posted or obtained through the Services is at your own risk. We do not endorse, support, represent, or guarantee the completeness, truthfulness, accuracy, or reliability of any Content or communications posted via the Services. The creator of the Content bears full responsibility for its creation, legality, and consequences." 
  },
  { 
    id: 5, 
    question: "5. Terminating the Terms", 
    answer: "You can gain comprehensive understanding of how your personal information is managed and the specific procedures regarding data upon account deactivation, it is highly advisable to carefully review our Privacy Policy. The Privacy Policy will offer detailed information on how your personal data is collected, stored, used, and protected." 
  },
  { 
    id: 6, 
    question: "6. Limitations of Liability", 
    answer: "In no event shall the aggregate liability of Deye exceed the amount you paid us, if any, in the past six months for the services giving rise to the claim." 
  },
  { 
    id: 7, 
    question: "7. Dispute Resolution and Jurisdiction", 
    answer: "We believe that most disputes can be resolved informally. In the event of a dispute, we strongly encourage you to first contact us directly to seek a resolution by sending email to us. We will attempt to resolve any disputes you have with us informally and expeditiously." 
  },
  { 
    id: 8, 
    question: "8. General", 
    answer: "We reserve the right to update or modify these Terms periodically. The revised version of the Terms will be available on the AkshayUrjaSolar Service and will govern our relationship with you. Changes to the Terms will not be applied retroactively." 
  },
  {
    id: 9,
    question: "9. Usage Rights and Restrictions",
    answer: "You are granted a limited, non-exclusive, non-transferable license to use the Services, provided that you comply with these Terms and all applicable laws. You may not use the Services for any illegal, unauthorized, or prohibited activities, including but not limited to infringing on intellectual property rights, distributing harmful or malicious software, or accessing the Services through unauthorized means."
  },
  {
    id: 10,
    question: "10. Payment Terms",
    answer: "For services that require payment, you agree to pay all applicable fees as outlined in the pricing section of the Services. Payments must be made in a timely manner, and failure to pay may result in suspension or termination of services. You may be required to provide accurate billing information for payment processing."
  },
  {
    id: 11,
    question: "11. Service Availability and Maintenance",
    answer: "We strive to ensure that the Services are available at all times. However, we may perform scheduled maintenance or repairs that temporarily disrupt the availability of the Services. We will provide prior notice of such maintenance wherever possible, but we do not guarantee uninterrupted access."
  },
  {
    id: 12,
    question: "12. Contact Us",
    answer: "If you have any questions or concerns about these Terms or the way we handle your data, please contact us at:\n\nEmail: yes@akshayurja63.com\nPhone: +91 98908 28999"
  }
  ];

  const toggleExpanded = (index) => {
    if (expandedIndex === index) {
      setExpandedIndex(null); 
    } else {
      setExpandedIndex(index);
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
          <Text style={{ fontSize: 19, fontWeight: 'bold', color: 'black', alignSelf: 'center' }}>Terms & Condition</Text>
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
            Welcome to AkshayUrjaSolar! These Terms of Service ("Terms") govern your access to and use of the AkshayUrjaSolar Services, 
            including our mobile application, web application, APIs, email notifications, commerce services, and other services 
            we may provide from time to time that link to these Terms (collectively, the “Services”), and any information, image, 
            text and device data interacting with the Services (collectively, the “Content”). You agree to be bound by these Terms 
            before you use the Services.
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

export default TermsAndCondition;

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
