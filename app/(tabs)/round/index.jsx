import { Ionicons } from '@expo/vector-icons'
import { Stack, useLocalSearchParams } from 'expo-router'
import { FlatList, Text, View } from 'react-native'
import { dataRound } from '../../../assets/json/dummy'
import styles from '../../../assets/styles/profile.styles'
import RoundCard from '../../../components/RoundCard'
import COLORS from '../../../constants/colors'

export default function round() {
  const {code, name} = useLocalSearchParams();
  return (
    <View style={styles.container}>
      <Stack.Screen options={{title: name}} />
      <FlatList
        data={dataRound}
        renderItem={({item}) => <RoundCard item={item} code={code}/>}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.booksList}
        // refreshControl={
        //   <RefreshControl
        //     refreshing={refreshing}
        //     onRefresh={handleRefresh}
        //     colors={[COLORS.primary]}
        //     tintColor={COLORS.primary}
        //   />
        // }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons
              name="alert-circle-outline"
              size={50}
              color={COLORS.textSecondary}
            />
            <Text style={styles.emptyText}>Belum ada data</Text>
          </View>
        }
      />
    </View>
  )
}