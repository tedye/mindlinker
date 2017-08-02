/**
 * Created by kfang on 7/23/17.
 */
import SupportedBlocks from './SupportedBlocks'

export default function play(animationContext) {
    let stepCount = 0
    let sprite = animationContext.sprite
    const maxSteps = animationContext.maxSteps
    let passPath = animationContext.passPath
    let failed = false
    let path = []
    let anglesNumber = [Math.PI / 2, Math.PI / 3, Math.PI / 6, 0, Math.PI * 11 / 6, Math.PI * 5 / 3, Math.PI * 3 / 2, Math.PI * 4 / 3, Math.PI * 7 / 6, Math.PI, Math.PI * 5 / 6, Math.PI * 2 / 3]
    let angles = [90, 60, 30, 0, 330, 300, 270, 240, 210, 180, 150, 120]
    let currentClockPosition = animationContext.startClockPosition

    let addNewActionToMainSpriteActionQueue = function (name, xOffset, yOffset, audio) {
        console.log('Add action to main sprite action queue: ' + name + ' xOffset: ' + xOffset + ' yOffset: ' + yOffset)
        sprite.actionQueue.push({
            name: name,
            xOffset: xOffset,
            yOffset: yOffset,
            audio: audio
        })
    }

    let Turn = function (turnKey) {
        console.log('Animation Played: ' + turnKey)
        addNewActionToMainSpriteActionQueue(turnKey, 0, 0, 'turn')
    }

    let Walk = function (walkKey, xOffset, yOffset) {
        console.log('Animation Played: ' + walkKey)
        addNewActionToMainSpriteActionQueue(walkKey, xOffset, yOffset, 'walk')
    }

    let getWalkKey = function () {
        return 'Walk' + currentClockPosition
    }

    let getTurnKey = function (from, to, turnRight) {
        if (turnRight) {
            return 'TurnRight' + from + '_' + to
        } else {
            return 'TurnLeft' + from + '_' + to
        }
    }

    let getOffsets = function (dist) {
    console.log('Calculate Offset for position ' + currentClockPosition + ' and distance ' + dist)
        return {
            x : Math.round(Math.cos(anglesNumber[currentClockPosition]) * dist),
            y : Math.round(-1 * Math.sin(anglesNumber[currentClockPosition]) * dist)
        }
    }

    let getClosestClockPositionForAngle = function (angle) {
        let result = 0;
        let delta = Math.abs(angle - angles[0])
        for (let i = 1; i < 12; i++) {
            if (angles[i] === angle) {
                return i
            } else if (Math.abs(angle - angles[i]) < delta) {
                result = i;
                delta = Math.abs(angle - angles[i])
            }
        }
        return result
    }

    /**
     * Execute the animation given an action JSON object.
     */
    let playAnimation = function (block) {
        console.log('Play animation for ' + block.name)
        switch (block.name) {
            case SupportedBlocks.Walk:
                let distance = block.distance
                let offsets = getOffsets(distance)
                console.log('The offset is x = ' + offsets.x + ' and y = ' + offsets.y)
                Walk(getWalkKey(), offsets.x, offsets.y)
                path.push({
                    position: currentClockPosition,
                    dist: distance
                })
                break
            case SupportedBlocks.Turn:
                let turnRight = block.turnRight
                let degree = block.degree
                let nextAngle = turnRight ? angles[currentClockPosition] - degree : angles[currentClockPosition] + degree
                if (nextAngle < 0)
                    nextAngle += 360
                if (nextAngle >= 360)
                    nextAngle -= 360
                console.log('Next angle is: ' + nextAngle)
                let nextClockPosition = getClosestClockPositionForAngle(nextAngle)
                console.log('Next clock position is: ' + nextClockPosition)
                let turnKey = getTurnKey(currentClockPosition, nextClockPosition, turnRight)
                Turn(turnKey)
                currentClockPosition = nextClockPosition
                break
        }
        stepCount++
    }
    /**
     * Execute if block and return the next index to handle.
     **/
    let executeIfBlock = function (inStream, index) {
        /**
         * Evaluate the condition in a if block.
         */
        let evaluateConditionForIfBlock = function (block) {
            return block.condition
        }
        let block = inStream[index]
        if (evaluateConditionForIfBlock(block)) {
            return executeInStream(inStream, index + 1)
        } else {
            let count = 1
            let i = index + 1
            while (count > 0 && i < inStream.length) {
                let cur = inStream[i]
                switch (cur.name) {
                    case SupportedBlocks.Else:
                    case SupportedBlocks.IfEnd:
                        count--
                        break
                    case SupportedBlocks.IfStart:
                        count++
                        break
                }
                i++
                if (count === 0 && cur.name === SupportedBlocks.Else) {
                    return executeInStream(inStream, i)
                }
            }
            return i
        }
    }
    /**
     * Execute looping block and return the next index to handle.
     */
    let executeLoopingBlock = function (inStream, index) {
        let block = inStream[index]
        let count = block.count
        let nextIndex = index
        for (let i = 0; i < count; i++) {
            nextIndex = executeInStream(inStream, index + 1)
        }
        return nextIndex
    }

    /**
     * Execute the animation given an array of instructions and a starting index.
     */
    let executeInStream = function (stream, index) {
        let i = index
        let len = stream.length
        while (i < len) {
            if (failed) {
                return
            }
            let block = stream[i]
            switch (block.name) {
                case SupportedBlocks.Walk:
                case SupportedBlocks.Turn:
                    console.log('Play Block: ' + block.name)
                    playAnimation(block)
                    i++
                    break
                case SupportedBlocks.Else:
                    i++
                    break
                case SupportedBlocks.IfEnd:
                case SupportedBlocks.RepeatEnd:
                    return i + 1
                case SupportedBlocks.IfStart:
                    i = executeIfBlock(inStream, i)
                    break
                case SupportedBlocks.RepeatStart:
                    i = executeLoopingBlock(inStream, i)
                    break
                default:
                    alert('Unsupported Block Type: ' + block.name)
                    break
            }
        }
    }

    let passConditionMatched = function () {
        console.log('Check final condition.')
        console.log('Actual Path: ')
        for (let i = 0; i < path.length; i++) {
            let p = path[i]
            console.log('Position: ' + p.position + ' Distance: ' + p.dist)
        }

        console.log('Target Path: ')
        for (let i = 0; i < passPath.length; i++) {
            let p = passPath[i]
            console.log('Position: ' + p.position + ' Distance: ' + p.dist)
        }

        let stepCheck = stepCount < maxSteps
        let pathCheck = false
        if (path.length === passPath.length) {
            for (let i = 0; i < path.length; i++) {
                let currentPath = path[i]
                let targetPath = passPath[i]
                if (currentPath.position !== targetPath.position || currentPath.dist != targetPath.dist) {
                    break;
                }
            }
            pathCheck = true
        } else {
            console.log('Action sizes are not the same.')
        }
        console.log('Step check: ' + stepCheck + ' path check: ' + pathCheck)
        return stepCheck && pathCheck
    }

    let checkPassOrFail = function () {
        if (passConditionMatched()) {
            sprite.taskCompleted = true
        } else {
            sprite.taskCompleted = false
        }
    }
    // Main logic for runProgram
    let inStream = JSON.parse(animationContext.instruction)
    if (inStream.length > 0) {
        executeInStream(inStream, 0)
        checkPassOrFail()
    }
}
