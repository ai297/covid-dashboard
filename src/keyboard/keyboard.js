/* eslint-disable */

HTMLAudioElement.prototype.stop = function(){
    this.pause();
    this.currentTime = 0.0;
}
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const VKB_STYLES = {
    KEYBOARD: 'virtual-keyboard',
    KEYBOARD_HIDDEN: 'virtual-keyboard--hidden',
    CONTAINER: 'virtual-keyboard__keys-container',
    CONTAINER_MIN: 'virtual-keyboard__keys-container--minimize',
    KEY: 'virtual-keyboard__key',
    KEY_BIG: 'virtual-keyboard__key--big',
    KEY_DOUBLE: 'virtual-keyboard__key--double',
    KEY_TRIPPLE: 'virtual-keyboard__key--tripple',
    KEY_SPACE: 'virtual-keyboard__key--space',
    KEY_ACTIVE: 'virtual-keyboard__key--active',
    SETTINGS: 'virtual-keyboard__settings',
    SETTINGS_BUTTON: 'virtual-keyboard__settings-button'
}

class KeyLayout {

    static specialKeys = ['backspace', 'tab', 'capslock', 'enter', 'shiftleft', 'shiftright', 'voice', 'space', 'arrowleft', 'arrowright', 'lang'];

    constructor(locale, configureKeys = null) {
        this._locale = locale || 'en-US';
        this._keys = {
            backquote: ['`', '~'], digit1: ['1', '!'], digit2: ['2', '@'], digit3: ['3', '#'], digit4: ['4', '$'], digit5: ['5', '%'], digit6: ['6', '^'],
            digit7: ['7', '&'], digit8: ['8', '*'], digit9: ['9', '('], digit0: ['0', ')'], minus: ['-', '_'], Equal: ['=', '+'], backspace: 'keyboard_backspace',

            tab: 'keyboard_tab', keyq: 'q', keyw: 'w', keye: 'e', keyr: 'r', keyt: 't', keyy: 'y', keyu: 'u', keyi: 'i', keyo: 'o',
            keyp: 'p', bracketleft: ['[', '{'], bracketright: [']', '}'], backslash: ['\\', '|'],

            capslock: 'keyboard_capslock', keya: 'a', keys: 's', keyd: 'd', keyf: 'f', keyg: 'g', keyh: 'h', keyj: 'j', keyk: 'k', keyl: 'l',
            semicolon: [';', ':'], quote: ['\'', '"'], enter: 'keyboard_return',

            shiftleft: 'keyboard_arrow_up', keyz: 'z', keyx: 'x', keyc: 'c', keyv: 'v', keyb: 'b', keyn: 'n', keym: 'm', comma: [',', '<'],
            period: ['.', '>'], slash: ['/', '?'], shiftright: 'keyboard_arrow_up',

            voice: 'keyboard_voice', lang: 'Eng', space: 'space_bar', arrowleft: 'keyboard_arrow_left', arrowright: 'keyboard_arrow_right'
        };

        if(typeof(configureKeys) === 'function') configureKeys(this._keys);
    }

    get locale() { return this._locale; }

    getKey(code, alternate = false) {
        if(!this._keys.hasOwnProperty(code)) return;
        if(Array.isArray(this._keys[code])) {
            return !alternate ? this._keys[code][0] : this._keys[code][1];
        }
        else {
            return (!alternate || KeyLayout.specialKeys.includes(code)) ? this._keys[code] : this._keys[code].toUpperCase()
        }
    }

}

