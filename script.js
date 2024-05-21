// document.addEventListener('DOMContentLoaded', function() {
//     const languageLinks = document.querySelectorAll('.dropdown-content a');
//     languageLinks.forEach(link => {
//         link.addEventListener('click', function(event) {
//             event.preventDefault();
//             loadTranslations(this.getAttribute('data-lang'));
//         });
//     });

    loadTranslations('en'); // Default language

    document.getElementById('translation-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const text = document.getElementById('text').value;
        const language = document.getElementById('language').value;
        const grade = document.getElementById('grade').value;

        const brailleText = translateToBraille(text, language, grade);
        const brailleOutputContainer = document.getElementById('braille-output-container');
        const brailleOutput = document.getElementById('braille-output');

        if (brailleText) {
            brailleOutput.innerText = brailleText;
            brailleOutputContainer.style.display = 'block';
        } else {
            brailleOutputContainer.style.display = 'none';
        }
    });
});

function loadTranslations(language) {
    fetch(`/locales/${language}/translation.json`)
        .then(response => response.json())
        .then(translations => {
            document.querySelectorAll('[data-translate]').forEach(element => {
                const key = element.getAttribute('data-translate');
                element.innerText = translations[key];
            });
        });
}

    document.querySelectorAll('.braille-key').forEach(button => {
        button.addEventListener('click', function() {
            const brailleChar = this.getAttribute('data-braille');
            const brailleInput = document.getElementById('braille-input');
            brailleInput.value += brailleChar;
        });
    });

    document.getElementById('download-button').addEventListener('click', function() {
        const brailleOutput = document.getElementById('braille-output').innerText;
        downloadBrailleAsImage(brailleOutput);
    });


function loadTranslations(language) {
    fetch(`/locales/${language}/translation.json`)
        .then(response => response.json())
        .then(translations => {
            document.querySelectorAll('[data-translate]').forEach(element => {
                const key = element.getAttribute('data-translate');
                element.innerText = translations[key];
            });
        });
}

