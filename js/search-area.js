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

    searchInput.addEventListener('keyup', function() {
        Autocomplete.searchWord(this.value, updateResults);
    });

    clearHistoryLink.addEventListener('click', function() {
        // Clear the history list
        historyList.innerHTML = '';
    });

    function updateResults(wordList, inputWord) {
        updateAutocompleteResults(wordList, inputWord);
    }

    function updateAutocompleteResults(wordList, inputWord) {
        // Clear data from the autocomplete lists and show if there are items in the wordList-property
        searchResultsContainer.innerHTML = '';
        searchResultsWrapper.classList.toggle('search-area__autocomplete-results--active', wordList.length > 0);

        for (var index in wordList) {
            var word = wordList[index].word;

            // Create the list item element
            var dummyListItem = document.createElement('li');
            dummyListItem.classList = 'search-area__autocomplete-results__results-list__item';

            // Create the highlight span for the list item
            var dummyListItemHightlightSpan = document.createElement('span');
            dummyListItemHightlightSpan.classList = 'search-area__autocomplete-results__results-list__item__highlighted';
            dummyListItemHightlightSpan.innerText = inputWord;

            var dummyListItemLink = document.createElement('a');
            dummyListItemLink.href = '#';

            // Sanitize the string that goes into innerHTML to prevent XSS or disruptive HTML
            var sanitizedWord = dummyListItemHightlightSpan.innerText;
            var wordWithSplit = word.replace(sanitizedWord, dummyListItemHightlightSpan.outerHTML);
            dummyListItemLink.innerHTML = wordWithSplit;

            dummyListItemLink.addEventListener('click', function() {
                updateHistory(this.innerText);
            });

            dummyListItem.appendChild(dummyListItemLink);

            searchResultsContainer.appendChild(dummyListItem);
        }
    }

    function updateHistory(inputWord) {
        if (inputWord.length) {
            var timestamp = Helper.formattedTimestamp();

            // Create history list item element
            var historyChildItem = document.createElement('li');
            historyChildItem.classList = 'search-area__history__list__item';
    
            // Create the timestamp span for the list item
            var historyChildTimestampSpan = document.createElement('span');
            historyChildTimestampSpan.classList = 'search-area__history__list__item__timestamp';
            historyChildTimestampSpan.innerText = timestamp;
    
            // Create the removal link for the list item
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