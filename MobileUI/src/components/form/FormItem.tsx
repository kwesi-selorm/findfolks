import { ReactNode } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { appColors, appFont } from '../../styles'

const FormItem = ({ label, children }: { label: string; children: ReactNode }) => {
  return (
    <View style={styles.formItem}>
      <Text style={styles.label}>{label}</Text>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  formItem: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 10,
    width: '100%'
  },
  label: {
    // marginBottom: 5,
    fontFamily: appFont.bold,
    color: appColors.darkBlue
  }
})

export default FormItem
