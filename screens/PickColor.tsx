import { StyleSheet, View } from "react-native"
import { Dispatch, SetStateAction } from "react"
import ColorPicker, { Panel3, Preview } from "reanimated-color-picker"
import { ColorCell } from "../components/ColorCell"
import { Screen } from "../types"

export function PickColorScreen({
  color,
  setColor,
  setScreen,
}: {
  color: string
  setColor: Dispatch<SetStateAction<string>>
  setScreen: Dispatch<SetStateAction<Screen>>
}) {
  return (
    <View style={styles.container}>
      {/* <ColorPicker
        value={color}
        onComplete={(colorObject) => {
          setColor(colorObject.hex)
        }}
        style={{ width: "50%" }}
      >
        <Panel3 />
        <Preview hideInitialColor hideText style={styles.previewStyle} />
      </ColorPicker> */}
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
  selectButtonText: {
    color: "#fff",
    fontSize: 20,
  },
  container: {
    alignItems: "center",
    backgroundColor: "#334",
    flex: 1,
    flexGrow: 1,
    justifyContent: "center",
  },
  previewStyle: {
    alignSelf: "center",
    height: 100,
    marginTop: 50,
    width: 100,
  },
  row: {
    flexDirection: "row",
    gap: 10,
    paddingVertical: 5,
  },
})
