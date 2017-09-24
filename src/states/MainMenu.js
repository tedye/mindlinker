/**
 * Created by kfang on 7/11/17.
 */
import Phaser from 'phaser'
import KnightBootState from './knight/KnightBoot'
import PrincessBootState from './princess/PrincessBoot'
import TooltipBuilder from '../util/TooltipBuilder'
import {hideBlock, createLoadingText, loadStart, fileComplete, rescaleObject, rescaleXOffset, rescaleYOffset} from '../UIUtil'
import {logDebugInfo} from '../Logger'

export default class extends Phaser.State {
    init() {
        logDebugInfo('Main Menu Init.')
        this.endIndex = 1
        this.storyKey = 'Stories'
    }

    preload() {
        logDebugInfo('Main Menu Preload.')
        this.rootContext = JSON.parse(this.game.cache.getText('rootContext'))
    }

    loadAssets() {
        let spriteSheets = this.rootContext.spritesheets
        this.game.load.image('mainBackground', this.rootContext.main_background_image)
        for (let i = 0; i < spriteSheets.length; i++) {
            let spriteSheet = spriteSheets[i]
            logDebugInfo('Load spritesheet: ' + spriteSheet.spritesheet + ' as ' + spriteSheet.key + ' with data file: ' + spriteSheet.datafile)
            this.game.load.atlasJSONArray(spriteSheet.key, spriteSheet.spritesheet, spriteSheet.datafile)
        }
        this.game.load.start()
    }

    renderBackground() {
        let background = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'mainBackground')
        background.anchor.setTo(0.5, 0.5)
        rescaleObject(background, this.game, 1, 1)
    }

    renderMenu() {
        let logoXOffset = rescaleXOffset(200, this.game)
        let logoYOffset = rescaleYOffset(240, this.game)
        let rightPadding = rescaleXOffset(350, this.game)
        let logo = this.game.add.sprite(logoXOffset, logoYOffset, 'logo')
        rescaleObject(logo, this.game, 0.3, 0.3)
        logo.anchor.setTo(0.5, 0.5)
        let stories = this.rootContext.stories
        let x = this.game.width - rightPadding
        let y = rescaleYOffset(500, this.game)
        let spacer = rescaleXOffset(400, this.game)
        /**let nextButton = this.game.add.button(x, y, 'nextImage', this.onClickNext, this)
        setScaleAndAnchorForObject(nextButton, -0.5, 0.5, 0.5, 0.5)
        TooltipBuilder(this.game, nextButton, '下一页', 'bottom')**/
        for (let i = 0; i < 2; i++) {
            let story = stories[this.endIndex - i]
            let storyButton = this.game.add.button(x, y, this.storyKey, this.onClickStory, {game: this.game, story: story, index: this.endIndex - i}, story.storyHoverImageKey, story.storyNormalImageKey, story.storyClickImageKey, story.storyDisabledImageKey)
            rescaleObject(storyButton, this.game, 1, 1)
            storyButton.anchor.setTo(0.5, 0.5)
            TooltipBuilder(this.game, storyButton, story.storyName, 'bottom')
            x -= spacer
        }
        /**let prevButton = this.game.add.button(x, y, 'nextImage', this.onClickPrevious, this)
        setScaleAndAnchorForObject(prevButton, 0.5, 0.5, 0.5, 0.5)
        TooltipBuilder(this.game, prevButton, '上一页', 'bottom')**/

        /**
         hide block in main menu
         **/
        hideBlock()
    }

    create() {
        logDebugInfo('Main Menu Create.')
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

    /**
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
    }**/

    onClickStory() {
        logDebugInfo('On Click Story.')
        this.game.global.currentStoryConfig = this.story.storyConf
        if (this.index === 0) {
            this.game.state.add('KnightBoot', KnightBootState, false)
        } else {
            this.game.state.add('PrincessBoot', PrincessBootState, false)
        }
        logDebugInfo('About to start the story: ' + this.story.storyState)
        this.game.state.start(this.story.storyState)
    }

    loadComplete() {
        this.renderState()
        this.loadingText.destroy()
        this.created = true
    }

    renderState() {
        this.renderBackground()
        this.renderMenu()
    }
}