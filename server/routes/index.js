import { router as getSongs } from "./songs/getSongs.js"

import { router as postSong } from "./songs/addSong.js"

import { router as deleteSong } from "./songs/deleteSong.js"

import { router as userAuth } from "./user/authRoutes.js"

export { getSongs, postSong, deleteSong, userAuth }
