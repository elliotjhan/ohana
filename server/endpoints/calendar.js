const express = require('express');

function calendar( connection ) {
    const router = express.Router();
    router.get('/entries', (req, res, next) => {
        if (!req.query.date) {
            return res.status(400).send({
                errors: ['No date provided'],
            });
        }
        const date = (req.query.date);
        if (date.toString() === "Invalid Date") {
            return res.status(400).send({
                errors: ["date must be a valid date string"]
            })
        };
        let query = 'SELECT id, user_id, baby_id, entry_type, other_info, finished_at \
                    FROM \`baby_entries\` WHERE date = date(?)';
        let insert = [date];
        connection.query(query, insert, (err, result) => {
            if (err) return next(err);
            res.status(200).json({
                "entries": result
            }); 
        });
    });
    
    router.get('/entries/all', (req, res, next) => {
        let query = 'SELECT * FROM \`baby_entries\`';
        connection.query(query, (err, result) => {
            if (err) return next(err);
            res.json({
                data: result
            });
        })
    });
    return router;
}


module.exports = calendar;