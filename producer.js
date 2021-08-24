const { connectQueue } = require('./config')

const jobOptions = {
    // jobId, uncoment this line if your want unique jobid
    removeOnComplete: true, // remove job if complete
    delay: 60000, // 1 = 60000 min in ms
    attempts: 3 // attempt if job is error retry 3 times
};

const data = {
    message: 'hello from producer i am request to consumer file json country',
    param: 'AF'
}
const nameQueue = 'request-json-file'

const init = async () => {
    return await connectQueue(nameQueue).add(data, jobOptions)
}

init().then(res => {
    console.info(res.data)
})