export const getBarConstants = (dataArray: Uint8Array, bottomFrequency: number, topFrequency: number, resolution: number) => {
    const sampleRate = 44100;

    const lowIndex = Math.floor(bottomFrequency / sampleRate * dataArray.length);
    const highIndex = Math.ceil(topFrequency / sampleRate * dataArray.length);
    const bandSize = Math.ceil((highIndex - lowIndex) / resolution);

    return {
        lowIndex,
        highIndex,
        bandSize
    };
}

export const getBandAmplitude = (i: number, dataArray: Uint8Array, lowIndex: number, bandSize: number) => {
    let bandAmplitude = 0;
    for (let j = lowIndex + i * bandSize; j < lowIndex + (i + 1) * bandSize; j++) {
        bandAmplitude += dataArray[j];
    }
    return bandAmplitude;
}

const noteStrings = [
    "C",
    "C#",
    "D",
    "D#",
    "E",
    "F",
    "F#",
    "G",
    "G#",
    "A",
    "A#",
    "B",
];

export const frequencyToNoteAndCents = (frequency: number) => {
    const noteNum = 12 * (Math.log(frequency / 440) / Math.log(2)) + 69;
    const roundedNoteNum = Math.round(noteNum);
    const cents = Math.floor(100 * (noteNum - roundedNoteNum));
    const octave = Math.floor(roundedNoteNum / 12) - 1;
    const noteName = noteStrings[roundedNoteNum % 12];

    return {
        note: `${noteName}${octave}`,
        cents,
    };
}