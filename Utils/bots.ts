// type DestroyerChoreMethodType = {
//   description: string
//   eta: number,
//   name?: string
// }

// type DestroyerAttackMethodType = {
//   description: string,
//   attack: 10000,
//   eta: 3000,
//   name: 'Attack',
// }

// type DestroyerDefenseMethodType = {
//   defense: number
//   eta: 3500,
//   description: string,
//   name: 'Defense'
// }

// type DestroyerStatMethodType = {
//   description: string,
//   health: string,
//   eta: 1000
// }

export type DestroyerType = {
  name: string
  type: string
  health: number
  attack: number
  defense: number
  speed: number
  bakeSomeCookies: (name: string, type: string) => any//DestroyerChoreMethodType
  doTheDishes: (name: string, type: string) => any//DestroyerChoreMethodType
  doTheLaundry: (name: string, type: string) => any//DestroyerChoreMethodType
  makeASammich: (name: string, type: string) => any//DestroyerChoreMethodType
  sweepTheHouse: (name: string, type: string) => any//DestroyerChoreMethodType
  giveTheDogABath: (name: string, type: string) => any//DestroyerChoreMethodType
  mowTheLawn: (name: string, type: string) => any//DestroyerChoreMethodType
  rakeTheLeaves: (name: string, type: string) => any//DestroyerChoreMethodType
  takeOutTheRecycling: (name: string, type: string) => any//DestroyerChoreMethodType
  washTheCar: (name: string, type: string) => any//DestroyerChoreMethodType
  attackValue: (name: string) => any//DestroyerAttackMethodType
  defenseValue: (name: string) => any//DestroyerDefenseMethodType
  healthValue: () => DestroyerType['health']
  speedValue: (name: string) => { speed: DestroyerType['speed'], eta: 2000 }
  stats: (name: string) => any//DestroyerStatMethodType
}
// const Destroyer = (name: string, type: string): { [key: PropertyKey]: any } => {
//   const returnObject = {
//     name,
//     type,
//     health: 50000,
//     attack: 9000,
//     defense: this.attack / 2,
//     speed: Destroyer(name, type).defense / 50,
//     bakeSomeCookies: (name: string, type: string) => ({
//       description: `${name} the ${type} is baking cookies.`,
//       eta: 8000,
//       name: 'Bake Cookies',
//     }),
//     doTheDishes: (name: string, type: string) => ({
//       description: `${name} the ${type} is doing the dishes.`,
//       eta: 5000,
//       name: 'Dishes',
//     }),
//     makeASammich: (name: string, type: string) => ({
//       description: `${name} the ${type} is making a yummy sammich!`,
//       eta: 7000,
//       name: 'Make Sandwhich',
//     }),
//     sweepTheHouse: (name: string, type: string) => ({
//       description: `${name} the ${type} is sweeping the house`,
//       eta: 3000,
//     }),
//     giveTheDogABath: (name: string, type: string) => ({
//       description: `${name} the ${type} is giving the dog a bath.`,
//       eta: 14500,
//       name: 'Bathe Dog',
//     }),
//     mowTheLawn: (name: string, type: string) => ({
//       description: `${name} the ${type} is mowing the lawn.`,
//       eta: 20000,
//     }),
//     rakeTheLeaves: (name: string, type: string) => ({
//       description: `${name} the ${type} is raking the leaves!`,
//       eta: 18000,
//     }),
//     takeOutTheRecycling: (name: string, type: string) => ({
//       description: `${name} the ${type} is taking out the recycling `,
//       eta: 4000,
//     }),
//     washTheCar: (name: any, type: any) => ({
//       description: `${name} the ${type} is washing the car!`,
//       eta: 20000,
//     }),
//     attackValue: (name: any) => ({
//       description: `${name} is attacking!`,
//       attack: 10000,
//       eta: 3000,
//       name: 'Attack',
//     }),
//     defenseValue: (name: any) => ({
//       defense: Destroyer(name, type).attackValue(name).attack / 2,
//       eta: 3500,
//       description: `${name} is defending like Optimus. Flexin' like a Prime!`,
//       name: 'Defense',
//     }),
//     healthValue: () => (Destroyer(name, type)).health,
//     speedValue: (name: any) => ({ speed: (Destroyer(name, type)).defenseValue(name).defense / 50 }),
//     stats: (name: any) => ({
//       description: `Health: ${(Destroyer(name, type)).healthValue()} Attack: ${(Destroyer(name, type)).attackValue(name).attack
//         } Defense: ${(Destroyer(name, type)).defenseValue(name).defense} Speed: ${(Destroyer(name, type)).speedValue(name).speed
//         }`,
//       health:
//         (Destroyer(name, type)).health >= 0
//           ? `${name}'s health is ${(Destroyer(name, type)).health}.`
//           : `${name} is defeated!`,
//       eta: 1000,
//     })
//   }// as unknown as DestroyerType

