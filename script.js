const englishWords = document.getElementById('englishWords');
const translations = document.getElementById('translations');
const learnedWords = document.getElementById('learnedWords');
const englishWordInput = document.getElementById('englishWord');
const translationInput = document.getElementById('translation');
const addWordButton = document.getElementById('addWord');
const showEnglishButton = document.getElementById('showEnglish');
const showTranslationButton = document.getElementById('showTranslation');
const showLearnedButton = document.getElementById('showLearned');
const englishList = document.getElementById('englishList');
const translationList = document.getElementById('translationList');
const learnedList = document.getElementById('learnedList');

function saveWords() {
    try {
        localStorage.setItem('englishWords', englishWords.innerHTML);
        localStorage.setItem('translations', translations.innerHTML);
        localStorage.setItem('learnedWords', learnedWords.innerHTML);
    } catch (error) {
        console.error('Помилка збереження слів:', error);
    }
}

function loadWords() {
    try {
        if (localStorage.getItem('englishWords')) {
            englishWords.innerHTML = localStorage.getItem('englishWords');
        }
        if (localStorage.getItem('translations')) {
            translations.innerHTML = localStorage.getItem('translations');
        }
        if (localStorage.getItem('learnedWords')) {
            learnedWords.innerHTML = localStorage.getItem('learnedWords');
        }
    } catch (error) {
        console.error('Помилка завантаження слів:', error);
    }
}

loadWords();

addWordButton.addEventListener('click', () => {
    try {
        const englishWord = englishWordInput.value;
        const translation = translationInput.value;

        if (englishWord && translation) {
            const newEnglishItem = document.createElement('li');
            newEnglishItem.textContent = englishWord;

            const englishButtons = document.createElement('div');
            const learnButton = document.createElement('button');
            learnButton.textContent = 'Вивчено';
            learnButton.classList.add('learnButton');
            learnButton.dataset.word = englishWord;
            englishButtons.appendChild(learnButton);

            const deleteButtonEnglish = document.createElement('button');
            deleteButtonEnglish.textContent = 'Видалити';
            deleteButtonEnglish.classList.add('deleteButton');
            deleteButtonEnglish.dataset.word = englishWord;
            englishButtons.appendChild(deleteButtonEnglish);

            const speakButton = document.createElement('button');
            speakButton.textContent = 'Озвучити';
            speakButton.classList.add('speakButton');
            speakButton.dataset.word = englishWord;
            englishButtons.appendChild(speakButton);

            newEnglishItem.appendChild(englishButtons);
            englishWords.appendChild(newEnglishItem);

            const newTranslationItem = document.createElement('li');
            newTranslationItem.textContent = translation;

            const deleteButtonTranslation = document.createElement('button');
            deleteButtonTranslation.textContent = 'Видалити';
            deleteButtonTranslation.classList.add('deleteButton');
            deleteButtonTranslation.dataset.word = translation;
            newTranslationItem.appendChild(deleteButtonTranslation);

            translations.appendChild(newTranslationItem);

            englishWordInput.value = '';
            translationInput.value = '';

            saveWords();
        }
    } catch (error) {
        console.error('Помилка додавання слова:', error);
    }
});

englishWords.addEventListener('click', (event) => {
    try {
        if (event.target.classList.contains('learnButton')) {
            const word = event.target.dataset.word;
            const listItem = event.target.parentElement.parentElement;
            learnedWords.appendChild(listItem);
            event.target.parentElement.remove();
            saveWords();
        } else if (event.target.classList.contains('deleteButton')) {
            const word = event.target.dataset.word;
            const listItem = event.target.parentElement.parentElement;
            listItem.remove();
            saveWords();
        } else if (event.target.classList.contains('speakButton')) {
            const word = event.target.dataset.word;
            const utterance = new SpeechSynthesisUtterance(word);
            speechSynthesis.speak(utterance);
        }
    } catch (error) {
        console.error('Помилка обробки подій англійських слів:', error);
    }
});

translations.addEventListener('click', (event) => {
    try {
        if (event.target.classList.contains('deleteButton')) {
            const word = event.target.dataset.word;
            const listItem = event.target.parentElement;
            listItem.remove();
            saveWords();
        }
    } catch (error) {
        console.error('Помилка обробки подій перекладів:', error);
    }
});

showEnglishButton.addEventListener('click', () => {
    try {
        englishList.style.display = englishList.style.display === 'none' ? 'block' : 'none';
    } catch (error) {
        console.error('Помилка показу/приховування англійських слів:', error);
    }
});

showTranslationButton.addEventListener('click', () => {
    try {
        translationList.style.display = translationList.style.display === 'none' ? 'block' : 'none';
    } catch (error) {
        console.error('Помилка показу/приховування перекладів:', error);
    }
});

showLearnedButton.addEventListener('click', () => {
    try {
        learnedList.style.display = learnedList.style.display === 'none' ? 'block' : 'none';
    } catch (error) {
        console.error('Помилка показу/приховування вивчених слів:', error);
    }
});

window.onerror = function (message, source, lineno, colno, error) {
    console.error('Помилка JavaScript:', message);
    return true;
};