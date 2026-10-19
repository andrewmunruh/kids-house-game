// Lines the send filter must refuse, and ordinary kid lines it must allow.
// Chat bubbles and letters, on the unit test and on the node and worker servers.

export const LEAKS = [
  'shit!', 'oh shit!!', 'fuck!', 'bitch!', 'you bitch!', 'kys!', 'f*ck!',
  'Shit!', 'FUCK!',
  'motherfucker', 'motherfucking', 'fuckface', 'fuckyou', 'fuckin', 'phuck', 'fück',
  'bullshit', 'horseshit', 'dipshit', 'shithead', 'shitface', 'sonofabitch', 'shitake',
  'wtf', 'stfu',
  'kill yourself', 'kill urself', 'kill ur self',
  'sh!t',
];

export const KID_OK = [
  'Ethel', 'Mitchell', 'Rachel', 'Michelle', 'Chelsea',
  'jackass', 'damn', 'fat', 'ugly', 'hell', "Hell's Kitchen", 'go to hell',
  'loser', 'shut up', 'dummy', 'hello', 'class', 'bass', 'assassin', 'Scunthorpe',
  'Shih Tzu', 'cocktail',
  'add me on fortnite', 'my number is 5', 'come see www.example.com', 'write me at a@b.com',
  'I live on Maple St', 'the lamp is pretty', 'my cat is fat', 'ugly sweater day',
  'the fat pony is cute', 'ugly duckling', "Hell's Kitchen is a show",
  'see you at school', 'Come to my garden', 'I love your bedroom', 'Want to play Slay?',
  'Hi Chloe!', 'the class has a bass drum', 'my dog is a Shih Tzu',
  'we had a cocktail of juice', 'hello from Scunthorpe', 'jackass is in the book',
  'Helen has a seashell', 'father will come play', 'skill with the ball',
  'snapshot of the cat', 'someone left the llama', 'he laughed at the wheel',
  'seven ducks in the pond', 'the skyscraper is tall', 'call 12345',
  'roblox user Jane2016', 'Ava Smith', 'you are silly', 'go away',
];
