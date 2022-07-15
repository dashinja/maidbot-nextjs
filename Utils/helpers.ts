import { CONSTANTS } from './constants'
import { useState, useEffect } from 'react'
// import { useState, useEffect } from 'react'
// import textToSpeech, { v1, protos} from '@google-cloud/text-to-speech'
// import fs from 'fs'
// import util from 'util'

// // Creates a client
// const client = new textToSpeech.TextToSpeechClient()
// async function quickStart() {
//   // The text to synthesize
//   const text = 'hello, world!'

//   // Construct the request
//   const request = {
//     input: { text: text },
//     // Select the language and SSML voice gender (optional)
//     voice: { languageCode: 'en-US', ssmlGender: 'NEUTRAL' },
//     // select the type of audio encoding
//     audioConfig: { audioEncoding: 'MP3' },
//   } as unknown as protos.google.cloud.texttospeech.v1.SynthesizeSpeechRequest

//   // Performs the text-to-speech request
//   const response = await client.synthesizeSpeech(request)
//   // Write the binary audio content to a local file
//   const writeFile = util.promisify(fs.writeFile)
//   await writeFile('output.mp3', response.audioContent, 'binary')
//   console.log('Audio content written to file: output.mp3')
// }
// Imports the Google Cloud client library
// import textToSpeech from '@google-cloud/text-to-speech'

// Import other required libraries
// import fs from 'fs'
// import util from 'util'

export const voice = { speak }

async function speak(text: string, whichVoice = 'NEUTRAL') {
  var msg = new SpeechSynthesisUtterance()
  msg.text = text
  window.speechSynthesis.speak(msg)
}

// export async function getStaticProps(context) {
//   // Creates a client
//   const client = new textToSpeech.TextToSpeechClient()
//   const voice = { speak }

//   async function speak(text: string, whichVoice = 'NEUTRAL') {
//     // The text to synthesize
//     // const text = 'hello, world!';

//     // Construct the request
//     const request = {
//       input: { text: text },
//       // Select the language and SSML voice gender (optional)
//       voice: { languageCode: 'en-US', ssmlGender: whichVoice },
//       // select the type of audio encoding
//       audioConfig: { audioEncoding: 'MP3' },
//     }

//     var msg = new SpeechSynthesisUtterance()
//     msg.text = text
//     window.speechSynthesis.speak(msg)

//     // Performs the text-to-speech request
//     // const [response] = await client.synthesizeSpeech(request as any)
//     // // Write the binary audio content to a local file
//     // const writeFile = util.promisify(fs.writeFile)
//     // const results = await writeFile('output.mp3', response?.audioContent || '', 'binary')
//     // console.log('Audio content written to file: output.mp3 - ', results)
//     // return response
//   }
//   return {
//     props: { voice }, // will be passed to the page component as props
//   }
// }




// export const useScript = (url: string, name: string) => {

//   const [lib, setLib] = useState({})

//   useEffect(() => {
//     const script = document.createElement('script')

//     script.src = url
//     script.async = true
//     script.onload = () => setLib({ [name]: window.name })

//     document.body.appendChild(script)

//     return () => {
//       document.body.removeChild(script)
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [url])

//   return lib

// }



// Default Robot Commentary Setup
export const femaleDefault = {
  and: async function (text: string, options?: any) {
    voice.speak(text, 'NEUTRAL')
  },
}

// // Home Defense Variation of Voice
export const femaleDefensive = {
  speak: async function (text: any, options?: any) {
    voice.speak(text, 'NEUTRAL')
  },
}

// export const Voices = {
//   femaleDefault,
//   femaleDefensive
// }

export const speakerHandler = async (waitTime: number, ttsString: string, whichVoice = 'NEUTRAL') => {
  return new Promise((res, rej) => {
    res(setTimeout(() => {
      voice.speak(ttsString, whichVoice)
    }, waitTime * 1000))

    // and(ttsString, {
    //   speechOptions, ...{
    //     onend: () => setTimeout(() => {
    //       res("Success")
    //     }, waitTime * 1000),
    //     onerror: () => rej("Speak Handler Failed")
    //   }
    // })
  })
}

export function createValidation(stage: number, state: string) {
  let noNameCount = stage
  let botNameState = state

  // Reset
  if (noNameCount > 9) {
    noNameCount = 0
  }

  if (botNameState === '') {

    switch (noNameCount) {
      case 0:
        noNameCount += 1
        femaleDefault.and(CONSTANTS.SPEECH.CREATE.ERROR[0])
        console.error('Must enter a Robot Name!')
        break
      case 1:
        noNameCount += 1
        femaleDefault.and(CONSTANTS.SPEECH.CREATE.ERROR[1])
        console.error('Must enter a Robot Name!')
        break
      case 2:
        noNameCount += 1
        femaleDefault.and(CONSTANTS.SPEECH.CREATE.ERROR[3])
        console.error('Must enter a Robot Name!')
        break
      case 3:
        noNameCount += 1
        femaleDefault.and(CONSTANTS.SPEECH.CREATE.ERROR[4])
        console.error('Must enter a Robot Name!')
        break
      case 4:
        noNameCount += 1
        femaleDefault.and(CONSTANTS.SPEECH.CREATE.ERROR[5])
        console.error('Must enter a Robot Name!')
        break

      default:
        break
    }
  } else {
    if (noNameCount > 5 && noNameCount < 10) {
      noNameCount = 5
    }
    if (noNameCount >= 1 && noNameCount <= 5) {
      speakerHandler(0, CONSTANTS.SPEECH.CREATE.ALT[0])
        .then(() => speakerHandler(1, `${botNameState} you call it?`))
        .then(() => speakerHandler(1, CONSTANTS.SPEECH.CREATE.ALT[1]))
        .then(() => speakerHandler(1, CONSTANTS.SPEECH.CREATE.ALT[2]))
        .then(() => noNameCount += 10)
        .then(() => speakerHandler(4, CONSTANTS.SPEECH.CREATE.ALT[3]))
        .then(() => speakerHandler(0, CONSTANTS.SPEECH.CREATE.ALT[4]))
        .then(() => speakerHandler(3, CONSTANTS.SPEECH.CREATE.ALT[5]))
        .catch(error => console.error(error))

    } else if (noNameCount < 1) {
      const uniquteText = `Well well then. ${botNameState}, ahah? - I see... - How unique of you`

      speakerHandler(0, uniquteText)
        .then(() => {
          noNameCount += 10
          speakerHandler(7, CONSTANTS.SPEECH.CREATE.NORMAL[0])
        })
        .then(() => speakerHandler(10.5, CONSTANTS.SPEECH.CREATE.NORMAL[1]))
        .then(() => speakerHandler(9.5, CONSTANTS.SPEECH.CREATE.NORMAL[2]))
        .then(() => speakerHandler(6, CONSTANTS.SPEECH.CREATE.NORMAL[3]))
    }
  }
}

export function choreSequence(stage: number) {
  let noNameCount = stage

  if (noNameCount >= 14 && noNameCount <= 16) {
    speakerHandler(0, CONSTANTS.SPEECH.CHORES.GEAR)
      .then(() => { speakerHandler(8, CONSTANTS.SPEECH.CHORES.PROTECT); return (noNameCount += 1) })
  } else if (noNameCount >= 17 && noNameCount < 18) {
    speakerHandler(0, CONSTANTS.SPEECH.CHORES.YEAH)
      .then(() => noNameCount += 1)
  } else if (noNameCount === 18) {
    speakerHandler(0, CONSTANTS.SPEECH.CHORES.COMPLY)
      .then(() => noNameCount = 19)

  }
}




