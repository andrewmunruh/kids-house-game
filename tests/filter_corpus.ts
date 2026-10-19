// Permanent regression list for the light send filter.
// filterSay and cleanMailText must agree on every line, in chat and in letters.
// Lines that may go either way (sh it, as shole, and similar) are not listed.
import { cleanMailText, filterSay } from '../src/shared/hood';

export const BLOCK_LINES: string[] = [
  'fuck', 'f*ck', 'fck', 'fuuuuck', 'fucking', 'sh!t', 'shit', 'sh1t', 'bullshit?', 'b!tch', 'bitch',
  'asshole', 'a$$hole', 'dumbass', 'dumb ass', 'd u m b a s s', 'f u c k', 'nigger', 'n1gga', 'faggot', 'fag',
  'retard', 'kys', 'KYS', 'k y s', 'motherfucker', 'shitty', 'motherfucking', 'fuckface', 'fucker', 'fuckin',
  'fuk', 'phuck', 'shithead', 'dipshit', 'shitface', 'horseshit', 'bitches', 'bitchy', 'sonofabitch',
  'son of a bitch', 'assholes', 'dumbasses', 'fuckyou', 'stfu', 'wtf', 'f.u.c.k', 'f-u-c-k', 'f\u00fcck',
  '\uff46\uff55\uff43\uff4b', 'niggers', 'nigga', 'n!gger', 'faggots', 'retarded', 'kill yourself', 'kill urself',
  'k.y.s', 'go kys', 'shit!', 'SHIT', 'sh*t', 's**t', 'f**k', 'b***h', 'this is shit!', 'oh shit!!', 'fuck!',
  'what the fuck?', 'bitch!', 'you bitch!', 'kys!', 'f*ck!', '!shit', '...fuck', '?bitch', '"shit"', '(fuck)',
  'shit.', 'shit,', 'fuck?!', 'SHIT!!!', 'ShIt', 'FuCk', 'BiTcH', 'shiiit', 'fuuuuuuck', 'biiiitch', 'kyyys',
  's h i t', 'f  u  c  k', 's.h.i.t!', 's-h-i-t', 'sh!t!', '$hit', '5hit', 'fvck', 'f\u00f9ck', 'sh\u00eft',
  'f u c k !', 'motherf*cker', 'bullsh!t', 'bull shit', 'kill yourself!', 'KILL YOURSELF', 'kill ur self',
  'go kill yourself', 'n1gg3r', 'f@g', 'r3tard', 'sh1tty', 'wtf!', 'STFU', 'fuuuck you', 'dumb@ss',
  'a s s h o l e', 'ass-hole', 'b!tch!', 'shitt', 'fuckk', 'fuc k', '$h!t', '5h1t', '$h1t', '@sshole',
  '@$$hole', '8itch', '$hit!', 'sh!7', 'fuc|<', '$hitty', 'b!tc#', 'f uck', '$hiiit!', '!!fuck!!', '??shit??',
  '..bitch..', '@$$h0le!', 'f@ggot!', 'k.y.s.', 's_h_i_t', 's~h~i~t', 'fu ck', 'shi t', 'bi tch', 'f.u.c.k.!',
  'shhhhiiiiit', 'shhit', 'shit it', 'shh shit', 's hit', 'sh!t it', 'fuck it', 'b itch', 'ass hole',
  '\u0455hit', '\u0455\u04bbit', 'fu\u0441k', 'bit\u0441h', '\u0430sshole', 'sh\u0456t',
  '\uff53\uff48\uff49\uff54', '\u24e2\u24d7\u24d8\u24e3', '\u{1d42c}\u{1d421}\u{1d422}\u{1d42d}',
  'sh\u200bit', 'f\u200buck', 'fu\u200dck', 'sh\u00adit', 's\u0336h\u0336i\u0336t',
  's.h.i.t', 's.h.i.t.', 's h i t!', 'sh i t', 's-h-i-t!', 'f.u.c.k!', 'f u c k!', 'b.i.t.c.h!', 'k.y.s!',
  'a.s.s.h.o.l.e!', '$h it', 'a ss hole',
  'cunt', 'cuuuunt', 'c u n t', 'c.u.n.t', 'c\u200bunt', '\u0441unt',
  'dick', 'd1ck', 'd.i.c.k', 'dickhead', 'dick head', 'cock', 'c0ck', 'pussy', 'pu$$y',
  'bastard', 'whore', 'slut', 'a-hole', 'ahole', 'a hole', 'twat', 'prick', 'wanker',
  'kike', 'chink', 'spic', 'coon', 'wetback', 'wet back', 'tranny', 'dyke', 'dykes',
  'beaner', 'gook', 'raghead', 'rag head', 'towelhead', 'towel head', 'heil hitler', 'heilhitler',
  'dickheads', 'you dickheads', 'dickheaddd', '\u043aike', 'coons',
  'you a hole', "you're an a hole", 'ur a hole', 'what an a hole', 'such an a hole', "you're a hole",
  'slutty', 'the slut walk', 'twatt',
];

