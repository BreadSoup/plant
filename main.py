sound = 0
pump = 0

def on_sound_loud():
    global pump
    if sound:
        pump += 1
input.on_sound(DetectedSound.LOUD, on_sound_loud)

def on_sound_quiet():
    global pump
    if sound:
        pump += 0
input.on_sound(DetectedSound.QUIET, on_sound_quiet)

def on_forever():
    global sound
    pins.digital_write_pin(DigitalPin.P1, 1)
    sound += 1
    if input.button_is_pressed(Button.A):
        pins.digital_write_pin(DigitalPin.P1, 1)
    else:
        basic.pause(5000)
    sound = 0
    pins.digital_write_pin(DigitalPin.P1, 0)
    if sound:
        OLED.draw_line(3, 0, 4, 20)
    basic.pause(20000)
basic.forever(on_forever)

def on_forever2():
    basic.pause(500)
    serial.write_number(pins.analog_read_pin(AnalogReadWritePin.P10))
    serial.write_line("")
    serial.write_number(0)
    serial.write_line("lighjt")
    if pins.analog_read_pin(AnalogReadWritePin.P10) <= 500:
        basic.show_leds("""
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            # # . . .
            """)
    elif pins.analog_read_pin(AnalogReadWritePin.P10) <= 650:
        basic.show_leds("""
            . . . . .
            . . . . .
            . . . . .
            # # . . .
            # # . . .
            """)
    elif pins.analog_read_pin(AnalogReadWritePin.P10) <= 750:
        basic.show_leds("""
            . . . . .
            . . . . .
            # # . . .
            # # . . .
            # # . . .
            """)
    elif pins.analog_read_pin(AnalogReadWritePin.P10) <= 850:
        basic.show_leds("""
            . . . . .
            # # . . .
            # # . . .
            # # . . .
            # # . . .
            """)
    else:
        basic.show_leds("""
            # # . . .
            # # . . .
            # # . . .
            # # . . .
            # # . . .
            """)
    basic.pause(500)
basic.forever(on_forever2)
