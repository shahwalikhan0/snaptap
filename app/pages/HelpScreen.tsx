import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Linking,
  Alert,
  Modal,
} from "react-native";

export default function HelpSupportScreen({ navigation }: { navigation: any }) {
  const [showForm, setShowForm] = useState(false);
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleContactPress = () => {
    setShowForm(true);
  };

  const handleSubmit = () => {
    if (!email || !subject || !message) {
      Alert.alert("Please fill all fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Please enter a valid email address.");
      return;
    }

    const recipients = [
      "l215767@lhr.nu.edu.pk",
      "l215753@lhr.nu.edu.pk",
      "l216118@lhr.nu.edu.pk",
    ];

    const body = `From: ${email}\n\n${message}\n\nSent from SnapTap Support`;
    const mailto = `mailto:${recipients.join(",")}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    Linking.openURL(mailto).catch(() =>
      Alert.alert("Error", "Failed to open mail client.")
    );

    setShowForm(false);
    setEmail("");
    setSubject("");
    setMessage("");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.heading}>Help & Support</Text>

        <View style={styles.section}>
          <Text style={styles.subHeading}>Frequently Asked Questions</Text>

          <Text style={styles.question}>1. What is SnapTap?</Text>
          <Text style={styles.answer}>
            SnapTap enhances the online shopping experience through AR and 3D
            scanning.
          </Text>

          <Text style={styles.question}>2. How do I create a 3D scan?</Text>
          <Text style={styles.answer}>
            Open the app, select 'Scan Object', follow instructions, and let
            SnapTap generate your model.
          </Text>

          <Text style={styles.question}>3. How can I contact support?</Text>
          <Text style={styles.answer}>
            Email us at support@snaptap.com or visit our Help Center.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.subHeading}>Need Further Assistance?</Text>
          <TouchableOpacity style={styles.button} onPress={handleContactPress}>
            <Text style={styles.buttonText}>Contact Support</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal
        visible={showForm}
        animationType="slide"
        transparent
        onRequestClose={() => setShowForm(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Contact Support</Text>

            <TextInput
              style={styles.input}
              placeholder="Email..."
              placeholderTextColor="#999"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              style={styles.input}
              placeholder="Subject..."
              placeholderTextColor="#999"
              value={subject}
              onChangeText={setSubject}
            />
            <TextInput
              style={[styles.input, { height: 100 }]}
              placeholder="Explanation..."
              placeholderTextColor="#999"
              value={message}
              onChangeText={setMessage}
              multiline
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.button, styles.submitButton]}
                onPress={handleSubmit}
              >
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => setShowForm(false)}
              >
                <Text style={[styles.buttonText, { color: "#000" }]}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  section: {
    marginBottom: 20,
  },
  subHeading: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  question: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  answer: {
    fontSize: 14,
    color: "#666",
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  input: {
    backgroundColor: "#fff",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  submitButton: {
    flex: 1,
    marginRight: 5,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#ccc",
    marginLeft: 5,
  },
});
