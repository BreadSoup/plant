input.onButtonPressed(Button.A, function () {
    basic.clearScreen()
    basic.showString("" + (input.temperature()))
})
input.onButtonPressed(Button.B, function () {
    alarm_latched = false
})
let pin0_value = 0
let noise = 0
let average_noise = 0
let sound = 0
let total_noise = 0
let alarm_latched = false
pins.setPull(DigitalPin.P0, PinPullMode.PullDown)
// Sample the microphone 50 times over the five-second P1-on phase.
basic.forever(function () {
    total_noise = 0
    pins.digitalWritePin(DigitalPin.P1, 1)
    sound = 1
    for (let index = 0; index < 50; index++) {
        total_noise += input.soundLevel()
        basic.pause(100)
    }
    sound = 0
    pins.digitalWritePin(DigitalPin.P1, 0)
    average_noise = total_noise / 50
    serial.writeValue("average_noise", average_noise)
    if (average_noise <= 175) {
        alarm_latched = true
    }
    basic.pause(20000)
})
basic.forever(function () {
    basic.pause(500)
    noise = input.soundLevel()
    serial.writeValue("noise", noise)
    pin0_value = pins.analogReadPin(AnalogReadWritePin.P0)
    serial.writeValue("pin0", pin0_value)
    serial.writeValue("p1_on", sound)
    if (pin0_value >= 900) {
        serial.writeValue("pin0_near_3v", 1)
    } else {
        serial.writeValue("pin0_near_3v", 0)
    }
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
            # . . . .
            `)
    } else if (pins.analogReadPin(AnalogReadWritePin.P10) <= 650) {
        basic.showLeds(`
            . . . . .
            . . . . .
            . . . . .
            # . . . .
            # . . . .
            `)
    } else if (pins.analogReadPin(AnalogReadWritePin.P10) <= 750) {
        basic.showLeds(`
            . . . . .
            . . . . .
            # . . . .
            # . . . .
            # . . . .
            `)
    } else if (pins.analogReadPin(AnalogReadWritePin.P10) <= 850) {
        basic.showLeds(`
            . . . . .
            # . . . .
            # . . . .
            # . . . .
            # . . . .
            `)
    } else {
        basic.showLeds(`
            # . . . .
            # . . . .
            # . . . .
            # . . . .
            # . . . .
            `)
    }
    if (alarm_latched) {
        for (let column = 0; column <= 4; column++) {
            led.plot(3, column)
        }
    }
    if (pins.analogReadPin(AnalogReadWritePin.P0) < 400) {
        for (let column = 0; column <= 4; column++) {
            led.plot(2, column)
        }
    }
    basic.pause(100)
})