class VirtualKeyboard {
    constructor(layouts, replaceDefault = false) {
        this._shift = false;
        this._capslock = false;
        this._disableHardwareKeyboard = true;
        this._shiftDown = false;
        this._minimized = false;

        // add key layouts
        this._currentLayout = 0;
        this._layouts = [ new KeyLayout() ];
        if(Array.isArray(layouts) && layouts.length != 0) {
            if(replaceDefault) this._layouts.shift();
            layouts.forEach(layout => { if(layout instanceof KeyLayout) this._layouts.push(layout); });
        }

        // create dom elements
        this._el = document.createElement('div');
        this._el.className = VKB_STYLES.KEYBOARD;
        this._keysContainerElement = document.createElement('div');
        this._keysContainerElement.className = VKB_STYLES.CONTAINER;
        this._el.append(this._keysContainerElement);

        this._keyElements = {};
        for(let keyCode in this._layouts[0]._keys) {
            this._keyElements[keyCode] = document.createElement('button');
            this._keyElements[keyCode].className = VKB_STYLES.KEY;
            this._keyElements[keyCode].dataset.keyCode = keyCode;
            this._keysContainerElement.append(this._keyElements[keyCode]);

            // add custome styles
            if(['lang', 'tab', 'backspace', 'voice', 'arrowleft', 'arrowright'].includes(keyCode))
                this._keyElements[keyCode].classList.add(VKB_STYLES.KEY_BIG);
            else if(['capslock', 'enter'].includes(keyCode))
                this._keyElements[keyCode].classList.add(VKB_STYLES.KEY_DOUBLE);
            else if(['shiftleft', 'shiftright'].includes(keyCode))
                this._keyElements[keyCode].classList.add(VKB_STYLES.KEY_TRIPPLE);
            else if(keyCode == 'space')
                this._keyElements[keyCode].classList.add(VKB_STYLES.KEY_SPACE);
        }
        this._soundElement = new Audio();
        this._soundElement.addEventListener('canplay', () => {
            if(this._enableSoud) this._soundElement.play();
        });
        this._enableSoud = false;
        this._settingsElement = document.createElement('div');
        this._settingsElement.className = VKB_STYLES.SETTINGS;
        this._keysContainerElement.append(this._settingsElement);
        this.addSettingsButton(!this.minimized ? '<i class="material-icons">keyboard</i>' : '<i class="material-icons">keyboard_hide</i>',
            e => {
                const minimized = this.minimize()._minimized;
                e.target.innerHTML = !minimized ? '<i class="material-icons">keyboard</i>' : '<i class="material-icons">keyboard_hide</i>';
            });

        // add listeners
        this._el.addEventListener('click', e => {
            e.stopPropagation();
            if(e.target.dataset.keyCode !== undefined) this._keyHandler(e.target.dataset.keyCode);
        });
        this._el.addEventListener('mousedown', e => {
            if(document.activeElement.dataset.useKeyboard !== undefined) e.preventDefault();
        });

        // add to document
        if(document.readyState == 'complete')
            document.body.append(this._el);
        else
            window.addEventListener('load', () => { document.body.append(this._el); });
        this.hide();
    }

    get capsLock() { return this._capslock; }
    set capsLock(val) {
        this._capslock = !!val;
        if(this._capslock)
            this._keyElements.capslock.classList.add(VKB_STYLES.KEY_ACTIVE);
        else
            this._keyElements.capslock.classList.remove(VKB_STYLES.KEY_ACTIVE);
        this._updateKeys();
    }
    get shift() { return this._shift; }
    set shift(val) {
        this._shift = !!val;
        if(this._shift) {
            this._keyElements.shiftleft.classList.add(VKB_STYLES.KEY_ACTIVE);
            this._keyElements.shiftright.classList.add(VKB_STYLES.KEY_ACTIVE);
        }
        else {
            this._keyElements.shiftleft.classList.remove(VKB_STYLES.KEY_ACTIVE);
            this._keyElements.shiftright.classList.remove(VKB_STYLES.KEY_ACTIVE);
        }
        this._updateKeys();
    }

    get isUpper() { return this._capslock ^ this._shift; }

    init() {
        // add keyboard to input fields
        const init = () => {
            document.querySelectorAll('[data-use-keyboard]').forEach(input => {
                input.addEventListener('click', e => {
                    this.capsLock = e.getModifierState('CapsLock');
                    this.show(input);
                });
                input.addEventListener('blur', () => this.hide());
                input.addEventListener('keydown', this._keyDownHandler);
                input.addEventListener('keyup', this._keyUpHandler);
            });
        }
        if(document.readyState == 'complete')
            init();
        else
            window.addEventListener('load', init);

        return this;
    }

    show(inputElement) {
        if(this._visible) return this;
        this._visible = true;
        this._updateKeys();
        this._el.classList.remove(VKB_STYLES.KEYBOARD_HIDDEN);

        if(!inputElement) return this;
        inputElement.focus();

        // calculate keyboard offset
        // const inputRect = inputElement.getBoundingClientRect();
        // this._el.style.top = `${inputRect.top}px`;
        // this._el.style.left = `${inputRect.left + inputRect.width}px`;
        return this;
    }

