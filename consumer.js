/* eslint-disable no-console */
const { handlerFailure, handlerCompleted, handlerStalled } = require('./handler')
const { connectQueue } = require('./config')
const fs = require('fs')
const path = require('path')

const nameQueue = 'request-json-file'
const cases = connectQueue(nameQueue)
/*
  @description initial all job queue
*/

const processJob = (job, done) => {
    try {
        console.info(`running job! with id ${job.id}`)
        const obj = JSON.parse(fs.readFileSync(path.join("countries.json"), "utf8"));
        const data = obj.find(item => {
            return item.code == job.data.param
        })
        fs.writeFile(`${job.data.param}.json`, JSON.stringify(data), function (err) {
            if (err) throw err;
        }
        );
        done(null, 'succes')
    } catch (error) {
        done(null, error)
    }
}

const initJob = () => {
    console.info('job is working!');
    cases.process(processJob);
    cases.on('failed', handlerFailure);
    cases.on('completed', handlerCompleted);
    cases.on('stalled', handlerStalled);
}

initJob()
