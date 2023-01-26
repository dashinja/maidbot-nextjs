import React from "react";
import {
  DoChoresProps,
  DrillPracticeProps,
  BurglarDefenseProps,
  CreateBotProps,
} from "utilities/bots";
import ActionButton from "../ActionButton";

type ButtonPapelProps = {
  isDisabledChore: boolean;
  isDisabledDrill: boolean;
  isDisabledBurglar: boolean;
  doChores: (chores: DoChoresProps) => void;
  drillPractice: (practice: DrillPracticeProps) => void;
  burglarDefense: (defense: BurglarDefenseProps) => void;
  botState: CreateBotProps;
  setWinner: React.Dispatch<React.SetStateAction<string | undefined>>;
};

export default function ButtonPanel({
  isDisabledChore,
  isDisabledDrill,
  isDisabledBurglar,
  doChores,
  drillPractice,
  burglarDefense,
  botState,
  setWinner,
}: ButtonPapelProps) {
  const {
    currentBot,
    currentScore,
    executionState,
    prevBots,
    setCurrentScore,
  } = botState;

  return (
    <div className="flex mt-0.5">
      <ActionButton
        text="Do Chore Regimen"
        onClick={(e) =>
          doChores({
            e,
            currentBot,
            executionState,
            prevBots,
            currentScore,
            setCurrentScore,
          })
        }
        disabled={isDisabledChore}
      />

      <ActionButton
        text="Home Defense Drill Practice"
        onClick={(e) =>
          drillPractice({
            e,
            prevBots,
            currentBot,
            executionState,
            currentScore,
          })
        }
        disabled={isDisabledDrill}
      />

      <ActionButton
        text="Burglar Attack"
        onClick={(e) =>
          burglarDefense({
            e,
            currentBot,
            currentScore,
            executionState,
            prevBots,
            setCurrentScore,
            setWinner,
          })
        }
        disabled={isDisabledBurglar}
      />
    </div>
  );
}
