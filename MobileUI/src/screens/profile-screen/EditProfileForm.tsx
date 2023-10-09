import React, { FC } from 'react'
import { StyleSheet, View } from 'react-native'
import { City, ContactMethod, Country, EditProfileFormValues } from '../../@types'
import AppButton from '../../components/AppButton'
import SearchList from '../../components/SearchList'
import Form from '../../components/form'
import AppInput from '../../components/form/AppInput'
import FormItem from '../../components/form/FormItem'
import cities from '../../mock-data/cities'
import profile from '../../mock-data/profile'
import { appColors } from '../../styles'
import CityItem from './CityItem'
import ContactMethodsList from './ContactMethodsList'
import CountryItem from './CountryItem'

type EditProfileFormProps = {
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>
}

export type Contact = {
  icon: React.JSX.Element
  name: string
  index: ContactMethod
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

const EditProfileForm: FC<EditProfileFormProps> = ({ setModalVisible }) => {
  const [values, setValues] = React.useState<EditProfileFormValues>(initialValues)
  const [cityItems, setCityItems] = React.useState<City[]>([])
  const [countryItems, setCountryItems] = React.useState<Country[]>([])

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

  function updateForm({ name, value }: { name: string; value: string | number }) {
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  function handleOnCancel() {
    setValues(initialValues)
    setModalVisible(false)
  }

  return (
    <Form>
      {/* Name */}
      <FormItem label="Name">
        <AppInput
          placeholder="Username"
          value={values.name}
          onChangeText={(text) => {
            updateForm({ name: 'name', value: text })
          }}
        />
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
        <AppInput
          placeholder="Bio"
          value={values.bio}
          multiline={true}
          onChangeText={(text) => updateForm({ name: 'bio', value: text })}
        />
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
        <ContactMethodsList initialValues={initialValues} setValues={setValues} />
      </FormItem>

      {/* Contact information */}
      <FormItem label="Contact information">
        <AppInput
          placeholder="Contact info"
          value={values.contactInfo}
          onChangeText={(text) => updateForm({ name: 'contactInfo', value: text })}
        />
      </FormItem>

      {/* Buttons */}

      <View style={styles.buttons}>
        <AppButton
          text="Cancel"
          onPress={handleOnCancel}
          backgroundColor={appColors.red}
          accessibilityLabel="Cancel button"
          color={appColors.black}
          outline
        />
        <AppButton
          text="Save"
          onPress={() => {
            console.log({ values })
          }}
          backgroundColor={appColors.green}
          accessibilityLabel="Save button"
        />
      </View>
    </Form>
  )
}

const styles = StyleSheet.create({
  buttons: {
    display: 'flex',
    gap: 10,
    flexDirection: 'row',
    marginTop: '30%'
  }
})

export default EditProfileForm
