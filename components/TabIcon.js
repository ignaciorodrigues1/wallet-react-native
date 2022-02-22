import { COLORS, FONTS } from "../constants";
import { Image, Text, View } from "react-native";

import React from "react";

const TabIcon = ({ focused, icon, iconStyle, label, isTrade }) => {
  if (isTrade) {
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          width: 60,
          height: 60,
          borderRadius: 16,
          transform: [
            { rotate: "45deg" },
            { translateY: -20 },
            { translateX: -20 },
          ],
          backgroundColor: COLORS.white,
        }}
      >
        <Image
          source={icon}
          resizeMode="contain"
          style={{
            width: 30,
            height: 30,
            tintColor: COLORS.primary,
            transform: [{ rotate: "-45deg" }],
            ...iconStyle,
          }}
        />
        {/*<Text style={{ color: COLORS.white, ...FONTS.h4 }}>{label}</Text>*/}
      </View>
    );
  } else {
    return (
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Image
          source={icon}
          resizeMode="contain"
          style={{
            width: 25,
            height: 25,
            tintColor: focused ? COLORS.white : COLORS.secondary,
            ...iconStyle,
          }}
        />
        <Text
          style={{
            color: focused ? COLORS.white : COLORS.secondary,
            ...FONTS.body5,
          }}
        >
          {label}
        </Text>
      </View>
    );
  }
};

export default TabIcon;
