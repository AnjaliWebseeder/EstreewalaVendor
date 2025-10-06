import { View, Text, Animated, Easing } from "react-native";
import React, { useEffect, useRef } from "react";
import { styles } from "./styles";
import FastImage from "react-native-fast-image";
import { SafeAreaView } from "react-native-safe-area-context";
import {usePermissions} from "../../utils/hooks/permission"

export default function Splash({navigation}) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const bounceAnim = useRef(new Animated.Value(0)).current;
  const bubbleAnim = useRef(new Animated.Value(0)).current;
  const { requestLocationPermission, requestNotificationPermission } = usePermissions();

  // Animations
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 800,
        easing: Easing.elastic(1.2),
        useNativeDriver: true,
      }),
      Animated.loop(
        Animated.sequence([
          Animated.timing(bounceAnim, {
            toValue: 1,
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(bounceAnim, {
            toValue: 0,
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ),
    ]).start();

    // Navigate to Welcome screen after 2.5 sec
    const timer = setTimeout(() => {
      navigation.replace("Welcome"); // 👈 replace so splash is not in back stack
    }, 2500);

    return () => clearTimeout(timer);
  }, [fadeAnim, scaleAnim, bounceAnim, navigation]);

    useEffect(() => {
    requestLocationPermission();
    requestNotificationPermission();
  }, []);

 

  // Bubble animation
  useEffect(() => {
    Animated.loop(
      Animated.timing(bubbleAnim, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [bubbleAnim]);

  const bubbleTranslateY = bubbleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -20],
  });

  const bubbleOpacity = bubbleAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 0.5, 1],
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
      {/* Bubbles */}
      <Animated.View
        style={[
          styles.bubble,
          styles.bubble1,
          { opacity: bubbleOpacity, transform: [{ translateY: bubbleTranslateY }] },
        ]}
      />
      <Animated.View
        style={[
          styles.bubble,
          styles.bubble2,
          {
            opacity: bubbleOpacity.interpolate({
              inputRange: [0, 0.5, 1],
              outputRange: [0.7, 0.3, 0.7],
            }),
            transform: [
              {
                translateY: bubbleTranslateY.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -15],
                }),
              },
            ],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.bubble,
          styles.bubble3,
          {
            opacity: bubbleOpacity.interpolate({
              inputRange: [0, 0.5, 1],
              outputRange: [0.5, 0.2, 0.5],
            }),
            transform: [
              {
                translateY: bubbleTranslateY.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -10],
                }),
              },
            ],
          },
        ]}
      />

      {/* Logo */}
      <Animated.View
        style={[
          styles.iconWrapper,
          {
            opacity: fadeAnim,
            transform: [
              { scale: scaleAnim },
              {
                translateY: bounceAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -10],
                }),
              },
            ],
          },
        ]}
      >
        <FastImage
          source={require("../../assets/images/appLogo.png")}
          style={styles.image}
        />
      </Animated.View>

      {/* Text */}
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [
            {
              translateY: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [20, 0],
              }),
            },
          ],
        }}
      >
        <Text style={styles.welcome}>WELCOME TO</Text>
      </Animated.View>

      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [
            {
              translateY: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [30, 0],
              }),
            },
          ],
        }}
      >
        <Text style={styles.appName}>ESTREEWALA</Text>
      </Animated.View>
    </View>
    </SafeAreaView>
  );
}
