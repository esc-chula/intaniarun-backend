import { CorsOptions } from 'cors';

const corsOptions: CorsOptions = {
    origin: [
        'http://localhost:3000',
        'https://run.chula.engineering',
        'https://staging.run.chula.engineering',
        'https://chulaintaniarun2024.com',
        'https://preview.chulaintaniarun2024.com',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
};

export default corsOptions;
