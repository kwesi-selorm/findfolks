import React, { FC, useMemo } from 'react'
import { City, ContactMethod, Country, EditProfileFormValues } from '../../@types'
import AppButton from '../../components/AppButton'
import Form from '../../components/form'
import AppInput from '../../components/form/AppInput'
import FormItem from '../../components/form/FormItem'
// import cities from '../../mock-data/cities'
import profile from '../../mock-data/profile'
import { appColors } from '../../styles'
import CityItem from './CityItem'
import ContactMethodsList from './ContactMethodsList'
import CountryItem from './CountryItem'
import useDataAPI from '../../hooks/api/useDataAPI'
import ButtonGroup from '../../components/form/ButtonGroup'
import { FlatList, SafeAreaView, TextInput } from 'react-native'
import AppModal from '../../components/AppModal'
import FeatherIcons from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'

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
  const [searchModalVisible, setSearchModalVisible] = React.useState(false)
  const [searchItems, setSearchItems] = React.useState<Array<City | Country>>([])
  const [searchGroup, setSearchGroup] = React.useState<'cities' | 'countries'>('countries')

  const { data, isLoading } = useDataAPI()
  const { cities, countries } = useMemo(() => {
    const cities = data ?? []
    const countries = cities.map((city) => {
      return city.label.split(', ')[1]
    })
    const uniqueCountries = Array.from(new Set(countries)).map((country, i) => ({
      id: i + 1,
      value: country
    }))

    return { cities, countries: uniqueCountries }
  }, [data])

  function updateForm({ name, value }: { name: string; value: string | number }) {
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  function handleCityChange(searchText: string) {
    const matches = cities.filter((item) =>
      item.value.toLowerCase().includes(searchText.toLowerCase())
    )
    setCityItems(matches)
    setSearchItems(matches)
    updateForm({ name: 'cityOfResidence', value: searchText })
  }
  function handleCityReset() {
    setCityItems([])
    updateForm({ name: 'cityOfResidence', value: '' })
  }

  function handleHomeCountryChange(searchText: string) {
    const matches = countries.filter((item) =>
      item.value.toLowerCase().includes(searchText.toLowerCase())
    )
    setCountryItems(matches)
    setSearchItems(matches)
    updateForm({ name: 'homeCountry', value: searchText })
  }
  function handleHomeCountryReset() {
    setCountryItems([])
    updateForm({ name: 'homeCountry', value: '' })
  }

  function handleOnCancel() {
    setValues(initialValues)
    setModalVisible(false)
  }

  function handleHomeCountryInputPressIn() {
    setSearchModalVisible(true)
    setSearchGroup('countries')
    setSearchItems(countryItems)
  }
  function handleCityInputPressIn() {
    setSearchModalVisible(true)
    setSearchGroup('cities')
    setSearchItems(cityItems)
  }

  return (
    <SafeAreaView>
      <AppModal modalVisible={searchModalVisible} onDismiss={() => setSearchModalVisible(false)}>
        {searchGroup === 'cities' ? (
          <AppInput
            onChangeText={(text) => (text === '' ? handleCityReset() : handleCityChange(text))}
            placeholder="Search cities"
            value={values.cityOfResidence}
          />
        ) : (
          <AppInput
            onChangeText={(text) =>
              text === '' ? handleHomeCountryReset() : handleHomeCountryChange(text)
            }
            placeholder="Search countries"
            value={values.homeCountry}
          />
        )}
        <FlatList
          data={searchItems}
          renderItem={({ item }) =>
            searchGroup === 'cities' ? (
              <CityItem
                item={item as City}
                key={item.id}
                setValues={setValues}
                setCityItems={setCityItems}
                setModalVisible={setSearchModalVisible}
              />
            ) : (
              <CountryItem
                item={item}
                key={item.id}
                setValues={setValues}
                setCountryItems={setCountryItems}
                setModalVisible={setSearchModalVisible}
              />
            )
          }
        />
      </AppModal>
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
          <TextInput
            placeholder="Home country"
            onPressIn={() => handleHomeCountryInputPressIn()}
            value={values.homeCountry}
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
          <TextInput
            placeholder="City of residence"
            onPressIn={() => handleCityInputPressIn()}
            value={values.cityOfResidence}
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
        <ButtonGroup>
          <AppButton
            text="Cancel"
            onPress={handleOnCancel}
            backgroundColor={appColors.red}
            accessibilityLabel="Cancel button"
            color={appColors.black}
            outline
            icon={<Ionicons name="close" size={20} color={appColors.black} />}
          />
          <AppButton
            text="Save"
            onPress={() => {
              console.log({ values })
            }}
            backgroundColor={appColors.green}
            accessibilityLabel="Save button"
            icon={<FeatherIcons name="check-circle" size={20} color={appColors.white} />}
          />
        </ButtonGroup>
      </Form>
    </SafeAreaView>
  )
}

export default EditProfileForm
