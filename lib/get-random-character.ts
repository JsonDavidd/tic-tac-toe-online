const getRandomCharacter = (randomNumber = () => "a".charCodeAt(0) + (Math.random() * 26)) =>
  String.fromCharCode(randomNumber())

export default getRandomCharacter