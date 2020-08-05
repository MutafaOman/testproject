var moment = require('moment')

const checkStartEndDate = async req => {
    let today = moment().set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
    let tomorrow = moment().add(1, 'days')
    const d_start = (req.query.start) ? moment(req.query.start) : today;
    const d_end = (req.query.end) ? moment(req.query.end) : tomorrow;
    const start = d_start.clone().hours(0).minutes(0).seconds(0).milliseconds(0).toDate()
    const end = d_end.clone().hours(23).minutes(59).seconds(59).milliseconds(100).toDate()
    return { start: start, end: end };
};

const checkStartEndDateBody = async req => {
    let today = moment().set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
    let tomorrow = moment().add(1, 'days')
    const d_start = (req.body.start) ? moment(req.body.start) : today;
    const d_end = (req.body.end) ? moment(req.body.end) : tomorrow;
    const start = d_start.clone().hours(0).minutes(0).seconds(0).milliseconds(0).toDate()
    const end = d_end.clone().hours(23).minutes(59).seconds(59).milliseconds(100).toDate()
    return { start: start, end: end };
};

const getStart = async req => {
    let today = moment().set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
    let tomorrow = moment().add(1, 'days')
    const d_start = (req.query.start) ? moment(req.query.start).set({ hour: 0, minute: 0, second: 0, millisecond: 0 }) : today;
    const d_end = (req.query.start) ? moment(req.query.start).add(1, 'days') : tomorrow;
    const start = d_start.toDate()
    const end = d_end.toDate()
    return { start: start, end: end };
};

const checkStartEndDate0 = async req => {
    let today = moment().set({
        hour: 0,
        minute: 0,
        second: 0,
        millisecond: 0
    })
    const d_start = (req.query.start) ? moment(req.query.start) : today;
    const d_end = (req.query.end) ? moment(req.query.end) : today;
    const start = d_start.clone().hours(7).minutes(0).seconds(0).milliseconds(100).toDate()
    const end = d_end.clone().hours(7).minutes(0).seconds(0).milliseconds(100).toDate()
    return {
        start: start,
        end: end
    };
};

const pagingManage = async req => {
    let paging = req.body.page ? req.body.page - 1 : 0
    let pagNum = 20
    return {
        skip: paging * pagNum,
        limit: pagNum
    };
};

const calMethod = {
    checkStartEndDate,
    checkStartEndDateBody,
    getStart,
    checkStartEndDate0,
    pagingManage
};

module.exports = calMethod;