/**
 * Created by kfang on 6/16/17.
 */
import SupportedBlocks from './SupportedBlocks'

export default function play (animationContext) {
  let stepCount = 0
  let sprite = animationContext.sprite
  const gridWidth = animationContext.gridWidth
  const gridHeight = animationContext.gridHeight
  const xDistPerStep = animationContext.step_width_in_pixel
  const yDistPerStep = animationContext.step_height_in_pixel
  const maxSteps = animationContext.maxSteps
  const passCondition = animationContext.passCondition
  let items = animationContext.items
  let currentGridX = 0
  let currentGridY = 0
  let faceRight = true
  let failed = false

  let isBlocked = function (xOffset, yOffset) {
    let xP = currentGridX + xOffset
    let yP = currentGridY + yOffset
    console.log('Check valid step: ' + xP + ' , ' + yP + ' , ' + gridWidth + ' , ' + gridHeight)
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

  let addNewActionToSpriteActionQueue = function (name, xOffset, yOffset) {
    console.log('Add action to queue: ' + name + ' xOffset: ' + xOffset + ' yOffset: ' + yOffset)
    sprite.actionQueue.push({
      name: name,
      xOffset: xOffset,
      yOffset: yOffset
    })
  }

  let MakeATurn = function () {
    console.log('Animation Played: Turn')
    if (faceRight) {
      addNewActionToSpriteActionQueue('TurnToLeft', 0, 0)
    } else {
      addNewActionToSpriteActionQueue('TurnToRight', 0, 0)
    }
    faceRight = !faceRight
  }

  let WalkRight = function (step) {
    console.log('Animation Played: Move Right')
    if (isBlocked(1, 0)) {
      playFailure()
    } else {
      addNewActionToSpriteActionQueue('Walk', step, 0)
      addNewActionToSpriteActionQueue('Pause', 0, 0)
    }
  }

  let WalkLeft = function (step) {
    console.log('Animation Played: Move Left')
    if (isBlocked(-1, 0)) {
      playFailure()
    } else {
      addNewActionToSpriteActionQueue('Walk', -step, 0)
      addNewActionToSpriteActionQueue('Pause', 0, 0)
    }
  }

  let WalkUp = function (step) {
    console.log('Animation Played: Move Up')
    if (isBlocked(0, -1)) {
      playFailure()
    } else {
      addNewActionToSpriteActionQueue('Walk', 0, -step)
      addNewActionToSpriteActionQueue('Pause', 0, 0)
    }
  }

  let WalkDown = function (step) {
    console.log('Animation Played: Move Down')
    if (isBlocked(0, 1)) {
      playFailure()
    } else {
      addNewActionToSpriteActionQueue('Walk', 0, step)
      addNewActionToSpriteActionQueue('Pause', 0, 0)
    }
  }

  let RunRight = function (step) {
    console.log('Animation Played: Move Right' + ' step: ' + step)
    if (isBlocked(1, 0)) {
      playFailure()
    } else {
      addNewActionToSpriteActionQueue('Walk', step, 0)
      addNewActionToSpriteActionQueue('Pause', 0, 0)
    }
  }

  let RunLeft = function (step) {
    console.log('Animation Played: Move Left')
    if (isBlocked(-1, 0)) {
      playFailure()
    } else {
      addNewActionToSpriteActionQueue('Walk', -step, 0)
      addNewActionToSpriteActionQueue('Pause', 0, 0)
    }
  }

  let RunUp = function (step) {
    console.log('Animation Played: Move Up')
    if (isBlocked(0, -1)) {
      playFailure()
    } else {
      addNewActionToSpriteActionQueue('Walk', 0, -step)
      addNewActionToSpriteActionQueue('Pause', 0, 0)
    }
  }

  let RunDown = function (step) {
    console.log('Animation Played: Move Down')
    if (isBlocked(0, 1)) {
      playFailure()
    } else {
      addNewActionToSpriteActionQueue('Walk', 0, step)
      addNewActionToSpriteActionQueue('Pause', 0, 0)
    }
  }

  let attack = function () {
    console.log('Animation Played: Attack')
    addNewActionToSpriteActionQueue('Attack', 0, 0)
  }

  let victory = function () {
    console.log('Animation Played: Victory')
    addNewActionToSpriteActionQueue('Victory', 0, 0)
  }

  let playFailure = function () {
    console.log('Animation Played: Fail')
    failed = true
    addNewActionToSpriteActionQueue('Fail', 0, 0)
  }

  let Jump = function () {
    console.log('Animation Played: Jump')
    addNewActionToSpriteActionQueue('Jump', 0, 0)
  }

  let Standby = function () {
    console.log('Animation Played: Standby')
    addNewActionToSpriteActionQueue('Standby', 0, 0)
  }

  let Defense = function () {
    console.log('Animation Played: Defense')
    addNewActionToSpriteActionQueue('Defense', 0, 0)
  }
  /**
   * Execute the animation given an action JSON object.
   */
  let playAnimation = function (name) {
    console.log('Play animation for ' + name)
    switch (name) {
      case SupportedBlocks.WalkLeft:
        WalkLeft(xDistPerStep)
        currentGridX--
        break
      case SupportedBlocks.WalkDown:
        WalkDown(yDistPerStep)
        currentGridY++
        break
      case SupportedBlocks.WalkUp:
        WalkUp(yDistPerStep)
        currentGridY--
        break
      case SupportedBlocks.WalkRight:
        WalkRight(xDistPerStep)
        currentGridX++
        break
      case SupportedBlocks.RunLeft:
        RunLeft(xDistPerStep)
        currentGridX--
        break
      case SupportedBlocks.RunDown:
        RunDown(yDistPerStep)
        currentGridY++
        break
      case SupportedBlocks.RunUp:
        RunUp(yDistPerStep)
        currentGridY--
        break
      case SupportedBlocks.RunRight:
        RunRight(xDistPerStep)
        currentGridX++
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
          console.log('Play Block: ' + block.name)
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

  let passConditionMatched = function () {
    return stepCount < maxSteps && currentGridX + '_' + currentGridY === passCondition.destinationXGrid + '_' + passCondition.destinationYGrid
  }
  let checkPassOrFail = function () {
    if (passConditionMatched()) {
      victory()
      animationContext.finalStatus = 'Congratulations!'
    } else {
      animationContext.finalStatus = 'Try Again!'
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
