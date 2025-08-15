import app from "./src/app.js"
import connectDB  from "./src/db/user.db.js"

connectDB();


app.listen(3000,()=>{
    console.log("server is running on pert 3000")
})