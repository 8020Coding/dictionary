const API_KEY =
  'dict.1.1.20230315T200925Z.5fd9066f8603a96b.6e4f18881d9cd12be3fc1ab58a26634302441569'
const body = document.querySelector('html')
const boxText = document.querySelector('[data-input]')
const boxTR = document.querySelector('[data-tr-wrapper]')
const boxTranslate = document.querySelector('[data-translate]')
const para = document.createElement('p')
const trTitle = document.createElement('h1')
const subTrTitle = document.createElement('h3')
const button = document.querySelector('[data-btn]')
const dataRU = document.querySelector('[data-ru]')
const dataEN = document.querySelector('[data-en]')
let ru = 'ru'
let en = 'en'

async function fetchAPI(word) {
  const url = `https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=${API_KEY}&lang=${ru}-${en}&text=${word}`
  try {
    if (!boxText.textContent) {
      boxTranslate.textContent = ''
      boxTR.textContent = ''
    } else {
      const result = await fetch(url).then((res) => res.json())
      let txt = JSON.stringify(result.def[0].tr[0].text)
      // CONTENT
      para.style.fontSize = '2rem'
      para.textContent = JSON.parse(
        txt.replace(/(\{|,)\s*(.+?)\s*:/g, '$1 "$2":')
      )

      boxTranslate.append(para)

      const textTR = result.def[0].tr

      for (let i = 0; i < textTR.length; i++) {
        let paraTR

        let textTranslate = JSON.stringify(result.def[0].tr[0].syn[i].text)

        paraTR = document.createElement('p')
        paraTR.textContent = JSON.parse(
          textTranslate.replace(/(\{|,)\s*(.+?)\s*:/g, '$1 "$2":')
        )
        console.log(textTranslate)
        paraTR.style.fontSize = '2rem'
        paraTR.style.color = 'orange'
        trTitle.textContent = 'Словарь'
        trTitle.style.color = '#fff'
        trTitle.style.marginBottom = '2rem'

        boxTR.append(trTitle, paraTR)
      }
    }
  } catch (error) {
    console.log(`The Error: ${error}`)
  }
}

boxText.addEventListener('keyup', onChange)

function onChange(event) {
  if (event.key) {
    let text = event.target.textContent.trim()
    boxText.classList.add('empty-psuedo')
    fetchAPI(text)
  }

  body.addEventListener('click', (e) => {
    boxText.classList.add('empty-psuedo')
  })
}

const debounce = (fn, delay) => {
  let timeout
  return function () {
    const fnCall = () => {
      fn.apply(this, arguments)
    }
    clearTimeout(timeout)
    timeout = setTimeout(fnCall, delay)
  }
}

onChange = debounce(onChange, 500)

button.addEventListener('click', () => {
  if (dataRU.textContent === 'Русский' && dataEN.textContent === 'English') {
    dataRU.textContent = 'English'
    dataEN.textContent = 'Русский'
    ru = 'en'
    en = 'ru'
  } else {
    dataRU.textContent = 'Русский'
    dataEN.textContent = 'English'
    ru = 'ru'
    en = 'en'
  }
})

/***********************************/
//Debounce function

// const debounce = (func, waitTime) => {
//   let timeout

//   return () => {
//     clearTimeout(timeout)
//     timeout = setTimeout(func,waitTime)
//   }
// }

// const el = document.querySelector('input-here')
// const log = () => console.log('RESULT: ', el.value)
// el.addEventListener('input', debounce(log, 500))
/***********************************/
