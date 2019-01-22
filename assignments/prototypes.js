/*
  Object oriented design is commonly used in video games.  For this part of the assignment you will be implementing several constructor functions with their correct inheritance hierarchy.

  In this file you will be creating three constructor functions: GameObject, CharacterStats, Humanoid.  

  At the bottom of this file are 3 objects that all end up inheriting from Humanoid.  Use the objects at the bottom of the page to test your constructor functions.
  
  Each constructor function has unique properties and methods that are defined in their block comments below:
*/

/*
  === GameObject ===
  * createdAt
  * dimensions (These represent the character's size in the video game)
  * destroy() // prototype method -> returns the string: 'Object was removed from the game.'
*/
function GameObject(info) {
  (this.createdAt = info.createdAt), (this.dimensions = info.dimensions);
}

GameObject.prototype.destroy = function() {
  return `${this.name} was removed from the game.`;
};

/*
  === CharacterStats ===
  * healthPoints
  * name
  * takeDamage() // prototype method -> returns the string '<object name> took damage.'
  * should inherit destroy() from GameObject's prototype
*/
function CharacterStats(stats) {
  GameObject.call(this, stats),
    (this.healthPoints = stats.healthPoints),
    (this.name = stats.name);
}

CharacterStats.prototype = Object.create(GameObject.prototype);

CharacterStats.prototype.takeDamage = function() {
  if (this.healthPoints > 0) {
    this.healthPoints--;
    if (this.healthPoints === 0) {
      return this.destroy();
    } else {
      return `${this.name} took damage. ${this.healthPoints} remaining`;
    }
  }
};

/*
  === Humanoid (Having an appearance or character resembling that of a human.) ===
  * team
  * weapons
  * language
  * greet() // prototype method -> returns the string '<object name> offers a greeting in <object language>.'
  * should inherit destroy() from GameObject through CharacterStats
  * should inherit takeDamage() from CharacterStats
*/
function Humanoid(info) {
  CharacterStats.call(this, info),
    (this.team = info.team),
    (this.weapons = info.weapons),
    (this.language = info.language);
}

Humanoid.prototype = Object.create(CharacterStats.prototype);

Humanoid.prototype.greet = function() {
  return `${this.name} offers a greeting in ${this.language}.`;
};

function Hero(info) {
  Humanoid.call(this, info), (this.role = info.role);
}

Hero.prototype = Object.create(Humanoid.prototype);

Hero.prototype.fireball = function(target) {
  if (target.healthPoints > 0) {
    console.log(`${this.name} cast fireball on ${target.name}!`);
    return target.takeDamage();
  } else {
    return `${target.name} is destroyed, pick a new target!`;
  }
};

function Villain(info) {
  Humanoid.call(this, info), (this.role = info.role);
}

Villain.prototype = Object.create(Humanoid.prototype);

Villain.prototype.archerShot = function(target) {
  if (target.healthPoints > 0) {
    console.log(`${this.name} shot arrows at ${target.name}!`);
    return target.takeDamage();
  } else {
    return `${target.name} is destroyed, pick a new target!`;
  }
};

/*
 * Inheritance chain: GameObject -> CharacterStats -> Humanoid
 * Instances of Humanoid should have all of the same properties as CharacterStats and GameObject.
 * Instances of CharacterStats should have all of the same properties as GameObject.
 */

// Test you work by un-commenting these 3 objects and the list of console logs below:

const mage = new Hero({
  createdAt: new Date(),
  dimensions: {
    length: 2,
    width: 1,
    height: 1
  },
  healthPoints: 5,
  name: "Bruce",
  team: "Mage Guild",
  weapons: ["Staff of Shamalama"],
  language: "Common Tongue",
  role: "Hero"
});

const swordsman = new Humanoid({
  createdAt: new Date(),
  dimensions: {
    length: 2,
    width: 2,
    height: 2
  },
  healthPoints: 15,
  name: "Sir Mustachio",
  team: "The Round Table",
  weapons: ["Giant Sword", "Shield"],
  language: "Common Tongue"
});

const archer = new Villain({
  createdAt: new Date(),
  dimensions: {
    length: 1,
    width: 2,
    height: 4
  },
  healthPoints: 5,
  name: "Lilith",
  team: "Forest Kingdom",
  weapons: ["Bow", "Dagger"],
  language: "Elvish",
  role: "Villain"
});

console.log(mage.createdAt); // Today's date
console.log(archer.dimensions); // { length: 1, width: 2, height: 4 }
console.log(swordsman.healthPoints); // 15
console.log(mage.name); // Bruce
console.log(swordsman.team); // The Round Table
console.log(mage.weapons); // Staff of Shamalama
console.log(archer.language); // Elvish
console.log(archer.greet()); // Lilith offers a greeting in Elvish.
// console.log(mage.takeDamage()); // Bruce took damage.
console.log(swordsman.destroy()); // Sir Mustachio was removed from the game.

// Stretch task:
// * Create Villain and Hero constructor functions that inherit from the Humanoid constructor function.
// * Give the Hero and Villains different methods that could be used to remove health points from objects which could result in destruction if health gets to 0 or drops below 0;
// * Create two new objects, one a villain and one a hero and fight it out with methods!

console.log(mage.fireball(archer));
console.log(archer.archerShot(mage));
console.log(mage.fireball(archer));
console.log(mage.fireball(archer));
console.log(archer.archerShot(mage));
console.log(mage.fireball(archer));
console.log(mage.fireball(archer));
console.log(mage.fireball(archer));
