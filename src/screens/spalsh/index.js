import { View, Text, Animated, Easing } from "react-native";
import React, { useEffect, useRef } from "react";
import { styles } from "./styles";
import FastImage from "react-native-fast-image";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Splash({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const bounceAnim = useRef(new Animated.Value(0)).current;
  const bubbleAnim = useRef(new Animated.Value(0)).current;

  // Combined useEffect for animations and navigation
  useEffect(() => {
    let isMounted = true;
    let navigationTimer;

    const initializeApp = async () => {
      try {
        // SEQUENCE ANIMATIONS PROPERLY
        Animated.sequence([
          // First: Fade in and scale
          Animated.parallel([
            Animated.timing(fadeAnim, {
              toValue: 1,
              duration: 800,
              useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
              toValue: 1,
              duration: 800,
              easing: Easing.elastic(1),
              useNativeDriver: true,
            }),
          ]),
          // Then: Single bounce (up and down once)
          Animated.sequence([
            Animated.timing(bounceAnim, {
              toValue: 1,
              duration: 400,
              easing: Easing.out(Easing.back(1.2)),
              useNativeDriver: true,
            }),
            Animated.timing(bounceAnim, {
              toValue: 0,
              duration: 500,
              easing: Easing.bounce,
              useNativeDriver: true,
            }),
          ]),
        ]).start();

        // Request permissions (non-blocking)
        Promise.allSettled([
          // requestLocationPermission(),
          // requestNotificationPermission(),
        ]).catch(error => {
          console.log("Permission requests completed with errors:", error);
        });

        // Navigate after minimum delay (2.5 seconds)
        navigationTimer = setTimeout(() => {
          if (isMounted) {
            navigation.replace("Welcome");
          }
        }, 2500);

      } catch (error) {
        console.error("Splash screen initialization error:", error);
        // Fallback navigation in case of error
        if (isMounted) {
          navigation.replace("Welcome");
        }
      }
    };

    initializeApp();

    return () => {
      isMounted = false;
      clearTimeout(navigationTimer);
    };
  }, [fadeAnim, scaleAnim, bounceAnim, navigation]);

  // Bubble animation (separate as it's visual only)
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bubbleAnim, {
          toValue: 1,
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(bubbleAnim, {
          toValue: 0,
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [bubbleAnim]);

  const bubbleTranslateY = bubbleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -25],
  });

  const bubbleOpacity = bubbleAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.3, 0.8, 0.3],
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        {/* Bubbles */}
        <Animated.View
          style={[
            styles.bubble,
            styles.bubble1,
            { 
              opacity: bubbleOpacity, 
              transform: [{ translateY: bubbleTranslateY }] 
            },
          ]}
        />
        <Animated.View
          style={[
            styles.bubble,
            styles.bubble2,
            {
              opacity: bubbleOpacity.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [0.2, 0.6, 0.2],
              }),
              transform: [
                {
                  translateY: bubbleTranslateY.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -20],
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
                outputRange: [0.1, 0.4, 0.1],
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
                    outputRange: [0, -20], // More noticeable bounce
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

        {/* Text - Animate after logo appears */}
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
          <Text style={styles.welcome}>WELCOME TO</Text>
        </Animated.View>

        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [
              {
                translateY: fadeAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [40, 0],
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