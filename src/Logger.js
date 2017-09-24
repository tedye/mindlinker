/**
 * Created by kfang on 9/19/17.
 */
import Config from './config'

export function logDebugInfo(info) {
    if (Config.debug) {
        console.log(info)
    }
}