// import { Redirect } from 'expo-router';
// import 'react-native-reanimated';

import { Stack } from 'expo-router';
import SplashScreen from './SplashScreen';



// export default function Index() {
//   return <Redirect href="/(tabs)" />;
// } 


export default function Index() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SplashScreen />
    </>
  );
}
