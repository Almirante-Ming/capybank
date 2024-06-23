const nodemailer = require('nodemailer')
const { readColumn, updateColumn } = require('../database/db')

const EMAIL_USER = "CapiBank"
const EMAIL_ADRESS = "capibank3@gmail.com"
const EMAIL_PASSWORD = "xhze ohif evth rule"

async function sendEmail(email) {

    async function checkEmail(email) {

        try {

            const database = await readColumn(`SELECT * FROM dados_clientes WHERE email = '${email}';`)
            if (database.rowCount == 0) { return { outcome: 400, response: "Email não encontrado" } } 

            const update_pwd = await updatePassword(email)
            if (update_pwd.operation.outcome == 400) { return { outcome: 400, response: "Não foi possível alterar a senha!" } }

            const sending = await sendNewPassword(email, update_pwd.new_password)
            return sending
            
        }

        catch (err) {
            console.error(err)
            return { outcome: 500, response: "Erro interno do servidor" }
        }
    }

    return checkEmail(email)
}

async function updatePassword(email) {
    const new_password = generatePassword()
    const operation = await updateColumn(`UPDATE dados_clientes SET senha = $1 WHERE email = $2`, [new_password, email])
    return { operation, new_password }
}

async function sendNewPassword(email, new_pwd) {
    const transporter = authenticate()
    return new Promise((resolve, reject) => {
        transporter.sendMail({
            from: `${EMAIL_USER} <${EMAIL_ADRESS}>`,
            to: `${email}`,
            subject: "Geração de nova senha",
            html: `<h1>Alteração de senha</h1> <hr> <p style = "font-size: 18px;"> Sua nova senha: <strong>${new_pwd}</strong> <br> Faça login utilizando-a!`,
        }, (err) => {
            if (err) {
                console.log(err)
                return reject({ outcome: 400, response: "Algo deu errado! Digite seu e-mail novamente." })
            }
            resolve({ outcome: 200, response: "Sua nova senha foi enviada ao e-mail!" })
        })
    })
}

function generatePassword() {
    
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('')
    const numbers = '0123456789'.split('')
    const special = ['@', '#', '$', '%', '&', '!']
    const new_password = []

    function getRandom(max) {
        return Math.floor((Math.random() * max))
    }

    for (let i = 0; i < 1; i++) {
        new_password.push(alphabet[(getRandom(alphabet.length))])
        new_password.push(numbers[(getRandom(numbers.length))])
        new_password.push(special[(getRandom(special.length))])
        new_password.push(alphabet[(getRandom(alphabet.length))])
        new_password.push(numbers[(getRandom(numbers.length))])
        new_password.push(special[(getRandom(special.length))])
    }

    return new_password.join('')
}

function authenticate() {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: EMAIL_ADRESS,
            pass: EMAIL_PASSWORD
        },
    })
    return transporter
}

module.exports = { sendEmail }