    hide() {
        this._el.classList.add(VKB_STYLES.KEYBOARD_HIDDEN);
        this._visible = false;
        this.shift = false;
        this.capsLock = false;
        // this._keysContainerElement.style.marginTop = '0';
        return this;
    }

    minimize() {
        if(!this._minimized) this._keysContainerElement.classList.add(VKB_STYLES.CONTAINER_MIN);
        else this._keysContainerElement.classList.remove(VKB_STYLES.CONTAINER_MIN);
        this._minimized = !this._minimized;
        return this;
    }

    switchKeyboardMode() {
        this._disableHardwareKeyboard = !this._disableHardwareKeyboard;
        return this._disableHardwareKeyboard;
    }

    setBackround(color) {
        if(!!color) {
            this._keysContainerElement.style.backgroundColor = color;
            this._settingsElement.style.backgroundColor = color;
        }
        return this;
    }

    addSounds(sounds) {
        if(this._sounds === undefined && !!sounds){
            this._sounds = sounds;
            this._enableSoud = true;
            this.addSettingsButton('<i class="material-icons">volume_up</i>', e => {
                this._enableSoud = !this._enableSoud;
                e.target.innerHTML = this._enableSoud ? '<i class="material-icons">volume_up</i>' : '<i class="material-icons">volume_off</i>';
                if(this._enableSoud) this._playSound('arrowleft');
            });
        }
        return this;
    }

    addSettingsButton(html, handler) {
        const btn = document.createElement('button');
        btn.className = VKB_STYLES.SETTINGS_BUTTON;
        btn.innerHTML = html;
        btn.addEventListener('click', handler);
        this._settingsElement.prepend(btn);
        return this;
    }

    _updateKeys() {
        let keyValue;
        for(let key in this._keyElements) {
            keyValue = this._layouts[this._currentLayout].getKey(key, this.isUpper);

            if(KeyLayout.specialKeys.includes(key) && key != 'lang')
                this._keyElements[key].innerHTML = `<i class="material-icons">${keyValue}</i>`;
            else this._keyElements[key].innerHTML = keyValue;
        }
    }

    _keyHandler(keyCode) {
        const input = document.activeElement;
        if(input.dataset.useKeyboard === undefined) return;

        let start = input.selectionStart;
        let end = input.selectionEnd;
        let soundIndex = 0;

        switch(keyCode) {
            case 'shiftleft':
            case 'shiftright':
                this.shift = !this.shift;
                if(!this.shift) soundIndex = 1;
                break;
            case 'capslock':
                this.capsLock = !this.capsLock;
                if(!this.capsLock) soundIndex = 1;
                break;
            case 'backspace':
                if(start != end) input.setRangeText('', start, end, 'end');
                else if(start > 0) input.setRangeText('', start - 1, start, 'end');
                break;
            case 'tab':
                input.setRangeText('\t', start, end, 'end');
                break;
            case 'enter':
                input.setRangeText('\n', start, end, 'end');
                break;
            case 'voice':
                if(!this.voiceInput()) soundIndex = 1;
                break;
            case 'space':
                input.setRangeText(' ', start, end, 'end');
                break;
            case 'arrowleft':
                if(!this.shift) {
                    start = start > 0 ? start-1 : 0;
                    input.setSelectionRange(start, start, 'none');
                }
                else if(input.selectionDirection == 'backward' || start == end)
                    input.setSelectionRange(start > 0 ? start - 1 : 0, end, 'backward');
                else
                    input.setSelectionRange(start, end - 1);
                break;
            case 'arrowright':
                if(!this.shift)
                    input.setSelectionRange(end + 1, end + 1, 'none');
                else if(input.selectionDirection == 'forward' || start == end)
                    input.setSelectionRange(start, end + 1, 'forward');
                else
                    input.setSelectionRange(start + 1, end, 'backward');
                break;
            case 'lang':
                if(this._currentLayout < this._layouts.length - 1) this._currentLayout++;
                else this._currentLayout = 0;
                if(this._speachRecognition !== undefined) {
                    this._speachRecognition.abort();
                    this._speachRecognition.lang = this._layouts[this._currentLayout].locale;
                }
                this._updateKeys();
                break;
            default:
                let key = this._layouts[this._currentLayout].getKey(keyCode, this.isUpper);
                if(key === undefined) return;
                input.setRangeText(key, start, end, 'end');
                if(this.shift) this.shift = false;
                break;
        }
        input.dispatchEvent(new Event('input'));
        this._playSound(keyCode, soundIndex);
    }

