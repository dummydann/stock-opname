import { Text, View } from 'react-native';
import styles from '../assets/styles/profile.styles';


export default function MaterialCard({item}) {
  console.log(item);
  
  return (
     <View style={styles.container}>
     <View style={styles.bookItem}>
      <View style={styles.bookInfo}>
        <Text style={styles.bookTitle}>{item.pid.material_id} - {item.pid.material.desc_material}</Text>
        <Text style={styles.bookCaption} numberOfLines={2}>
          PID: {item.pid.pid_number == null ? 'New PID' : item.pid.pid_number}
        </Text>
        <Text style={styles.bookCaption} numberOfLines={2}>
          Batch: {item.pid.batch}
        </Text>
        <Text style={styles.bookCaption} numberOfLines={2}>
          Qty Count: {item.qty}
        </Text>
        <Text style={styles.bookCaption} numberOfLines={2}>
          Status:{" "}
          <Text
            style={{
              color:
                item.status === 'equal'
                  ? "green"   // equal
                  : "red"
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