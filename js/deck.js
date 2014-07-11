window.SUITS = {
    DIAMONDS: {
        SYMBOL: '&diams;',
        FULL: 'diamonds',
        FIRST: 'd',
        COLOR: 'red'
    },
    HEARTS: {
        SYMBOL: '&hearts;',
        FULL: 'hearts',
        FIRST: 'h',
        COLOR: 'red'
    },
    CLUBS: {
        SYMBOL: '&clubs;',
        FULL: 'clubs',
        FIRST: 'c',
        COLOR: 'black'
    },
    SPADES: {
        SYMBOL: '&spades;',
        FULL: 'spades',
        FIRST: 's',
        COLOR: 'black'
    },
    getObject: function(suit){
        if(!suit){
            return {};
        }
        suit = suit.toLowerCase();
        if(suit === "d" || suit === "diamond" || suit === "diamonds") {
            return window.SUITS.DIAMONDS;
        } else if(suit === "h" || suit === "heart" ||  suit === "hearts") {
            return window.SUITS.HEARTS;
        } else if(suit === "c" || suit === "club" ||  suit === "clubs") {
            return window.SUITS.CLUBS;
        } else if(suit === "s" || suit === "spade" ||  suit === "spades") {
            return window.SUITS.SPADES;
        }

        return {};
    }
};

window.RANK = {
    JACK: {
        VALUE: 11,
        FULL: 'jack',
        FIRST: 'J'
    },
    QUEEN: {
        VALUE: 12,
        FULL: 'queen',
        FIRST: 'Q'
    },
    KING: {
        VALUE: 13,
        FULL: 'king',
        FIRST: 'K'
    },
    ACE: {
        VALUE: 1,
        FULL: 'ace',
        FIRST: 'A'
    },
    getObject: function(rank){
        if(!rank){
            return {};
        }
        rank = rank.toLowerCase();
        if(rank === "1" || rank === "a" || rank === "ace") {
            return window.RANK.ACE;
        } else if(rank === "11" || rank === "j" || rank === "jack") {
            return window.RANK.JACK;
        } else if(rank === "12" || rank === "q" || rank === "queen") {
            return window.RANK.QUEEN;
        } else if(rank === "13" || rank === "k" || rank === "king") {
            return window.RANK.KING;
        }

        return {
            SYMBOL: rank,
            FULL: rank,
            FIRST: rank,
            COLOR: rank
        };
    }
};

window.xtag.register('x-hand', {
    extends: 'div',
    lifecycle: {
        created: function(){
            this._pile = [{r: 1, s: 's'}, {r: 2, s: 's'}, {r: 3, s: 's'}, {r: 4, s: 's'}, {r: 5, s: 's'}, {r: 6, s: 's'}, {r: 7, s: 's'}, {r: 8, s: 's'}, {r: 9, s: 's'}, {r: 10, s: 's'}, {r: 11, s: 's'}, {r: 12, s: 's'}, {r: 13, s: 's'},
                        {r: 1, s: 'c'}, {r: 2, s: 'c'}, {r: 3, s: 'c'}, {r: 4, s: 'c'}, {r: 5, s: 'c'}, {r: 6, s: 'c'}, {r: 7, s: 'c'}, {r: 8, s: 'c'}, {r: 9, s: 'c'}, {r: 10, s: 'c'}, {r: 11, s: 'c'}, {r: 12, s: 'c'}, {r: 13, s: 'c'},
                        {r: 1, s: 'd'}, {r: 2, s: 'd'}, {r: 3, s: 'd'}, {r: 4, s: 'd'}, {r: 5, s: 'd'}, {r: 6, s: 'd'}, {r: 7, s: 'd'}, {r: 8, s: 'd'}, {r: 9, s: 'd'}, {r: 10, s: 'd'}, {r: 11, s: 'd'}, {r: 12, s: 'd'}, {r: 13, s: 'd'},
                        {r: 1, s: 'h'}, {r: 2, s: 'h'}, {r: 3, s: 'h'}, {r: 4, s: 'h'}, {r: 5, s: 'h'}, {r: 6, s: 'h'}, {r: 7, s: 'h'}, {r: 8, s: 'h'}, {r: 9, s: 'h'}, {r: 10, s: 'h'}, {r: 11, s: 'h'}, {r: 12, s: 'h'}, {r: 13, s: 'h'},
                        {r: -1}, {r: -1}];//{r: -1} stands for jokers
            this._init();
        }
    },
    methods: {
        _init: function(){
            if(this.hasAttribute("min") && this.hasAttribute("max") && this.hasAttribute("suit")) {
                this.addSeries(this.getAttribute("min"), this.getAttribute("max"), this.getAttribute("suit"), this._isFaceUp());
            } else if(this.hasAttribute("rank") && this.hasAttribute("suits")) {
                this.addPair(this.getAttribute("rank"), this.getAttribute("suits").split(''), this._isFaceUp());
            } else if(this.hasAttribute("random")){
                for(var i = 0 ; i < this.getAttribute("random") ; i++) {
                    this.addRandomCard();
                }
            }
        },
        _generateCardString: function(rank, suit, faceup){
            return '<x-card suit="'+suit+'" rank="'+rank+'" faceup="'+faceup+'"></x-card>\n';
        },
        _addCards: function(cards){
            var cardsString = '';

            cards.forEach(function(card){
                cardsString += this._generateCardString(card.rank, card.suit, card.faceup);
            }.bind(this));

            this.innerHTML = cardsString;
        },
        /**
         * Add a series of cards with same suit (e.g. 4d,5d,6d,7d)
         *
         * @param min
         * @param max
         * @param suit
         * @param faceup
         */
        addSeries: function(min, max, suit, faceup){
            min = parseInt(min);
            max = parseInt(max);
            if(min > max) {
                return;
            }

            var cards = [];
            for(var i = min ; i <= max ; i++){
                cards.push({rank: i, suit: suit, faceup: faceup});
            }
            this._addCards(cards);
        },
        /**
         * Add a 2 to 4 cards with the same rank (e.g. 4h,4s,4d)
         *
         * @param rank
         * @param suits
         * @param faceup
         */
        addPair: function(rank, suits, faceup){
            var cards = [];
            for(var i = 0 ; i < suits.length ; i++){
                cards.push({rank: rank, suit: suits[i], faceup: faceup});
            }

            this._addCards(cards);
        },
        /**
         * Add a random card from the remaining pile
         */
        addRandomCard: function(){
            var min = 0,
                max = this._pile.length - 1,
                i, card;

            if(this._pile.length <= 0) {
                return;
            }

            i = Math.floor((Math.random() * max ) + min);

            card = this._pile.splice(i, 1)[0];

            if(card.r === -1) {
                this.addJoker(this._isFaceUp());
            } else {
                this.addCard(card.r, card.s, this._isFaceUp());
            }
        },
        /**
         * Shuffles given array of nodes, and returns them inside a DocumentFragment to reduce render time
         *
         * @param nodes
         * @returns {DocumentFragment}
         * @private
         */
        _shuffleNodes: function(nodes){
            var copyOfNodes = [],
                shuffledNodes = document.createDocumentFragment(),
                randomIndex;

            for(var i = 0 ; i < nodes.length ; i++){
                copyOfNodes.push(nodes[i]);
            }

            while(copyOfNodes.length > 0){
                randomIndex = Math.floor(Math.random() * copyOfNodes.length);
                shuffledNodes.appendChild(copyOfNodes[randomIndex]);
                copyOfNodes.splice(randomIndex, 1);
            }

            return shuffledNodes;
        },
        _isFaceUp: function(){
            return !this.hasAttribute("faceup") || this.getAttribute("faceup") === "true";
        },
        _isFaceDown: function(){
            return !this._isFaceUp();
        },
        shuffle: function(){
            this.appendChild(this._shuffleNodes(this.children));
        },
        addJoker: function(faceup){
            this.innerHTML += '<x-card joker="true" faceup="'+faceup+'"></x-card>\n';
        },
        addCard: function(rank, suit, faceup){
            this.innerHTML += this._generateCardString(rank, suit, faceup);
        }
    }
});

