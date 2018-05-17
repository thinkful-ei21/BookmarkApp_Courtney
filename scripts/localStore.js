'use strict';

const localStore = (function() {


	const addNewBookmark = function(bookmark) {
		this.localBookmarks.push(bookmark);
	};

	const deleteBookmark = function() {

	};

	const updateBookmark = function() {

	};

	const searchByRating = function() {

	};

	const findById = function() {

	};


	return {
		localBookmarks: [],
		showRating: false,
		adding: false,

		addNewBookmark,
		deleteBookmark,
		updateBookmark,
		searchByRating,
		findById
	};
}());