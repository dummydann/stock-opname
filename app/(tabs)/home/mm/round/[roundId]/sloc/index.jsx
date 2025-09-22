import { Ionicons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, RefreshControl, Text, View } from 'react-native';
import { sleep } from '../../../..';
import styles from '../../../../../../../assets/styles/home.styles';
import Loader from '../../../../../../../components/Loader';
import SlocCard from '../../../../../../../components/SlocsCard';
import COLORS from '../../../../../../../constants/colors';
import { useKladStore } from '../../../../../../../store/kladStore';

export default function Sloc() {
    const { roundId } = useLocalSearchParams();
    const [refreshing, setRefreshing] = useState(false);
    const { fetchStorageLocation, storageLocation, isLoading } = useKladStore();

    useEffect(() => {
        fetchStorageLocation(roundId)
      }, []);

    const handleRefresh = async () => {
        setRefreshing(true);
        await sleep(500);
        await fetchStorageLocation(roundId);
        setRefreshing(false);
    };

    if (isLoading && !refreshing) return <Loader />;

    return (
        <View style={styles.container}>
        <Stack.Screen options={{title: 'Storage Location - Round '+roundId }} />
        {/* <View style={{
            backgroundColor: COLORS.background,
            padding: 16,
            paddingBottom: 0
        }}>
            <View style={styles2.inputContainer}>
            <Ionicons
                name="search-outline"
                size={20}
                color={COLORS.textSecondary}
                style={styles2.inputIcon}
            />
            <TextInput
                style={styles2.input}
                placeholder="Search..."
                placeholderTextColor={COLORS.placeholderText}
                // value={title}
                // onChangeText={setTitle}
            />
            </View>
        </View> */}
        <FlatList
            data={storageLocation}
            renderItem={({item}) => <SlocCard item={item} round={roundId}/>}
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