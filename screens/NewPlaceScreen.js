import {
  Button,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS, FONTS, SIZES, icons } from "../constants";
import React, { useCallback, useState } from "react";

import ImageSelector from "../components/ImageSelector";
import { LinearGradient } from "expo-linear-gradient";
import LocationPicker from "../components/LocationPicker";
import { MainLayout } from "./";
import { addPlace } from "../stores/place/placeAction";
import { useDispatch } from "react-redux";

const NewPlaceScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedLocation, setSelectedLocation] = useState();

  const onHandlerTitle = (text) => setTitle(text);
  const onHandlerImage = (path) => setSelectedImage(path);

  const onHandlerSave = () => {
    dispatch(addPlace(title, selectedImage, selectedLocation));
    navigation.goBack();
  };

  const onHandlerLocationPicked = useCallback(
    (location) => {
      setSelectedLocation(location);
    },
    [setSelectedLocation]
  );

  return (
    <MainLayout>
      <StatusBar backgroundColor={COLORS.violetDark} barStyle="light-content" />
      <LinearGradient
        colors={[COLORS.violetDark, COLORS.black]}
        style={{
          flex: 1,
        }}
      >
        <ScrollView
          style={{
            flex: 1,
            paddingHorizontal: SIZES.radius,
          }}
        >
          <View style={styles.container}>
            <Text style={{ ...FONTS.h2, color: COLORS.white }}>
              Nombre de dirección
            </Text>
            <TextInput
              style={styles.input}
              onChangeText={onHandlerTitle}
              value={title}
              placeholder="Escriba aqui..."
            />
            <ImageSelector onImage={onHandlerImage} />
            <LocationPicker
              navigation={navigation}
              route={route}
              onLocationPicked={onHandlerLocationPicked}
            />
            <View style={styles.footer}>
              <Pressable
                style={{
                  borderRadius: 12,
                  height: 54,
                  backgroundColor: COLORS.lightGreen,
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={onHandlerSave}
              >
                <Text style={{ ...FONTS.h3, color: COLORS.black }}>
                  Guardar dirección
                </Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
        <View
          style={{
            paddingHorizontal: SIZES.radius,
            paddingVertical: SIZES.radius,
          }}
        >
          <TouchableOpacity
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              paddingVertical: SIZES.padding,
              paddingHorizontal: SIZES.padding,
              backgroundColor: COLORS.transparentWhite,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: COLORS.secondary,
            }}
            onPress={() => navigation.goBack()}
          >
            <Text
              style={{
                fontWeight: "bold",
                color: COLORS.white,
              }}
            >
              Volver atrás
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    marginBottom: 30,
  },
  input: {
    marginTop: 8,
    marginBottom: 20,
    borderRadius: 12,
    backgroundColor: COLORS.blurBlack,
    padding: 10,
    borderWidth: 1,
    borderColor: COLORS.gray,
    color: COLORS.white,
  },
  footer: {
    marginTop: 30,
  },
});

export default NewPlaceScreen;
