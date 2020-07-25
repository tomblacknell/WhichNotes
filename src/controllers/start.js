const chords = require('./chords');
const chordList = Object.keys(chords);
const notes = require('./notes');

const heldNotes = new Set();

const orange = '#CC5803';
const white = '#FEF7F0';
const black = '#1F1300';

const setContainsNotes = (heldNotes, goalNotes) => {
  return goalNotes.every((note) => heldNotes.has(note))
}

let goalChord = chords["C Major"];
let found = false;

console.log('hello');

setInterval((note) => {
  if (!found && setContainsNotes(heldNotes, goalChord)) {
    console.log('Correct! Changing goal chord...');
    found = true;
    console.log('chordList', chordList)
    goalChordName = chordList[Math.ceil(Math.random()*chordList.length)-1]
    console.log('goal chord name', goalChordName);
    goalChord = chords[goalChordName];
    document.getElementById('goalChord').textContent = goalChordName;
  } else {
    found = false;
  }
  console.log('Goal Chord: ', goalChord);
}, 1500, goalChord);

const onMidiEvent = (event) => {
  const [type, key, velocity] = event.data.toString().split(',');
  if (type == 144 || type == 128) {
    const note = notes[key % 12];
    const octave = Math.floor(key / 12) - 4;
    switch (type) {
      case "144": {
        heldNotes.add(note);
        changeNoteColour(octave, note, orange);
        break;
      }
      case "128": {
        heldNotes.delete(note);
        changeNoteColour(octave, note, note.length == 2 ? black : white);
        break;
      }
      default: break;
    }
  }
}

const changeNoteColour = (octave, note, color) => {
  document.getElementById(`octave-${octave}-${note}-key`)
    .style.fill = color;
};

const start = () => {
  if (!navigator.requestMIDIAccess) {
    alert('Browser does not support MIDI');
    return false;
  }
  console.log('Browser supports MIDI');
  navigator.requestMIDIAccess()
    .then((midi) => {
      console.log('Accessed MIDI', midi)
      var inputs = midi.inputs.values();
      for (var input = inputs.next(); input && !input.done; input = input.next()) {
        input.value.onmidimessage = onMidiEvent;
      }
    })
    .catch((err) => console.error('Failed to access MIDI', err));
}

export default start;
