let sound = 0
let pump = 0
input.onSound(DetectedSound.Loud, function on_sound_loud() {
    
    if (sound) {
        pump += 1
    }
    
})
input.onSound(DetectedSound.Quiet, function on_sound_quiet() {
    
    if (sound) {
        pump += 0
    }
    
})
basic.forever(function on_forever() {
    
    pins.digitalWritePin(DigitalPin.P1, 1)
    sound += 1
    if (input.buttonIsPressed(Button.A)) {
        pins.digitalWritePin(DigitalPin.P1, 1)
    } else {
        basic.pause(5000)
    }
    
    sound = 0
    pins.digitalWritePin(DigitalPin.P1, 0)
    if (sound) {
        OLED.drawLine(3, 0, 4, 20)
    }
    
    basic.pause(20000)
})
basic.forever(function on_forever2() {
    basic.pause(500)
    serial.writeNumber(pins.analogReadPin(AnalogReadWritePin.P10))
    serial.writeLine("")
    serial.writeNumber(0)
    serial.writeLine("lighjt")
    if (pins.analogReadPin(AnalogReadWritePin.P10) <= 500) {
        basic.showLeds(`
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            # # . . .
            `)
    } else if (pins.analogReadPin(AnalogReadWritePin.P10) <= 650) {
        basic.showLeds(`
            . . . . .
            . . . . .
            . . . . .
            # # . . .
            # # . . .
            `)
    } else if (pins.analogReadPin(AnalogReadWritePin.P10) <= 750) {
        basic.showLeds(`
            . . . . .
            . . . . .
            # # . . .
            # # . . .
            # # . . .
            `)
    } else if (pins.analogReadPin(AnalogReadWritePin.P10) <= 850) {
        basic.showLeds(`
            . . . . .
            # # . . .
            # # . . .
            # # . . .
            # # . . .
            `)
    } else {
        basic.showLeds(`
            # # . . .
            # # . . .
            # # . . .
            # # . . .
            # # . . .
            `)
    }
    
    basic.pause(500)
})
