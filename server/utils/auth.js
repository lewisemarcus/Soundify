import pkg from "jsonwebtoken"
const { verify } = pkg
// const secret = "mysecretssshhhhhhh"
const expiration = "2h"

export function authMiddleware({ req }) {
    let token = req.body.token || req.query.token || req.headers.authorization

    if (req.headers.authorization) {
        token = token.split(" ").pop().trim()
    }

    if (!token) {
        return req
    }

    try {
        const { data } = verify(token, { maxAge: expiration })

        req.user = data
    } catch {
        console.log("Invalid token")
    }

    return req
}
