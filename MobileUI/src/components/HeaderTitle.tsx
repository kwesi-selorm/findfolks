import { Text } from 'react-native'
import { appFont } from '../styles'

const HeaderTitle = ({ title }: { title: string }) => (
  <Text style={{ fontFamily: appFont.extraBold, fontSize: 23, marginLeft: 30 }}>{title}</Text>
)

export default HeaderTitle
