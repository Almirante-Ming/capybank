export function DataFormatter() {

    const CPF = (e) => {

        var value = e.target.value
        var caret = e.target.selectionStart
        var previousValue = e.target.previousValue
    
        if (value + "-" === previousValue || value + "." === previousValue) {
            if (caret === 3 && value.substring(3, 4) !== ".") {
                var prefix = value.substring(0, 2)
                var suffix = value.substring(3)
                value = prefix + suffix
                caret--
            } else if (caret === 7 && value.substring(7, 8) !== ".") {
                var prefix = value.substring(0, 6)
                var suffix = value.substring(7)
                value = prefix + suffix
                caret--
            } else if (caret === 11 && value.substring(11, 12) !== "-") {
                var prefix = value.substring(0, 10)
                var suffix = value.substring(11)
                value = prefix + suffix
                caret--
            }
        }
    
        for (var i = value.length - 1; i >= 0; i--) {
            var char = value[i]
            if (char >= "0" && char <= "9") {
                continue
            }
    
            var prefix = value.substring(0, i)
            var suffix = value.substring(i + 1)
            value = prefix + suffix
            if (caret > i) {
                caret--
            }
        }
    
        if (value.length > 11) {
            value = value.substring(0, 11)
        }
    
        if (value.length >= 3) {
            var prefix = value.substring(0, 3)
            var suffix = value.substring(3)
            value = prefix + "." + suffix
            if (caret >= 3) {
                caret++
            }
        }
    
        if (value.length >= 7) {
            var prefix = value.substring(0, 7)
            var suffix = value.substring(7)
            value = prefix + "." + suffix
            if (caret >= 7) {
                caret++
            }
        }
    
        if (value.length >= 11) {
            var prefix = value.substring(0, 11)
            var suffix = value.substring(11)
            value = prefix + "-" + suffix
            if (caret >= 11) {
                caret++
            }
        }
    
        e.target.value = value
        e.target.selectionStart = caret
        e.target.selectionEnd = caret
        e.target.previousValue = value
    }

    const phone = (e) => {
        var value = e.target.value.replace(/\D/g, '') // Remove todos os caracteres não numéricos
        var caret = e.target.selectionStart
        var previousValue = e.target.previousValue || ''
    
        if (value.length > 11) {
            value = value.substring(0, 11)
        }
    
        if (value.length > 2) {
            value = '(' + value.substring(0, 2) + ') ' + value.substring(2)
            if (caret > 2) caret += 2
        }
    
        if (value.length > 9) {
            value = value.substring(0, 9) + '-' + value.substring(9)
            if (caret > 9) caret += 1
        }
    
        e.target.value = value
        e.target.selectionStart = caret
        e.target.selectionEnd = caret
        e.target.previousValue = value
    }

    return {CPF, phone}
}