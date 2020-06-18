const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.signup = (req, res) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        const user = new User({
            email: req.body.email,
            password: hash,
        });
        user.save()
            .then(() => res.status(201).json({message: "User created"}))
            .catch((error) => res.status(500).json({error}));
    });
    return true;
};

exports.login = (req, res) => {
    User.findOne({email: req.body.email})
        .then((user) => {
            if (!user) {
                return res.status(401).json({error: "User not found"});
            }
            bcrypt
                .compare(req.body.password, user.password)
                .then((valid) => {
                    if (!valid) {
                        return res.status(401).json({error: "Wrong password"});
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            {userId: user._id},
                            "VMvpi62eztD2fzfw2Wu6mtHeDIsijaoQuuGa2JPv6CRjXL3HXpJLcMOpeEQ68Mt",
                            {expiresIn: "24h"},
                        ),
                    });
                    return true;
                })
                .catch((error) => res.status(500).json({error}));
            return true;
        })
        .catch((error) => res.status(500).json({error}));
    return true;
};

exports.setBonusLeaves = async (req, res) => {
    try {
        const getTotalLeavesPlayers = await User.aggregate([
            {
                $group: {
                    _id: null,
                    total: {
                        $sum: "$leaves",
                    },
                },
            },
        ]).exec();

        const totalLeavesPlayers = getTotalLeavesPlayers[0].total;

        const amountPlayers = await User.countDocuments({});

        const bonusLeaves = totalLeavesPlayers / amountPlayers;

        const addBonusLeaveToUser = await User.updateOne(
            {_id: req.userId},
            {$inc: {leaves: bonusLeaves}},
        );
    } catch (error) {
        res.status(500).json({error});
    }
    return true;
};
