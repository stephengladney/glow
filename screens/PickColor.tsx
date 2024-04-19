import { StyleSheet, Text, View } from "react-native"
import { ColorCell } from "../components/ColorCell"
import { Dispatch, SetStateAction } from "react"
import type { Color, Screen } from "../types"

export function PickColorScreen({
  setColor,
  setScreen,
}: {
  setColor: Dispatch<SetStateAction<Color>>
  setScreen: Dispatch<SetStateAction<Screen>>
}) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <ColorCell hex="#ff0000" setColor={setColor} setScreen={setScreen} />
        <ColorCell hex="#00ff00" setColor={setColor} setScreen={setScreen} />
        <ColorCell hex="#0000ff" setColor={setColor} setScreen={setScreen} />
      </View>
      <View style={styles.row}>
        <ColorCell hex="#ffaa00" setColor={setColor} setScreen={setScreen} />
        <ColorCell hex="#ffff00" setColor={setColor} setScreen={setScreen} />
        <ColorCell hex="#00ffff" setColor={setColor} setScreen={setScreen} />
      </View>
      <View style={styles.row}>
        <ColorCell hex="#ff88ff" setColor={setColor} setScreen={setScreen} />
        <ColorCell hex="#ff00ff" setColor={setColor} setScreen={setScreen} />
        <ColorCell hex="#6a49fd" setColor={setColor} setScreen={setScreen} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#334",
    flex: 1,
    flexGrow: 1,
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
  },
})
