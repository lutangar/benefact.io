export const initialState = [
    {
      address: '0x0000000000000000000000000000000000000000',
      supports: [
          {
              project: 1,
              amount: 30
          }
      ]
    },
    {
        address: '0x0000000000000000000000000000000000000000',
        supports: [
            {
                project: 1,
                amount: 30
            }
        ]
    },
    {
        address: '0x0000000000000000000000000000000000000000',
        supports: [
            {
                project: 2,
                amount: 30
            }
        ]
    },
    {
        address: '0x0000000000000000000000000000000000000000',
        supports: [
            {
                project: 1,
                amount: 30
            }
        ]
    },
    {
        address: '0x0000000000000000000000000000000000000000',
        supports: [
            {
                project: 3,
                amount: 30
            }
        ]
    },
];

export default (state = initialState, action) => {
    switch (action.type) {
        default:
            return state
    }
}
