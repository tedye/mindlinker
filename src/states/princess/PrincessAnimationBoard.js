/**
 * Created by kfang on 7/23/17.
 */
import Phaser from 'phaser'
import config from '../../config'
import Princess from '../../sprites/Princess'
import PrincessAnimationPlayer from '../../animation/PrincessAnimationPlayer'
import TooltipBuilder from '../../util/TooltipBuilder'

export default class extends Phaser.State {
    calculateCharacterStartingPositionResponsively() {
        console.log('Game width: ' + this.game.width + ' height: ' + this.game.height)
        this.characterStartX = Math.round(this.game.width * this.taskContext.character_starting_x_percentage)
        this.characterStartY = Math.round(this.game.height * this.taskContext.character_starting_y_percentage)
    }

    getInstructionFromWorkspace() {
        let startBlock = this.game.workspace.getTopBlocks()[0]
        return Blockly.JavaScript[startBlock.type](startBlock);

    }

    getCurrentAnimationContext() {
        console.log('Blockly Instruction: ' + this.getInstructionFromWorkspace())
        return {
            sprite: this.princess,
            startClockPosition: this.taskContext.character_starting_clock_position,
            maxSteps: this.taskContext.maxSteps,
            passPath: this.taskContext.passPath,
            instruction: this.getInstructionFromWorkspace()
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
        this.startButton = this.game.add.button(0, 0, 'start', this.play, this)
        this.startButton.scale.setTo(0.3, 0.3)
        this.hintButton = this.game.add.button(this.startButton.width + 20, 0, 'taskhint', null, this)
        this.hintButton.scale.setTo(0.3, 0.3)
        TooltipBuilder(this.game, this.startButton, '开始', 'right')
        TooltipBuilder(this.game, this.hintButton, this.taskContext.hint, 'right')
    }

    drawMainCharacterAtStartingPosition() {
        let startX = this.characterStartX
        let startY = this.characterStartY - Math.round(this.taskContext.character_height_in_pixel / 3)
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
        let options = {
            comments: false,
            disable: false,
            collapse: false,
            media: 'assets/blocks/media/',
            readOnly: false,
            rtl: false,
            scrollbars: true,
            toolbox: Blockly.Blocks.defaultToolboxPrincess,
            trashcan: true,
            horizontalLayout: true,
            toolboxPosition: true,
            sounds: true,
            grid: {spacing: 16,
                length: 1,
                colour: '#2C344A',
                snap: false
            },
            zoom: {
                controls: true,
                wheel: true,
                startScale: 1.0,
                maxScale: 4,
                minScale: 0.25,
                scaleSpeed: 1.1
            },
            colours: {
                workspace: '#334771',
                flyout: '#283856',
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
    }

    init() {
        console.log('PrincessAnimationBoard Init.')
    }

    preload() {
        console.log('PrincessAnimationBoard Preload.')
        this.setCurrentGameContexts()
        this.setCurrentTaskContext()
        this.loadPath()
        if (typeof this.game.workspace === "undefined"){
            // Only create blocks once
            this.addWorkspace()
        }
        this.loadToolbox()
    }

    create() {
        console.log('PrincessAnimationBoard Create.')
        this.calculateCharacterStartingPositionResponsively()
        this.drawBackground()
        this.drawPath()
        this.drawBoardButtons()
        this.drawMainCharacterAtStartingPosition()
        this.addAnimationsForSprite(this.princess, this.gameContext.spritesheets)
        this.addAudios()
    }
}
