/**
 * Created by kfang on 6/16/17.
 */
/**
 * Created by kfang on 6/2/17.
 */
import SupportedBlocks from './SupportedBlocks'

export default function play (animationContext) {
  let stepCount = 0
  let sprite = animationContext.sprite
  const imageStreamSize = animationContext.image_stream_size
  const stepX = animationContext.step_width_in_pixel
  const stepY = animationContext.step_height_in_pixel
  const maxSteps = animationContext.maxSteps
  const passCondition = animationContext.passCondition
  let items = animationContext.items
  let currentGridX = 0
  let currentGridY = 0
  let faceRight = true
  let blockQueue = []

  let isBlocked = function (xOffset, yOffset) {
    let xP = currentGridX + xOffset
    let yP = currentGridY + yOffset
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

  let MakeATurn = function () {
    console.log('Animation Played: Turn')
    if (faceRight) {
      sprite.play('TurnToLeft')
    } else {
      sprite.play('TurnToRight')
    }
    faceRight = !faceRight
  }

  let WalkRight = function (step) {
    console.log('Animation Played: Move Right')
    if (isBlocked(1, 0)) {
      playFailure(true)
    } else {
      sprite.xOffset = step / imageStreamSize
      sprite.yOffset = 0
      sprite.play('Walk')
    }
  }

  let WalkLeft = function (step) {
    console.log('Animation Played: Move Left')
    if (isBlocked(-1, 0)) {
      playFailure(true)
    } else {
      sprite.xOffset = -step / imageStreamSize
      sprite.yOffset = 0
      sprite.play('Walk')
    }
  }

  let WalkUp = function (step) {
    console.log('Animation Played: Move Up')
    if (isBlocked(0, -1)) {
      playFailure(true)
    } else {
      sprite.xOffset = 0
      sprite.yOffset = -step / imageStreamSize
      sprite.play('Walk')
    }
  }

  let WalkDown = function (step) {
    console.log('Animation Played: Move Down')
    if (isBlocked(0, 1)) {
      playFailure(true)
    } else {
      sprite.xOffset = 0
      sprite.yOffset = step / imageStreamSize
      sprite.play('Walk')
    }
  }

  let RunRight = function (step) {
    console.log('Animation Played: Move Right')
    if (isBlocked(1, 0)) {
      playFailure(true)
    } else {
      sprite.xOffset = step / imageStreamSize
      sprite.yOffset = 0
      sprite.play('Walk')
    }
  }

  let RunLeft = function (step) {
    console.log('Animation Played: Move Left')
    if (isBlocked(-1, 0)) {
      playFailure(true)
    } else {
      sprite.xOffset = -step / imageStreamSize
      sprite.yOffset = 0
      sprite.play('Walk')
    }
  }

  let RunUp = function (step) {
    console.log('Animation Played: Move Up')
    if (isBlocked(0, -1)) {
      playFailure(true)
    } else {
      sprite.xOffset = 0
      sprite.yOffset = -step / imageStreamSize
      sprite.play('Walk')
    }
  }
  let RunDown = function (step) {
    console.log('Animation Played: Move Down')
    if (isBlocked(0, 1)) {
      playFailure(true)
    } else {
      sprite.xOffset = 0
      sprite.yOffset = step / imageStreamSize
      sprite.play('Walk')
    }
  }

  let attack = function () {
    console.log('Animation Played: Attack')
    sprite.xOffset = 0
    sprite.yOffset = 0
    sprite.play('Attack')
  }

  let victory = function () {
    console.log('Animation Played: Victory')
    sprite.xOffset = 0
    sprite.yOffset = 0
    sprite.play('Victory')
  }

  let playFailure = function () {
    console.log('Animation Played: Fail')
    sprite.xOffset = 0
    sprite.yOffset = 0
    sprite.play('Fail')
  }

  /**
   * Execute the animation given an action JSON object.
   */
  let playAnimation = function () {
    let name = blockQueue.shift()
    console.log('Play animation for ' + name)
    switch (name) {
      case SupportedBlocks.WalkLeft:
        WalkLeft(stepX)
        break
      case SupportedBlocks.WalkDown:
        WalkDown(stepY)
        break
      case SupportedBlocks.WalkUp:
        WalkUp(stepY)
        break
      case SupportedBlocks.WalkRight:
        WalkRight(stepX)
        break
      case SupportedBlocks.RunLeft:
        RunLeft(stepX)
        break
      case SupportedBlocks.RunDown:
        RunDown(stepY)
        break
      case SupportedBlocks.RunUp:
        RunUp(stepY)
        break
      case SupportedBlocks.RunRight:
        RunRight(stepX)
        break
      case SupportedBlocks.Attack:
        attack()
        break
      case SupportedBlocks.Turn:
        MakeATurn()
        break
      case SupportedBlocks.Jump:
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
          console.log('Play Block: ' + block.name)
          blockQueue.push(block.name)
          playAnimation()
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
    checkPassOrFail()
  }
}
