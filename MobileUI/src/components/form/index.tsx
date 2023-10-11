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
    width: '70%',
    textAlign: 'left',
    marginTop: '50%',
    height: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    minWidth: widths.formWidth
  }
})

export default Form
