import * as Location from "expo-location";

import {
  ActivityIndicator,
  Alert,
  Button,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { COLORS, FONTS } from "../constants";
import React, { useEffect, useState } from "react";

import MapPreview from "./MapPreview";

const LocationPicker = ({ navigation }) => {
  const [isFetching, setIsFetching] = useState(false);
  const [pickedLocation, setPickedLocation] = useState();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permisos insuficientes",
          "Necesita dar permisos de localización para la app",
          [{ text: "Ok" }]
        );
      }
    })();
  }, []);

  const getLocationHandler = async () => {
    try {
      setIsFetching(true);
      const location = await Location.getCurrentPositionAsync({
        timeout: 5000,
      });
      console.log(location);
      setPickedLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
    } catch (err) {
      Alert.alert(
        "No se pudo obtener la localización",
        "Por favor intente nuevamente.",
        [{ text: "Ok" }]
      );
    } finally {
      setIsFetching(false);
    }
  };

  const pickLocationHandler = () => navigation.push("Map");

  return (
    <View style={styles.locationPicker}>
      <MapPreview style={styles.mapPreview} location={pickedLocation}>
        {isFetching ? (
          <ActivityIndicator size="large" color={COLORS.DARK_SIENNA} />
        ) : (
          <Text style={{ color: COLORS.white }}>Ubicar en mapa...</Text>
        )}
      </MapPreview>
      <Pressable
        style={{
          borderRadius: 12,
          height: 54,
          backgroundColor: COLORS.violet,
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={getLocationHandler}
      >
        <Text style={{ ...FONTS.h3, color: COLORS.white }}>
          Ubicación actual
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  locationPicker: {
    marginVertical: 15,
  },
  mapPreview: {
    borderWidth: 0.5,
    borderColor: COLORS.white,
    backgroundColor: COLORS.violetDark,
    borderRadius: 16,
    marginBottom: 10,
    width: "100%",
    height: 150,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
});

export default LocationPicker;