    _keyDownHandler = e => {
        const keyCode = e.code.toLowerCase();
        const isShiftOrCapslock = ['shiftleft', 'shiftright', 'capslock'].includes(keyCode);

        if(this._disableHardwareKeyboard || keyCode == 'tab' || isShiftOrCapslock) {
            e.preventDefault();
            if(!e.repeat && ['shiftleft', 'shiftright'].includes(keyCode) && (e.altKey || e.ctrlKey)){
                this._keyHandler('lang');
            }
            else if(!e.repeat || !isShiftOrCapslock) {
                this._shiftDown = true;
                this._keyHandler(keyCode);
            }
        }

        if(this._keyElements[keyCode] !== undefined && !e.repeat && !isShiftOrCapslock) {
            this._keyElements[keyCode].classList.add(VKB_STYLES.KEY_ACTIVE);
        }
    }
    _keyUpHandler = e => {
        const keyCode = e.code.toLowerCase();
        if(['shiftleft', 'shiftright'].includes(keyCode) && this._shiftDown && !this._disableHardwareKeyboard) {
            e.preventDefault();
            this._keyHandler(keyCode);
            this._shiftDown = false;
            return;
        }
        if(this._keyElements[keyCode] === undefined || keyCode == 'capslock' || (['shiftleft', 'shiftright'].includes(keyCode) && this._disableHardwareKeyboard)) return;
        setTimeout(() => this._keyElements[keyCode].classList.remove(VKB_STYLES.KEY_ACTIVE), 150);
    }

    _playSound(name, index = 0) {
        if(!this._enableSoud || this._sounds === undefined) return;
        let src = this._sounds[name];

        if(src === undefined) {
            if(this._sounds.hasOwnProperty(this._layouts[this._currentLayout].locale))
                src = this._sounds[this._layouts[this._currentLayout].locale]
            else return;
        }

        if(Array.isArray(src)) src = src[index];

//        this._soundElement.stop();
        this._soundElement.src = src;
        this._soundElement.load();
    }

    voiceInput() {
        if(this._voiceInput === undefined) this._voiceInput = true;
        else this._voiceInput = !this._voiceInput;

        if(this._voiceInput) this._keyElements.voice.classList.add(VKB_STYLES.KEY_ACTIVE);
        else this._keyElements.voice.classList.remove(VKB_STYLES.KEY_ACTIVE);

        if(!this._voiceInput) {
            this._speachRecognition.stop();
            return false;
        }

        if(this._speachRecognition === undefined) {
            this._speachRecognition = new SpeechRecognition();
            this._speachRecognition.interimResults = true;

            this._speachRecognition.addEventListener('result', e => {
                let transcript = Array.from(e.results)
                    .map(result => result[0])
                    .map(result => result.transcript)
                    .join('');
                transcript = transcript[0].toUpperCase() + transcript.substring(1);

                const input = document.activeElement;
                if(input.dataset.useKeyboard === undefined) return;
                let start = input.selectionStart;
                let end = input.selectionEnd;

                input.setRangeText(transcript, start, end, 'select');

                if(!e.results[0].isFinal) return;

                end = input.selectionEnd;

                switch(transcript.toLowerCase().trim()) {
                    case 'стереть всё':
                    case 'удалить всё':
                    case 'remove all':
                    case 'delete all':
                    case 'clear':
                    case 'очистить':
                        input.select();
                        start = input.selectionStart;
                        end = input.selectionEnd;
                        input.setRangeText('', start, end, 'end');
                        break;
                    case 'новая строка':
                    case 'new line':
                        input.setRangeText('\n', start, end, 'end');
                        break;
                    case 'конец записи':
                    case 'завершить запись':
                    case 'закончить запись':
                    case 'stop record':
                        input.setRangeText('', start, end, 'end');
                        this._keyHandler('voice');
                        break;
                    default:
                        input.setRangeText('. ', end, end, 'end');
                        break;
                }
            });
            this._speachRecognition.addEventListener('end', () => {
                if(this._voiceInput) this._speachRecognition.start();
            });
        }

        this._speachRecognition.lang = this._layouts[this._currentLayout].locale;
        this._speachRecognition.start();
        return true;
    }
}
export default VirtualKeyboard;
