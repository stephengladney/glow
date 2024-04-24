import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import type { Screen } from "../types"
import * as Brightness from "expo-brightness"
import type { ActionType } from "../types"
import Ionicons from "@expo/vector-icons/Ionicons"

export function Toolbar({
  actionButton,
  oldBrightness,
  screen,
  setActionButton,
  setScreen,
  takePicture,
}: {
  actionButton: ActionType
  color: string
  oldBrightness: number
  screen: Screen
  setActionButton: Dispatch<SetStateAction<ActionType>>
  setScreen: Dispatch<SetStateAction<Screen>>
  takePicture: Function
}) {
  const handlePhotoPress = async () => {
    await takePicture()
    setActionButton("preview")
  }

  const handlePreviewPress = async () => {
    await Brightness.setBrightnessAsync(1)
    setActionButton("photo")
  }

  const handleCancelPress = async () => {
    await Brightness.setBrightnessAsync(oldBrightness)
    setActionButton("preview")
  }

  return (
    <View style={styles.container}>
      {screen === "home" && (
        <>
          <TouchableOpacity
            onPress={() => setScreen("color")}
            style={styles.item}
          >
            <Ionicons
              name="color-filter-outline"
              size={35}
              style={styles.itemText}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={
              actionButton === "photo" ? handlePhotoPress : handlePreviewPress
            }
            style={[
              styles.item,
              actionButton === "photo" && {
                borderRadius: 50,
                borderColor: "#fff",
                borderWidth: 2,
              },
            ]}
          >
            <Ionicons
              name={
                actionButton === "photo" ? "camera-outline" : "sunny-outline"
              }
              size={35}
              style={styles.itemText}
            />
          </TouchableOpacity>
          {actionButton === "photo" && (
            <TouchableOpacity onPress={handleCancelPress} style={styles.item}>
              <Ionicons name="close" size={35} color="#fff" />
            </TouchableOpacity>
          )}
        </>
      )}
      {screen === "color" && (
        <TouchableOpacity
          onPress={() => setScreen("home")}
          style={{ alignSelf: "center" }}
        >
          <Text style={styles.itemText}>Back</Text>
        </TouchableOpacity>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingBottom: 60,
    position: "absolute",
    zIndex: 2,
    width: "100%",
  },
  item: {
    padding: 25,
  },
  itemText: {
    color: "#fff",
    textAlign: "center",
  },
})
