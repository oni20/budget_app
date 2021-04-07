const express = require("express");
const router = express.Router();
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

router.use((_req, _res, next) => {
    //console.log('Middleware from input router and user', _res);
    next();
})

const readUsers = () => {
    const userData = fs.readFileSync("./data/users.json");
    const parsedData = JSON.parse(userData);
    return parsedData;
};

router.get('/getuserinfo', async (req, res) => {
    try {
        const users = readUsers();
        const selectedUser = users.find(user => user.id === req.query.id);
        res.status(200).json(JSON.stringify(selectedUser));
    } catch {
        res.sendStatus(404)
    }
});

router.post("/addexpense", async (req, res) => {
    try {
        const newUserData = JSON.parse(req.body.data);
        const users = readUsers();

        users.map(user => {
            if (user.email == newUserData.email) {
                if (newUserData.income > 0) {
                    user.income = newUserData.income;
                }
                user.expenditure = newUserData.expenditure
            }
        })
        fs.writeFileSync("./data/users.json", JSON.stringify(users));
        const selectedUser = users.find(user => user.email === newUserData.email);
        res.status(200).json(JSON.stringify(selectedUser));
        return;
    }
    catch {
        res.status(500).send('Server error');
    }
});

router.delete("/deleteexpense", async (req, res) => {
    try {
        const payLoad = req.body;
        const users = readUsers();
        const selectedUserIndex = users.findIndex(user => user.email === payLoad.email);
        const filteredExpenditure = users[selectedUserIndex].expenditure.filter(item=> !payLoad.deletedRows.includes(item.id.toString()))
        
        users[selectedUserIndex].expenditure = filteredExpenditure;
        fs.writeFileSync("./data/users.json", JSON.stringify(users));
        
        res.status(200).json(JSON.stringify(users[selectedUserIndex]));
        return;
    }
    catch (e){
        res.status(500).send('Server error');
    }
});

module.exports = router;