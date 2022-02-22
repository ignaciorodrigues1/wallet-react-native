import { BalanceInfo, Chart } from "../components";
import { COLORS, FONTS, SIZES, data, icons } from "../constants";
import {
  FlatList,
  Image,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { MainLayout } from "./";
import React from "react";
import { connect } from "react-redux";
import { getHoldings } from "../stores/market/marketActions";
import { isIphoneX } from "react-native-iphone-x-helper";
import { useFocusEffect } from "@react-navigation/native";

const Portfolio = ({ getHoldings, myHoldings }) => {
  const [selectedCoin, setSelectedCoin] = React.useState(null);
  const [showChart, setShowChart] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setShowChart(true);
    }, 1000);
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      getHoldings((holdings = data.holdings));
    }, [])
  );

  let totalWallet = myHoldings.reduce((a, b) => a + (b.total || 0), 0);
  let valueChange = myHoldings.reduce(
    (a, b) => a + (b.holding_value_change_7d || 0),
    0
  );
  let percChange = (valueChange / (totalWallet - valueChange)) * 100;

  function renderCurrentBalanceSection() {
    return (
      <>
        <View
          style={{ marginTop: SIZES.padding, paddingHorizontal: SIZES.radius }}
        >
          <Text
            style={{
              color: COLORS.white,
              ...FONTS.largeTitle,
            }}
          >
            Billetera
          </Text>
        </View>
        <View
          style={{
            borderRadius: 25,
            backgroundColor: COLORS.blurBlack,
            marginTop: 20,
            marginHorizontal: SIZES.radius,
            paddingHorizontal: SIZES.padding,
            borderColor: COLORS.secondary,
            borderWidth: 1,
          }}
        >
          <BalanceInfo
            title="Valor actual"
            displayAmount={totalWallet}
            changePct={percChange}
            containerStyle={{
              marginTop: SIZES.radius,
              marginBottom: SIZES.radius,
            }}
          />
        </View>
      </>
    );
  }

  return (
    <MainLayout>
      <StatusBar backgroundColor={COLORS.violetDark} barStyle="light-content" />
      <LinearGradient
        colors={[COLORS.violetDark, COLORS.black]}
        style={{
          flex: 1,
        }}
      >
        <ScrollView>
          {/* Header - Current Balance */}
          {renderCurrentBalanceSection()}

          {/* Chart */}
          {showChart && (
            <Chart
              containerStyle={{
                marginTop: SIZES.radius,
              }}
              chartPrices={
                selectedCoin
                  ? selectedCoin?.sparkline_in_7d?.value
                  : myHoldings[0]?.sparkline_in_7d?.value
              }
            />
          )}

          {/* Section Title */}
          <View
            style={{
              marginTop: SIZES.padding,
              paddingHorizontal: SIZES.radius,
            }}
          >
            <Text style={{ ...FONTS.h2, color: COLORS.white }}>
              Mis activos
            </Text>
          </View>
          {/* Your Assets */}
          <FlatList
            data={myHoldings}
            keyExtractor={(item) => `${item.id}`}
            contentContainerStyle={{
              marginTop: SIZES.radius,
              marginHorizontal: SIZES.radius,
              paddingHorizontal: SIZES.padding,
              paddingTop: SIZES.radius,
              paddingBottom: SIZES.radius,
              backgroundColor: COLORS.blurBlack,
              borderWidth: 1,
              borderColor: COLORS.secondary,
              borderTopLeftRadius: 25,
              borderTopRightRadius: 25,
              borderBottomLeftRadius: 25,
              borderBottomRightRadius: 25,
            }}
            ListHeaderComponent={
              <View>
                {/* Header Label */}
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: SIZES.radius,
                  }}
                >
                  <Text style={{ flex: 1, color: COLORS.lightGray3 }}>
                    Nombre
                  </Text>
                  <Text
                    style={{
                      flex: 1,
                      color: COLORS.lightGray3,
                      textAlign: "right",
                    }}
                  >
                    Precios
                  </Text>
                  <Text
                    style={{
                      flex: 1,
                      color: COLORS.lightGray3,
                      textAlign: "right",
                    }}
                  >
                    En cartera
                  </Text>
                </View>
              </View>
            }
            renderItem={({ item }) => {
              let priceColor =
                item.price_change_percentage_7d_in_currency == 0
                  ? COLORS.lightGray3
                  : item.price_change_percentage_7d_in_currency > 0
                  ? COLORS.lightGreen
                  : COLORS.red;
              return (
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    height: 55,
                  }}
                  onPress={() => {
                    setSelectedCoin(item);
                  }}
                >
                  {/* Asset */}
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      source={{ uri: item.image }}
                      style={{
                        width: 20,
                        height: 20,
                      }}
                    />
                    <Text
                      style={{
                        marginLeft: SIZES.radius,
                        color: COLORS.white,
                        ...FONTS.h4,
                      }}
                    >
                      {item.name}
                    </Text>
                  </View>

                  {/* Price */}
                  <View style={{ flex: 1, justifyContent: "center" }}>
                    <Text
                      style={{
                        textAlign: "right",
                        color: COLORS.white,
                        ...FONTS.h4,
                        lineHeight: 15,
                      }}
                    >
                      $ {item.current_price.toLocaleString()}
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "flex-end",
                      }}
                    >
                      {item.price_change_percentage_7d_in_currency != 0 && (
                        <Image
                          source={icons.upArrow}
                          style={{
                            height: 10,
                            width: 10,
                            tintColor: priceColor,
                            transform:
                              item.price_change_percentage_7d_in_currency > 0
                                ? [{ rotate: "45deg" }]
                                : [{ rotate: "125deg" }],
                          }}
                        />
                      )}

                      <Text
                        style={{
                          marginLeft: 5,
                          color: priceColor,
                          ...FONTS.body5,
                          lineHeight: 15,
                        }}
                      >
                        {item.price_change_percentage_7d_in_currency.toFixed(2)}{" "}
                        %
                      </Text>
                    </View>
                  </View>

                  {/* Holdings */}
                  <View style={{ flex: 1, justifyContent: "center" }}>
                    <Text
                      style={{
                        textAlign: "right",
                        color: COLORS.white,
                        ...FONTS.h4,
                        lineHeight: 15,
                      }}
                    >
                      $ {item.total.toLocaleString()}
                    </Text>
                    <Text
                      style={{
                        textAlign: "right",
                        color: COLORS.lightGray3,
                        ...FONTS.body5,
                        lineHeight: 15,
                      }}
                    >
                      {item.qty} {item.symbol.toUpperCase()}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </ScrollView>
      </LinearGradient>
    </MainLayout>
  );
};

function mapStateToProps(state) {
  return {
    myHoldings: state.marketReducer.myHoldings,
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
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio);