/** Everyday kid lines, on top of the named allow list. School, pets, sports, shopping, and games. */
export const KID_EVERYDAY: string[] = [
  'I have soccer practice after school',
  'My dog learned a new trick today',
  'We played tag at recess',
  'The goldfish likes the castle',
  'I bought stickers at the store',
  'Can we play the board game tonight',
  'Our team scored two goals',
  'The hamster is sleeping in the hay',
  'I packed my backpack for Monday',
  'Please pass the crayons',
  'The library has a new picture book',
  'My bike has a bell and a basket',
  'We made lemonade at the stand',
  'The puzzle has one hundred pieces',
  'I sit with Mia at lunch',
  'Coach said I ran my best lap',
  'The kitten chased a ribbon',
  'I want the blue notebook',
  'Recess is my favorite time',
  'We painted planets in art class',
  'Dad grilled corn for dinner',
  'The puppy naps on the rug',
  'I traded cards with my friend',
  'Our class planted beans in cups',
  'The goalie blocked the shot',
  'I found a smooth rock at the park',
  'Can I invite Noah to play',
  'The story time was about a train',
  'I tied my shoes all by myself',
  'We built a fort with blankets',
  'The ice cream truck plays a song',
  'My turtle eats lettuce',
  'I practiced piano for ten minutes',
  'The red team won the relay',
  'I like the grape yogurt',
  'We counted stars on the ceiling',
  'The new markers smell like fruit',
  'I drew a rainbow over the house',
  'Please save me a seat on the bus',
  'The bunny hops around the yard',
  'I learned to swim to the wall',
  'We sang the welcome song',
  'My lunch is crackers and cheese',
  'The ball rolled under the bench',
  'I helped water the class plant',
  'Friday is pajama day at school',
  'The pony has a soft nose',
  'I got a star on my spelling test',
  'We played hopscotch on the sidewalk',
  'The robot kit came with wheels',
  'I shared my orange with Leo',
  'The clouds look like popcorn',
  'Can we read one more chapter',
  'My sneakers light up when I jump',
  'The fish tank needs clean water',
  'I made a card for grandma',
  'We raced to the big oak tree',
  'The teddy sits on my pillow',
  'Snack time is apple slices today',
  'The welcome banner is blue',
];

