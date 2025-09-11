import { Stack } from 'expo-router'

export default function RoundLayout() {
  return (
    <Stack>
        <Stack.Screen name='index' options={{title: 'Round'}} />
        <Stack.Screen name='stype' options={{title: 'Storage Type'}} />
        <Stack.Screen name='sloc' options={{title: 'Storage Location'}} />
        <Stack.Screen name='sloc/count/index' options={{title: 'Count'}} />
        <Stack.Screen name='stype/count/index' options={{title: 'Count'}} />
    </Stack>
  )
}