import { CONSTANTS } from './constants'
import React, { useState, useEffect } from 'react'
import { DestroyerType } from './bots'
import { CounterProp, WorkTaskProp } from '../pages'
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

type WhichVoiceOptions = {
  voice?: number,
  pitch?: number,
  rate?: number,
  lang?: string,
}

const defaultVoiceOptions: WhichVoiceOptions = {
  lang: 'en',
  pitch: 1,
  rate: 1,
  voice: 0
}
async function speak(text: string, whichVoice: WhichVoiceOptions = defaultVoiceOptions) {
  const msg = new SpeechSynthesisUtterance()
  const voices = speechSynthesis.getVoices()
  const voice = voices[whichVoice.voice]
  msg.voice = voice
  msg.pitch = whichVoice.pitch
  msg.rate = whichVoice.rate
  msg.lang = whichVoice.lang
  msg.text = text
  // msg.lang = "es-ES"
  // console.log('get voices: ', speechSynthesis.getVoices())
  window.speechSynthesis.speak(msg)

  // window.speechSynthesis.getVoices().forEach(function (voice) {
  //   console.log(voice.name, voice.default ? voice.default : '')
  // })
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
const femaleDefaultVoice: WhichVoiceOptions = { lang: 'en', pitch: 2, rate: 1.7, voice: 3 }
export const femaleDefault = {
  and: async function (text: string, options: WhichVoiceOptions = femaleDefaultVoice) {
    console.log('femaleDefault voice')
    voice.speak(text, options)
  },
}

// // Home Defense Variation of Voice
const femaleDefensiveVoice: WhichVoiceOptions = { lang: 'en', pitch: 1.5, rate: 1.5, voice: 3 }
export const femaleDefensive = {
  speak: async function (text: any, options: WhichVoiceOptions = femaleDefensiveVoice) {
    console.log('femaleDefensive voice')
    voice.speak(text, options)
  },
}

// export const Voices = {
//   femaleDefault,
//   femaleDefensive
// }

export const speakerHandler = async (waitTime: number, ttsString: string, whichVoice: WhichVoiceOptions = femaleDefaultVoice) => {
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

export type ExecutionerStateProps = {
  workTasks: WorkTaskProp,
  setWorkTasks: React.Dispatch<React.SetStateAction<WorkTaskProp>>,
  counters: CounterProp,
  setCounters: React.Dispatch<React.SetStateAction<CounterProp>>
}

export const executioner = (array: string[], bot: any, scoreUpdate: string | Function, count: number, state: ExecutionerStateProps) => {
  let executionCount = count

  function hasKey<O>(obj: O, key: PropertyKey): key is keyof O {
    return key in obj
  }

  const command = array[0]
  if (hasKey(bot, command)) {
    console.log(this as DestroyerType)

    // const botFunction = bot[this?.command]
    const botFunction = bot.command
    console.log('command: ', command)
    if (command && typeof botFunction === 'function') {
      // const test = Object.values(botFunction(bot.name, bot.type))
      console.log('inside command function')

      state.setWorkTasks({ ...state.workTasks, ...{ nextTask: array.length, currentTask: botFunction().description, taskIsComplete: false } })

      speakerHandler(botFunction(bot.name, bot.type).eta, '')
        .then(() => {
          let nextArray = array.slice(1)
          state.setWorkTasks({ ...state.workTasks, ...{ nextTask: nextArray.length } })
          state.setCounters({ ...state.counters, ...{ progressInterval: state.counters.progressInterval + 1 } })
          executionCount += 1
          executioner(nextArray, bot, scoreUpdate, count, state)
        })
    } else {

      if (executionCount >= 16) {
        state.setWorkTasks({ ...state.workTasks, ...{ taskIsComplete: true } })
        speakerHandler(0, `${bot.name} completed the task set! Standing by!`)
      }

      if (typeof scoreUpdate === 'function') {
        scoreUpdate()
      }

      speakerHandler(3, '')
        .then(() => {
          state.setWorkTasks({ ...state.workTasks, ...{ currentTask: `${bot.name} completed all tasks!` } })
        })
        .then(() => {
          if (executionCount <= 15) {
            speakerHandler(0, 'All Done! And ready for second breakfast, Elevensies and more! Yeah, totally stole that word from Pippin!')
              .then(() => executionCount = 16)
          }
        })
    }
  }
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




