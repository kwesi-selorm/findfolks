import React, { FC, useContext, useEffect, useMemo } from 'react'
import { City, ContactMethod, Country, EditProfileFormValues } from '../../@types'
import AppButton from '../../components/AppButton'
import Form from '../../components/form'
import AppInput from '../../components/form/AppInput'
import FormItem from '../../components/form/FormItem'
// import cities from '../../mock-data/cities'
// import profile from '../../mock-data/profile'
import { appColors } from '../../styles'
import CityItem from './CityItem'
import ContactMethodsList from './ContactMethodsList'
import CountryItem from './CountryItem'
import useDataAPI from '../../hooks/api/useDataAPI'
import ButtonGroup from '../../components/form/ButtonGroup'
import { FlatList, SafeAreaView, ScrollView, StyleSheet } from 'react-native'
import AppModal from '../../components/AppModal'
import FontistoIcons from 'react-native-vector-icons/Fontisto'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { parseAPIError, ParsedZodError, parseZodError } from '../../util/error-parsers'
import ToastContext from '../../contexts/toast-context/ToastContext'
import FolkContext from '../../contexts/folk-context/FolkContext'
import { EditProfileValuesSchema, EditProfileValuesType } from '../../@types/zod-types'
import ValidationErrorList from '../../components/form/ValidationErrorList'

type EditProfileFormProps = {
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>
}

export type Contact = {
  icon: React.JSX.Element
  name: string
  index: ContactMethod
}

function createCountryList(cities: City[]): Country[] {
  const duplicateCountries = cities.map((city) => {
    return city.label.split(', ')[1]
  })
  return Array.from(new Set(duplicateCountries)).map((country, i) => ({
    id: i + 1,
    value: country
  }))
}

const EditProfileForm: FC<EditProfileFormProps> = ({ setModalVisible }) => {
  const [cityItems, setCityItems] = React.useState<City[]>([])
  const [countryItems, setCountryItems] = React.useState<Country[]>([])
  const [searchModalVisible, setSearchModalVisible] = React.useState(false)
  const [searchItems, setSearchItems] = React.useState<Array<City | Country>>([])
  const [searchGroup, setSearchGroup] = React.useState<'cities' | 'countries'>('countries')
  const [validationErrors, setValidationErrors] = React.useState<ParsedZodError | undefined>(
    undefined
  )

  const { toast } = useContext(ToastContext)
  const { folkProfile } = useContext(FolkContext)
  const profile = folkProfile ?? null

  const initialValues: EditProfileValuesType = {
    name: profile?.name ?? '',
    homeCountry: profile?.homeCountry ?? '',
    homeCityOrTown: profile?.homeCityOrTown,
    cityOrTownOfResidence: profile?.cityOrTownOfResidence ?? 'Stavanger',
    countryOfResidence: profile?.countryOfResidence ?? '',
    preferredContactMethod: profile?.preferredContactMethod ?? ContactMethod.Facebook,
    contactInfo: profile?.contactInfo ?? '',
    bio: profile?.bio
  }
  const [values, setValues] = React.useState<EditProfileFormValues>(initialValues)

  const { data, isError, error } = useDataAPI()
  const { cities, countries } = useMemo(() => {
    const cities = data ?? []
    const countries = createCountryList(cities)
    return { cities, countries }
  }, [data])

  useEffect(() => {
    if (isError) {
      setModalVisible(false)
      const { message } = parseAPIError(error)
      toast({ message, type: 'error', duration: 10000 })
    }
  }, [error, isError])

  function updateForm({ name, value }: { name: string; value: string | number }) {
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  function handleCityChange(searchText: string) {
    const matches = cities.filter((item) =>
      item.value.toLowerCase().includes(searchText.toLowerCase())
    )
    setCityItems(matches)
    setSearchItems(matches)
    updateForm({ name: 'cityOrTownOfResidence', value: searchText })
  }
  function handleCityReset() {
    setCityItems([])
    updateForm({ name: 'cityOrTownOfResidence', value: '' })
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

  async function handleSave() {
    const result = EditProfileValuesSchema.safeParse(values)
    if (!result.success) {
      const errors = parseZodError(result.error)
      setValidationErrors(errors)
      console.log({ errors: result.error })
    } else {
      setValidationErrors(undefined)
      console.log(result.data)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <AppModal modalVisible={searchModalVisible} onDismiss={() => setSearchModalVisible(false)}>
        {searchGroup === 'cities' ? (
          <AppInput
            onChangeText={(text) => (text === '' ? handleCityReset() : handleCityChange(text))}
            placeholder="Search cities"
            value={values.cityOrTownOfResidence}
            autoFocus={true}
          />
        ) : (
          <AppInput
            onChangeText={(text) =>
              text === '' ? handleHomeCountryReset() : handleHomeCountryChange(text)
            }
            placeholder="Search countries"
            value={values.homeCountry}
            autoFocus={true}
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
      <ScrollView>
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
            <AppInput
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
          <FormItem label="City of residence">
            <AppInput
              placeholder="City of residence"
              onPressIn={() => handleCityInputPressIn()}
              value={values.cityOrTownOfResidence}
            />
          </FormItem>

          {/* Residency country */}
          <FormItem label="Country of residence">
            <AppInput
              placeholder="Country of residence"
              value={values.countryOfResidence}
              editable={false}
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

          {/*Validation errors */}
          <ValidationErrorList parsedError={validationErrors} />

          {/* Buttons */}
          <ButtonGroup>
            <AppButton
              text="Cancel"
              onPress={handleOnCancel}
              backgroundColor={appColors.darkGrey}
              accessibilityLabel="Cancel button"
              color={appColors.black}
              outline
              icon={<Ionicons name="close" size={20} color={appColors.darkGrey} />}
            />
            <AppButton
              text="Save"
              onPress={handleSave}
              backgroundColor={appColors.green}
              accessibilityLabel="Save button"
              icon={<FontistoIcons name="checkbox-active" size={20} color={appColors.white} />}
            />
          </ButtonGroup>
        </Form>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column'
  }
})

export default EditProfileForm
