# The Wizarding World of Annie ✨

A Harry Potter themed interactive gift site: cinematic intro, Hogwarts letter, Sorting Hat, four playable games, music section, Marauder's Map, photo frames, a "new chapter" story and a final message. Plain HTML, CSS and JavaScript. No backend.

## Open it
Keep `index.html`, `style.css` and `script.js` in one folder and double-click `index.html`. (Google Fonts need internet.)

## Customize (all in `CONFIG` at the top of `script.js`)
- **Name:** `friendName` (the browser title updates too).
- **Personal message:** `message`. Use `\n` for new lines.
- **Quiz and trivia:** edit `sorting`, `houses` and `trivia`. Add more trivia questions by copying a line.
- **Colors:** the variables at the top of `style.css`. **Fonts:** the Google Fonts link in `index.html` and `font-family` in `style.css`.

## Music
Hedwig's Theme plays through an official Spotify embed (the original John Williams track from the Sorcerer's Stone soundtrack); no audio files are bundled. To use another track, change `musicEmbed` in `script.js` to a Spotify embed link (Share > Embed > copy the `src`). Spotify may only play a 30-second preview unless the listener is logged in. The SOUND button controls small synthesized effects only.

## Games
- **Golden Snitch:** 30 seconds, click the moving snitch, it speeds up.
- **Spell Casting:** match the effect to the spell (click or keys 1-4), with combos.
- **Trivia:** multiple choice with explanations.
- **Memory Charm:** match all 8 pairs.
- **Quidditch Target Challenge:** tap the hoops for 30 seconds; chain hits for combos.

## Easter eggs
Type `mischief managed`, `lumos` or `accio`. Tap the moon 5 times for a secret for Annie.

## Deploy
- **GitHub Pages:** create a repo, upload the files, then Settings > Pages > deploy from the `main` branch root.
- **Netlify:** go to app.netlify.com/drop and drag the folder in.
