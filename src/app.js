import express from 'express';
import router from './router';
import mongoose from 'mongoose';

class App {

    constructor() {
        this.app = new express();
        
        mongoose.set('useNewUrlParser', true);
        mongoose.set('useFindAndModify', false);
        mongoose.set('useCreateIndex', true);
        mongoose.set('useUnifiedTopology', true); 
        
        mongoose.connect('mongodb+srv://assti:assti@projecthotel-ugpl5.mongodb.net/hotel-project?retryWrites=true&w=majority');
     
        this.middlewares();
        this.routes();
    }   

    middlewares(){
        this.app.use(express.json());
    }


    routes() {
        this.app.use(router);
    }

}

export default new App().app 