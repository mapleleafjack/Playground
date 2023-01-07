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