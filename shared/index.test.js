import { extractFrom } from './index';

test('extracting', () => {
    let object = {
        name: "tea party",
        value: 18,
        map: {
            one: 1,
            two: 2,
            three: 3
        }
    }
    expect(extractFrom(object, {
        name: true,
        value: false,
        map: {
            one: true,
            two: 'nine'
        }
    })).toEqual({
        name: "tea party",
        map: {
            one: 1,
            nine: 2
        }
    })
})