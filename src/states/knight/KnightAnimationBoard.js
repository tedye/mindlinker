/**
 * Created by kfang on 6/15/17.
 */
import Phaser from 'phaser'
import config from '../../config'
import Knight from '../../sprites/Knight'
import InteractiveItem from '../../sprites/InteractiveItem'
import KnightAnimationPlayer from '../../animation/KnightAnimationPlayer'
import TooltipBuilder from '../../util/TooltipBuilder'

export default class extends Phaser.State {
    calculateAndSetGridPositionAndStepSizesResponsively(){
        console.log('Game width: ' + this.game.width + ' height: ' + this.game.height)
        this.step_width_in_pixel = Math.round(this.game.width * this.gameContext.step_x_percentage)
        this.step_height_in_pixel = Math.round(this.game.height * this.gameContext.step_y_percentage)

        this.gridStartX = Math.round(this.game.width * this.gameContext.grid_board_top_left_x_percentage)
        this.gridStartY = Math.round(this.game.height * this.gameContext.grid_board_top_left_y_percentage)
    }

    getCurrentAnimationContext() {
        return {
            sprite: this.knight,
            startGridX: this.taskContext.character_starting_grid_x,
            startGridY: this.taskContext.character_starting_grid_y,
            forwardSpriteKey: this.gameContext.spritesheets[0].key,
            backwardSpriteKey: this.gameContext.spritesheets[1].key,
            gridWidth: this.gameContext.grid_x_size,
            gridHeight: this.gameContext.grid_y_size,
            step_width_in_pixel: this.step_width_in_pixel,
            step_height_in_pixel: this.step_height_in_pixel,
            maxSteps: this.taskContext.maxSteps,
            passCondition: this.taskContext.passCondition,
            items: this.taskContext.items,
            interactiveItems: this.taskContext.interactionItems,
            interactiveItemSprites: this.interactiveItemSprites,
            instruction: Blockly.JavaScript.workspaceToCode(this.game.workspace)
        }
    }

    play() {
        console.log('play blocks')
        if (this.knight.animations.paused) {
            this.knight.animations.paused = false
        } else {
            let animationContext = this.getCurrentAnimationContext(this.gameContext)
            KnightAnimationPlayer(animationContext)
        }
        this.startButton.visible = false
        this.pauseButton.visible = true
    }

    pause() {
        console.log('pause blocks')
        this.knight.animations.paused = true
        this.startButton.visible = true
        this.pauseButton.visible = false
    }

    drawBackground() {
        this.game.add.sprite(0, 0, 'background').scale.setTo(this.game.width/config.backgroundWidth, this.game.height/config.backgroundHeight)
    }

    drawBoardButtons() {
        this.startButton = this.game.add.button(0, 0, 'start', this.play, this)
        this.startButton.scale.setTo(0.3, 0.3)
        this.pauseButton = this.game.add.button(0, 0, 'pause', this.pause, this)
        this.pauseButton.scale.setTo(0.3, 0.3)
        this.pauseButton.visible = false
        this.hintButton = this.game.add.button(this.startButton.width + 20, 0, 'taskhint', null, this)
        this.hintButton.scale.setTo(0.3, 0.3)
        TooltipBuilder(this.game, this.startButton, '开始', 'right')
        TooltipBuilder(this.game, this.pauseButton, '暂停', 'right')
        TooltipBuilder(this.game, this.hintButton, this.taskContext.hint, 'right')
    }

    drawMainCharacterAtStartingPosition() {
        const cHeight = this.gameContext.character_height_in_pixel
        const characterStartGridX = this.taskContext.character_starting_grid_x
        const characterStartGridY = this.taskContext.character_starting_grid_y
        console.log('Calculating character starting position: grid starting x: ' + this.gridStartX + ' grid starting y: ' + this.gridStartY)
        const targetGridXMid = this.gridStartX + Math.round((characterStartGridX + 0.5) * this.step_width_in_pixel)
        const targetGridYMid = this.gridStartY + Math.round((characterStartGridY + 0.5) * this.step_height_in_pixel) - Math.round(cHeight / 2)
        console.log('Draw main character at location: x = ' + targetGridXMid + ' and y = ' + targetGridYMid)
        let sprite = new Knight({
            game: this.game,
            name: 'knight',
            x: targetGridXMid,
            y: targetGridYMid,
            asset: this.gameContext.spritesheets[0].key,
            frame: 0
        })
        this.knight = this.game.add.existing(sprite)
    }

