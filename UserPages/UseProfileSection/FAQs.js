import { StyleSheet, View, Pressable, ScrollView, TouchableOpacity, Text, FlatList, SafeAreaView } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';

const FAQs = () => {
  const navigation = useNavigation();

  // State to manage which FAQ is expanded
  const [expandedIndex, setExpandedIndex] = useState(null);

  // FAQ data
  const faqs = [
    { id: 1, question: "What is your return policy?", answer: "Our return policy allows returns within 30 days of purchase. Products must be in original condition." },
    { id: 2, question: "How do I track my order?", answer: "You can track your order by logging into your account and clicking on 'Track Order'." },
    { id: 3, question: "Do you offer international shipping?", answer: "Yes, we ship worldwide. Shipping fees are calculated at checkout." },
    { id: 4, question: "What payment methods do you accept?", answer: "We accept Visa, MasterCard, PayPal, and other major payment methods." },
    { id: 5, question: "Can I change my order after placing it?", answer: "Once an order is placed, it cannot be changed. Please contact customer support for urgent issues." },
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
              <AntDesign name="arrowleft" size={25} color="black" />
            </TouchableOpacity>
            <Text style={{ fontSize: 19, fontWeight: 'bold', color: 'black', alignSelf: 'center' }}>FAQs</Text>
          </View>
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
                  <Feather 
                    name={expandedIndex === index ? "minus" : "plus"} 
                    size={20} 
                    color="black" 
                    style={styles.icon} 
                  />
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

export default FAQs;

const styles = StyleSheet.create({
  PageContainer: { backgroundColor: "#fff", height: "100%" },
  faqsContainer: {
    marginTop: 10,
  },
  faqItem: {
    padding: 20,
    borderBottomWidth: 0.3,
    borderColor: "#000",
    paddingVertical: 25,
    paddingHorizontal: 30,
  },
  faqTouchable: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  faqText: {
    fontSize: 14,
    color: 'black',
    flex: 1,
  },
  icon: {
    marginLeft: 10,
  },
  answerContainer: {
    marginTop: 10,
  },
  answerText: {
    fontSize: 14,
    color: '#555',
  },
});
