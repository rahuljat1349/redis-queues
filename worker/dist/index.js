"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("redis");
const client = (0, redis_1.createClient)();
const processData = (data) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("data: ", data);
    console.log("processing data...");
    yield new Promise(resolve => setTimeout(resolve, 2000));
    console.log("finished process!");
});
const startWorker = (() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield client.connect();
        console.log("worker conected to redis!");
        while (true) {
            try {
                const data = yield client.brPop("data", 0);
                yield processData(data);
            }
            catch (error) {
                console.error("error processing data", error);
            }
        }
    }
    catch (error) {
        console.error("failed to connect to redis", error);
    }
}))();
