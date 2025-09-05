import { Stack, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SafeScreen from "../components/SafeScreen";
import { useAuthStore } from "../store/authStore";

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();

  const {checkAuth, user, token} =  useAuthStore();
  const [ready, setReady] = useState(false);

  useEffect(()=>{
    (async () => {
      await checkAuth();   // tunggu proses checkAuth selesai
      setReady(true);      // baru izinkan navigasi
    })();
  }, []);

  useEffect(()=>{
    if (!ready) return;
    const inAuthScreen = segments[0] === '(auth)';
    const isSignedIn = user && token;

    if(!isSignedIn && !inAuthScreen) router.replace('/(auth)');
    else if(isSignedIn && inAuthScreen) router.replace('/(tabs)');

  }, [ready,user,token,segments]);
  
  return (
    <SafeAreaProvider>
      <SafeScreen>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="(auth)" />
        </Stack>
      </SafeScreen>
      <StatusBar style="dark" />
    </SafeAreaProvider>
  );
}
