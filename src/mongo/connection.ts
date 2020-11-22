import mongoose from 'mongoose';
import { environment } from '@env';

export class MongoDB {

    public static connect(): void {
        console.log('mongo uri', String(environment.MONGODB_URI));
        mongoose.connect(String(environment.MONGODB_URI), { useNewUrlParser: true })
            .then(() => {
                console.log("Mongo connected");
            }).catch((e) => {
                console.log('error mongo', e);
                console.log('Mongodb connection failed.');
            })
    }

}