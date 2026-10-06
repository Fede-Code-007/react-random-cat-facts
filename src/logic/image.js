
const IMAGE_OF_CATS_API = 'https://cataas.com/cat/says/'

export const getImgUrl = (fact) => {
    const firstWord = fact.split(" ")[0]
    return `${IMAGE_OF_CATS_API}${firstWord}`
}