import { View, Text, StyleSheet, Image, TouchableOpacity, StatusBar } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import loginBg from "../../assets/images/loginbg.png";
import Colors from "../../constants/Colors";
import { client } from "../../utils/KindeConfig";
import {getData, storeData} from "../../utils/services";
import { useRouter } from "expo-router";

const LoginScreen = () => {
  const router = useRouter();

  const handleSignIn = async () => {
    const token = await client.login();
    if (token) {
      // User was authenticated
      await storeData("login", "true");
      router.replace("/"); //index screen
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ display: "flex", alignItems: "center" }}>
        <StatusBar barStyle="dark-content" backgroundColor={"white"} />
        <Image source={loginBg} style={styles.bgImage} />
        <View
          style={{
            backgroundColor: Colors.PRIMARY,
            width: "100%",
            height: "100%",
            padding: 20,
            marginTop: -30,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
          }}
        >
          <Text
            style={{
              fontSize: 35,
              fontWeight: "bold",
              textAlign: "center",
              color: Colors.WHITE,
            }}
          >
            Personal Budget Planner
          </Text>
          <Text
            style={{
              fontSize: 18,
              textAlign: "center",
              color: Colors.WHITE,
              marginTop: 20,
            }}
          >
            Stay on Track, Event by Event: Your Personal Budget Planner App!
          </Text>
          <TouchableOpacity style={styles.button} onPress={handleSignIn}>
            <Text style={{ textAlign: "center", color: Colors.PRIMARY }}>
              Login/Signup
            </Text>
          </TouchableOpacity>
          <Text style={{ fontSize: 13, color: Colors.GRAY, marginTop: 10 }}>
            * By login/signup you will agree to our terms and conditions
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  bgImage: {
    width: 200,
    height: 400,
    marginTop: 70,
    borderWidth: 5,
    borderRadius: 20,
    borderColor: Colors.BLACK,
  },
  button: {
    backgroundColor: Colors.WHITE,
    padding: 15,
    paddingHorizontal: 5,
    borderRadius: 99,
    marginTop: 30,
  },
});