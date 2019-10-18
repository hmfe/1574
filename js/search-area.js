(function() {
    var searchInput = document.querySelector('.search-area__input-wrapper__input'),
        searchResultsContainer = document.querySelector('.search-area__autocomplete-results__results-list'),
        searchResultsWrapper = document.querySelector('.search-area__autocomplete-results'),
        historyList = document.querySelector('.search-area__history__list'),
        clearHistoryLink = document.querySelector('.search-area__history__clear-history'),
        searchAreaClearButton = document.querySelector('.search-area__input-wrapper__clear-button');

    searchAreaClearButton.addEventListener('click', function() {
        searchInput.value = '';
        updateAutocompleteResults([], '');
        searchInput.focus();
    });

    searchInput.addEventListener('keyup', function(event) {
        Autocomplete.searchWord(this.value, updateResults);
    });

    clearHistoryLink.addEventListener('click', function() {
        historyList.innerHTML = '';
    });

    function updateResults(wordList, inputWord) {
        updateAutocompleteResults(wordList, inputWord);
    }

    function updateAutocompleteResults(wordList, inputWord) {
        searchResultsContainer.innerHTML = '';
        searchResultsWrapper.classList.toggle('search-area__autocomplete-results--active', wordList.length > 0);

        for (var index in wordList) {
            var word = wordList[index].word;

            var dummyListItem = document.createElement('li');
            dummyListItem.classList = 'search-area__autocomplete-results__results-list__item';

            var dummyListItemHightlightSpan = document.createElement('span');
            dummyListItemHightlightSpan.classList = 'search-area__autocomplete-results__results-list__item__highlighted';
            dummyListItemHightlightSpan.innerText = inputWord;

            var sanitizedWord = dummyListItemHightlightSpan.innerText;

            var wordWithSplit = word.replace(sanitizedWord, dummyListItemHightlightSpan.outerHTML);
            dummyListItem.innerHTML = wordWithSplit;

            dummyListItem.addEventListener('click', function() {
                updateHistory(this.innerText);
            });

            searchResultsContainer.appendChild(dummyListItem);
        }
    }

    function updateHistory(inputWord) {
        if (inputWord.length) {
            var timestamp = Helper.formattedTimestamp();
            var historyChildItem = document.createElement('li');
            historyChildItem.classList = 'search-area__history__list__item';
    
            var historyChildTimestampSpan = document.createElement('span');
            historyChildTimestampSpan.classList = 'search-area__history__list__item__timestamp';
            historyChildTimestampSpan.innerText = timestamp;
    
            var historyChildRemoveLink = document.createElement('a');
            historyChildRemoveLink.classList = 'search-area__history__list__item__remove';
            historyChildRemoveLink.innerText = '🞩';
            historyChildRemoveLink.href = '#';
            historyChildRemoveLink.addEventListener('click', function() {
                this.parentElement.remove();
            });
    
            historyChildItem.innerText = inputWord;
            historyChildItem.appendChild(historyChildRemoveLink);
            historyChildItem.appendChild(historyChildTimestampSpan);
    
            historyList.appendChild(historyChildItem);
        }
    }
})();