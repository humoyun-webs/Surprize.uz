const uzbekMessages = {
    'string.base': '{#label} satr bo\'lishi kerak.',
    'string.empty': '{#label} maydoni bo\'sh bo\'lmasligi kerak.',
    'string.min': '{#label} kamida {#limit} belgidan iborat bo\'lishi kerak.',
    'string.max': '{#label} ko\'pi bilan {#limit} belgidan iborat bo\'lishi kerak.',
    'string.alphanum': '{#label} faqat harflar va raqamlardan iborat bo\'lishi kerak.',
    'string.email': '{#label} haqiqiy email manzil bo\'lishi kerak.',
    'string.uri': '{#label} to\'g\'ri URI bo\'lishi kerak.',
    'string.regex.base': '{#label} noto\'g\'ri formatda.',
    'string.regex.name': '{#label} {#name} shabloniga mos kelishi kerak.',
    'string.token': '{#label} faqat harflar, raqamlar va pastki chiziqdan iborat bo\'lishi kerak.',
    'string.isoDate': '{#label} ISO 8601 sana formatida bo\'lishi kerak.',
    'string.guid': '{#label} haqiqiy GUID bo\'lishi kerak.',
    
    'number.base': '{#label} raqam bo\'lishi kerak.',
    'number.min': '{#label} qiymati {#limit} dan kam bo\'lmasligi kerak.',
    'number.max': '{#label} qiymati {#limit} dan oshmasligi kerak.',
    'number.greater': '{#label} {#limit} dan katta bo\'lishi kerak.',
    'number.less': '{#label} {#limit} dan kichik bo\'lishi kerak.',
    'number.integer': '{#label} butun son bo\'lishi kerak.',
    'number.positive': '{#label} musbat raqam bo\'lishi kerak.',
    'number.negative': '{#label} manfiy raqam bo\'lishi kerak.',
    'number.precision': '{#label} {#limit} xonali kasr qismga ega bo\'lishi kerak.',
    
    'boolean.base': '{#label} mantiqiy qiymat bo\'lishi kerak (ha yoki yo\'q).',
    
    'array.base': '{#label} massiv bo\'lishi kerak.',
    'array.min': '{#label} kamida {#limit} ta elementdan iborat bo\'lishi kerak.',
    'array.max': '{#label} ko\'pi bilan {#limit} ta elementdan iborat bo\'lishi kerak.',
    'array.includes': '{#label} ro\'yxatida xatolik bor.',
    
    'object.base': '{#label} obyekt bo\'lishi kerak.',
    'object.unknown': '{#label} maydoni ruxsat etilmagan.',
    
    'any.required': '{#label} maydoni majburiy.',
    'any.only': '{#label} faqat {#valids} qiymatlaridan biri bo\'lishi kerak.',
    'any.invalid': '{#label} yaroqsiz qiymatga ega.',
    'any.empty': '{#label} maydoni bo\'sh bo\'lmasligi kerak.',
    
    'date.base': '{#label} sana bo\'lishi kerak.',
    'date.min': '{#label} {#limit} dan keyin bo\'lishi kerak.',
    'date.max': '{#label} {#limit} dan oldin bo\'lishi kerak.',
    'date.iso': '{#label} ISO 8601 formatidagi sana bo\'lishi kerak.',
    
    'binary.base': '{#label} ikkilik (binary) bo\'lishi kerak.',
    'binary.min': '{#label} kamida {#limit} baytdan iborat bo\'lishi kerak.',
    'binary.max': '{#label} ko\'pi bilan {#limit} baytdan iborat bo\'lishi kerak.',
    
    'alternatives.all': '{#label} barcha alternativalar bo\'lishi kerak.',
    'alternatives.any': '{#label} hech bo\'lmaganda bir alternativaga mos kelishi kerak.',
    'alternatives.match': '{#label} mos keladigan alternativani topish mumkin emas.'
}

const russianMessages = {
    'string.base': '{#label} должно быть строкой.',
    'string.empty': 'Поле {#label} не должно быть пустым.',
    'string.min': '{#label} должно содержать не менее {#limit} символов.',
    'string.max': '{#label} должно содержать не более {#limit} символов.',
    'string.alphanum': '{#label} должно содержать только буквы и цифры.',
    'string.email': '{#label} должно быть действительным адресом электронной почты.',
    'string.uri': '{#label} должно быть правильным URI.',
    'string.regex.base': '{#label} имеет неверный формат.',
    'string.regex.name': '{#label} должно соответствовать шаблону {#name}.',
    'string.token': '{#label} должно содержать только буквы, цифры и подчеркивания.',
    'string.isoDate': '{#label} должно быть в формате даты ISO 8601.',
    'string.guid': '{#label} должно быть действительным GUID.',
    
    'number.base': '{#label} должно быть числом.',
    'number.min': '{#label} не должно быть меньше {#limit}.',
    'number.max': '{#label} не должно быть больше {#limit}.',
    'number.greater': '{#label} должно быть больше {#limit}.',
    'number.less': '{#label} должно быть меньше {#limit}.',
    'number.integer': '{#label} должно быть целым числом.',
    'number.positive': '{#label} должно быть положительным числом.',
    'number.negative': '{#label} должно быть отрицательным числом.',
    'number.precision': '{#label} должно содержать не более {#limit} десятичных знаков.',
    
    'boolean.base': '{#label} должно быть логическим значением (да или нет).',
    
    'array.base': '{#label} должно быть массивом.',
    'array.min': '{#label} должно содержать не менее {#limit} элементов.',
    'array.max': '{#label} должно содержать не более {#limit} элементов.',
    'array.includes': 'Массив {#label} содержит ошибки.',
    
    'object.base': '{#label} должно быть объектом.',
    'object.unknown': 'Поле {#label} не разрешено.',
    
    'any.required': 'Поле {#label} является обязательным.',
    'any.only': '{#label} должно быть одним из {#valids}.',
    'any.invalid': '{#label} имеет недопустимое значение.',
    'any.empty': 'Поле {#label} не должно быть пустым.',
    
    'date.base': '{#label} должно быть датой.',
    'date.min': '{#label} должно быть после {#limit}.',
    'date.max': '{#label} должно быть до {#limit}.',
    'date.iso': '{#label} должно быть в формате даты ISO 8601.',
    
    'binary.base': '{#label} должно быть бинарным значением.',
    'binary.min': '{#label} должно содержать не менее {#limit} байт.',
    'binary.max': '{#label} должно содержать не более {#limit} байт.',
    
    'alternatives.all': '{#label} должно соответствовать всем альтернативам.',
    'alternatives.any': '{#label} должно соответствовать хотя бы одной альтернативе.',
    'alternatives.match': 'Не удалось найти соответствие для {#label}.'
};


module.exports = {
    uzbekMessages,
    russianMessages
}