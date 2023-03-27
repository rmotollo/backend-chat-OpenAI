import dotenv from "dotenv";

dotenv.config({ path: 'c:/ambiente-dev/chatBOT - chatGPT_v01/server/.env' })

export function getEnvVar() {
    return process.env;
}