import React, { FC, ReactNode, useRef } from 'react'
import { FlatList, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { City, ContactMethod, Country, EditProfileFormValues } from '../../@types'
import SearchList from '../../components/SearchList'
import cities from '../../mock-data/cities'
import profile from '../../mock-data/profile'
import { appColors, appFont, widths } from '../../styles'
import CityItem from './CityItem'
import ContactMethodItem from './ContactMethodItem'
import CountryItem from './CountryItem'

export type EditProfileFormProps = {}
type AppInputProps = {
  keyboardType?: 'default' | 'decimal-pad' | 'url'
  placeholder: string
  value?: string
  multiline?: boolean
}
export type Contact = {
  icon: React.JSX.Element
  name: ContactMethod
}

const FormItem = ({ label, children }: { label: string; children: ReactNode }) => {
  return (
    <View style={styles.formItem}>
      <Text style={styles.label}>{label}</Text>
      {children}
    </View>
  )
}

const AppInput: React.FC<AppInputProps> = ({ placeholder, keyboardType, value, multiline }) => {
  return (
    <TextInput
      clearButtonMode="while-editing"
      cursorColor={appColors.darkBlue}
      enablesReturnKeyAutomatically={true}
      enterKeyHint="done"
      keyboardAppearance="default"
      keyboardType={keyboardType}
      placeholder={placeholder}
      value={value}
      style={styles.textInput}
      multiline={multiline}
    />
  )
}

const initialValues: EditProfileFormValues = {
  name: profile.name,
  homeCountry: profile.homeCountry,
  homeCityOrTown: profile.homeCityOrTown ?? '',
  cityOfResidence: profile.cityOrTownOfResidence,
  countryOfResidence: profile.countryOfResidence,
  preferredContactMethod: profile.preferredContactMethod,
  contactInfo: profile.contactInfo,
  bio: profile.bio
}

export const contactMethods: Contact[] = [
  {
    icon: <MCIcon name="email" size={20} color="#DB4437" />,
    name: ContactMethod.Email
  },
  {
    icon: <Icon name="facebook-square" size={20} color="#4267B2" />,
    name: ContactMethod.Facebook
  },
  { icon: <Icon name="snapchat" size={20} color="#FFFC00" />, name: ContactMethod.Snapchat },
  { icon: <Icon name="twitter" size={20} color="#26a7de" />, name: ContactMethod.Twitter },
  { icon: <Icon name="mobile" size={20} color={appColors.white} />, name: ContactMethod.Mobile }
]

const EditProfileForm: FC<EditProfileFormProps> = () => {
  const [values, setValues] = React.useState<EditProfileFormValues>(initialValues)
  const [cityItems, setCityItems] = React.useState<City[]>([])
  const [countryItems, setCountryItems] = React.useState<Country[]>([])
  const contactMethodRef = useRef<ContactMethod | undefined>(initialValues.preferredContactMethod)

  function handleCityChange(searchText: string) {
    const matches = cities.filter((item) =>
      item.value.toLowerCase().includes(searchText.toLowerCase())
    )
    setCityItems(matches)
    setValues((prev) => ({ ...prev, cityOfResidence: searchText }))
  }
  function handleCityReset() {
    setCityItems([])
    setValues((prev) => ({ ...prev, cityOfResidence: '' }))
  }

  function handleHomeCountryChange(searchText: string) {
    const matches = cities
      .map((city) => {
        const country = city.label.split(', ')[1]
        return { id: city.id, value: country }
      })
      .filter((item) => item.value.toLowerCase().includes(searchText.toLowerCase()))
    setCountryItems(matches)
    setValues((prev) => ({ ...prev, homeCountry: searchText }))
  }
  function handleHomeCountryReset() {
    setCountryItems([])
    setValues((prev) => ({ ...prev, homeCountry: '' }))
  }

  return (
    <SafeAreaView style={styles.form}>
      {/* Name */}
      <FormItem label="Name">
        <AppInput placeholder="Username" value={values.name} />
      </FormItem>

      {/* Home country */}
      <FormItem label="Home country">
        <SearchList
          placeholder="Home country"
          value={values.homeCountry}
          onChangeText={(text) =>
            text === '' ? handleHomeCountryReset() : handleHomeCountryChange(text)
          }
          data={countryItems}
          renderItem={({ item }) => (
            <CountryItem
              item={item}
              key={item.id}
              setValues={setValues}
              setCountryItems={setCountryItems}
            />
          )}
        />
      </FormItem>

      {/* BIO */}
      <FormItem label="Bio">
        <AppInput placeholder="Bio" value={values.bio} multiline={true} />
      </FormItem>

      {/* Residency city and town */}
      <FormItem label="Residence city and town">
        <SearchList
          placeholder="City and country of residence"
          value={values.cityOfResidence}
          onChangeText={(text) => (text === '' ? handleCityReset() : handleCityChange(text))}
          data={cityItems}
          renderItem={({ item }) => (
            <CityItem item={item} key={item.id} setValues={setValues} setCityItems={setCityItems} />
          )}
        />
      </FormItem>

      {/* Contact method */}
      <FormItem label="Contact method">
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
      </FormItem>

      {/* Contact information */}
      <FormItem label="Contact information">
        <AppInput placeholder="Contact info" value={values.contactInfo} />
      </FormItem>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  form: {
    // width: '100%'
    textAlign: 'left',
    marginTop: '30%',
    height: '100%',
    minWidth: widths.formWidth
  },
  formItem: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 20
  },
  label: {
    marginBottom: 5,
    fontFamily: appFont.bold,
    color: appColors.darkBlue
  },
  textInput: {
    fontFamily: appFont.regular,
    borderBottomWidth: 1,
    borderColor: appColors.grey,
    padding: 5,
    maxWidth: '80%',
    minWidth: widths.formWidth
  }
})

export default EditProfileForm
