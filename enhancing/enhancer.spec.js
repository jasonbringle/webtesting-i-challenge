const {enhancer, repair, success} = require('./enhancer.js');

describe("enhancers", () => {
    describe('repair', () => {
        
        test('checks that argument is an object with proper keys', () => {
                let actual = repair({
                    name: 'Jim',
                    durability: 5,
                    enhancement: 34
                })

                let expected = {
                    name: 'Jim',
                    durability: 100,
                    enhancement: 34
                }

            expect(actual).toMatchObject(expected)

                let array = repair([
                    'Jim',
                    5,
                    34
                ])

                let objectError = 'The durability field is missing..'

            expect(array).toBe(objectError)

        })

        test('checks object for durability key', () => {
                let actual = repair({
                    name: 'Jim',
                    enhancement: 34
                })

                let error = 'The durability field is missing..'

            expect(actual).toBe(error)


        });

        test('checks that durability value is a number between 0 and 100', () => {
                let tooHighDurability = repair({
                    name: 'Jim',
                    durability: 101,
                    enhancement: 34
                })
                
                let error = 'Durability is not between 0 and 100.'

            expect(tooHighDurability).toStrictEqual(expect.stringContaining(error))

                let tooLowDurability = repair({
                    name: 'Jim',
                    durability: -101,
                    enhancement: 34
                })

            expect(tooLowDurability).toStrictEqual(expect.stringContaining(error))

                let lowDurability = repair({
                    name: 'Jim',
                    durability: 50,
                    enhancement: 23
                })
                
                let fixedDurability = {
                    name: 'Jim',
                    durability: 100,
                    enhancement: 23
                }
            
            expect(lowDurability).toStrictEqual(fixedDurability)
            })
        })

    describe("success", ()=> {
        test("checks if argument is an object", ()=> {
                let actual = []
                let error = "This argument is not an object"
            expect(success(actual)).toBe(error)
        })

        test("checks if enhancement is a number between 0 and 20", () => {
                let biggerThanTwenty = {
                        name: 'Jim',
                        durability: 100,
                        enhancement: 23
                }

                let expected = "Enhancement doesn't exist or is too high or a negative number"
            expect(success(biggerThanTwenty)).toStrictEqual(expect.stringContaining(expected))
        })
        
        test.todo("")
        test.todo("")
        test.todo("")
    })
})

