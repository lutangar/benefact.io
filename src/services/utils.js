import { getChecksumAddress } from 'ethjs-account'

export const formatErrors = error => ({ _error: error.message })
export const hoursToMilliseconds = hours => Number(hours) * 60 * 60 * 1000

const isBigNumber = arg => arg && arg.toNumber

const toObject = (definition, args = []) =>
  Object.assign(...args.map((output, i) => ({ [definition[i].name]: output })))

export const formatOutput = ({ type, name }) => output => {
  console.log(output)
  console.log(type, name)
  console.log('name', name)
  if (typeof output === 'undefined') {
    throw new TypeError(`${name} should be a ${type}, but received 'undefined' instead.`)
  }

  switch (type) {
    case 'uint8':
    case 'uint256':
      if (!isBigNumber(output)) {
        throw new Error(`${name} should be a big number, but received ${output} instead.`)
      }
      return output.toNumber()

    case 'address':
      return getChecksumAddress(output)

    default:
      return output
  }
}

export const formatOutputs = (definition = []) => outputs => {
  if (definition.length === 0) {
    return outputs
  }
  console.log(definition)
  console.log(outputs)
  if (definition.length === 1) {
    const scalarOutput =
      outputs instanceof Object && !isBigNumber(outputs) ? outputs[definition[0].name] : outputs

    return formatOutput(definition[0])(scalarOutput)
  }

  // normal form must be an object,
  // cause converting an object to an array doesn't necessarily preserve order
  const outputsObject = !Array.isArray(outputs) ? outputs : toObject(definition, outputs)

  return Object.assign(
    ...Object.keys(outputsObject).map(name => {
      const output = outputsObject[name]
      const { type } = definition.find(d => d.name === name)

      return { [name]: formatOutput({ type, name })(output) }
    })
  )
}

export const getDefinition = name => state => {
  const definition = state.find(d => d.name === name)

  if (!definition) {
    throw new Error(`Couldn't find a definition with name '${name}' in given ABI.`)
  }

  return definition
}

export const EVENT = eventName => `EVENT_${eventName.toString().toUpperCase()}`
