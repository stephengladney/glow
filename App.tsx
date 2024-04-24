import { StatusBar } from "expo-status-bar"
import { StyleSheet, Text, View } from "react-native"
import { useEffect, useRef, useState } from "react"
import { PickColorScreen } from "./screens/PickColor"
import { Toolbar } from "./components/Toolbar"
import type { Screen } from "./types"
import * as Brightness from "expo-brightness"
import { Camera, CameraType } from "expo-camera"
import * as MediaLibrary from "expo-media-library"
import type { ActionType } from "./types"

export default function App() {
  const [screen, setScreen] = useState<Screen>("home")
  const [color, setColor] = useState("#ff0000")
  const [countdown, setCountdown] = useState<number>(3)
  const [isCountingDown, setIsCountingDown] = useState(false)
  const [_status, requestCameraPermission] = Camera.useCameraPermissions()
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [actionButton, setActionButton] = useState<ActionType>("preview")
  const [oldBrightness, setOldBrightness] = useState(0)
  const cameraRef = useRef(null)

  useEffect(() => {
    Brightness.requestPermissionsAsync().then(() => {
      requestCameraPermission().then(() => {
        MediaLibrary.requestPermissionsAsync()
      })
    })
  }, [])

  useEffect(() => {
    Brightness.getBrightnessAsync()
      .then((val) => setOldBrightness(val))
      .catch((e) => alert(JSON.stringify(e)))
  }, [])

  useEffect(() => {
    if (isCountingDown) {
      setTimeout(() => setCountdown((countdown) => countdown - 1), 1000)
    }
  }, [isCountingDown])

  useEffect(() => {
    if (countdown !== 3 && countdown !== 0) {
      setTimeout(() => setCountdown((countdown) => countdown - 1), 1000)
    } else if (countdown === 0) {
      setIsCountingDown(false)
      setCountdown(3)
      takePicture()
    }
  }, [countdown])

  useEffect(() => {
    if (showConfirmation)
      setTimeout(() => {
        setShowConfirmation(false)
        Brightness.setBrightnessAsync(oldBrightness)
      }, 1000)
  }, [showConfirmation])

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync()
      await MediaLibrary.createAssetAsync(photo.uri)
      setShowConfirmation(true)
    }
  }

  const handlePhotoPress = () => {
    setIsCountingDown(true)
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
      {isCountingDown && <Text style={styles.countdownText}>{countdown}</Text>}
      {showConfirmation && (
        <Text style={styles.confirmationText}>Photo taken!</Text>
      )}
      <Toolbar
        actionButton={actionButton}
        color={color}
        oldBrightness={oldBrightness}
        screen={screen}
        setActionButton={setActionButton}
        setScreen={setScreen}
        takePicture={handlePhotoPress}
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
  countdownText: {
    color: "#fff",
    fontSize: 120,
    textAlign: "center",
  },
})
