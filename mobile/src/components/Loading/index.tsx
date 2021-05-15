import React from "react";
import { View, Image, Text } from "react-native";

import imgLoading from "../../assets/images/loading.gif";

import styles from "./styles";

function Loading() {
  return (
    <View style={styles.container}>
      <Image source={imgLoading} />
      <Text style={styles.text}>Buscando Proffys...</Text>
    </View>
  );
}

export default Loading;
