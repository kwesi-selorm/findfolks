import React, { FC, useContext, useEffect, useMemo } from 'react'
import { City, Country } from '../@types'
import useDataAPI from '../hooks/api/useDataAPI'
import AppModal from './AppModal'
import AppInput from './form/AppInput'
import { FlatList } from 'react-native'
import CityItem from '../screens/profile-screen/CityItem'
import CountryItem from '../screens/profile-screen/CountryItem'
import { parseAPIError } from '../util/error-fns'
import ToastContext from '../contexts/toast-context/ToastContext'

type CityAndCountrySearchModalProps = {
  searchModalVisible: boolean
  setSearchModalVisible: React.Dispatch<React.SetStateAction<boolean>>
  searchGroup: 'cities' | 'countries'
  searchItems: Array<City | Country>
  setSearchItems: React.Dispatch<React.SetStateAction<Array<City | Country>>>
  setCityItems: React.Dispatch<React.SetStateAction<City[]>>
  setCountryItems: React.Dispatch<React.SetStateAction<Country[]>>
  updateForm: ({ name, value }: { name: string; value: string | number }) => void
  values: any
  setValues: React.Dispatch<React.SetStateAction<any>>
  handleOnCancel: () => void
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

const CityAndCountrySearchModal: FC<CityAndCountrySearchModalProps> = ({
  searchModalVisible,
  setSearchModalVisible,
  searchGroup,
  searchItems,
  setSearchItems,
  setCityItems,
  setCountryItems,
  updateForm,
  values,
  setValues
}) => {
  const { toast } = useContext(ToastContext)

  // CITIES DATA QUERY
  const { data, isError, error } = useDataAPI()
  const { cities, countries } = useMemo(() => {
    const cities = data ?? []
    const countries = createCountryList(cities)
    return { cities, countries }
  }, [data])
  useEffect(() => {
    if (isError) {
      const { message } = parseAPIError(error)
      toast({ message, type: 'error', duration: 10000 })
    }
  }, [error, isError])

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

  return (
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
  )
}

export default CityAndCountrySearchModal
