alarm_latched = False
noise = 0
total_noise = 0
sound = 0
average_noise = 0
pins.set_pull(DigitalPin.P0, PinPullMode.PULL_DOWN)

def on_button_pressed_b():
    global alarm_latched
    alarm_latched = False
input.on_button_pressed(Button.B, on_button_pressed_b)

def on_forever():
    global noise
    basic.pause(500)
    noise = input.sound_level()
    serial.write_value("noise", noise)
    pin0_value = pins.analog_read_pin(AnalogReadWritePin.P0)
    serial.write_value("pin0", pin0_value)
    serial.write_value("p1_on", sound)
    if pin0_value >= 900:
        serial.write_value("pin0_near_3v", 1)
    else:
        serial.write_value("pin0_near_3v", 0)
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
    if alarm_latched:
        for column in range(5):
            led.plot(3, column)
    basic.pause(100)
basic.forever(on_forever)

# Sample the microphone 50 times over the five-second P1-on phase.

def on_forever2():
    global total_noise, sound, average_noise, alarm_latched
    total_noise = 0
    pins.digital_write_pin(DigitalPin.P1, 1)
    sound = 1
    for index in range(50):
        total_noise += input.sound_level()
        basic.pause(100)
    sound = 0
    pins.digital_write_pin(DigitalPin.P1, 0)
    average_noise = total_noise / 50
    serial.write_value("average_noise", average_noise)
    if average_noise <= 180:
        alarm_latched = True
    basic.pause(20000)
basic.forever(on_forever2)
