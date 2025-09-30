import { Text, View } from 'react-native';
import COLORS from '../constants/colors';

export default function ReportCard({round, stype}) {
  return (
    <View style={{
          alignItems: "center",
          marginTop: 10,
        }}
      >
        <Text style={{
            fontSize: 18,
            fontWeight: "700",
            color: COLORS.textPrimary,
            marginBottom: 4,
            }}
        >Round {round}</Text>
        <Text style={{
            fontSize: 14,
            color: COLORS.textSecondary,
            textAlign: "center",
            }}
        >{stype}</Text>
    </View>
  )
}