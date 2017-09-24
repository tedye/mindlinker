/**
 * Created by kfang on 6/15/17.
 */
import Phaser from 'phaser'
import Knight from '../../sprites/Knight'
import InteractiveItem from '../../sprites/InteractiveItem'
import KnightAnimationPlayer from '../../animation/KnightAnimationPlayer'
import TooltipBuilder from '../../util/TooltipBuilder'
import {showBlock, hideBlock, createLoadingText, loadStart, fileComplete, repositionBlock, repositionText, getInstruction, setReadableCode, rescaleObject, rescaleXOffset, rescaleYOffset} from '../../UIUtil'
import {logDebugInfo} from '../../Logger'

export default class extends Phaser.State {
    calculateAndSetGridPositionAndStepSizesResponsively(){
        logDebugInfo('Game width: ' + this.game.width + ' height: ' + this.game.height)
        this.step_width_in_pixel = rescaleXOffset(this.gameContext.grid_image_width, this.game)
        this.step_height_in_pixel = rescaleYOffset(this.gameContext.grid_image_height, this.game)

        this.gridStartX = rescaleXOffset(this.gameContext.grid_board_top_left_x, this.game) + Math.round(this.step_width_in_pixel / 2)
        this.gridStartY = rescaleYOffset(this.gameContext.grid_board_top_left_y, this.game) + Math.round(this.step_height_in_pixel / 2)
        logDebugInfo('step_width_in_pixel: ' + this.step_width_in_pixel + ' step_height_in_pixel: ' + this.step_height_in_pixel)
        logDebugInfo('gridStartX: ' + this.gridStartX + ' this.gridStartY: ' + this.gridStartY)
    }

    getCurrentAnimationContext() {
        let instruction = getInstruction(this.game.workspace)
        logDebugInfo('Blockly Instruction: ' + instruction)
        setReadableCode(instruction)
        return {
            sprite: this.knight,
            startGridX: this.taskContext.character_starting_grid_x,
            startGridY: this.taskContext.character_starting_grid_y,
            forwardSpriteKey: this.gameContext.spritesheets[0].key,
            backwardSpriteKey: this.gameContext.spritesheets[1].key,
            gridWidth: this.gameContext.grid_x_size,
            gridHeight: this.gameContext.grid_y_size,
            step_width_in_pixel: this.gameContext.grid_image_width,
            step_height_in_pixel: this.gameContext.grid_image_height,
            maxSteps: this.taskContext.maxSteps,
            passCondition: this.taskContext.passCondition,
            items: this.taskContext.items,
            interactiveItems: this.taskContext.interactionItems,
            interactiveItemSprites: this.interactiveItemSprites,
            instruction: instruction
        }
    }

    play() {
        logDebugInfo('play blocks')
        this.game.sound.play('press')
        let animationContext = this.getCurrentAnimationContext(this.gameContext)
        KnightAnimationPlayer(animationContext)
        this.startButton.visible = false
    }

