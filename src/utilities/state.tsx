import { ChangeStateProp } from '@pages/api/bot'
import { useState, Dispatch, SetStateAction } from 'react'
import Destroyer, {
  BotInfo,
  WorkTaskProp,
  DisabledStateProp,
  Score,
  CounterProp,
} from './bots'

export const useCurrentBot = (
  props?: BotInfo
): [BotInfo, Dispatch<SetStateAction<BotInfo>>] => {
  const [currentBot, setBot] = useState<BotInfo>({
    botName: props?.botName || '',
    botType: props?.botType || 'Bipedal',
    semiPermaName: props?.semiPermaName || 'Bot',
  })

  return [currentBot, setBot]
}

export const useWorkTasks = (
  props?: WorkTaskProp
): [WorkTaskProp, Dispatch<SetStateAction<WorkTaskProp>>] => {
  const [workTasks, setWorkTasks] = useState<WorkTaskProp>({
    workDone: props?.workDone || 0,
    currentTask: props?.currentTask || 'Awaiting Bot Creation',
    nextTask: props?.nextTask || 0,
    choreList: props?.choreList || '',
    taskIsComplete: props?.taskIsComplete || true,
  })
  return [workTasks, setWorkTasks]
}

export const useIsDisabled = (
  props?: DisabledStateProp
): [DisabledStateProp, Dispatch<SetStateAction<DisabledStateProp>>] => {
  const [isDisabled, setIsDisabled] = useState<DisabledStateProp>({
    isDisabledChore: props?.isDisabledChore || true,
    isDisabledBurglar: props?.isDisabledBurglar || true,
    isDisabledDrill: props?.isDisabledDrill || true,
  })

  return [isDisabled, setIsDisabled]
}

// Maybe this one doesn't need to be here
export const useCurrentScore = (): [Score, Dispatch<SetStateAction<Score>>] => {
  const [currentScore, setCurrentScore] = useState<Score>('high score')
  return [currentScore, setCurrentScore]
}

export const useWinner = (): [
  Destroyer['name'] | undefined,
  Dispatch<SetStateAction<Destroyer['name'] | undefined>>
] => {
  const [winner, setWinner] = useState<Destroyer['name'] | undefined>(undefined)
  return [winner, setWinner]
}

export const useCounter = (
  props?: CounterProp
): [CounterProp, Dispatch<SetStateAction<CounterProp>>] => {
  const [counters, setCounters] = useState<CounterProp>({
    choreClick: props?.choreClick || 0,
    submitClick: props?.submitClick || 0,
    progressInterval: props?.progressInterval || 0,
  })
  return [counters, setCounters]
}

export const usePreviousBot = (): [
  unknown[],
  Dispatch<SetStateAction<unknown[]>>
] => {
  const [prevBots, setPrevBots] = useState<unknown[]>([])
  return [prevBots, setPrevBots]
}

export const useChangeState = (): [
  ChangeStateProp,
  Dispatch<SetStateAction<ChangeStateProp>>
] => {
  const [changeState, setChangeState] = useState<ChangeStateProp>({ text: '' })
  return [changeState, setChangeState]
}