function translateToBraille(text, language, grade) {
    const brailleAlphabets = {
        english: {
            'a': '⠁', 'b': '⠃', 'c': '⠉', 'd': '⠙', 'e': '⠑',
            'f': '⠋', 'g': '⠛', 'h': '⠓', 'i': '⠊', 'j': '⠚',
            'k': '⠅', 'l': '⠇', 'm': '⠍', 'n': '⠝', 'o': '⠕',
            'p': '⠏', 'q': '⠟', 'r': '⠗', 's': '⠎', 't': '⠞',
            'u': '⠥', 'v': '⠧', 'w': '⠺', 'x': '⠭', 'y': '⠽', 'z': '⠵'
        },
        arabic: {
            'ا': '⠁', 'ب': '⠃', 'ت': '⠞', 'ث': '⠹', 'ج': '⠚',
            'ح': '⠱', 'خ': '⠭', 'د': '⠙', 'ذ': '⠫', 'ر': '⠗',
            'ز': '⠵', 'س': '⠎', 'ش': '⠱', 'ص': '⠵', 'ض': '⠹',
            'ط': '⠾', 'ظ': '⠽', 'ع': '⠵', 'غ': '⠺', 'ف': '⠋',
            'ق': '⠟', 'ك': '⠅', 'ل': '⠇', 'م': '⠍', 'ن': '⠝',
            'ه': '⠓', 'و': '⠺', 'ي': '⠊'
        },
        german: {
            'a': '⠁', 'ä': '⠜', 'b': '⠃', 'c': '⠉', 'd': '⠙',
            'e': '⠑', 'f': '⠋', 'g': '⠛', 'h': '⠓', 'i': '⠊',
            'j': '⠚', 'k': '⠅', 'l': '⠇', 'm': '⠍', 'n': '⠝',
            'o': '⠕', 'ö': '⠪', 'p': '⠏', 'q': '⠟', 'r': '⠗',
            's': '⠎', 'ß': '⠌', 't': '⠞', 'u': '⠥', 'ü': '⠳',
            'v': '⠧', 'w': '⠺', 'x': '⠭', 'y': '⠽', 'z': '⠵'
        },
        french: {
            'a': '⠁', 'b': '⠃', 'c': '⠉', 'd': '⠙', 'e': '⠑',
            'f': '⠋', 'g': '⠛', 'h': '⠓', 'i': '⠊', 'j': '⠚',
            'k': '⠅', 'l': '⠇', 'm': '⠍', 'n': '⠝', 'o': '⠕',
            'p': '⠏', 'q': '⠟', 'r': '⠗', 's': '⠎', 't': '⠞',
            'u': '⠥', 'v': '⠧', 'w': '⠺', 'x': '⠭', 'y': '⠽', 'z': '⠵',
            'é': '⠿', 'è': '⠮', 'ê': '⠿⠮', 'à': '⠜', 'ç': '⠯'
        },
        hebrew: {
            'א': '⠁', 'ב': '⠃', 'ג': '⠛', 'ד': '⠙', 'ה': '⠓',
            'ו': '⠺', 'ז': '⠵', 'ח': '⠳', 'ט': '⠞', 'י': '⠊',
            'כ': '⠅', 'ל': '⠇', 'מ': '⠍', 'נ': '⠝', 'ס': '⠎',
            'ע': '⠫', 'פ': '⠏', 'צ': '⠮', 'ק': '⠟', 'ר': '⠗',
            'ש': '⠩', 'ת': '⠹'
        },
        russian: {
            'а': '⠁', 'б': '⠃', 'в': '⠺', 'г': '⠛', 'д': '⠙',
            'е': '⠑', 'ё': '⠮', 'ж': '⠚', 'з': '⠵', 'и': '⠊',
            'й': '⠯', 'к': '⠅', 'л': '⠇', 'м': '⠍', 'н': '⠝',
            'о': '⠕', 'п': '⠏', 'р': '⠗', 'с': '⠎', 'т': '⠞',
            'у': '⠥', 'ф': '⠋', 'х': '⠓', 'ц': '⠉', 'ч': '⠭',
            'ш': '⠱', 'щ': '⠮', 'ъ': '⠮', 'ы': '⠩', 'ь': '⠮',
            'э': '⠿', 'ю': '⠡', 'я': '⠚'
        },
        chinese: {
            '一': '⠂', '丁': '⠔', '七': '⠒', '丈': '⠤', '三': '⠰', 
            '上': '⠴', '下': '⠜', '不': '⠸', '与': '⠪', '丐': '⠸',
            '丑': '⠸', '专': '⠸', '且': '⠸', '丕': '⠸', '世': '⠸',
            '丘': '⠸', '丙': '⠸', '业': '⠸', '丛': '⠸', '东': '⠸',
            '丝': '⠸', '丞': '⠸', '丢': '⠸', '两': '⠸', '严': '⠸',
            '並': '⠸', '丧': '⠸', '丨': '⠸', '个': '⠸', '中': '⠉',
            '丰': '⠸', '丱': '⠸', '临': '⠸', '丸': '⠸', '丹': '⠸',
            '主': '⠸', '丽': '⠸', '举': '⠸', '乃': '⠸', '久': '⠸',
            '么': '⠸', '义': '⠸', '之': '⠸', '乌': '⠸', '乍': '⠸',
            '乎': '⠸', '乏': '⠸', '乐': '⠸', '乒': '⠸', '乓': '⠸',
            '乔': '⠸', '乖': '⠸', '乘': '⠸', '乙': '⠸', '乜': '⠸',
            '九': '⠸', '乞': '⠸', '也': '⠸', '习': '⠸', '乡': '⠸',
            '书': '⠸', '买': '⠸', '乱': '⠸', '乳': '⠸', '乾': '⠸',
            '了': '⠸', '予': '⠸', '争': '⠸', '事': '⠸', '二': '⠸'
            // Note: Chinese Braille is complex, covering a significant portion is beyond the scope
        },
        japanese: {
            'あ': '⠁', 'い': '⠃', 'う': '⠉', 'え': '⠙', 'お': '⠑',
            'か': '⠋', 'き': '⠛', 'く': '⠓', 'け': '⠊', 'こ': '⠚',
            'さ': '⠇', 'し': '⠍', 'す': '⠝', 'せ': '⠕', 'そ': '⠏',
            'た': '⠟', 'ち': '⠗', 'つ': '⠎', 'て': '⠞', 'と': '⠥',
            'な': '⠧', 'に': '⠭', 'ぬ': '⠹', 'ね': '⠷', 'の': '⠱',
            'は': '⠪', 'ひ': '⠫', 'ふ': '⠺', 'へ': '⠺', 'ほ': '⠥',
            'ま': '⠿', 'み': '⠞', 'む': '⠧', 'め': '⠜', 'も': '⠗',
            'や': '⠥', 'ゆ': '⠩', 'よ': '⠱', 'ら': '⠿', 'り': '⠎',
            'る': '⠯', 'れ': '⠬', 'ろ': '⠳', 'わ': '⠽', 'を': '⠬',
            'ん': '⠷'
        },
        bengali: {
            'অ': '⠁', 'আ': '⠃', 'ই': '⠊', 'ঈ': '⠛', 'উ': '⠉',
            'ঊ': '⠍', 'ঋ': '⠗', 'এ': '⠑', 'ঐ': '⠕', 'ও': '⠓',
            'ঔ': '⠞', 'ক': '⠅', 'খ': '⠓', 'গ': '⠛', 'ঘ': '⠯',
            'ঙ': '⠇', 'চ': '⠵', 'ছ': '⠺', 'জ': '⠚', 'ঝ': '⠭',
            'ঞ': '⠝', 'ট': '⠾', 'ঠ': '⠹', 'ড': '⠜', 'ঢ': '⠕',
            'ণ': '⠏', 'ত': '⠟', 'থ': '⠡', 'দ': '⠇', 'ধ': '⠳',
            'ন': '⠝', 'প': '⠏', 'ফ': '⠋', 'ব': '⠃', 'ভ': '⠫',
            'ম': '⠍', 'য': '⠫', 'র': '⠗', 'ল': '⠇', 'শ': '⠱',
            'ষ': '⠇', 'স': '⠎', 'হ': '⠓'
        },
        hindi: {
            'अ': '⠁', 'आ': '⠃', 'इ': '⠊', 'ई': '⠛', 'उ': '⠉',
            'ऊ': '⠍', 'ऋ': '⠗', 'ए': '⠑', 'ऐ': '⠕', 'ओ': '⠓',
            'औ': '⠞', 'क': '⠅', 'ख': '⠓', 'ग': '⠛', 'घ': '⠯',
            'ङ': '⠇', 'च': '⠵', 'छ': '⠺', 'ज': '⠚', 'झ': '⠭',
            'ञ': '⠝', 'ट': '⠾', 'ठ': '⠹', 'ड': '⠜', 'ढ': '⠕',
            'ण': '⠏', 'त': '⠟', 'थ': '⠡', 'द': '⠇', 'ध': '⠳',
            'न': '⠝', 'प': '⠏', 'फ': '⠋', 'ब': '⠃', 'भ': '⠫',
            'म': '⠍', 'य': '⠽', 'र': '⠗', 'ल': '⠇', 'व': '⠧',
            'श': '⠱', 'ष': '⠇', 'स': '⠎', 'ह': '⠓'
        },
        spanish: {
            'a': '⠁', 'b': '⠃', 'c': '⠉', 'd': '⠙', 'e': '⠑',
            'f': '⠋', 'g': '⠛', 'h': '⠓', 'i': '⠊', 'j': '⠚',
            'k': '⠅', 'l': '⠇', 'm': '⠍', 'n': '⠝', 'o': '⠕',
            'p': '⠏', 'q': '⠟', 'r': '⠗', 's': '⠎', 't': '⠞',
            'u': '⠥', 'v': '⠧', 'w': '⠺', 'x': '⠭', 'y': '⠽', 'z': '⠵',
            'á': '⠷', 'é': '⠮', 'í': '⠜', 'ó': '⠹', 'ú': '⠻', 'ñ': '⠻'
        },
        portuguese: {
            'a': '⠁', 'á': '⠷', 'ã': '⠹', 'â': '⠪', 'b': '⠃', 'c': '⠉', 'd': '⠙', 'e': '⠑',
            'é': '⠮', 'ê': '⠪', 'f': '⠋', 'g': '⠛', 'h': '⠓', 'i': '⠊', 'í': '⠜', 'j': '⠚',
            'k': '⠅', 'l': '⠇', 'm': '⠍', 'n': '⠝', 'o': '⠕', 'ó': '⠹', 'õ': '⠺', 'ô': '⠪',
            'p': '⠏', 'q': '⠟', 'r': '⠗', 's': '⠎', 't': '⠞', 'u': '⠥', 'v': '⠧', 'w': '⠺',
            'x': '⠭', 'y': '⠽', 'z': '⠵'
        }
    };

    const grade2Contractions = {
        english: {
            'and': '⠯', 'for': '⠿', 'the': '⠮', 'with': '⠺', 'of': '⠷', 'to': '⠞'
        },
        // Add other language contractions here
    };

    text = text.toLowerCase();
    let brailleText = '';

    if (grade === 'grade2' && grade2Contractions[language]) {
        const contractions = grade2Contractions[language];
        for (let word of text.split(' ')) {
            if (contractions[word]) {
                brailleText += contractions[word] + ' ';
            } else {
                for (let char of word) {
                    brailleText += brailleAlphabets[language][char] || char;
                }
                brailleText += ' ';
            }
        }
    } else {
        for (let char of text) {
            brailleText += brailleAlphabets[language][char] || char;
        }
    }

    return brailleText.trim();
}

