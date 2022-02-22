import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

import {
  Alert,
  Button,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { COLORS, FONTS } from "../constants";
import React, { useState } from "react";

const ImageSelector = (props) => {
  const [pickedUri, setPickedUri] = useState();

  const verifyPermissions = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    if (status !== "granted") {
      Alert.alert(
        "Permisos insuficientes",
        "Necesita dar permisos de uso de la cámara para usar esta app",
        [{ text: "Ok" }]
      );
      return false;
    }

    return true;
  };

  const handlerTakeImage = async () => {
    const isCameraOk = await verifyPermissions();
    if (!isCameraOk) return;

    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.8,
    });

    setPickedUri(image.uri);
    props.onImage(image.uri);
  };

  return (
    <View style={styles.container}>
      <View style={styles.preview}>
        {!pickedUri ? (
          <Text style={{ color: COLORS.white }}>
            No hay imagen seleccionada...
          </Text>
        ) : (
          <Image style={styles.image} source={{ uri: pickedUri }} />
        )}
      </View>
      <Pressable
        style={{
          borderRadius: 12,
          height: 54,
          backgroundColor: COLORS.violet,
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={handlerTakeImage}
      >
        <Text style={{ ...FONTS.h3, color: COLORS.white }}>Tomar Foto</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  preview: {
    width: "100%",
    height: 200,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: COLORS.white,
    color: COLORS.gray,
    borderWidth: 0.5,
    borderRadius: 16,
    backgroundColor: COLORS.violetDark,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
  },
});

export default ImageSelector;
