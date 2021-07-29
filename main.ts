function updateScreen () {
    basic.clearScreen()
    numChar[currentNum].showImage(0)
}
function showMorse (isIn: boolean) {
    basic.clearScreen()
    if (currentNum > 0) {
        _index = currentNum - 1
    } else {
        _index = 9
    }
    if (!(isIn)) {
        _cmorse = morseCode[_index]
    }
    for (let i = 0; i <= 4; i++) {
        if (_cmorse[i] == "-") {
            led.plotBrightness(i, 2, 255)
            music.playTone(800, music.beat(BeatFraction.Quarter))
        } else {
            led.plotBrightness(i, 2, 150)
            music.playTone(800, music.beat(BeatFraction.Sixteenth))
        }
        basic.pause(100)
    }
    basic.pause(1000)
}
input.onButtonPressed(Button.A, function () {
    music.playTone(800, music.beat(BeatFraction.Sixteenth))
    if (currentNum > 0) {
        currentNum += -1
    } else {
        currentNum = 9
    }
    updateScreen()
})
input.onPinPressed(TouchPin.P2, function () {
    send()
})
function init () {
    radio.setGroup(80)
    currentNum = 0
    numChar = [
    images.createImage(`
        . # # # .
        . # . # .
        . # . # .
        . # . # .
        . # # # .
        `),
    images.createImage(`
        . . # . .
        . # # . .
        . . # . .
        . . # . .
        . # # # .
        `),
    images.createImage(`
        . # # # .
        . . . # .
        . # # # .
        . # . . .
        . # # # .
        `),
    images.createImage(`
        . # # # .
        . . . # .
        . . # # .
        . . . # .
        . # # # .
        `),
    images.createImage(`
        . # . # .
        . # . # .
        . # # # .
        . . . # .
        . . . # .
        `),
    images.createImage(`
        . # # # .
        . # . . .
        . # # # .
        . . . # .
        . # # # .
        `),
    images.createImage(`
        . # # # .
        . # . . .
        . # # # .
        . # . # .
        . # # # .
        `),
    images.createImage(`
        . # # # .
        . . . # .
        . . . # .
        . . . # .
        . . . # .
        `),
    images.createImage(`
        . # # # .
        . # . # .
        . # # # .
        . # . # .
        . # # # .
        `),
    images.createImage(`
        . # # # .
        . # . # .
        . # # # .
        . . . # .
        . . . # .
        `)
    ]
    initMorseCode()
    updateScreen()
}
function send () {
    basic.clearScreen()
    music.startMelody(["G:1", "D5:4"], MelodyOptions.Once)
    basic.showIcon(IconNames.Yes)
    basic.pause(1000)
    showMorse(false)
    radio.sendString("" + (_cmorse))
    basic.pause(500)
    init()
}
radio.onReceivedString(function (receivedString) {
    _cmorse = receivedString
    basic.showLeds(`
        # # # # #
        # # . # #
        # . # . #
        # . . . #
        # # # # #
        `)
    music.startMelody(["D6", "B5"], MelodyOptions.Once)
    basic.pause(2000)
    showMorse(true)
    init()
})
input.onButtonPressed(Button.B, function () {
    music.playTone(800, music.beat(BeatFraction.Sixteenth))
    if (currentNum < 9) {
        currentNum += 1
    } else {
        currentNum = 0
    }
    updateScreen()
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    music.playTone(800, music.beat(BeatFraction.Sixteenth))
    currentNum = randint(0, 9)
    updateScreen()
})
function initMorseCode () {
    morseChar = [".", "-"]
    for (let c = 0; c <= 1; c++) {
        for (let j = 0; j <= 4; j++) {
            newMorse = []
            for (let k = 0; k <= j; k++) {
                newMorse.push(morseChar[c])
            }
            for (let l = 0; l <= 3 - j; l++) {
                if (c) {
                    newMorse.push(morseChar[0])
                } else {
                    newMorse.push(morseChar[1])
                }
            }
            morseCode.push(newMorse.join(''))
        }
    }
    console.log(morseCode)
}
let morseChar: string[] = []
let _index = 0
let currentNum = 0
let numChar: Image[] = []
radio.sendNumber(0)
let newMorse: string[] = []
let morseCode: string[] = []
let _cmorse: string;
init()