window.xtag.register('x-card', {
    extends: 'span',
    lifecycle: {
        created: function () {
            if (!this.onclick) {
                this.onclick = this.flip;
            }
            this._init();
        },
        attributeChanged: function () {
            this._init();
        }
    },
    methods: {
        _init: function () {
            if ((!this.hasAttribute("rank") || !this.hasAttribute("suit")) && !this.hasAttribute("joker")) {
                return;
            }
            this._addClass("bold");
            this._setRank();
            this._setSuit();

            if (this._isFaceDown()) {
                this._initFaceDown();
            } else if (this._isJoker()) {
                this._initAsJoker();
            } else {
                this._initAsNormal();
            }
        },
        _setRank: function(){
            var rawRank = this.getAttribute("rank");
            this._rank = window.RANK.getObject(rawRank);
        },
        _setSuit: function(){
            var rawSuit = this.getAttribute("suit");
            this._suit = window.SUITS.getObject(rawSuit);
        },
        _initFaceDown: function(){
            this.innerHTML = "&ensp;&ensp;";
            this._addClass("back");
            this.title = "";
        },
        _initAsJoker: function(){
            this.innerHTML = "<span class=\"red\">&iquest;</span>?";
            this.title = "Joker";
            this._removeClass("back");
        },
        _initAsNormal: function(){
            this._removeClass("back");
            this.innerHTML = this._rank.FIRST + this._suit.SYMBOL;
            this.title = this._rank.FULL + " of " + this._suit.FULL;
            if (this._suit.COLOR === "red") {
                this._addClass("red");
            }
        },
        _addClass: function (className) {
            if (this._hasClass(className)) {
                return;
            }

            this.className = this.className + ' ' + className;
        },
        _removeClass: function (className) {
            if (!this._hasClass(className)) {
                return;
            }

            this.className = this.className.replace(className, '');
        },
        _hasClass: function (className) {
            return this.className.indexOf(className) > -1;
        },
        _isJoker: function () {
            return this.getAttribute("joker") === "true";
        },
        _isFaceUp: function(){
            return !this.hasAttribute("faceup") || this.getAttribute("faceup") === "true";
        },
        _isFaceDown: function(){
            return !this._isFaceUp();
        },
        hide: function () {
            this.setAttribute("faceup", "false");
        },
        show: function () {
            this.setAttribute("faceup", "true");
        },
        flip: function () {
            if (this._hasClass("back")) {
                this.show();
            } else {
                this.hide();
            }
        }
    }
});