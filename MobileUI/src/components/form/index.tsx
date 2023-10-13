import { FC, ReactNode } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'

type FormProps = {
  children: ReactNode
}

const Form: FC<FormProps> = ({ children }) => {
  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    maxHeight: '60%',
    marginLeft: 'auto',
    marginRight: 'auto'
  }
})

export default Form
