import { CONSTANTS } from './constants'
import React from 'react'
import { Task } from './patterns'
import { WorkTaskProp, CounterProp, DisabledStateProp, Score } from './bots'

type WhichVoiceOptions = {
  voice?: number
  pitch?: number
  rate?: number
  lang?: string
}

export type ExecutionerStateProps = {
  workTasks: WorkTaskProp
  setWorkTasks: React.Dispatch<React.SetStateAction<WorkTaskProp>>
  counters: CounterProp
  setCounters: React.Dispatch<React.SetStateAction<CounterProp>>
  setIsDisabled: React.Dispatch<React.SetStateAction<DisabledStateProp>>
}

export type ExecutionerProps = {
  taskList: string[]
  currentBot: any
  currentScore: Score
  /**
   * Count needs a BETTER name and clearer meaning
   */
  count: number
  executionState: ExecutionerStateProps
}

const defaultVoiceOptions: WhichVoiceOptions = {
  lang: 'en-US',
  pitch: 1,
  rate: 1,
  voice: 0,
}

async function speak(
  text: string,
  whichVoice: WhichVoiceOptions = defaultVoiceOptions
) {
  const msg = new SpeechSynthesisUtterance()
  const voices = speechSynthesis.getVoices()
  const voice = voices[whichVoice.voice ?? 1]
  msg.voice = voice
  msg.pitch = whichVoice.pitch ?? 1
  msg.rate = whichVoice.rate ?? 1
  msg.lang = whichVoice.lang ?? 'en-US'
  msg.text = text
  window.speechSynthesis.speak(msg)
}

export const voice = { speak }

// Default Robot Commentary Setup
const femaleDefaultVoice: WhichVoiceOptions = {
  lang: 'en',
  pitch: 2,
  rate: 1.7,
  voice: 3,
}
export const femaleDefault = {
  and: async function (
    text: string,
    options: WhichVoiceOptions = femaleDefaultVoice
  ) {
    console.log('femaleDefault voice')
    voice.speak(text, options)
  },
}

// // Home Defense Variation of Voice
const femaleDefensiveVoice: WhichVoiceOptions = {
  lang: 'en',
  pitch: 1.5,
  rate: 1.5,
  voice: 3,
}
export const femaleDefensive = {
  speak: async function (
    text: any,
    options: WhichVoiceOptions = femaleDefensiveVoice
  ) {
    console.log('femaleDefensive voice')
    voice.speak(text, options)
  },
}

export const Voices = {
  femaleDefault,
  femaleDefensive,
}

export const speakerHandler = async (
  waitTime: number,
  ttsString: string,
  whichVoice: WhichVoiceOptions = femaleDefaultVoice
) => {
  return new Promise((res, rej) => {
    res(
      setTimeout(() => {
        voice.speak(ttsString, whichVoice)
      }, waitTime * 1000)
    )
  })
}

export const executioner = ({
  taskList,
  currentBot,
  currentScore,
  count,
  executionState,
}: ExecutionerProps) => {
  let executionCount = count

  function hasKey<O extends object>(obj: O, key: PropertyKey): key is keyof O {
    return key in obj
  }

  const command = taskList[0]
  if (hasKey(currentBot, command)) {
    const botFunction = currentBot.command
    console.log('command: ', command)
    if (command && typeof botFunction === 'function') {
      console.log('inside command function')

      executionState.setWorkTasks({
        ...executionState.workTasks,
        ...{
          nextTask: taskList.length,
          currentTask: botFunction().description,
          taskIsComplete: false,
        },
      })

      speakerHandler(
        botFunction(currentBot.name, currentBot.type).eta,
        ''
      ).then(() => {
        let nextArray = taskList.slice(1)
        executionState.setWorkTasks({
          ...executionState.workTasks,
          ...{ nextTask: nextArray.length },
        })
        executionState.setCounters({
          ...executionState.counters,
          ...{ progressInterval: executionState.counters.progressInterval + 1 },
        })
        executionCount += 1
        executioner({
          taskList: nextArray,
          currentBot: currentBot,
          currentScore: currentScore,
          count,
          executionState: executionState,
        })
      })
    } else {
      if (executionCount >= 16) {
        executionState.setWorkTasks({
          ...executionState.workTasks,
          ...{ taskIsComplete: true },
        })
        speakerHandler(
          0,
          `${currentBot.name} completed the task set! Standing by!`
        )
      }

      if (typeof currentScore === 'function') {
        currentScore()
      }

      speakerHandler(3, '')
        .then(() => {
          executionState.setWorkTasks({
            ...executionState.workTasks,
            ...{ currentTask: `${currentBot.name} completed all tasks!` },
          })
        })
        .then(() => {
          if (executionCount <= 15) {
            speakerHandler(
              0,
              'All Done! And ready for second breakfast, Elevensies and more! Yeah, totally stole that word from Pippin!'
            ).then(() => (executionCount = 16))
          }
        })
    }
  }
}

export async function createValidation(stage: number, state: string) {
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
      try {
        await speakerHandler(0, CONSTANTS.SPEECH.CREATE.ALT[0])
        await speakerHandler(1, `${botNameState} you call it?`)
        await speakerHandler(1, CONSTANTS.SPEECH.CREATE.ALT[1])
        await speakerHandler(1, CONSTANTS.SPEECH.CREATE.ALT[2]).then(
          () => (noNameCount += 10)
        )
        await speakerHandler(4, CONSTANTS.SPEECH.CREATE.ALT[3])
        await speakerHandler(0, CONSTANTS.SPEECH.CREATE.ALT[4])
        await speakerHandler(3, CONSTANTS.SPEECH.CREATE.ALT[5])
      } catch (error) {
        console.error(error)
      }
    } else if (noNameCount < 1) {
      const uniquteText = `Well well then. ${botNameState}, ahah? - I see... - How unique of you`

      await speakerHandler(0, uniquteText).then(() => {
        noNameCount += 10
        speakerHandler(7, CONSTANTS.SPEECH.CREATE.NORMAL[0])
      })
      await speakerHandler(10.5, CONSTANTS.SPEECH.CREATE.NORMAL[1])
      await speakerHandler(9.5, CONSTANTS.SPEECH.CREATE.NORMAL[2])
      await speakerHandler(6, CONSTANTS.SPEECH.CREATE.NORMAL[3])
    }
  }
}

export function choreSequence(stage: number) {
  let noNameCount = stage

  if (noNameCount >= 14 && noNameCount <= 16) {
    speakerHandler(0, CONSTANTS.SPEECH.CHORES.GEAR).then(() => {
      speakerHandler(8, CONSTANTS.SPEECH.CHORES.PROTECT)
      return (noNameCount += 1)
    })
  } else if (noNameCount >= 17 && noNameCount < 18) {
    speakerHandler(0, CONSTANTS.SPEECH.CHORES.YEAH).then(
      () => (noNameCount += 1)
    )
  } else if (noNameCount === 18) {
    speakerHandler(0, CONSTANTS.SPEECH.CHORES.COMPLY).then(
      () => (noNameCount = 19)
    )
  }
}
