import { COLORS, FONTS, SIZES, data, icons } from "../constants";
import {
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect, useReducer, useState } from "react";

import { HeaderBar } from "../components";
import { LinearGradient } from "expo-linear-gradient";
import { MainLayout } from "./";
import { logout } from "../stores/auth/authActions";
import { useDispatch } from "react-redux";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const SectionTitle = ({ title }) => {
  return (
    <View
      style={{
        marginTop: SIZES.padding,
      }}
    >
      <Text style={{ color: COLORS.lightGray3, ...FONTS.h4 }}>{title}</Text>
    </View>
  );
};

const Setting = ({ title, value, type, onPress }) => {
  if (type == "button") {
    return (
      <TouchableOpacity
        style={{
          flexDirection: "row",
          height: 50,
          alignItems: "center",
        }}
        onPress={onPress}
      >
        <Text style={{ flex: 1, color: COLORS.white, ...FONTS.h3 }}>
          {title}
        </Text>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              marginRight: SIZES.radius,
              color: COLORS.lightGray3,
              ...FONTS.h3,
            }}
          >
            {value}
          </Text>
          <Image
            source={icons.rightArrow}
            style={{
              height: 15,
              width: 15,
              tintColor: COLORS.white,
            }}
          />
        </View>
      </TouchableOpacity>
    );
  } else {
    return (
      <View
        style={{
          flexDirection: "row",
          height: 50,
          alignItems: "center",
        }}
      >
        <Text style={{ flex: 1, color: COLORS.white, ...FONTS.h3 }}>
          {title}
        </Text>
        <Switch value={value} onValueChange={(value) => onPress(value)} />
      </View>
    );
  }
};

const Profile = ({ navigation }) => {
  const [faceId, setFaceId] = useState(true);
  const [mode, setMode] = useState(true);
  const dispatch = useDispatch();

  const formReducer = (state, action) => {
    if (action.type === logout) {
      const updatedValues = {
        ...state.inputValues,
        [action.input]: action.value,
      };

      const updatedValidities = {
        ...state.inputValidities,
        [action.input]: action.isValid,
      };

      let updatedFormIsValid = true;
      for (const key in updatedValidities) {
        updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
      }

      return {
        formIsValid: updatedFormIsValid,
        inputValidities: updatedValidities,
        inputValues: updatedValues,
      };
    }

    return state;
  };

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: "",
      password: "",
    },
    inputValidities: {
      email: false,
      password: false,
    },
    formIsValid: false,
  });

  const onLogoutHandler = async () => {
    try {
      await dispatch(
        logout(formState.inputValues.email, formState.inputValues.password)
      );
    } catch (err) {
      setError(err.message);
    }
  };

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
          <View
            style={{
              paddingHorizontal: SIZES.radius,
            }}
          >
            {/* Header */}
            <HeaderBar title="Cuenta" />
          </View>

          {/* Details */}
          <ScrollView
            contentContainerStyle={{
              paddingHorizontal: SIZES.radius,
            }}
          >
            {/* Email & User Id */}
            <View
              style={{
                flexDirection: "row",
                marginTop: SIZES.radius,
                marginBottom: 30,
              }}
            >
              {/* Email and ID */}
              <View
                style={{
                  flex: 1,
                }}
              >
                <Text style={{ color: COLORS.white, ...FONTS.h3 }}>
                  {data.profile.email}
                </Text>
              </View>
            </View>

            {/* APP 
            <SectionTitle title="Modo" />

            <Setting
              title="Dark mode"
              value={mode}
              type="switch"
              onPress={(value) => setMode(value)}
            />*/}

            {/* ACCOUNT 
            <SectionTitle title="Mis datos" />*/}

            <Setting
              title="Nueva ubicación"
              value=""
              type="button"
              onPress={() =>
                navigation.navigate("NuevaDireccion", {
                  title: "Nueva ubicación",
                })
              }
            />

            <Setting
              title="Lista de ubicaciones"
              value=""
              type="button"
              onPress={() =>
                navigation.navigate("Direcciones", {
                  title: "Lista de ubicaciones",
                })
              }
            />

            {/* SECURITY 
            <SectionTitle title="Seguridad" />

            <Setting
              title="FaceID"
              value={faceId}
              type="switch"
              onPress={(value) => setFaceId(value)}
            />

            <Setting
              title="Cambiar contraseña"
              value=""
              type="button"
              onPress={() => console.log("Cambiar contraseña")}
            />*/}
          </ScrollView>
        </ScrollView>
        <Pressable
          style={{
            borderRadius: 12,
            height: 54,
            backgroundColor: COLORS.violet,
            alignItems: "center",
            justifyContent: "center",
            margin: SIZES.padding,
          }}
          onPress={onLogoutHandler}
        >
          <Text style={{ ...FONTS.h3, color: COLORS.white }}>
            Cerrar sesión
          </Text>
        </Pressable>
      </LinearGradient>
    </MainLayout>
  );
};

export default Profile;
