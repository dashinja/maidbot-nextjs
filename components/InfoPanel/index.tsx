import React from 'react'
import Banner from './Banner'
import ScoreBanner from './ScoreBanner'
import TaskBanner from './TaskBanner'

import 'dotenv/config'
import { enabledButtonClasses } from '../ActionButton'
import Destroyer, { Score, ScoreObject } from 'utilities/bots'
import PrimaryButton from '../PrimaryButton'

type InfoPanelProps = {
  currentTask: string
  semiPermaName: string
  nextTask: number
  /**
   * Shows "work Done"
   */
  progressInterval: number
  winner: Destroyer['name'] | undefined
  /**
   * GET from database
   */
  score: Score
  bonusSass: () => void
}

export default function InfoPanel({
  currentTask,
  semiPermaName,
  nextTask,
  progressInterval,
  winner,
  score,
  bonusSass,
}: InfoPanelProps) {
  const isScoreAnObject = Object.hasOwn(score as ScoreObject, 'workDone')

  const defineUnknownHighScoreWorkDone = () => {
    if (isScoreAnObject) {
      score = score as ScoreObject
      return score.workDone
    }
  }
  const defineUnknownHighScoreName = () => {
    if (isScoreAnObject) {
      score = score as ScoreObject
      return score.name
    }
  }

  const highScore =
    // score === 'N/A'
    typeof score === 'string'
      ? 'any'
      : isScoreAnObject
      ? // score.workDone === 0
        progressInterval
      : defineUnknownHighScoreWorkDone()

  const typeOfScoreResponse = typeof score === 'string'
  const highScoreName = typeOfScoreResponse
    ? `No-Bot-y`
    : defineUnknownHighScoreName()

  const burglarStatus =
    winner !== undefined
      ? winner === 'Burglar'
        ? `Burglar is looting your owner's home over your lifeless circuits!`
        : `Burglar is defeated and has run away!`
      : `No intruders have come!`

  return (
    <div className='flex flex-col place-items-center text-text-normal'>
      <Banner
        title='Status'
        value={currentTask}
        className='text-md mb-7 mt-2'
      />
      <TaskBanner
        title={`Tasks Remaining for ${semiPermaName}`}
        value={nextTask}
        className='text-md mb-7'
      />
      <Banner
        title='Work Done'
        value={progressInterval}
        className='text-md mb-7'
      />
      <Banner
        title='Burglar Status'
        value={burglarStatus}
        className='text-md mb-7'
      />
      <ScoreBanner
        title='High Score'
        value={highScore}
        name={semiPermaName}
        className='text-md'
      />

      <PrimaryButton
        name={'sass-button'}
        onClick={bonusSass}
        className={enabledButtonClasses + 'text' + ''}
      >
        Bonus Sass
      </PrimaryButton>
    </div>
  )
}
