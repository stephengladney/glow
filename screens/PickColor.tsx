import { StyleSheet, View } from "react-native"
import { Dispatch, SetStateAction } from "react"
import type { Color } from "../types"
import ColorPicker, { Panel3, Preview } from "reanimated-color-picker"

export function PickColorScreen({
  color,
  setColor,
}: {
  color: string
  setColor: Dispatch<SetStateAction<Color>>
}) {
  return (
    <View style={styles.container}>
      <ColorPicker
        value={color}
        onComplete={(colorObject) => {
          setColor(colorObject.hex)
        }}
        style={{ width: "80%" }}
      >
        <Panel3 />
        <Preview hideInitialColor hideText style={styles.previewStyle} />
      </ColorPicker>
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
  },
})
