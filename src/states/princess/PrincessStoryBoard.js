/**
 * Created by kfang on 7/23/17.
 */
import Phaser from 'phaser'
import PrincessAnimationBoardState from './PrincessAnimationBoard'
import PrincessTaskBootState from './PrincessTaskBoot'
import TooltipBuilder from '../../util/TooltipBuilder'
import {setScaleAndAnchorForObject} from '../../UIUtil'
import config from '../../config'

export default class extends Phaser.State {
    init() {
        console.log('PrincessStoryBoard Init.')
        this.endIndex = 2
    }

    loadStoryImages() {
        for (let i = 0; i < this.gameContext.spritesheets.length; i++) {
            let spriteSheet = this.gameContext.spritesheets[i]
            console.log('Load spritesheet: ' + spriteSheet.spritesheet + ' as ' + spriteSheet.key + ' with data file: ' + spriteSheet.datafile)
            this.game.load.atlasJSONArray(spriteSheet.key, spriteSheet.spritesheet, spriteSheet.datafile)
        }

        this.game.load.image('background', this.gameContext.background_image)
        this.game.load.image('start', this.gameContext.start_button_image)
        this.game.load.image('restart', this.gameContext.restart_button_image)
        this.game.load.image('next', this.gameContext.next_button_image)
        this.game.load.image('taskhint', this.gameContext.task_hint_image)
        this.game.load.image('footprint', this.gameContext.foot_print_image)

        for (let i = 0; i < this.gameContext.task_configs.tasks.length; i++) {
            let task = this.gameContext.task_configs.tasks[i]
            this.game.load.image(task.taskImageKey, task.taskImage)
        }
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
        console.log('PrincessStoryBoard Preload.')
        this.setCurrentGameContext()
        this.loadStoryImages()
        this.loadStoryAudios()
    }

    renderTaskList() {
        let tasks = this.gameContext.task_configs.tasks
        let padding = this.game.width - Math.round((this.game.width - 750) / 2)
        let x = padding - 75
        let y = Math.round(this.game.height * 0.5)
        let nextButton = this.game.add.button(x, y, 'nextImage', this.onClickNext, this)
        setScaleAndAnchorForObject(nextButton, -0.5, 0.5, 0.5, 0.5)
        TooltipBuilder(this.game, nextButton, '下一页', 'bottom')
        x -= 170
        for (let i = 0; i < 3; i++) {
            let task = tasks[this.endIndex - i]
            let taskButton = this.game.add.button(x, y, task.taskImageKey, this.onClickTask, {game: this.game, task: task, index: this.endIndex - i})
            setScaleAndAnchorForObject(taskButton, 0.5, 0.5, 0.5, 0.5)
            TooltipBuilder(this.game, taskButton, task.taskName, 'bottom')
            x -= 170
        }
        let prevButton = this.game.add.button(x, y, 'nextImage', this.onClickPrevious, this)
        setScaleAndAnchorForObject(prevButton, 0.5, 0.5, 0.5, 0.5)
        TooltipBuilder(this.game, prevButton, '上一页', 'bottom')
    }

    create() {
        this.game.add.sprite(0, 0, 'background').scale.setTo(this.game.width/config.backgroundWidth, this.game.height/config.backgroundHeight)
        this.renderTaskList()
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
        this.game.state.add('PrincessAnimationBoard', PrincessAnimationBoardState, false)
        this.game.state.add('PrincessTaskBoot', PrincessTaskBootState, false)
        this.game.global.currentTaskIndex = this.index
        this.game.state.start('PrincessTaskBoot')
    }
}