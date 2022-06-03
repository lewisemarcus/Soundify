import pkg from "jsonwebtoken"
const { verify } = pkg
const secret = "UNSAFE_STRING"
const expiration = Math.floor(Date.now() / 1000) + 60 * 60

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
        const data = verify(
            token,
            secret,
            { maxAge: expiration },
            (err, decoded) => {
                if (err) console.error(err)
                else return decoded
            },
        )
        req.user = data
    } catch {
        console.log("Invalid token")
    }
    return req
}
