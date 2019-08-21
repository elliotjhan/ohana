const express = require('express');

function entries ( connection ) {
    const router = express.Router();
    router.post('/create/naps', (req, res, next) => {
        const { userId, babyId, otherInfo } = req.query; 
        if (!userId || !babyId || !otherInfo) {
            return res.status(400).send({
                "error": ["ensure that userId, babyId, AND otherInfo are all provided."]
            })
        }
        const startedAt = new Date(req.query.startedAt);
        const finishedAt = new Date();
        const entryType = "naps";
        let query = 'INSERT INTO \`baby_entries\` \
                    ( \`baby_id\`, \`user_id\`,\`started_at\`, \`finished_at\`, \`date\`, \`entry_type\`, \`other_info\`) \
                    VALUES ( ?, ?, ?, ?, date(?), ?, ?)';
        let insert = [babyId, userId, startedAt, finishedAt, finishedAt, entryType, otherInfo];
        connection.query(query, insert, (err, result) => {
            if (err) return next(err);
            const output = {
                success: true,
                data: result
            }
            res.json(output);
        })
    });
    
    router.post('/create/changes', (req, res, next) => {
        const { userId, babyId, otherInfo } = req.query;
        if (!userId || !babyId || !otherInfo) {
            return res.status(400).send({
                "error": ["ensure that userId, babyId, AND otherInfo are all provided."]
            });
        }
        let changeType;
        if (otherInfo == 1) {
            changeType = '1';
        } else if (otherInfo == 2) {
            changeType = '2';
        } else {
            return res.status(422).send({
                "error": ["otherInfo must be 1 or 2"]
            });
        }
        const finishedAt = new Date();
        const entryType = "changes";
        let query = 'INSERT INTO \`baby_entries\` \
                    (\`id\`, \`baby_id\`, \`user_id\`,\`started_at\`, \`finished_at\`, \`date\`, \`entry_type\`, \`other_info\`) \
                    VALUES (NULL, ?, ?, NULL, ?, date(?), ?, ?)'; 
        let insert = [babyId, userId, finishedAt, finishedAt, entryType, changeType];
        connection.query(query, insert, (err, result) => {
            if (err) return next(err);
            const output = {
                success: true,
                data: result
            };
            res.json(output);
        })
    })
    
    router.post('/create/feedings', (req, res, next) => {
        const { userId, babyId, otherInfo } = req.query;
        if (!userId || !babyId || !otherInfo) {
            return res.status(400).send({
                "error": ["ensure that userId, babyId, AND otherInfo are all provided."]
            })
        }
        const finishedAt = new Date();
        const entryType = "feedings";
        let query = 'INSERT INTO \`baby_entries\` \
                    (\`id\`, \`baby_id\`, \`user_id\`,\`started_at\`, \`finished_at\`, \`date\`, \`entry_type\`, \`other_info\`) \
                    VALUES (NULL, ?, ?, NULL, ?, date(?), ?, ?)';
        let insert = [babyId, userId, finishedAt, finishedAt, entryType, otherInfo];
        connection.query(query, insert, (err, result) => {
            if (err) return next(err);
            const output = {
                success: true,
                data: result
            }
            res.json(output);
        })
    });
    
    router.post('/delete', (req, res, next) => {
        const { id } = req.query;
        let query = 'DELETE FROM \`baby_entries\` \
                        WHERE \`baby_entries\`.\`id\` = ?';
        let insert = [id];
        connection.query(query, insert, (err, result) => {
            if (err) return next(err);
            const output = {
                success: true,
                data: result
            }
            res.json(output);
        })
    });
    
    router.post('/update', (req, res, next) => {
        const { id, entryType, otherInfo } = req.query;
        console.log(id);
        const finishedAt = new Date(req.query.finishedAt);
        console.log(finishedAt);
        if (!id) {
            res.status(400).send({
                errors: ['Please make sure you provided an entry (id) from table baby_entries']
            });
        }
        if (entryType === "changes") {
            if (otherInfo == 1) {
                changeType = '1';
            } else if (otherInfo == 2) {
                changeType = '2';
            } else {
                res.status(400).send({
                    errors: ['Please make sure that otherInfo is 1 or 2']
                })
            }
        }
        if (!entryType || !otherInfo) {
            res.status(400).send({
                errors: ["Please make sure you provided both the entryType and otherInfo"]
            });
        } 
        let query = 'UPDATE `baby_entries` \
                        SET `finished_at` = ?, \
                            `entry_type` = ?, \
                            `other_info` = ? \
                    WHERE `baby_entries`.`id` = ?';
        let insert = [finishedAt, entryType, otherInfo, id];
        connection.query(query, insert, (err, result) => {
            if (err) return next(err);
            console.log(result);
            const output = {
                success: true,
                data: result
            };
            res.json(output);
        })
    });
    return router; 
}

module.exports = entries;
