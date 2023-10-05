import { Dispatch, RefObject, SetStateAction } from 'react'
import { Pressable, StyleSheet, Text } from 'react-native'
import { ContactMethod, EditProfileFormValues } from '../../@types'
import { appColors, appFont } from '../../styles'
import { Contact } from './EditProfileForm'

type ContactMethodItemProps = {
  item: Contact
  preferredContactMethod: ContactMethod
  contactMethodRef: React.MutableRefObject<ContactMethod | undefined>
  setValues: Dispatch<SetStateAction<EditProfileFormValues>>
}

const ContactMethodItem = ({
  item,

  preferredContactMethod,
  contactMethodRef,

  setValues
}: ContactMethodItemProps) => {
  const isSelectedMethod = item.name === contactMethodRef?.current

  function handleOnPressContactItem() {
    contactMethodRef.current = item.name
    setValues((prev) => ({ ...prev, preferredContactMethod: item.name }))
  }

  const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'row',
      gap: 10,
      alignItems: 'center',
      marginHorizontal: 5,
      backgroundColor: isSelectedMethod ? appColors.grey : 'none',
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

export default ContactMethodItem
