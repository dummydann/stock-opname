import { Text, View } from 'react-native';
import styles from '../assets/styles/profile.styles';


export default function MaterialCard({item}) {
  return (
    <View style={styles.container}>
     <View style={styles.bookItem}>
        <View style={styles.bookInfo}>
          <Text style={styles.bookTitle}>{item.pid.material_id} - {item.pid.material.desc_material}</Text>
          <Text style={styles.bookCaption} numberOfLines={1}>
            PID: {item.pid.pid_number == null ? 'New PID' : item.pid.pid_number}
          </Text>
          <Text style={styles.bookCaption} numberOfLines={1}>
            Storage Bin: {item.pid.storage_bin}
          </Text>
          <Text style={styles.bookCaption} numberOfLines={1}>
            Batch: {item.pid.batch}
          </Text>
          <Text style={styles.bookCaption} numberOfLines={1}>
            Qty Count: {item.qty}
          </Text>
          <Text style={styles.bookCaption} numberOfLines={1}>
            Status:{" "}
            <Text
              style={{
                color:
                  item.status === 'equal'
                    ? "green"   // equal
                    : item.status == 0
                    ? "red"     // positif
                    : "red",    // negatif
              }}
            >
              {item.status == 'equal' ? "Equal" : "Selisih"}
            </Text>
          </Text>
          <Text style={styles.bookDate}>{new Date(item.created_at).toLocaleDateString()}</Text>
        </View>
      </View>
    </View>
  )
}