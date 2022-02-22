import {
  Button,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS, FONTS, SIZES, data, icons } from "../constants";
import React, { useCallback, useState } from "react";
import { getCoinMarket, getHoldings } from "../stores/market/marketActions";

import HeaderBar from "../components/HeaderBar";
import { LinearGradient } from "expo-linear-gradient";
import { MainLayout } from "./";

const Checkout = ({ navigation }) => {
  return (
    <MainLayout>
      <StatusBar backgroundColor={COLORS.violetDark} barStyle="light-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <LinearGradient
          colors={[COLORS.violetDark, COLORS.black]}
          style={{
            flex: 1,
          }}
        >
          <ScrollView>
            {/* Header */}
            <View
              style={{
                marginTop: SIZES.padding,
                paddingHorizontal: SIZES.radius,
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <HeaderBar title="Comprar" />
            </View>
            <View
              style={{
                marginTop: SIZES.padding,
                paddingHorizontal: SIZES.radius,
              }}
            >
              <View
                style={{
                  marginVertical: SIZES.padding,
                  paddingHorizontal: SIZES.radius,
                  paddingVertical: SIZES.radius,
                  height: 60,
                  backgroundColor: COLORS.black,
                  borderWidth: 1,
                  borderColor: COLORS.gray1,
                  borderRadius: 12,
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    color: COLORS.white,
                  }}
                >
                  Monto
                </Text>
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
      </SafeAreaView>
    </MainLayout>
  );
};

export default Checkout;
