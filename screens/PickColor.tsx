import { StyleSheet, Text, View } from "react-native"
import { ColorCell } from "../components/ColorCell"

export function PickColorScreen() {
  return (
    <View style={styles.container}>
      <ColorCell hex="#f00" />
      <ColorCell hex="#0f0" />
      <ColorCell hex="#00f" />
      <ColorCell hex="#fa0" />
      <ColorCell hex="#ff0" />
      <ColorCell hex="#0ff" />
      <ColorCell hex="#f0f" />
      <ColorCell hex="#6a49fd" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#334",
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
})
