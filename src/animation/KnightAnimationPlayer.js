/**
 * Created by kfang on 6/16/17.
 */
import SupportedBlocks from './SupportedBlocks'
import {logDebugInfo} from '../Logger'

export default function play(animationContext) {
    let stepCount = 0
    let sprite = animationContext.sprite
    const forwardSpriteKey = animationContext.forwardSpriteKey
    const backwardSpriteKey = animationContext.backwardSpriteKey
    const gridWidth = animationContext.gridWidth
    const gridHeight = animationContext.gridHeight
    const xDistPerStep = animationContext.step_width_in_pixel
    const yDistPerStep = animationContext.step_height_in_pixel
    const maxSteps = animationContext.maxSteps
    const passCondition = animationContext.passCondition
    let items = animationContext.items
    let interactiveItems = animationContext.interactiveItems
    let interactiveItemSprites = animationContext.interactiveItemSprites
    let currentGridX = animationContext.startGridX
    let currentGridY = animationContext.startGridY
    let faceRight = true
    let failed = false
    let path = []

    let isBlocked = function (xOffset, yOffset) {
        let xP = currentGridX + xOffset
        let yP = currentGridY + yOffset
        logDebugInfo('Check valid step: ' + xP + ' , ' + yP + ' , ' + gridWidth + ' , ' + gridHeight)
        if (xP >= gridWidth || yP >= gridHeight) {
            return true
        }
        for (let i = 0; i < items.length; i++) {
            let item = items[i]
            if (item.blocker === true) {
                for (let j = 0; j < item.coordinates.length; j++) {
                    let bP = item.coordinates[j]
                    if (bP.x === xP && bP.y === yP) {
                        return true
                    }
                }
            }
        }
        return false
    }

    let addNewActionToMainSpriteActionQueue = function (name, xOffset, yOffset, spriteKey, audio, spriteToActivate) {
        logDebugInfo('Add action to main sprite action queue: ' + name + ' xOffset: ' + xOffset + ' yOffset: ' + yOffset)
        sprite.actionQueue.push({
            name: name,
            xOffset: xOffset,
            yOffset: yOffset,
            spriteKey: spriteKey,
            audio: audio,
            spriteToActivate: spriteToActivate
        })
    }

    let Pause = function () {
        addNewActionToMainSpriteActionQueue(faceRight ? 'Pause' : 'PauseBack', 0, 0, faceRight ? forwardSpriteKey : backwardSpriteKey, null, null)
    }

    let MakeATurn = function () {
        logDebugInfo('Animation Played: Turn')
        if (faceRight) {
            addNewActionToMainSpriteActionQueue('TurnToLeft', 0, 0, forwardSpriteKey, 'turn', null)
        } else {
            addNewActionToMainSpriteActionQueue('TurnToRight', 0, 0, forwardSpriteKey, 'turn', null)
        }
        faceRight = !faceRight
        Pause()
    }

    let WalkRight = function (step) {
        logDebugInfo('Animation Played: Move Right')
        if (isBlocked(1, 0)) {
            playFailure()
        } else {
            addNewActionToMainSpriteActionQueue(faceRight ? 'Walk' : 'WalkBack', step, 0, faceRight ? forwardSpriteKey : backwardSpriteKey, 'walk', null)
            Pause()
        }
    }

    let WalkLeft = function (step) {
        logDebugInfo('Animation Played: Move Left')
        if (isBlocked(-1, 0)) {
            playFailure()
        } else {
            addNewActionToMainSpriteActionQueue(faceRight ? 'Walk' : 'WalkBack', -step, 0, faceRight ? forwardSpriteKey : backwardSpriteKey, 'walk', null)
            Pause()
        }
    }

    let WalkUp = function (step) {
        logDebugInfo('Animation Played: Move Up')
        if (isBlocked(0, -1)) {
            playFailure()
        } else {
            addNewActionToMainSpriteActionQueue(faceRight ? 'Walk' : 'WalkBack', 0, -step, faceRight ? forwardSpriteKey : backwardSpriteKey, 'walk', null)
            Pause()
        }
    }

    let WalkDown = function (step) {
        logDebugInfo('Animation Played: Move Down')
        if (isBlocked(0, 1)) {
            playFailure()
        } else {
            addNewActionToMainSpriteActionQueue(faceRight ? 'Walk' : 'WalkBack', 0, step, faceRight ? forwardSpriteKey : backwardSpriteKey, 'walk', null)
            Pause()
        }
    }

    let RunRight = function (step) {
        logDebugInfo('Animation Played: Move Right' + ' step: ' + step)
        if (isBlocked(1, 0)) {
            playFailure()
        } else {
            addNewActionToMainSpriteActionQueue(faceRight ? 'Run' : 'RunBack', step, 0, faceRight ? forwardSpriteKey : backwardSpriteKey, 'run', null)
            Pause()
        }
    }

    let RunLeft = function (step) {
        logDebugInfo('Animation Played: Move Left')
        if (isBlocked(-1, 0)) {
            playFailure()
        } else {
            addNewActionToMainSpriteActionQueue(faceRight ? 'Run' : 'RunBack', -step, 0, faceRight ? forwardSpriteKey : backwardSpriteKey, 'run', null)
            Pause()
        }
    }

    let RunUp = function (step) {
        logDebugInfo('Animation Played: Move Up')
        if (isBlocked(0, -1)) {
            playFailure()
        } else {
            addNewActionToMainSpriteActionQueue(faceRight ? 'Run' : 'RunBack', 0, -step, faceRight ? forwardSpriteKey : backwardSpriteKey, 'run', null)
            Pause()
        }
    }

    let RunDown = function (step) {
        logDebugInfo('Animation Played: Move Down')
        if (isBlocked(0, 1)) {
            playFailure()
        } else {
            addNewActionToMainSpriteActionQueue(faceRight ? 'Run' : 'RunBack', 0, step, faceRight ? forwardSpriteKey : backwardSpriteKey, 'run', null)
            Pause()
        }
    }

    let findItemSpriteDefinitionByPositionOffset = function (xOffset, yOffset) {
        let xP = currentGridX + xOffset
        let yP = currentGridY + yOffset
        for (let i = 0; i < interactiveItems.length; i++) {
            let itemDef = interactiveItems[i]
            if (itemDef.coordinate.x + '_' + itemDef.coordinate.y === xP + '_' + yP) {
                return itemDef
            }
        }
        return null
    }

    let attack = function () {
        logDebugInfo('Animation Played: Attack')
        let interactiveSpriteDef = findItemSpriteDefinitionByPositionOffset(faceRight ? 1 : -1, 0)
        let spriteToActivate = null
        if (interactiveSpriteDef !== null) {
            let interactiveSprite = findItemSpriteBySpriteName(interactiveSpriteDef.spriteKey)
            logDebugInfo('Add action to sprite: ' + interactiveSprite.name)
            interactiveSprite.actionQueue.push({
                name: interactiveSpriteDef.animationKey,
                xOffset: 0,
                yOffset: 0,
                spriteKey: interactiveSpriteDef.spriteSheetKey,
                audio: null,
            })
            interactiveSprite.status = interactiveSpriteDef.statusPostAnimation
            spriteToActivate = interactiveSprite
        }
        addNewActionToMainSpriteActionQueue(faceRight ? 'Attack' : 'AttackBack', 0, 0, faceRight ? forwardSpriteKey : backwardSpriteKey, 'attack', spriteToActivate)
        Pause()
    }

    let victory = function () {
        logDebugInfo('Animation Played: Victory')
        sprite.taskCompleted = true
        addNewActionToMainSpriteActionQueue(faceRight ? 'Victory' : 'VictoryBack', 0, 0, faceRight ? forwardSpriteKey : backwardSpriteKey, 'victory', null)
    }

    let playFailure = function () {
        logDebugInfo('Animation Played: Fail')
        failed = true
        sprite.taskCompleted = false
        addNewActionToMainSpriteActionQueue(faceRight ? 'Fail' : 'FailBack', 0, 0, faceRight ? forwardSpriteKey : backwardSpriteKey, 'fail', null)
    }

    let Jump = function () {
        logDebugInfo('Animation Played: Jump')
        addNewActionToMainSpriteActionQueue(faceRight ? 'Jump' : 'JumpBack', 0, 0, faceRight ? forwardSpriteKey : backwardSpriteKey, 'jump', null)
        Pause()
    }

    let JumpRight = function (step) {
        logDebugInfo('Animation Played: Jump Right')
        if (isBlocked(2, 0)) {
            playFailure()
        } else {
            addNewActionToMainSpriteActionQueue(faceRight ? 'Jump' : 'JumpBack', step, 0, faceRight ? forwardSpriteKey : backwardSpriteKey, 'jump', null)
            Pause()
        }
    }

    let JumpLeft = function (step) {
        logDebugInfo('Animation Played: Jump Left')
        if (isBlocked(-2, 0)) {
            playFailure()
        } else {
            addNewActionToMainSpriteActionQueue(faceRight ? 'Jump' : 'JumpBack', -step, 0, faceRight ? forwardSpriteKey : backwardSpriteKey, 'jump', null)
            Pause()
        }
    }

    let Standby = function () {
        logDebugInfo('Animation Played: Standby')
        addNewActionToMainSpriteActionQueue(faceRight ? 'Standby' : 'StandbyBack', 0, 0, faceRight ? forwardSpriteKey : backwardSpriteKey, null, null)
    }

    let Defense = function () {
        logDebugInfo('Animation Played: Defense')
        addNewActionToMainSpriteActionQueue(faceRight ? 'Defense' : 'DefenseBack', 0, 0, faceRight ? forwardSpriteKey : backwardSpriteKey, 'defense', null)
        Pause()
    }
    /**
     * Execute the animation given an action JSON object.
     */
    let playAnimation = function (name) {
        logDebugInfo('Play animation for ' + name)
        switch (name) {
            case SupportedBlocks.WalkLeft:
                WalkLeft(xDistPerStep)
                currentGridX--
                path.push('-1_0')
                break
            case SupportedBlocks.WalkDown:
                WalkDown(yDistPerStep)
                currentGridY++
                path.push('0_1')
                break
            case SupportedBlocks.WalkUp:
                WalkUp(yDistPerStep)
                currentGridY--
                path.push('0_-1')
                break
            case SupportedBlocks.WalkRight:
                WalkRight(xDistPerStep)
                currentGridX++
                path.push('1_0')
                break
            case SupportedBlocks.RunLeft:
                RunLeft(xDistPerStep)
                currentGridX--
                path.push('-1_0')
                break
            case SupportedBlocks.RunDown:
                RunDown(yDistPerStep)
                currentGridY++
                path.push('0_1')
                break
            case SupportedBlocks.RunUp:
                RunUp(yDistPerStep)
                currentGridY--
                path.push('0_-1')
                break
            case SupportedBlocks.RunRight:
                RunRight(xDistPerStep)
                currentGridX++
                path.push('1_0')
                break
            case SupportedBlocks.Attack:
                attack()
                break
            case SupportedBlocks.Turn:
                MakeATurn()
                break
            case SupportedBlocks.Jump:
                Jump()
                break
            case SupportedBlocks.JumpRight:
                JumpRight(Math.round(xDistPerStep*2))
                path.push('2_0')
                currentGridX += 2
                break
            case SupportedBlocks.JumpLeft:
                JumpLeft(Math.round(xDistPerStep*2))
                path.push('-2_0')
                currentGridX -= 2
                break
            case SupportedBlocks.Defense:
                Defense()
                break
            case SupportedBlocks.Standby:
                Standby()
                break
        }
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
                case SupportedBlocks.WalkLeft:
                case SupportedBlocks.WalkDown:
                case SupportedBlocks.WalkUp:
                case SupportedBlocks.WalkRight:
                case SupportedBlocks.RunLeft:
                case SupportedBlocks.RunDown:
                case SupportedBlocks.RunUp:
                case SupportedBlocks.RunRight:
                case SupportedBlocks.Jump:
                case SupportedBlocks.Turn:
                case SupportedBlocks.Attack:
                case SupportedBlocks.Defense:
                case SupportedBlocks.Standby:
                case SupportedBlocks.JumpRight:
                case SupportedBlocks.JumpLeft:
                    logDebugInfo('Play Block: ' + block.name)
                    playAnimation(block.name)
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

    let findItemSpriteBySpriteName = function (name) {
        logDebugInfo('Locating interactive sprite ' + name)
        for (let i = 0; i < interactiveItemSprites.length; i++) {
            let itemSprite = interactiveItemSprites[i]
            logDebugInfo('Checking interactive sprite ' + itemSprite.name)
            if (itemSprite.name === name) {
                return itemSprite
            }
        }
        return null
    }

    let passConditionMatched = function () {
        logDebugInfo('Check final condition at position x = ' + currentGridX + ' y = ' + currentGridY + ' victory x = ' + passCondition.destinationXGrid + ' y = ' + passCondition.destinationYGrid)
        let stepCheck = stepCount < maxSteps
        let positionCheck = currentGridX + '_' + currentGridY === passCondition.destinationXGrid + '_' + passCondition.destinationYGrid
        if (passCondition.pathMatched) {
            logDebugInfo(path.toString())
            let targetPath = passCondition.path
            for (let i = 0; i < targetPath.length; i++) {
                let offset = targetPath[i]
                if (i >= path.length || offset !== path[i]) {
                    return false
                }
            }
        }
        if (passCondition.interactions.length > 0) {
            for (let i = 0; i < passCondition.interactions.length; i++) {
                let interaction = passCondition.interactions[i]
                let sprite = findItemSpriteBySpriteName(interaction.sprite)
                if (sprite !== null && sprite.status !== interaction.status) {
                    return false
                }
            }
        }
        return stepCheck && positionCheck
    }

    let checkPassOrFail = function () {
        if (passConditionMatched()) {
            victory()
        } else {
            playFailure()
        }
    }
// Main logic for runProgram
    let inStream = JSON.parse(animationContext.instruction)
    if (inStream.length > 0) {
        executeInStream(inStream, 0)
        if (!failed) {
            checkPassOrFail()
        }
    }
}
