import { FC } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { appBorderRadius, appColors, appFont } from '../../styles'
import { ParsedZodError, ZodErrorData } from '../../util/error-fns'
import { toSentenceCase } from '../../util/data-fns'

type ValidationErrorListProps = {
  parsedError?: ParsedZodError
}

const ErrorItem = ({ error }: { error: ZodErrorData }) => {
  return (
    <View style={styles.errorItemContainer}>
      <Text style={styles.pathText}>
        {toSentenceCase(error.path.toString())}
        {'\t'}
      </Text>
      <Text style={styles.text}>{error.pathMessage}</Text>
    </View>
  )
}

const ValidationErrorList: FC<ValidationErrorListProps> = ({ parsedError }) => {
  return parsedError ? (
    <View style={styles.listContainer}>
      <Text style={{ color: appColors.red, fontFamily: appFont.extraBold }}>
        Please fix the following errors:
      </Text>
      {parsedError.data.map((e) => {
        return <ErrorItem key={e.path} error={e} />
      })}
    </View>
  ) : null
}

const styles = StyleSheet.create({
  text: {
    fontFamily: appFont.regular,
    color: appColors.red
  },
  errorItemContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginBottom: 10
    // width: '100%'
  },
  pathText: {
    fontFamily: appFont.bold,
    color: appColors.red,
    flexWrap: 'wrap'
  },
  listContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    maxWidth: '95%',
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: appBorderRadius.cardRadius,
    padding: 10
  }
})

export default ValidationErrorList
