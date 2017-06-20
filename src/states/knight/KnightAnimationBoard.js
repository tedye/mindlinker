/**
 * Created by kfang on 6/15/17.
 */
import Phaser from 'phaser'
import Knight from '../../sprites/Knight'
import KnightAnimationPlayer from '../../animation/KnightAnimationPlayer'

export default class extends Phaser.State {
  calculateAndSetCharacterStartingPositionAndStepSizesResponsively () {
    this.step_width_in_pixel = Math.round(this.game.width * this.gameContext.step_x_percentage)
    this.step_height_in_pixel = Math.round(this.game.height * this.gameContext.step_y_percentage)
  }

  getCurrentAnimationContext () {
    return {
      sprite: this.knight,
      gridWidth: this.gameContext.grid_x_size,
      gridHeight: this.gameContext.grid_y_size,
      step_width_in_pixel: this.step_width_in_pixel,
      step_height_in_pixel: this.step_height_in_pixel,
      maxSteps: this.gameContext.maxSteps,
      passCondition: this.gameContext.passCondition,
      items: this.gameContext.items,
      instruction: '[{"name":"RepeatStart","count":2},{"name":"RunDown"},{"name":"RepeatEnd"},{"name":"RepeatStart","count":8}, {"name":"RunRight"},{"name":"RepeatEnd"}]'
    }
  }

  play () {
    console.log('play blocks')
    let animationContext = this.getCurrentAnimationContext(this.gameContext)
    KnightAnimationPlayer(animationContext)
  }

  drawBackground () {
    this.game.add.sprite(0, 0, 'background').scale.setTo(1, 0.75)
    this.drawStartButton();
  }

  drawStartButton() {
    let showStartTooltip = function () {
      this.tooltip = this.game.add.text(100, 50, 'Start to run.')
    }
    let destroyStartTooltip = function () {
      this.tooltip.destroy()
    }
    let startButton = this.game.add.button(0, 0, 'start', this.play, this)
    startButton.scale.setTo(0.3, 0.3)
    startButton.events.onInputOver.add(showStartTooltip, this)
    startButton.events.onInputOut.add(destroyStartTooltip, this)
  }

  drawMainCharacterAtStartingPosition () {
    const cWidth = this.gameContext.character_width_in_pixel
    const cHeight = this.gameContext.character_height_in_pixel
    const cStartingX = Math.round(this.game.width * this.gameContext.character_start_x_percentage) + Math.round(this.step_width_in_pixel / 2) - Math.round(cWidth / 2)
    const cStartingY = Math.round(this.game.height * this.gameContext.character_start_y_percentage) - cHeight
    console.log('Draw main character at location: x = ' + cStartingX + ' and y = ' + cStartingY + ' image size: width = ' + cWidth + ' height = ' + cHeight)
    let sprite = new Knight({
      game: this.game,
      x: cStartingX,
      y: cStartingY,
      asset: this.gameContext.spritesheets[0].key,
      frame: 0
    })
    this.knight = this.game.add.existing(sprite)
  }

  drawItems () {
    let items = this.gameContext.items
    let dGridX = this.gameContext.passCondition.destinationXGrid
    let dGridY = this.gameContext.passCondition.destinationYGrid
    let gridWidth = this.step_width_in_pixel
    let gridHeight = this.step_height_in_pixel
    let gridStartX = Math.round(this.game.width * this.gameContext.grid_board_top_left_x_percentage)
    let gridStartY = Math.round(this.game.height * this.gameContext.grid_board_top_left_y_percentage)
    console.log('Background width = ' + this.game.width + ' Background height = ' + this.game.height + ' GridStartX: ' + gridStartX + ' GridStartY = ' + gridStartY + ' GridWidth = ' + gridWidth + ' GridHeight = ' + gridHeight)
    if (items.length > 0) {
      let checkValid = function (coordinates, xGridSize, yGridSize, dGridX, dGridY) {
        console.log('Check valid for map with Size : (' + xGridSize + ' , ' + yGridSize + ') and dX = ' + dGridX + ' dY = ' + dGridY)
        let xq = []
        let yq = []
        let xOffset = [1, -1, 0, 0]
        let yOffset = [0, 0, 1, -1]
        let visited = []
        xq.push(0)
        yq.push(0)
        visited.push('0_0')
        while (xq.length > 0) {
          let curX = xq.shift()
          let curY = yq.shift()
          if (curX === dGridX && curY === dGridY) {
            console.log('Map is valid: ' + ' x = ' + curX + ' y = ' + curY + ' dX = ' + dGridX + ' dY = ' + dGridY)
            return true
          } else {
            for (let k = 0; k < 4; k++) {
              let nX = curX + xOffset[k]
              let nY = curY + yOffset[k]
              if (nX >= 0 && nY >= 0 && nX < xGridSize && nY < yGridSize && visited.indexOf(nX + '_' + nY) === -1 && coordinates.indexOf(nX + '_' + nY) === -1) {
                xq.push(nX)
                yq.push(nY)
                visited.push(nX + '_' + nY)
              }
            }
          }
        }
        return false
      }

      for (let i = 0; i < items.length; i++) {
        let item = items[i]
        if (item.random === true) {
          let iCount = item.count
          let solvable = false
          let xSize = this.gameContext.grid_x_size
          let ySize = this.gameContext.grid_y_size
          console.log('grid x size = ' + xSize + ' grid y size = ' + ySize + ' destination x = ' + dGridX + ' destination y = ' + dGridY)
          while (!solvable) {
            item.coordinates = []
            let currentCount = 0
            let rx = 0
            let ry = 0
            let key = ''
            let rTrack = []
            while (currentCount < iCount) {
              rx = Math.floor(Math.random() * xSize)
              ry = Math.floor(Math.random() * ySize)
              key = rx + '_' + ry
              if (key !== (dGridX + '_' + dGridY) && key !== '0_0' && rTrack.indexOf(key) === -1) {
                item.coordinates.push({x: rx, y: ry, xOffset: 0, yOffset: 0})
                rTrack.push(rx + '_' + ry)
                currentCount++
              }
            }
            if (checkValid(rTrack, xSize, ySize, dGridX, dGridY)) {
              solvable = true
            }
          }
        }
        for (let j = 0; j < item.coordinates.length; j++) {
          let position = item.coordinates[j]
          let ix = Math.round(gridStartX + position.x * gridWidth) + position.xOffset
          let iy = Math.round(gridStartY + position.y * gridHeight) + position.yOffset
          console.log('Draw item ' + i + ' at gx = ' + position.x + ' gy = ' + position.y + ' x = ' + ix + ' y = ' + iy)
          let itemImage = this.game.add.sprite(ix, iy, item.key)
          console.log('Scale item to x = ' + this.step_width_in_pixel * item.gridWidth / item.width + ' y = ' + this.step_height_in_pixel * item.gridHeight / item.height)
          itemImage.scale.setTo(this.step_width_in_pixel * item.gridWidth / item.width, this.step_height_in_pixel * item.gridHeight / item.height)
        }
      }
    }
  }

