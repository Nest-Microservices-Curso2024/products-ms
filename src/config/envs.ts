import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
    PORT: number;
}

const envsShema = joi.object({
    PORT: joi.number().required(),
    DATABASE_URL: joi.string().required()
})
.unknown(true);

const { error, value } = envsShema.validate( process.env ) ; 
if ( error ) {
 throw new Error(`Config validation error: ${ error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
    port: envVars.PORT,
}
