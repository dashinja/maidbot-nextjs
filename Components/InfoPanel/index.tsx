import React from 'react'
import Banner from './Banner'
import ScoreBanner from './ScoreBanner'
import TaskBanner from './TaskBanner'

import 'dotenv/config'
import { enabledButtonClasses } from '../ActionButton'

export default function InfoPanel(props: any) {
  const highScore =
    props.score === 'N/A'
      ? 'any'
      : props.score.workDone === 0
        ? props.progressInterval
        : props.score.workDone

  const typeOfScoreResponse = typeof props.score === 'string'
  const highScoreName = typeOfScoreResponse ? `No-Bot-y` : props.score.name

  const burglarStatus =
    props.winner !== undefined
      ? props.winner === 'Burglar'
        ? `Burglar is looting your owner's home over your lifeless circuits!`
        : `Burglar is defeated and has run away!`
      : `No intruders have come!`

  return (
      <div>
        <Banner title="Status" value={props.currentTask} />
        <TaskBanner
          title={`Tasks Remaining for ${props.semiPermaName}`}
          value={props.nextTask}
        />
        <Banner title="Work Done" value={props.progressInterval} />
        <Banner title="Burglar Status" value={burglarStatus} />
        <ScoreBanner
          title="High Score"
          value={highScore}
          name={highScoreName}
        />
        <button
          type="submit"
          onClick={props.bonusSass}
          className={enabledButtonClasses + ' bg-purple-600'}
        >
          Bonus Sass
      </button>
    </div>
  )
}
