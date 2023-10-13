import { StyleSheet, View } from 'react-native'
import { FC, ReactNode } from 'react'

type ButtonsGroupProps = {
  children: ReactNode
  direction?: 'row' | 'column'
}

const ButtonGroup: FC<ButtonsGroupProps> = ({ children, direction }) => {
  const styles = StyleSheet.create({
    row: {
      display: 'flex',
      flexDirection: direction ?? 'row',
      gap: 10,
      justifyContent: 'center',
      marginLeft: 'auto',
      marginRight: 'auto',
      marginVertical: 40
    }
  })

  return <View style={styles.row}>{children}</View>
}

export default ButtonGroup
