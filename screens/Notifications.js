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

const Notifications = ({ navigation, route }) => {
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
                paddingHorizontal: SIZES.radius,
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <HeaderBar title={route.params?.title} />
            </View>
            <View
              style={{
                marginTop: SIZES.padding,
                paddingHorizontal: SIZES.radius,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  paddingVertical: SIZES.radius,
                  paddingHorizontal: SIZES.radius,
                  marginBottom: 20,
                  backgroundColor: COLORS.blurBlack,
                  borderRadius: 12,
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    borderRadius: 12,
                    backgroundColor: COLORS.transparentWhite,
                    padding: 10,
                    borderWidth: 1,
                    borderColor: COLORS.gray,
                  }}
                >
                  <Image
                    style={{
                      width: 30,
                      height: 30,
                    }}
                    source={icons.bell}
                  />
                </View>
                <View
                  style={{
                    paddingHorizontal: SIZES.radius,
                    width: "90%",
                  }}
                >
                  <Text
                    style={{
                      color: COLORS.white,
                    }}
                  >
                    Felicitaciones! Tu compra de Bitcoin ha sido realizada con
                    exito.
                  </Text>
                </View>
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

function mapStateToProps(state) {
  return {
    myHoldings: state.marketReducer.myHoldings,
    coins: state.marketReducer.coins,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getHoldings: (
      holdings,
      currency,
      coinList,
      orderBy,
      sparkline,
      priceChangePerc,
      perPage,
      page
    ) => {
      return dispatch(
        getHoldings(
          holdings,
          currency,
          coinList,
          orderBy,
          sparkline,
          priceChangePerc,
          perPage,
          page
        )
      );
    },
    getCoinMarket: (
      currency,
      coinList,
      orderBy,
      sparkline,
      priceChangePerc,
      perPage,
      page
    ) => {
      return dispatch(
        getCoinMarket(
          currency,
          coinList,
          orderBy,
          sparkline,
          priceChangePerc,
          perPage,
          page
        )
      );
    },
  };
}

export default Notifications;
