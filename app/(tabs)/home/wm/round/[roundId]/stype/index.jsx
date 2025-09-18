import { Ionicons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, RefreshControl, Text, View } from 'react-native';
import { sleep } from '../../../..';
import styles from '../../../../../../../assets/styles/profile.styles';
import Loader from '../../../../../../../components/Loader';
import StypeCard from '../../../../../../../components/StypesCard';
import COLORS from '../../../../../../../constants/colors';
import { useKladStore } from '../../../../../../../store/kladStore';

export default function Stype() {
    const { roundId } = useLocalSearchParams();
    const [refreshing, setRefreshing] = useState(false);
    const { fetchStorageType, storageType, isLoading } = useKladStore();

    useEffect(() => {
        fetchStorageType(roundId)
      }, []);

    const handleRefresh = async () => {
        setRefreshing(true);
        await sleep(500);
        await fetchStorageType(roundId);
        setRefreshing(false);
    };

    if (isLoading && !refreshing) return <Loader />;

    return (
        <View style={styles.container}>
        <Stack.Screen options={{title: 'Storage Type - Round '+roundId }} />
        <FlatList
            data={storageType}
            renderItem={({item}) => <StypeCard item={item} round={roundId}/>}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.booksList}
            refreshControl={
            <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
                colors={[COLORS.primary]}
                tintColor={COLORS.primary}
            />
            }
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