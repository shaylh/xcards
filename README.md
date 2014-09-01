#xCards

xCards is small JS library that enables you to use semantic html to display and manipulate standard playing cards.

The library depends on the very useful web components [xtags] library by Mozilla Project.

#Usage
The different usages are displayed bellow. A live demo can be found in the [**xcards.html**](https://rawgit.com/shaylh/xcards/master/xcards.html) file.

##Specific card
You can declare a specific card simply by specifying its rank and suit, or by declaring it a joker.

    <x-hand>
	    <x-card rank="8" suit="s"></x-card>
	    <x-card rank="6" suit="h"></x-card>
	    <x-card rank="k" suit="c"></x-card>
	    <x-card joker="true"></x-card>
	    <x-card rank="a" suit="d"></x-card>
    </x-hand>

##Series
You can declare a series of cards of the same suit by specifying the first (min) and last (max) ranks in the series.

    <x-hand min="8" max="12" suit="s"></x-hand>

##More of the same
You can declare two, three or four of a kind of the same rank, simply by specifying the desired suits.

    <x-hand rank="5" suits="hdsc"></x-hand>

##Random
You can produce a random set of cards, simply by specifying how many cards you wish.

    <x-hand random="7"></x-hand>

##Shuffle
Given a hand, you can shuffle (randomly reorder) the cards by invoking the **shuffle()** function of the x-hand element.

    <x-hand id="shuffle">
    	<x-card rank="5" suit="h"></x-card>
    	<x-card rank="6" suit="s"></x-card>
    	<x-card rank="5" suit="d"></x-card>
    	<x-card rank="7" suit="d"></x-card>
    </x-hand>
    <input type="button" value="shuffle" onclick="getElementById('shuffle').shuffle();"/>

##Face down
You can declare any hand with cards facing down. Clicking a card flips it.

    <x-hand random="3" faceup="false"></x-hand>



[xtags]: http://www.x-tags.org  "x-tags"
[xtags-git]: https://github.com/x-tag/core "github"
