const userRouter = require('./userRoutes');
const subjectRouter = require('./subjectRoutes');
const classRouter = require('./classRoutes');
const assetRouter = require('./assetRoutes');
const notesRouter = require('./notesRoutes');
const walletRouter = require('./walletRoutes');
const enrollmentRouter = require('./enrollmentRoutes')

module.exports = {
    userRouter,
    subjectRouter,
    classRouter,
    assetRouter,
    notesRouter,
    walletRouter,
    enrollmentRouter
}