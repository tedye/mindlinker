/**
 * Created by kfang on 6/25/17.
 */
import Phaser from 'phaser'
import KnightAnimationBoardState from './KnightAnimationBoard'
import KnightTaskBootState from './KnightTaskBoot'
import TooltipBuilder from '../../util/TooltipBuilder'
import {createLoadingText, loadStart, fileComplete, rescaleObject, rescaleXOffset, rescaleYOffset} from '../../UIUtil'
import {logDebugInfo} from '../../Logger'

export default class extends Phaser.State {
    init() {
        logDebugInfo('KnightStoryBoard Init.')
        this.endIndex = 2
    }

    loadStoryImages() {
        for (let i = 0; i < this.gameContext.spritesheets.length; i++) {
            let spriteSheet = this.gameContext.spritesheets[i]
            logDebugInfo('Load spritesheet: ' + spriteSheet.spritesheet + ' as ' + spriteSheet.key + ' with data file: ' + spriteSheet.datafile)
            this.game.load.atlasJSONArray(spriteSheet.key, spriteSheet.spritesheet, spriteSheet.datafile)
        }

        this.game.load.image('background', this.gameContext.background_image)
        this.game.load.image('foreground', this.gameContext.foreground_image)
        this.game.load.image('grid', this.gameContext.grid_image)
        this.game.load.image('shadow', this.gameContext.shadow_image)
        this.game.load.image('info', this.gameContext.info_image)
        this.game.load.image('titleboard', this.gameContext.title_image)
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
        logDebugInfo('KnightStoryBoard Preload.')
        this.setCurrentGameContext()
    }

    loadAssets() {
        this.loadStoryImages()
        this.loadStoryAudios()
        this.game.load.start()
    }

    renderTaskList() {
        let rightPadding = rescaleXOffset(250, this.game)
        let tasks = this.gameContext.task_configs.tasks
        let x = this.game.width - rightPadding
        let y = rescaleYOffset(450, this.game)
        let spacer = rescaleXOffset(20, this.game)
        let nextButton = undefined
        let prevButton = undefined
        if (this.endIndex < 9 && nextButton === undefined) {
            nextButton = this.game.add.button(x, y, 'Buttons', this.onClickNext, this, 'buttons/arrow/hover', 'buttons/arrow/normal', 'buttons/arrow/click', 'buttons/arrow/disabled')
            rescaleObject(nextButton, this.game, -1, 1)
            nextButton.anchor.setTo(0.5, 0.5)
            TooltipBuilder(this.game, nextButton, '下一页', 'bottom')
        }
        x -= rescaleXOffset(200, this.game)

        for (let i = 0; i < 3; i++) {
            let task = tasks[this.endIndex - i]
            let taskButton = this.game.add.button(x, y, 'Buttons', this.onClickTask, {game: this.game, task: task, index: this.endIndex - i}, task.taskHoverImageKey, task.taskNormalImageKey, task.taskClickImageKey, task.taskDisabledImageKey)
            rescaleObject(taskButton, this.game, 2, 2)
            taskButton.anchor.setTo(0.5, 0.5)
            TooltipBuilder(this.game, taskButton, task.taskName, 'bottom')
            x -= spacer
            if (i < 2) {
                x -= taskButton.width
            } else {
                x -= rescaleXOffset(200, this.game)
            }
        }
        if (this.endIndex > 2 && (prevButton === undefined)) {
            prevButton = this.game.add.button(x, y, 'Buttons', this.onClickPrevious, this, 'buttons/arrow/hover', 'buttons/arrow/normal', 'buttons/arrow/click', 'buttons/arrow/disabled')
            rescaleObject(prevButton, this.game, 1, 1)
            prevButton.anchor.setTo(0.5, 0.5)
            TooltipBuilder(this.game, prevButton, '上一页', 'bottom')
        }
    }

    renderHomeButton() {
        let x = rescaleXOffset(80, this.game)
        let y = rescaleYOffset(80, this.game)
        this.backToTasksButton = this.game.add.button(x, y, 'Buttons', this.onBackHome, this, 'buttons/home/hover', 'buttons/home/normal', 'buttons/home/click', 'buttons/home/disabled')
        rescaleObject(this.backToTasksButton, this.game, 1, 1)
        this.backToTasksButton.anchor.setTo(0.5, 0.5)
        TooltipBuilder(this.game, this.backToTasksButton, '返回主界面', 'bottom')
    }

    create() {
        logDebugInfo('Knight Story Board Create.')
        if (!this.created) {
            this.loadingText = createLoadingText(this.game)
            this.game.load.onLoadStart.addOnce(loadStart, this)
            this.game.load.onFileComplete.add(fileComplete, this)
            this.game.load.onLoadComplete.addOnce(this.loadComplete, this)
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
        logDebugInfo('On Click A Task: ' + this.task.taskName)
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
        let background = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'background')
        rescaleObject(background, this.game, 1, 1.2)
        background.anchor.setTo(0.5, 0.5)
        this.renderHomeButton()
        this.renderTaskList()
    }
}