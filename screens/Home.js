import { COLORS, FONTS, SIZES, data, icons } from "../constants";
import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useState } from "react";
import { getCoinMarket, getHoldings } from "../stores/market/marketActions";

import { LinearGradient } from "expo-linear-gradient";
import { MainLayout } from "./";
import { connect } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";

const Home = ({
  getHoldings,
  getCoinMarket,
  myHoldings,
  coins,
  navigation,
}) => {
  const [selectedCoin, setSelectedCoin] = useState(null);

  useFocusEffect(
    useCallback(() => {
      getHoldings((holdings = data.holdings));
      getCoinMarket();
    }, [])
  );

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
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingHorizontal: SIZES.radius,
                paddingTop: SIZES.radius,
                paddingBottom: SIZES.radius,
              }}
            >
              <TouchableOpacity
                style={{
                  borderRadius: 12,
                  backgroundColor: COLORS.blurBlack,
                  padding: 10,
                  borderWidth: 1,
                  borderColor: COLORS.gray,
                }}
                onPress={() => console.log("Scan")}
              >
                <Image
                  style={{
                    width: 30,
                    height: 30,
                  }}
                  source={icons.scan}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  height: 30,
                  width: 30,
                }}
                onPress={() => console.log("Home")}
              >
                <Image
                  style={{
                    width: 30,
                    height: 30,
                  }}
                  source={icons.logo}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  borderRadius: 12,
                  backgroundColor: COLORS.blurBlack,
                  padding: 10,
                  borderWidth: 1,
                  borderColor: COLORS.gray,
                }}
                onPress={() =>
                  navigation.navigate("Notifications", {
                    title: "Notificaciones",
                  })
                }
              >
                <Image
                  style={{
                    width: 30,
                    height: 30,
                  }}
                  source={icons.bell}
                />
              </TouchableOpacity>
            </View>

            {/* Section Title */}
            <View
              style={{
                marginTop: SIZES.padding,
                paddingHorizontal: SIZES.radius,
              }}
            >
              <Text style={{ ...FONTS.h2, color: COLORS.white }}>Acciones</Text>
            </View>

            {/* Menu options */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginHorizontal: SIZES.radius,
                padding: SIZES.radius,
              }}
            >
              <View
                style={{
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  style={{
                    height: 60,
                    width: 60,
                    borderRadius: 12,
                    backgroundColor: COLORS.blurBlack,
                    padding: 10,
                    borderWidth: 1,
                    borderColor: COLORS.secondary,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onPress={() => navigation.navigate("Checkout")}
                >
                  <Image
                    style={{
                      width: 30,
                      height: 30,
                    }}
                    source={icons.add}
                  />
                </TouchableOpacity>
                <Text
                  style={{
                    ...FONTS.body5,
                    textAlign: "center",
                    color: COLORS.white,
                  }}
                >
                  Comprar
                </Text>
              </View>
              <View
                style={{
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  style={{
                    height: 60,
                    width: 60,
                    borderRadius: 12,
                    backgroundColor: COLORS.blurBlack,
                    padding: 10,
                    borderWidth: 1,
                    borderColor: COLORS.secondary,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onPress={() => navigation.navigate("Sell")}
                >
                  <Image
                    style={{
                      width: 30,
                      height: 30,
                    }}
                    source={icons.minus}
                  />
                </TouchableOpacity>
                <Text
                  style={{
                    ...FONTS.body5,
                    textAlign: "center",
                    color: COLORS.white,
                  }}
                >
                  Vender
                </Text>
              </View>
              <View
                style={{
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  style={{
                    height: 60,
                    width: 60,
                    borderRadius: 12,
                    backgroundColor: COLORS.blurBlack,
                    padding: 10,
                    borderWidth: 1,
                    borderColor: COLORS.secondary,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onPress={() => navigation.navigate("Withdraw")}
                >
                  <Image
                    style={{
                      width: 30,
                      height: 30,
                    }}
                    source={icons.arrowTop}
                  />
                </TouchableOpacity>
                <Text
                  style={{
                    ...FONTS.body5,
                    textAlign: "center",
                    color: COLORS.white,
                  }}
                >
                  Transferir
                </Text>
              </View>
              <View
                style={{
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  style={{
                    height: 60,
                    width: 60,
                    borderRadius: 12,
                    backgroundColor: COLORS.blurBlack,
                    padding: 10,
                    borderWidth: 1,
                    borderColor: COLORS.secondary,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onPress={() => navigation.navigate("Deposit")}
                >
                  <Image
                    style={{
                      width: 30,
                      height: 30,
                    }}
                    source={icons.arrowBottom}
                  />
                </TouchableOpacity>
                <Text
                  style={{
                    ...FONTS.body5,
                    color: COLORS.white,
                    textAlign: "center",
                  }}
                >
                  Ingresar
                </Text>
              </View>
            </View>

            {/* Favorite Cryptos */}
            {/* Section Title */}
            <View
              style={{
                marginTop: SIZES.padding,
                paddingHorizontal: SIZES.radius,
              }}
            >
              <Text style={{ ...FONTS.h2, color: COLORS.white }}>
                Mis favoritos
              </Text>
            </View>

            {/* Your Assets */}
            <View
              style={{
                paddingBottom: 0,
                marginBottom: 0,
              }}
            >
              <FlatList
                data={myHoldings}
                keyExtractor={(item) => `${item.id}`}
                contentContainerStyle={{
                  marginTop: SIZES.radius,
                  marginLeft: SIZES.radius,
                  marginRight: SIZES.radius,
                  paddingHorizontal: SIZES.padding,
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
                        marginTop: SIZES.padding,
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
                        Precio
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
                                  item.price_change_percentage_7d_in_currency >
                                  0
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
                            {item.price_change_percentage_7d_in_currency.toFixed(
                              2
                            )}{" "}
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
            </View>

            {/* Section Title */}
            <View
              style={{
                marginTop: SIZES.padding,
                paddingHorizontal: SIZES.radius,
              }}
            >
              <Text style={{ ...FONTS.h2, color: COLORS.white }}>
                Top Crytomonedas
              </Text>
            </View>

            {/* Top Cryptocurrency */}
            <View>
              <FlatList
                data={coins}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{
                  marginTop: SIZES.radius,
                  marginHorizontal: SIZES.radius,
                  marginBottom: SIZES.padding,
                  paddingHorizontal: SIZES.padding,
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
                        marginTop: SIZES.padding,
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
                        Precio
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
                        height: 55,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      onPress={() => setSelectedCoin(item)}
                    >
                      {/* Logo */}
                      <View
                        style={{
                          width: 35,
                        }}
                      >
                        <Image
                          source={{ uri: item.image }}
                          style={{
                            height: 20,
                            width: 20,
                          }}
                        />
                      </View>

                      {/* Name */}
                      <View
                        style={{
                          flex: 1,
                        }}
                      >
                        <Text style={{ color: COLORS.white, ...FONTS.h3 }}>
                          {item.name}
                        </Text>
                      </View>

                      {/* Figures */}
                      <View>
                        <Text
                          style={{
                            textAlign: "right",
                            color: COLORS.white,
                            ...FONTS.h4,
                          }}
                        >
                          $ {item.current_price}
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
                                  item.price_change_percentage_7d_in_currency >
                                  0
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
                            {item.price_change_percentage_7d_in_currency.toFixed(
                              2
                            )}
                            %
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
