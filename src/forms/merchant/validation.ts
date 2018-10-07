export const schema = {
  $id: 'schema',
  type: 'object',
  allOf: [
    {
      $id: '#firstname',
      properties: {
        firstname: {
          type: 'string',
          allOf: [
            { isNotEmpty: true, errorMessage: 'should not be empty' },
            { isSpaceAllowed: false, errorMessage: 'whitespaces is not allowed' }
          ]
        }
      },
      required: ['firstname']
    },
    {
      $id: '#lastname',
      properties: {
        lastname: {
          type: 'string',
          allOf: [
            { isNotEmpty: true, errorMessage: 'should not be empty' },
            { isSpaceAllowed: false, errorMessage: 'whitespaces is not allowed' }
          ]
        }
      },
      required: ['lastname']
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
          allOf: [{ format: 'phone', errorMessage: 'should be valid phone (like (248) 646-0775)' }]
        }
      },
      required: ['phone']
    }
  ]
}
