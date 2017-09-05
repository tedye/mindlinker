/**
 * Created by kfang on 6/25/17.
 */
import Phaser from 'phaser'
import KnightAnimationBoardState from './KnightAnimationBoard'
import KnightTaskBootState from './KnightTaskBoot'
import TooltipBuilder from '../../util/TooltipBuilder'
import {setScaleAndAnchorForObject, createLoadingText, loadStart, fileComplete} from '../../UIUtil'

export default class extends Phaser.State {
    init() {
        console.log('KnightStoryBoard Init.')
        this.endIndex = 2
    }

    loadStoryImages() {
        for (let i = 0; i < this.gameContext.spritesheets.length; i++) {
            let spriteSheet = this.gameContext.spritesheets[i]
            console.log('Load spritesheet: ' + spriteSheet.spritesheet + ' as ' + spriteSheet.key + ' with data file: ' + spriteSheet.datafile)
            this.game.load.atlasJSONArray(spriteSheet.key, spriteSheet.spritesheet, spriteSheet.datafile)
        }

        this.game.load.image('background', this.gameContext.background_image)
        this.game.load.image('foreground', this.gameContext.foreground_image)
        this.game.load.image('grid', this.gameContext.grid_image)
        this.game.load.image('shadow', this.gameContext.shadow_image)
    }

    loadStoryAudios() {
        for (let i = 0; i < this.gameContext.audios.length; i++) {
            let audio = this.gameContext.audios[i]
            this.game.load.audio(audio.key, audio.file)
        }
    }

    setCurrentGameContext() {
        this.gameContext = JSON.parse(this.game.cache.getText('gameContext'))
        this.taskCount = this.gameContext.task_configs.tasks.length
    }

    preload() {
        console.log('KnightStoryBoard Preload.')
        this.setCurrentGameContext()
    }

    loadAssets() {
        this.loadStoryImages()
        this.loadStoryAudios()
        this.game.load.start()
    }

    renderTaskList() {
        this.homeButton = this.game.add.button(10, 10, 'Buttons', this.onBackHome, this, 'buttons/home/hover', 'buttons/home/normal', 'buttons/home/click', 'buttons/home/disabled')
        TooltipBuilder(this.game, this.homeButton, '返回主界面', 'bottom')
        let tasks = this.gameContext.task_configs.tasks
        let padding = this.game.width - Math.round((this.game.width - 750) / 2)
        let x = padding - 75
        let y = Math.round(this.game.height * 0.5)
        if (this.endIndex === 9 && this.nextButton !== undefined) {
            this.nextButton.destroy()
            this.nextButton = undefined
        } else if (this.endIndex < 9 && this.nextButton === undefined) {
            this.nextButton = this.game.add.button(x, y, 'Buttons', this.onClickNext, this, 'buttons/arrow/hover', 'buttons/arrow/normal', 'buttons/arrow/click', 'buttons/arrow/disabled')
            setScaleAndAnchorForObject(this.nextButton, -1, 1, 0.5, 0.5)
            TooltipBuilder(this.game, this.nextButton, '下一页', 'bottom')
        }
        x -= 170
        for (let i = 0; i < 3; i++) {
            let task = tasks[this.endIndex - i]
            let taskButton = this.game.add.button(x, y, 'Buttons', this.onClickTask, {game: this.game, task: task, index: this.endIndex - i}, task.taskHoverImageKey, task.taskNormalImageKey, task.taskClickImageKey, task.taskDisabledImageKey)
            setScaleAndAnchorForObject(taskButton, 1.5, 1.5, 0.5, 0.5)
            TooltipBuilder(this.game, taskButton, task.taskName, 'bottom')
            x -= 200
        }
        if (this.endIndex === 2 && this.prevButton !== undefined) {
            this.prevButton.destroy()
            this.prevButton = undefined
        } else if (this.endIndex > 2 && (this.prevButton === undefined)) {
            this.prevButton = this.game.add.button(x, y, 'Buttons', this.onClickPrevious, this, 'buttons/arrow/hover', 'buttons/arrow/normal', 'buttons/arrow/click', 'buttons/arrow/disabled')
            setScaleAndAnchorForObject(this.prevButton, 1, 1, 0.5, 0.5)
            TooltipBuilder(this.game, this.prevButton, '上一页', 'bottom')
        }
    }

    create() {
        console.log('Knight Story Board Create.')
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

    onClickPrevious() {
        this.endIndex -= 3
        if (this.endIndex < 2) {
            this.endIndex = 2
        }
        this.renderTaskList()
    }

    onClickNext() {
        this.endIndex += 3
        if (this.endIndex >= this.taskCount) {
            this.endIndex = this.taskCount - 1
        }
        this.renderTaskList()
    }
    
    onClickTask() {
        console.log('On Click A Task: ' + this.task.taskName)
        this.game.state.add('KnightAnimationBoard', KnightAnimationBoardState, false)
        this.game.state.add('KnightTaskBoot', KnightTaskBootState, false)
        this.game.global.currentTaskIndex = this.index
        this.game.state.start('KnightTaskBoot')
    }

    onBackHome() {
        this.game.state.start('MainMenu')
    }

    loadComplete() {
        this.renderState()
        this.loadingText.destroy()
        this.created = true
    }

    renderState() {
        this.game.add.sprite(0, 0, 'background').scale.setTo(this.game.width/1440, this.game.height/700)
        this.renderTaskList()
    }
}