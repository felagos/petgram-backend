import mongoose from 'mongoose';
import { environment } from '@env';

export class MongoDB {

    public static connect(): void {
        mongoose.connect(String(environment.MONGODB_URI), { useNewUrlParser: true })
            .then(() => {
                console.log("Mongo connected");
            }).catch(() => {
                console.log('Mongodb connection failed.');
            })
    }

}