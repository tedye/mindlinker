/**
 * Created by kfang on 7/11/17.
 */
import Phaser from 'phaser'
import KnightBootState from './knight/KnightBoot'
import TooltipBuilder from '../util/TooltipBuilder'
import {setScaleAndAnchorForObject} from '../UIUtil'

export default class extends Phaser.State {
    init() {
        console.log('Main Menu Init.')
        this.endIndex = 1
    }

    preload() {
        console.log('Main Menu Preload.')
        this.rootContext = JSON.parse(this.game.cache.getText('rootContext'))
        this.storyCount = this.rootContext.stories.length
        let stories = this.rootContext.stories
        for (let i = 0; i < stories.length; i++) {
            let story = stories[i]
            this.game.load.image(story.storyImageKey, story.storyImage)
        }

        this.game.load.image('nextImage', 'assets/images/knight/next.png')
    }

    renderMenu() {
        let stories = this.rootContext.stories
        let padding = this.game.width - Math.round((this.game.width - 600) / 2)
        let x = padding - 75
        let y = Math.round(this.game.height * 0.5)
        let nextButton = this.game.add.button(x, y, 'nextImage', this.onClickNext, this)
        setScaleAndAnchorForObject(nextButton, 0.5, 0.5, 0.5, 0.5)
        TooltipBuilder(this.game, nextButton, '下一页', 'bottom')
        x -= 150
        for (let i = 0; i < 2; i++) {
            let story = stories[this.endIndex - i]
            let storyButton = this.game.add.button(x, y, story.storyImageKey, this.onClickStory, {game: this.game, story: story})
            setScaleAndAnchorForObject(storyButton, 0.5, 0.5, 0.5, 0.5)
            TooltipBuilder(this.game, storyButton, story.storyName, 'bottom')
            x -= 150
        }
        let prevButton = this.game.add.button(x, y, 'nextImage', this.onClickPrevious, this)
        setScaleAndAnchorForObject(prevButton, -0.5, 0.5, 0.5, 0.5)
        TooltipBuilder(this.game, prevButton, '上一页', 'bottom')
    }

    create() {
        this.renderMenu()
    }

    onClickPrevious() {
        this.endIndex -= 2
        if (this.endIndex < 1) {
            this.endIndex = 1
        }
        this.renderMenu()
    }

    onClickNext() {
        this.endIndex += 2
        if (this.endIndex >= this.storyCount) {
            this.endIndex = this.storyCount - 1
        }
        this.renderMenu()
    }

    onClickStory() {
        console.log('On Click Story.')
        this.game.global.currentStoryConfig = this.story.storyConf
        this.game.state.add('KnightBoot', KnightBootState, false)
        this.game.state.start(this.story.storyState)
    }
}