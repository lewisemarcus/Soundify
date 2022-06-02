import pkg from "jsonwebtoken"
const { verify } = pkg
const secret = "UNSAFE_STRING"
const expiration = "2h"

export function authMiddleware({ req }) {
    let token =
        req.body.variables.token || req.query.token || req.headers.authorization

    if (req.headers.authorization) {
        token = token.split(" ").pop().trim()
    }

    if (!token) {
        return req
    }

    try {
        const { data } = verify(
            token,
            secret,
            { maxAge: expiration },
            async function (err, decoded) {
                if (err) console.log(err)
                else req.user = decoded
            },
        )
    } catch {
        console.log("Invalid token")
    }
    return req
}
