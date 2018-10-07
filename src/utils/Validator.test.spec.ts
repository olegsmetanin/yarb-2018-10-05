import { Validator } from './Validator'

const schema = {
  $id: 'schema',
  type: 'object',
  allOf: [
    {
      $id: '#firstName',
      properties: {
        firstName: {
          type: 'string',
          allOf: [
            { isNotEmpty: true, errorMessage: 'should not be empty' },
            { isSpaceAllowed: false, errorMessage: 'whitespaces is not allowed' }
          ]
        }
      },
      required: ['firstName']
    },
    {
      $id: '#lastName',
      properties: {
        lastName: {
          type: 'string',
          allOf: [
            { isNotEmpty: true, errorMessage: 'should not be empty' },
            { isSpaceAllowed: false, errorMessage: 'whitespaces is not allowed' }
          ]
        }
      },
      required: ['lastName']
    },
    {
      $id: '#email',
      properties: {
        email: {
          type: 'string',
          allOf: [{ format: 'email', errorMessage: 'should be valid email' }]
        }
      },
      required: ['email']
    },
    {
      $id: '#phone',
      properties: {
        phone: {
          type: 'string',
          allOf: [{ format: 'mobilePhone', errorMessage: 'should be valid mobile phone' }]
        }
      },
      required: ['phone']
    }
  ]
}

const validator = new Validator().addSchema(schema)

it('validate part of object with error', () => {
  const { isValid, errors } = validator.validate({ $ref: 'schema#firstName' }, { firstName: 42 })
  expect(isValid).toEqual(false)
  expect(errors).toEqual({ firstName: 'should be string' })
})

it('validate part of object with additional properties with error', () => {
  const { isValid, errors } = validator.validate({ $ref: 'schema#firstName' }, { firstName: 42, lastName: 'qwe' })
  expect(isValid).toEqual(false)
  expect(errors).toEqual({ firstName: 'should be string' })
})

it('validate all object with error', () => {
  const { isValid, errors } = validator.validate({ $ref: 'schema' }, { firstName: 42, lastName: 'qwe' })
  expect(isValid).toEqual(false)
  expect(errors).toEqual({ firstName: 'should be string', global: "should have required property 'phone'" })
})

it('validate all object without error', () => {
  const { isValid, errors } = validator.validate(
    { $ref: 'schema' },
    { firstName: 'qwe', lastName: 'qwe', email: 'qwe@asd.com', phone: '07700 900671' }
  )
  expect(isValid).toEqual(true)
  expect(errors).toEqual({})
})

it('validate works with custom words and formats', () => {
  const { isValid, errors } = validator.validate(
    { $ref: 'schema' },
    { firstName: '', lastName: 'qwe asd', email: '', phone: '07700A900671' }
  )
  expect(isValid).toEqual(false)
  expect(errors).toEqual({
    firstName: 'should not be empty',
    lastName: 'whitespaces is not allowed',
    email: 'should be valid email',
    phone: 'should be valid mobile phone'
  })
})
