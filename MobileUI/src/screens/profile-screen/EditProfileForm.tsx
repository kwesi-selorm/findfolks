import React, { FC } from 'react'
import { City, ContactMethod, Country, EditProfileFormValues } from '../../@types'
import SearchList from '../../components/SearchList'
import Form from '../../components/form'
import AppInput from '../../components/form/AppInput'
import FormItem from '../../components/form/FormItem'
import cities from '../../mock-data/cities'
import profile from '../../mock-data/profile'
import CityItem from './CityItem'
import ContactMethodsList from './ContactMethodsList'
import CountryItem from './CountryItem'

export type Contact = {
  icon: React.JSX.Element
  name: ContactMethod
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

const EditProfileForm: FC = () => {
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

  return (
    <Form>
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
        <ContactMethodsList initialValues={initialValues} setValues={setValues} />
      </FormItem>

      {/* Contact information */}
      <FormItem label="Contact information">
        <AppInput placeholder="Contact info" value={values.contactInfo} />
      </FormItem>
    </Form>
  )
}

export default EditProfileForm