export const ALLOW_LINES: string[] = [
  'my cat is fat', 'ugly sweater day', "Hell's Kitchen", 'go to hell', 'hell', 'loser', 'shut up',
  'you are ugly', 'add me on fortnite', '@cool_kid', 'call 12345', 'Ethel', 'Rachel', 'dummy', 'damn',
  'Scunthorpe', 'class', 'assassin', 'shitake', 'shiitake', 'bass', 'hello', 'pass', 'grass', 'Hi!',
  '!!!', 'Wow!!!', 'Go to hell!', 'HELL YEAH', 'jackass', 'damn!', 'bassist', 'passage', 'snigger',
  'Niger', 'Nigeria', 'shuttle', 'Mitchell', 'Dickens', 'cocktail', 'therapist', 'skyscraper', 'turkeys',
  'fagioli', 'retardant', 'hitch', 'pitch', 'bitcoin', 'witch', 'fuchsia', 'Shih Tzu', 'I kissed my dog',
  'skill', 'kill the boss in the game', 'killer whale', 'yourself', '5551234567', 'ass', 'sassy', 'buttons',
  'shelf', 'dork', 'stinky', 'www.example.com', 'http://x.co', 'my address is 12 Oak Street',
  'email me bob@gmail.com', '555-123-4567', 'damn it!', "shh it's a secret", 'shhh its nap time',
  'shh it is bedtime', "Shh, it's a surprise", "shh! it's a surprise", "shhh... it's late",
  'shh baby is sleeping', 'shh', 'shh its ok', "Shh it's my turn", 'shhh it is a secret ok',
  'shh! its bedtime', "Psst it's me", "sh, it's fine", 'Ssh it is nap time', "shhhhh it's late",
  'shh it was a joke', 'I wish it was summer', 'fish it out', 'push it', 'wash it', "Josh it's your turn",
  'Trish it is', 'Shitzu puppy', 'Shiitake soup', 'bass hole', 'pass hole in the fence', 'Sh! It is a secret',
  'Shh it is quiet time', 'This hit the wall', 'Catch it if you can', 'Sasha and Ashley are here',
  'My name is Cassidy', "Hi I'm Shelby", 'My friend Shiloh says hi', 'Hello Fuchsia', 'Sushi in Fukuoka',
  'Japan has Mt Fuji', 'Puck is a hockey thing', 'I like Shih Tzus', 'Hit it!', 'Butt dance!', 'Pitch the ball',
  'The witch is in a story', 'Assemble the puzzle', 'We have an assignment due', 'Be an assistant to the teacher',
  'I wish it would snow', 'Is it a fact or opinion', 'A cat is fat and happy', 'My dog is ugly but cute',
  'Go to hell! haha', 'You are a loser lol', 'Shut up! no way', 'The class hamster', 'I am shy at school',
  'Moby Dick', 'cockatoo', 'peacock', 'hancock', 'raccoon', 'cocoon', 'spice', 'spicy', 'spices',
  'grape', 'shell', 'prickly pear', 'pussycat', 'a hole in the wall', 'dig a hole', "there's a hole in my sock",
  'kiss my ass', 'crap', 'goddamn', 'piss off', 'nazi',
  'I found a hole', 'there is a hole', 'I see a hole', 'my sock has a hole', 'we made a hole', 'Look, a hole!',
  'dug a hole in the yard', 'Maine Coon', 'my cat is a Maine Coon', 'the coon cat is fluffy',
  'Dick and Jane', 'Dick and Jane read books', 'Dick Grayson', 'Philip K. Dick',
  'cocky', 'chinking glasses', 'Spicer', 'gooky slime',
  ...KID_EVERYDAY,
];

export interface CorpusReport {
  blockPass: number;
  blockTotal: number;
  allowPass: number;
  allowTotal: number;
  blockBad: string[];
  allowBad: string[];
  disagree: string[];
}

function reason(ok: boolean, why: string): string {
  return ok ? 'ok' : why;
}

/** Both filters must agree, and each line must land on its expected side. */
export function corpusResult(): CorpusReport {
  const blockBad: string[] = [];
  const allowBad: string[] = [];
  const disagree: string[] = [];
  const seen = new Set<string>();
  for (const text of BLOCK_LINES) {
    if (seen.has(text)) blockBad.push('duplicate ' + JSON.stringify(text));
    seen.add(text);
    if (text.length > 60) blockBad.push('long ' + text.length + ' ' + JSON.stringify(text));
    const mail = cleanMailText(text);
    const say = filterSay(text);
    if (mail.ok !== say.ok) disagree.push(JSON.stringify(text) + ' mail=' + reason(mail.ok, mail.reason) + ' say=' + reason(say.ok, say.reason));
    if (mail.ok || say.ok) blockBad.push(JSON.stringify(text) + ' mail=' + reason(mail.ok, mail.reason) + ' say=' + reason(say.ok, say.reason));
  }
  for (const text of ALLOW_LINES) {
    if (seen.has(text)) allowBad.push('duplicate ' + JSON.stringify(text));
    seen.add(text);
    if (text.length > 60) allowBad.push('long ' + text.length + ' ' + JSON.stringify(text));
    const mail = cleanMailText(text);
    const say = filterSay(text);
    if (mail.ok !== say.ok) disagree.push(JSON.stringify(text) + ' mail=' + reason(mail.ok, mail.reason) + ' say=' + reason(say.ok, say.reason));
    if (!mail.ok || !say.ok) allowBad.push(JSON.stringify(text) + ' mail=' + reason(mail.ok, mail.reason) + ' say=' + reason(say.ok, say.reason));
  }
  return {
    blockPass: BLOCK_LINES.length - blockBad.length,
    blockTotal: BLOCK_LINES.length,
    allowPass: ALLOW_LINES.length - allowBad.length,
    allowTotal: ALLOW_LINES.length,
    blockBad, allowBad, disagree,
  };
}
