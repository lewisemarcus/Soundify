import pkg from "jsonwebtoken"
const { verify } = pkg
// const secret = "mysecretssshhhhhhh"
const expiration = "2h"

export function authMiddleware({ req }) {
    let token =
        req.body.variables.token || req.query.token || req.headers.authorization
    console.log(req.body.variables.token)
    if (req.headers.authorization) {
        token = token.split(" ").pop().trim()
    }

    if (!token) {
        return req
    }

    try {
        const { data } = verify(token, { maxAge: expiration })
        console.log(data)
        req.user = data
    } catch {
        console.log("Invalid token")
    }

    return req
}