function translateToText(braille) {
    const textAlphabets = {
        english: {
            '⠁': 'a', '⠃': 'b', '⠉': 'c', '⠙': 'd', '⠑': 'e',
            '⠋': 'f', '⠛': 'g', '⠓': 'h', '⠊': 'i', '⠚': 'j',
            '⠅': 'k', '⠇': 'l', '⠍': 'm', '⠝': 'n', '⠕': 'o',
            '⠏': 'p', '⠟': 'q', '⠗': 'r', '⠎': 's', '⠞': 't',
            '⠥': 'u', '⠧': 'v', '⠺': 'w', '⠭': 'x', '⠽': 'y', '⠵': 'z'
        },
        // Add reverse mappings for other languages here
    };

    const grade2ContractionsReverse = {
        english: {
            '⠯': 'and', '⠿': 'for', '⠮': 'the', '⠺': 'with', '⠷': 'of', '⠞': 'to'
        },
        // Add other language contractions here
    };

    let text = '';

    const words = braille.split(' ');
    for (let word of words) {
        if (grade2ContractionsReverse['english'][word]) {
            text += grade2ContractionsReverse['english'][word] + ' ';
        } else {
            for (let char of word) {
                text += textAlphabets['english'][char] || char;
            }
            text += ' ';
        }
    }

    return text.trim();
}

function downloadBrailleAsImage(brailleText) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    context.font = '20px Arial';
    const width = context.measureText(brailleText).width;
    const height = 30; // Adjust as needed

    canvas.width = width;
    canvas.height = height;

    context.font = '20px Arial';
    context.fillStyle = '#000';
    context.fillText(brailleText, 0, 20);

    const link = document.createElement('a');
    link.href = canvas.toDataURL();
    link.download = 'braille.png';
    link.click();
}

document.addEventListener('DOMContentLoaded', function() {
    // Static numbers for the math quiz
    const num1 = 5;
    const num2 = 3;

    // Validate form submission
    document.getElementById('contact-form').addEventListener('submit', function(event) {
        const userAnswer = parseInt(document.getElementById('math-quiz').value, 10);
        if (userAnswer !== num1 + num2) {
            event.preventDefault();
            alert('Incorrect answer to the math quiz. Please try again.');
        }
    });
});
