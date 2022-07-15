import React from 'react'


import Banner from './Banner'
import ScoreBanner from './ScoreBanner'
import TaskBanner from './TaskBanner'

import 'dotenv/config'
// import simpleCrypto from '../../Utils/encrypt'

// console.log(process.env)

// const SimpleCrypto = require('simple-crypto-js').default
console.log('process.env._secretKey RETRIEVED: ', process.env.secretKey)
console.log('process.env.GOOGLE_APPLICATION_CREDENTIALS: ', process.env.GOOGLE_APPLICATION_CREDENTIALS)
// const simpleCrypto = new SimpleCrypto(process.env.secretKey)


export default function InfoPanel(props: any) {
  const highScore =
    props.score === 'N/A'
      ? 'any'
      : props.score.workDone === 0
        ? props.progressInterval
        : props.score.workDone

  // const decipheredName = simpleCrypto.decrypt(process.env.secretKey)
  // console.log('name to DECIPHER: ', props.score)
  // console.log('typeof name to DECIPHER: ', typeof props.score)

  const typeOfScoreResponse = typeof props.score === 'string'
  // console.log('typeOfScoreResponse: ', typeOfScoreResponse)
  const highScoreName = typeOfScoreResponse ? `No-Bot-y` :
  /*simpleCrypto.decrypt(props.score.name)*/ props.score.name
  // props.score.name
  // console.log('props: ', props)

  const burglarStatus =
    props.winner !== undefined
      ? props.winner === 'Burglar'
        ? `Burglar is looting your owner's home over your lifeless circuits!`
        : `Burglar is defeated and has run away!`
      : `No intruders have come!`

  return (
    <>
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
        >
          Bonus Sass
        </button>

      </div>
    </>
  )
}