    drawInteractionItems() {
        this.interactiveItemSprites = []
        let interactionItems = this.taskContext.interactionItems
        if (interactionItems.length > 0) {
            let gridWidth = this.step_width_in_pixel
            let gridHeight = this.step_height_in_pixel
            for (let i = 0; i < interactionItems.length; i++) {
                let item = interactionItems[i]
                let position = item.coordinate
                let ix = this.gridStartX + Math.round((position.x + position.xOffset) * gridWidth)
                let iy = this.gridStartY + Math.round((position.y + 1 + position.yOffset - item.gridHeight) * gridHeight)
                let sprite = new InteractiveItem({
                    game: this.game,
                    name: item.spriteKey,
                    x: ix,
                    y: iy,
                    asset: item.spriteSheetKey,
                    frame: 0
                })
                sprite.scale.setTo(gridWidth * item.gridWidth / item.width, gridHeight * item.gridHeight / item.height)
                this.interactiveItemSprites.push(sprite)
                this.game.add.existing(sprite)
                this.addAnimationsForSprite(sprite, item.spritesheets)
            }
        }
    }

    drawItems() {
        let items = this.taskContext.items
        let dGridX = this.taskContext.passCondition.destinationXGrid
        let dGridY = this.taskContext.passCondition.destinationYGrid
        let gridWidth = this.step_width_in_pixel
        let gridHeight = this.step_height_in_pixel
        console.log('Background width = ' + this.game.width + ' Background height = ' + this.game.height + ' GridStartX: ' + this.gridStartX + ' GridStartY = ' + this.gridStartY + ' GridWidth = ' + gridWidth + ' GridHeight = ' + gridHeight)
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
                    let sGridX = this.taskContext.character_starting_grid_x
                    let sGridY = this.taskContext.character_starting_grid_y
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
                            if (key !== (dGridX + '_' + dGridY) && key !== (sGridX + '_' + sGridY) && rTrack.indexOf(key) === -1) {
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
                    let ix = this.gridStartX + Math.round((position.x + position.xOffset) * gridWidth)
                    let iy = this.gridStartY + Math.round((position.y + 1 + position.yOffset - item.gridHeight) * gridHeight)
                    console.log('Draw item ' + i + ' at gx = ' + position.x + ' gy = ' + position.y + ' x = ' + ix + ' y = ' + iy)
                    let itemImage = this.game.add.sprite(ix, iy, item.key)
                    console.log('Scale item to x = ' + gridWidth * item.gridWidth / item.width + ' y = ' + gridHeight * item.gridHeight / item.height)
                    itemImage.scale.setTo(gridWidth * item.gridWidth / item.width, gridHeight * item.gridHeight / item.height)
                }
            }
        }
    }

    drawForeGround() {
        let fWidth = this.game.width
        let fHeight = this.game.height
        console.log('Draw front ground image with size width = ' + fWidth + ' height = ' + fHeight)
        this.game.add.sprite(0, 0, 'foreground').scale.setTo(this.game.width/config.backgroundWidth, this.game.height/config.backgroundHeight)
    }

    drawGridBoard() {
        let gridWidth = this.step_width_in_pixel
        let gridHeight = this.step_height_in_pixel
        let gridImageWidth = this.gameContext.grid_image_width
        let gridImageHeight = this.gameContext.grid_image_height
        console.log('Grid image width: ' + gridImageWidth + ' grid image height: ' + gridImageHeight)
        let gridXSize = this.gameContext.grid_x_size
        let gridYSize = this.gameContext.grid_y_size
        console.log('Background width = ' + this.game.width + ' Background height = ' + this.game.height + ' GridStartX: ' + this.gridStartX + ' GridStartY = ' + this.gridStartY + ' GridWidth = ' + gridWidth + ' GridHeight = ' + gridHeight)
        console.log('Draw grid images.')
        for (let r = 0; r < gridYSize; r++) {
            for (let c = r % 2; c < gridXSize; c += 2) {
                let ix = Math.round(this.gridStartX + c * gridWidth)
                let iy = Math.round(this.gridStartY + r * gridHeight)
                console.log('Draw grid images at r = ' + r + ' c = ' + c + ' x = ' + ix + ' y = ' + iy)
                let gridImage = this.game.add.sprite(ix, iy, 'grid')
                gridImage.scale.setTo(gridWidth / gridImageWidth, gridHeight / gridImageHeight)
            }
        }
    }

    preloadImages() {
        for (let i = 0; i < this.taskContext.items.length; i++) {
            let item = this.taskContext.items[i]
            this.game.load.image(item.key, item.image)
        }
        for (let i = 0; i < this.taskContext.interactionItems.length; i++) {
            let item = this.taskContext.interactionItems[i]
            for (let j = 0; j < item.spritesheets.length; j++) {
                let spriteSheet = item.spritesheets[j]
                console.log('Load spritesheet: ' + spriteSheet.spritesheet + ' as ' + spriteSheet.key + ' with data file: ' + spriteSheet.datafile)
                this.game.load.atlasJSONArray(spriteSheet.key, spriteSheet.spritesheet, spriteSheet.datafile)
            }
        }
    }

    setCurrentGameContexts() {
        this.gameContext = JSON.parse(this.game.cache.getText('gameContext'))
    }

    setCurrentTaskContext() {
        this.taskContext = JSON.parse(this.game.cache.getText('taskContext'))
    }

    addAnimationsForSprite(sprite, spritesheets) {
        for (let i = spritesheets.length - 1; i >= 0; i--) {
            let spritesheet = spritesheets[i]
            sprite.loadTexture(spritesheet.key)
            for (let j = 0; j < spritesheet.animations.length; j++) {
                let animation = spritesheet.animations[j]
                console.log('Add animation: ' + animation.name + ' for sprite: ' + sprite.name)
                sprite.animations.add(animation.name, animation.frames, animation.rate, animation.loop, false)
            }
        }
    }

    addAudios() {
        for (let i = 0; i < this.gameContext.audios.length; i++) {
            let audio = this.gameContext.audios[i]
            this.game.sound.add(audio.key)
        }
    }

    addBlocks() {
        let toolbox = '<xml>'
        toolbox += '<block type="logic_compare"></block>'
        toolbox += '<block type="statement_start"></block>'
        toolbox += '<block type="statement_end"></block>'
        toolbox += '<block type="statement_walk_right"></block>'
        toolbox += '<block type="statement_walk_left"></block>'
        toolbox += '<block type="statement_walk_up"></block>'
        toolbox += '<block type="statement_walk_down"></block>'
        toolbox += '<block type="statement_run_right"></block>'
        toolbox += '<block type="statement_run_left"></block>'
        toolbox += '<block type="statement_run_up"></block>'
        toolbox += '<block type="statement_run_down"></block>'
        toolbox += '<block type="statement_attack"></block>'
        toolbox += '<block type="statement_jump"></block>'
        toolbox += '<block type="statement_turn"></block>'
        toolbox += '<block type="statement_repeat"></block>'
        toolbox += '<block type="statement_condition_if"></block>'
        toolbox += '</xml>'
        let options = {
            horizontalLayout : true,
            toolbox : toolbox
        }
        this.game.workspace = Blockly.inject('block', options);
    }

    init() {
        console.log('KnightAnimationBoard Init.')
    }

    preload() {
        console.log('KnightAnimationBoard Preload.')
        this.setCurrentGameContexts()
        this.setCurrentTaskContext()
        this.preloadImages()
        console.log(typeof this.game.workspace)
        if (typeof this.game.workspace == "undefined"){
            // Only create blocks once
            this.addBlocks()
        }
    }

    create() {
        console.log('KnightAnimationBoard Create.')
        this.calculateAndSetGridPositionAndStepSizesResponsively()
        this.drawBackground()
        this.drawBoardButtons()
        this.drawGridBoard()
        this.drawItems()
        this.drawMainCharacterAtStartingPosition()
        this.drawInteractionItems()
        this.drawForeGround()
        this.addAnimationsForSprite(this.knight, this.gameContext.spritesheets)
        this.addAudios()
    }
}
