/**
 * Created by kfang on 7/2/17.
 */
import Phasetips from './Phasetips'

export default function addTooltip(gameInstance, targetObject, msg, position) {
    new Phasetips(gameInstance, {
        targetObject: targetObject,
        context: msg,
        position: position,
        backgroundColor: 0x33BBFF
})
}