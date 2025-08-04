import { API_ENDPOINTS } from "@/config/api";
import colors from "@/utils/colors";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import DocumentScanner from "react-native-document-scanner-plugin";
import { SafeAreaView } from "react-native-safe-area-context";

const DocumentScannerComponent: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [passengerData, setPassengerData] = useState<any>({});
  // const [scannedImage, setScannedImage] = useState<string | undefined>();
  console.log("taking images v2");

  const scanDocument = async (): Promise<void> => {
    try {
      const { scannedImages } = await DocumentScanner.scanDocument({
        maxNumDocuments: 2,
        // responseType: "base64",
        // filter: "none",
        // letUserApplyFilters: false,
        // letUserAdjustEnhancements: false,
        // letUserAdjustCrop: true,
      });
      console.log("images", scannedImages);
      if (scannedImages && scannedImages.length > 0) {
        // setScannedImage(scannedImages[0]);
        setImages(scannedImages);
      }
    } catch (error) {
      console.error("Failed to scan document:", error);
      // You can show an alert or fallback UI here if needed
    } finally {
      setLoading(false);
    }
  };

  const fetchPassportData = async () => {
    console.log("sending to server v2");
    const formData = new FormData();
    if (images.length === 0) {
      return;
    }
    formData.append("top_image", {
      uri: images[0],
      type: "image/jpeg",
      name: images[0]?.split("/")?.pop(),
    } as any);
    formData.append("bottom_image", {
      uri: images[1],
      type: "image/jpeg",
      name: images[1]?.split("/")?.pop(),
    } as any);
    console.log("formData", formData);

    try {
      const response = await fetch(
        `${API_ENDPOINTS?.PASSPORT?.GET_PASSPORT_INFO}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzU2ODE1NTU5LCJqdGkiOiJhODM4MjcwNjc2MDM0NzQ1YmY5YzE1YjRhY2Y4OTk3YiIsInVzZXJfaWQiOjJ9.0gAKXSPfP-fCIsJinoLjXJqryWvpF0BZTg73M8P8hII`,
          },
          body: formData,
        }
      );

      const result = await response.json();

      console.log("result", result);
      if (result?.passenger_info) {
        setPassengerData(result?.passenger_info);
      }
    } catch (error) {
    } finally {
      console.log("finally completed");
      setImages([]);
    }
  };

  // console.log("img", images);

  useEffect(() => {
    scanDocument();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      {loading ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : images.length > 0 ? (
        <View style={styles.container}>
          <View style={styles.ImageContainer}>
            <View style={styles.uploadArea}>
              <Image
                source={{ uri: images[0] }}
                style={styles.passportImage}
                resizeMode="contain"
              />
            </View>
            <View style={styles.uploadArea}>
              <Image
                source={{ uri: images[1] }}
                style={styles.passportImage}
                resizeMode="contain"
              />
            </View>
          </View>
          {/* {images.map((uri, index) => (
              <Image
                key={index}
                resizeMode="contain"
                style={styles.image}
                source={{ uri }}
              />
            ))} */}
          <TouchableOpacity style={styles.button} onPress={fetchPassportData}>
            <Text style={styles.buttonText}>Send To Server</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          {passengerData?.name ? (
            <>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 16,
                }}
              >
                <View
                  style={{
                    padding: 30,
                  }}
                >
                  <Text>Name: {passengerData?.name}</Text>
                  <Text>Father Name: {passengerData?.father_name}</Text>
                  <Text>Mother Name: {passengerData?.mother_name}</Text>
                  <Text>Spouse Name: {passengerData?.spouse_name}</Text>
                  <Text>Gender: {passengerData?.gender}</Text>
                  <Text>Place of Birth: {passengerData?.place_of_birth}</Text>
                  <Text>Date of Birth: {passengerData?.date_of_birth}</Text>
                  <Text>Date of Issue: {passengerData?.date_of_issue}</Text>
                  <Text>Date of Expiry: {passengerData?.date_of_expiry}</Text>
                  <Text>Passport Number: {passengerData?.passport_number}</Text>
                  <Text>NID Number: {passengerData?.nid_number}</Text>
                  <Text>Telephone No: {passengerData?.address}</Text>
                </View>
                <TouchableOpacity style={styles.button} onPress={scanDocument}>
                  <Text style={styles.buttonText}>Scan Again</Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View style={styles.noDataContainer}>
                <Text style={styles.text}>No document scanned.</Text>
                <TouchableOpacity style={styles.button} onPress={scanDocument}>
                  <Text style={styles.buttonText}>Scan Again</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContainer: {
    alignItems: "center",
    padding: 10,
  },
  image: {
    width: 300,
    height: 400,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 16,
  },
  noDataContainer: {
    alignItems: "center",
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#007AFF",
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  ImageContainer: {
    padding: 16,
    paddingBottom: 16,
  },
  uploadArea: {
    width: 300,
    height: 200,
    borderWidth: 1,
    borderColor: colors.neutral[200],
    borderRadius: 6,
    borderStyle: "dashed",
    overflow: "hidden",
    marginBottom: 6,
  },
  uploadPlaceholder: {
    flex: 1,
    backgroundColor: colors.neutral[50],
    alignItems: "center",
    justifyContent: "center",
  },
  passportImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});

export default DocumentScannerComponent;
