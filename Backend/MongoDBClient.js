import mongoose from "mongoose";

class MongoDBClient {
    constructor(uri) {
        this.uri = uri;
        this.isConnected = false;
    }

    async connect() {
        try {
            const conn = await mongoose.connect(this.uri, {
                serverSelectionTimeoutMS: 3000
            });
            this.isConnected = true;
            console.log("MongoDb is Successfully Connected");
        } catch (error) {
            this.isConnected = false;
            console.error('MongoDb connection failed')
            console.error(error.message)
            process.exit(1);
        }
    }

}

export default MongoDBClient;