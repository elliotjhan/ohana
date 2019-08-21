const express = require('express');

function graph ( connection ) {
    const router = express.Router();
    router.get('/graph/changes', (req, res, next) => {
        const changesArr = [0, 0, 0, 0, 0, 0, 0];
        let today = new Date();
        let entryType = "changes";
        let query = 'SELECT COUNT(*), dates.date, b.entry_type from \`baby_entries\` as b \
                    RIGHT JOIN ( \
                        SELECT date(?) as date \
                            UNION ALL \
                        SELECT DATE_SUB(date(?), INTERVAL 1 DAY) as date \
                            UNION ALL \
                        SELECT DATE_SUB(date(?), INTERVAL 2 DAY) as date \
                            UNION ALL \
                        SELECT DATE_SUB(date(?), INTERVAL 3 DAY) as date \
                            UNION ALL \
                        SELECT DATE_SUB(date(?), INTERVAL 4 DAY) as date \
                            UNION ALL \
                        SELECT DATE_SUB(date(?), INTERVAL 5 DAY) as date \
                            UNION ALL \
                        SELECT DATE_SUB(date(?), INTERVAL 6 DAY) as date \
                    ) as dates ON b.date = dates.date AND b.entry_type = ? \
                    GROUP BY b.entry_type, dates.date ORDER BY b.date ASC, b.entry_type ASC';
        let inserts = [today, today, today, today, today, today, today, entryType];
        connection.query( query, inserts, (err, result) => {
            if (err) return next(err);
            let i = 0;
            result.forEach(res => {
                if(res["entry_type"] === null) {
                    changesArr[i] = 0;
                    i++;
                } else {
                    changesArr[i] = res["COUNT(*)"];
                    i++;
                }
            })
            res.json({
                "changes": changesArr
            })
        });
    });
    
    router.get('/graph/feedings', (req, res, next) => {
        const feedingsArr = [0, 0, 0, 0, 0, 0, 0];
        let today = new Date();
        let entryType = "feedings";
        let query = 'SELECT COUNT(*), dates.date, b.entry_type from \`baby_entries\` as b \
                    RIGHT JOIN ( \
                        SELECT date(?) as date \
                            UNION ALL \
                        SELECT DATE_SUB(date(?), INTERVAL 1 DAY) as date \
                            UNION ALL \
                        SELECT DATE_SUB(date(?), INTERVAL 2 DAY) as date \
                            UNION ALL \
                        SELECT DATE_SUB(date(?), INTERVAL 3 DAY) as date \
                            UNION ALL \
                        SELECT DATE_SUB(date(?), INTERVAL 4 DAY) as date \
                            UNION ALL \
                        SELECT DATE_SUB(date(?), INTERVAL 5 DAY) as date \
                            UNION ALL \
                        SELECT DATE_SUB(date(?), INTERVAL 6 DAY) as date \
                    ) as dates ON b.date = dates.date AND b.entry_type = ? \
                    GROUP BY b.entry_type, dates.date ORDER BY b.date ASC, b.entry_type ASC';
        let inserts = [today, today, today, today, today, today, today, entryType];
        connection.query( query, inserts, (err, result) => {
            if (err) return next(err);
            let i = 0;
            result.forEach(res => {
                if(res["entry_type"] === null) {
                    feedingsArr[i] = 0;
                    i++;
                } else {
                    feedingsArr[i] = res["COUNT(*)"];
                    i++;
                }
            })
            res.json({
                "feedings": feedingsArr
            })
        });
    });
    
    router.get('/graph/naps', (req, res, next) => {
        const napsArr = [0, 0, 0, 0, 0, 0, 0];
        let today = new Date();
        let entryType = "naps";
        let query = 'SELECT COUNT(*), dates.date, b.entry_type from \`baby_entries\` as b \
                    RIGHT JOIN ( \
                        SELECT date(?) as date \
                            UNION ALL \
                        SELECT DATE_SUB(date(?), INTERVAL 1 DAY) as date \
                            UNION ALL \
                        SELECT DATE_SUB(date(?), INTERVAL 2 DAY) as date \
                            UNION ALL \
                        SELECT DATE_SUB(date(?), INTERVAL 3 DAY) as date \
                            UNION ALL \
                        SELECT DATE_SUB(date(?), INTERVAL 4 DAY) as date \
                            UNION ALL \
                        SELECT DATE_SUB(date(?), INTERVAL 5 DAY) as date \
                            UNION ALL \
                        SELECT DATE_SUB(date(?), INTERVAL 6 DAY) as date \
                    ) as dates ON b.date = dates.date AND b.entry_type = ? \
                    GROUP BY b.entry_type, dates.date ORDER BY b.date ASC, b.entry_type ASC';
        let inserts = [today, today, today, today, today, today, today, entryType];
        connection.query( query, inserts, (err, result) => {
            if (err) return next(err);
            let i = 0;
            result.forEach(res => {
                if(res["entry_type"] === null) {
                    napsArr[i] = 0;
                    i++;
                } else {
                    napsArr[i] = res["COUNT(*)"];
                    i++;
                }
            })
            res.json({
                "naps": napsArr
            })
        });
    });
    return router;
}



module.exports = graph;