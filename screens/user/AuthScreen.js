import {
  Alert,
  Button,
  Image,
  KeyboardAvoidingView,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { COLORS, FONTS, SIZES, icons } from "../../constants";
import React, { useCallback, useEffect, useReducer, useState } from "react";
import { login, signup } from "../../stores/auth/authActions";

import Input from "../../components/Input";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch } from "react-redux";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
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

const AuthScreen = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);

  useEffect(() => {
    if (error) {
      Alert.alert("Ha ocurrido un error", error, [{ text: "Ok" }]);
    }
  }, [error]);

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

  const onInputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        input: inputIdentifier,
        value: inputValue,
        isValid: inputValidity,
      });
      console.log(formState);
    },
    [dispatchFormState]
  );

  const onLoginHandler = async () => {
    try {
      await dispatch(
        login(formState.inputValues.email, formState.inputValues.password)
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const onSignupHandler = async () => {
    try {
      await dispatch(
        signup(formState.inputValues.email, formState.inputValues.password)
      );
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <StatusBar backgroundColor={COLORS.violetDark} barStyle="light-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <LinearGradient
          colors={[COLORS.violetDark, COLORS.black]}
          style={{
            flex: 1,
          }}
        >
          <KeyboardAvoidingView
            behavior="padding"
            keyboardVerticalOffset={50}
            style={styles.screen}
          >
            <View
              style={{
                marginTop: 30,
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Image
                style={{
                  width: 50,
                  height: 50,
                }}
                source={icons.logo}
              />
              <Text
                style={{
                  ...FONTS.h1,
                  color: COLORS.white,
                  marginTop: 20,
                  marginLeft: 10,
                }}
              >
                Iniciar sesion
              </Text>
            </View>
            <View
              style={{
                width: "100%",
                paddingHorizontal: SIZES.padding,
                marginTop: SIZES.padding,
              }}
            >
              <Input
                id="email"
                label="Correo electrónico"
                keyboardType="email-address"
                required
                email
                autoCapitalize="none"
                errorText="Por favor ingrese un email válido"
                onInputChange={onInputChangeHandler}
                initialValue=""
              />
              <Input
                id="password"
                label="Contraseña"
                keyboardType="default"
                required
                minLength={6}
                autoCapitalize="none"
                errorText="Por favor ingrese una clave de al menos 6 caracteres"
                onInputChange={onInputChangeHandler}
                initialValue=""
              />
            </View>
            <View style={styles.footer}>
              <View style={styles.button}>
                <Pressable
                  style={{
                    borderRadius: 12,
                    height: 54,
                    backgroundColor: COLORS.violet,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onPress={onLoginHandler}
                >
                  <Text style={{ ...FONTS.h3, color: COLORS.white }}>
                    Ingresar
                  </Text>
                </Pressable>
              </View>
              <View style={styles.button}>
                <Pressable
                  style={{
                    borderRadius: 12,
                    height: 54,
                    backgroundColor: COLORS.gray,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onPress={onSignupHandler}
                >
                  <Text style={{ ...FONTS.h3, color: COLORS.white }}>
                    Registrarse
                  </Text>
                </Pressable>
              </View>
            </View>
          </KeyboardAvoidingView>
        </LinearGradient>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    width: "100%",
    marginTop: 10,
    paddingHorizontal: SIZES.padding,
  },
  button: {
    width: "100%",
    marginBottom: 8,
  },
});

export default AuthScreen;
