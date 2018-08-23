export const initialState = [
    {
        id: 1,
        name: 'Benefact.io',
        description: 'Lorem ipsum dolor sit amet',
        amount: 5000000,
    },
    {
        id: 2,
        name: 'Lorem',
        description: 'Lorem ipsum dolor sit amet',
        amount: 2000000,
    },
    {
        id: 3,
        name: 'Ipsum',
        description: 'Lorem ipsum dolor sit amet',
        amount: 3000000,
    },
    {
        id: 4,
        name: 'Dolor',
        description: 'Lorem ipsum dolor sit amet',
        amount: 200000,
    },
    {
        id: 5,
        name: 'Sit',
        description: 'Lorem ipsum dolor sit amet',
        amount: 1000,
    },
    {
        id: 6,
        name: 'Amet',
        description: 'Lorem ipsum dolor sit amet',
        amount: 999,
    },
];

export default (state = initialState, action) => {
    switch (action.type) {
        default:
            return state
    }
}
