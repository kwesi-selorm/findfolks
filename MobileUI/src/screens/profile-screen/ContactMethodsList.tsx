import { Dispatch, FC, MutableRefObject, SetStateAction, useRef } from 'react'
import { FlatList, Pressable, StyleSheet, Text } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { ContactMethod, EditProfileFormValues } from '../../@types'
import profile from '../../mock-data/profile'
import { appColors, appFont } from '../../styles'
import { contactMethodNames } from '../../util/constants'
import { Contact } from './EditProfileForm'

type ContacMethodsListProps = {
  initialValues: EditProfileFormValues
  setValues: Dispatch<SetStateAction<EditProfileFormValues>>
}

type ContactMethodItemProps = {
  item: Contact
  preferredContactMethod: number
  contactMethodRef: MutableRefObject<number>
  setValues: Dispatch<SetStateAction<EditProfileFormValues>>
}

export const contactMethods: Contact[] = [
  {
    icon: <MCIcon name="email" size={20} color="#DB4437" />,
    name: contactMethodNames[ContactMethod.Email],
    index: ContactMethod.Email
  },
  {
    icon: <Icon name="facebook-square" size={20} color="#4267B2" />,
    name: contactMethodNames[ContactMethod.Facebook],
    index: ContactMethod.Facebook
  },
  {
    icon: <Icon name="snapchat" size={20} color="#FFFC00" />,
    name: contactMethodNames[ContactMethod.Snapchat],
    index: ContactMethod.Snapchat
  },
  {
    icon: <Icon name="twitter" size={20} color="#26a7de" />,
    name: contactMethodNames[ContactMethod.Twitter],
    index: ContactMethod.Twitter
  },
  {
    icon: <Icon name="mobile" size={20} color={appColors.grey} />,
    name: contactMethodNames[ContactMethod.Mobile],
    index: ContactMethod.Mobile
  }
]

const ContactMethodsList: FC<ContacMethodsListProps> = ({ initialValues, setValues }) => {
  const contactMethodRef = useRef<number>(initialValues.preferredContactMethod)

  return (
    <FlatList
      data={contactMethods}
      renderItem={({ item }) => (
        <ContactMethodItem
          item={item}
          preferredContactMethod={profile.preferredContactMethod}
          contactMethodRef={contactMethodRef}
          setValues={setValues}
        />
      )}
      keyExtractor={(item) => item.name}
      numColumns={3}
    />
  )
}

const ContactMethodItem = ({ item, contactMethodRef, setValues }: ContactMethodItemProps) => {
  const isSelectedMethod = item.index === contactMethodRef.current

  function handleOnPressContactItem() {
    contactMethodRef.current = item.index
    setValues((prev) => ({ ...prev, preferredContactMethod: item.index }))
  }

  const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'row',
      gap: 10,
      alignItems: 'center',
      marginHorizontal: 5,
      borderWidth: isSelectedMethod ? 2 : 0,
      borderColor: isSelectedMethod ? appColors.blue : 'none',
      padding: 5
    },
    text: {
      fontFamily: appFont.regular
    }
  })

  return (
    <Pressable style={styles.container} onPress={handleOnPressContactItem}>
      {item.icon}
      <Text style={styles.text}>{item.name}</Text>
    </Pressable>
  )
}

export default ContactMethodsList
