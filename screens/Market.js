import {
  Animated,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS, FONTS, SIZES, constants, icons } from "../constants";
import { HeaderBar, TextButton } from "../components";
import React, {
  createRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { LineChart } from "react-native-chart-kit";
import { LinearGradient } from "expo-linear-gradient";
import { MainLayout } from "./";
import { connect } from "react-redux";
import { getCoinMarket } from "../stores/market/marketActions";

const marketTabs = constants.marketTabs.map((marketTab) => ({
  ...marketTab,
  ref: createRef(),
}));

const TabIndicator = ({ measureLayout, scrollX }) => {
  const inputRange = marketTabs.map((_, i) => i * SIZES.width);

  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: measureLayout.map((measure) => measure.x),
  });

  return (
    <Animated.View
      style={{
        position: "absolute",
        left: 0,
        height: "100%",
        width: (SIZES.width - SIZES.radius * 2) / 2,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.lightGray,
        transform: [
          {
            translateX,
          },
        ],
      }}
    />
  );
};

const Tabs = ({ scrollX, onMarketTabPress }) => {
  const [measureLayout, setMeasureLayout] = useState([]);
  const containerRef = useRef();

  useEffect(() => {
    let ml = [];

    marketTabs.forEach((marketTab) => {
      marketTab?.ref?.current?.measureLayout(
        containerRef.current,
        (x, y, width, height) => {
          ml.push({
            x,
            y,
            width,
            height,
          });

          if (ml.length === marketTabs.length) {
            setMeasureLayout(ml);
          }
        }
      );
    });
  }, [containerRef.current]);

  return (
    <View
      ref={containerRef}
      style={{
        flexDirection: "row",
      }}
    >
      {/* Tab Indicator */}
      {measureLayout.length > 0 && (
        <TabIndicator measureLayout={measureLayout} scrollX={scrollX} />
      )}

      {/* Tabs */}
      {marketTabs.map((item, index) => {
        return (
          <TouchableOpacity
            key={`MarketTab-${index}`}
            style={{
              flex: 1,
            }}
            onPress={() => onMarketTabPress(index)}
          >
            <View
              ref={item.ref}
              style={{
                paddingHorizontal: 15,
                alignItems: "center",
                justifyContent: "center",
                height: 40,
              }}
            >
              <Text style={{ color: COLORS.white, ...FONTS.h3 }}>
                {item.title}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const Market = ({ getCoinMarket, coins }) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const marketTabScrollViewRef = useRef();

  const onMarketTabPress = useCallback((marketTabIndex) => {
    marketTabScrollViewRef?.current?.scrollToOffset({
      offset: marketTabIndex * SIZES.width,
    });
  });

  useEffect(() => {
    getCoinMarket();
  }, []);

  function renderTabBar() {
    return (
      <View
        style={{
          marginTop: SIZES.radius,
          borderRadius: 13,
          backgroundColor: COLORS.blurBlack,
          borderWidth: 1,
          borderColor: COLORS.gray,
        }}
      >
        <Tabs scrollX={scrollX} onMarketTabPress={onMarketTabPress} />
      </View>
    );
  }

  function renderButtons() {
    return (
      <View
        style={{
          flexDirection: "row",
          marginTop: SIZES.radius,
          paddingBottom: 0,
          marginBottom: 0,
        }}
      >
        <TextButton
          label="USD"
          containerStyle={{
            marginLeft: SIZES.base,
            borderWidth: 1,
            backgroundColor: COLORS.primary,
            borderColor: COLORS.secondary,
          }}
        />

        <TextButton
          label="% (7d)"
          containerStyle={{
            marginLeft: SIZES.base,
            borderWidth: 1,
            backgroundColor: COLORS.primary,
            borderColor: COLORS.secondary,
          }}
        />

        <TextButton
          label="Top"
          containerStyle={{
            marginLeft: SIZES.base,
            borderWidth: 1,
            backgroundColor: COLORS.primary,
            borderColor: COLORS.secondary,
          }}
        />
      </View>
    );
  }

  function renderList() {
    return (
      <Animated.FlatList
        ref={marketTabScrollViewRef}
        data={marketTabs}
        horizontal
        pagingEnabled
        scrollEventThrottle={16}
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          {
            useNativeDriver: false,
          }
        )}
        renderItem={({ item, index }) => {
          return (
            <View
              style={{
                flex: 1,
                width: SIZES.width,
              }}
            >
              <FlatList
                data={coins}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{
                  marginTop: SIZES.radius,
                  marginLeft: SIZES.radius,
                  marginRight: SIZES.radius,
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
                    </View>
                  </View>
                }
                renderItem={({ item, index }) => {
                  let priceColor =
                    item.price_change_percentage_7d_in_currency == 0
                      ? COLORS.lightGray3
                      : item.price_change_percentage_7d_in_currency > 0
                      ? COLORS.lightGreen
                      : COLORS.red;

                  return (
                    <View
                      style={{
                        flexDirection: "row",
                        marginTop: SIZES.radius,
                      }}
                    >
                      {/* Coins */}
                      <View
                        style={{
                          flex: 1.5,
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <Image
                          source={{ uri: item.image }}
                          style={{
                            height: 20,
                            width: 20,
                          }}
                        />

                        <Text
                          style={{
                            marginLeft: SIZES.radius,
                            color: COLORS.white,
                            ...FONTS.h3,
                          }}
                        >
                          {item.name}
                        </Text>
                      </View>

                      {/* Line Chart */}
                      <View
                        style={{
                          flex: 1,
                          alignItems: "center",
                        }}
                      >
                        <LineChart
                          withVerticalLabels={false}
                          withHorizontalLabels={false}
                          withDots={false}
                          withInnerLines={false}
                          withVerticalLines={false}
                          withOuterLines={false}
                          data={{
                            datasets: [
                              {
                                data: item.sparkline_in_7d.price,
                              },
                            ],
                          }}
                          width={100}
                          height={60}
                          chartConfig={{
                            color: () => priceColor,
                            backgroundColor: COLORS.transparent,
                          }}
                          bezier
                          style={{
                            paddingRight: 0,
                            backgroundColor: COLORS.transparent,
                          }}
                        />
                      </View>

                      {/* Figures */}
                      <View
                        style={{
                          flex: 1,
                          alignItems: "flex-end",
                          justifyContent: "center",
                        }}
                      >
                        <Text
                          style={{
                            color: COLORS.white,
                            ...FONTS.h4,
                          }}
                        >
                          $ {item.current_price}
                        </Text>

                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "flex-end",
                            alignItems: "center",
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
                            }}
                          >
                            {item.price_change_percentage_7d_in_currency.toFixed(
                              2
                            )}
                            %
                          </Text>
                        </View>
                      </View>
                    </View>
                  );
                }}
              />
            </View>
          );
        }}
      />
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
          <View
            style={{
              borderBottomLeftRadius: 25,
              borderBottomRightRadius: 25,
              paddingHorizontal: SIZES.radius,
              paddingBottom: SIZES.padding,
            }}
          >
            {/* Header */}
            <HeaderBar title="Mercado" />

            {/* Tab Bar */}
            {renderTabBar()}

            {/* Buttons */}
            {renderButtons()}
          </View>
          {/* Market List */}

          {renderList()}
          <View style={{ height: 20 }}></View>
        </ScrollView>
      </LinearGradient>
    </MainLayout>
  );
};

function mapStateToProps(state) {
  return {
    coins: state.marketReducer.coins,
  };
}

function mapDispatchToProps(dispatch) {
  return {
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

export default connect(mapStateToProps, mapDispatchToProps)(Market);
