import { COLORS, FONTS, SIZES, icons } from "../constants";
import { Image, Text, View } from "react-native";

import React from "react";

const BalanceInfo = ({ title, displayAmount, changePct, containerStyle }) => {
  const defaultOptions = {
    significantDigits: 2,
    thousandsSeparator: ",",
    decimalSeparator: ".",
    symbol: "$",
  };

  const currencyFormatter = (value, options) => {
    if (typeof value !== "number") value = 0.0;
    options = { ...defaultOptions, ...options };
    value = value.toFixed(options.significantDigits);

    const [currency, decimal] = value.split(".");
    return `${options.symbol} ${currency.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      options.thousandsSeparator
    )}${options.decimalSeparator}${decimal}`;
  };

  return (
    <View style={{ ...containerStyle }}>
      {/* Title */}
      <Text style={{ ...FONTS.h3, color: COLORS.lightGray3 }}>{title}</Text>

      {/* Figures */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-end",
        }}
      >
        <Text style={{ ...FONTS.h2, color: COLORS.white }}>
          {currencyFormatter(displayAmount, ",")}
        </Text>
        <Text style={{ color: COLORS.lightGray3, ...FONTS.h3 }}> USD</Text>
      </View>

      {/* Change Percentage */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-end",
        }}
      >
        {changePct != 0 && (
          <Image
            source={icons.upArrow}
            style={{
              width: 10,
              height: 10,
              alignSelf: "center",
              tintColor: changePct > 0 ? COLORS.lightGreen : COLORS.red,
              transform:
                changePct > 0 ? [{ rotate: "45deg" }] : [{ rotate: "125deg" }],
            }}
          />
        )}

        <Text
          style={{
            marginLeft: SIZES.base,
            alignSelf: "flex-end",
            color:
              changePct == 0
                ? COLORS.lightGray3
                : changePct > 0
                ? COLORS.lightGreen
                : COLORS.red,
            ...FONTS.h4,
          }}
        >
          {changePct.toFixed(2)}%
        </Text>

        <Text
          style={{
            marginLeft: SIZES.radius,
            alignSelf: "flex-end",
            color: COLORS.lightGray3,
            ...FONTS.h5,
          }}
        >
          Historial de 7 días
        </Text>
      </View>
    </View>
  );
};

export default BalanceInfo;
