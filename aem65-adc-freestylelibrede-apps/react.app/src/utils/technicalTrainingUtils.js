export const completedTrainingStatus = "completed";
export const valueDecode = (buffervalue) => {
    let result = "";
    if (buffervalue != null && buffervalue != "" && buffervalue != undefined) {
        result = Buffer.from(buffervalue.toString())?.toString('base64');
    }
    return result;
}