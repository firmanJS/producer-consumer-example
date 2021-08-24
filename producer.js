const { connectQueue } = require('./config')

const jobOptions = {
    // jobId, uncoment this line if your want unique jobid
    removeOnComplete: true, // remove job if complete
    delay: 60000, // 1 = 60000 min in ms
    attempts: 3 // attempt if job is error retry 3 times
};

const nameQueue = 'request-json-file'

const init = async (data) => {
    return await connectQueue(nameQueue).add(data, jobOptions)
}
const countryCode = ['ID', 'RU', 'TR', 'IT']
for (let i = 0; i < countryCode.length; i++) {
    const data = {
        message: `hello from producer i am request to consumer file json country with code ${countryCode[i]}`,
        param: countryCode[i]
    }
    init(data).then(res => {
        console.info(res.data.message)
    })
}
