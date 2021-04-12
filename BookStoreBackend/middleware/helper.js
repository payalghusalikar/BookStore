/**
 * @module       Middleware
 * @file         helper.js
 * @description  holds the logical reusable methods calling from service class
 * @author       Payal Ghusalikar <payal.ghusalikar9@gmail.com>
*  @since        27/01/2021  
-----------------------------------------------------------------------------------------------*/

//const jwt = require("jsonwebtoken");
const express = require("express");
const app = express();
const bcrypt = require("bcrypt");

require("dotenv").config();

var jwt = require('jsonwebtoken');
// require("../config").set(process.env.NODE_ENV, app);
 const config = require("../config").get();
 const { logger } = config;
class Helper {

    /**
     * @description verify the user to authorized user's role
     * @param {*} req
     * @param {*} res
     * @param {*} next
     */
    addRole = (role) => {
        console.log("verify user")
        return (req, res, next) => {
            req.role = role;
            next();
        }
    };


    encryptPassword = (password, callback) => {
        console.log("encryptPassword user", password)
            //if (this.isModified("password")) {
        bcrypt.hash(password, 10, (err, hash) => {
                if (err)
                    return callback(err, null);
                return callback(null, hash);
            })
            // console.log("encryptPassword user new", password)
            // return password
            //  this.confirmPassword = undefined;
            // }
    }

    /**
     * @description create the token
     * @param {} data
     */
    generateToken = (user) => {
        const token = jwt.sign({
                emailId: user['user'].emailId,
                userId: user.id,
                role: user['user'].role
            },
            process.env.SECRET_KEY, {
                expiresIn: "60d",
            });
        return token;
    }


    verifyRole = (req, res, next) => {
     
        console.log("verify")

     //   const token = req.headers.token;
        const token =   req.headers.authorization.split(" ")[1];

        console.log("token", token)
       // console.log("token1", token1)
        if (token === undefined) {
            logger.error('Incorrect token or token is expired');
            return res.status(401).send({ success: false, message: 'Incorrect token or token is expired' });
        }

        return jwt.verify(token, process.env.SECRET_KEY, (error, decodeData) => {
            if (error) {
                logger.error('Incorrect token or token is expired');
                return res.status(401).send({ success: false, message: 'Incorrect token or token is expiredd ', error });
            } else if (decodeData.role != 'admin') {
                console.log("decodeData", decodeData)
                logger.error('Authorization failed');
                return res.status(401).send({ success: false, message: 'Authorization failed' });
            }
            req.decodeData = decodeData;
            next();
        });
    }

}

module.exports = new Helper();