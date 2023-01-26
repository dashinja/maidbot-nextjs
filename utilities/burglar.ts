import { DestroyerType } from "./bots";
import { voice } from "./helpers";

type VictimType = Burglar | DestroyerType;

export default class Burglar {
  name: string;
  health: number;
  attack: number;
  constructor() {
    this.name = "Burglar";
    this.health = 35000;
    this.attack = 7000;
  }

  attackValue(victim: VictimType) {
    if (this.health < 9000) {
      this.victoryResult(victim, voice);
    } else if (
      victim.health > 0 &&
      victim.health - this.attack > 0 &&
      this.health >= 9000
    ) {
      this.attackSequence(victim);
    } else {
      this.defeatResult();
    }
  }

  victoryResult(victim: VictimType, voiceAgent: any) {
    setTimeout(() => {
      voiceAgent.speak(
        `${this.name} is defeated and has run away! ${victim.name} wins!`
      );
    }, 6000);
    return victim.name;
  }

  attackSequence(victim: VictimType) {
    victim.health = victim.health - this.attack * Math.random();
    this.health = this.health - victim.attack * Math.random();
    return this.attackValue(victim);
  }

  defeatResult() {
    setTimeout(() => {
      voice.speak(
        `Welp - the ${this.name} won! Now your master's house will get looted. Like, do you even turing? - What a Piece of Junk!`
      );
    }, 6000);
    return this.name;
  }
}
