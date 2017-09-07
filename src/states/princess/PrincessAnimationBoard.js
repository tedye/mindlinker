/**
 * Created by kfang on 7/23/17.
 */
import Phaser from 'phaser'
import config from '../../config'
import Princess from '../../sprites/Princess'
import PrincessAnimationPlayer from '../../animation/PrincessAnimationPlayer'
import TooltipBuilder from '../../util/TooltipBuilder'
import {showBlock, createLoadingText, loadStart, fileComplete, repositionBlock, repositionText, getInstruction, setReadableCode} from '../../UIUtil'

export default class extends Phaser.State {
    calculateCharacterStartingPositionResponsively() {
        console.log('Game width: ' + this.game.width + ' height: ' + this.game.height)
        this.characterStartX = Math.round(this.game.width / 2)
        this.characterStartY = Math.round(this.game.height / 2)
    }

    getCurrentAnimationContext() {
        let instruction = getInstruction(this.game.workspace)
        console.log('Blockly Instruction: ' + instruction)
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
        console.log('play blocks')
        this.game.sound.play('press')
        let animationContext = this.getCurrentAnimationContext(this.gameContext)
        this.princess.start = true
        PrincessAnimationPlayer(animationContext)
        this.startButton.visible = false
    }

    drawBackground() {
        this.game.add.sprite(0, 0, 'background').scale.setTo(this.game.width/config.backgroundWidth, this.game.height/config.backgroundHeight)
    }

    drawBoardButtons() {
        this.homeButton = this.game.add.button(10, 0, 'Buttons', this.onBackHome, this, 'buttons/home/hover', 'buttons/home/normal', 'buttons/home/click', 'buttons/home/disabled')
        this.hintButton = this.game.add.button(this.homeButton.width + 20, 0, 'Buttons', null, this, 'buttons/info/hover', 'buttons/info/normal', 'buttons/info/click', 'buttons/info/disabled')
        this.startButton = this.game.add.button(this.homeButton.width + this.hintButton.width + 40, 0, 'Buttons', this.play, this, 'buttons/start/hover', 'buttons/start/normal', 'buttons/start/click', 'buttons/start/disabled')
        TooltipBuilder(this.game, this.startButton, '开始', 'bottom')
        TooltipBuilder(this.game, this.hintButton, this.taskContext.hint, 'bottom')
        TooltipBuilder(this.game, this.homeButton, '返回主界面', 'bottom')
    }

    drawMainCharacterAtStartingPosition() {
        let startX = this.characterStartX + this.taskContext.character_x_offset
        let startY = this.characterStartY - Math.round(this.taskContext.character_height_in_pixel / 3) + this.taskContext.character_y_offset
        let frames = [
            "animation/walk-0/walk-0-0000",
            "animation/walk-1/walk-1-0000",
            "animation/walk-2/walk-2-0000",
            "animation/walk-3/walk-3-0000",
            "animation/walk-4/walk-4-0000",
            "animation/walk-5/walk-5-0000",
            "animation/walk-6/walk-6-0000",
            "animation/walk-7/walk-7-0000",
            "animation/walk-8/walk-8-0000",
            "animation/walk-9/walk-9-0000",
            "animation/walk-10/walk-10-0000",
            "animation/walk-11/walk-11-0000"
        ]
        console.log('Draw main character at location: x = ' + startX + ' and y = ' + startY)
        console.log('The starting sprite image is ' + frames[this.taskContext.character_starting_clock_position])
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
        this.princess.actionQueue.push({
            name: 'TurnRight0_' + this.taskContext.character_starting_clock_position,
            xOffset: 0,
            yOffset: 0,
            audio: null
        })
    }

    drawPath() {
        console.log('Draw task path.')
        console.log('Path center: x = ' + Math.round(this.game.width/2) + ' y = ' + Math.round(this.game.height/2))
        let path = this.game.add.sprite(Math.round(this.game.width/2), Math.round(this.game.height/2), 'taskPath')
        path.anchor.setTo(0.5, 0.5)
    }

    setCurrentGameContexts() {
        this.gameContext = JSON.parse(this.game.cache.getText('gameContext'))
    }

    setCurrentTaskContext() {
        this.taskContext = JSON.parse(this.game.cache.getText('taskContext'))
    }

    loadPath() {
        console.log('Load path image: ' + this.taskContext.pathImage)
        this.game.load.image('taskPath', this.taskContext.pathImage)
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

    addWorkspace() {
        /* Reposition block div first */
        repositionBlock(252, 744, this.game.height)
        repositionText(429, 315, 252)
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
        console.log('PrincessAnimationBoard Init.')
        if (this.game.global.preTaskIndex !== this.game.global.currentTaskIndex) {
            this.created = false
        }
    }

    preload() {
        console.log('PrincessAnimationBoard Preload.')
        this.setCurrentGameContexts()
        this.setCurrentTaskContext()
    }

    loadAssets() {
        console.log('Load assets.')
        this.loadPath()
        this.game.load.start()
    }

    create() {
        console.log('PrincessAnimationBoard Create.')
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

    onBackHome() {
        this.game.state.start('MainMenu')
    }

    renderState() {
        this.calculateCharacterStartingPositionResponsively()
        this.drawBackground()
        this.drawPath()
        this.drawBoardButtons()
        this.drawMainCharacterAtStartingPosition()
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
}
