import { StatusBar } from "expo-status-bar"
import { StyleSheet, Text, View } from "react-native"
import { useEffect, useRef, useState } from "react"
import { PickColorScreen } from "./screens/PickColor"
import { Toolbar } from "./components/Toolbar"
import type { Color, Screen } from "./types"
import * as Brightness from "expo-brightness"
import { Camera, CameraType } from "expo-camera"
import * as MediaLibrary from "expo-media-library"

export default function App() {
  const [screen, setScreen] = useState<Screen>("home")
  const [color, setColor] = useState<Color>("#ff0000")
  const [status, requestCameraPermission] = Camera.useCameraPermissions()
  const [showConfirmation, setShowConfirmation] = useState(false)
  const cameraRef = useRef(null)

  useEffect(() => {
    Brightness.requestPermissionsAsync().then(() => {
      requestCameraPermission().then(() => {
        MediaLibrary.requestPermissionsAsync()
      })
    })
  }, [])

  useEffect(() => {
    if (showConfirmation) setTimeout(() => setShowConfirmation(false), 1000)
  }, [showConfirmation])

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync()
      await MediaLibrary.createAssetAsync(photo.uri)
      setShowConfirmation(true)
    }
  }

  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <StatusBar style="auto" />
      {screen === "color" && (
        <PickColorScreen color={color} setColor={setColor} />
      )}
      {screen === "home" && (
        <Camera
          onMountError={(e) => alert(JSON.stringify(e))}
          ref={cameraRef}
          style={styles.cameraStyle}
          type={CameraType.front}
        ></Camera>
      )}
      {showConfirmation && (
        <Text style={styles.confirmationText}>Photo taken!</Text>
      )}
      <Toolbar
        color={color}
        screen={screen}
        setScreen={setScreen}
        takePicture={takePicture}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  cameraStyle: {
    alignSelf: "center",
    height: 100,
    position: "absolute",
    top: 100,
    width: 100,
  },
  container: {
    // flex: 1,
    flexGrow: 1,
    backgroundColor: "#000",
    alignItems: "stretch",
    justifyContent: "center",
  },
  confirmationText: {
    color: "#fff",
    fontSize: 40,
    textAlign: "center",
  },
})