    drawBackground() {
        let background = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'background')
        rescaleObject(background, this.game, 1, 1.2)
        background.anchor.setTo(0.5, 0.5)
    }

    drawForeGround() {
        let foreground = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'foreground')
        rescaleObject(foreground, this.game, 1, 1.2)
        foreground.anchor.setTo(0.5, 0.5)
    }

    drawBoardButtons() {
        let x = rescaleXOffset(80, this.game)
        let y = rescaleYOffset(80, this.game)
        let spacer = rescaleXOffset(20, this.game)
        this.backToTasksButton = this.game.add.button(x, y, 'Buttons', this.onBackToTasks, this, 'buttons/star/hover', 'buttons/star/normal', 'buttons/star/click', 'buttons/star/disabled')
        x += rescaleXOffset(this.backToTasksButton.width, this.game)
        x += spacer
        this.hintButton = this.game.add.button(x, y, 'Buttons', this.showInformationBoard, this, 'buttons/info/hover', 'buttons/info/normal', 'buttons/info/click', 'buttons/info/disabled')
        x += rescaleXOffset(this.hintButton.width, this.game)
        x += spacer
        this.startButton = this.game.add.button(x, y, 'Buttons', this.play, this, 'buttons/start/hover', 'buttons/start/normal', 'buttons/start/click', 'buttons/start/disabled')
        rescaleObject(this.backToTasksButton, this.game, 1, 1)
        rescaleObject(this.hintButton, this.game, 1, 1)
        rescaleObject(this.startButton, this.game, 1, 1)
        this.backToTasksButton.anchor.setTo(0.5, 0.5)
        this.hintButton.anchor.setTo(0.5, 0.5)
        this.startButton.anchor.setTo(0.5, 0.5)
        TooltipBuilder(this.game, this.startButton, '开始', 'bottom')
        TooltipBuilder(this.game, this.hintButton, '关卡信息', 'bottom')
        TooltipBuilder(this.game, this.backToTasksButton, '返回关卡选择页面', 'bottom')
    }

    drawMainCharacterAtStartingPosition() {
        const cHeight = this.gameContext.character_height_in_pixel
        const characterStartGridX = this.taskContext.character_starting_grid_x
        const characterStartGridY = this.taskContext.character_starting_grid_y
        logDebugInfo('Calculating character starting position: grid starting x: ' + this.gridStartX + ' grid starting y: ' + this.gridStartY)
        const targetGridXMid = this.gridStartX + Math.round(characterStartGridX * this.step_width_in_pixel)
        const targetGridYMid = this.gridStartY + Math.round(characterStartGridY * this.step_height_in_pixel) - rescaleYOffset(Math.round(cHeight * 0.4), this.game)
        logDebugInfo('Draw main character at location: x = ' + targetGridXMid + ' and y = ' + targetGridYMid)
        let sprite = new Knight({
            game: this.game,
            name: 'knight',
            x: targetGridXMid,
            y: targetGridYMid,
            asset: this.gameContext.spritesheets[0].key,
            frame: 0
        })
        this.knight = this.game.add.existing(sprite)
        rescaleObject(this.knight, this.game, 1, 1)
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
                let ix = this.gridStartX + Math.round(position.x * gridWidth) + rescaleXOffset(Math.round(position.xOffset * item.width), this.game)
                let iy = this.gridStartY + Math.round(position.y * gridHeight) + rescaleYOffset(Math.round(position.yOffset * item.height), this.game)
                let sprite = new InteractiveItem({
                    game: this.game,
                    name: item.spriteKey,
                    x: ix,
                    y: iy,
                    asset: item.spriteSheetKey,
                    frame: 0
                })
                rescaleObject(sprite, this.game, 1, 1)
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
        logDebugInfo('Background width = ' + this.game.width + ' Background height = ' + this.game.height + ' GridStartX: ' + this.gridStartX + ' GridStartY = ' + this.gridStartY + ' GridWidth = ' + gridWidth + ' GridHeight = ' + gridHeight)
        if (items.length > 0) {
            let checkValid = function (coordinates, xGridSize, yGridSize, dGridX, dGridY) {
                logDebugInfo('Check valid for map with Size : (' + xGridSize + ' , ' + yGridSize + ') and dX = ' + dGridX + ' dY = ' + dGridY)
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
                        logDebugInfo('Map is valid: ' + ' x = ' + curX + ' y = ' + curY + ' dX = ' + dGridX + ' dY = ' + dGridY)
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
                    logDebugInfo('grid x size = ' + xSize + ' grid y size = ' + ySize + ' destination x = ' + dGridX + ' destination y = ' + dGridY)
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
                    let ix = this.gridStartX + Math.round(position.x * gridWidth) + rescaleXOffset(Math.round(position.xOffset * item.width), this.game)
                    let iy = this.gridStartY + Math.round(position.y * gridHeight) + rescaleYOffset(Math.round(position.yOffset * item.height), this.game)
                    logDebugInfo('Draw item ' + i + ' at gx = ' + position.x + ' gy = ' + position.y + ' x = ' + ix + ' y = ' + iy)
                    let itemImage = this.game.add.sprite(ix, iy, item.key)
                    itemImage.anchor.setTo(0.5, 0.5)
                    rescaleObject(itemImage, this.game, 1, 1)
                }
            }
        }
    }

    drawGridBoard() {
        let gridWidth = this.step_width_in_pixel
        let gridHeight = this.step_height_in_pixel
        let gridXSize = this.gameContext.grid_x_size
        let gridYSize = this.gameContext.grid_y_size
        logDebugInfo('Background width = ' + this.game.width + ' Background height = ' + this.game.height + ' GridStartX: ' + this.gridStartX + ' GridStartY = ' + this.gridStartY + ' GridWidth = ' + gridWidth + ' GridHeight = ' + gridHeight)
        logDebugInfo('Draw grid images.')
        for (let r = 0; r < gridYSize; r++) {
            for (let c = r % 2; c < gridXSize; c += 2) {
                let ix = Math.round(this.gridStartX + c * gridWidth)
                let iy = Math.round(this.gridStartY + r * gridHeight)
                logDebugInfo('Draw grid images at r = ' + r + ' c = ' + c + ' x = ' + ix + ' y = ' + iy)
                let gridImage = this.game.add.sprite(ix, iy, 'grid')
                rescaleObject(gridImage, this.game, 1, 1)
                gridImage.anchor.setTo(0.5, 0.5)
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
                logDebugInfo('Load spritesheet: ' + spriteSheet.spritesheet + ' as ' + spriteSheet.key + ' with data file: ' + spriteSheet.datafile)
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
                logDebugInfo('Add animation: ' + animation.name + ' for sprite: ' + sprite.name)
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

    addWorkspace() {
        let scaleFactor = this.scale.scaleFactor
        logDebugInfo('scale factor x: ' + scaleFactor.x + ' scale factor y: ' + scaleFactor.y)
        /* Reposition block div first */
        let grid_bottom_left_x = rescaleXOffset(this.gameContext.grid_board_top_left_x, this.game)
        let grid_bottom_left_y = rescaleYOffset(this.gameContext.grid_board_top_left_y + Math.round(this.gameContext.grid_y_size * this.gameContext.grid_image_height), this.game)
        let grid_height = rescaleYOffset(Math.round(this.gameContext.grid_y_size * this.gameContext.grid_image_height), this.game)

        repositionBlock(grid_bottom_left_x / scaleFactor.x, grid_bottom_left_y / scaleFactor.y, this.game.height / scaleFactor.y)
        repositionText(rescaleYOffset(this.gameContext.grid_board_top_left_y, this.game) / scaleFactor.y, grid_height / scaleFactor.y, grid_bottom_left_x / scaleFactor.x)
        logDebugInfo('Block div x: ' + grid_bottom_left_x + ' yt: ' + grid_bottom_left_y + ' h: ' + this.game.height)
        let options = {
            comments: false,
            disable: false,
            collapse: false,
            media: 'assets/blocks/media/',
            readOnly: false,
            rtl: false,
            scrollbars: true,
            toolbox: Blockly.Blocks.defaultToolboxKnight,
            trashcan: true,
            horizontalLayout: true,
            toolboxPosition: true,
            sounds: true,
            grid: {spacing: 16,
                length: 1,
                colour: '#2C344A',
                snap: false
            },
            colours: {
                workspace: '#334771',
                flyout: '#334771',
                scrollbar: '#24324D',
                scrollbarHover: '#0C111A',
                insertionMarker: '#FFFFFF',
                insertionMarkerOpacity: 0.3,
                fieldShadow: 'rgba(255, 255, 255, 0.3)',
                dragShadowOpacity: 0.6
            }
        }
        this.game.workspace = Blockly.inject('block', options)
    }

    loadToolbox() {
        let tree = Blockly.Xml.textToDom(this.taskContext.toolbox)
        this.game.workspace.updateToolbox(tree)
        document.getElementById('instructions').innerHTML = ''
    }

    init() {
        logDebugInfo('KnightAnimationBoard Init.')
        if (this.game.global.preTaskIndex !== this.game.global.currentTaskIndex) {
            this.created = false
        }
    }

    preload() {
        logDebugInfo('KnightAnimationBoard Preload.')
        this.setCurrentGameContexts()
        this.setCurrentTaskContext()
    }

    loadAssets() {
        this.preloadImages()
        this.game.load.start()
    }

    create() {
        logDebugInfo('KnightAnimationBoard Create.')
        if (!this.created) {
            this.loadingText = createLoadingText(this.game)
            this.game.load.onLoadStart.addOnce(loadStart, this);
            this.game.load.onFileComplete.add(fileComplete, this);
            this.game.load.onLoadComplete.addOnce(this.loadComplete, this);
            this.loadAssets()
        } else {
            this.renderState()
        }
    }

    showInformationBoard() {
        if (!this.infoBoard) {
            this.infoBoard = this.game.add.image(Math.round(this.game.width / 2), Math.round(this.game.height / 2)-rescaleYOffset(100, this.game),'info')
            rescaleObject(this.infoBoard, this.game, 0.7, 0.7)
            this.infoBoard.anchor.setTo(0.5, 0.5)
            this.infoBoard.alpha = 0.8
            this.info = this.game.add.text(Math.round(this.game.width / 2), Math.round(this.game.height / 2)-rescaleYOffset(100, this.game), this.taskContext.info + '\nHints:\n' + this.taskContext.hint, {font: 'bold 20px Arial', fill: '#FFFFFF', align: 'left'})
            rescaleObject(this.info, this.game, 0.7, 0.7)
            this.info.anchor.setTo(0.5, 0.5)
            this.closeButton = this.game.add.button(Math.round(this.game.width / 2)+rescaleXOffset(270, this.game), Math.round(this.game.height / 2)-rescaleYOffset(285, this.game), 'Buttons', this.hideInformationBoard, this, 'buttons/restart/hover', 'buttons/restart/normal', 'buttons/restart/click', 'buttons/restart/disabled')
            rescaleObject(this.closeButton, this.game, 0.5, 0.5)
            this.closeButton.anchor.setTo(0.5, 0.5)
            TooltipBuilder(this.game, this.closeButton, '返回', 'bottom')
        } else {
            this.infoBoard.visible = true
            this.info.visible = true
            this.closeButton.visible = true
        }
    }

    hideInformationBoard() {
        this.infoBoard.visible = false
        this.info.visible = false
        this.closeButton.visible = false
    }

    onBackToTasks() {
        hideBlock()
        this.game.state.start('KnightStoryBoard')
    }

    loadComplete() {
        this.renderState()
        this.loadingText.destroy()
        this.created = true
    }

    drawTitle() {
        let titleboard = this.game.add.sprite(this.game.world.centerX, 0, 'titleboard')
        rescaleObject(titleboard, this.game, 1, 1)
        titleboard.anchor.setTo(0.5, 0)
        titleboard.alpha = 0.8
        let title = this.game.add.text(this.game.world.centerX, rescaleYOffset(20, this.game), this.taskContext.title, {font: 'bold 30px Arial', fill: '#3399FF', align: 'center'})
        rescaleObject(title, this.game, 1, 1)
        title.anchor.setTo(0.5, 0)
    }

    renderState() {
        this.calculateAndSetGridPositionAndStepSizesResponsively()
        this.drawBackground()
        this.drawBoardButtons()
        this.drawGridBoard()
        this.drawItems()
        this.drawMainCharacterAtStartingPosition()
        this.drawInteractionItems()
        this.drawForeGround()
        this.drawTitle()
        this.addAnimationsForSprite(this.knight, this.gameContext.spritesheets)
        this.addAudios()
        if (typeof this.game.workspace === "undefined"){
            // Only create blocks once
            this.addWorkspace()
        }
        this.game.workspace.clear()
        this.loadToolbox()
        showBlock()
    }
}
