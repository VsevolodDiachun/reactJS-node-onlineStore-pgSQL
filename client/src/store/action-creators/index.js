/* eslint-disable import/no-anonymous-default-export */
import {userActionCreators} from "./user";
import {deviceActionCreators} from "./device";

export default {
    ...userActionCreators,
    ...deviceActionCreators
}