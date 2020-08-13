const {enhancer, repair, success, fail, get} = require('./enhancer.js');

describe("enhancers", () => {
    describe('repair', () => {
        test('checks that argument is an object with proper keys', () => {

            let actual = repair({
                name: 'Battle Axe',
                durability: 5,
                enhancement: 34
            })
            let expected = {
                name: 'Battle Axe',
                durability: 100,
                enhancement: 34
            }

                expect(actual).toMatchObject(expected)

            let array = repair(['Battle Axe',5,34])
            let objectError = 'The durability field is missing..'

                expect(array).toBe(objectError)
        })

        test('checks object for durability key', () => {

            let actual = repair({
                name: 'Battle Axe',
                enhancement: 34
            })
            let error = 'The durability field is missing..'

                expect(actual).toBe(error)
        });

        test('checks that durability value is a number between 0 and 100', () => {
            let tooHighDurability = repair({
                name: 'Battle Axe',
                durability: 101,
                enhancement: 34
            })
            let error = 'Durability is not between 0 and 100.'

                expect(tooHighDurability).toStrictEqual(expect.stringContaining(error))

            let tooLowDurability = repair({
                name: 'Battle Axe',
                durability: -101,
                enhancement: 34
            })

                expect(tooLowDurability).toStrictEqual(expect.stringContaining(error))

            let lowDurability = repair({
                name: 'Battle Axe',
                durability: 50,
                enhancement: 23
            })
            let fixedDurability = {
                name: 'Battle Axe',
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
                name: 'Battle Axe',
                durability: 100,
                enhancement: 23
            }
            let expected = "Enhancement doesn't exist or is too high or a negative number"

                expect(success(biggerThanTwenty)).toStrictEqual(expect.stringContaining(expected))
        })
    })

    describe("fail", ()=> {
        test("checks if object is being submitted to function",  () => {

            let actual = {
                name: 'Battle Axe',
                durability: 100,
            }
            let expected = "Item is not an object";

                expect(fail(actual)).toStrictEqual(expect.stringContaining(expected))
        })

        test("If the item's enhancement is less than 15, the durability of the item is decreased by 5", () => {

            let enhancementtLessThan = {
                name: 'Battle Axe',
                durability: 100,
                enhancement: 14
            }
            let expected = {
                name: 'Battle Axe',
                durability: 95,
                enhancement: 14
            }

                expect(fail(enhancementtLessThan)).toStrictEqual(expected)
        })

        test("If the item's enhancement is 15 or more, the durability of the item is decreased by 10", ()=> {

            let enhancementtMoreThan = {
                name: 'Battle Axe',
                durability: 100,
                enhancement: 16
            }
            let expected = {
                name: 'Battle Axe',
                durability: 90,
                enhancement: 16
            }

                expect(fail(enhancementtMoreThan)).toStrictEqual(expected);
        })
        
        test("If the item's enhancement level is greater than 16, the enhancement level decreases by 1 (17 goes down to 16, 18 goes down to 17)", () => {

            let actual = {
                name: 'Battle Axe',
                durability: 100,
                enhancement: 17
            }
            let expected = {
                name: 'Battle Axe',
                durability: 100,
                enhancement: 16
            }
            
                expect(fail(actual)).toStrictEqual(expected)

        })
    })

    describe("get",()=> {
        test("if the enhancement level is 0, the the name is not modified.",() => {

            let actual = {
                name: 'Battle Axe',
                durability: 100,
                enhancement: 0
            }
            let expected = {
                name: 'Battle Axe',
                durability: 100,
                enhancement: 0
            }
                expect(get(actual)).toStrictEqual(expected)
        })

        test("if the enhancement level is greater than 0, change the name to include the enhancement level, preceded by a plus sign ( + ), between square brackets before the item's name. Example: the name of a 'Iron Sword' enhanced to 7 would be '[+7] Iron Sword'  ", ()=> {
            
            let actual = {
                name: 'Battle Axe',
                durability: 100,
                enhancement: 10
            }
            let expected = {
                name: '[+10] Battle Axe',
                durability: 100,
                enhancement: 10
            }
                expect(get(actual)).toStrictEqual(expected)
        })
    })
})

