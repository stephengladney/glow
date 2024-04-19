import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import type { Color, Screen } from "../types"
import * as Brightness from "expo-brightness"
import { Camera, CameraType } from "expo-camera"

function getButtonTextColor(color: Color) {
  switch (color) {
    case "#00ffff":
    case "#ffff00":
    case "#00ff00":
      return "#000"
    default:
      return "#fff"
  }
}

export function Toolbar({
  color,
  setScreen,
  takePicture,
}: {
  color: Color
  setScreen: Dispatch<SetStateAction<Screen>>
  takePicture: Function
}) {
  const [oldBrightness, setOldBrightness] = useState(0)

  useEffect(() => {
    Brightness.getBrightnessAsync()
      .then((val) => setOldBrightness(val))
      .catch((e) => alert(JSON.stringify(e)))
  }, [])

  const handlePhotoPress = () => {
    Brightness.setBrightnessAsync(100)
      .then(() => {
        setTimeout(() => {
          takePicture().then(Brightness.setBrightnessAsync(oldBrightness))
        }, 2000)
      })
      .catch((e) => console.log(e))
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setScreen("color")} style={styles.item}>
        <Text style={[styles.itemText, { color: getButtonTextColor(color) }]}>
          Pick color
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handlePhotoPress} style={styles.item}>
        <Text style={[styles.itemText, { color: getButtonTextColor(color) }]}>
          Take photo
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    bottom: 0,
    flexDirection: "row",
    paddingBottom: 60,
    position: "absolute",
    zIndex: 2,
  },
  item: {
    width: "50%",
  },
  itemText: {
    fontSize: 18,
    textAlign: "center",
  },
})
