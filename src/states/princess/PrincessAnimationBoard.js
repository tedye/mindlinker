/**
 * Created by kfang on 7/23/17.
 */
import Phaser from 'phaser'
import Princess from '../../sprites/Princess'
import PrincessAnimationPlayer from '../../animation/PrincessAnimationPlayer'
import TooltipBuilder from '../../util/TooltipBuilder'
import {showBlock, hideBlock, createLoadingText, loadStart, fileComplete, repositionBlock, repositionText, getInstruction, setReadableCode, rescaleObject, rescaleXOffset, rescaleYOffset} from '../../UIUtil'
import {logDebugInfo} from '../../Logger'

export default class extends Phaser.State {
    calculateCharacterStartingPositionResponsively() {
        logDebugInfo('Game width: ' + this.game.width + ' height: ' + this.game.height)
        this.characterStartX = this.game.world.centerX
        this.characterStartY = this.game.world.centerY
    }

    getCurrentAnimationContext() {
        let instruction = getInstruction(this.game.workspace)
        logDebugInfo('Blockly Instruction: ' + instruction)
        setReadableCode(instruction)
        return {
            sprite: this.princess,
            startClockPosition: this.taskContext.character_starting_clock_position,
            maxSteps: this.taskContext.maxSteps,
            passPath: this.taskContext.passPath,
            instruction: instruction
        }
    }

    play() {
        logDebugInfo('play blocks')
        this.game.sound.play('press')
        let animationContext = this.getCurrentAnimationContext(this.gameContext)
        this.princess.start = true
        PrincessAnimationPlayer(animationContext)
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
        let startX = this.characterStartX + rescaleXOffset(this.taskContext.character_x_offset, this.game)
        let startY = this.characterStartY + rescaleYOffset(this.taskContext.character_y_offset - Math.round(this.taskContext.character_height_in_pixel * 0.405), this.game)
        logDebugInfo('Draw main character at location: x = ' + startX + ' and y = ' + startY)
        let sprite = new Princess({
            game: this.game,
            name: 'princess',
            x: startX,
            y: startY,
            yOffset: Math.round(this.taskContext.character_height_in_pixel / 3),
            speed: this.taskContext.speed,
            asset: this.gameContext.spritesheets[0].key,
            frame: 0
        })
        this.princess = this.game.add.existing(sprite)
        rescaleObject(this.princess, this.game, 1, 1)
        this.initPrincessPosition()
    }

    initPrincessPosition() {
        this.princess.actionQueue.push({
            name: 'TurnRight0_' + this.taskContext.character_starting_clock_position,
            xOffset: 0,
            yOffset: 0,
            audio: null
        })
    }

    drawPath() {
        logDebugInfo('Draw task path.')
        let path = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'taskPath')
        rescaleObject(path, this.game, 1, 1)
        path.anchor.setTo(0.5, 0.5)
    }

    setCurrentGameContexts() {
        this.gameContext = JSON.parse(this.game.cache.getText('gameContext'))
    }

    setCurrentTaskContext() {
        this.taskContext = JSON.parse(this.game.cache.getText('taskContext'))
    }

    loadPath() {
        logDebugInfo('Load path image: ' + this.taskContext.pathImage)
        this.game.load.image('taskPath', this.taskContext.pathImage)
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
        repositionBlock(rescaleXOffset(250, this.game) / scaleFactor.x, rescaleYOffset(600, this.game) / scaleFactor.y, this.game.height / scaleFactor.y)
        repositionText(rescaleYOffset(300, this.game) / scaleFactor.y, rescaleYOffset(300, this.game) / scaleFactor.y, rescaleXOffset(250, this.game) / scaleFactor.x)
        let options = {
            comments: false,
            disable: false,
            collapse: false,
            media: 'assets/blocks/media/',
            readOnly: false,
            rtl: false,
            scrollbars: false,
            toolbox: Blockly.Blocks.defaultToolboxPrincess,
            trashcan: true,
            horizontalLayout: true,
            toolboxPosition: true,
            sounds: true,
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
        this.game.workspace = Blockly.inject('block', options);
    }

    loadToolbox() {
        let tree = Blockly.Xml.textToDom(this.taskContext.toolbox)
        this.game.workspace.updateToolbox(tree)
        document.getElementById('instructions').innerHTML = ''
    }

    init() {
        logDebugInfo('PrincessAnimationBoard Init.')
        if (this.game.global.preTaskIndex !== this.game.global.currentTaskIndex) {
            this.created = false
        }
    }

    preload() {
        logDebugInfo('PrincessAnimationBoard Preload.')
        this.setCurrentGameContexts()
        this.setCurrentTaskContext()
    }

    loadAssets() {
        logDebugInfo('Load assets.')
        this.loadPath()
        this.game.load.start()
    }

    create() {
        logDebugInfo('PrincessAnimationBoard Create.')
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

    onBackToTasks() {
        hideBlock()
        this.game.state.start('PrincessStoryBoard')
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
        this.calculateCharacterStartingPositionResponsively()
        this.drawBackground()
        this.drawForeGround()
        this.drawPath()
        this.drawBoardButtons()
        this.drawMainCharacterAtStartingPosition()
        this.drawTitle()
        this.addAnimationsForSprite(this.princess, this.gameContext.spritesheets)
        this.addAudios()
        if (typeof this.game.workspace === "undefined"){
            // Only create blocks once
            this.addWorkspace()
        }
        this.game.workspace.clear()
        this.loadToolbox()
        showBlock()
    }

    loadComplete() {
        this.renderState()
        this.loadingText.destroy()
        this.created = true
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
}
