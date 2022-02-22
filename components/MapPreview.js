import { Image, StyleSheet, View } from "react-native";

import { MAP } from "../constants";
import React from "react";

const MapPreview = ({ location, style, children }) => {
  const loc = location || {};
  const mapPreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?
      center=${loc.lat},${loc.lng}
      &zoom=13
      &size=600x300
      &maptype=roadmap
      &markers=color:blue%7Clabel:S%7C${loc.lat},${loc.lng}
      &key=${MAP.API_KEY}`;

  return (
    <View style={{ ...styles.mapPreview, ...style }}>
      {location ? (
        <Image style={styles.mapImage} source={{ uri: mapPreviewUrl }} />
      ) : (
        children
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mapPreview: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
  },
  mapImage: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
  },
});

export default MapPreview;
