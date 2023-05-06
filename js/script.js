const inputElement = document.querySelector('#password')
const upperCaseCheckElement = document.querySelector('#uppercase-check')
const numberCheckElement = document.querySelector('#number-check')
const symbolCheckElement = document.querySelector('#symbol-check')
const securityIndicatorBarElement = document.querySelector('#security-indicator-bar')


let passwordLength = 16

function generatePassword() {
    let chars = 'abcdefghijklmnopqrstuwvxyz'
    
    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUWVXYZ'
    const numberChars = '123456789' 
    const symbolChars = '?!@&*()[]' 
    
    if(upperCaseCheckElement.checked){   
        chars += upperCaseChars
    }

    if(numberCheckElement.checked){   
        chars += numberChars
        
    }
    if(symbolCheckElement.checked){   
        chars += symbolChars
    }

    
    let password = ''

    for (let i = 0; i < passwordLength; i++) {
        const randomNumber = Math.floor(Math.random() * chars.length)
        password += chars.substring(randomNumber, randomNumber +1)
        
    }

    inputElement.value = password
    calculateQuality()
    calculateFontSize()

}

function calculateQuality() {
    // 20% -> critico | 100 -> safe

    const percent = Math.round((passwordLength / 50) * 35 +
    (upperCaseCheckElement.checked ? 15 : 0) +
    (numberCheckElement.checked ? 20 : 0) +
    (symbolCheckElement.checked ? 30 : 0)
    
    )

    securityIndicatorBarElement.style.width = `${percent}%`
    
    if(percent > 69){
        // safe
        securityIndicatorBarElement.classList.remove('critical')
        securityIndicatorBarElement.classList.remove('warning')
        securityIndicatorBarElement.classList.add('safe')

    }else if(percent >= 50){
        // warning
        securityIndicatorBarElement.classList.remove('critical')
        securityIndicatorBarElement.classList.remove('safe')
        securityIndicatorBarElement.classList.add('warning')
    }else{
        // critical
        securityIndicatorBarElement.classList.remove('warning')
        securityIndicatorBarElement.classList.remove('safe')
        securityIndicatorBarElement.classList.add('critical')
    }

    if (percent >= 100){
        securityIndicatorBarElement.classList.add('completed')
    } else {
        securityIndicatorBarElement.classList.remove('completed')

    }
}


function calculateFontSize() {
    if (passwordLength > 40){
        inputElement.classList.remove('font-sm')
        inputElement.classList.remove('font-xs')
        inputElement.classList.add('font-xxs')
    }else if (passwordLength > 30){
        inputElement.classList.remove('font-sm')
        inputElement.classList.remove('font-xxs')
        inputElement.classList.add('font-xs')
    }else if (passwordLength > 22){
        inputElement.classList.remove('font-xxs')
        inputElement.classList.remove('font-xs')
        inputElement.classList.add('font-sm')
    }else  {
        inputElement.classList.remove('font-sm')
        inputElement.classList.remove('font-xs')
        inputElement.classList.remove('font-xxs')
    }
}


function copy () {
    navigator.clipboard.writeText(inputElement.value)
    
}


const passwordLenghtElement = document.querySelector('#password-length')
passwordLenghtElement.addEventListener('input', function () {
    passwordLength = passwordLenghtElement.value
    document.querySelector('#password-length-text').innerText = passwordLength
    generatePassword()   
} )

upperCaseCheckElement.addEventListener('click', generatePassword)
numberCheckElement.addEventListener('click', generatePassword)
symbolCheckElement.addEventListener('click', generatePassword)

document.querySelector('#copy-1').addEventListener('click', copy)
document.querySelector('#copy-2').addEventListener('click', copy)
document.querySelector('#renew').addEventListener('click', generatePassword)
generatePassword()