//   return returnObject
// }

// export default Destroyer

export default class Destroyer {
  name: string
  type: string
  health: number
  attack: number
  defense: number
  speed: number
  constructor(name: string, type: string) {
    this.name = name
    this.type = type
    this.health = 50000
    this.attack = 9000
    this.defense = this.attack / 2
    this.speed = this.defense / 50
  }

//   /////////////////////////////////
//   // Inside Chore Methods: Short //
//   /////////////////////////////////
  bakeSomeCookies() {
    return {
      description: `${this.name} the ${this.type} is baking cookies.`,
      eta: 8000,
      name: 'Bake Cookies',
    }
  }

  doTheDishes() {
    return {
      description: `${this.name} the ${this.type} is doing the dishes.`,
      eta: 5000,
      name: 'Dishes',
    }
  }

  doTheLaundry() {
    return {
      description: `${this.name} the ${this.type} is taking out the laundry.`,
      eta: 10000,
      name: 'Laundry',
    }
  }

  makeASammich() {
    return {
      description: `${this.name} the ${this.type} is making a yummy sammich!`,
      eta: 7000,
      name: 'Make Sandwhich',
    }
  }

  sweepTheHouse() {
    return {
      description: `${this.name} the ${this.type} is sweeping the house`,
      eta: 3000,
    }
  }

//   /////////////////////////////////
//   // Outside Chore Methods: Long //
//   /////////////////////////////////
  giveTheDogABath() {
    return {
      description: `${this.name} the ${this.type} is giving the dog a bath.`,
      eta: 14500,
      name: 'Bathe Dog',
    }
  }

  mowTheLawn() {
    return {
      description: `${this.name} the ${this.type} is mowing the lawn.`,
      eta: 20000,
    }
  }

  rakeTheLeaves() {
    return {
      description: `${this.name} the ${this.type} is raking the leaves!`,
      eta: 18000,
    }
  }

  takeOutTheRecycling() {
    return {
      description: `${this.name} the ${this.type} is taking out the recycling `,
      eta: 4000,
    }
  }

  washTheCar() {
    return {
      description: `${this.name} the ${this.type} is washing the car!`,
      eta: 20000,
    }
  }

//   ///////////////////////////////
//   // Drill and Defense Methods //
//   ///////////////////////////////
  attackValue() {
    return {
      description: `${this.name} is attacking!`,
      attack: 10000,
      eta: 3000,
      name: 'Attack',
    }
  }

  defenseValue() {
    let defense = this.attackValue().attack / 2
    return {
      defense,
      eta: 3500,
      description: `${this.name
        } is defending like Optimus.Flexin' like a Prime!`,
      name: 'Defense',
    }
  }

  healthValue() {
    let health = this.health
    this.health = health
    return health
  }

  speedValue() {
    let speed = this.defenseValue().defense / 50
    return {
      speed,
      eta: 2000,
    }
  }

  stats() {
    return {
      description: `Health: ${this.healthValue()} Attack: ${this.attackValue().attack
        } Defense: ${this.defenseValue().defense} Speed: ${this.speedValue().speed
        }`,
      health:
        this.health >= 0
          ? `${this.name}'s health is ${this.health}.`
          : `${this.name} is defeated!`,
      eta: 1000,
    }
  }
}
