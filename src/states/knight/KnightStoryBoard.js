/**
 * Created by kfang on 6/25/17.
 */
import Phaser from 'phaser'
import KnightAnimationBoardState from './KnightAnimationBoard'
import KnightTaskBootState from './KnightTaskBoot'
import TooltipBuilder from '../../util/TooltipBuilder'
import {setScaleAndAnchorForObject} from '../../UIUtil'
import config from '../../config'

export default class extends Phaser.State {
    init() {
        console.log('KnightStoryBoard Init.')
        this.startIndex = 0
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
        this.game.load.image('start', this.gameContext.start_button_image)
        this.game.load.image('restart', this.gameContext.restart_button_image)
        this.game.load.image('next', this.gameContext.next_button_image)
        this.game.load.image('taskhint', this.gameContext.task_hint_image)

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
        console.log('KnightStoryBoard Preload.')
        this.setCurrentGameContext()
        this.loadStoryImages()
        this.loadStoryAudios()
    }

    create() {
        this.game.add.sprite(0, 0, 'background').scale.setTo(this.game.width/config.backgroundWidth, this.game.height/config.backgroundHeight)
    }

    render() {
        console.log('KnightStoryBoard Render.')
        let tasks = this.gameContext.task_configs.tasks
        let padding = Math.round((this.game.width - 600) / 2)
        let x = padding + 75
        let y = Math.round(this.game.height * 0.5)
        let prevButton = this.game.add.button(x, y, 'nextImage', this.onClickPrevious, this)
        setScaleAndAnchorForObject(prevButton, -0.5, 0.5, 0.5, 0.5)
        TooltipBuilder(this.game, prevButton, '上一个任务', 'bottom')
        x += 150
        for (let i = 0; i < 2; i++) {
            let task = tasks[this.startIndex + i]
            let taskButton = this.game.add.button(x, y, task.taskImageKey, this.onClickTask, {game: this.game, task: task, index: this.startIndex + i})
            setScaleAndAnchorForObject(taskButton, 0.5, 0.5, 0.5, 0.5)
            TooltipBuilder(this.game, taskButton, task.taskName, 'bottom')
            x += 150
        }
        let nextButton = this.game.add.button(x, y, 'nextImage', this.onClickNext, this)
        setScaleAndAnchorForObject(nextButton, 0.5, 0.5, 0.5, 0.5)
        TooltipBuilder(this.game, nextButton, '下一个任务', 'bottom')
    }

    onClickPrevious() {
        this.startIndex--
        if (this.startIndex < 0)
            this.startIndex = 0
    }

    onClickNext() {
        this.startIndex++
        if (this.storyCount >= this.taskCount)
            this.startIndex = this.taskCount - 1

    }
    
    onClickTask() {
        console.log('On Click A Task: ' + this.task.taskName)
        this.game.state.add('KnightAnimationBoard', KnightAnimationBoardState, false)
        this.game.state.add('KnightTaskBoot', KnightTaskBootState, false)
        this.game.global.currentTaskIndex = this.index
        this.game.state.start('KnightTaskBoot')
    }
}