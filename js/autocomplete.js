var Autocomplete = (function() {
    var searchTimeoutId = null,
        SEARCH_TIMEOUT_MS = 400,
        MAX_HITS = 10,
        endpoint = 'https://api.datamuse.com/sug?s={word}&max=' + MAX_HITS;


    function searchWord(word, completeCallback) {
        if (searchTimeoutId) {
            clearTimeout(searchTimeoutId);
        }

        // Prevent the server from being overloaded with requests, so wait for SEARCH_TIMEOUT_MS ms to make sure
        // no more input is given. Restart the timeout every time a new request is made.
        searchTimeoutId = setTimeout(async function() {
            var wordList = [];

            // Sanitize input to prevent query string manipulation
            word = word.replace(/[^a-zA-Z ]/g, '');

            if (word) {
                var updatedEndpoint = endpoint.replace('{word}', word);
                try {
                    wordList = await fetch(updatedEndpoint).then(async function(response) {
                        return await response.json();
                    });
                } catch (e) {
                    console.error('An error occurred', e);
                    alert('An error occurred. Try again.');
                }
            }

            completeCallback(wordList, word);

        }, SEARCH_TIMEOUT_MS);
    }

    return {
        searchWord: searchWord
    }
})();