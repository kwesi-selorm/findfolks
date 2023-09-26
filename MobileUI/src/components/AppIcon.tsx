import { Icon, IconProps } from '@rneui/themed'
import {View} from "react-native";

interface AppIconProps extends IconProps {
  name: string
  color?: string
  type: string
  onPress: () => void
}

const AppIcon = ({ name, color, type, onPress }: AppIconProps) => {
  return (
    <View>
      <Icon name={name} color={color} type={type} onPress={onPress} />
    </View>
  )
}

export default AppIcon
