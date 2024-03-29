const insideTasks = [
  'doTheDishes',
  'sweepTheHouse',
  'makeASammich',
  'doTheLaundry',
  'bakeSomeCookies',
]

const outsideTasks = [
  'takeOutTheRecycling',
  'washTheCar',
  'rakeTheLeaves',
  'mowTheLawn',
  'giveTheDogABath',
]

const alphaPattern = [
  'attackValue',
  'defenseValue',
  'attackValue',
  'defenseValue',
  'stats',
]

const betaPattern = [
  'attackValue',
  'attackValue',
  'attackValue',
  'defenseValue',
  'stats',
]

const deltaPattern = [
  'defenseValue',
  'defenseValue',
  'defenseValue',
  'defenseValue',
  'stats',
]

const omegaPattern = [
  'defenseValue',
  'attackValue',
  'defenseValue',
  'attackValue',
  'stats',
]

export type Task = {
  insideTasks?: string[]
  outsideTasks?: string[]
}

export const taskLists = {
  insideTasks,
  outsideTasks,
}

export const Pattern = [alphaPattern, betaPattern, deltaPattern, omegaPattern]
