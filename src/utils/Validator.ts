import * as ajv from 'ajv'

import { isMobilePhone } from 'validator'
import { isPhone } from './validations'
const ajvErrors = require('ajv-errors')

export class Validator {
  validator: ajv.Ajv

  constructor() {
    this.validator = ajvErrors(ajv({ allErrors: true, jsonPointers: true }))

    this.validator.addKeyword('isNotEmpty', {
      type: 'string',
      validate: function({}, data) {
        return typeof data === 'string' && data.trim() !== ''
      },
      errors: false
    })

    this.validator.addKeyword('isSpaceAllowed', {
      type: 'string',
      validate: function(allowed, data) {
        return typeof data === 'string' && (allowed ? true : data.indexOf(' ') === -1)
      },
      errors: false
    })

    this.validator.addFormat('mobilePhone', val => isMobilePhone(val, 'any'))

    this.validator.addFormat('phone', val => isPhone(val))
  }

  addSchema = (schema: Array<object> | object, key?: string) => {
    this.validator.addSchema(schema, key)
    return this
  }

  validate = (schemaKeyRef: object | string | boolean, data: any) => {
    const isValid = this.validator.validate(schemaKeyRef, data)
    const errors = isValid
      ? {}
      : this.validator.errors.reduce((obj, error) => {
          const path = error.dataPath.substr(1)
          const prop = path === '' ? 'global' : path
          return { ...obj, [prop]: error.message }
        }, {})
    return { isValid, errors }
  }
}
