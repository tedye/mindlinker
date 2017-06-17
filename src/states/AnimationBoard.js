/**
 * Created by kfang on 6/15/17.
 */
import Phaser from 'phaser'
import Knight from '../sprites/Knight'

export default class extends Phaser.State {
  calculateAndSetCharacterStartingPositionAndStepSizesResponsively (gameContext, windowWidth, windowHeight) {
    this.step_width_in_pixel = Math.round(windowWidth * gameContext.step_x_percentage)
    this.step_height_in_pixel = Math.round(windowHeight * gameContext.step_y_percentage)
  }

  play () {
    console.log('play')
  }
  drawBackground () {
    this.game.add.sprite(0, 0, 'background')
    let startButton = this.game.add.button(0, 0, 'start', this.play, this)
    startButton.scale.setTo(0.5, 0.5)
  }

  drawMainCharacterAtStartingPosition (gameContext) {
    const cWidth = gameContext.character_width_in_pixel
    const cHeight = gameContext.character_height_in_pixel
    const cStartingX = Math.round(this.game.width * gameContext.character_start_x_percentage) + Math.round(this.step_width_in_pixel / 2) - Math.round(cWidth / 2)
    const cStartingY = Math.round(this.game.height * gameContext.character_start_y_percentage) - cHeight
    console.log('Draw main character at location: x = ' + cStartingX + ' and y = ' + cStartingY + ' image size: width = ' + cWidth + ' height = ' + cHeight)
    let sprite = new Knight({
      game: this.game,
      x: cStartingX,
      y: cStartingY,
      asset: gameContext.spritesheets[0].key,
      frame: 0
    })
    this.knight = this.game.add.existing(sprite)
  }

  drawItems (gameContext) {
    let items = gameContext.items
    let dGridX = gameContext.passCondition.destinationXGrid
    let dGridY = gameContext.passCondition.destinationYGrid
    let gridWidth = this.step_width_in_pixel
    let gridHeight = this.step_height_in_pixel
    let gridStartX = Math.round(this.game.width * gameContext.grid_board_top_left_x_percentage)
    let gridStartY = Math.round(this.game.height * gameContext.grid_board_top_left_y_percentage)
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
          let xSize = gameContext.grid_x_size
          let ySize = gameContext.grid_y_size
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

  drawForeGround (gameContext) {
    let fWidth = this.game.width
    let fHeight = this.game.height
    console.log('Draw front ground image with size width = ' + fWidth + ' height = ' + fHeight)
    this.game.add.sprite(0, 0, 'foreground')
  }

  drawGridBoard (gameContext) {
    let gridWidth = this.step_width_in_pixel
    let gridHeight = this.step_height_in_pixel
    let gridStartX = Math.round(this.game.width * gameContext.grid_board_top_left_x_percentage)
    let gridStartY = Math.round(this.game.height * gameContext.grid_board_top_left_y_percentage)
    let gridXSize = gameContext.grid_x_size
    let gridYSize = gameContext.grid_y_size
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

  preloadImages (gameContext) {
    for (let i = 0; i < gameContext.spritesheets.length; i++) {
      let spriteSheet = gameContext.spritesheets[i]
      console.log('Load spritesheet: ' + spriteSheet.spritesheet + ' as ' + spriteSheet.key + ' with data file: ' + spriteSheet.datafile)
      this.game.load.atlasJSONArray(spriteSheet.key, spriteSheet.spritesheet, spriteSheet.datafile)
    }

    this.game.load.image('background', gameContext.background_image)
    this.game.load.image('foreground', gameContext.foreground_image)
    this.game.load.image('grid', gameContext.grid_image)
    this.game.load.image('shadow', gameContext.shadow_image)
    this.game.load.image('start', 'assets/images/knight/background/start.png')

    for (let i = 0; i < gameContext.items.length; i++) {
      let item = gameContext.items[i]
      this.game.load.image(item.key, item.image)
    }
  }

  getGameContext () {
    return JSON.parse(this.game.cache.getText('gameContext'))
  }

  addAnimations (gameContext) {
    for (let i = 0; i < gameContext.animations.length; i++) {
      let animation = gameContext.animations[i]
      console.log('Add animation: ' + animation.name)
      this.knight.animations.add(animation.name, animation.frames, animation.rate, false)
    }
  }

  init () {
  }

  preload () {
    let gameContext = this.getGameContext()
    this.calculateAndSetCharacterStartingPositionAndStepSizesResponsively(gameContext, this.game.width, this.game.height)
    this.preloadImages(gameContext)
  }

  create () {
    let gameContext = this.getGameContext()
    this.drawBackground()
    this.drawGridBoard(gameContext)
    this.drawItems(gameContext)
    this.drawMainCharacterAtStartingPosition(gameContext)
    this.drawForeGround(gameContext)
    this.addAnimations(gameContext)
  }
}
