const FACTS_RANDOM_OF_CATS_API = 'https://catfact.ninja/fact'

export async function getRandomFact() {
    const res = await fetch(FACTS_RANDOM_OF_CATS_API);
    const data = await res.json();
    const {fact} = data;
    return fact;
}