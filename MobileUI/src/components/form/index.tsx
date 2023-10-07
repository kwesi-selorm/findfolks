import { FC, ReactNode } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import { widths } from '../../styles'

type FormProps = {
  children: ReactNode
}

const Form: FC<FormProps> = ({ children }) => {
  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>
}

const styles = StyleSheet.create({
  container: {
    // width: '100%'
    textAlign: 'left',
    marginTop: '30%',
    height: '100%',
    minWidth: widths.formWidth
  }
})

export default Form