  drawForeGround () {
    let fWidth = this.game.width
    let fHeight = this.game.height
    console.log('Draw front ground image with size width = ' + fWidth + ' height = ' + fHeight)
    this.game.add.sprite(0, 0, 'foreground').scale.setTo(1, 0.75)
  }

  drawGridBoard () {
    let gridWidth = this.step_width_in_pixel
    let gridHeight = this.step_height_in_pixel
    let gridStartX = Math.round(this.game.width * this.gameContext.grid_board_top_left_x_percentage)
    let gridStartY = Math.round(this.game.height * this.gameContext.grid_board_top_left_y_percentage)
    let gridXSize = this.gameContext.grid_x_size
    let gridYSize = this.gameContext.grid_y_size
    console.log('Background width = ' + this.game.width + ' Background height = ' + this.game.height + ' GridStartX: ' + gridStartX + ' GridStartY = ' + gridStartY + ' GridWidth = ' + gridWidth + ' GridHeight = ' + gridHeight)
    console.log('Draw grid images.')
    for (let r = 0; r < gridYSize; r++) {
      for (let c = r % 2; c < gridXSize; c += 2) {
        let ix = Math.round(gridStartX + c * gridWidth)
        let iy = Math.round(gridStartY + r * gridHeight)
        console.log('Draw grid images at r = ' + r + ' c = ' + c + ' x = ' + ix + ' y = ' + iy)
        let gridImage = this.game.add.sprite(ix, iy, 'grid')
        gridImage.scale.setTo(gridWidth / 120, gridHeight / 60)
      }
    }
  }

  preloadImages () {
    for (let i = 0; i < this.gameContext.spritesheets.length; i++) {
      let spriteSheet = this.gameContext.spritesheets[i]
      console.log('Load spritesheet: ' + spriteSheet.spritesheet + ' as ' + spriteSheet.key + ' with data file: ' + spriteSheet.datafile)
      this.game.load.atlasJSONArray(spriteSheet.key, spriteSheet.spritesheet, spriteSheet.datafile)
    }

    this.game.load.image('background', this.gameContext.background_image)
    this.game.load.image('foreground', this.gameContext.foreground_image)
    this.game.load.image('grid', this.gameContext.grid_image)
    this.game.load.image('shadow', this.gameContext.shadow_image)
    this.game.load.image('start', 'assets/images/knight/background/start.png')
    this.game.load.image('restart', 'assets/images/knight/background/restart.png')
    this.game.load.image('next', 'assets/images/knight/background/next.png')

    for (let i = 0; i < this.gameContext.items.length; i++) {
      let item = this.gameContext.items[i]
      this.game.load.image(item.key, item.image)
    }
  }

  setCurrentGameContext () {
    this.gameContext = JSON.parse(this.game.cache.getText('gameContext'))
    this.game.global = {}
  }

  addAnimations () {
    for (let i = 0; i < this.gameContext.animations.length; i++) {
      let animation = this.gameContext.animations[i]
      console.log('Add animation: ' + animation.name)
      this.knight.animations.add(animation.name, animation.frames, animation.rate, animation.loop, false)
    }
  }

  init () {
  }

  preload () {
    this.setCurrentGameContext()
    this.calculateAndSetCharacterStartingPositionAndStepSizesResponsively()
    this.preloadImages()
  }

  create () {
    this.drawBackground()
    this.drawGridBoard()
    this.drawItems()
    this.drawMainCharacterAtStartingPosition()
    this.drawForeGround()
    this.addAnimations()
  }
}
