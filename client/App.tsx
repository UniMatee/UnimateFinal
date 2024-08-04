import React, { useState, useEffect } from "react";
import { ScrollView, View, StatusBar, Animated, Easing, StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from 'expo-router'; 

const logoImage = require("../client/assets/newlogo1.png");

const App = () => {
  const [loading, setLoading] = useState(true);
  const [navigationComplete, setNavigationComplete] = useState(false);
  const progress = new Animated.Value(0);
  const [titleAnimation] = useState(new Animated.Value(0)); 
  const [subtitleAnimation] = useState(new Animated.Value(0));
  const router = useRouter(); 

  useEffect(() => {
    animateProgressBar();
    animateImage();
    animateText(); 
    const timeout = setTimeout(() => {
      setLoading(false); 
    }, 3000);

    return () => {
      clearTimeout(timeout); 
      progress.setValue(0); 
    };
  }, []);

  useEffect(() => {
    if (!loading && !navigationComplete) {
      setNavigationComplete(true); 
      router.push("/register");
    }
  }, [loading, navigationComplete]);

  const animateImage = () => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 2000, 
      easing: Easing.ease, 
      useNativeDriver: false,
    }).start();
  }

  const imageStyle = {
    opacity : progress,
    transform: [
      {
        scale: progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0.5, 1],
        }),
      },
    ],
  };

  const animateText = () => {
    Animated.parallel([
      Animated.timing(titleAnimation, {
        toValue: 1,
        duration: 1000,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(subtitleAnimation, {
        toValue: 1,
        duration: 1000,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();
  };

  const animateProgressBar = () => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 3000, 
      easing: Easing.linear, 
      useNativeDriver: false,
    }).start();
  };

  const titleStyle = {
    opacity: titleAnimation,
    transform: [
      {
        translateX: titleAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [-100, 0],
        }),
      },
    ],
  };

  const subtitleStyle = {
    opacity: subtitleAnimation,
    transform: [
      {
        translateX: subtitleAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [-100, 0],
        }),
      },
    ],
  };

  const interpolatedWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flex: 1 }}>
          <View style={styles.container}>
            <View style={styles.main}>

              <Animated.Image style={[styles.image, imageStyle]} source={logoImage} />
              
              <Animated.Text style={[styles.title, titleStyle]}>UNIMATE</Animated.Text>

              <Animated.Text style={[styles.subtitle, subtitleStyle]}>Your campus in one app!</Animated.Text>

              {loading && (
                <View style={styles.loaderContainer}>
                  <Animated.View style={[styles.loaderBar, { width: interpolatedWidth }]} />
                </View>
              )}
            </View>
          </View>

        </ScrollView>
        <StatusBar backgroundColor='#161622' />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
    backgroundColor: "black",
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
    alignItems: "center", 
  },
  image: {
    width: 170,
    height: 170,
    marginBottom: 15,
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    color: "white",
  },
  subtitle: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
    marginTop: 2,
    marginBottom: 24,
  },
  loaderContainer: {
    marginTop: 20,
    width: "75%",
    height: 6,
    backgroundColor: "black",
    borderRadius: 5,
    overflow: "hidden",
  },
  loaderBar: {
    height: "100%",
    backgroundColor: "white",
  },
});

export default App;
